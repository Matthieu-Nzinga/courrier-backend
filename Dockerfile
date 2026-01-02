FROM node:lts-alpine

# Set production environment
ENV NODE_ENV=production

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install prod dependencies + prisma CLI
RUN npm ci --omit=dev=false

# Copy application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# API listens internally on 4000
EXPOSE 4000

# Run migrations once, then start server
CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]
