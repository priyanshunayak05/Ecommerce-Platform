const mongoose = require('mongoose');
const Product = require('./models/Product'); //for schema

const Products = [
  {
    name: 'Table', 
    price: 44000.99,
    
    
    imageUrl: 'https://images.unsplash.com/photo-1565791380713-1756b9a05343?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8VGFibGV8ZW58MHx8MHx8fDA%3D'
    },
    {
    name: 'Chair',
    price: 1500,
    
    imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhaXJ8ZW58MHx8MHx8fDA%3D'
    },{
    name: 'StudyLamp',
    price: 2999.99,
    
    imageUrl: 'https://plus.unsplash.com/premium_photo-1685287731237-d119a3d95711?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZHklMjBsYW1wfGVufDB8fDB8fHww'
    },
    {
    name: 'Stylish Chair',
    price: 4099.99,
    
    imageUrl: 'https://www.istockphoto.com/photo/outdoor-furnitures-gm162148231-23114024?utm_campaign=srp_photos_bottom&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Ffunritures&utm_medium=affiliate&utm_source=unsplash&utm_term=funritures%3A%3Aad-balancing-template%3Aexperiment'
    },
    {
    name: 'Couch',
    price: 6999.99,
    
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D'
    },
]

// return a promise
async function seedDb(){
  await Product.insertMany(Products);
  console.log("data seeded successfully");  
  }
  module.exports = seedDb;