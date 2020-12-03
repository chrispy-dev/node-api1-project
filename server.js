const express = require('express');

const db = require('./data');
const server = express();
const host = "localhost";
const port = 3000;

server.use(express.json());

server.get('/', (req, res) => {
    // Sorry about the inline styling :s
    res.write('<h1 style="font-family: sans-serif; height: 100%; margin: 0; display: flex; justify-content: center; align-items: center;">Welcome!</h1>');
    res.end();
});

// CREATE
server.post('/api/users', (req, res) => {
    const name = req.body.name;
    const bio = req.body.bio;
    
    if (name && bio) {
        const user = db.createUser({ name: name, bio: bio });

        res.status(201).json(user);
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    };
});

// READ
server.get('/api/users', (req, res) => {
    const users = db.getUsers();
    
    res.json(users);
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = db.getUser(id);

    res.json(user);
});

// UPDATE
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = db.getUser(id);
    const newName = req.body.name;
    const newBio = req.body.bio;

    if (user) {
        const updatedUser = db.updateUser(id, { 
            name: newName || user.name, 
            bio: newBio || user.bio
        });

        res.json(updatedUser);
    } else {
        res.status(400).json({ errorMessage: "The user with the specified ID does not exist." });
    };
});

// DESTROY
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = db.getUser(id);

    if (user) {
        const check = db.destroyUser(id);

        res.end();
    } else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
    };
});

server.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}/`);
});