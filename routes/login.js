const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const passport = require('passport');
const { User } = require('../models');

require('dotenv').config();

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
    try{
        const exUser = await User.findOne({where:{email:req.body.email}});
        if(!exUser){
            req.flash('EmailNotfound','이메일을 찾을 수 없습니다!')
            return res.redirect('/login/findpw');
        }else{
            const newpassword = await Math.floor(Math.random()*100000+10000).toString();
            const newpasswordbcrypt = await bcrypt.hash(newpassword,12);
            await User.update({password:newpasswordbcrypt},{where:{id:exUser.id}});
    
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: process.env.GOOGLE_ID,  // id
                  pass: process.env.GOOGLE_PASSWORD,  // pw
                }
            });
            let mailOptions = {
                from: process.env.GOOGLE_ID,    // 발송 메일 주소 
                to: exUser.email,                     // 수신 메일 주소
                subject: '새로운 비밀번호입니다.',   // 제목
                text: `새 비밀번호는 ${newpassword} 입니다.` // 내용
              };
            transporter.sendMail(mailOptions, (error, info)=>{
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
                return res.redirect('/');
            }); 
        }
    }catch(err){
        console.error(err);
        next(err);
    }
    
});

router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;