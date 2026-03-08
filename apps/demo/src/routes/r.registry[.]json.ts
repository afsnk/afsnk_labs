import { createFileRoute } from "@tanstack/react-router";
import { readFileSync } from "node:fs";
import path from "node:path";

export const Route = createFileRoute("/r/registry.json")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const filePath = path.join(
            process.cwd(),
            "public",
            "r",
            "registry.json",
          );
          const content = readFileSync(filePath, "utf-8");

          return new Response(content, {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, OPTIONS",
              "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
            },
          });
        } catch {
          return new Response(
            JSON.stringify({ error: "Registry index not found" }),
            {
              status: 404,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      },
      OPTIONS: async () => {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
          },
        });
      },
    },
  },
});
