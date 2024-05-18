const express = require('express');
const constants = require('../constants');

const router = express.Router();
const { USERS: users } = constants;

router.get('/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);

    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).send('User not found.');
    }

    return res.send(user);
});

router.delete('/:userId', (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
        return res.status(404).send('User not found.');
    }

    users.splice(index, 1);
    res.status(204).send('User deleted successfully.');
});

router.patch('/:userId', (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
        return res.status(404).send('User not found.');
    }

    if (req.currentUser.id !== userId) {
        return res.status(403).send('Forbidden');
    }

    const user = users[index];

    if (req.body.name) {
        user.name = req.body.name;
    }

    if (req.body.age) {
        user.age = parseInt(req.body.age);
    }

    return res.send(user);
});

module.exports = router;