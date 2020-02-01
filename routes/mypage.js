const express = require('express');
const router = express.Router();
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
    await User.update({nick:req.body.nick},{where:{nick:req.body.firstnick}})
});

module.exports = router;