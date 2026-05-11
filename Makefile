.PHONY: help install install-api install-spa dev dev-api dev-spa start-api start-spa build build-api build-spa docker-build docker-up docker-down docker-logs db-backup db-restore db-migrate db-reset db-seed db-studio prisma-generate prisma-status clean test

# Default target - show help
help:
	@echo "Lomaz Games - Available Commands"
	@echo "================================="
	@echo ""
	@echo "📦 Installation:"
	@echo "  make install          - Install all dependencies (API + SPA)"
	@echo "  make install-api      - Install API dependencies"
	@echo "  make install-spa      - Install SPA dependencies"
	@echo ""
	@echo "🚀 Development:"
	@echo "  make dev              - Start both API and SPA in development mode"
	@echo "  make dev-api          - Start API in development mode"
	@echo "  make dev-spa          - Start SPA in development mode"
	@echo "  make start-api        - Start API in production mode"
	@echo "  make start-spa        - Start SPA"
	@echo ""
	@echo "🗄️  Database:"
	@echo "  make db-backup        - Backup all database data to SQL file"
	@echo "  make db-restore       - Restore database from backup-latest.sql"
	@echo "  make db-migrate       - Run Prisma migrations"
	@echo "  make db-reset         - Reset database and run migrations"
	@echo "  make db-seed          - Seed database with initial data"
	@echo "  make db-studio        - Open Prisma Studio"
	@echo ""
	@echo "🔧 Prisma:"
	@echo "  make prisma-generate  - Generate Prisma Client"
	@echo "  make prisma-status    - Check migration status"
	@echo ""
	@echo "🏗️  Build:"
	@echo "  make build            - Build both API and SPA"
	@echo "  make build-api        - Build API"
	@echo "  make build-spa        - Build SPA"
	@echo ""
	@echo "🐳 Docker:"
	@echo "  make docker-build     - Build Docker image"
	@echo "  make docker-up        - Start Docker containers"
	@echo "  make docker-down      - Stop Docker containers"
	@echo "  make docker-logs      - Show Docker logs"
	@echo ""
	@echo "🧪 Testing:"
	@echo "  make test             - Run all tests"
	@echo "  make test-api         - Run API tests"
	@echo "  make test-spa         - Run SPA tests"
	@echo ""
	@echo "🧹 Cleanup:"
	@echo "  make clean            - Remove node_modules and build artifacts"
	@echo ""

# Installation
install: install-api install-spa
	@echo "✅ All dependencies installed"

install-api:
	@echo "📦 Installing API dependencies..."
	cd lg-api && npm install

install-spa:
	@echo "📦 Installing SPA dependencies..."
	cd lg-spa && npm install

# Development
dev:
	@echo "🚀 Starting development servers..."
	@echo "   API will be on http://localhost:3000"
	@echo "   SPA will be on http://localhost:3210"
	@echo ""
	@echo "⚠️  Note: Run 'make dev-api' and 'make dev-spa' in separate terminals"

dev-api:
	@echo "🚀 Starting API in development mode..."
	cd lg-api && npm run start:dev

dev-spa:
	@echo "🚀 Starting SPA in development mode..."
	cd lg-spa && npm start

start-api:
	@echo "🚀 Starting API in production mode..."
	cd lg-api && npm start

start-spa:
	@echo "🚀 Starting SPA..."
	cd lg-spa && npm start

# Database Operations
db-backup:
	@echo "💾 Backing up database..."
	cd lg-api && node prisma/backup-database.js
	@echo "✅ Backup complete! Files saved in lg-api/prisma/"

db-restore:
	@echo "⚠️  This will restore from backup-latest.sql"
	@echo "   Make sure your schema is up to date first!"
	cd lg-api && node prisma/seed.js
	@echo "✅ Database restored!"

db-migrate:
	@echo "🔄 Running database migrations..."
	cd lg-api && npx prisma migrate dev

db-reset:
	@echo "⚠️  This will reset the database!"
	cd lg-api && npx prisma migrate reset

db-seed:
	@echo "🌱 Seeding database..."
	cd lg-api && npx prisma db seed

db-studio:
	@echo "🎨 Opening Prisma Studio..."
	cd lg-api && npx prisma studio

# Prisma Commands
prisma-generate:
	@echo "🔧 Generating Prisma Client..."
	cd lg-api && npx prisma generate

prisma-status:
	@echo "📊 Checking migration status..."
	cd lg-api && npx prisma migrate status

# Build
build: build-api build-spa
	@echo "✅ Build complete!"

build-api:
	@echo "🏗️  Building API..."
	cd lg-api && npm run build

build-spa:
	@echo "🏗️  Building SPA..."
	cd lg-spa && npm run build

# Docker
docker-build:
	@echo "🐳 Building Docker image..."
	docker-compose build

docker-up:
	@echo "🐳 Starting Docker containers..."
	docker-compose up -d

docker-down:
	@echo "🐳 Stopping Docker containers..."
	docker-compose down

docker-logs:
	@echo "📜 Showing Docker logs..."
	docker-compose logs -f

# Testing
test: test-api test-spa

test-api:
	@echo "🧪 Running API tests..."
	cd lg-api && npm test

test-spa:
	@echo "🧪 Running SPA tests..."
	cd lg-spa && npm test

# Cleanup
clean:
	@echo "🧹 Cleaning up..."
	rm -rf lg-api/node_modules
	rm -rf lg-api/dist
	rm -rf lg-spa/node_modules
	rm -rf lg-spa/build
	@echo "✅ Cleanup complete!"
