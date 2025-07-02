import mongoose, { Schema } from 'mongoose'
import { AvailableUserRoles, UserRoleEnum } from '../utils/constant.js'

const projectMemberSchema = new mongoose.Schema({
user : {
    type : Schema.Types.ObjectId,
    ref : "User",
    required : true
},
project : {
    type : Schema.Types.ObjectId,
    ref : "Project",
    required : true
},
role : {
    type : String,
    enum  : AvailableUserRoles,
    default :  UserRoleEnum.MEMBER
}
}, {timestamps : true})

export const projectMember = mongoose.model("ProjectMember" , projectMemberSchema)