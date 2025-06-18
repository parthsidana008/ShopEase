const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

// Helper to get cart items with product details
async function getCartItems() {
  let cart = await Cart.findOne().populate('items.product');
  if (!cart) {
    cart = new Cart({ items: [] });
    await cart.save();
  }
  return cart.items.map(item => ({
    product: item.product,
    quantity: item.quantity
  }));
}

// View cart
router.get('/', async (req, res) => {
  try {
    const cartItems = await getCartItems();

    const total = cartItems
      .reduce((sum, item) => {
        const price = item.product.sale ? item.product.salePrice : item.product.price;
        return sum + price * item.quantity;
      }, 0)
      .toFixed(2);

    res.render('cart/index', {
      title: 'Shopping Cart',
      cartItems,
      total
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to load cart'
    });
  }
});

// Add product to cart
router.post('/add/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);
    if (!product) {
      req.session.error_msg = 'Product not found';
      return res.redirect('back');
    }

    let cart = await Cart.findOne().populate('items.product');
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.product._id.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    req.session.success_msg = 'Product added to cart successfully!';
    res.redirect('back');
  } catch (error) {
    console.error('Error adding product to cart:', error);
    req.session.error_msg = 'Could not add product to cart';
    res.redirect('back');
  }
});

// Update cart item quantity
router.put('/update/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const { quantity } = req.body;
    const parsedQuantity = parseInt(quantity);

    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
      req.session.error_msg = 'Invalid quantity';
      return res.redirect('/cart');
    }

    let cart = await Cart.findOne();
    if (!cart) {
      req.session.error_msg = 'Cart not found';
      return res.redirect('/cart');
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = parsedQuantity;
      cart.updatedAt = Date.now();
      await cart.save();
      req.session.success_msg = 'Cart updated successfully!';
    } else {
      req.session.error_msg = 'Item not found in cart';
    }

    res.redirect('/cart');
  } catch (error) {
    console.error('Error updating cart:', error);
    req.session.error_msg = 'Could not update cart';
    res.redirect('/cart');
  }
});

// Remove item from cart
router.delete('/remove/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    let cart = await Cart.findOne();
    if (!cart) {
      req.session.error_msg = 'Cart not found';
      return res.redirect('/cart');
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    cart.updatedAt = Date.now();
    await cart.save();

    req.session.success_msg = 'Item removed from cart!';
    res.redirect('/cart');
  } catch (error) {
    console.error('Error removing from cart:', error);
    req.session.error_msg = 'Could not remove item from cart';
    res.redirect('/cart');
  }
});

// Checkout
router.post('/checkout', async (req, res) => {
  try {
    let cart = await Cart.findOne().populate('items.product');
    if (!cart || cart.items.length === 0) {
      req.session.error_msg = 'Your cart is empty';
      return res.redirect('/cart');
    }

    // Create order
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.sale ? item.product.salePrice : item.product.price,
      quantity: item.quantity
    }));

    const totalAmount = cart.items.reduce((sum, item) => {
      const price = item.product.sale ? item.product.salePrice : item.product.price;
      return sum + price * item.quantity;
    }, 0);

    const order = new Order({
      items: orderItems,
      totalAmount,
      status: 'pending'
    });

    await order.save();

    // Clear cart
    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();

    req.session.success_msg = 'Order placed successfully!';
    res.redirect('/orders');
  } catch (error) {
    console.error('Error during checkout:', error);
    req.session.error_msg = 'Checkout failed';
    res.redirect('/cart');
  }
});

module.exports = router;