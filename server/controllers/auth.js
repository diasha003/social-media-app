import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const saltRounds = 7;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: "Email must be unique" });
    }

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      picturePath: req.body.picturePath,
      location: req.body.location,
      occupation: req.body.occupation,
    });

    const savedUser = await newUser.save();

    /*const token = jwt.sign(
      { userId: savedUser._id, isAdmin: savedUser.isAdmin },
      process.env.TOKEN_KEY
    );*/

    //res.status(201).json({ ...savedUser, token: `${token}` });
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //console.log(user);

    const token = jwt.sign(
      {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        picturePath: user.picturePath,
        isAdmin: user.isAdmin,
      },
      process.env.TOKEN_KEY
    );

    delete user._doc.password;
    //console.log(user);
    res.status(201).json({ ...user, token: `${token}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const info = (req, res) => {
  //console.log(req.user);
};
