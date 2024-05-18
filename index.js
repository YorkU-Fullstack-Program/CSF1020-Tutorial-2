const express = require('express');
const userApi = require('./src/routes/user');
const productApi = require('./src/routes/products');
const authApi = require('./src/routes/auth');

const verifyToken = require('./src/middleware/verifyToken');

const app = express();
app.use(express.json());
const PORT = 3000;

// Setup Middleware
app.use(verifyToken);

// Instantiate APIs
app.use(authApi);
app.use('/user', userApi);
app.use('/product', productApi);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});