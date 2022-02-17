const mongoose = require('mongoose');
const slugify = require('slugify');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Category must have name'],
    },
    description: {
      type: String,
      required: [true, 'A category must have Description'],
    },
    image_url: {
      type: String,
    },
    slug: {
      type: String,
    },
    parent_category_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

subCategorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

subCategorySchema.virtual('product', {
  ref: 'Product',
  foreignField: 'subcategory_id',
  localField: '_id',
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
