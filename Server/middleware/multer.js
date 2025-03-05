
// middleware/multer.js
const multer=require("multer");

const storage=multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage:storage});

module.exports=upload;

// // middleware/multer.js
// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log("Multer saving to: uploads/");
//         cb(null, "uploads/"); // Ensure this folder exists
//     },
//     filename: (req, file, cb) => {
//         const filename = Date.now() + path.extname(file.originalname);
//         console.log("Multer filename:", filename);
//         cb(null, filename);
//     },
// });

// const upload = multer({ storage });
// module.exports = upload;