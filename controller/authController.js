const User = require('../model/userModel')
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt');
const {createToken} = require('../middleware/createToken');

const signup = async (req, res) => {
    if (req.method === 'GET') {
        res.render('signup', { pageTitle: 'Signup' })
    }
    if (req.method === 'POST') {
        const { username, email, password, password2 } = req.body;

        let errors = [];
        // checked required fields
        if (!username || !email || !password || !password2) {
            errors.push({ msg: 'Please fill in all fields' })
        }
        //email validation
        if (email && !emailValidator.validate(email)) {
            errors.push({ msg: 'Please write a valid email' })
        }
        //check username length 
        if (username && username.length < 4) {
            errors.push({ msg: 'Username should be more than 4 character' })
        }
        //check pass length 
        if (password && password.length < 6) {
            errors.push({ msg: 'Password should be more than 6 character' })
        }
        //check password match
        if (password !== password2) {
            errors.push({ msg: 'Passwords do not match' })
        }
        if (errors.length > 0){
            res.render('signup' , {
                pageTitle:'Signup',
                errors,
                username,
                email,
                password,
                password2,
            })
        } else{
            user = await User.findOne({email: email})
            if(user){
                errors.push({ msg: 'Email is already registered' })
                res.render('signup', {
                    pageTitle:'Signup',
                    errors,
                    username,
                    email,
                    password,
                    password2
                })
            } else {
                const newUser = new User({
                    username,
                    email,
                    password
                });

                //hash password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, async (err, hash) => {
                        if (err) console.log(err);
                        //set password to hash
                        newUser.password = hash;
                        //save user
                        await newUser.save()
                        res.redirect('/login')  
                    })
                });
            }
        }
    }
}


const login = async (req, res) => {
    if (req.method === 'GET') {
        res.render('login' , {pageTitle : 'Login'})
    }
    if (req.method === 'POST') {
        const { email, password} = req.body;
        let errors = [];

        if(!email || !password){
            errors.push({ msg: 'Please fill in all fields' })
        }
        //email validation
        if (email && !emailValidator.validate(email)) {
            errors.push({ msg: 'Please write a valid email' })
        }
        //check pass length 
        if (password && password.length < 6) {
            errors.push({ msg: 'Password should be more than 6 character' })
        }
        if (errors.length > 0){
            res.render('login' , {
                pageTitle:'Login',
                errors,
                email,
                password,
            })
        } else{
            user = await User.findOne({email: email})
            if(!user){
                errors.push({ msg: 'Email is not exist' })
                res.render('login', {
                    pageTitle:'Login',
                    errors,
                    email,
                    password,
                })
            }else{
                const match = await bcrypt.compare(password , user.password)
                if(!match){
                    errors.push({ msg: 'Password is not correct' })
                    res.render('login', {
                        pageTitle:'Login',
                        errors,
                        email,
                        password,
                    })
                }else{
                    const token = createToken(user._id)
                    res.cookie('jwt' , token , { httpOnly: true , maxAge : 3 * 24 * 60 * 60 * 1000})
                    res.redirect('/')
                }
            }
            
        }
    }
}

const logout = (req, res) => {
    if (req.method === 'GET') {

        res.cookie('jwt', '', {httpOnly: true, maxAge: 1})
        res.redirect('/login')
    }
    
        
}

module.exports = {
    signup,
    login,
    logout
}