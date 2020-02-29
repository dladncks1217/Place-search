const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {User,History} = require('../models');
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');

router.get('/',isLoggedIn, (req,res,next)=>{
    User.findOne({where:{id:req.user.id}})
    .then((user)=>{
        res.render('mypage',{
            nick:user.nick,
        });
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
});

router.post('/changenick',isLoggedIn, async(req,res,next)=>{
    try{
        await User.update({nick:req.body.nick},{where:{nick:req.body.firstnick}});
        return(
            res.status(200).redirect('/mypage')
        )
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/changepw',isLoggedIn,async(req,res,next)=>{
    try{
        const changepw = await bcrypt.hash(req.body.newpw, 12);
        console.log("바뀔 패스워드는 "+ changepw);
        console.log(req.body.newpw);
        await User.update({password:changepw}, {where:{id:req.user.id}});
        return res.redirect('/logout');
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;