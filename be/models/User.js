const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = Schema({
    login: String,
    password: String,
    email: {type: String, default: null}, 
    name: {type: String, default: null},
    ownstables: {type: [mongoose.Schema.Types.ObjectId], default: null},
    accessibletables: {type: [mongoose.Schema.Types.ObjectId], default: null},
    isVerified: {type: Boolean , default: false}
}) 


userSchema.methods.comparepwd = async function (a) {
    const b = await bcrypt.compare(a, this.password);
    return b;
  };
  
userSchema.methods.hashingpwd = async function (value) {
    const a = await bcrypt.hash(value, saltRounds);
    return a;

};

const users  = mongoose.model('users', userSchema);
module.exports = users;