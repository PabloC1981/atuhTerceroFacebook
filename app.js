import express from "express";
import session from "express-session";
import mongoose  from "mongoose";
import passport from "passport";
import MongoStore from "connect-mongo";
import cors from "cors";
import initializePassportConfig from "./passport-config.js";

const app = express();
const server = app.listen(8080,()=>console.log(`Listening on 8080`));
const conecttion = mongoose.connect('mongodb+srv://pablo:pascual1@lavoro.elux2.mongodb.net/PassBase?retryWrites=true&w=majority');


app.use(cors());
app.use(session({
    store:MongoStore.create({mongoUrl: "mongodb+srv://pablo:pascual1@lavoro.elux2.mongodb.net/sessions?retryWrites=true&w=majority"}),
    secret:"LavoroFacebook",
    resave:false,
    saveUninitialized:false,

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
