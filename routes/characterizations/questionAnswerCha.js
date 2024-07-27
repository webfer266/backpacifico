const {Router}=require('express');
const { questionAnswer,questionGet,observationGetId } = require('../../controller/characterizations/questionAnswerCha');
const router=Router();

router.post('/',questionAnswer)
router.get('/',observationGetId)
router.get('/:id',observationGetId)
module.exports=router;