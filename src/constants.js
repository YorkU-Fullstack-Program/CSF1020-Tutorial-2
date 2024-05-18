const users = [
    { 
        id: 1, 
        name: 'Alice',
        age: 25, 
        username: 'alice',
        password: 'password'
    },
    { 
        id: 2, 
        name: 'Bob', 
        age: 30, 
        username: 'bob',
        password: 'password'
    },
    { 
        id: 3, 
        name: 'Charlie', 
        age: 35 , 
        username: 'charlie', 
        password: 'password'
    }
];

const getUser = (userId) => {
    return users.find(u => u.id === userId);
}

module.exports = Object.freeze({
    SECRET_KEY: "SUPER_SECRET_KEY",
    USERS: users,
    GET_USER: getUser
})