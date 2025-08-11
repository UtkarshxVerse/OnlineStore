const { verifyToken } = require("../helper");

const AdminAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            if (verifyToken(token)) {
                next();
            } else {
                return res.status(401).json({ msg: "Unauthorized access" });
            }

        } else {
            res.send({
                msg: "Token is required",
                flag: 0
            });
        }

    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });

    }
}

module.exports = AdminAuth;