const express = require('express');
const router = express.Router();
const {History} = require('../models');

router.post('/',async (req,res,next)=>{
    await History.create({});
})

module.exports = router;