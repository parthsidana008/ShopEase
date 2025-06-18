require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Sample product data
const products = [
  {
    name: "Classic T-Shirt",
    description: "A comfortable cotton t-shirt for everyday wear. Made with premium materials for lasting comfort.",
    category: "clothing",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHNoaXJ0fGVufDB8fDB8fHww",
    sale: false,
    salePrice: null,
    inStock: true
  },
  {
    name: "Denim Jacket",
    description: "A stylish denim jacket that pairs well with any outfit. Perfect for fall weather.",
    category: "clothing",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVuaW0lMjBqYWNrZXR8ZW58MHx8MHx8fDA%3D",
    sale: false,
    salePrice: null,
    inStock: true
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with superior cushioning for maximum comfort during your runs.",
    category: "footwear",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    sale: true,
    salePrice: 99.99,
    inStock: true
  },
  {
    name: "Casual Sneakers",
    description: "Versatile sneakers that look great with jeans, shorts, or casual dresses.",
    category: "footwear",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D",
    sale: false,
    salePrice: null,
    inStock: true
  },
  {
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet with multiple card slots and a coin pocket.",
    category: "accessories",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D",
    sale: false,
    salePrice: null,
    inStock: false
  },
  {
    name: "Sunglasses",
    description: "Polarized sunglasses that provide 100% UV protection with a classic design.",
    category: "accessories",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D",
    sale: true,
    salePrice: 89.99,
    inStock: true
  },
  {
    name: "Smart Watch",
    description: "Track your fitness goals, receive notifications, and more with this feature-packed smartwatch.",
    category: "electronics",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
    sale: false,
    salePrice: null,
    inStock: true
  },
  {
    name: "Wireless Earbuds",
    description: "Truly wireless earbuds with premium sound quality and long battery life.",
    category: "electronics",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1590658602513-7a5a6c8bc490?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
    sale: true,
    salePrice: 129.99,
    inStock: true
  },
  {
    name: "Winter Coat",
    description: "Stay warm during the coldest months with this insulated, waterproof winter coat.",
    category: "clothing",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ludGVyJTIwY29hdHxlbnwwfHwwfHx8MA%3D%3D",
    sale: false,
    salePrice: null,
    inStock: true
  },
  {
    name: "Backpack",
    description: "A durable backpack with multiple compartments perfect for daily use or short trips.",
    category: "accessories",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
    sale: true,
    salePrice: 49.99,
    inStock: true
  },
  {
    name: "Dress Shoes",
    description: "Classic leather dress shoes that add a touch of sophistication to any formal outfit.",
    category: "footwear",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHJlc3MlMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D",
    sale: false,
    salePrice: null,
    inStock: false
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with rich sound quality and long-lasting battery.",
    category: "electronics",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1589003511304-e723c70a7e59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
    sale: true,
    salePrice: 69.99,
    inStock: true
  }
];

async function seedDatabase() {
  try {
    // Validate environment variable
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'ecommerce' // Specify your database name
    });
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Validate and insert products
    const validProducts = products.filter(product => {
      if (!product.name || !product.description || !product.category || !product.price || !product.image) {
        console.warn(`Skipping invalid product: ${JSON.stringify(product)}`);
        return false;
      }
      return true;
    });

    if (validProducts.length === 0) {
      throw new Error('No valid products to insert');
    }

    const result = await Product.insertMany(validProducts);
    console.log(`Added ${result.length} products to database`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedDatabase();