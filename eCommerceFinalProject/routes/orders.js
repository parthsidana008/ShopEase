const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// View all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    
    res.render('orders/index', {
      title: 'My Orders',
      orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Failed to load orders' 
    });
  }
});

// View order details
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).render('404', { title: 'Order Not Found' });
    }
    
    res.render('orders/detail', {
      title: `Order #${order._id.toString().slice(-6)}`,
      order
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Failed to load order details' 
    });
  }
});

module.exports = router;
