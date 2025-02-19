# Step 1: Build the NestJS app
FROM node:18 AS build
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

# Copy package.json and package-lock.json for caching dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all project files to the container
COPY . .

# Ensure Prisma Client is generated before starting the app
RUN npx prisma generate

# Compile the TypeScript code
RUN npm run build

# Step 2: Run the NestJS app
FROM node:18-slim

# Install OpenSSL in the final stage
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy built files from the build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package-lock.json /app/

# Install production dependencies only
RUN npm install --only=production

# Copy the Prisma generated client (ensure it's in the /app/node_modules/.prisma/client)
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma

# Expose the application port
EXPOSE 3000

# Start the NestJS app
CMD ["node", "dist/main"]