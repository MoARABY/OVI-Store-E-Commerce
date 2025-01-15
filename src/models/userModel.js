const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('dotenv').config()


const userSchema = new mongoose.Schema({

    name : {
        type:String,
        trim : true,
        required:[true,'Please provide a name']
        },
    slug : {
        type:String,
        lowercase:true
        },
    email : {
        type:String,
        unique:true,
        required:[true,'Please provide an email']
    },
    phone : {
        type:String,
        unique:true,
        required:[true,'Please provide a phone number']
        },
        profileImage : String,
    password : {
        type:String,
        required:[true,'Please provide a password'],
        minlength:[6,'Password must be at least 6 characters long']
        },
    role : {
        type:String,
        enum:['admin','user'],
        default:'user'
        },
    isActivated : {
        type:Boolean,
        default:true
        },
    wishlist : [
        {
            type : mongoose.Schema.ObjectId ,
            ref : 'Product'

        }
    ],
    addresses: [
        {
            id: { type: mongoose.Schema.Types.ObjectId },
            alias: String,
            details: String,
            phone: String,
            city: String,
            postalCode: String,
        },
    ],
    passwordChangedAt : Date,
    passwordResetCode : String,
    passwordResetCodeExpires : Date,
    passwordResetCodeVerified : Boolean
},{timestamps:true})


userSchema.pre('save',  async function(next){
    if(!this.isModified('password')) return next()
    const hashedPassword = await bcrypt.hash(this.password,10)
    this.password = hashedPassword
    next()
})

module.exports = mongoose.model('User',userSchema)