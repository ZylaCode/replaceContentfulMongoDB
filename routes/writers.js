import Writer from "../modules/Writer.js";
import express from 'express';

const writersRouter = express.Router();

writersRouter.get("/", async (req, res) => {
    try {
      const response = await Writer.find();
      res.json(response)
      //res.send('Hello')
    } catch(err){
        res.status(500).json(err)
    }
});

writersRouter.post("/", async (req, res) => {
    try {
        const {authorName, authorImage, authorBiography, bookTitle, bookImage, bookInfo, bookURL} = req.body;
      const response = await Writer.create({authorName, authorImage, authorBiography, bookTitle, bookImage, bookInfo, bookURL});
      res.json(response);
    } catch(err){
        const errors = handleErrors(err);        
        res.status(400).json({errors})
    }
});

writersRouter.get("/:id", async (req, res) => {
   try {
        const id = req.params.id
      const response = await Writer.findById(id);
      res.json(response)
    } catch(err){
        res.status(500).json(err);
    }
});


export default writersRouter;


