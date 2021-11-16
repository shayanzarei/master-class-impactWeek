const jwt = require('jsonwebtoken')
require('dotenv').config()


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECURE_KEY, {
    });
};

module.exports = {createToken}