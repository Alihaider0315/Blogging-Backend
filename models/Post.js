const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    title:{
        type : String,
        required: true,
        
    },
    desc:{
        type : String,
        required : false,
    },
    photo : {
        type : String,
        required : false
    },
    username:{
        type : String,
        required : false,
    },
    userId:{
        type : String,
        required : false,   
    },
    categories:{
        type : Array,

    },

},{timestamps:true})

module.exports= mongoose.model("Post",PostSchema)