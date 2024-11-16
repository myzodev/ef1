import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const fileUpload = multer({ 
    storage,
    fileFilter: (req, file, callback) => {
        const ext = path.extname(file.originalname);

        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.webp') {
            return callback(new Error('Only images are allowed'))
        }

        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
})

export default fileUpload