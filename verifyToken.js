const jwt = require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json("You are not Authenticated!")
    }
    jwt.verify(token,process.env.SECRET,async(err,data)=>{
        if(err){
            return res.status(403).json("Token Is Not Valid!")
        }
        req.userId=data.id
        console.log("Passed")
        next()
    })
}
module.exports = verifyToken