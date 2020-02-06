const express = require('express');
const router = express.Router();
const {User,History,Favorite} = require('../models');

require('dotenv').config();

router.get('/',async(req,res,next)=>{
    try{
       
        if(req.isAuthenticated()){ // loggedIn
            
            // Histories
            let histories = await History.findAndCountAll({where:{userId:req.user.id}});
            let history_counts = {
                historycnt:histories.count,
                history:histories,
                searchnow:histories.rows[histories.count-1].dataValues.query,
            };
            // Favorites
            let favorite = await Favorite.findAndCountAll({where:{userId:req.user.id}});
            // 현재장소 즐겨찾기
            let starcheck = await Favorite.findOne({where:{placeName:history_counts.searchnow}});
            
            let favorite_count = {
                favoritecnt:favorite.count,
                favorites:favorite,
                starcheck:()=>{
                    if(!starcheck){
                        return '☆';
                    }else{
                        return '★';
                    }
                },
            };
            
            if(history_counts.historycnt>0){
                res.render('index',{
                    isLoggedIn:req.isAuthenticated(),
                    user: req.user.nick,
                    historylist:history_counts.history,
                    historycnt:history_counts.historycnt,
                    searchnow:history_counts.searchnow,
                    favoritecnt:favorite_count.favoritecnt,
                    favoritelist:favorite_count.favorites,
                    starcheck:favorite_count.starcheck(),
                    kakaokey:process.env.KAKAO_JAVASCRIPTKEY,
                });
            }else{
                res.render('index',{
                    isLoggedIn:req.isAuthenticated(),
                    user:user.nick,
                    historylist:history_counts.history,
                    historycnt:history_counts.historycnt,
                    searchnow:'',
                    starcheck:favorite_count.starcheck(),
                    kakaokey:process.env.KAKAO_JAVASCRIPTKEY,
                });
            }
        }else{ // NotLoggedIn
            res.render('index',{
                isLoggedIn:req.isAuthenticated(),
                kakaokey:process.env.KAKAO_JAVASCRIPTKEY,
            });
        }
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/error',(req,res,next)=>{
    res.render('error');
})

module.exports = router;