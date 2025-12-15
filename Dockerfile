# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for tsx)
RUN npm ci

# Copy source code
COPY . .

# Start the bot with tsx
CMD ["npx", "tsx", "src/main.ts"]