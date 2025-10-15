// common.js

async function likeButton(productId , btn){
    try{
        let response = await axios({
            method: 'post', 
            // FIX THIS LINE: Change 'products' to 'product'
            url: `/product/${productId}/like`,
            headers : {'X-Requested-With' : 'XMLHttpRequest'}
        })

        // This code will now run successfully
        if(btn.children[0].classList.contains('fas')){
            btn.children[0].classList.remove('fas')
            btn.children[0].classList.add('far')
        } else {
            btn.children[0].classList.remove('far')
            btn.children[0].classList.add('fas')
        }
    }
    catch(e){
        if(e.response && e.response.status === 401){
            window.location.replace('/login');
        } else {
            // Log other errors to the console to help debug
            console.error("Like button error:", e);
        }
    }
}

// ... rest of the file is the same
let allLikeButton = document.querySelectorAll('.like-btn');
for(let btn of allLikeButton){
    btn.addEventListener('click' , ()=>{
        let productId =  btn.getAttribute('product-id');
        likeButton(productId ,  btn);
    })
}