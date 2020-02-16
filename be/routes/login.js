var express = require('express');
var router = express.Router();
let UserModel = require('../models/User');
let loginController = require('../controllers/loginApi');
let registerSchema = require('../schemas/registerSchema');
const Ajv = require('ajv');
const ajv = new Ajv();

router.post('/', function(req,res){
    console.log(req.body.login);
})



router.get('/', (req, res) => {
    res.send('alive')
})

router.post('/registration', function(req,res){

    const validate = ajv.compile(registerSchema);
    const valid = validate(req.body);
    if(!valid){
        const { errors } = validate;
        res.send('invalid data ajv: ' + errors);
    }else (async function(){
        let { password, login , email } = req.body;
        let newUserData  = await loginController.register(login,password,email);
        
        //check if registration successfully
        if(newUserData instanceof Object){
            let tokens = await loginController.createTokens(newUserData);
            res.cookie('token',tokens.token)
            .cookie('rToken',tokens.refreshToken);
        }
        res.send(newUserData);
    })();

})

module.exports = router;