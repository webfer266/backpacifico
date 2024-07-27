const {getAnswer,
    postAnswer,
    updateAnswer,
    deleteAnswer} = require('../../controller/characterizations/answerCharacterization');
const { check } = require('express-validator');
const {validateFields} = require('../../middlewares/validate-fields');
// const {idAnswerExistObser} = require('../helpers/db-validators-answer-obser')
const { Router } = require('express');

const router=Router();

router.get('/',getAnswer);
router.post('/',[

],postAnswer);


router.put('/:id',[
    check('id','id no valido').isMongoId(),
    check('idAnswer','idAnswer cannot be null').not().isEmpty(),
    check('nameOpcion','opcion wirite it').not().isEmpty(),
    validateFields
],updateAnswer);


router.delete('/:id',deleteAnswer);


module.exports =router;