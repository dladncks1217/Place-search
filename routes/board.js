const express = require('express');
const router = express.Router();
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');
const {Board,User} = require('../models');

router.get('/', async(req,res,next)=>{
    try{
        Board.findAndCountAll({
            include:[
                {
                    model:User,
                    attributes:['nick']
                }
            ],
            where:{},
        })
        .then((results)=>{
            if(results.count === 0){
                res.render('board',{
                    nick:req.user.nick,
                    count:0,
                    
                });
            }else{
                res.render('board',{
                    nick:req.user.nick,
                    count: results.count,
                    results,
                });
            }
        })
        
    }catch(err){
        console.error(err);
        next(err);
    }
});
router.post('/post',isLoggedIn, async(req,res,next)=>{
    try{
        await Board.create({
            content:req.body.content,
             post_date:req.body.timecheck,
             userId:req.user.id
        });
        console.log('게시글 등록 완료 유저번호 : '+req.user.id);
        return(
            res.status(200).redirect('/board')
        );
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;