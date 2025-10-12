const express =  require('express');
const { isLoggedIn } = require('../../middleware');
const User = require('../../models/User');
const router = express.Router();

router.post('/product/:productId/like' , isLoggedIn , async(req,res)=>{
    let {productId} =  req.params;
    let user = req.user;
    let isLiked = user.wishlist.includes(productId);
    // if(isLiked){
    //     await User.findByIdAndUpdate(req.user._id , {$pull: {wishlist : productId} })
    // }else{
    //     await User.findByIdAndUpdate(req.user._id , {$addToSet: {wishlist : productId} })
    // }
    const option= isLiked ? '$pull' : '$addToSet';
    //the below code can be done by else if as well
    req.user= await User.findByIdAndUpdate(req.user._id , {[option]: {wishlist : productId}},{new:true} )
    res.send('ok like toggled');
})


module.exports = router;