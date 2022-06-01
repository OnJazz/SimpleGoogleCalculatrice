const express = require('express');

const calcController = require('./calculatrice.controller.ts');

const router = express.Router();

// /calcul => GET
router.post('/', calcController.calcul);

module.exports = router;