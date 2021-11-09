const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'shayan secure text', (err, decoded) => {
            if(err){
                res.locals.user = null;
                next();
            }
            if(decoded){
                User.findById(decoded.id)
                    .then( user => {
                        const {username, email, id} = user;
                        res.locals.user = {username, email, id};
                        next()
                    })
                    .catch(err => {
                        res.locals.user = null;
                        next();
                    })
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}


const isLogin = (req, res, next) => {
    const token = req.cookies.jwt;

    //check json web token is valid
    if (token) {
        jwt.verify(token, 'shayan secure text', (err, decodedToken) => {
            if (err) {
                res.redirect("/login");
            } else {
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};

module.exports = {checkUser , isLogin}