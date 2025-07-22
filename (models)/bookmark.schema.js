// models/Bookmark.js
import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  userId: String,
  url: String,
  title: String,
  favicon: String,
  ogImage: String,
  summary: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bookmark = mongoose.models.Bookmark || mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;
