const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Wishlist = require('../models/Wishlist');

// Get all products or filter by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let products;
    
    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find();
    }
    
    res.render('products/index', {
      title: 'Products',
      products,
      currentCategory: category || 'all'
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Failed to load products' 
    });
  }
});

// Get product details
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).render('404', { title: 'Product Not Found' });
    }
    
    // Get related products from the same category
    const relatedProducts = await Product.find({ 
      category: product.category,
      _id: { $ne: product._id }
    }).limit(4);
    
    res.render('products/detail', {
      title: product.name,
      product,
      relatedProducts
    });
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Failed to load product details' 
    });
  }
});

// Add to cart
router.post('/:id/add-to-cart', async (req, res) => {
  try {
    const productId = req.params.id;
    const quantity = parseInt(req.body.quantity) || 1;

    let cart = await Cart.findOne().populate('items.product');
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.product._id.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity
      });
    }
    
    cart.updatedAt = Date.now();
    await cart.save();
    
    req.session.success_msg = 'Product added to cart successfully!';
    res.redirect('back');
  } catch (error) {
    console.error('Error adding to cart:', error);
    req.session.error_msg = 'Could not add product to cart';
    res.redirect('back');
  }
});

// Add to wishlist
router.post('/:id/add-to-wishlist', async (req, res) => {
  try {
    const productId = req.params.id;

    let wishlist = await Wishlist.findOne();
    if (!wishlist) {
      wishlist = new Wishlist({ products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      wishlist.updatedAt = Date.now();
      await wishlist.save();
      req.session.success_msg = 'Product added to wishlist!';
    } else {
      req.session.success_msg = 'Product already in wishlist!';
    }
    
    res.redirect('back');
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    req.session.error_msg = 'Could not add product to wishlist';
    res.redirect('back');
  }
});

module.exports = router;