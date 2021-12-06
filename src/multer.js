import multer from "multer";
import path from "path";
import sharp from "sharp";

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const imgUtil = {};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "public/toMin/"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

imgUtil.upload = multer({
    storage: storage,
    dest: path.join(__dirname, "public/toMin/"),
});

imgUtil.helperImg = (filePath, fileName, size = 300) => {
    return sharp(filePath)
        .resize(size)
        .toFile(path.join(__dirname, "public/uploads/") + fileName);
};

export default imgUtil;
