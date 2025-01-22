const express = require('express')
const app = express()
require('dotenv').config()





const dbConnection = require('./DB/dbConnection')

app.get('/api/v1/',(req,res)=>{
    res.json("welcome to OVI store home Page 📱")
})




const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`server start listning at port ${PORT}`)
    dbConnection()
})