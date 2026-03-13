# ============================================
# Stage 1: Build NestJS API
# ============================================
FROM node:18 AS api-build
WORKDIR /app/api

RUN apt-get update -y && apt-get install -y openssl

# Copy package files
COPY lg-api/package.json lg-api/package-lock.json ./

# Copy prisma schema before install so postinstall works
COPY lg-api/prisma ./prisma

# Install dependencies
RUN npm install

# Copy rest of API source
COPY lg-api/ ./

# Build API
RUN npx prisma generate
RUN npm run build

# ============================================
# Stage 2: Build React SPA
# ============================================
FROM node:18 AS spa-build
WORKDIR /app/spa

COPY lg-spa/package.json lg-spa/package-lock.json ./
RUN npm install

COPY lg-spa/ ./
RUN npm run build

# ============================================
# Stage 3: Production - nginx + NestJS
# ============================================
FROM node:18-slim

RUN apt-get update -y && \
    apt-get install -y nginx openssl && \
    rm -rf /var/lib/apt/lists/*

# Set up API
WORKDIR /app/api
COPY --from=api-build /app/api/dist ./dist
COPY --from=api-build /app/api/package.json /app/api/package-lock.json ./
COPY --from=api-build /app/api/node_modules ./node_modules
COPY --from=api-build /app/api/prisma ./prisma

# Set up SPA static files
COPY --from=spa-build /app/spa/build /usr/share/nginx/html

# Configure nginx
RUN rm /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/sites-enabled/app.conf

# Copy and configure startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 8080

CMD ["/app/start.sh"]