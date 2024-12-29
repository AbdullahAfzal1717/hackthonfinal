import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization
    console.log("authHeader", authHeader)

    if (!authHeader) {
        console.log("Authorization header missing")
        return res.status(401).json({ message: "Authorization header missing" });
    }


    const token = authHeader.split(' ')[1]
    console.log("token", token)

    jwt.verify(token, 'secret-key', (error, result) => {
        console.log("result", result)
        if (!error) {
            req.uid = result.uid
            console.log("req.uid", req.uid)
            next()
        } else {
            res.status(401).json({ message: "Unauthorized", error })
        }
    })
}
export { verifyToken }