let UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
let loginController = require('../controllers/loginApi');


//this middleware checking and updating cookies if exist


// status types: OK / err
module.exports = async (req,res,next)=>{
    if(req.cookies.rToken){
        let result = await loginController.validateTokens(req.cookies);
        console.log(result);
        if(result.status == "OK"){
            //passing _id to route
            res.locals.id = result.payload.id;
            let tokens = await loginController.createTokens(result.payload.id);
            res.cookie('token',tokens.token)
            .cookie('rToken',tokens.refreshToken);
            next();
        }
    }else{
        res.send(JSON.stringify({status:"err", payload:'you are not logged in'}));
    }
}