const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    power:{
        type:String,
        required:true
    },
    battlecount:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    postedBy:{ 
         type:ObjectId,
         ref:"User"
    }

})

mongoose.model("Post",postSchema)