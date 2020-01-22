const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

require('dotenv').config();

/*
const isLoggedin = (req,res,next)=>{
    if (req.isAuthenticated()) {
        req.isLogged = true
        return next();
     }
     res.redirect('/');
}
*/

router.get('/',(req,res,next)=>{
    res.render('index',{
        isLoggedIn:req.isAuthenticated(),
        user:req.user,
    })
    
});

module.exports = router;