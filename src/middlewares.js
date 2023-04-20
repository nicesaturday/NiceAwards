import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
  }
})

const multerUploader = multerS3({
  s3:s3,
  bucket: "pinkmelon",
  acl:"public-read"
})

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "pink-melon";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const uploadMusic = multer({dest: "uploads/music", limits:{
  fileSize : 300000000000000000000,
},
 storage: multerUploader,
});

export const uploadImage = multer({dest:"uploads/image/", limits:{
  fileSize : 3000000000000000000000,
},
 storage: multerUploader,
})