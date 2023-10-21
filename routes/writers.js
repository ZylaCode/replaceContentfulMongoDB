import Writer from "../modules/Writer.js";
import express from 'express';

const writersRouter = express.Router();

const handleErrors = (err, req, res, next) => {
    //Perform some action on the request or response
    console.log(err);
    const statusCode = err.statusCode || 500;
    const statusMessage = err.message || "Internal server error";
    res.status(statusCode).json({error: statusMessage})
    
}


writersRouter.post("/", async (req, res, next) => {
    try {
        const {authorName, authorImage, authorBiography, bookTitle, bookImage, bookInfo, bookURL} = req.body;
        const response = await Writer.create({authorName, authorImage, authorBiography, bookTitle, bookImage, bookInfo, bookURL});
        if(!response){
            return next({statusCode: 400, message: "You can't create a Author"})
        }
        console.log(response, 'response')
        res.json(response);
    } catch(err){
      //  res.status(403).json(err)
        console.log(err)
        return next()
    }
}, handleErrors);


writersRouter.get("/", async (req, res, next) => {
    try {
        const response = await Writer.find();
    //console.log(response)
        res.json(response)
      //res.send('Hello')
    } catch(err){
        console.log(err)
        return next(err)
    }
}, handleErrors);

writersRouter.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const response = await Writer.findById(id);
    if(!response){
        res.status(400).json({message : "Writer doesn't found"})    
    } 
    res.json(response)

    }catch(err){
        console.log(err)
        return next(err)
    }
}, handleErrors)



export default writersRouter;


