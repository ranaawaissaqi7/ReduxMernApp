const jwt=require("jsonwebtoken")
const UserModel=require("../models/usersSchema")

const auth=async(req,res,next)=>{

    try {
        const token = req.cookies.jwtoken
        
        const verifytoken = jwt.verify(token,process.env.SECURE_KEY);
        
        const rootUser = await userdb.findOne({_id:verifytoken._id,"tokens.token":token});
        
        if(!rootUser){
            return res.status(422).json({error:"user not found"})
        }

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (err) {
        res.status(422).json({error:err})
    }
}

module.exports=auth;