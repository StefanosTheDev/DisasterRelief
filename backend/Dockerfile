FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
COPY prisma ./prisma
RUN npx prisma generate --schema=/app/prisma/schema.prisma
EXPOSE 3000
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "src/devServer.ts"]
