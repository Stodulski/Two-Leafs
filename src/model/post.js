import mongoose from "mongoose";

var PostSchema = new mongoose.Schema(
    {
        imgOwner: String,
        imgName: String,
        imgPost: String,
        like: {
            default: 0,
            type: Number,
        },
        likedBy: [String],
    },
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
