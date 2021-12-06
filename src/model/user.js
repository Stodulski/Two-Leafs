import mongoose from "mongoose";

var UserSchema = new mongoose.Schema(
    {
        username: String,
        imgUrl: {
            type: String,
            default: "default.jpg",
        },
        name: String,
        password: String,
        email: String,
        followedNumber: {
            type: Number,
            default: 0
        },
        followed: [String],
        followersNumber: {
            type: Number,
            default: 0
        },
        followers: [String]
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
