const express = require('express')
require('./config/mongoose')
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser =require('cookie-parser')


const {checkUser} = require('./middleware/authMiddleware')
const mainRoute = require('./routes/mainRoute')
const authRoute = require('./routes/authRoute')
const questionRoute = require('./routes/questionRoute')


const app = express() ;

//EJS
app.use(expressLayouts);
app.use(cookieParser());

//Body parser
app.use(express.urlencoded({ extended: false }))

//express session 
app.use(session({
    secret: 'secret' ,
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('public'));
app.use(express.json());

//connect flash
app.use(flash());

//global vars
app.use((req,res ,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});


app.set('view engine', 'ejs');


//Routers
app.all('*' , checkUser)

app.use(mainRoute);
app.use(authRoute);
app.use(questionRoute);


app.listen(process.env.PORT || 2020,() => console.log('port 2020 ready'))