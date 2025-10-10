const express = require('express');
const router = express.Router(); //mini instance
const Review = require('../models/Review');
const Product = require('../models/Product');
const {validateReview}= require('../middleware');


router.post('/products/:id/review',validateReview,async(req,res)=>{
    try {
    let{rating, comment}= req.body;

    let {id}= req.params;
    const product= await Product.findById(id);
    const review= new Review({rating, comment});
    product.review.push(review);
    await review.save();
    await product.save();
    req.flash('success','Review added successfully')
    res.redirect(`/products/${id}`);
    } catch (e) {
        res.status(500).render('error',{error: e.message});
    }


    
})




module.exports = router;