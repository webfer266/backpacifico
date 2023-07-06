const {Router} = require('express');
const {check} = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { login } = require('../controller/auth');

const router = Router();


router.post('/',[
    check('correo','The email is not accepted').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields
], login)


module.exports = router;