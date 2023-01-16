let { Router } = require('express');
let router = Router();

const ORDERS = [
    {
        idOrder: 1,
        user: "Pepe",
        products: [
            {id: 3, amount: 1},
            {id: 52, amount: 3},
            {id: 97, amount: 2},
        ]
    }
];

let countIdOrder = 2;

router.get('/', (req,res)=>{
    res.json(ORDERS);
});

router.post('/', (req,res)=>{
    let order = req.body;
    console.log("data in the body:",order);
    if (order.user) {
        // Checking all properties in newData are in PROPERTIES
        if (order.products) {
            if (order.products.length) {
                if (order.products.every(p=>p.id&&p.amount)) {
                    order.idOrder = countIdOrder++;
                    ORDERS.push(order)
                    res.status(201).json(order);
                } else {
                    res.status(422).json({
                        error: "Each product needs 'id' and 'amount'"
                    });                    
                }
            } else {
                res.status(422).json({
                    error: "This orders does not have any product"
                });
            }
        } else {
            res.status(422).json({
                error: "'products' is required"
            });
        }
    } else {
        res.status(422).json({
            error: "'user' is required."
        });
    }
});


module.exports = router;