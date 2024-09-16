//libraries
var express = require('express');
var app = express();
const PORT = 5000;
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

//public folder css and middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

//read data from data.json
let data = fs.readFileSync(path.join(__dirname, 'data/events.json'), 'utf8');
let jsonData = JSON.parse(data);

// Handle form submission
// app.post('/submit', (req, res) => {
//     const { name, email, event } = req.body;
//     const registration = `${name}|${email}|${event}\n`;
//     fs.appendFileSync(path.join(__dirname, 'data', 'registrations.txt'), registration);
//     res.redirect('/events');
// });



//set the view engine to ejs
app.set('view engine', 'ejs');

//use res.render to load up an ejs view file

//events page
app.get('/events', function(req,res){
    res.sendFile(path.join(__dirname, 'pages', 'events.ejs'));
    res.render('pages/events', {
        events: jsonData
    });
});

//admin page
app.get('/admin', function(req,res){
    res.render('pages/admin', {
        events: jsonData
    });
});

app.post('/submit', (req, res) => {
    const { name, email, event } = req.body;
    fs.readFile('data/registrations.json','utf8', (err, data) => {
        if(err){console.error(err);}
        let jsonData = JSON.stringify(JSON.parse(data));
        jsonData.push({
            name,
            email,
            event
        });
        fs.writeFile('data/registrations.json', JSON.stringify(jsonData) + '\n', (err) => {
            if (err) {
                console.error(err);
                res.send('Error Writing to File')
            }
            res.redirect('/events')
        })
    })
});

//listening to server on port 5000
app.listen(PORT, ()=>{
    console.log(`Server running on https://localhost:${PORT}`);
});