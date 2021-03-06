const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportConfig = require('./passport');

require('dotenv').config();

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
app.set('port',process.env.PORT||8015);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({   
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
}));
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
