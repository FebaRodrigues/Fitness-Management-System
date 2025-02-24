//utilities/imageUpload.js
// const cloudinary=require('../config/cloudinaryConfig')


// const uploadToCloudinary=(filepath)=>{
//     console.log("api-key",process.env.API_KEY)
//     return new Promise((resolve,reject)=>{
//         cloudinary.uploader.upload(
//             filepath,
//             {folder:'fitnessApp'},
//             (error,result)=>{
//                 if(error) return reject(error)
//                 resolve(result.secure_url)
//             }
//         )
//     })
// }


// module.exports=uploadToCloudinary;

const cloudinary = require("../config/cloudinaryConfig");

const uploadToCloudinary = async (filePath) => {
    try {
        console.log("Uploading to Cloudinary...");
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "fitnessApp",
            use_filename: true,
            unique_filename: false,
        });

        console.log("Upload successful:", result.secure_url);
        return result.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error;
    }
};

module.exports = uploadToCloudinary;
