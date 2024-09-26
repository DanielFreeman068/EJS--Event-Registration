
# Event Registration Project

This project is an event registration system built using Node.js and Express, with EJS for templating. Users can register for events, view participants, and administrators can manage events (add, edit, delete).

## Installation

Install cd EJS--Event-Registration

```bash
git clone https://github.com/DanielFreeman068/EJS--Event-Registration.git
cd EJS--Event-Registration

npm install
node app.js
```

Then navigate to http://localhost:5100

## Libraries
```bash
var express = require('express');
var app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const PORT = 5100;
```

Once the server is running, you can navigate through the following features:

- Index Page: Is the admin page that allows you to add, edit, and delete events.
- Events Page: This is used to edit the events.
- Register Page: Gives table view of all existing events and registration form.
## Documentation

- Admin Page:

    - Endpoint: **/**
    - Method: **GET**
    - Description: **Displays the admin page of the add, edit, delete event system.**

- Edit Events Page:

    - Endpoint: **/events/:id/edit**
    - Method: **GET**
    - Description: **Allows you to edit existing events as an admin.**

- Register for Events Page:

    - Endpoint: **/register**
    - Method: **GET**
    - Description: **Displays all existing events and provides a register form**

- Register for an Event:

    - Endpoint: **/submit**
    - Method: **POST**
    - Description: **Allows a user to register for an event.**
    - Parameters:
        - id: **ID for event.**    
        - name: **User's name.**
        - email: **User's email.**
        - Response: **Redirects to the /register page after registration.**
- Edit an Event:

    - Endpoint: **/events/:id**
    - Method: **POST**
    - Description: **Allows a user to edit an event.**
    - Parameters:
        - description: **Description for event.**    
        - name: **Event's name.**
        - date: **Event's date.**
        - Response: **Redirects to the / page after registration.**

- Add an Event:

    - Endpoint: **/events**
    - Method: **POST**
    - Description: **Allows an admin to add an event.**
    - Parameters:
        - id: **Event's ID.**
        - name: **Event's name.**
        - date: **Event's date.**
        - description: **Description for event.**    
        - Response: **Redirects to the / page after registration.**

- Delete an Event:

    - Endpoint: **/events/:id/delete**
    - Method: **POST**
    - Description: **Allows an admin to delete an event.**
    - Parameters:
    - Response: **Redirects to the / page after registration.**


## Example Usage

1. **Registering for an Event**

- The /submit route allows users to register for an event. The registration process involves submitting a form with the user's name, email, and the selected event.

**Example Request:**

HTML Form Example (from register.ejs):

html
```bash
    <div class="form">
        <form action="/submit" method="POST">
            <h1 class="header">Register</h1><br>
            <select id="event" name="event" placeholder="select which event">
                <% events.forEach(function(event) { %>
                    <option value="<%= event.id %>"><%= event.name %></option>
                <% }); %> 
            </select> 
            <input placeholder="Name" type="text" id="name" name="name" required>
            <input placeholder="Email" type="email" id="email" name="email" required>
            <button onclick="validateForm();" class="formButton" type="submit">Register</button>
        </form>
    </div>
```
Example Request Payload:

json
```bash
{
  "id": "1"
  "name": "John Doe",
  "email": "john@example.com",
}
Example Server Code (from app.js):
javascript
Copy code
app.post('/submit', (req,res) => {
    const registers = getRegister();
    const newRegister = {
        id: registers.length+1,
        name:req.body.name,
        email:req.body.email,
    };
    registers.push(newRegister);
    saveRegister(registers);
    res.redirect('/register');
})
```
After submission, the user is redirected to the /register page, where they can see their registration.


2. **Admin Adding a New Event**

- The /events route allows admins to add new events.

**Example Request**

HTML Form Example (from index.ejs):

html
```bash
    <div class="form">
        <form action="/events" method="POST">
            <h1 class="header">Event Form</h1>
            <input id="name" type="text" name="name" placeholder="New event name" required><br>
            <input id="description" type="text" name="description" placeholder="New event description" required><br>
            <input id="date" type="date" name="date" required><br>
            <button onclick="validateForm();" class="formButton" type="submit">Add Event</button>        
        </form>
    </div>
```
Example Request Payload:

json
```bash
  {
    "id": 12,
    "name": "Back to School Bash",
    "date": "2025-08-15",
    "description": "A community event to prepare kids for the new school year"
  }
```
Example Server Code:

javascript
```bash
app.post('/events', (req,res) => {
    const events = getEvents();
    const newEvent = {
        id: events.length+1,
        name:req.body.name,
        date:req.body.date,
        description:req.body.description,
        attendees:0,
    };
    events.push(newEvent);
    saveEvents(events);
    res.redirect('/');
})
```
After submission, the new event will be added to the event list, and the admin will be redirected to the admin page to manage it.

3. **Admin Editing an Event**
- The /events/:id route allows admins to update an existing event.

**Example Request**

HTML Form Example (from events.ejs):

html
```bash
        <form action="/events/<%= event.id %>" method="POST">
            <h2>Event Name</h2>
            <input type="text" name="name" value="<%= event.name %>" required><br>
            <h2>Event Date</h2>
            <input type="date" name="date" value="<%= event.date %>" required></br>
            <h2>Event Description</h2>
            <textarea cols="40" rows="10" name="description" required><%= event.description %></textarea><br>
            <button onclick="editMessage();" class="formButton" type="submit">Update Event</button><br>
        </form>
```
Example Request Payload:

json
```bash
  {
    "id": 12,
    "name": "Back to School Bash",
    "date": "2025-08-19",
    "description": "A community event to prepare kids for the new school year!!"
  }
```

Example Server Code:
javascript
```bash
app.post('/events/:id', (req,res) => {
    const events = getEvents();
    const eventIndex = events.findIndex(event => event.id == req.params.id);
    events[eventIndex].description = req.body.description;
    events[eventIndex].name = req.body.name;
    events[eventIndex].date = req.body.date;
    saveEvents(events);
    res.redirect('/');
});
```
After submission, the event is updated and the admin is redirected to the admin page.

4. **Admin Deleting an Event**
- The /events/:id/delete route allows admins to delete an event.

**Example Request**

HTML Form Example (from admin.ejs):

html:
```bash
Copy code
<form action="/events/<%= event.id %>/delete" method="POST" style="display:inline;">
    <button onclick="deleteMessage();" class="adminButton" type="submit"><ion-icon name="trash-outline"></ion-icon></button>
</form>
Example Server Code:
javascript
Copy code
app.post('/events/:id/delete', (req,res) => {
    let events = getEvents();
    events = events.filter(event => event.id != req.params.id);
    saveEvents(events);
    res.redirect('/');
});
```
After deletion, the admin is redirected to the admin page, and the event is removed from the list.
## Authors

- [@DanielFreeman068](https://github.com/DanielFreeman068)

## License

**This project uses the MIT License**

[MIT License](https://choosealicense.com/licenses/mit/)


## Contributions

V1.1 - **20240913T15:22:00**
- Main basis for the website was created, simple js and ejs code with 0 styling to get all the start of the backend to work.

V1.2 - **20240915T21:54:00**
- Attempted messing with the post methods but got stumped.

V1.3 - **20240916T15:20:00**
- Attempted messing with the post methods but got stumped.

V1.4 - **20240917T22:51:00**
- Tampered with getting attendees to show up

V1.5 - **20240918T18:13:00**
- Fixed redirect functionality on my app.js

V1.6 - **20240919T10:15:00**
- Styled all of my pages, finished up all of my ejs pages, and completed the project with final touches