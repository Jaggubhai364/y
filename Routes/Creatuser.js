const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const jwtSecret = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
router.post(
  "/createuser",
  [
    body("email",'invalid email').isEmail(),
    body("password","Password must be at least 5 characters long, contain a capital letter, and a number").isLength({ min: 5 }),
    body("name",'invalid name').isLength({ min: 5 }),
   
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });}

      const salt = await bcrypt.genSalt(10);
      let secpassword = await bcrypt.hash(req.body.password,salt)


    try {
      await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error); // Corrected syntax here
      res.json({ success: false });
    }
  }
);


router.post(
  "/loginuser",
  [
    body("email", "invalid email").isEmail(),
    body(
      "password",
      "Password must be at least 5 characters long, contain a capital letter, and a number"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;

    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "try with correct credintials vire" });
      }

      const pwdCompare =await bcrypt.compare(req.body.password,userData.password)
      if(!pwdCompare){
        return res.status(400).json({errors:'try to log with correct credintel'})
      }
    
      const data ={
        user:{
          id:userData.id
        }
      }
      const authToken = jwt.sign(data,jwtSecret)
      return res.json ({success:true,authToken:authToken});

    } catch (error) {
      console.log(error); // Corrected syntax here
      res.json({ success: false });
    }
  }
);



module.exports = router;
