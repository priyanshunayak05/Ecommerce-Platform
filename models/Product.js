const mongoose = require('mongoose');
const Review = require('./Review');


const productSchema = new mongoose.Schema({
  name: { type: String, required: true ,trim: true},
  price: { type: Number, required: true ,min: 0},    
    description: { type: String ,trim: true},
    imageUrl: {type: String, required: true,default: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D' },
    timestamp:{type:String},
    review:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }]

});


// middleware jo BTS mongodb operations karwane par use hota hai and iske andar pre nd post middleware hote hai which are basically used over the schema and before the model is 

productSchema.post('findOneAndDelete',async function(product){
  if(product.review.length>0){
    await Review.deleteMany({_id: {$in: product.review}});
  }
})

let Product = mongoose.model('Product', productSchema);

module.exports = Product;

