const { generateToken } = require('../helper');
const AdminModel = require('../Model/AdminModel');

const AdminController = {

    async login(req, res) {
        try {
            const {email , password} = req.body

            if(!email || !password) {
                return res.send({msg: "All fields are required" , flag: 0});
            }

            const admin = await AdminModel.findOne({email: email});
            if(admin) {
                console.log(admin)
                if(admin.password === password) {
                    return res.send({
                        msg: "Login Successful" , 
                        flag: 1 , 
                        admin: {...admin.toJSON(), password: null},
                        token: generateToken({ ...admin.toJSON()}) // Generate token with admin data
                    })
                }
            }else{
                return res.send({msg: "Check your email & password", flag:0})
            }
            
        } catch (error) {
            console.log(error);
            return res.send({msg: "Internal server errror" , flag: 0})
        }
    },

}

module.exports = AdminController;
