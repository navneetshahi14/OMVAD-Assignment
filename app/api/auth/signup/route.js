import dbConnect from "@/lib/db";
import User from "@/(models)/user.schema";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();
  const { uid, email } = await req.json();
  console.log(uid, email);
  if (!uid || !email) {
    return new Response("uid or email missing", { status: 400 });
  }

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({ uid, email });
    }

    const token = jwt.sign(
      { uid: user.uid, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (err) {
    console.log(err);
    throw new Response("Internal Server Error", { status: 500 });
  }
}
