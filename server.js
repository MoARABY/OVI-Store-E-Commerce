const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors')
const compression = require('compression')
const hpp = require('hpp');
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
require('dotenv').config()


app.use(cors())
app.options('*',cors())
app.use(compression())
app.use(express.json({ limit: '20kb' }))
app.use(express.urlencoded({ extended: true  }));
app.use(cookieParser());

// apply http parameter poulltion against attacks
app.use(hpp({
    whitelist: [
        'price',
        'sold',
        'quantity',
        'ratingsAverage',
        'ratingsQuantity',
    ],
}))
// apply data sanitize against noSQL injection and html attacks
app.use(mongoSanitize())
app.use(xss())
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const dbConnection = require('./DB/dbConnection')
const globalError = require('./src/middlewares/errorMiddleware')
const mountRoute = require('./src/modules/routes/mountRoute')
const {webhookCheckout} = require('./src/modules/controllers/orderController')



mountRoute(app)
app.post(
    '/webhook-checkout',
    express.raw({ type: 'application/json' }),
    webhookCheckout
);
app.get('/',(req,res)=>{
    res.status(200).json('welcome to test endPoint')
})
app.get('/api/v1/',(req,res)=>{
    res.json("welcome to OVI store home Page 📱")
})

// swagger
const swaggerSetup = require('./swagger');  
swaggerSetup(app);

app.all('*',(req,res)=>{
    res.status(404).json({status:'fail',msg:'page not found'})
})
app.use(globalError)



const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`server start listning at port ${PORT}`)
    dbConnection()
})


process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(() => {
        console.error(`Shutting down....`);
        process.exit(1);
    });
});

module.exports = app

