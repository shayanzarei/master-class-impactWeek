const mongoose = require('mongoose');

const URL = 'mongodb+srv://shayan:shayan1376@cluster0.pipat.mongodb.net/Impact-Week?retryWrites=true&w=majority';

mongoose.connect(URL)
    .then(() => console.log('DB is Connected'))
    .catch(err => console.log(err))
