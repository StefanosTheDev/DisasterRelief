# Use official Node.js image (Alpine for lightweight build)
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (improves build caching)
COPY package.json package-lock.json ./

# Install dependencies (use production flag in non-development environments)
RUN npm install --only=production

# Copy the entire project
COPY . .

# Copy Prisma schema from `src/prisma` (since it's not in the root)
COPY src/prisma ./prisma

# Ensure Prisma schema is copied and client is generated
RUN npx prisma generate --schema=/app/prisma/schema.prisma

# Expose application port
EXPOSE 3000

# Set the default command to run the application
CMD ["npx", "ts-node-dev", "--inspect=9229", "--respawn", "--transpile-only", "src/server.ts"]
