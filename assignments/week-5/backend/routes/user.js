const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Product List');
});

router.get('/details', (req, res) => {
  res.send('Product Details');
});

module.exports = router;