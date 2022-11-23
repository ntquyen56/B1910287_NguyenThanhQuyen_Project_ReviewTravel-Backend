const express = require("express");
const cors = require("cors");

const app = express();
const reviewsRouter = require("./app/routes/review.route");
const sourceRouter = require("./app/routes/source.route");

app.use(cors());
app.use(express.json( {limit:'50mb'}));
app.use("/api/reviews", reviewsRouter);
app.use("/api/source", sourceRouter);

app.get("/",(req, res)=>{
    res.json({ message: "Welcome to review travel."});
});

app.use ("/api/reviews", reviewsRouter);
app.use("/api/source", sourceRouter);


app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Intern Server Error",
    });
});

module.exports = app;