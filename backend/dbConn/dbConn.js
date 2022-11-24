const mongoose=require("mongoose")

const DB=process.env.DATABASE

mongoose.connect(DB,()=>{
    console.log("Connect to DataBase SuccessFully")
})