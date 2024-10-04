const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;


app.use(express.json());

app.get("/", (req, res)=> res.send("I am Healthy"));

app.get("/",)

app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));