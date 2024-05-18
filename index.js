const express = require('express');
const userApi = require('./src/routes/user');
const productApi = require('./src/routes/products');

const app = express();
app.use(express.json());
const PORT = 3000;

// Instantiate APIs
app.use('/user', userApi);
app.use('/product', productApi);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});