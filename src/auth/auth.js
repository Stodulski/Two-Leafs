import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";

import User from "../model/user.js";

var user_cache = {};

passport.serializeUser(function (user, next) {
    let id = user._id;
    user_cache[id] = user;
    next(null, id);
});

passport.deserializeUser(function (id, next) {
    next(null, user_cache[id]);
});

passport.use(
    "signUp",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async function (req, username, password, done) {
            try {
                let checkUserEmail = await User.findOne({
                    email: username.toString().toLowerCase(),
                });
                let checkUserUsername = await User.findOne({
                    username: req.body.username.toString().toLowerCase(),
                });
                if (username.length <= 5)
                    return done(
                        null,
                        false,
                        req.flash("signup", "¡El email no es valido!")
                    );
                if (password.length <= 5)
                    return done(
                        null,
                        false,
                        req.flash("signup", "¡La contraseña es insegura!")
                    );
                if (req.body.username.length <= 0)
                    return done(
                        null,
                        false,
                        req.flash(
                            "signup",
                            "¡El nombre de usuario es muy corto!"
                        )
                    );
                if (req.body.name.length <= 0)
                    return done(
                        null,
                        false,
                        req.flash("signup", "¡El nombre es muy corto!")
                    );
                if (checkUserUsername)
                    return done(
                        null,
                        false,
                        req.flash(
                            "signup",
                            "¡El nombre de usuario esta en uso!"
                        )
                    );
                if (!checkUserEmail) {
                    const saltRounds = 10;
                    let name = req.body.name;
                    let nameString = name.toLowerCase().split(" ");
                    for (var i = 0; i < nameString.length; i++) {
                        nameString[i] =
                            nameString[i].charAt(0).toUpperCase() +
                            nameString[i].substring(1);
                    }
                    name = nameString.join(" ");
                    let newUser = await new User();
                    newUser.name = name;
                    newUser.username = req.body.username
                        .toString()
                        .toLowerCase();
                    newUser.email = username.toLowerCase();
                    bcrypt.hash(
                        password.toString().toLowerCase(),
                        saltRounds,
                        async function (err, hash) {
                            newUser.password = hash;
                            await newUser.save();
                            return done(null, newUser);
                        }
                    );
                } else
                    return done(
                        null,
                        false,
                        req.flash("signup", "¡El email esta en uso!")
                    );
            } catch (e) {
                console.log(e);
            }
        }
    )
);

passport.use(
    "signIn",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async function (req, username, password, done) {
            try {
                let emailLower = username.toString().toLowerCase();
                let checkUserEmail = await User.findOne({
                    email: emailLower,
                });
                if (checkUserEmail) {
                    bcrypt.compare(
                        password.toString().toLowerCase(),
                        checkUserEmail.password,
                        async function (err, result) {
                            if (result === true)
                                return done(null, checkUserEmail);
                            else
                                return done(
                                    null,
                                    false,
                                    req.flash(
                                        "signin",
                                        "¡Contraseña incorrecta!"
                                    )
                                );
                        }
                    );
                } else
                    return done(
                        null,
                        false,
                        req.flash("signin", "¡El email no existe!")
                    );
            } catch (e) {
                console.log(e);
            }
        }
    )
);

export default passport;
