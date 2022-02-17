const mongoose = require('mongoose');
const slugify = require('slugify');

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categoriesSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product',
  });
  next();
});

// categoriesSchema.pre('save', async function (next) {
//   const productpromise = this.product.map(
//     async (id) => await Product.findById(id)
//   );
//   this.product = await Promise.all(productpromise);
//   next();
// });

categoriesSchema.virtual('product', {
  ref: 'Product',
  foreignField: 'category_id',
  localField: '_id',
});

const Category = mongoose.model('Category', categoriesSchema);

module.exports = Category;
