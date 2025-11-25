const express = require('express');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
        return res.json({ message: "User finedes allerede" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
        email,
        password: hashedPassword,
    });
    await newUser.save();

    res.json({ message: "User oprettet" });
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "User findes ikke" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Forkert email eller password"})
        }

        const token = jwt.sign(
            { id: user._id }, "secret", {expiresIn: "7d"}
        );

        res.json({
            token,
            userID: user._id,
            email,
        });
    } catch (error) {
        console.error("Login fejl", error);
        res.status(500).json({ message: "Server fejl" });
    }
});

router.get("/allUsers", async (req, res) => {
  try {
    const users = await UserModel.find({}).select(
      "email password"
    );
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Fejl" });
  }
});

module.exports = router