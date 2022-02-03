import dotenv from 'dotenv';


dotenv.config();

export default {
    PORT: processedArgs.port,
  
    store:process.env.STORE,
    
    resave:process.env.RESAVE,
  
    secret:process.env.SECRET||"randompassword",

    
  
    }