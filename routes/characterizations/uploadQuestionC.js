const upload = require('../../controller/characterizations/uploadQuestionC')
const {Router} = require('express');

const router=Router();

router.post('/',upload);

module.exports=router;