const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { dbConnect } = require("./config/dbConnect");
const router = require("./routes/Routes");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
    cors({
        origin: ["https://assignment-backend-cyan.vercel.app", "http://127.0.0.1:3000", "http://localhost:3000"],
        credentials: true, // Ensure this is true for cookies to be passed
    })
);

app.use(router);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "welcome",
    });
});

dbConnect();
app.listen(8000, () => {
    console.log("app has started");
});
