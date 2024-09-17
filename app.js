// app.post('/submit', (req, res) => {
//     const { name, email, event } = req.body;
//     fs.readFile('data/registrations.json','utf8', (err, data) => {
//         if(err){console.error(err);}
//         let jsonData = JSON.stringify(JSON.parse(data));
//         jsonData.push({
//             name,
//             email,
//             event
//         });
//         fs.writeFile('data/registrations.json', JSON.stringify(jsonData) + '\n', (err) => {
//             if (err) {
//                 console.error(err);
//                 res.send('Error Writing to File')
//             }
//             res.redirect('/events')
//         })
//     })
// });
//libraries
var express = require('express');
var app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 5000;

//public folder css and middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

//functions to save and get events
const getEvents = () => {
    const data = fs.readFileSync('./data/events.json','utf8');
    return JSON.parse(data);
};

const saveEvents = (events) => {
    fs.writeFileSync('./data/events.json', JSON.stringify(events, null, 2));
};

//functions to save and get registrations
const getRegister = () => {
    const data = fs.readFileSync('./data/registrations.json','utf8');
    return JSON.parse(data);
};

const saveRegister = (people) => {
    fs.writeFileSync('./data/registrations.json', JSON.stringify(events, null, 2));
};

//routes

//GET
const events = getEvents();
//index page
app.get('/', (req,res) => {
    res.render('pages/index', { events } );
});

//register page
app.get('/register', (req,res) => {
    res.render('pages/register', { events } );
});

//POST
app.post('/events', (req,res) => {
    const events = getEvents();
    const newEvent = {
        id: events.length+1,
        name:req.body.name,
        date:req.body.date,
        description:req.body.description
    };
    events.push(newEvent);
    saveEvents(events);
    res.redirect('/');
})

app.post('/submit', (req,res) => {
    const registers = getRegister();
    const newRegister = {
        id: events.length+1,
        name:req.body.name,
        date:req.body.date,
        description:req.body.description
    };
    events.push(newEvent);
    saveEvents(events);
    res.redirect('/');
})

//GET to show a single event
app.get('/events/:id/edit', (req,res) => {
    const events = getEvents();
    const event = events.find(event => event.id == req.params.id);
    res.render('pages/events', { event });
});

//PUT to update event
app.post('/events/:id', (req,res) => {
    const events = getEvents();
    const eventIndex = events.findIndex(event => event.id == req.params.id);
    events[eventIndex].description = req.body.description;
    events[eventIndex].name = req.body.name;
    events[eventIndex].date = req.body.date;
    saveEvents(events);
    res.redirect('/');
});

//DELETE
app.post('/events/:id/delete', (req,res) => {
    let events = getEvents();
    events = events.filter(event => event.id != req.params.id);
    saveEvents(events);
    res.redirect('/');
});

//server
app.listen(PORT, () => {
    console.log(`server running on https://localhost:${PORT}`);
});