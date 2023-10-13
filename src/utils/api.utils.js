import multer from "multer";

export const paginateRequest = (req) => {
     const { limit, offset, page } = req.query;
     let baseLimit = 10;
     let baseOffset = 5;

     return {
          limit: limit ? limit : baseLimit,
          offset: offset ? (page - 1) * limit : baseOffset,
          limit: page ? page : 1,
     };
};

const _storage = multer.diskStorage({
     destination: (req, file, cb) => {
          const dir =
               process.env.NODE_ENV === "prod"
                    ? "./build/uploads/"
                    : "./src/uploads/";
          cb(null, dir);
     },
     filename: (req, file, cb) => {
          const name = file.originalname;
          cb(null, name);
     },
});

const _fileFilter = (req, file, cb) => {
     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
          return cb(null, true);
     }
     return cb({ message: "Unsupported file format" }, false);
};

export const upload = multer({
     storage: _storage,
     limits: { fileSize: 1024 * 1024 },
     fileFilter: _fileFilter,
});
