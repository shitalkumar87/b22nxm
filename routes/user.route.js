const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouter=express.Router()
userRouter.use(express.json())
 const {UserModel}=require("../models/user.model")

userRouter.post("/login",async(req,res)=>{
    const {email,pwd}=req.body
    try{
        const user = await UserModel.find({email}) 
         
        
        if(user.length>0){
            bcrypt.compare(pwd, user[0].pwd, (err, result)=>{

                if(result){
                    var token = jwt.sign({ userID:user[0]._id },  process.env.key);
                    res.send({"msg":"Login done","token": token})
                }
                else{
                    res.send("Wrong crediantials")
                }
            });

             
        }
        else{
            res.send("Wrong crediantials")
        }
         
    }
    catch(err){
        console.log(err)
    }
})

userRouter.post("/register",async(req,res)=>{
    const {email,pwd,name,age}=req.body
    try{
        bcrypt.hash(pwd, 5,async (err, secure_pwd)=>{
             if(err){
                console.log(err)
             }
            else{
                const user = new UserModel({email,pwd:secure_pwd,name,age})
                  await user.save()
                res.send("Data posted Successfully")
            }

        });
        
         
    }
    catch(err){
        console.log(err)
    }
})

userRouter.patch("/edit/:id",async(req,res)=>{
    const Id=req.params.id
    const payload=req.body
    try{
         await UserModel.findByIdAndUpdate({_id:Id},payload)
        res.send("Data patch Successfully")
    }
    catch(err){
        console.log(err)
    }
})

userRouter.delete("/delete/:id",async(req,res)=>{
    const Id=req.params.id
    try{
         await UserModel.findByIdAndDelete({_id:Id})
        res.send("Data deleted Successfully")
    }
    catch(err){
        console.log(err)
    }
})

module.exports={userRouter}