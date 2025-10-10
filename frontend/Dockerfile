###############################################
# 🏗️ STAGE 1: Builder
# This stage installs dependencies and builds the Next.js app.
# It won't be included in the final image, keeping it lightweight.
###############################################

# Use a lightweight Node.js base image (Alpine = small, secure)
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json (better build caching)
COPY package*.json ./

# Install dependencies (npm ci = clean install using lock file)
RUN npm install -g npm@latest

RUN npm ci
# Copy all remaining frontend files (components, pages, etc.)
COPY . .

# Build the Next.js app for production (outputs to .next folder)
RUN npm run build




###############################################
# 🚀 STAGE 2: Runner
# This stage runs the built app in production mode.
# We only copy the minimal files needed to run the app.
###############################################

# Again, use a small Node.js image
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy only necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

ENV NODE_ENV=production
# Expose port 3000 (Next.js default port)
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "start"]
