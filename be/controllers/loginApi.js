let UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


module.exports.register = async (login,password,email)=>{
    try{
        if(login==password){
            return 'login and password must not match'
        }
        const user = new UserModel({
            login: login,
            email: email,
        });
        const cryptedpwd = await user.hashingpwd(password);
        user.password = cryptedpwd;
        await user.save();
        return user; 
    } catch(err) {
        // return 'error has occured';
        throw err;
    };
}

module.exports.createTokens = async function(id){
    // console.log(user.id);
    let token = await jwt.sign({id:id},keys.tokenSecret,{ expiresIn: 1800000 });
    let refreshToken = await jwt.sign({id:id},keys.refreshSecret, {expiresIn: 1000 * 60 * 60 * 24 *3});
    return {token, refreshToken};
}

module.exports.validateTokens = async function(cookies){
    let decoded = await jwt.decode(cookies.rToken);
    try{
        let result = await UserModel.findOne({_id:decoded.id});
        if(result._id){  
            return {"status":"OK","payload":{id:result._id}};
        }else{
            return {status:"err", payload:'_id not exist on db'};
        }

    }
    //catch if decoding were wrong and have not _id
    catch(err){
        return {status:"err", payload:"decoded cookie have not _id"};
    };
}