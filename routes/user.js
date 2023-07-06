const {Router} = require('express');
const {check} = require('express-validator');
const { getUser, getUserById, createUser, updateUser, deleteUser } = require('../controller/user');
const { userExistsById, userExistEmail, existRole } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getUser);
router.get('/:id',[
    check('id','The id is not a mongo id').isMongoId(),
    check('id').custom(userExistsById),
    validateFields
], getUserById);

router.post('/',[
    check('nombre','The name is required').not().isEmpty(),
    check('correo','The email is not accepted').isEmail(),
    check('password', 'The password is required').isLength({min:6}),
    check('correo').custom(userExistEmail),
    check('rol').custom(existRole),
    validateFields
], createUser);

router.put('/:id',[
    check('id','The id is not a mongo id').isMongoId(),
    check('id').custom(userExistsById),
    check('correo').custom(userExistEmail),
    check('rol').custom(existRole),
    validateFields 
], updateUser);

router.delete('/:id',[
    check('id','The id is not a mongo id').isMongoId(),
    check('id').custom(userExistsById),
    validateFields
], deleteUser)

module.exports = router;