if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}

const express = require('express');
const app = express();
const path= require('path');
const seedDb= require('./seed');

const mongoose = require('mongoose');

const methodOveride= require('method-override');
const ejsMate=require('ejs-mate');

const flash= require('connect-flash');
const session = require('express-session');
require('dotenv').config();

// passport for authentication
const passport= require('passport');
const LocalStrategy= require('passport-local');

const User= require('./models/User');

const productRoutes=require('./routes/product');
const reviewRoutes= require('./routes/review');

const authRoutes= require('./routes/auth');

const cartRoutes= require('./routes/cart');

const productApi= require('./routes/api/productapi');


const dbURL= process.env.DB_URL || 'mongodb://localhost:27017/Shopping-app';


app.use(productApi); // all routes in product api will be prefixed with /api


// override with POST having ?_method=DELETE
app.use(methodOveride('_method'));

// database connection

mongoose.set('strictQuery', true); // to avoid deprecation warning


// const mongoose = require('mongoose');  //remove when connect dbURL is used
mongoose.connect(dbURL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));  


app.engine('ejs', ejsMate); // for using ejs-mate for layout
app.set('view engine', 'ejs'); // if using EJS what view engine is viewing ejs file are using
app.set('views', path.join(__dirname, 'views')); // correct path to views
// public folder 
app.use(express.static(path.join(__dirname, 'public')));

// middleware to parse the body of the request
app.use(express.urlencoded({ extended: true })); // to parse the body of the request


app.use(flash()); // middleware for flash
// session configuration
app.use(session({
    secret  :'keyboard cat  can be anything',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly:true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week expiration
      maxAge: 1000 * 60 * 60 * 24 * 7
     } // Set to true if using HTTPS
}));

// passport
app.use(passport.initialize()); // to initialize passport
app.use(passport.session()); // to use passport session to store locally
passport.serializeUser(User.serializeUser()); // to serialize the user for the session
passport.deserializeUser(User.deserializeUser()); // to deserialize the user

passport.use(new LocalStrategy(User.authenticate())); // to use local strategy

//middleware to make current user and flash available in all templates
app.use((req,res,next)=>{
  res.locals.currentUser= req.user; // to make current user available in all templates
  res.locals.success= req.flash('success');
  res.locals.error= req.flash('error');
  next();
})

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Ecommerce Home Page</title>
        <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
      <div class="container">
        <h1>Ecommerce Home Page</h1>
        <p>See All Products: <a href="/products">Products</a></p>
      </div>
      <footer style="position:fixed; bottom:10px; right:15px; color:grey; font-size:14px;">
        Made by Priyanshu Nayak
      </footer>
    </body>
    </html>
  `);
});

// seed the database
// seedDb();
app.use(productRoutes);  //so that har incoming routes will go to product routes first

app.use(reviewRoutes); // so that har incoming routes will go to review routes first

app.use(authRoutes); // so that har incoming routes will go to auth routes first

app.use(cartRoutes); // so that har incoming routes will go to cart routes first

app.use(productApi); // all routes in product api will be prefixed with /api



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
