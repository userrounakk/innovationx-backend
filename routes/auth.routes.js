const { Router } = require('express');
const router = Router();
const {register} = require('../app/controller/auth-controller');
const hashPassword = require('../app/middleware/hash')
const uniqueEmail = require('../app/middleware/unique-email');

router.post("/register",hashPassword,uniqueEmail,register)
router.post("/login", (req,res)=>{

    res.send("Login route");
})

module.exports = router;