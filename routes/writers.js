import Writer from "../modules/Writer.js";
import express from 'express';

const writersRouter = express.Router();

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


export default writersRouter;


