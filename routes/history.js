const express = require('express');
const router = express.Router();
const {History} = require('../models');

router.post('/',async (req,res,next)=>{
    await History.create({
        query: req.body.history,
        time:req.body.time,
    });
})

module.exports = router;