const mongoose = require('mongoose');

const {MONGO_ID,MONGO_PASSWORD,NODE_ENV} = process.env; // 배포환경에서는 조금 달라짐.
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

module.exports=()=>{
    const connect=()=>{ 
        if(NODE_ENV!=='production'){ // 배포가 아닐 경우(개발환경일 경우)
            mongoose.set('debug',true); // 몽구스가 몽고디비 쿼리 대신 날려주는데 그 내역이 콘솔창에 뜬다.(개발환경일때).
        }
        mongoose.connect(MONGO_URL,{
            dbName:'nodeplace',
        },(error)=>{
            if(error){
                console.error('몽고디비 연결 에러',error);
            }else{
                console.log('몽고디비 연결 성공');
            }
        })
    };
    connect();

    mongoose.connection.on('error',(error)=>{
        console.error('몽고디비 연결 에러',error);
    });
    mongoose.connection.on('disconnected',()=>{
        console.error('몽고디비 연결이 끊어졌습니다. 연결을 재시도합니다.');
        connect();
    });

    require('./favorite'); // 몽고디비와 몽구스 스키마의 연결
    require('./history');
    require('./user');
}