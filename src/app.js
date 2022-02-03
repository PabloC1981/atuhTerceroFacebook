import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import mongoose  from "mongoose";
import passport from "passport";
import MongoStore from "connect-mongo";
import cors from "cors";
import initializePassportConfig from "../passport-config.js";


///dotenv///
dotenv.config();

const app = express();
const PORT = process.env.PORT||8081;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
console.log(process.env.NODE_ENV)
const conecttion = mongoose.connect(process.env.STORE);



app.use(cors());
app.use(session({
    store:MongoStore.create({mongoUrl: process.env.STORE}),
    secret: process.env.SECRET,
    resave:process.env.RESAVE,
    saveUninitialized:process.env.SAVEUNINITIALIZED,

}))
app.use(express.static('public'))
app.use(express.json());
initializePassportConfig();
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook',passport.authenticate('facebook',{scope:['email']}),(req,res)=>{

})
app.get('/auth/facebook/callback',passport.authenticate('facebook',{
    failureRedirect:'/paginadeFail'
}),(req,res)=>{
    res.send({message:"Se ha logeado con Facebook, FELICITACIONES :)"})
})
app.get('/',(req,res)=>{
    console.log("hola")
})
///RANDOM FORK///
app.get("/random", (req, res) => {
    const cant = parseInt(req.query.cant || 100000000);
    if (isNaN(cant)) {
      res.status(400).send({
        error: "Error type",
      });
      return;
    }
    const random = fork("./apiRandom.js", [cant]);
    random.on("message", (data) => {
      res.json({ iterations: cant, numbers: data });
    });
  });