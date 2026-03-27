const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("../config/cloudinary")


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog_images',
    // Remove specific formats or add all of them:
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'gif', 'svg', 'bmp'], 
    transformation: [{ width: 800, crop: "limit" }] // Optional: resizes huge files
  }
});

const upload = multer({ storage })

module.exports = upload