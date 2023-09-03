const Users = require('./model/user.js')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const GetApi = (req, res) => {
    res.send('WelcomeOne')
}

const RegisterUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body

        if (!fullName || !email || !password) {
            res.send("All Field Must be required").status(400)
        } else {
            const emailIsAlreadyExist = await Users.findOne({ email })
            console.log(emailIsAlreadyExist, "emailIsAlreadyExist");
            if (emailIsAlreadyExist) {
                res.send("Email Id Already Registerd").status(400)
            } else {
                var hash = await bcrypt.hash(password, 10);
                const users = await Users.create({ fullName, email, password: hash })
                res.send(`${fullName} successfully Registered`).status(200)
            }
        }
    } catch (error) {
        console.log(error, "Error in Saving Register data ");
    }
}

const LoginUser = async (req,res) => {
    const {email,password} = req.body
    console.log(req.body);
    try {
        if(!email || !password) {
            res.send("All Field Must be required").status(400)
        }else{
            const user = await Users.findOne({email})
            if(user){
                const validator = await bcrypt.compare(password,user.password)
                if(!validator){
                    res.send("Password Wrong").status(400)
                }else{
                        const data = {
                            userID:user._id,
                            email:user.email
                        }
                        const JWT_SECRET_KEY = 'DSFHLLK_ASDFJL_SDFSNL' 
                        const token = jwt.sign(data,JWT_SECRET_KEY,{expiresIn:84600})
                        data.token = token

                        await Users.updateOne({_id:user._id},{
                            $set:{
                                token:token
                            }
                        })
                        delete data.userID
                        res.status(200).json({data})
                }
            }else{
                res.send("Email Not Found").status(400)
            }
        }
    } catch (error) {
        console.log(error,"error while login");
    }
}
module.exports = {
    GetApi, RegisterUser, LoginUser
}