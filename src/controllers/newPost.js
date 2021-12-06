import Post from "../model/post.js";
import User from "../model/user.js";
import imgUtil from "../multer.js";
import fs from "fs";
import path from "path";

// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

async function newPost(req, res) {
    try {
        if (typeof req.file != "undefined") {
            let user = await User.findById(req.session.passport.user);
            let post = await new Post();
            var filePath = req.file.path;
            var fileName = req.file.filename;
            post.imgOwner = user.username;
            post.imgName = user.imgUrl;
            post.imgPost = req.file.filename;
            await post.save();
            res.redirect("/");
            imgUtil.helperImg(filePath, fileName, 1080);
            if (fs.existsSync(path.join(__dirname, "../public/toMin/*"))) {
                fs.unlinkSync(path.join(__dirname, "../public/toMin/*"));
            }
            return;
        } else {
            res.redirect("/account/login");
        }
    } catch (e) {
        console.log(e);
    }
}
export default newPost;
