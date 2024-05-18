const jsonwebtoken = require('jsonwebtoken');
const {USERS: users, GET_USER: getUser, SECRET_KEY} = require('../constants');

const excludedRoutes = [
    '/login',
    '/register'
]

const verifyToken = (req, res, next) => {
    if (excludedRoutes.includes(req.path)) {
        return next();
    }

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // This is weird, but it's correct

    if (!token) {
        console.log('No token provided.');
        return res.status(401).send('Unauthorized');
    }

    try {
        const decodedJson = jsonwebtoken.verify(token, SECRET_KEY);
        const user = getUser(decodedJson.id);
        if (!user) {
            console.log('User not found.');
            return res.status(401).send('Unauthorized');
        }

        if (user.session_id !== decodedJson.session_id) {
            console.log('Invalid session.');
            return res.status(401).send('Unauthorized');
        }

        req.currentUser = user;

        next();
    } catch (error) {
        console.log('Invalid token.');
        return res.status(401).send('Unauthorized');
    } 
};

module.exports = verifyToken;