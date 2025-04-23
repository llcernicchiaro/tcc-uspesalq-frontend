import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/") {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

// Definindo quais rotas devem ser protegidas
export const config = {
  matcher: ["/dashboard", "/groups/:path*", "/profile"],
};
