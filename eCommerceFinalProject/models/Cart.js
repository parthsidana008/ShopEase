const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const CartSchema = new mongoose.Schema({
  items: [CartItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Instance method to calculate total price of the cart
CartSchema.methods.calculateTotal = function() {
  return this.items.reduce((total, item) => {
    // Note: product must be populated before calling this method
    const price = item.product.sale ? item.product.salePrice : item.product.price;
    return total + (price * item.quantity);
  }, 0);
};

module.exports = mongoose.model('Cart', CartSchema);