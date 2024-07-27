const {getQuestion,postQuestion,updateQuestion,deleteQuestion} = require('../../controller/characterizations/questionCharacterization');
const { check } = require('express-validator');
const {validateFields} = require('../../middlewares/validate-fields');
// const {idAnswerExistObser} = require('../helpers/db-validators-question-obser')
const { Router } = require('express');

const router=Router();

router.get('/',getQuestion);
router.post('/',[
],postQuestion);
router.put('/:id',[
    check('id','id no valido').isMongoId(),
    check('idQuestion','idQuestion cannot be null').not().isEmpty(),
    check('nameQuestion','opcion wirite it').not().isEmpty(),
    validateFields
],updateQuestion);


router.delete('/:id',deleteQuestion);


module.exports=router;