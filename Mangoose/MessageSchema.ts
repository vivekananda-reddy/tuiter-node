/**
 * @file Implements mongoose schema to CRUD
 * documents in the Messages collection
 */

import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";


const MessageSchema = new mongoose.Schema<Message>({

    message:{type:String, required:true},
    sender : {type: Schema.Types.ObjectId, ref: "UserModel"},
    receiver : {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type:Date, default: Date.now}
}, {collection: "messages"});
export default MessageSchema;