FROM postgres:14.2-alpine as db
WORKDIR /app
COPY ./scripts/init.sh /docker-entrypoint-initdb.d
COPY ./scripts/seed.sql ./scripts/db/seed.sql

