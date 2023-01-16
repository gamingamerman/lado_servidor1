const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const PORT = 3000;

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// routes
app.use('/api/products',require('./routes/products'));
app.use('/api/categories',require('./routes/categories'));
app.use('/api/orders',require('./routes/orders'));

app.listen(3000, ()=>{
    console.log("El servidor está escuchando en el puerto: "+PORT);
});