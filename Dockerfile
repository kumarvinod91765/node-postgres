# Use the official Node.js LTS image as base
FROM node:20-slim

# Install OpenSSL (required for Prisma Client to run in slim images)
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Set working directory inside the container
WORKDIR /app

# Copy package files and prisma directory first for dependency installation and client generation
COPY package*.json ./
COPY prisma ./prisma/

# Install application dependencies
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Copy the rest of the application source code
COPY . .

# Expose port 5000 (standard port for the application)
EXPOSE 5000

# Set environment variable to production by default
ENV NODE_ENV=production

# Startup command: run migrations and start the server
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
