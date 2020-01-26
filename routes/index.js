const express = require('express');
const router = express.Router();
const {User,History} = require('../models');

require('dotenv').config();

router.get('/',async(req,res,next)=>{
    try{
        if(req.isAuthenticated()){
            const user = await User.findOne({where:{email: req.user.email}});
            await History.findAndCountAll({where:{userId:user.id}})
            .then((history)=>{
                res.render('index',{
                    isLoggedIn:req.isAuthenticated(),
                    user:user.nick,
                    history,
                    count:history.count,
                });
            });
        }else{
            res.render('index',{
                isLoggedIn:req.isAuthenticated(),
            });
        }
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;