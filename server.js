const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors')
const compression = require('compression')
require('dotenv').config()


app.use(cors())
app.options('*',cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true  }));
app.use(cookieParser());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const dbConnection = require('./DB/dbConnection')
const globalError = require('./src/middlewares/errorMiddleware')
const mountRoute = require('./src/modules/routes/mountRoute')
const webhookCheckout = require('./src/modules/controllers/orderController')



mountRoute(app)
app.post(
    '/webhook-checkout',
    express.raw({ type: 'application/json' }),
    webhookCheckout
);
app.get('/api/v1/',(req,res)=>{
    res.json("welcome to OVI store home Page 📱")
})
app.all('*',(req,res)=>{
    res.status(404).json({status:'fail',msg:'page not found'})
})
app.use(globalError)



const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`server start listning at port ${PORT}`)
    dbConnection()
})