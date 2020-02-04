const express = require('express');
const router = express.Router();
const {Favorite} = require('../models');


router.put('/add', (req,res,next)=>{
    try{
        Favorite.create({
            userId:req.user.id,
            placeName:req.body.favorite,
        })
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/remove', (req,res,next)=>{
    try{
        Favorite.destroy({where:{userId:req.user.id,placeName:req.body.favorite},})
        
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;