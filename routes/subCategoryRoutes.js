const express = require('express');
const subCategoryController = require('../controller/subCategoryController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(subCategoryController.getAllsubCategory)
  .post(subCategoryController.createsubCategory);

router
  .route('/:id')
  .get(subCategoryController.getsubCategory)
  .patch(
    subCategoryController.imgaeupload,
    subCategoryController.updatesubCategory
  )
  .delete(subCategoryController.deletesubCategory);

module.exports = router;
