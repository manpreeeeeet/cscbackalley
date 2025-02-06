FROM node:22-alpine AS frontend-builder

WORKDIR /app/frontend

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM alpine:latest
WORKDIR /app
COPY --from=frontend-builder /app/frontend/dist ./frontend