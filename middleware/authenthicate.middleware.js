const jwt=require("jsonwebtoken")

const Authentication=(req,res,next)=>{
    const token=req.headers.authorization
    
    if(token){
       const decoded= jwt.verify(token,  process.env.key )
       if(decoded){
        console.log(decoded)
        const userID=decoded.userID
        req.body.userID=userID
        next()
       }
       else{
        res.send("Login First")
       }
    }
    else{
        res.send("Login First")
    }
     
}

module.exports={Authentication}