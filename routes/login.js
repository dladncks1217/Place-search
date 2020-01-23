const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const passport = require('passport');
const { User } = require('../models');

router.get('/',(req,res,next)=>{
    res.render('login');
});

router.post('/login',isNotLoggedIn,(req,res,next)=>{
    passport.authenticate('local',(authError,user,info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect('/');
        }
        return req.login(user,(loginError)=>{
            if(loginError){
                console.log(user);
                console.log('여기서에러났어요');
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req,res,next);
});

module.exports = router;