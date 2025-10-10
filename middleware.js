
// These are Joi schemas used for validation.
const { productSchema, reviewSchema } = require('./schema') // importing the schemas

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

module.exports = {isLoggedIn, validateProduct, validateReview };