const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
require('dotenv').config()



app.use(express.json())
app.use(express.urlencoded({ extended: true  }));
app.use(cookieParser());


const dbConnection = require('./DB/dbConnection')
const globalError = require('./src/middlewares/errorMiddleware')
const mountRoute = require('./src/modules/routes/mountRoute')



mountRoute(app)

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