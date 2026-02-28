# Backend - Full-Stack Application

TypeScript/Express backend with PostgreSQL database.

## Features

- RESTful API with Express.js
- TypeScript for type safety
- PostgreSQL database with connection pooling
- Parameterized queries (SQL injection prevention)
- Input validation with express-validator
- Security headers with Helmet
- CORS configuration
- Rate limiting
- Error handling middleware
- Logging utility

## Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 14+

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your database credentials

# Run migrations
npm run migrate

# Seed database (optional)
npm run seed

# Start development server
npm run dev
```

### Database Setup

```bash
# Create database
psql -U postgres
CREATE DATABASE fullstack_app;
\q

# Run migrations
npm run migrate
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## API Endpoints

### Users

- `POST /api/users` - Create user
- `GET /api/users` - Get all users (paginated)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Projects

- `POST /api/projects` - Create project
- `GET /api/projects` - Get all projects (filtered & paginated)
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks

- `POST /api/tasks` - Create task
- `GET /api/tasks` - Get all tasks (filtered & paginated)
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   └── server.ts        # Application entry point
├── migrations/          # Database migrations
├── seeds/              # Database seed data
├── scripts/            # Utility scripts
└── tests/              # Test files
```

## Environment Variables

```
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fullstack_app
DB_USER=postgres
DB_PASSWORD=your_password
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=http://localhost:3000
```
