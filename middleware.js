
// These are Joi schemas used for validation.
const { productSchema, reviewSchema } = require('./schema') // importing the schemas
const Product = require('./models/Product'); // required for authorization checks

// Middleware for product validation
const validateProduct = (req, res, next) => {
    const {name, price, description, imageUrl} = req.body;
    const { error } = productSchema.validate({name, price, description, imageUrl})  // validating the req.body against the productSchema;
    if (error) {
        return res.render('error', { error: error.details[0].message });
    }
    next();
};

// Middleware for review validation
const validateReview = (req, res, next) => {
    const {rating, comment} = req.body;
    const { error } = reviewSchema.validate({rating, comment})  // validating the req.body against the reviewSchema;
    if (error) {
        return res.render('error', { error: error.details[0].message });
    }
    next();
};

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

const isSeller = (req, res, next) => {
    if(!req.user.role){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect('/products');
    }
    else if(req.user.role !== 'seller'){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect('/products');
    }
    next();
}


const isProductAuthor = async (req, res, next) => {
    let { id } = req.params;
    let foundProduct = await Product.findById(id);
    if(!foundProduct.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect('/products/');
    }
    next();
}

module.exports = {isLoggedIn, validateProduct, validateReview , isSeller , isProductAuthor};