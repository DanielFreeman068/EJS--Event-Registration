var express = require('express');
var app = express();
const PORT = 5000
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

//public folder css and middleware
app.use(bodyParser.json());//?
app.use(bodyParser.urlencoded({ extended: true }));//?
app.use('/public', express.static('public'));

//read data from data.json
let data = fs.readFileSync(path.join(__dirname, 'data/events.json'), 'utf8');
let jsonData = JSON.parse(data);

// app.post('/admin', (req, res) => {
//     res.
// })

// Handle form submission
//?????
app.post('/submit', (req, res) => {
    const formData = req.body;
    
    // Read the existing data from the JSON file
    fs.readFile(path.join(__dirname, 'data/data.json'), 'utf8', (err, data) => {
        if (err) {
            // If the file doesn't exist, start with an empty array
            if (err.code === 'ENOENT') {
                fs.writeFile(path.join(__dirname, 'data/data.json'), 'utf8', JSON.stringify([formData], null, 2), (err) => {
                    if (err) throw err;
                    res.send('Form data saved.');
                });
            } else {
                throw err;
            }
        } else {
            // Parse the existing data and append the new data
            const jsonData = JSON.parse(data);
            jsonData.push(formData);
            
            // Write the updated data to the JSON file
            fs.writeFile(path.join(__dirname, 'data/data.json'), 'utf8', JSON.stringify(jsonData, null, 2), (err) => {
                if (err) throw err;
                res.send('Form data saved.');
            });
        }
    });
});

//write data to json file
// let testEvent = {
//     name: 'test event',attendees:25,type:"roof party"
// }

//convert object to json file
// let newJsonData = JSON.stringify(testEvent, null, 2)

//write json data to a file
// fs.writeFileSync('data.json', newJsonData)

// console.log("Data Saved Successfully")

//set the view engine to ejs
app.set('view engine', 'ejs');

//use res.render to load up an ejs view file

//index page
app.get('/events', function(req,res){
    res.sendFile(path.join(__dirname, 'pages', 'events.ejs'));
    res.render('pages/events', {
        events: jsonData
    });
});

//about page
app.get('/admin', function(req,res){
    res.render('pages/admin', {
        events: jsonData
    });
});

app.listen(PORT, ()=>{
    console.log(`Server running on https://localhost:${PORT}`);
});