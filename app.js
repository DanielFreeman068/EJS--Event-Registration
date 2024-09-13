var express = require('express');
var app = express();
const PORT = 5000
const fs = require('fs');
const path = require('path');


//read data from data.json
let data = fs.readFileSync(path.join(__dirname, 'data/events.json'), 'utf8');
let jsonData = JSON.parse(data);

//public folder css
app.use('/public', express.static('public'));

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