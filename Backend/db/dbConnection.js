import mongoose from "mongoose";
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error at MongoDB connection - "+error.message);
    }
};

export default connectToDB;