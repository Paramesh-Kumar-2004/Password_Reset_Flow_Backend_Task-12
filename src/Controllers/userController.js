import bcrypt from "bcrypt"
import User from "../Models/userModel.js"
import { jwtSign, jwtVerify, options } from "../Utils/JWT.js";
import sendMail from "../Utils/SendMail.js";



export const RegisterUser = async (req, res) => {
    try {
        console.log("Entered Into Register User Controller")

        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(404).json({
                message: "Enter All The Fields"
            })
        }

        const emailExist = await User.findOne({ email })

        if (emailExist) {
            return res.status(404).json({
                message: "This Email Already Registered"
            })
        }

        const user = await User.create({ userName, email, password })


        res.status(200).json({
            message: "User Register Successfully",
            userName,
            email,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Intenal Server Error"
        })
    }
}



export const LoginUser = async (req, res) => {
    try {
        console.log("Entered Into Login ")

        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(404).json({
                message: "Email Not Found"
            })
        }

        const verifyPassword = await bcrypt.compare(`${password}`, `${user.password}`)

        if (!verifyPassword) {
            return res.status(404).json({
                message: "Password Invalid"
            })
        }

        const token = await jwtSign(user._id)

        if (verifyPassword) {
            res.status(200)
                .cookie("token", token, options)
                .json({
                    message: "Login Successfull",
                    email: user.email,
                    token
                })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Intenal Server Error"
        })
    }
}



export const ForgotPassword = async (req, res) => {
    try {

        console.log("Entered Into Forgot Password")

        const { email } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: `User Not Found For ${email}`
            })
        }

        const passwordRestToken = await jwtSign(user._id)

        user.passwordResetToken = passwordRestToken;
        await user.save()

        await sendMail(
            user.email,
            "Password Reset Link",
            `http://${req.host}/api/v1/resetpassword/${passwordRestToken}`
        )

        res.status(200).json({
            message: "Forgot Mail Send To Your Email",
            passwordRestToken,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Intenal Server Error"
        })
    }
}


export const ResetPassword = async (req, res) => {
    try {
        console.log("Entered Into Reset Password")

        const resetToken = req.params;
        const { password } = req.body;

        const decode = await jwtVerify(resetToken)

        if (!decode) {
            return res.status(404).json({
                message: "Token Invalid"
            })
        }

        const user = await User.findById(decode._id)
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        if (user.passwordResetToken !== resetToken) {
            return res.status(404).json({
                message: "Token Invalid"
            })
        }

        user.password = password;
        user.passwordResetToken = undefined;
        await user.save();

        sendMail(
            user.email,
            "Password Reset Successfully",
            `Your Password Has Been Reset Successfully`
        )

        res.status(200).json({
            message: "Password Reset Successfully"
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Intenal Server Error"
        })
    }
}