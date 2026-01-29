# Single stage Dockerfile for debugging
FROM node:18-alpine

WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# List dist directory for debugging
RUN ls -la dist/ || echo "dist directory not found"

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "dist/main.js"]
