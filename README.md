# ShopEase
A full-stack eCommerce application built using Node.js, Express, MongoDB, and Handlebars for templating. Includes product listings, shopping cart, wishlist, and order management.
## 📁 Project Structure
eCommerceFinalProject/
│
├── app.js # Main application entry point
├── products.html # Sample static product page
├── response.html # Sample order response page
│
├── models/ # Mongoose data models
│ ├── Cart.js
│ ├── Order.js
│ ├── Product.js
│ └── Wishlist.js
│
├── routes/ # Express route definitions
│ ├── cart.js
│ ├── home.js
│ ├── orders.js
│ ├── products.js
│ └── wishlist.js
│
├── public/ # Static assets (CSS, JS)
│ ├── css/
│ │ └── style.css
│ └── js/
│ └── main.js
│
├── views/ # Handlebars templates
│ ├── home.hbs
│ ├── 404.hbs
│ ├── error.hbs
│ └── cart/
│ └── index.hbs
│
├── helpers/ # Handlebars helper functions
│ └── hbs-helpers.js
│
├── scripts/ # Utility and seeding scripts
│ └── seed.js


---

## 🚀 Features

- Home page with product listings  
- View individual products  
- Add to Cart / Wishlist  
- View and manage Cart  
- Place Orders  
- Error pages for invalid routes  
- Modular routing and clean code separation  
- Uses Handlebars (`.hbs`) for templating  

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Frontend:** HTML, CSS, JavaScript, Handlebars  
- **Database:** MongoDB with Mongoose  
- **Templating Engine:** Handlebars (`hbs`)  
- **Utilities:** Custom Handlebars helpers, Seeder scripts  

---

## 📦 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd eCommerceFinalProject
📝 To-Do
Add user authentication

Enhance UI with Bootstrap or Tailwind

Add payment integration

Improve product filtering and search
