const mongoose=require("mongoose")

const Userschema=mongoose.Schema({
    name:String,
    email:String,
    pwd:String,
    age:Number
})

const UserModel=mongoose.model("User",Userschema)

module.exports={UserModel}