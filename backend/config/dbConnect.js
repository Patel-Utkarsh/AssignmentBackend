const mongoose = require("mongoose")

exports.dbConnect = () => {
    mongoose.connect('mongodb+srv://utkarshp04:ySRIE8PyN4xskPII@cluster0.nuzes1o.mongodb.net/assignment_backend',{
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