const {v4: uuidv4} = require('uuid');


const users = [
    { 
        id: 1, 
        name: 'Alice',
        age: 25, 
        username: 'alice',
        password: 'password',
        session_id: uuidv4()
    },
    { 
        id: 2, 
        name: 'Bob', 
        age: 30, 
        username: 'bob',
        password: 'password',
        session_id: uuidv4()
    },
    { 
        id: 3, 
        name: 'Charlie', 
        age: 35 , 
        username: 'charlie', 
        password: 'password',
        session_id: uuidv4()
    }
];

const getUser = (userId) => {
    return users.find(u => u.id === userId);
}

module.exports = Object.freeze({
    SECRET_KEY: "SECRET_KEY",
    USERS: users,
    GET_USER: getUser
})