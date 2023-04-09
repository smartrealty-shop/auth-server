import { dotenvConfig } from "../deps.ts";
dotenvConfig({ export: true, path: ".env" });

const config: {
  port: number;
  jwtSecret: string;
  jwtExpiresIn: number;
  pgUri: string;
  pgSslMode: string;
  pgSslCert: string;
  pgSslKey: string;
  pgSslRootCert: string;
} = {
  port: parseInt(Deno.env.get("PORT") as unknown as string),
  jwtSecret: Deno.env.get("JWT_SECRET") as unknown as string,
  jwtExpiresIn: 259200, // 180d in minutes
  pgUri: Deno.env.get("PGURI") as unknown as string,
  pgSslMode: Deno.env.get("PGSSLMODE") as unknown as string,
  pgSslCert: Deno.env.get("PGSSLCERT") as unknown as string,
  pgSslKey: Deno.env.get("PGSSLKEY") as unknown as string,
  pgSslRootCert: Deno.env.get("PGSSLROOTCERT") as unknown as string,
};

export default config;
