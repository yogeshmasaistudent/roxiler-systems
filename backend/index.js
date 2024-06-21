const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const { router, Router } = require("./routes/transactionRoutes");


// middleware 
app.use(express.json());
app.use(cors());

// Route Middleware 
app.use("/api",Router);




const PORT = process.env.PORT || 3030;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`server is Running at ${PORT}`);
  } catch (error) {
    console.log(`Server has Internal Error!`);
  }
});
