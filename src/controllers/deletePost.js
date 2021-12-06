import Post from "../model/post.js";

async function deletePost(req, res){
    try{
        if (typeof req.session != "undefined") {
            let postId = req.body.deleteId
            await Post.findByIdAndDelete(postId);
            res.json('SUCCESS');
        }
        else{
            res.redirect('/account/login')
        }
    }
    catch(e){
        console.log(e);
    }

}

export default deletePost;