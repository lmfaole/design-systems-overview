import type { APIRoute } from "astro";
import { createSitemapResponse } from "@/site/sitemap";

export const prerender = true;

export const GET: APIRoute = () => createSitemapResponse();
