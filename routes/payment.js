const router = express.Router();
//We are using request for making an HTTP/HTTPS call to payumoney server
const request = require('request');
const jsSHA = require("jssha");
const express = require('express');
const {v4: uuid} = require('uuid');
const { isLoggedIn } = require('../middleware');


//Route to make a payment
//Here we are using payumoney as payment gateway
//In the below route we are making an HTTP/HTTPS call to payumoney server with all the details required for payment
router.post('/payment_gateway/payumoney', (req, res) => {
req.body.txnid = uuid();//Here pass txnid and it should be different  on every call
req.body.email = req.user.email;
req.body.firstname = req.user.username;
//Here save all the details in pay object 

 const pay = req.body;

//Generating hash for the request
//Hash is generated using SHA512 algorithm
//Hash is generated using the below format
//hashString = key|txnid|amount|productinfo|firstname|email|||||||||||salt
//Here salt and key are provided by payumoney when you create an account with them
const hashString = process.env.MERCHANT_KEY  //store in in different file
 + '|' + pay.txnid
 + '|' + pay.amount 
 + '|' + pay.productinfo 
 + '|' + pay.firstname 
 + '|' + pay.email 
 + '|' + '||||||||||'
 + process.env.MERCHANT_SALT //store in in different file

const sha = new jsSHA('SHA-512', "TEXT");
sha.update(hashString);
//Getting hashed value from sha module
 const hash = sha.getHash("HEX");
 
 //We have to additionally pass merchant key to API so remember to include it.
pay.key = process.env.MERCHANT_KEY //store in in different file;
 pay.surl = 'http://localhost:8080/payment/success'; //PROVIDE SUCCESS URL ROUTE
 pay.furl = 'http://localhost:8080/payment/fail'; //PROVIDE FAILURE URL ROUTE 
 pay.hash = hash;
//Making an HTTP/HTTPS call with request
request.post({
 headers: {
 'Accept': 'application/json',
 'Content-Type': 'application/json'
 },
 url: 'https://sandboxsecure.payu.in/_payment', //Testing url for live use https://secure.payu.in/_payment
 form: pay
 }, function (error, httpRes, body) {
if (error) 
 res.send(
 {status: false, 
 message:error.toString()
 }
 );
if (httpRes.statusCode === 200) {
 res.send(body);
 } else if (httpRes.statusCode >= 300 && 
 httpRes.statusCode <= 400) {
 res.redirect(httpRes.headers.location.toString());
 }
 })
});

//Route for success
router.post('/payment/success', isLoggedIn, (req, res) => {
 res.send('Payment Success');
});

//Route for failure
router.post('/payment/fail', isLoggedIn, (req, res) => {
 res.send('Payment Failed');
});

module.exports = router;