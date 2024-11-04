const express = require('express');
const { STATIC_FILE_PATH } = require('../../config');

const router = express.Router();

router.get('/', (req, res) => res.status(200).send());
router.use('/', express.static(STATIC_FILE_PATH));
router.use('/api', require('./api'));

module.exports = router;
