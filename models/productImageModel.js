const mongoose = require('mongoose');

const productImageSchema = new mongoose.Schema({
  image_url: {
    type: String,
  },
  product_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Product Image Should Have Product Id '],
  },
});

const ProductImage = mongoose.model('ProductImage', productImageSchema);

module.exports = ProductImage;
