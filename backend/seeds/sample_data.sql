-- Seed sample users
INSERT INTO users (email, password_hash, name) VALUES
('john.doe@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU7AqFbJRx8W', 'John Doe'),
('jane.smith@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU7AqFbJRx8W', 'Jane Smith'),
('bob.wilson@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU7AqFbJRx8W', 'Bob Wilson');

-- Seed sample projects
INSERT INTO projects (user_id, title, description, status) VALUES
(1, 'E-commerce Website', 'Build a modern e-commerce platform with shopping cart and payment integration', 'active'),
(1, 'Mobile App Development', 'Develop a cross-platform mobile application for iOS and Android', 'active'),
(2, 'Marketing Campaign', 'Q1 2026 marketing campaign for product launch', 'active'),
(2, 'Database Migration', 'Migrate legacy database to PostgreSQL', 'completed'),
(3, 'API Documentation', 'Create comprehensive API documentation with examples', 'active');

-- Seed sample tasks
INSERT INTO tasks (project_id, title, description, status, priority, due_date) VALUES
-- E-commerce Website tasks
(1, 'Design homepage mockup', 'Create responsive homepage design in Figma', 'done', 'high', '2026-02-15'),
(1, 'Implement product catalog', 'Build product listing and detail pages', 'in_progress', 'high', '2026-03-01'),
(1, 'Set up payment gateway', 'Integrate Stripe payment processing', 'todo', 'high', '2026-03-15'),
(1, 'Add shopping cart', 'Implement cart functionality with localStorage', 'todo', 'medium', '2026-03-10'),

-- Mobile App tasks
(2, 'Setup React Native project', 'Initialize project with TypeScript', 'done', 'high', '2026-02-10'),
(2, 'Design app screens', 'Create UI/UX designs for main screens', 'in_progress', 'high', '2026-02-28'),
(2, 'Implement authentication', 'Add login and signup functionality', 'todo', 'high', '2026-03-05'),

-- Marketing Campaign tasks
(3, 'Create content calendar', 'Plan social media posts for Q1', 'done', 'medium', '2026-02-05'),
(3, 'Design email templates', 'Create responsive email templates', 'in_progress', 'medium', '2026-02-28'),
(3, 'Launch Facebook ads', 'Setup and launch Facebook advertising campaign', 'todo', 'high', '2026-03-01'),

-- Database Migration tasks
(4, 'Analyze current schema', 'Document existing database structure', 'done', 'high', '2026-01-15'),
(4, 'Create migration scripts', 'Write SQL scripts for data migration', 'done', 'high', '2026-01-25'),
(4, 'Test data integrity', 'Verify all data migrated correctly', 'done', 'high', '2026-02-01'),

-- API Documentation tasks
(5, 'Document authentication endpoints', 'Write docs for auth API', 'done', 'high', '2026-02-20'),
(5, 'Document CRUD endpoints', 'Write docs for resource endpoints', 'in_progress', 'high', '2026-02-27'),
(5, 'Add code examples', 'Include example requests and responses', 'todo', 'medium', '2026-03-05');

-- Note: The password hash above is for 'password123' - DO NOT USE IN PRODUCTION
