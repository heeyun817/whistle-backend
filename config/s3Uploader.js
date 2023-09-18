
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const userProvider = require("../../backend/src/app/User/userProvider");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const allowedExtensions = [
  ".png",
  ".jpg",
  ".jpeg",
  ".bmp",
  ".PNG",
  ".JPG",
  ".JPEG",
  ".BMP",
];
const file_allowedExtensions = [
  ".png",
  ".jpg",
  ".jpeg",
  ".bmp",
  ".PNG",
  ".JPG",
  ".JPEG",
  ".BMP",
  ".pdf",
  ".PDF"
];
const { region, accessKeyId, secretAccessKey } = require("./s3");
const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});
const imageUploader_profile = multer({
  storage: multerS3({
    s3: s3,
    bucket: "whistle-s3",
    key: async function (req, file, callback) {
      //const uploadDirectory = req.query.directory ?? "";

      const uploadDirectory = "profile";
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("wrong extension"));
      }
      const { userid } = await req.body;
      callback(null, `${uploadDirectory}/${userid}${extension}`); // 사진 이름를 user_id로 설정
    },
    acl: "public-read-write",
  }),
});

module.exports = {imageUploader_profile:imageUploader_profile};
