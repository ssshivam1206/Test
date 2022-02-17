const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllCategory = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    status: 'success',
    data: categories,
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    status: 'success',
    data: category,
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(new AppError('Not found Any categories With this ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: category,
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError('Not Found any Categories with this Id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate('product');

  if (!category) {
    return next(new AppError('Not Found any Categories with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: category,
  });
});
