# 🛒 E-Commerce Platform

A full-stack E-Commerce web application built using **Node.js, Express, MongoDB, and EJS**, supporting both **buyers and sellers** with role-based access control and secure authentication.

---

## 🚀 Features

### 👤 Authentication & Authorization
- Secure login & registration using **Passport.js**
- Session-based authentication
- Role-based access control (Buyer / Seller)
- Password hashing for secure credential storage

### 🛍 Buyer Features
- Browse products
- View product details
- Add to cart
- Like/Unlike products
- Leave reviews & ratings

### 🏪 Seller Features
- Add new products
- Edit existing products
- Delete products
- Manage inventory

### 🛒 Cart & Checkout
- Add/remove items from cart
- Update cart quantity
- Checkout functionality

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js

### Frontend
- EJS (Embedded JavaScript Templates)
- HTML5
- CSS3

### Tools
- Git
- npm

---

## 📁 Project Structure

Ecommerce-Platform/
│
├── models/ # Database schemas
├── routes/ # Express route handlers
├── views/ # EJS templates
├── public/ # Static files (CSS, images)
├── middleware.js # Custom middleware functions
├── app.js # Main application entry point
├── schema.js # Validation schemas
├── seed.js # Database seed script
├── package.json # Dependencies
└── .gitignore


---

## ⚙️ Installation & Setup Guide

Follow these steps to run the project locally:

---

### 1️⃣ Clone the Repository

bash
git clone https://github.com/priyanshunayak05/Ecommerce-Platform.git
cd Ecommerce-Platform

2️⃣ Install Dependencies
npm install

3️⃣ Setup MongoDB

Make sure MongoDB is installed and running locally.

Start MongoDB:

mongod


Or use MongoDB Atlas and update your connection string in app.js.

4️⃣ Configure Environment Variables (Optional but Recommended)

Create a .env file in the root directory:

SESSION_SECRET=your_secret_key


Then install dotenv:

npm install dotenv


Update app.js:

require('dotenv').config();

5️⃣ Seed the Database (Optional)

To populate sample products:

node seed.js

6️⃣ Start the Server
node app.js


Or with nodemon:

npx nodemon app.js

7️⃣ Open in Browser

Visit:

http://localhost:3000

🔐 Authentication Flow

User registers.

Password is hashed before storing in MongoDB.

User logs in.

Passport validates credentials.

Session is created.

Role-based middleware restricts route access.

🗄 Database Design
User Schema

username

email

password (hashed)

role (buyer/seller)

Product Schema

title

description

price

seller reference

reviews

likes

Review Schema

rating

comment

user reference

🔄 RESTful Routes (Sample)
Method	Route	Description
GET	/products	View all products
POST	/products	Create product
PUT	/products/:id	Update product
DELETE	/products/:id	Delete product
GET	/cart	View cart
POST	/login	User login
POST	/register	User registration
🔒 Security Features

Password hashing (bcrypt)

Session-based authentication

Access-restricted routes

Input validation

Role-based authorization

🚧 Future Improvements

Payment gateway integration

Order history

Admin dashboard

Docker deployment

Redis-based session storage

JWT-based authentication

React frontend integration

👨‍💻 Author

Priyanshu Nayak
GitHub: https://github.com/priyanshunayak05

⭐ Why This Project?

This project demonstrates:

Full-stack development skills

Backend authentication implementation

Role-based access control

Database schema design

Practical CRUD operations
