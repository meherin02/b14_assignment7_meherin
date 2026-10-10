import { toNextJsHandler } from "better-auth/next-js";
import { getAuth, isAuthConfigured } from "@/lib/auth";

export const runtime = "nodejs";

async function handle(request: Request) {
  if (!isAuthConfigured()) {
    if (request.method === "GET" && new URL(request.url).pathname.endsWith("/get-session")) {
      return Response.json(null);
    }
    return Response.json({ message: "সাইন ইন এখন পাওয়া যাচ্ছে না। একটু পরে চেষ্টা করুন।" }, { status: 503 });
  }
  const handlers = toNextJsHandler(getAuth());
  return request.method === "GET" ? handlers.GET(request) : handlers.POST(request);
}

export const GET = handle;
export const POST = handle;
