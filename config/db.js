import mongoose from "mongoose";

const connectDb = async () => {
    mongoose.connect("mongodb+srv://abdullah941685:QXAQF015Z6WZTgsJ@cluster0.xfbyc.mongodb.net/", { dbName: "notes" })

        .then(() => {
            console.log("Connection Successful")
        })
        .catch((error) => {
            console.error("Connection Failed:", error);
        });
}
export { connectDb }