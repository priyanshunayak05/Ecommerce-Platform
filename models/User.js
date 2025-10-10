const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');
// user schema
const userSchema = new mongoose.Schema({
    email: {type: String,
       required: true,
       trim: true, 
       unique: true}
})

userSchema.plugin(passportLocalMongoose);

let User= mongoose.model('User', userSchema);
module.exports= User;

