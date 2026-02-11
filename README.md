# 🛒 E-Commerce Platform

A **E-Commerce Web Application** built using **Node.js,
Express.js, MongoDB, EJS, and Passport.js** supporting buyers and
sellers with secure role-based access control.

------------------------------------------------------------------------

# 🚀 Features

## 👤 Authentication & Authorization

-   Secure login & registration using Passport.js
-   Session-based authentication
-   Role-Based Access Control (Buyer / Seller)
-   Protected routes using custom middleware

## 🛍 Buyer Features

-   Browse dynamic product listings
-   Add products to cart
-   Like / Unlike products
-   Write reviews and feedback

## 🏪 Seller Features

-   Add new products
-   Update product details
-   Delete products
-   Manage product listings

------------------------------------------------------------------------

# 🏗 System Architecture Diagram

``` mermaid
flowchart TD
    User[User - Buyer/Seller]
    Browser[Browser]
    Server[Node.js + Express Server]
    Auth[Passport.js Authentication]
    Middleware[Role-Based Middleware]
    Routes[Routes Controller]
    DB[(MongoDB Database)]

    User --> Browser
    Browser --> Server
    Server --> Auth
    Auth --> Middleware
    Middleware --> Routes
    Routes --> DB
    DB --> Routes
    Routes --> Browser
```

------------------------------------------------------------------------

# 🗄 Database Schema Diagram

``` mermaid
erDiagram
    USER {
        ObjectId _id
        string username
        string email
        string password
        string role
    }

    PRODUCT {
        ObjectId _id
        string name
        string description
        number price
        ObjectId seller
    }

    CART {
        ObjectId _id
        ObjectId user
        ObjectId product
        number quantity
    }

    REVIEW {
        ObjectId _id
        ObjectId user
        ObjectId product
        string comment
        number rating
    }

    USER ||--o{ PRODUCT : creates
    USER ||--o{ CART : adds
    USER ||--o{ REVIEW : writes
    PRODUCT ||--o{ REVIEW : has
    PRODUCT ||--o{ CART : added_to
```

------------------------------------------------------------------------

# 🔄 API Flow Explanation

## 🔐 Authentication Flow

User → /register → MongoDB → Session Created\
User → /login → Passport.js → Session Stored\
Protected Routes → Middleware → Access Granted/Denied

## 🛍 Product Creation Flow (Seller)

Seller → /add-product → Role Middleware\
→ Save Product in DB → Redirect to Dashboard

## 🛒 Add to Cart Flow (Buyer)

Buyer → /cart/add/:productId\
→ Role Middleware\
→ Create Cart Entry → Update DB → Render Cart Page

## ⭐ Review System Flow

Buyer → /product/:id\
→ Submit Review → Save in Review Collection\
→ Display on Product Page

------------------------------------------------------------------------

# 📁 Project Structure

    Ecommerce/
    │
    ├── models/
    ├── routes/
    ├── views/
    ├── public/
    ├── middleware.js
    ├── schema.js
    ├── app.js
    ├── package.json
    └── README.md

------------------------------------------------------------------------

# ⚙️ Installation & Setup Guide

## 1️⃣ Clone the Repository

git clone [https://github.com/your-username/your-repository-name.git\](https://github.com/priyanshunayak05/Ecommerce-Platform.git)
cd your-repository-name

## 2️⃣ Install Dependencies

npm install

## 3️⃣ Setup MongoDB

If using local MongoDB:

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

If using MongoDB Atlas, replace with your connection string.

## 4️⃣ Run the Application

node app.js

OR

npx nodemon app.js

## 5️⃣ Open in Browser

http://localhost:3000

------------------------------------------------------------------------

# 🔐 Role-Based Access

  Feature          Buyer    Seller
  ---------------- ------- --------
  View Products    ✅      ✅
  
  Add to Cart      ✅      ❌
  
  Add Product      ❌      ✅
  
  Edit Product     ❌      ✅
  
  Delete Product   ❌      ✅
  
  Write Review     ✅      ❌

------------------------------------------------------------------------

# 🚀 Future Improvements

-   Payment Gateway Integration
-   JWT-based Authentication
-   Admin Panel
-   Order Tracking
-   Deployment on Render / AWS

------------------------------------------------------------------------

# 👨‍💻 Author

**Priyanshu Nayak**\
B.Tech CSE (AIML)
