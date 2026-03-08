import { createFileRoute } from "@tanstack/react-router";
import { readFileSync } from "node:fs";
import path from "node:path";

export const Route = createFileRoute("/r/$name.json")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { "name.json": name } = params;

        // Sanitize: only allow alphanumeric, hyphens, underscores
        if (!/^[a-z0-9-_]+$/i.test(name)) {
          return new Response(
            JSON.stringify({ error: "Invalid component name" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        try {
          const filePath = path.join(
            process.cwd(),
            "public",
            "r",
            `${name}.json`,
          );
          const content = readFileSync(filePath, "utf-8");

          return new Response(content, {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, OPTIONS",
              "Cache-Control":
                "public, max-age=300, stale-while-revalidate=600",
            },
          });
        } catch {
          return new Response(
            JSON.stringify({ error: `Component "${name}" not found` }),
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
