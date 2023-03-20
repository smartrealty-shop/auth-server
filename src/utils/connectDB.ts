import config from "../config/default.ts";
import { Pool } from "../deps.ts";

const connString = config.pgSslMode &&
    config.pgSslCert &&
    config.pgSslKey &&
    config.pgSslRootCert
  ? `${config.pgUri}?sslmode=${config.pgSslMode}&sslrootcert=${config.pgSslRootCert}&sslcert=${config.pgSslCert}&sslkey=${config.pgSslKey}`
  : `${config.pgUri}`;

const pool = new Pool(
  connString,
  10,
  true,
);

const client = await pool.connect();

export default client;
