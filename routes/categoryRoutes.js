const express = require('express');
const categoryController = require('../controller/categoryController');
const subCategoryRouter = require('../routes/subCategoryRoutes');

const router = express.Router();

router.use('/:categoryId/subCategory', subCategoryRouter);

router
  .route('/')
  .get(categoryController.getAllCategory)
  .post(categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

// router
//   .route('/:categoryId/subCategory')
//   .post(subCategoryController.createsubCategory);

module.exports = router;
