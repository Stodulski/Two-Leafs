import Post from "../model/post.js";

async function unlikePost(req, res) {
    try {
        if (typeof req.session != "undefined") {
            let userId = req.session.passport.user;
            let postId = req.body.postId;
            let post = await Post.findById(postId);
            let isLiked = post.likedBy.indexOf(userId);
            post.likedBy.splice(isLiked, 1);
            post.like -= 1;
            await post.save();
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
export default unlikePost;
