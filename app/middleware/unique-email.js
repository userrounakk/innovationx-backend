const User = require("../../models/User");

module.exports = async function UniqueEmail(req,res,next){
    const {email} = req.body;
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({error: "Email already exists"});
    }
    next();
}