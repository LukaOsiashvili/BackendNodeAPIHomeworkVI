const express = require('express');
const router = express.Router();

const productsService = require('../services/productService');

router.get('/all', productsService.getAll);
router.get('/getOne/:id', productsService.getOne);
router.post('/add', productsService.add);
router.delete('/delete/:id', productsService.delete);
router.put('/update/:id', productsService.update);
router.get('/search)', productsService.searchByName);
router.put('/updateSpecs/:id', productsService.updateProductSpecs);

module.exports = router;