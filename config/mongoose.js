const mongoose = require('mongoose');
require('dotenv').config()


//use mongoose DB
mongoose.connect(process.env.MONGOOSE_URI)
    .then(() => console.log('DB is Connected'))
    .catch(err => console.log(err))
