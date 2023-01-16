let { Router } = require('express');
let router = Router();

const PRODUCTS = require('../data/products');

let categories = new Set();

PRODUCTS.forEach(product => categories.add(product.category));
categories.add("Fashion");
categories.add("Cars");

router.get('/', (req,res)=>{
    res.json(Array.from(categories));
});

module.exports = router;