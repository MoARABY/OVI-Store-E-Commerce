const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,'user name must be provided']
    },
    email : {
        type:String,
        required:[true,'user email must be provided'],
        unique:[true,'email must be unique']
    },
    phone : {
        type:String,
        required:[true,'user phone number must be provided'],
        unique:[true,'phone number must be unique']
    },
    password : {
        type:String,
        required:[true,'password must be provided'],
        minlength:[6,'Password must be at least 6 characters long']
    },
    role : {
        type:String,
        enum:['user','admin','manager'],
        default:'user'
    },
    isActive : {
        type:String,
        default:true
    },
    passwordChangedAt : Date,
    passwordResetCode : String,
    passwordResetCodeExpires : Date,
    passwordResetCodeVerified : Boolean,
    phoneVerifyCode:String,
    phoneVerifyCodeExpires:Date,
    phoneVerifyCodeVerified :Boolean,
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


},{timestamps:true})

userSchema.pre('save',async function(next){
    if(this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password,10)
        this.password = hashedPassword
    }
    next()
})


module.exports = mongoose.model('User',userSchema)