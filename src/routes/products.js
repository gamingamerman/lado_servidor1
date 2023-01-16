let { Router } = require('express');
let router = Router();

const PRODUCTS = require('../data/products');
const PROPERTIES = ["name","price"];

let lastId = Math.max(...PRODUCTS.map(c=>c.id));

router.get('/', (req,res)=>{
    res.json(PRODUCTS);
});

router.get('/:id', (req,res)=>{
    let id = req.params.id;
    let product = PRODUCTS.filter(product=>product.id==id)[0];
    if (product) {
        res.status(200).json(product);    
    } else {
        res.status(404).json({
            error: "Not found the product with id="+id
        });
    }
});

router.post('/', (req,res)=>{
    let product = req.body;
    if (product.name) {
        // Checking all properties in newData are in PROPERTIES
        if (Object.keys(product).every(property=>PROPERTIES.includes(property))) {
            product.id = ++lastId;
            PRODUCTS.push(product);
            res.status(201).json(product);
        } else {
            res.status(422).json({
                error: "At least some property is wrong."
            });
        }
    } else {
        res.status(422).json({
            error: "'name' and 'price' of product are required."
        });
    }
});

router.delete('/:id', (req,res)=>{
    let id = req.params.id;
    let index = PRODUCTS.map(p=>p.id).indexOf(parseInt(id));
    if (index>=0) {
        res.status(200).json(
            PRODUCTS.splice(index,1)[0]
        )
    } else {
        res.status(404).json({
            error: "Not found the product with id="+id
        });
    }
});

router.put('/:id', (req,res)=>{
    let id = req.params.id;
    let product = PRODUCTS.filter(c=>c.id==id)[0];
    if (product) {
        let newData=req.body;        
        // Checking all properties in newData are in PROPERTIES
        if (Object.keys(newData).every(property=>PROPERTIES.includes(property))) {
            for (let property in newData) {
                product[property]=newData[property];
            }
            res.status(200).json(product);    
        } else {
            res.status(422).json({
                error: "At least some property is wrong."
            });
        }

    } else {
        res.status(404).json({
            error: "Not found the product with id="+id
        })
    }
});

module.exports = router;