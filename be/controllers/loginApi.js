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

module.exports.createTokens = async function(user){
    console.log(user.id);
    let token = await jwt.sign({id:user.id},keys.tokenSecret,{ expiresIn: 1800000 });
    let refreshToken = await jwt.sign({id:user.id},keys.refreshSecret, {expiresIn: 1000 * 60 * 60 * 24 *3});
    return {token, refreshToken};
}