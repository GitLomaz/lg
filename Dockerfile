# ============================================
# Stage 1: Build NestJS API
# ============================================
FROM node:18 AS api-build
WORKDIR /app/api

RUN apt-get update -y && apt-get install -y openssl

# Copy API package files and install dependencies
COPY lg-api/package.json lg-api/package-lock.json ./
RUN npm install

# Copy API source files
COPY lg-api/ ./

# Generate Prisma Client and build
RUN npx prisma generate
RUN npm run build

# ============================================
# Stage 2: Build React SPA
# ============================================
FROM node:18 AS spa-build
WORKDIR /app/spa

# Copy SPA package files and install dependencies
COPY lg-spa/package.json lg-spa/package-lock.json ./
RUN npm install

# Copy SPA source files and build
COPY lg-spa/ ./
RUN npm run build

# ============================================
# Stage 3: Production - nginx + NestJS
# ============================================
FROM node:18-slim

# Install nginx and openssl
RUN apt-get update -y && \
    apt-get install -y nginx openssl && \
    rm -rf /var/lib/apt/lists/*

# Set up API
WORKDIR /app/api
COPY --from=api-build /app/api/dist ./dist
COPY --from=api-build /app/api/package.json /app/api/package-lock.json ./
COPY --from=api-build /app/api/node_modules ./node_modules

# Set up SPA static files
COPY --from=spa-build /app/spa/build /usr/share/nginx/html

# Configure nginx
RUN rm /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/sites-enabled/app.conf

# Copy and configure startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose port 80 for nginx
EXPOSE 80

CMD ["/app/start.sh"]
