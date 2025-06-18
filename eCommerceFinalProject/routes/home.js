const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Home route
router.get('/', async (req, res) => {
  try {
    // Get featured products (newest 4)
    const featuredProducts = await Product.find().sort({ createdAt: -1 }).limit(4);
    
    // Get sale products
    const saleProducts = await Product.find({ sale: true }).limit(4);
    
    res.render('home', {
      title: 'Home',
      featuredProducts,
      saleProducts
    });
  } catch (error) {
    console.error('Error fetching home data:', error);
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Failed to load homepage' 
    });
  }
});

module.exports = router;
