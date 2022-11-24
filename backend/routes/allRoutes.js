const express = require("express")
const jwt=require("jsonwebtoken");
const auth = require("../midleware/auth");
//requireSchema
const UserModel = require("../models/usersSchema");

const router = express.Router()

//getUsers
router.get("/getUsers", async (req, res) => {
    try {
        const getUsers = await UserModel.find()
        res.json(getUsers)
    } catch (error) {
        res.json({ errMsg: error })
    }
})

//createPost
router.post("/createUser", async (req, res) => {
    const { fullName, phoneNo, email, password, cpassword } = req.body;
    try {
        //serchUser
        const searchUser = await UserModel.findOne({email: email })
        if (searchUser) {
            return res.status(422).json({ error: "User is Allready Exit" })
        } else if (password !== cpassword) {
            return res.status(422).json({ error: "Password is Not Match" })
        } else {
            const addUser = new UserModel({ fullName, phoneNo, email, password, cpassword })
            await addUser.save()
            res.status(202).json(addUser)
        }

    } catch (err) {
        res.status(422).json({ error: err })
    }
})
//sign in
router.post("/signIn", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({error: "Please Fill All Field " })
    }
    try {
        const findUser=await UserModel.findOne({email:email})
        if (findUser) {
            if (password!==findUser.password) {
                return res.status(422).json({error:"password no match"})
            }else{
                // token generate
                  const token = await findUser.generateAuthtoken();
                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });
                res.status(201).json({msg:"sucess"})
            }
        }else{
            res.status(422).json({error:"Please SignUp"})
        }
      

        
            
    } catch (err) {
        res.status(422).json({error:err})
    }


})
//getOneUser
router.get("/getOneUser",auth, async (req, res) => {
    const {id}=req.params
    try {
        const ValidUserOne = await userdb.findOne({_id:id});
        res.status(201).json({status:201,ValidUserOne});
        res.json(ValidUserOne)
    } catch (error) {
        res.status(401).json({status:401,error});
    }
})
//deleteUser
router.delete("/deleteUser/:id", async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await UserModel.findByIdAndDelete({ _id: id })
        if (!deleteUser) {
            res.json({ msg: "No Search User" })
        } else {
            res.json(deleteUser)
        }

    } catch (error) {
        res.json({ errMsg: error })
    }
})

//updtateUser
router.patch("/updateUser/:id", async (req, res) => {
    const { id } = req.params
    try {
        const updtateUser = await UserModel.findByIdAndUpdate({ _id: id }, {
            ...req.body
        })

        res.json(updtateUser)
    } catch (error) {
        res.json({ errMsg: error })
    }
})

module.exports = router