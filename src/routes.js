const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
router.get('/healthcheck', (req, res) => res.send({ status: 'OK' }));

module.exports = router;
