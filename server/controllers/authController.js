const User =  require("../models/userModel")
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const secretKey = "secretkeyaljdfsjlsdfsadfjlsdf"


const signup = async(req,res) =>{
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = User({...req.body,password:hash});
    try{
        // var token2 = jwt.sign(newUser,secretKey,{expiresIn:"48h"});
        const savedUser = await newUser.save();
        res.send(savedUser);

    }catch(err){
        console.log("error while signup new user "+ err)
    }

}

const signin = async(req,res) =>{
    const user = {...req.body}
    try{
        const dbUser = await User.findOne({username:req.body.username});
        if(dbUser){
            let isValid = bcrypt.compareSync(user.password,dbUser.password); 
            if(isValid){
                var token2 = jwt.sign(user,secretKey,{expiresIn:"48h"});
                res.send({user,token2})
            }else{
                res.send("Incorrect Password")
            }

        }else{
            res.send("please create account first")
        }
            

    }catch(err){
        console.log("error while login "+ err)
    }
    
}
function verifyToken(req,res,next){
    const headerToken = req.headers["token"]
    if(!headerToken){
        res.send("You are not authenticated")
    }else{
        const tokenArray = headerToken.split(" ")
        const token = tokenArray[1];
        jwt.verify(token,secretKey,(err,user)=>{
            if(err){
                res.send("Token is not valid")
            }else{
                req.user = user
                next();
            }
        })
        
        
        
    }

}

module.exports =  {signin,signup,verifyToken};