const express=require("express")
 
const app=express()
require("dotenv").config()
const {connection}=require("./config/db")
 const {userRouter}=require("./routes/user.route")
 const {NotesRouter}=require("./routes/Note.route")
 const {Authentication}=require("./middleware/authenthicate.middleware")
 const cors=require("cors")
 app.use(cors({origin:"*"}))
 app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Welcome")
})

  
app.use("/users",userRouter)
app.use(Authentication)
app.use("/notes",NotesRouter)
 

 
 
 

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("Coonection to DB")
    }
    catch(error){
         console.log(error)
    }

    console.log(`port is Running on port 8000`)
})