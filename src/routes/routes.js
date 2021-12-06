import { Router } from "express";
import path from "path";
const router = Router();

import profileCheck from "../controllers/profileCheck.js";
import isAuth from "../auth/isAuthenticated.js";
import imgUtil from "../multer.js";
import newPost from "../controllers/newPost.js";
import getPost from "../controllers/getPost.js";
import likePost from "../controllers/likePost.js";
import unlikePost from "../controllers/unlikePost.js";
import home from "../controllers/getUsername.js";
import editProfileImg from "../controllers/editProfileImg.js";
import searchUser from "../controllers/searchUser.js";
import deletePost from "../controllers/deletePost.js";

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

router.get("/", isAuth.one, home);

router.get("/:id", isAuth.one, profileCheck);

router.put("/like/post", likePost);

router.put("/unlike/post", unlikePost);

router.post("/new/post", imgUtil.upload.single("image"), newPost);

router.post("/get/post", getPost);

router.post(
    "/edit/profile/img",
    imgUtil.upload.single("image"),
    editProfileImg
);

router.delete('/delete/post', deletePost)

router.post('/search/user', searchUser);

router.get("/public/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../" + req.url));
});

router.get("*", (req, res) => {
    res.status(404).render("404");
});

export default router;
