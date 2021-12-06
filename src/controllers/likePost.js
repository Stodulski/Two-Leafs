import Post from "../model/post.js";

async function likePost(req, res) {
    try {
        if (typeof req.session != "undefined") {
            let userId = req.session.passport.user;
            let postId = req.body.postId;
            let post = await Post.findById(postId);
            let isLiked = post.likedBy.indexOf(userId);
            if (isLiked == -1) {
                post.likedBy.push(userId);
                post.like += 1;
                await post.save();
            }
            res.json({
                isLiked,
                id: post._id,
            });
        } else {
            res.redirect("/account/login");
        }
    } catch (e) {
        console.log(e);
    }
}
export default likePost;
