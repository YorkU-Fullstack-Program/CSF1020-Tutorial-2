const users = [
    { 
        id: 1, 
        name: 'Alice',
        age: 25, 
        username: 'alice', 
    },
    { 
        id: 2, 
        name: 'Bob', 
        age: 30, 
        username: 'bob', 
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