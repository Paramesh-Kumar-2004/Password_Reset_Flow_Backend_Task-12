import User from "../Models/userModel.js";
import { jwtVerify } from "../Utils/JWT.js";


export const Authentication = async (req, res, next) => {
    try {

        const { token } = req.cookies;
        const decode = await jwtVerify(token);

        if (!decode) {
            return res.status(401).json({
                message: "Unauthorized User"
            });
        }

        const user = await User.findById(decode._id);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        req.user = user
        next()

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Intenal Server Error"
        })
    }
}

