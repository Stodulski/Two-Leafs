import User from "../model/user.js";
import Post from "../model/post.js";
import imgUtil from "../multer.js";
import fs from "fs";
import path from "path";

// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

async function editProfileImg(req, res) {
    try {
        if (typeof req.session != "undefined") {
            let user = await User.findById(req.session.passport.user);
            let allPosts = await Post.find({ imgOwner: user.username });
            var filePath = req.file.path;
            var fileName = req.file.filename;
            user.imgUrl = fileName;
            if (typeof allPosts != "undefined" && allPosts.length > 0) {
                for (let i = 0; i < allPosts.length; i++) {
                    let postId = await Post.findById(allPosts[i].id);
                    postId.imgName = fileName;
                    await postId.save();
                }
            }
            await user.save();
            imgUtil.helperImg(filePath, fileName, 300);
            if (
                fs.existsSync(path.join(__dirname, "../public/toMin/*")) &&
                fileName != "default.jpg"
            ) {
                fs.unlinkSync(path.join(__dirname, "../public/toMin/*"));
            }
            res.json("SUCCESS");
        } else {
            res.redirect("/account/login");
        }
    } catch (e) {
        console.log(e);
    }
}
export default editProfileImg;
