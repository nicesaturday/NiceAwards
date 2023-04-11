import multer from "multer";


export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "melon";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const uploadMusic = multer({dest: "uploads/music", limits:{
  fileSize : 300000000000000000000,
},
});

export const uploadImage = multer({dest:"uploads/image/", limits:{
  fileSize : 3000000000000000000000,
},
})