const multer = require('multer');
const Product = require('../models/productsModel');
const ProductImage = require('../models/productImageModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `product-${req.params.id}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: multerStorage });

exports.productimgaeupload = upload.single('photo');

exports.getAllProducts = catchAsync(async (req, res) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: products,
  });
});

exports.createProducts = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: product,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError('Not found Any products With this ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('Not Found any products with this Id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.getproduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate(
    'productimage'
  );

  if (!product) {
    return next(new AppError('Not Found any products with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: product,
  });
});

exports.productimage = catchAsync(async (req, res, next) => {
  if (!req.body.product_id) req.body.product_id = req.params.id;
  if (req.file) req.body.image_url = req.file.filename;
  const product = await ProductImage.create(req.body);

  res.status(200).json({
    status: 'success',
    data: product,
  });
});
