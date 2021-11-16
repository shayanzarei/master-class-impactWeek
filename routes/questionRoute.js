const router = require('express').Router()
const questionController = require('../controller/questionController')
const { isLogin } = require('../middleware/authMiddleware')


router.all('/addQuestion', isLogin, questionController.addQuestion)
router.get('/question/:id', questionController.showQuestion)
router.post('/question/:id', isLogin, questionController.addAnswer)
router.post('/question/:id/deleteQuestion', questionController.deleteQuestion)
router.post('/question/:questionID/:id/deleteAnswer', questionController.deleteAnswer)
router.all('/question/:id/edit-answer', questionController.editAnswer)
router.all('/question/:id/edit-question', questionController.editQuestion)




module.exports = router;