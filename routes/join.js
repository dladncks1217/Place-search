const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const {User} = require('../schemas');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('join');
});

router.post('join',isNotLoggedIn, async (req,res,next)=>{
    const {email,nick,password} = req.body;
    try{
        const exUser = await User.find().where(email);
        if(exUser){
            req.flash('joinError','이미 가입된 이메일입니다.');
            return res.redirect('/join');
        }
        console.time('암호화 시간');
        const hash = await bcrypt.hash(password,12);
        console.timeEnd('암호화 시간');
        await User.save((err)=>{
            if(err){
                console.error(err);
                return;
            }else{
                res.json({
                    email,
                    nick,
                    password:hash,
                })
            }
        });
        return res.redirect('/');
    }catch(error){
        console.error(error);
        return next(error);
    }
});

module.exports = router;