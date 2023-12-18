/*
  Rutas de usuarios/Auth
  host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { jwtValidator } = require('../middlewares/jwtValidator')

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');

router.post(
  '/new',
  [
    // middlewares
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be 6 characteres').isLength({ min: 6 }),
    fieldsValidator
  ],
  createUser
);

router.post(
  '/', 
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be 6 characteres').isLength({ min: 6 }),
    fieldsValidator
  ],
  loginUser
)

router.get(
  '/renew',
  jwtValidator,
  revalidateToken 
)

module.exports = router;