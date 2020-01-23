const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const {User} = require('../models');

require('dotenv').config();

router.get('/',async(req,res,next)=>{
    if(req.isAuthenticated()){
        const user = await User.findOne({where:{email: req.user.email}});
        res.render('index',{
            isLoggedIn:req.isAuthenticated(),
            user:user.nick,
        });
    }else{
        res.render('index',{
            isLoggedIn:req.isAuthenticated(),
        });
    }
    
    
});

module.exports = router;