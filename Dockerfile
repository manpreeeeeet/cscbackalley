FROM node:22 AS frontend-builder

WORKDIR /app/frontend

COPY client/package*.json ./
RUN npm install

COPY client/ ./
RUN npm run build

FROM alpine:latest

COPY --from=frontend-builder /app/frontend/dist ./frontend