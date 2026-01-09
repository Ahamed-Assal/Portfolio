-- PostgreSQL Database Schema for Portfolio Website
-- This file contains the database schema for the messages table

-- Create database (run this manually if needed)
-- CREATE DATABASE portfolio_db;

-- Connect to the database
-- \c portfolio_db;

-- Create messages table to store contact form submissions
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster queries (optional)
CREATE INDEX IF NOT EXISTS idx_messages_email ON messages(email);

-- Create index on created_at for sorting (optional)
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- Example query to view all messages
-- SELECT * FROM messages ORDER BY created_at DESC;

-- Example query to view messages from a specific email
-- SELECT * FROM messages WHERE email = 'example@email.com';

-- Example query to delete old messages (older than 1 year)
-- DELETE FROM messages WHERE created_at < NOW() - INTERVAL '1 year';
