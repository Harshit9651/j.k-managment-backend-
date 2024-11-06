const express = require('express');
const app = express();
const axios = require('axios')
const path = require('path')
const cors = require('cors');
require('./connection/connections')





const bodyparser = require('body-parser');
const EmployeRoute = require('./routes/employe')
const PurchaseRoute = require('./routes/purchaseroute')







app.use(cors()); 
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/purchase',PurchaseRoute)

app.listen(3000 ,()=>{
    console.log('app listen at port number 3000')
})
app.get('/',(req,res)=>{
    res.send('api work correctly')
})