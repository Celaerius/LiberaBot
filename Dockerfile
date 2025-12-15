# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Start the bot (sans --env-file car on utilise les variables d'environnement de Railway)
CMD ["node", "src/main.ts"]