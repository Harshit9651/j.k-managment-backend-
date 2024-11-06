const express = require('express');
const app = express();
const axios = require('axios')
const path = require('path')
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:8080', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],  
}));
const connectDB = require('./connection/connections')
require('dotenv').config()
connectDB()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(3000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });





const bodyparser = require('body-parser');
const EmployeRoute = require('./routes/employe')
const PurchaseRoute = require('./routes/purchaseroute')
const  SellRoute = require('./routes/sellroute')







app.use(cors()); 
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/purchase',PurchaseRoute)
app.use('/Sell',SellRoute)

app.get('/',(req,res)=>{
    res.send('api work correctly')
})