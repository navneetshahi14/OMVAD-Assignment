import dbConnect from "@/lib/db";
import Bookmark from "@/(models)/bookmark.schema";
import { verifyToken } from "@/lib/verifyToken";

export async function GET(req){
    await dbConnect();

    try{
        const user = await verifyToken(req);
        const userId = user.uid;

        if(!userId){
            return new Response("User ID missing", { status: 400 });
        }

        const bookmarks = await Bookmark.find({userId:userId})
        return new Response(JSON.stringify(bookmarks), { status: 200 });
    }catch(err){
        console.log(err.message);
        throw new Response("Internal Server Error",{status:500})
    }
}