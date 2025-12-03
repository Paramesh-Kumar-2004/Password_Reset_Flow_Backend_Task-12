import User from "../Models/userModel.js";
import { jwtVerify } from "../Utils/JWT.js";


export const Authentication = async (req, res, next) => {
    try {

        const { token } = req.cookies;


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Intenal Server Error"
        })
    }
}
