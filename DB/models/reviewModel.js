
const mongoose = require('mongoose')
const productModel = require('./productModel')
const reviewSchema = new mongoose.Schema({

    title:{
        type : String,
    },
    ratings : {
        type:Number,
        required : [true,'Review Must Have A Rating'],
        min:0,
        max:5
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : [true,'Review Must Belong To User']
    },
    productId : {
        type : mongoose.Schema.ObjectId,
        ref : 'Product',
        required : [true,'Review Must Belong To Product']
    }
},{timestamps:true})



// win you run without populate we will use userId as main field
// win using populate it turn into {_id,name} so we will use userId._id
reviewSchema.pre(/^find/,function(next){
    this.populate([{path:'userId',select:'name'},{path:'productId',select:'title'}])
    next()
})

reviewSchema.statics.calcAverageRatings = async function(productId){

}


reviewSchema.post('save',async function(){
    await this.constructor.calcAverageRatings(this.productId)
})


module.exports = mongoose.model('Review',reviewSchema)