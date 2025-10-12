const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');
// user schema
const userSchema = new mongoose.Schema({
    email: {type: String,
       required: true,
       trim: true, 
       unique: true
    },
       role: {
        type: String,
        required: true
       
    },
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    gender: {type: String,
        required: false,
        trim: true
    },
    wishlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

userSchema.plugin(passportLocalMongoose);

let User= mongoose.model('User', userSchema);
module.exports= User;

