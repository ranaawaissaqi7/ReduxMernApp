const dotenv=require("dotenv")
dotenv.config({path:"./config.env"})

const cookiParser = require("cookie-parser")

const cors=require("cors")
const express=require("express")
const app=express()

//require DataBase
require("./dbConn/dbConn")
const port=process.env.PORT

app.use(express.json())
app.use(cookiParser())
app.use(cors())
//require Routes
const routes=require("./routes/allRoutes")
app.use(routes)

//listen App
app.listen(port,()=>{
    console.log("Server is Started On PORT",port)
})