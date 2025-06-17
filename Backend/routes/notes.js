const express = require('express');
const router =express.Router();
const fetchuser =require("../MiddleWare'/fetchuser");
const Notes =require("../models/Notes");
const {body, validationResult}= require ('express-validator');


//Route 1:get All the noted using: Get "/api/notes/fetchallnotes".login requried
router.get('/fetchallnotes',fetchuser, async(req,res)=> {
        try {
              const notes =await Notes.find({user:req.user.id});
              res.json(notes) 

        } catch (error) {
             console.error(error.message);
             res.status(500).send("Internal Server Error")   
        }
        
        res.json([])
})

//Route 2:Add new notes using: Post "/api/notes/addnote".login requried
router.post('/addnote',fetchuser,[
body('title','Enter a valid title').isLength({min:3}),
body('description', 'Description must be atleast 5 charcters').isLength({min:5})
] ,async(req,res)=> {
        try {
            const {title,description,tag}=req.body
            
            const errors =validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
            const notes =new Notes ({
                title,description,tag,user:req.user.id
            })
            const savedNotes =await notes.save()
               res.json(savedNotes)  

        } catch (error) {
             console.error(error.message);
             res.status(500).send("Internal Server Error")   
        }
})

module.exports = router