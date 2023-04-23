import { S3Client } from "@aws-sdk/client-s3"
import multer from "multer"
import multerS3 from "multer-s3"

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
})

const sanitizeFile = (file, cb) => {
  const fileExts = [".png", ".jpg", ".jpeg", ".gif"]
  const isAllowedExt = fileExts.includes()
}

const uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      const fileName = Date.now() + "_" + file.originalname
      cb(null, fileName)
    },
  }),

  limits: {
    fileSize: 1024 * 1024 * 5,
  },
})

export { uploadImage }
