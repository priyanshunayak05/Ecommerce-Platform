const express= require('express');
const router= express.Router();
const Product= require('../models/Product');
const Review= require('../models/Review');

const {validateProduct,isLoggedIn}= require('../middleware');




// to show all products -->fetch all products from db and render a page showing all products
router.get('/products', isLoggedIn, async(req,res)=>{
    try {
    let products= await Product.find({});
    res.render('products/index',{products});
    } catch (e) {
        res.status(500).render('error',{error: e.message});
    }
});

// to show the form for new product ---> render a form for adding a new product
router.get('/product/new',isLoggedIn,(req,res)=>{
    try {
    res.render('products/new');
    } catch (e) {
        res.status(500).render('error',{error: e.message});
    }
});


// to actually add the product
// validateProduct is a middleware to validate the product data before creating a new product
// Extracts product details from the form, creates a new product in the database, and redirects to the products list.
router.post('/products',validateProduct, isLoggedIn,async(req,res)=>{

    try {
    let {name, price, description, imageUrl}= req.body;
    await Product.create({name, price, description, imageUrl});
    req.flash('success','Product added successfully')
    res.redirect('/products');
    } catch (e) {
        res.status(500).render('error',{error: e.message});
    }
})


// to show a particular product
// Finds a product by its ID, populates its reviews, and renders the products/show view.
router.get('/products/:id', isLoggedIn,async(req,res)=>{

    try {
   let {id}=req.params;
   let foundProduct=await Product.findById(id).populate('review');
   res.render('products/show',{foundProduct, msg: req.flash('success') });
    } catch (e) {
        res.status(500).render('error',{error: e.message});
    }
})


// form to edit the product 

router.get('/products/:id/edit', isLoggedIn,async(req,res)=>{

    try {
    let {id}=req.params;
    let foundProduct=await Product.findById(id);
    res.render('products/edit',{foundProduct});
    } catch (e) {
        res.status(500).render('error',{error: e.message});
    }
 } )



//  to update the product or to actually edit the product
router.patch('/products/:id', validateProduct, isLoggedIn,async(req,res)=>{
    try {   
    let {id}=req.params;
    let {name, price, description, imageUrl}= req.body; 
    // destructuring the body of the request
    // mongoose always return a promise
    await Product.findByIdAndUpdate(id,{name, price, description, imageUrl});
    //flash message
    req.flash('success','Product updated successfully')
    res.redirect(`/products/${id}`);
    } catch (e) {
        res.status(500).render('error',{error: e.message});
    }
})


// to delete a product
router.delete('/products/:id',isLoggedIn, async(req,res)=>{

    try {
    let {id}=req.params;
    const product=await Product.findById(id);

    // for(let id of product.review){
    //     await Review.findByIdAndDelete(id);
    // }
    await Product.findByIdAndDelete(id);
    req.flash('success','Product deleted successfully')
    res.redirect('/products');
    } catch (e) {
        res.status(500).render('error',{error: e.message});
    }
})
module.exports= router;