import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { auth as Users } from "../models/auth.js"
import { profile as Profile } from "../models/profile.js"
import { verifyToken } from "../middlewares/auth.js"
import { uploadCloudinary } from "../utils/cloudinary.js"
import { upload } from "../middlewares/multer.js"

const authRouter = express.Router()


authRouter.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        const emailVerification = await Users.findOne({ email });
        if (emailVerification) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare user data
        const userData = {
            email,
            password: hashedPassword,
            roles: ["customer"],
            status: "active",
        };

        // Create and save new user
        const user = new Users(userData);
        await user.save();

        res.status(201).json({ user });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Something went very very wrong", error: err.message });
    }
});
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    console.log("email", email)
    try {
        const user = await Users.findOne({ email })
        if (!user) { return res.status(404).json({ message: "User not found" }) }
        else {


            const isPassword = await bcrypt.compare(password, user.password)

            const uid = user._id

            if (isPassword) {
                const token = jwt.sign({ uid }, "secret-key", { expiresIn: "30s" })
                res.status(201).json({ message: "User successfully logged in", token })
            }
            else {

                return res.status(401).json({ message: "Invalid Password" })
            }
        }


    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong", err })
    }
})

authRouter.get("/user", verifyToken, async (req, res) => {

    const uid = req.uid
    const user = await Profile.findOne({ uid })

    try {
        if (!user) {
            res.status(404).json({ message: "User not found" })
        }
        else {
            console.log(user)
            res.status(200).json({ user })
        }
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong", err })
    }
}
)
authRouter.post("/profile", upload.single("image"), async (req, res) => {


    try {
        const { uid, name, email } = req.body;
        let imageUrl = null;

        console.log("Request body:", req.body);
        console.log("Uploaded file:", req.file);

        // Check if file is present, then upload to Cloudinary
        if (req.file) {
            const filePath = req.file.path;
            const uploadResult = await uploadCloudinary(filePath);
            imageUrl = uploadResult.secure_url;
            console.log("Image uploaded to Cloudinary:", imageUrl);
        }
        else {
            console.log("No Image Selected")
        }

        const userData = {
            uid,
            name,
            email,
            roles: ["customer"],
            status: "active",
            imageUrl,  // Will be null if no image was uploaded
        };

        // Create and save new user
        const userProfile = new Profile(userData);
        await userProfile.save();

        console.log("New user created:", userProfile);
        res.status(201).json({ message: "A new user has been created successfully", userProfile });
    } catch (err) {
        console.error("Error during profile setting:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
})

export { authRouter }