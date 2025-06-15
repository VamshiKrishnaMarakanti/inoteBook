const express = require('express');
const User = require ('../models/User');
const router =express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET ='VamshiTheGreat'

//Craete a user using POST:"/api/auth/createuser"
router.post('/createUser', [
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be 5 Characters').isLength({min:5})
],async(req,res)=> {
    //Send error on bad request
    const errors =validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }

    try {
     let user = await User.findOne({email:req.body.email});
    if(user) {
return res.status(400).json({error:"Sorry a user already exist"})
    }
    const salt= await bcrypt.genSalt(10);
    console.log(salt);
    console.log(req.body.password);
    const secPass= await bcrypt.hash(req.body.password, salt);
     user= await User.create({
        name:req.body.name,
        password:secPass,
        email:req.body.email
        })  ;
        const data= {
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET)
        console.log(authToken);
    res.json({authToken})}
    catch(error){
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

module.exports = router