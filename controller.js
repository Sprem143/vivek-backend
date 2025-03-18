const Admin = require('./model')
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt= require('jsonwebtoken');
require('dotenv').config();
const security_key= 'admin_panel';
const Homepage = require('./pagemodel/home')



exports.signup = async (req, res) => {
  console.log('sign up');
  const { name, mobile, email, password, addedby } = req.body;
  const hashpassword = await bcryptjs.hash(password, 10)
  console.log(hashpassword);
  let admin = new Admin({ name, mobile, email, password: hashpassword });
  await admin.save()
    .then(async (newAdmin) => {
      res.status(200).json({ status: true })
    }).catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
}

exports.login = async (req, res) => {
try{
  const mobile = req.body.mobile;
  const password= req.body.password
  let user= await Admin.findOne({mobile:mobile});
  if(!user){
    return res.status(404).json({msg:"User not found"})
  }
 if( await bcryptjs.compare(password, user.password)){
  const token= jwt.sign({mobile:user.mobile},security_key, { expiresIn: "2h" } )
  res.status(200).json({token:token})
 }else{
  res.json({msg:"Wrong password"})
 }
}catch(err){
  console.log(err)
}
}

exports.verifytoken = async (req, res) => {
  try{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({status:false, msg: "Authorization header missing" });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({status:false, msg: "Token missing from authorization header" });
    }
    let admin;
    try {
      admin = jwt.verify(token, security_key); 
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({status:false, msg: "Session expired" });
      }
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({status:false, msg: "Invalid token, Please relogin" });
      }
      throw err; 
    }

   if(admin.mobile){
    return res.status(200).json({status:true})
   }
 
  }catch(err){
    console.log(err)
  }
  }

exports.getprofile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ msg: "Authorization header missing" });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({status:false, msg: "Token missing from authorization header" });
    }
    let admin;
    try {
      admin = jwt.verify(token, security_key); 
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({status:false, msg: "Session expired" });
      }
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({status:false, msg: "Invalid token, Please relogin" });
      }
      throw err; 
    }
    const user = await Admin.findOne({ mobile: admin.mobile });
    if (!user) {
      return res.status(404).json({ msg: "Admin not found" });
    }
    return res.status(200).json({status:true, admin: user, msg: "Profile retrieved successfully" });

  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ msg: "An unexpected error occurred", error: err.message });
  }
};

exports.islogin = async(req,res)=>{
  try {
    const {token} = req.body;
    if (!token) {
      return res.status(401).json({ msg: "Token missing from authorization header" });
    }
    let admin;
    try {
      admin = jwt.verify(token, security_key); 
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ msg: "Session expired" });
      }
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ msg: "Invalid token, Please relogin" });
      }
      throw err; 
    }
if(admin){
  res.status(200).json({status:true})
}
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ msg: "An unexpected error occurred", error: err.message });
  }
}

exports.changeheading=async(req,res)=>{
  try{
     const {heading,contentid}= req.body;
     let count = await Homepage.countDocuments()
     if(count==0){
      let homeheading = new Homepage({heading:heading})
      await homeheading.save()
      .then(()=> res.status(200).json({status:true}))
      .catch((err)=> res.status(500).json({status:false, msg:err}))
     }else{
         await Homepage.findOneAndUpdate(
          {_id:contentid},
          {$set:{heading: heading}},
          {new:true}
         )
         .then(()=> res.status(200).json({status:true}))
      .catch((err)=> res.status(500).json({status:false, msg:err}))
     }

  }catch(err){
    console.log(err)
    res.status(500).json({status:false, msg:err})
  }
}

exports.getcontent=async(req,res)=>{
  try{
        const page = req.body.page;
        if(page == 'home'){
         let homecontent= await Homepage.find();
         homecontent=homecontent[0];
          return res.status(200).json({status:true, data:homecontent})
        }
  }catch(err){
    console.log(err)
    res.status(500).json({status:false, msg:err})
  }
}

// exports.changeheading=async(req,res)=>{
//   try{

//   }catch(err){
//     console.log(err)
//     res.status(500).json({status:false, msg:err})
//   }
// }


