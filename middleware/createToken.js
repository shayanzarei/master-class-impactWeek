const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({ id }, 'shayan secure text', {
    });
};

module.exports = {createToken}