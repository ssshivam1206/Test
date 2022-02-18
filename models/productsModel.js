const mongoose = require('mongoose');
const slugify = require('slugify');

const productsSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: [true, 'A product must have sku '],
    },
    price: {
      type: Number,
      required: [true, 'A product must have price'],
    },
    name: {
      type: String,
      required: [true, 'A product must have price'],
    },
    slug: {
      type: String,
    },
    // product_image: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'ProductImage',
    // },
    category_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'A product must have a category '],
    },
    subcategory_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'SubCategory',
      required: [true, 'A product must have a sub-Category'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productsSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productsSchema.virtual('productimage', {
  ref: 'ProductImage',
  foreignField: 'product_id',
  localField: '_id',
});

// productsSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'product_image',
//   });

//   next();
// });
const Product = mongoose.model('Product', productsSchema);

module.exports = Product;
