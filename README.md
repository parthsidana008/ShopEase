# 🛍️ ShopEase

A full-stack eCommerce application built using **Node.js**, **Express**, **MongoDB**, and **Handlebars**. It supports product listings, shopping cart, wishlists, and order management — a simple yet complete eCommerce backend.

---

## 📁 Project Overview

This app supports:

- 🏠 Home page with dynamic product listings  
- 🛒 Add products to Cart and Wishlist  
- 📦 Place and view Orders  
- ❌ 404 and error page handling  
- 🧱 Modular routing using Express  
- 🎨 Handlebars templating engine  
- 📁 MongoDB schema-based models using Mongoose  

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Frontend:** HTML, CSS, JavaScript  
- **Templating Engine:** Handlebars (`.hbs`)  
- **Database:** MongoDB with Mongoose  
- **Tools:** Custom helpers, Seed data script  

---

## 🚀 How to Run the Project Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/parthsidana008/ShopEase.git
   cd ShopEase
2. Install dependencies
   npm install
3. Start the server
4. Visit http://localhost:9878 in your browse

---📁 Key Files & Folders
app.js – Main application entry point

products.html, response.html – Static sample pages

/models/ – Mongoose schemas (Cart, Order, Product, Wishlist)

/routes/ – Express routes (home, cart, products, wishlist, orders)

/views/ – Handlebars templates (home, 404, error, cart page)

/public/ – Static files (CSS, JS)

/helpers/ – Custom Handlebars helpers

/scripts/seed.js – Script to populate DB with initial data

---📝 To-Do
🔐 Add user authentication (login/register)

💳 Integrate payment gateway (e.g., Razorpay/Stripe)

🔍 Add product filtering & search

🎨 Enhance UI with Tailwind or Bootstrap

📱 Make mobile-friendly & responsive

---📄 License
This project is open-source and available under the MIT License.


---📦 Languages: Handlebars, HTML, JavaScript, CSS
