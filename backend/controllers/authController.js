const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;

  try {

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({success : false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, "abc", {
      expiresIn: "1h",
    });
    const options = {
      domain: '.vercel.app',  // Change this to the desired domain

      expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour expiry
      httpOnly: true, 
      sameSite: 'None',
      secure: true, 
    };

    res.cookie("tokenCookie", token, options).status(200).json({
      success: 'true',
      message: 'logged in Successfully',
      token,

  })


  } catch (error) {
    console.error(error); 
    res.status(500).json({ sucess : false, message: "Server error" });
  }
};



exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, 'abc', { expiresIn: '1h' });

        // Set cookie options
        const options = {
            expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour expiry
            httpOnly: true, // Prevent client-side JavaScript access
            sameSite: 'Lax', // Prevents CSRF
            secure: false, // Set to true if running on HTTPS in production
            path: '/', // Make the cookie accessible site-wide
        };

        // Set the cookie and respond
        res.cookie('tokenCookie', token, options).status(200).json({
            success: true,
            message: 'Logged in successfully',
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};





};
