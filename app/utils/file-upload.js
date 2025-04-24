import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './public/uploads/')
	},
	filename: (req, file, callback) => {
        const imageUniqueName = `${Date.now()}-${file.originalname}`

        switch (file.fieldname) {
            case 'image':
                callback(null, `article-${imageUniqueName}`)
                break
            case 'avatar':
                callback(null, `avatar-${imageUniqueName}`)
                break
            default:
                callback(null, `${imageUniqueName}`)
                break
        }
	},
})

const fileUpload = multer({
	storage,
	fileFilter: (req, file, callback) => {
		const ext = path.extname(file.originalname).toLowerCase()

		if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.webp') {
			return callback(new Error('Only images are allowed'))
		}

		callback(null, true)
	},
	limits: {
		fileSize: 1024 * 1024 * 6, // 6MB
	},
})

export default fileUpload
