//utilities/imageUpload.js
const cloudinary=require('../config/cloudinaryConfig')


const uploadToCloudinary=(filepath)=>{
    console.log("api-key",process.env.API_KEY)
    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload(
            filepath,
            {folder:'fitnessApp'},
            (error,result)=>{
                if(error) return reject(error)
                resolve(result.secure_url)
            }
        )
    })
}

module.exports=uploadToCloudinary;