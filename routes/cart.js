const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const { isLoggedIn } = require('../middleware');



//route to show cart items
router.get('/user/cart', isLoggedIn, async (req, res) => {
   const user=await User.findById(req.user._id).populate('cart');
    const totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);


    const productinfo = user.cart.map(p => p.description).join(', ');

   res.render('cart/cart',{user,totalAmount,productinfo});
});

//actually add the product to cart
router.post('/user/:productId/add', isLoggedIn, async (req, res) => {
    let { productId } = req.params;
    let userId = req.user._id;
    let product=await Product.findById(productId);
    let user= await User.findById(userId);
      const alreadyInCart = user.cart.some(item => item._id.toString() === productId);
        if (alreadyInCart) {
            req.flash('info', 'Product is already in your cart!');
            return res.redirect('/user/cart');
        }
    user.cart.push(product);
    await user.save();
    req.flash('success', 'Product added to cart successfully!');
    res.redirect('/user/cart');
})

router.post('/user/:productId/remove', isLoggedIn, async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);

        // Remove the product from the cart
        user.cart = user.cart.filter(item => item.toString() !== productId);
        await user.save();

        req.flash('success', 'Product removed from cart successfully!');
        res.redirect('/user/cart');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong while removing the product.');
        res.redirect('/user/cart');
    }
});


module.exports = router;