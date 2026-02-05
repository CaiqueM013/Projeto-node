# ---------- STAGE 1: BUILDER ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build || echo "No build step"

# ---------- STAGE 2: RUNTIME ----------
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000
CMD ["node", "app.js"]
