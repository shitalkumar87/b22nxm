
const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const NotesRouter=express.Router()
const {NotesModel}=require("../models/notes.model")
NotesRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization
    const data= await NotesModel.find()
     try{
        jwt.verify(token, 'masai', (err, decoded)=>{
            if(err){
                res.send("err")
            }
            else{
                res.send(data)
            }
        })
     }
     catch(err){
        res.send("Eroor")
     }
})

NotesRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
           let new_notes=new NotesModel(payload)
           await new_notes.save()
           res.send("create the notes")
    }
    catch(err){
         res.send("wrong Credentials")
    }
    
    
})

NotesRouter.patch("/edit/id",async(req,res)=>{
    const Id=req.params.id;
    const payload=req.body;
    const note= await NotesModel.findOne({_id:Id})
    const user_in_note=note.userID
    const userid_making_req=req.body.userID
    try{
        if(userid_making_req!==user_in_note){
            res.send({msg:"you are not authorized"})
        }
         else{
            await NotesModel.findByIdAndUpdate({_id:Id},payload)
            res.send("update the notes")
         }
         
         
    }
    catch(err){
        res.send("Wrong Credentials")
    }
     
})

NotesRouter.delete("/delete/:id",async(req,res)=>{
    const Id=req.params.id;
    const note= await NotesModel.findOne({"_id":Id})
    const user_in_note=note.userID
    const userid_making_req=req.body.userID
    try{
        if(user_in_note!==userid_making_req){
            res.send({msg:"You are not authorized"})
        }
        else{
            await NotesModel.findByIdAndDelete({"_id":Id})
            res.send("Data deleted Successfully")
        }
         
        
    }
    catch(err){
        res.send("Wrong Credentials")
    }
})

module.exports={NotesRouter}