import { v2 as cloudinary } from "cloudinary"
// import { Cloudinary } from "multer-storage-cloudinary"
import fs from "fs"

// Configuration
cloudinary.config({
    cloud_name: 'dn6wofqmc',
    api_key: '643124771525397',
    api_secret: 'LXIsAPTX87BUKGm9dgw0ugJrewU' // Click 'View API Keys' above to copy your API secret
});

const uploadCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) return null

        const uploadResult = await cloudinary.uploader.upload(
            localFilePath, {
            resource_type: "auto",
        }
        )
        console.log("The upload is successful", uploadResult)
        return uploadResult
    }
    catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(error);
    };
}

export { uploadCloudinary }