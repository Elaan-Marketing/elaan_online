const mongoose = require ('mongoose');

const GuestSchema = new mongoose.Schema({
    otp:{
        type:Number,
        default:0
    },
    name:{
        type:String,
    },
    phone:{
        type:Number,   
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
},{timestamps: true})

const Guest = mongoose.model('Guest', GuestSchema);
module.exports = Guest;