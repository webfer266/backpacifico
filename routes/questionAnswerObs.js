const {Router}=require('express');
const { questionAnswer,questionGet } = require('../controller/observations/questionAnswerObs');
const router=Router();

router.post('/',questionAnswer)
router.get('/',questionGet)

module.exports=router;