const express = require("express");
const app = express();
require("dotenv").config()//para poder usar las variables de entorno
const PORT = process.env.PORT || 3000;

const { handleTypeError }= require('./middleware/errors');
const { dbConnection } = require("./config/config")

app.use(express.json())

app.use("/posts",require("./routes/posts"))
app.use("/comments",require("./routes/comments"))
app.use("/users",require("./routes/users"))
app.use("/comments",require("./routes/comments"))

dbConnection()

app.use(handleTypeError)
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));