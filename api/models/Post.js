const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
    },
    body: {
      type: String,
    },
    type: {
      type: String,
      enum: ["text", "images", "video"],
      default: "text",
    },
    images: {
      type: Array,
    },
    author: {
      type: String,
      required: true,
    },
    externUrl: {
      type: String,
    },
    comments: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    category: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
