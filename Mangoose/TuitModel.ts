import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";

const UserModel = mongoose.model('TuitModel', TuitSchema);
export default UserModel;