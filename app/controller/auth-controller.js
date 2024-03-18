const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const otpVerification = require("../mail/otp-verification");


const handleErr = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  if (err.message === "Incorrect Email") {
    errors.email = "That email is not registered";
  }
  if (err.message === "Incorrect Password") {
    errors.password = "That password is incorrect";
  }
  if (err.code == 11000) {
    errors.email = "That email is already registered.";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const createToken = (id) => {
  return jwt.sign({ id }, "something very secret", {
    expiresIn: maxAge,
  });
};
module.exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    if(role === "participant"){
        const {gender} = req.body;
        if(!gender){
        return res.status(400).json({ status:false,message: "Gender is required for participant"});
        }
    }
    const user = await User.create({
      name,
      email,
      password,
      role,
      verificationToken,
    });
    if (user) {
      otpVerification(email, verificationToken);
    }
    res.status(201).json({ status:true,message:"Registration Successful." });
  } catch (error) {
    res.status(400).json({ status:false,message: error.message });
  }
};

module.exports.verify = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user.verificationToken === otp) {
      user.verifiedAt = Date.now();
      user.verificationToken = undefined;
      user.save();
      res.status(200).json({status:true, message: "User Verified" });
    } else {
      res.status(400).json({ status:false,message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(400).json({ status:false,message: error.message });
  }
};

const maxAge = 60 * 60 * 24;
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 3 });
    res.status(200).json({ status:true,message:"Successfully Logged In" });
  } catch (err) {
    const errors = handleErr(err);
    res.status(400).json({ status:false,message:err.message });
  }
};
