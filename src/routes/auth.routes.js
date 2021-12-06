import { Router } from "express";
const router = Router();

import passport from "../auth/auth.js";
import isAuth from "../auth/isAuthenticated.js";

router.get("/account/register", isAuth.two, (req, res) => {
    res.render("signup.ejs");
});

router.post(
    "/account/register",
    passport.authenticate("signUp", {
        failureRedirect: "/account/register",
        successRedirect: "/",
    })
);

router.get("/account/login", isAuth.two, (req, res) => {
    res.render("signin.ejs");
});

router.post(
    "/account/login",
    passport.authenticate("signIn", {
        failureRedirect: "/account/login",
        successRedirect: "/",
    })
);

router.get("/account/logout", isAuth.one, (req, res) => {
    req.logout();
    res.redirect("/account/login");
});

export default router;
