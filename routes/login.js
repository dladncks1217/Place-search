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

router.get('/findpw',isNotLoggedIn,(req,res,next)=>{
    res.render('findpw');
});

router.post('/findpw/find',isNotLoggedIn, async(req,res,next)=>{
    const exUser = await User.findOne({where:{email:req.body.email}});
    if(!exUser){
        req.flash('EmailNotfound','이메일을 찾을 수 없습니다!')
        return res.redirect('/login/findpw');
    }else{
        
    }
});

router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;