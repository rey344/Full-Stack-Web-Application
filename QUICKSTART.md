# Quick Start Guide

## Prerequisites

- Docker Desktop 4.x or later installed and running
- 8GB RAM available for Docker
- Git 2.x

## 🚀 Run the Application (3 Simple Steps)

### Step 1: Navigate to Project Directory
```bash
cd "/Users/reysanchez/Full-Stack Web Application"
```

### Step 2: Start All Services
```bash
docker-compose up --build
```

This will:
- ✓ Build frontend, backend, and database containers
- ✓ Install all dependencies
- ✓ Run database migrations
- ✓ Seed sample data
- ✓ Start all services

### Step 3: Access the Application

**Frontend:** http://localhost:3000  
**Backend API:** http://localhost:5000  
**PostgreSQL:** localhost:5432

Wait for: `✓ Backend server running on port 5000` and `✓ Frontend compiled successfully`

---

## 🛑 Stop the Application

Press `Ctrl+C` in the terminal, then run:
```bash
docker-compose down
```

To remove all data (fresh start):
```bash
docker-compose down -v
```

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Find and kill process using ports
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:5000 | xargs kill -9  # Backend
lsof -ti:5432 | xargs kill -9  # Database
```

### Docker Issues
```bash
# Clean Docker and restart
docker-compose down -v
docker system prune -a
docker-compose up --build
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database
```

---

## 🧪 Test the API

```bash
# Create a user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Get all users
curl http://localhost:5000/api/users

# Get all projects
curl http://localhost:5000/api/projects

# Get all tasks
curl http://localhost:5000/api/tasks
```

---

## 💾 Database Access

```bash
# Connect to PostgreSQL
docker-compose exec database psql -U postgres -d fullstack_app

# Run queries
\dt              # List tables
\d users         # Describe users table
SELECT * FROM users;
\q               # Quit
```

---

## 🚀 Development Mode (Hot Reload)

```bash
# Start with auto-reload on code changes
docker-compose -f docker-compose.dev.yml up --build
```

---

## 📋 Alternative: Local Development (Without Docker)

### 1. Setup PostgreSQL
```bash
# Install PostgreSQL (macOS)
brew install postgresql@16
brew services start postgresql@16

# Create database
psql -U postgres -c "CREATE DATABASE fullstack_app;"
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
npm run seed
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

---

## 📚 Next Steps

1. Explore API endpoints in `backend/src/routes/`
2. Check React components in `frontend/src/components/`
3. Review database schema in `backend/migrations/`
4. Read the full `README.md` for architecture details

---

## 🎯 Quick Commands Reference

```bash
# Start application
docker-compose up --build

# Stop application
docker-compose down

# View logs
docker-compose logs -f

# Rebuild from scratch
docker-compose down -v && docker-compose up --build

# Run tests
docker-compose exec backend npm test
docker-compose exec frontend npm test

# Access database
docker-compose exec database psql -U postgres -d fullstack_app
```

---

**Need Help?** Check the full README.md for detailed documentation and troubleshooting.
