const mongoose =  require("mongoose")


const userSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String,
        
    },
    phone:{
        required:true,
        type:Number
    }
    // customerId:{
    //     type:String,
    //     default:""
    // },
    // subscription:{
    //     type:String,
    //     default:""
    // }
})


const User = mongoose.model("user",userSchema)
module.exports = User;