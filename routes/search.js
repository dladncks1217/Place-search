const express = require('express');
const router = express.Router();

require('dotenv').config();

const naver_clientId = process.env.NAVER_CLIENTID;
const naver_clientsecret = process.env.NAVER_CLIENTSECRET;

router.get('/place',(req,res,next)=>{
    const api_url = 'https://openapi.naver.com/v1/search/local?query=' + encodeURI(req.query.query);
    const request = require('request');
    const options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':naver_clientId, 'X-Naver-Client-Secret': naver_clientsecret}
     };
     request.get(options,(error,response,body)=>{
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
          } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
          }
     });
});

module.exports = router;