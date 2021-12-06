const isAuth = {};

isAuth.one = async (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/account/login");
    }
};

isAuth.two = async (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect("/");
    } else {
        next();
    }
};

export default isAuth;
