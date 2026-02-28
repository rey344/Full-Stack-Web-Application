# Quick Start Guide

## Prerequisites

- Docker Desktop 4.x or later
- Node.js 20+ (for local development)
- Git 2.x

## Option 1: Docker (Recommended)

### Production Mode

```bash
# Clone or navigate to the project
cd "Full-Stack Web Application"

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# PostgreSQL: localhost:5432
```

### Development Mode (with hot reload)

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# All services will auto-reload on code changes
```

### Stop Services

```bash
# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes (WARNING: deletes database)
docker-compose down -v
```

## Option 2: Local Development (Without Docker)

### 1. Setup PostgreSQL

```bash
# Install PostgreSQL (macOS with Homebrew)
brew install postgresql@16
brew services start postgresql@16

# Create database
psql -U postgres
CREATE DATABASE fullstack_app;
\q
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env and update database credentials
# DB_HOST=localhost
# DB_PASSWORD=your_password

# Run migrations
npm run migrate

# Seed database with sample data
npm run seed

# Start development server
npm run dev

# Backend will run on http://localhost:5000
```

### 3. Setup Frontend

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm start

# Frontend will open at http://localhost:3000
```

## Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fullstack_app
DB_USER=postgres
DB_PASSWORD=your_password
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/fullstack_app
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Testing the Application

### Health Check

```bash
# Check backend health
curl http://localhost:5000/health
```

### API Examples

```bash
# Get all users
curl http://localhost:5000/api/users

# Get all projects
curl http://localhost:5000/api/projects

# Get all tasks
curl http://localhost:5000/api/tasks

# Create a new user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

## Common Issues

### Port Already in Use

```bash
# Find and kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Docker Issues

```bash
# Clean up Docker
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

### Database Connection Issues

- Ensure PostgreSQL is running
- Check database credentials in .env
- Verify database exists: `psql -U postgres -l`

## Production Deployment

### Build for Production

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
# Serve the build folder with a static server
```

### Docker Production

```bash
# Use production docker-compose
docker-compose up -d

# View logs
docker-compose logs -f

# Scale services (if needed)
docker-compose up -d --scale backend=3
```

## Project Structure

```
Full-Stack Web Application/
├── backend/                 # Express/TypeScript API
│   ├── src/
│   ├── migrations/          # Database migrations
│   ├── seeds/              # Sample data
│   └── Dockerfile
├── frontend/               # React/TypeScript UI
│   ├── src/
│   ├── public/
│   └── Dockerfile
├── docker-compose.yml      # Production configuration
├── docker-compose.dev.yml  # Development configuration
└── README.md              # Main documentation
```

## Next Steps

1. ✅ Review the main README.md for detailed architecture documentation
2. ✅ Explore the API endpoints in the browser or Postman
3. ✅ Customize the application for your needs
4. ✅ Add authentication (JWT implementation ready)
5. ✅ Deploy to cloud (AWS, Azure, GCP)

## Support

- Backend documentation: `backend/README.md`
- Frontend documentation: `frontend/README.md`
- Full architecture: Main `README.md`
