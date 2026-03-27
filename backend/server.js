const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

const cors = require("cors");
// app.use(cors());
app.use(cors({
  origin: "https://prodesk-it-10th.onrender.com" 
}));
app.use(express.json());

// Routes
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/postRoutes"));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});