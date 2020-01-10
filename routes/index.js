const express = require('express');
const router = express.Router();

require('dotenv').config();

router.get('/',(req,res,next)=>{
    res.render('index',{
        KAKAO_JAVASCRIPTKEY : process.env.KAKAO_JAVASCRIPTKEY,
    });
});

module.exports = router;