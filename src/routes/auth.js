const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const argon2 = require('argon2');
const { v4: uuidv4 } = require('uuid');
const {USERS: users, GET_USER: getUser, SECRET_KEY} = require('../constants');

const router = express.Router();

router.post('/login', async (req, res) => {
    const {username, password} = req.body; // password -> plain text

    const foundUser = users.find(u => u.username === username); // password -> hash

    const verifiedPassword = await argon2.verify(foundUser.password, password);

    if (!foundUser || !verifiedPassword) {
        return res.status(401).send('Invalid username or password.');
    }

    foundUser.session_id = uuidv4();

    const tokenUser = {
        id: foundUser.id,
        username: foundUser.username,
        session_id: foundUser.session_id
    }

    const token = jsonwebtoken.sign(tokenUser, SECRET_KEY);
    return res.send({token});
});

router.post('/register', async (req, res) => {
    const userId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const existingUser = users.find(u => u.username === req.body.username);
    if (existingUser) {
        return res.status(409).send('Username already exists.');
    }

    const newUser = {
        id: userId,
        name: req.body.name,
        age: req.body.age,
        username: req.body.username,
        password: await argon2.hash(req.body.password)
    };

    users.push(newUser);
    return res.status(201).send(`Created User: ${newUser.id}`);
});

router.post('/logout', (req, res) => {
    const user = req.currentUser

    const databaseUser = getUser(user.id);
    databaseUser.session_id = uuidv4();

    return res.status(204).send('Logged out successfully.');
});


module.exports = router;