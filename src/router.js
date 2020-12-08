const { Router } = require('express');

const Fetch = require('./app/Fetch');

const router = Router();

router.get('/', Fetch.index);

module.exports = router;
