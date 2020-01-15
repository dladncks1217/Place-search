const local = require('../passport/localStrategy');
const {User} = require('../models');

module.exports = (passport) =>{
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser((email,done)=>{
        User.findOne({email})
        .then(user=>done(null,user))
        .catch(err=> done(err));
    });
    local(passport);
};