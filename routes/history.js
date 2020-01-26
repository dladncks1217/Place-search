const express = require('express');
const router = express.Router();
const {History,User} = require('../models');

router.post('/',async (req,res,next)=>{
    try{
        await User.findOne({where:{nick:req.body.nick}})
        .then((user)=>{
            History.create({
                query: req.body.history,
                time:req.body.time,
                userId:user.dataValues.id,
            });
        });

    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;