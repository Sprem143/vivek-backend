const express= require('express')
const router= express.Router();

const {getprofile, signup, login, islogin,verifytoken,changeheading,getcontent}= require('./controller')

router.post('/signup',signup);
router.post('/login', login);
router.post('/verifytoken', verifytoken);
router.post('/islogin', islogin);
router.get('/getprofile', getprofile);
router.put('/changeheading',changeheading)
router.post('/getcontent',getcontent)


module.exports=router;