const  mongoose  = require("mongoose");

const postSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true,
    },

    author : {
        type : mongoose.Schema.ObjectId,
        ref : "user"
    },

    likes : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "user"

        }
       
    ],

    comments :  [
        {
            type : mongoose.Schema.ObjectId,
            ref : "comment"

        }
       
    ],
},{timestamps : true})

module.exports = mongoose.model('post',postSchema);