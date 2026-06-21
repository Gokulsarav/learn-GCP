# Build Stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files and build the app
COPY . .
RUN npm run build

# Production Stage
FROM node:22-alpine

WORKDIR /app

# Install 'serve' package globally to serve the static files
RUN npm install -g serve

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Expose the port serve runs on (default 3000)
EXPOSE 3000

# Use 'serve' with -s flag for SPA routing support
CMD ["serve", "-s", "dist", "-l", "3000"]
