const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const { isLoggedIn } = require('../middleware');



//route to show cart items
router.get('/user/cart', isLoggedIn, async (req, res) => {
   let user=await User.findById(req.user._id).populate('cart');
   res.render('cart/cart',{user});
});

//actually add the product to cart
router.post('/user/:productId/add', isLoggedIn, async (req, res) => {
    let { productId } = req.params;
    let userId = req.user._id;
    let product=await Product.findById(productId);
    let user= await User.findById(userId);
    user.cart.push(product);
    await user.save();
    req.flash('success', 'Product added to cart successfully!');
    res.redirect('/user/cart');
})


module.exports = router;