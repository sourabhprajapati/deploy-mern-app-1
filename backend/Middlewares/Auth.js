const jwt=require('jsonwebtoken')
const ensureAuthenticated=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        res.status(403).json({message:"unauthorized,jwt is required"})
    }
    try {
        const decode=jwt.verify(auth,process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        res.status(403).json({message:"unauthorized,jwt is required or expired"})
    }
}
module.exports=ensureAuthenticated;