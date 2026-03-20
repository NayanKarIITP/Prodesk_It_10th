const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/postRoutes"));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});