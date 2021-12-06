import User from "../model/user.js";

async function profileCheck(req, res) {
    try {
        if (typeof req.session != "undefined") {
            let userId = req.session.passport.user;
            let userUsername = req.params.id;
            let findUser = await User.findOne({ username: userUsername });
            let checkUser = await User.findOne({
                _id: userId,
                username: userUsername,
            });
            let myUser = await User.findById(userId);
            if (checkUser) {
                var myAcc = true;
            } else {
                var myAcc = false;
            }

            if (findUser) {
                let imgUrl = findUser.imgUrl;
                res.render("profile", {
                    imgUrl,
                    username: userUsername,
                    name: findUser.name,
                    login: true,
                    followers: findUser.followersNumber,
                    followed: findUser.followedNumber,
                    myUsername: myUser.username,
                    myAcc,
                });
            } else {
                res.render("404");
            }
        }
    } catch (e) {
        console.log(e);
    }
}

export default profileCheck;
