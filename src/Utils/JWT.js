import jwt from "jsonwebtoken"



export const options = {
    httpOnly: true,
    sameSite: 'Strict',
    // maxAge: 24 * 60 * 60 * 1000,
}


export async function jwtSign(_id) {
    return jwt.sign(
        { _id },
        process.env.Secret_Key,
        { expiresIn: process.env.Expires_In }
    )
}


export async function jwtVerify(token) {
    return jwt.verify(token, process.env.Secret_Key)
}
