const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ] 
},{timestamps:true})

// token generate
userSchema.methods.generateAuthtoken = async function () {
    try {
        let token = jwt.sign({ _id: this._id },process.env.SECURE_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        res.status(422).json(error)
    }
}

const UserModel=mongoose.model("USERS",userSchema);
module.exports=UserModel;