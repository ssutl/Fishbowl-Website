# Fishbowl
This was my A-Level Computing project & also my first non "hello world" project. The intention of this project was to provide a platform for students to communicate easily and help other students with questions, which will in turn aid their own understanding. This was done by allowing students to create their own personal chat rooms with topic of their choice, these rooms could be joined by anyone interested, and live conversations could occur.

# Technologies Used
### Frontend
1. React
2. Sass
3. SocketIo Client

### Backend
1. NodeJs
2. Express
3. SocketIo Server



# Features Implemented
1. Live chats
2. Following System
3. Live user status
4. Chat room creation

# How it works
A user would be able to intialise channels on the server with unique ID's, this would represent a new room created, other users would be able to join these rooms which would subscribe them to the respective channel. So when a user sends a message, the message is emitted to everyone on that channel only, meaning the message stays in that room. Once the user exits the chat room then they unsubscribe from the channel. 

I also created other channels to monitor which users were online currently on the app, and displayed their status so other users could see this. There's similiar implementation for the following and upvoting system, which both use sockets.

# How to run application<br/>
### Frontend
1. Run NPM I (to install needed dependencies)
2. CD to FRONTEND
3. Run NPM Start

### Backend
1. CD to BACKEND
2. Run Nodemon





MIT License

Copyright (c) 2023 SSUTL

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



