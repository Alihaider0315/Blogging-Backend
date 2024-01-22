const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const multer = require('multer')
const cookieParser = require('cookie-parser')
const path=require("path")
const AuthRouter = require('./routes/auth')
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')
const userRouter = require('./routes/user')

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Is Connected Sucessfully");
    }
    catch(err){
        console.log(err);
    }
}

dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({origin: 'https://alihaiderblogging.netlify.app',
credentials: true}))
// app.use(cors())
app.use("/api/auth",AuthRouter)
app.use("/api/users",userRouter)
app.use("/api/posts",postRouter)
app.use("/api/comments",commentRouter)

const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})

app.listen(process.env.PORT,()=>{
    connectDB();
    console.log("Server is running on port " +process.env.PORT);
})