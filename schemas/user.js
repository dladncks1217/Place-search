const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    nick:{
        type:String,
        require:true,
    },
});
module.exports = mongoose.model('User',userSchema);