const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
require('dotenv').config()



app.use(express.json())
app.use(express.urlencoded({ extended: true  }));
app.use(cookieParser());


const dbConnection = require('./DB/dbConnection')
const globalError = require('./src/middlewares/errorMiddleware')



const userRoute = require('./src/modules/routes/userRoute')
const authRoute = require('./src/modules/routes/authRoute')
const categoryRoute = require('./src/modules/routes/categoryRoute')
const subCategoryRoute = require('./src/modules/routes/subCategoryRoute')
const brandRoute = require('./src/modules/routes/brandRoute')
const productRoute = require('./src/modules/routes/productRoute')
const reviewRoute = require('./src/modules/routes/reviewRoute')




app.use('/api/v1/users',userRoute)
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/categories',categoryRoute)
app.use('/api/v1/subCategories',subCategoryRoute)
app.use('/api/v1/brands',brandRoute)
app.use('/api/v1/products',productRoute)
app.use('/api/v1/reviews',reviewRoute)




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