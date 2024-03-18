const bcrypt = require('bcrypt');
async function hashPassword(req,res,next) {
    try{
        const {password} = req.body;
        const strongPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if(!strongPass.test(password)){
            return res.status(400).json({error: "Password is not strong enough"});
        }
        if(!password){
            return res.status(400).json({error: "Password is required"});
        }
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPass;
        next();
    }catch(error){
        console.error(error);
    }
}

module.exports = hashPassword;