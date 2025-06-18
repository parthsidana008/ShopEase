const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// View wishlist
router.get('/', async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne().populate('products');
    
    if (!wishlist) {
      wishlist = { products: [] };
    }
    
    res.render('wishlist/index', {
      title: 'My Wishlist',
      wishlistItems: wishlist.products
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Failed to load wishlist' 
    });
  }
});

// Remove from wishlist
router.delete('/remove/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    let wishlist = await Wishlist.findOne();
    
    if (!wishlist) {
      req.session.error_msg = 'Wishlist not found';
      return res.redirect('/wishlist');
    }
    
    wishlist.products = wishlist.products.filter(id => 
      id.toString() !== productId
    );
    
    await wishlist.save();
    req.session.success_msg = 'Item removed from wishlist!';
    res.redirect('/wishlist');
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    req.session.error_msg = 'Could not remove item from wishlist';
    res.redirect('/wishlist');
  }
});

module.exports = router;