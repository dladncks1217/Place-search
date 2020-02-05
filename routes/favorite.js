const express = require('express');
const router = express.Router();
const {Favorite} = require('../models');


router.put('/add', async (req,res,next)=>{
    try{
        await Favorite.create({
            userId:req.user.id,
            placeName:req.body.favorite,
            createdAt:req.body.timecheck,
        });
        return res.redirect('/');
    }catch(err){
        console.error(err);
        next(err);
    }
    
});

router.post('/remove', async (req,res,next)=>{
    try{
        await Favorite.destroy({where:{userId:req.user.id,placeName:req.body.favorite},});
        return res.redirect('/');
    }catch(err){
        console.error(err);
        next(err);
    }
    
});

module.exports = router;