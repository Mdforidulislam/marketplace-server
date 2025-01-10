# Stage 1: Build Stage
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

# Stage 2: Runtime Stage
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the built files and package.json for production
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

# Install production dependencies
RUN npm install --production

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]

