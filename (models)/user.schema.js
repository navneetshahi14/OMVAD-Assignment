import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    uid:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

export default mongoose.models.User || mongoose.model('User',UserSchema);