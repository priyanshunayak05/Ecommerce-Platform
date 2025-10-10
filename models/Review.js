const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
},{
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

let Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

