const { generateToken } = require('../helper');
const UserModel = require('../Model/UserModel');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY);

const UserController = {

    async register(req, res) {
        try {
            const { name, email, password, shipping_address } = req.body

            if (!name || !email || !password) {
                return res.send({ msg: "All fields are required", flag: 0 });
            }

            const existingUser = await UserModel.findOne({ email: email });
            if (existingUser) {
                return res.send({
                    msg: "Try with different email",
                    flag: 0,
                })
            } else {
                const user = new UserModel({
                    name: name,
                    email: email,
                    password: cryptr.encrypt(password),
                    shipping_address: shipping_address || []
                });
                await user.save();

                return res.send({
                    msg: "Account created Successfully",
                    flag: 1,
                    user: { ...user.toJSON(), password: null },
                    token: generateToken({ ...user.toJSON() }) // Generate token with admin data
                })
            }

        } catch (error) {
            console.log(error);
            return res.send({ msg: "Internal server error", flag: 0 })
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return res.send({ msg: "All fields are required", flag: 0 });
            }

            const user = await UserModel.findOne({ email:email });
            if (user) {
                if (cryptr.decrypt(user.password) === password) {
                    return res.send({
                        msg: "Login Successful",
                        flag: 1,
                        user: { ...user.toJSON(), password: null },
                        token: generateToken({ ...user.toJSON() }) // Generate token with admin data
                    })
                } else {
                    return res.send({ msg: "Incorrect password", flag: 0 });
                }
            } else {
                return res.send({ msg: "Check your email & password", flag: 0 })
            }

        } catch (error) {
            console.log(err)
            return res.send({ msg: "Internal server error", flag: 0 })
        }
    },

}

module.exports = UserController;
