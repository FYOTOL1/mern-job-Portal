import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: "dsdw5hrhj",
    api_key: "589243882767718",
    api_secret: "kcDWKM1Ufnjtu_2drU5VzQ12vbU",
});

export default cloudinary