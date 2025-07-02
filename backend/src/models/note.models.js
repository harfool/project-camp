import mongoose, { Schema, Types } from "mongoose";

const projectNoteSchema = new mongoose.Schema({

project : {
    type : Schema.Types.ObjectId,
    ref : "Project",
    required : true
},

createdBy : {
    type : Schema.Types.ObjectId,
    ref : "User",
    required : true
},
content : {
    typeof : String,
    required : true

}

} , {timestamps : true}) 

export const ProjectNotes = mongoose.model("ProjectNotes", projectNoteSchema)