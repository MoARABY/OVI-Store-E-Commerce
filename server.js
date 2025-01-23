const express = require('express')
const app = express()
require('dotenv').config()



app.use(express.json())
app.use(express.urlencoded({extended:false}))

const dbConnection = require('./DB/dbConnection')
const globalError = require('./src/middlewares/errorMiddleware')




const userRoute = require('./src/modules/routes/userRoute')
const authRoute = require('./src/modules/routes/authRoute')


app.use('/api/v1/users',userRoute)
app.use('/api/v1/auth',authRoute)

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