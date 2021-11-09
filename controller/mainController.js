const QuestionModel = require('../model/questionModel')

const getHomepage = async (req, res) => {
    if (req.method === 'GET') {
        const question = await QuestionModel.find().populate('user').sort({ createdAt: -1 });
        res.render('homePage', { 
            pageTitle: 'Home Page' ,
            question
        })
    }
    
}

module.exports = {
    getHomepage
}