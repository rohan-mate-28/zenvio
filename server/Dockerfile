# ===========================================
# Stage 1: Build Stage
# We use this stage to install dependencies and
# compile TypeScript into JavaScript
# ===========================================

# Use a lightweight Node.js image
FROM node:20-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first
# This allows Docker to cache npm install if package.json hasn't changed
COPY package*.json ./

# Install all dependencies (both dev and prod)
# Using npm ci for reproducible builds
RUN npm ci

# Copy the rest of the source code into the container
COPY . .

# Compile TypeScript into JavaScript (output goes to ./dist)
RUN npm run build

# ===========================================
# Stage 2: Production Stage
# We use a clean image with only production dependencies
# ===========================================

FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies to keep image light
RUN npm install --omit=dev

# Expose backend port (make sure it matches your app)
EXPOSE 5000

# Use compiled JavaScript to start the server
# NOTE: never point to .ts files in production
CMD ["node", "dist/index.js"]

# ===========================================
# Notes:
# 1. MongoDB: Connect using your MONGO_URI in .env
# 2. Environment variables:
#    - You can pass .env when running the container:
#      docker run --env-file .env -p 5000:5000 <image_name>
# 3. Docker Compose is recommended for linking frontend, backend, and MongoDB
# 4. Make sure tsconfig.json has:
#      "rootDir": "./src"
#      "outDir": "./dist"
# ===========================================
