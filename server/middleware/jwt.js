const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    if (req.headers.cookie) {
        const cookie = req.headers.cookie.substring(10);
        console.log(cookie);
        jwt.verify(cookie, "peanutbutter", (err, payload) => {
            if (err) {
                console.log("ERROR");
                res.status(401).json({ verified: false });
        } else {
            console.log("user is authenticated", payload);
            req.body.user_id = payload._id;
            next();
        }
        });
    } else {
        res.status(401).json({ msg: "you are not authorized" });
    }
};

module.exports = authenticate;