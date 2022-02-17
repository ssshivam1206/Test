const express = require('express');
const productsController = require('../controller/productsController');

const router = express.Router();

router
  .route('/')
  .get(productsController.getAllProducts)
  .post(productsController.createProducts);

router
  .route('/:id')
  .get(productsController.getproduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

router
  .route('/:id/productImage')
  .post(productsController.productimgaeupload, productsController.productimage);

module.exports = router;
