const upload= require('../controller/observations/uploadAnswersO')
const {Router} = require('express');
const router=Router();


router.post('/',upload);
module.exports=router;