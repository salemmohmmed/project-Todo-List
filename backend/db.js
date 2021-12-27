const mongoose= require("mongoose")

const dbURI='mongodb://localhost:27017/TodoListV011'
mongoose.connect(dbURI)

const db = mongoose.connection
db.on("error",(err)=>{
    console.log(" ERROR IN MongoDB",err)
})
db.on("connected",()=>{
    console.log("MongoDB Is CONNECTED")
})