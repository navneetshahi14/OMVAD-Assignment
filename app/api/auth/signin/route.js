import dbConnect from '@/lib/db';
import User from '@/(models)/user.schema';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await dbConnect();
  const { uid } = await req.json();

  try {
    const user = await User.findOne({ uid });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    const token = jwt.sign(
      { uid: user.uid, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (err) {
    console.error('Signin error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
