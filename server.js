const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

// Serve everything inside ssvhetspook folder
app.use(express.static(__dirname));

// Define paths for agenda and events
const agendaDir = path.join(__dirname, 'agenda');
const eventsDir = path.join(agendaDir, 'events');

// Serve events data
app.get('/events', (req, res) => {
    fs.readdir(eventsDir, (err, files) => {
        if (err) {
            console.error('Error reading events folder:', err);
            return res.status(500).json({ error: 'Unable to read events' });
        }

        const events = files
            .filter(file => file.endsWith('.txt')) // Only process .txt files
            .map(file => {
                const [date, ...nameParts] = file.split(/(?<=^\d{6})/);
                const eventName = nameParts.join('').replace('.txt', '');
                const filePath = path.join(eventsDir, file);
                const description = fs.readFileSync(filePath, 'utf-8');

                return {
                    date: `${date.substring(4, 6)}-${date.substring(2, 4)}-20${date.substring(0, 2)}`,
                    name: eventName,
                    description,
                };
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .filter(event => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // Split the date string into day, month, and year
                const [day, month, year] = event.date.split('-').map(num => parseInt(num, 10));
            
                // Create a Date object using the parsed values (Month is 0-indexed, so subtract 1 from the month)
                const eventDate = new Date(year, month - 1, day);
                eventDate.setHours(0, 0, 0, 0);

            
                // Return true if the event is on or after the current date
                return eventDate >= today;
            });

        res.json(events);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
