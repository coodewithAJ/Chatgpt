const express =  require("express");
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoutes = require("./routes/authRoutes");


const app = express();
dotenv.config();

app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes);
app.use("/api/v1/openai",require("./routes/openAiRoutes"))



app.listen(process.env.PORT,async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`server is running on port ${process.env.PORT} and connected to database`)
    }catch(err){
        console.log("error while connecting to database")
    }
})

