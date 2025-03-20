const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginupValidation } = require('../Middlewares/AuthValidation');

const router=require('express').Router();


router.post('/login',loginupValidation,login)


router.post('/signup',signupValidation,signup)

module.exports=router;