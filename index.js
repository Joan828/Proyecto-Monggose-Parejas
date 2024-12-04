const express = require("express");
const app = express();
const PORT = 8080;

const { handleTypeError }= require('./middleware/errors');
const { dbConnection } = require("./config/config")

app.use(express.json())

app.use("/posts",require("./routes/posts"))
app.use("/comments",require("./routes/comments"))
app.use("/users",require("./routes/users"))

dbConnection()

app.use(handleTypeError)
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));