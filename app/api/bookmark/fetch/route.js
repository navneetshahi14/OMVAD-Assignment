import axios from "axios";
import * as cheerio from "cheerio";
import Bookmark from "@/(models)/bookmark.schema";
import dbConnect from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";

export async function POST(req) {
  await dbConnect();

  const user = await verifyToken(req);
  const userId = user.uid;
  const { url } = await req.json();
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const title = $('title').text() || '';
    const ogImage = $('meta[property="og:image"]').attr('content') || '';
    const favicon =
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href') ||
      '/favicon.ico';

    const finalFavicon = favicon.startsWith('http') ? favicon : new URL(favicon, url).href;


    let summary = '';
    try {
      const encodedUrl = encodeURIComponent(url.replace(/^https?:\/\//, ""));
      const jinaRes = await fetch(`https://r.jina.ai/http://${encodedUrl}`);
      if (jinaRes.ok) {
        summary = await jinaRes.text();
      }
    } catch (jinaErr) {
      console.warn("Jina AI summary failed:", jinaErr.message);
    }

    const bookmark = await Bookmark.create({
      userId,
      url,
      title,
      favicon: finalFavicon,
      ogImage,
      summary
    });

    return new Response(JSON.stringify(bookmark), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Bookmark fetch error:", err.message);
    return new Response(JSON.stringify({ message: "Failed to fetch metadata" }), {
      status: 500
    });
  }
}
