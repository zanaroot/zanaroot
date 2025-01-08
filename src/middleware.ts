import { createI18nMiddleware } from "next-international/middleware";
import type { NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
  const request = I18nMiddleware(req);

  return request;
};

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
