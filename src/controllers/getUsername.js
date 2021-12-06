import User from "../model/user.js";

async function home(req, res) {
    try {
        if (typeof req.session != "undefined") {
            let userId = req.session.passport.user;
            let user = await User.findById(userId);
            res.render("home", {
                login: true,
                myUsername: user.username,
            });
        } else {
            res.redirect("/account/login");
        }
    } catch (e) {
        console.log(e);
    }
}
export default home;
