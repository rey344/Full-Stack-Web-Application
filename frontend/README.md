# Frontend - Full-Stack Application

React/TypeScript frontend with RESTful API integration.

## Features

- React 18 with TypeScript
- Component-based architecture
- RESTful API integration with Axios
- Type-safe data models
- Responsive design
- User, Project, and Task management

## Setup

### Prerequisites

- Node.js 20+

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update REACT_APP_API_URL in .env if needed

# Start development server
npm start
```

The application will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/         # Reusable components
│   │   ├── users/          # User components
│   │   ├── projects/       # Project components
│   │   ├── tasks/          # Task components
│   │   └── styles/         # Component styles
│   ├── services/
│   │   └── api.ts          # API client
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
└── package.json
```

## Features Overview

### User Management
- View all users with pagination
- Delete users

### Project Management
- View all projects
- Filter by status (active, completed, archived)
- Delete projects

### Task Management
- View all tasks
- Filter by status and priority
- Update task status
- Delete tasks

## Environment Variables

```
REACT_APP_API_URL=http://localhost:5000/api
```
