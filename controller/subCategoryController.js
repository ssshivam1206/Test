const multer = require('multer');
const subCategory = require('../models/subCategoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `product-${req.params.id}-${Date.now()}.${ext}`);
  },
});

// const multerfilter = (req,file,cb) =>{

// }

const upload = multer({ storage: multerStorage });

exports.imgaeupload = upload.single('photo');

// const filterObj = (obj, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach((el) => {
//     if (allowedFields.includes(el)) newObj[el] = obj[el];
//   });
//   return newObj;
// };

exports.getAllsubCategory = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.categoryId)
    filter = { parent_category_id: req.params.categoryId };
  const subcategories = await subCategory.find(filter);
  res.status(200).json({
    status: 'success',
    data: subcategories,
  });
});

exports.createsubCategory = catchAsync(async (req, res, next) => {
  if (!req.body.parent_category_id)
    req.body.parent_category_id = req.params.categoryId;
  const subcategory = await subCategory.create(req.body);
  res.status(201).json({
    status: 'success',
    data: subcategory,
  });
});

exports.updatesubCategory = catchAsync(async (req, res, next) => {
  //   console.log(req.file);
  //   console.log(req.body);
  //   const filterbody = filterObj();
  if (req.file) req.body.image_url = req.file.filename;
  const subcategory = await subCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!subcategory) {
    return next(new AppError('Not found Any subcategories With this ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: subcategory,
  });
});

exports.deletesubCategory = catchAsync(async (req, res, next) => {
  const subcategory = await subCategory.findByIdAndDelete(req.params.id);

  if (!subcategory) {
    return next(new AppError('Not Found any subCategories with this Id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.getsubCategory = catchAsync(async (req, res, next) => {
  const subcategory = await subCategory
    .findById(req.params.id)
    .populate('product');

  if (!subcategory) {
    return next(new AppError('Not Found any subCategories with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: subcategory,
  });
});
