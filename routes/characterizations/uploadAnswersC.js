const upload= require('../../controller/characterizations/uploadAnswersC')
const {Router} = require('express');
const router=Router();


router.post('/',upload);
module.exports=router;