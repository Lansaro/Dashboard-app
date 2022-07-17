const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function (v) {return /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(v);},
            message: 'Please enter a valid email address',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be 8 characters or longer'],
    },
}, { timestamps: true });

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set((value) => (this._confirmPassword = value));

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match');
    }
    next();
});

UserSchema.pre('validate', function (next) {
    bcrypt
        .hash(this.password, 10)
        .then((hash) => {
            this.password = hash;
            next();
        })
        .catch((err) => {
            console.log('INSIDE ERROR BLOCK');
            console.log(err);
        });
});

module.exports = mongoose.model('User', UserSchema);