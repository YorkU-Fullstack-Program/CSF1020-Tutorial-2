const express = require('express');
const userApi = require('./src/routes/user');
const authApi = require('./src/routes/auth')

const verifyToken = require('./src/middleware/verifyToken');


const app = express();
app.use(express.json());
const PORT = 3000;

// Instantiate APIs
app.use(verifyToken);
app.use(authApi);
app.use('/user', userApi);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});