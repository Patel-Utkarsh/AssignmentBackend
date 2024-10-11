const mongoose = require("mongoose")

exports.dbConnect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/BackendAssignment',{
        useNewUrlParser : true,
        useUnifiedTopology : true
    })

    .then(() => {
        console.log('Database Connected Successfully')
        
    })
    .catch((err) => {
        console.log(err)
        process.exit(1);
        
    });

}