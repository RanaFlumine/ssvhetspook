const fs = require('fs');
const path = require('path');

// Function to parse date in DD-MM-YYYY format and convert it to a Date object
function parseDate(dateString) {
    const [day, month, year] = dateString.split('-').map(num => parseInt(num, 10));
    return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript Date
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
const eventsDir = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsDir).filter(file => file.endsWith('.txt'));

// Read each event file and parse the information
const events = eventFiles.map(file => {
    const filePath = path.join(eventsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const [date, name] = file.split('Event');
    const description = content.trim();  // Assuming the text file contains the description

    return {
        date: date.trim(),
        name: name.trim(),
        description: description,
    };
});

// Filter events to exclude those that are before the current date
const upcomingEvents = events.filter(event => {
    const eventDate = parseDate(event.date);
    return eventDate >= today;  // Only include events with a date greater than or equal to today
});

// Sort the filtered events by date (most recent first)
upcomingEvents.sort((a, b) => parseDate(b.date) - parseDate(a.date));

// Generate the HTML for the agenda page
const agendaHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SSV Het Spook</title>
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
            Lorem ipsum odor amet, consectetuer adipiscing elit. Nisi fames ac vel nisl tellus dapibus id nisi lorem. Dolor sociosqu euismod nunc, urna eleifend leo amet. Commodo mattis convallis rutrum ridiculus tristique. Ornare tristique sit varius pellentesque; nibh amet porta? Lorem netus placerat non scelerisque curae penatibus. Fames elementum diam pellentesque fringilla id. Mauris vitae mus ut porta tempus arcu elit in.
        </p>
        <br>
    
        <div id="events-container">
            ${upcomingEvents.map(event => `
            <div class="event">
                <div class="event">
                <div class="event-title">${event.name}</div>
                <div class="event-date">${event.date}</div>
                <div class="event-description">${event.description}</div>
            </div>
            </div>
            `).join('')}
        </div>
    </div>

    <footer-component></footer-component>
</body>
</html>
`;

// Write the generated HTML to the agenda folder
const agendaDir = path.join(__dirname, 'agenda');
if (!fs.existsSync(agendaDir)) {
    fs.mkdirSync(agendaDir);
}

fs.writeFileSync(path.join(agendaDir, 'index.html'), agendaHtml);
console.log('Agenda page generated successfully!');