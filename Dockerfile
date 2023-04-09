FROM denoland/deno:1.32.3

WORKDIR /app

COPY . .

RUN deno cache -r --lock deno.lock src/deps.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-write", "--unstable", "src/server.ts"]

ENV PORT=1993

EXPOSE 1993
