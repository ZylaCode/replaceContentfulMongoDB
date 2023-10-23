import express from 'express';
import User from "../modules/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const registerRouter = express.Router();
const secret = process.env.SECRET_TOKEN;

const generateToken = (data) => {
    return jwt.sign(data, secret, {expiresIn: '1800s'})
}
/*
const  authorizationMiddlewareFunction=(req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.sendStatus(401)
    }

   const tokenData = token.split(' ')[1];
   console.log(tokenData)

    jwt.verify(tokenData, secret, (err, user) => {
        if(err){
            return res.sendStatus(401)
        }
        req.user = user;
        next();
    })
}
*/
registerRouter.get("/", async (req, res)=> {
    try{
    const response = await User.find();
    res.json(response)

  } catch(err){
      res.status(500).json(err)
  }
})


registerRouter.post("/", async (req, res) => {
    const {username, email, password} = req.body;
    try {
        //Hash the password before saving to DB
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await User.create({username, email, password: hashedPassword});
        res.status(201).json(response);

    } catch(err){
        return res.status(500).json(err)
    }
})
registerRouter.post("/login", async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send('User does not find');
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.status(400).send('Password is incorrect!');
        }
        const token = generateToken({email: user.email});
        res.json({token})
        //console.log(token)

    } catch(err){
        return res.status(500).json(err)
    }
})

export default registerRouter;
