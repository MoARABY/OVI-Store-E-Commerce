const express = require('express');
const app=express()
const cors = require('cors')
const compression = require('compression')
const hpp = require('hpp')
const mongooseSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const path = require('path')
require('dotenv').config()

const { webhookCheckout } = require('./src/controllers/orderController');




// 
app.use(cors())
app.options('*', cors())
app.use(helmet())
app.use(cookieParser())
app.use(compression())


app.post(
    '/webhook-checkout',
    express.raw({ type: 'application/json' }),
    webhookCheckout
);



app.use(express.json(limit='20kb'));
app.use(express.urlencoded({ extended: true  }));


app.use(mongooseSanitize())
app.use(xss())
app.use(
    hpp({
        whitelist: [
            'price',
            'sold',
            'quantity',
            'ratingsAverage',
            'ratingsQuantity',
        ],
    })
);

const uploadsPath = process.env.UPLOADS_PATH || path.join(__dirname, 'src', 'uploads');
app.use(express.static(uploadsPath));

// app.use(express.static(path.join(__dirname,'src', 'uploads')))



// app mudules
const db_connection= require('./src/config/dbConnection')
const apiError=require('./src/utils/apiError')
const globalError = require('./src/middlewares/errorMiddleware')




// app routes
const mountRoute = require('./src/routes/mountRoute');
const { json } = require('stream/consumers');
mountRoute(app)






app.get('/api/v1/',(req,res)=>{
    res.status(200).json("Welcome To Our E-Commerce Platform")
})
app.all('*',(req,res,next)=>{
    const err = new apiError('not Found!',404)
    next(err)
})

// global error handler
app.use(globalError)


const PORT=process.env.PORT || 3000
const server = app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`)
    db_connection()
})

process.on('unhandledRejection',(err)=>{
    console.log(`unhandledRejection Error`,err)
    server.close(()=>{
        process.exit(1)
    })
})
