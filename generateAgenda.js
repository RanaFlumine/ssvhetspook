const fs = require('fs');
const path = require('path');

// Function to parse date in YYMMDD format and convert it to a Date object
function parseDate(dateString) {
    const day = parseInt(dateString.slice(4, 6), 10);
    const month = parseInt(dateString.slice(2, 4), 10) - 1; // Month is 0-indexed
    const year = 2000 + parseInt(dateString.slice(0, 2), 10); // Assuming the year is 20YY
    return new Date(year, month, day); // Return a Date object
}

// Function to format Date object as DD-MM-YYYY
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// Get today's date and set the time to midnight to ignore the time part
const today = new Date();
today.setHours(0, 0, 0, 0);  // Set time to 00:00:00

// Read the event files from the events folder
const eventsDir = path.join(__dirname, 'agenda/events');
const eventFiles = fs.readdirSync(eventsDir).filter(file => file.endsWith('.txt'));

// Read each event file and parse the information
const events = eventFiles.map(file => {
    const filePath = path.join(eventsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const date = file.slice(0, 6);  // First 6 characters are the date (YYMMDD)
    const name = file.slice(6, -4).replace(/_/g, ' ').trim();  // Everything after the date is the name of the event, replacing underscores with spaces
    
    const description = content.trim();  // Assuming the text file contains the description

    console.log(`Parsing file: ${file}, Date: ${date}, Name: ${name}`);

    return {
        date: date,
        name: name,
        description: description,
    };
});

console.log("Parsed events:", events);

// Filter events to exclude those that are before the current date
const upcomingEvents = events.filter(event => {
    const eventDate = parseDate(event.date);
    const isUpcoming = eventDate >= today;
    console.log(`Event: ${event.name}, Date: ${event.date}, IsUpcoming: ${isUpcoming}`);
    return isUpcoming;
});

console.log("Upcoming events:", upcomingEvents);

// Sort the filtered events by date (most recent first)
upcomingEvents.sort((a, b) => parseDate(a.date) - parseDate(b.date));

// Generate the HTML for the agenda page
const agendaHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Agenda - SSV Het Spook</title>
    <meta name="description" content="Dit is de agenda van SSV Het Spook. Hier zie je alle aankomende evenementen en wanneer deze zijn.">
    <meta name="og:description" content="Agenda van SSV Het Spook, de enige Socialistisch Studentenvereniging van Nijmegen!">
    <meta name="robots" content="index, follow">
    <link rel="stylesheet" href="/files/css/stylesheet.css">
    <link rel="icon" type="image/png" sizes="32x32" href="/files/img/spook-32x32.png">
    <script src="/files/components/components.js" type="text/javascript" defer></script>
    <script>
        if (window.location.pathname === '/agenda/index.html') {
          window.location.pathname = '/agenda/';
        }
    </script>
</head>
<body>
    <header-component></header-component>
    <div class="content">
        <p>
            Hallo griezel! Hier zie je de agenda voor de komende tijd. De locatie wordt doorgestuurd in de groepsapp van Het Spook. Als je nog geen lid bent en je wilt een keer komen kijken, stuur dan op instagram een DM naar ons en we nodigen je vrijblijvend uit!
        </p>
        <p>
            Hello ghoul! Here you can see the agenda for the coming time. The location will be sent in the whatsapp group chat of Het Spook. If you are not a member yet and want to come take a look, send us a DM on instagram and we will invite you without obligation!
        </p>
        <br>
    
        <div id="events-container">
            ${upcomingEvents.map(event => `
            <br>
            <div class="event">
                <div class="event-title">${event.name}</div>
                <div class="event-date">${formatDate(parseDate(event.date))}</div>
                <div class="event-description">${event.description}</div>
            </div>
            `).join('')}
        </div>
    </div>

    <footer-component></footer-component>
</body>
</html>
`;

console.log("Generated HTML:", agendaHtml);

// Write the generated HTML to the agenda folder
const agendaDir = path.join(__dirname, 'agenda');
if (!fs.existsSync(agendaDir)) {
    fs.mkdirSync(agendaDir);
}

fs.writeFileSync(path.join(agendaDir, 'index.html'), agendaHtml);
console.log('Agenda page generated successfully!');
