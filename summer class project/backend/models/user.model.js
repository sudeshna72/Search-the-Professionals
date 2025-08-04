import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        

    },
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    },

    profileCompleted:{
        type: Boolean,
        default: false,
    },

    category:{
        type: String,
        enum:["App Development", "Web Development", "Data Science", "Machine Learning", "UI/UX Design", "Cyber Security"],
        default:undefined
    }

});

const User = model('User', userSchema);
export default User;