const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createNewUser = async (req, res) => {
    const { body } = req;
    try {
        const queriedUser = await User.findOne({ email: body.email });
        if (queriedUser) {
        console.log(queriedUser);
        res.status(400).json({ errMsg: "This user already exists" });
        return;
        }
    } catch (error) {
        res.status(400).json(error);
    }
    let newUser = new User(body);

    try {
        const newUserObject = await newUser.save();
        res.json(newUserObject);
    } catch (error) {
        res.status(400).json(error);
    }
};

const login = async (req, res) => {
    const { body } = req;
    if (!body.email) {
        res.status(400).json({ error: "No email provided - please provide email" });
        return;
    }

    let userQuery;

    try {
        userQuery = await User.findOne({ email: body.email });
        if (userQuery === null) {
        res.status(400).json({ msg: "email not found" });
        }
    } catch (error) {
        res.status(400).json(error);
    }

    const passwordCheck = bcrypt.compareSync(body.password, userQuery.password);

    if (!passwordCheck) {
        res.status(400).json({ error: "email and password do not match" });
        return;
    }

    const userToken = jwt.sign({ _id: userQuery._id }, "peanutbutter");
    console.log(userToken);

    res
        .cookie("usertoken", userToken, "peanutbutter", {
            httpOnly: true,
            expires: new Date(Date.now() + 900000000),
            })
        .json({ msg: "successful login" });
};

module.exports = { createNewUser, login };