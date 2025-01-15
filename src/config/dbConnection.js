const mongoose=require('mongoose')
require('dotenv').config()

const db_connection=async ()=>{
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`Database Connected Successfully`)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports=db_connection
