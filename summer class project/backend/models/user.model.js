import {Schema, model} from 'mongoose';
import ExperienceSchema from './experience.model.js';

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
    profile:{
        type: String,
        default: undefined
    },
    profileCompleted:{
        type: Boolean,
        default: false,
    },
    ProfilePicture:{
        url:{
            type:String,
        }
    },

    category:{
        type: String,
        enum:["App Development", "Web Development", "Data Science", "Machine Learning", "UI/UX Design", "Cyber Security"],
        default:undefined
    },

    skills: {
    type: [String],
    default: undefined
  },

  about: {
    type: String,
    default: undefined
  },


  experiences: [ExperienceSchema],

});

const User = model('User', userSchema);
export default User;