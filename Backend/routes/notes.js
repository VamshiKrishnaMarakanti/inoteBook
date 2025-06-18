const express = require("express");
const router = express.Router();
const fetchuser = require("../MiddleWare'/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1:get All the noted using: Get "/api/notes/fetchallnotes".login requried
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

  res.json([]);
});

//Route 2:Add new notes using: Post "/api/notes/addnote".login requried
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 charcters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await notes.save();
      res.json(savedNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3:Update existing Notes: PUT "/api/notes/updatenote".login requried
router.put("/updatenote/:id", fetchuser, async (req, res) => {
        try {
                
       
  const { title, description, tag } = req.body;
  //Create a newNote Object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  //Find the note to updated and update it
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note }); }
   catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
});

//Route 4:Delete existing Notes: PUT "/api/notes/deletenote".login requried
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
        try {
                
        
  //Find the note to deleted and delete it
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndDelete(req.params.id)
  res.json({ "Sucess": "Note has been deleted",note:note });
} catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }});

module.exports = router;
