import express from "express";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import cors from "cors";
import helmet from "helmet";

// Define routes
import routes from "./routes/routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Define __dirname
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// Settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors());
app.use(helmet());

// Define flash messages
app.use((req, res, next) => {
    app.locals.signin = req.flash("signin");
    app.locals.signup = req.flash("signup");
    next();
});

// Use routes
app.use(authRoutes);
app.use(routes);

// Statics
app.use("/public", express.static(path.join(__dirname, "./public")));

export default app;
