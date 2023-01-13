const mongoose=require("mongoose")

const noteschema=mongoose.Schema({
    title:String,
    userID:String,
    category:String,
    note:String
})

const NotesModel=mongoose.model("note",noteschema)

module.exports={NotesModel}