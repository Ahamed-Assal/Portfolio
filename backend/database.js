/**
 * PostgreSQL Database Connection and Configuration
 * Handles database connection and table creation
 */

const { Pool } = require('pg');
require('dotenv').config();

// Create PostgreSQL connection pool
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'portfolio_db',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

/**
 * Initialize database - create messages table if it doesn't exist
 */
async function init() {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) NOT NULL,
                subject VARCHAR(255),
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        
        await pool.query(createTableQuery);
        console.log('Database table "messages" is ready');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

/**
 * Insert a new message into the database
 * @param {string} name - Sender's name
 * @param {string} email - Sender's email
 * @param {string} subject - Message subject
 * @param {string} message - Message content
 * @returns {Promise<Object>} - Inserted message data
 */
async function insertMessage(name, email, subject, message) {
    try {
        const insertQuery = `
            INSERT INTO messages (name, email, subject, message)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, subject, message, created_at;
        `;
        
        const result = await pool.query(insertQuery, [name, email, subject, message]);
        return result.rows[0];
    } catch (error) {
        console.error('Error inserting message:', error);
        throw error;
    }
}

/**
 * Get all messages from the database
 * @returns {Promise<Array>} - Array of message objects
 */
async function getAllMessages() {
    try {
        const query = 'SELECT * FROM messages ORDER BY created_at DESC';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
}

module.exports = {
    pool,
    init,
    insertMessage,
    getAllMessages
};
