const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { dbConnect } = require("./config/dbConnect");
const router = require("./routes/Routes");

const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 })

 app.use(
	cors({
        origin: ["https://assignment-backend-cyan.vercel.app", "http://127.0.0.1:3000", "http://localhost:3000"],
		credentials:true,
	})
)

app.use(router)
app.get("/", (req, res) => {
    res.status(200).json({
		message : 'welcome'
	});
});


dbConnect();
app.listen(8000,()=>{
    console.log('app has started');
})