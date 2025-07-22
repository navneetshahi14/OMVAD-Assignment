import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Bookmark from "@/(models)/bookmark.schema";
import { verifyToken } from "@/lib/verifyToken";

export async function DELETE(req, context) {
  await dbConnect();

  try {
    const user = await verifyToken(req);
    const userId = user.uid;
    const bookmarkId = context.params.id;
    console.log(bookmarkId)

    const bookmark = await Bookmark.findOne({ _id: bookmarkId, userId });

    if (!bookmark) {
      return NextResponse.json({ message: "Bookmark not found" }, { status: 404 });
    }

    await Bookmark.deleteOne({ _id: bookmarkId });

    return NextResponse.json({ message: "Bookmark deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Delete error:", err.message);
    return NextResponse.json({ message: "Failed to delete bookmark" }, { status: 500 });
  }
}
