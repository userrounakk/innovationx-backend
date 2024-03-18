const { Router } = require('express');
const router = Router();
const {register, verify, login} = require('../app/controller/auth-controller');
const hashPassword = require('../app/middleware/hash')
const uniqueEmail = require('../app/middleware/unique-email');

router.post("/register",hashPassword,uniqueEmail,register)
router.post("/verify", verify);
router.get("/login", login);

module.exports = router;