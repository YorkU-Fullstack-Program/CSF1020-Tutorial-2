const express = require('express');
const constants = require('../constants');

const router = express.Router();

router.get('/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    
    return res.send({"id": 1, "name": "Toaster", "price": 100});
});

module.exports = router;