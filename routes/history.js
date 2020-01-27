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
        res.redirect('/');
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.delete('/all', async(req,res,next)=>{
    try{
        const nowUser = await User.findOne({where:{nick:req.body.nick}});
        if(nowUser){
            await History.destroy({where:{userId:nowUser.id}});
        }else{
            return res.redirect('/error');
        }
        console.log('여기왔음');  
    }catch(err){
        console.error(err);
    }
})
module.exports = router;