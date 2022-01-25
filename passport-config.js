import passport from "passport";
import fbStrategy from "passport-facebook";
import { users } from "./model/User.js";

const FacebookStrategy = fbStrategy.Strategy;

const initializePassportConfig = () =>{
    passport.use('facebook', new FacebookStrategy({
        clientID:'905945223422826',
        clientSecret:'7df75e2531381ed71ef6dade8a8caec0',
        callbackURL:'https://c2b0-186-109-230-3.ngrok.io/auth/facebook/callback',
        profileFields:['emails']
    }, async (accessToken,refreshToken,profile,done)=>{
        try{
            console.log(accessToken);
            console.log(profile);
            let user = await users.findOne({email:profile.emails[0].value})
            done(null,user)
        }catch(error){
            done(error)
        }
    } ))
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser((id,done)=>{
        users.findById(id,done);
    })

}

export default initializePassportConfig;