# 🏋️GYM BUDDY

## Overview

[Visit the Deployed Site](https://gymder-dv-sh-kp.herokuapp.com/ )

Finding a workout partner can often be difficult and scary for some people. Gym Buddy combats this problem by offering an application that can assist with finding and connecting you with potential gym partners. Simply create a profile and enter your bio and your training goals and match with other users you feel have similar goals.

------------------

## Table of Contents 

* [User Story](#user-story)
* [Models](#models)
* [GET/POST Routes](#get-post-routes)
* [Socket.IO](#socket)
* [Usage](#usage)
* [Learning Objectives](#learning-objectives)
* [Learning Points](#learning-points)
* [Contributors](#contributors)
* [License](#license)

--------------

## Technologies Used

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| Socket.IO | [Socket.IO](https://socket.io/)     |  
| Hammer.JS | [Hammer.js](https://hammerjs.github.io/)     |     
| Bootstrap | [Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/)     |     
| Nodemon | [Nodemon](https://www.npmjs.com/package/nodemon)    |     
| Bcrypt | [Bcrypt](https://www.npmjs.com/package/bcrypt)     |     
| Express-Sessions |[Express-Sessions](https://www.npmjs.com/package/connect-session-sequelize )     | 
| Express-Handlebars | [Express-Handlebars](https://www.npmjs.com/package/express-session)     |   
| Express | [Express](https://www.npmjs.com/package/express-handlebars)| 
| dotenv | [dotenv](https://www.npmjs.com/package/dotenv)   |   
| MySQL2 | [mysql2](https://www.npmjs.com/package/mysql2)    |   
| Sequelize | [Sequelize](https://sequelize.org/)    |   
| Heroku | [Heroku](https://devcenter.heroku.com/articles/heroku-cli)     |   
| Node.js | [Node.js](https://nodejs.org/en)    |   
| CSS | [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)         |   
| Excalidraw | [Excalidraw](https://excalidraw.com/)         |   
| HTML | [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)         |   
| Git | [https://git-scm.com/](https://git-scm.com/)     |  

---------------------

## User Story

As a User I want o see a login or signup form <br/>
So that I can access the site

<img src="./assets/login.jpeg" width=400>

As a User I want to submit my user info <br/>
So that I can create an account 

<img src="./assets/signup.jpeg" width=300>
<img src="./assets/update.jpeg" width=300>

As a User I want to be able to view potential gym partners on this app <br/>
So I can see if I want to train with them

<img src="./assets/homepage.jpeg" width=300>

As a User I want to be able to match with my gym partners <br/>
So I can contact them to coordinate gym sessions

<img src="./assets/match.jpeg" width=300>
<img src="./assets/message.jpeg" width=300>

--------------------


## Models

One of the first steps in our project was creating the models. This was so we can see the rules for features such as our user accounts, messages, and matches.


How we created our Models for matches and users:
```javascript
  Matches.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        },
```

----------------------

## GET POST Routes
We then created GET and POST routes for API and HTML features such as retrieving message data, users being able to edit their profiles, log in or signup, and much more.


How we used GET/POST route for matches:
```javascript
   ponse = JSO// Get all matches
router.get('/', async (req, res) => {
    try {
      // Get the current user's ID from their session
      const currentUserId = req.session.id;
      
      const matchData = await Matches.findAll({
        where: {
           user1Id: currentUserId,
           user2Id: req.body.user2Id
        },
        include: [
          {
            model: User,
            as: 'user1',
            attributes: ['id', 'username']
          },
          {
            model: User,
            as: 'user2',
            attributes: ['id', 'username']
          }
        ]
      });
      res.status(200).json(matchData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
```

---------------------

## Socket.io

We used socket.io to enable our application to have real time chat functionality through the power of web sockets.

Being a social application, messaging other users was a crucial feature for us to implement. By enabling the server and the user to create a continuous connection with one another, users are able to message others without having to refresh the page and all in real-time.

Below, you will see how we implemented socket.io on the server-side.
```javascript
async function startServer() {
  await sequelize.sync({ force: false });  // Sync the Sequelize models with the database
  const server = app.listen(PORT, () => console.log(`App listening on ${PORT}`)); // Start the server listening on the specified PORT

  // Set up Socket.IO on the server
  const io = require("socket.io")(server);

  // Define an event listener for when a client connects to the Socket.IO server
  io.on("connection", (socket) => {
    console.log("connected");
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg); // Emit the chat message to all connected clients
    });
  });
}
```
In the code above, we initialize the server through app.listen and pass that as an argument when we initialize socket.io. On every new web socket connection from the server to the front-end, we'll console log connected along with having an "event listener" on our web socket to listen for new chat messages. When there are new chat messages, the server will take that information and emit or share it out to everyone in the conversation.

In the code below, we demonstrate how we implemented socket.io in our front end

```js
  const socket = io();

  // Get references to the messages list, form, and input field
  let messages = document.getElementById('messagesList');
  let form = document.getElementById('message_form');
  let input = document.getElementById('user_text');

  // Send message when form is submitted
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });

  // Display incoming messages in the chat window
  socket.on('chat message', function (msg) {
    let item = document.createElement('li');
    item.classList.add('list-group-item')
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
```

In the code above, we're targeting elements on our page so that we can append any new message that comes to the front-end. Every time someone submits the message form, we emit that message back to the server along with sending the message as well.

Once the server has received that message, the server will then emit it back to the front-end. On every new chat message, we'll append it to the page and style the new message using BootStrap as well as making sure we're scrolling to the bottom of the page so the user doesn't have to scroll themselves.

----------------------

## Hammer.JS

Through the power of Hammer.JS's gesture recognition, we were able to create a reactive front-end that enabled the user to "swipe" left or right on another user depending on whether they want to match with them or not.

An example of it can be found below:

![Swipe Example](./assets/swipe_example.gif)

While Hammer.JS doesn't particularly have the ability to swipe DOM elements for us, it empowers us to create that functionality easily and reliably. We could almost think of Hammer.JS as an extension of regular JavaScript event listeners where we can listen for new events such as pans, swipes, pinching, and rotating.

An example of how we implemented Hammer.JS into this application can be found below:

```js
    let hammerjs = new Hammer(el)

    // when a user drags a card, adjust its position and rotation
    hammerjs.on('pan', (event) => {
        if (event.deltaX === 0) {
            return;
        }

        if (event.center.x === 0 && event.center.y === 0) {
            return;
        }

        let xDisplacement = event.deltaX * 0.1
        let yDisplacement = event.deltaY / 80
        let cardRotation = xDisplacement * yDisplacement

        event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + cardRotation + 'deg)';
    })
```

As we can see, on the `pan` event, we're going to use CSS's built-in transform functionality to move the element based on the displacement of our pointer.

------------------------

## Usage 

Navigate to the site using the link at the top of this README. Once there create an account and enter your name, age, email, a password, a short bio, and your training goals. After that, you will be relocated to the home page where you may begin liking other users. Simply click like or dislike, or swipe the user card to the right to like or left to dislike them. If users both like each other then they can message each other by navigating to the matches page and clicking on that user. From there you may send messages to each other.

![Gymder](./assets/gymder.gif)

--------------------

## Learning Objectives
1. Applying and solidifying programming fundamentals: The project week is an opportunity for students to put into practice the foundational skills they have learned throughout the bootcamp, such as HTML, CSS, and JavaScript.
2. Working in teams: Many project weeks are designed to simulate real-world development scenarios where students work collaboratively in teams to build a web application. Learning how to work with others in a development environment is an important skill for any aspiring web developer.
3. Developing problem-solving skills: Building a web application requires the ability to solve complex problems and troubleshoot issues that arise. Project weeks challenge students to identify and overcome roadblocks and find creative solutions to technical challenges.
4. Using new technologies: Project weeks often introduce students to new technologies or frameworks that they may not have used before. This can be an opportunity to expand their skillset and learn about the latest tools and techniques in web development.
5. Building a portfolio: The web application that students create during project week can be used as a portfolio piece to showcase their skills and experience to potential employers. Learning how to build a polished and functional web application is a valuable asset for any developer.

-------------------

## Learning Points:

We learned how to better utilize models and GET/POST routes to better suite our needs and adjust them accordingly whenever we ran into an error. We also learned about new technologies in Socket.IO and Hammer.js which will both be very useful for upcoming projects. We also got more experience working together as a team to not only code and pair programs together but to work on ideas and plan efficiently.

------------------------

## Contributors

[David Vo](https://github.com/daevidvo) <br />
[Kaiden Parcher](https://github.com/Kaidenparcher) <br />
[Sam Higa](https://github.com/samhiga) <br/>

------------------

## License
 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### The MIT License (MIT)
Copyright © 2023 David Vo, Kaiden Parcher, Sam Higa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
