# ----------------------------------
# Stage 1: Builder
# ----------------------------------
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# 1. Copy dependency files & install (including dev deps)
COPY package*.json tsconfig.json ./
RUN npm ci

# 2. Copy the rest of the source code (controllers, prisma, server.ts, etc.)
COPY . ./

# 3. Compile TypeScript => /dist
RUN npm run build  # e.g., "build": "tsc" in package.json

# ----------------------------------
# Stage 2: Runner
# ----------------------------------
FROM node:18-alpine AS runner

WORKDIR /app

# (Optional) Copy .env if you want it *inside* the container:
# COPY .env .env

# 1. Copy package files & install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# 2. Copy the compiled dist folder from builder
COPY --from=builder /app/dist ./dist

# 3. Copy the prisma schema (if you need migrations at runtime, or if your app references schema files)
COPY --from=builder /app/prisma ./prisma
COPY .env ./

# 4. Generate Prisma Client in this final stage
#    Ensures node_modules here has the correct @prisma/client
RUN npx prisma generate

# (Optional) If you want migrations automatically at startup, do something like:
# CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]

# Expose the port
EXPOSE 3000

# Start the server (assuming your main compiled file is dist/server.js)
CMD ["node", "dist/server.js"]
