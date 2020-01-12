const local = require('passport-local');
const {User} = require('./schemas');

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