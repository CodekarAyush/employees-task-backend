const { generateToken } = require("../utils/authHandlers");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");


module.exports.userSignup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();
    const payload = {
      userId: user._id,
      role: user.role,
    };
    const token = generateToken(payload);
    return res.status(201).json({
      message: "User registered successfully",
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports.userLogin = async (req, res)=> {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Email doesnt exists' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user._id, user.role);

      return res.status(200).json({ token, name: user.fullName });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
}