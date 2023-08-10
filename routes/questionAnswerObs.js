const {Router}=require('express');
const { questionAnswer } = require('../controller/questionAnswerObs');
const router=Router();

router.post('/',questionAnswer)

module.exports=router;