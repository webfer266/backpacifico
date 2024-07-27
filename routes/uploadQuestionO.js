const upload = require('../controller/observations/uploadQuestionO')
const {Router} = require('express');

const router=Router();



router.post('/',upload);

module.exports=router;