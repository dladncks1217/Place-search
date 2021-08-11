const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const hpp = require('hpp');
const helmet = require('helmet');
const redis = require('redis');
const passport = require('passport');
const RedisStore = require('connect-redis')(session);
const passportConfig = require('./passport');

require('dotenv').config();

const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD,
  });


const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const joinRouter = require('./routes/join');
const historyRouter = require('./routes/history');
const mypageRouter = require('./routes/mypage');
const favoriteRouter = require('./routes/favorite');
const boardRouter = require('./routes/board');

const {sequelize} = require('./models');
const app = express();

sequelize.sync();
passportConfig(passport);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.set('port',process.env.PORT||8000);

if(process.env.NODE_ENV === "production"){
    app.use(morgan('combined'));
    app.use(helmet({contentSecurityPolicy:false}));
    app.use(hpp());
}else{
    app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
    resave: false,
    saveUnitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },

    store: new RedisStore({
        client:redisClient
    })
}
if(process.env.NODE_ENV === 'production'){
    sessionOption.proxy=true;    
    // sessionOption.cookie.secure=true;
}
app.use(session(sessionOption));
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());


app.use('/',indexRouter);
app.use('/login',loginRouter);
app.use('/join',joinRouter);
app.use('/history',historyRouter);
app.use('/mypage',mypageRouter);
app.use('/favorite',favoriteRouter);
app.use('/board',boardRouter);

app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err,req,res)=>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err:{};
    res.status(err.status||500);
    res.render('error');
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 서버 대기중');
});
