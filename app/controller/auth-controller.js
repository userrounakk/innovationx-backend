const User = require('../../models/User');
const otpVerification = require('../mail/otp-verification');

module.exports.register = async (req, res) =>{
    const {name, email, password, role} = req.body;
    try {
        const verificationToken = Math.floor(100000 + Math.random() * 900000);
        const user = await User.create({name, email, password, role,verificationToken});
        if(user){
            otpVerification(email,verificationToken);
        }
        res.status(201).json({user: user._id});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports.verify = async (req, res) =>{
    const {email, otp} = req.body;
    try {
        const user = await User.findOne({email})
        if(user.verificationToken === otp){
            user.verifiedAt = Date.now();
            user.verificationToken = undefined; 
            user.save();
            res.status(200).json({message: "User Verified"});
        }
        else{
            res.status(400).json({error: "Invalid OTP"});
        }
    }catch (error) {
        res.status(400).json({error: error.message});
    }
}
