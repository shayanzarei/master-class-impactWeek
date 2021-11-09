const router = require('express').Router();
const mainController = require('../controller/mainController')



router.get('/', mainController.getHomepage)


module.exports = router;
