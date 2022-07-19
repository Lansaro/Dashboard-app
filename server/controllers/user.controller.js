const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createNewUser = async (req, res) => {
    const user = new User(req.body);
    user
        .save()
        .then(() => {
            res.json({msg: 'success', user: user});
        })
        .catch(err => res.status(400).json(err));
};

const login = async (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(400).json({msg: 'Invalid login attempt 1'});
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then(passwordIsValid => {
                        if (passwordIsValid) {
                            res
                                .cookie('usertoken', jwt.sign({ _id: user._id}, process.env.JWT_SECRET),
                                    {httpOnly: true, expires: new Date(Date.now() + 900000000)})
                                .json({msg: 'success', userLogged: {username: `${user.name}`}});
                        } else {
                            res.status(400).json({msg: 'Invalid login attempt 2'})
                        }
                    })
                    .catch(err => res.status(400).json({msg: 'Invalid login attempt 3'}));
            }
        })
        .catch(err => res.json(err));
};

const logout = (req, res) => {
    res.clearCookie('usertoken');
    res.json({ msg: 'logout successful' });
};

const getLoggedInUser = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});
    User.findById(decodedJWT.payload._id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
}

module.exports = { createNewUser, login, logout, getLoggedInUser };