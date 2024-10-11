const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
   
    
    comment : {
        type : String,
    },

    author : {
        type : mongoose.Schema.ObjectId,
        ref : "user"
    }
})

module.exports = mongoose.model("comment",commentSchema);