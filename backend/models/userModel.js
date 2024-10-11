const  mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
    },

    password : {
        type : String,
        required : true,
    },

    friends : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "user"
        }
    ],

    posts : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "post"
        }

    ],


    likes : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "post"
        }

    ],

    comments : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "comment"
        }

    ],

    pending_friend_requests : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "user"


        }

    ]


},{timestamps : true})

module.exports = mongoose.model('user',userSchema);