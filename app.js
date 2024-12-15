const express = require('express');
const app = express();
const axios = require('axios')
const path = require('path')
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:8080', 'https://shrivinayk.in'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],  
}));
// require('./connection/connections')
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


// app.listen(3000, () => {
//         console.log(`Server is running on port ${process.env.PORT}`);
//       });


const bodyparser = require('body-parser');
const EmployeRoute = require('./routes/employe')
const PurchaseRoute = require('./routes/purchaseroute')
const  SellRoute = require('./routes/sellroute')
const AuthRoute = require('./routes/authroute')
const AdminRoute = require('./routes/adminroute')






app.use(cors()); 
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/purchase',PurchaseRoute)
app.use('/Sell',SellRoute)
app.use('/Employe',EmployeRoute)
app.use('/Auth',AuthRoute)
app.use('/Admin',AdminRoute)
app.get('/',(req,res)=>{
    res.send('api work correctly')
})


