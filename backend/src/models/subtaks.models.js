import mongoose, { Schema } from 'mongoose'

const subtaskSchema = new mongoose.Schema({
title : {
    type : String,
    required : true,
    trim : true
},
task : {
    type : Schema.Types.ObjectId,
    ref : "Task",
    required : true
},
isCompleted : {
    type : Boolean,
    default : false
},
createdBy : {
    type: Schema.Types.ObjectId,
    ref : "User",
    required : true
}
} , {timestamps : true} )

export const Subtask = mongoose.model("Subtask" , subtaskSchema)