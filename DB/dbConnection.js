const mongoose = require('mongoose')

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('connected to database')
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1)
    }
}

module.exports = dbConnection