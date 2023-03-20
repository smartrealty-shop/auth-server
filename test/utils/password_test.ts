import { assertEquals } from "../../src/deps.ts";
import { comparePasswords } from "../../src/utils/password.ts";

Deno.test("hash check works for correct passwords", async () => {
  const res = await comparePasswords(
    "pipisa",
    "$2a$12$KvIGsw4xYvXgRV5GFgjk5.8aBW8vKnJLR.O8FEvmsCJ/CEjpazPlK",
  );
  assertEquals(res, true);
});

Deno.test("hash check fail for incorrect passwords", async () => {
  const res = await comparePasswords(
    "pipisa",
    "$2a$12$KvIGsw4xYvXgRV5GFgjk5.8aBW8vKnJLR.O8FEvmsCJ/EjpazPlK",
  );
  assertEquals(res, false);
});
