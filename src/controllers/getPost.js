import Post from "../model/post.js";
import User from "../model/user.js";

async function getPost(req, res) {
    try {
        if (typeof req.session != "undefined") {
            let userId = req.session.passport.user;
            let user = await User.findById(userId);
            let username = user.username;
            let post = await Post.find().sort({ createdAt: -1 });
            res.json({
                post,
                userId,
                username
            });
        } else {
            res.redirect("/account/login");
        }
    } catch (e) {
        console.log(e);
    }
}
export default getPost;
