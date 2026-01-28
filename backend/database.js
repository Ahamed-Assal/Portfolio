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
    database: process.env.DB_NAME || 'Portfolio_db',
    password: process.env.DB_PASSWORD || 'Assal#2003',
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
 * Initialize database - create tables if they don't exist
 */
async function init() {
    try {
        // Create messages table
        const createMessagesTableQuery = `
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) NOT NULL,
                subject VARCHAR(255),
                message TEXT NOT NULL,
                status VARCHAR(20) DEFAULT 'unread',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        
        // Create projects table
        const createProjectsTableQuery = `
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                technologies TEXT[],
                live_url VARCHAR(500),
                github_url VARCHAR(500),
                featured BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        
        // Create skills table
        const createSkillsTableQuery = `
            CREATE TABLE IF NOT EXISTS skills (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                category VARCHAR(50) NOT NULL,
                proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 5),
                icon VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        
        // Create visitors table for analytics
        const createVisitorsTableQuery = `
            CREATE TABLE IF NOT EXISTS visitors (
                id SERIAL PRIMARY KEY,
                ip_address INET,
                user_agent TEXT,
                page_visited VARCHAR(255),
                visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        
        await pool.query(createMessagesTableQuery);
        await pool.query(createProjectsTableQuery);
        await pool.query(createSkillsTableQuery);
        await pool.query(createVisitorsTableQuery);
        
        console.log('Database tables are ready');
        
        // Insert sample data if tables are empty
        await insertSampleData();
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

/**
 * Insert sample data into tables
 */
async function insertSampleData() {
    try {
        // Check if skills table is empty
        const skillsCount = await pool.query('SELECT COUNT(*) FROM skills');
        
        if (parseInt(skillsCount.rows[0].count) === 0) {
            const sampleSkills = [
                ['HTML5', 'Frontend', 5, 'bi-filetype-html'],
                ['CSS3', 'Frontend', 5, 'bi-filetype-css'],
                ['JavaScript', 'Frontend', 4, 'bi-filetype-js'],
                ['React.js', 'Frontend', 3, 'bi-layers'],
                ['Bootstrap', 'Frontend', 4, 'bi-bootstrap'],
                ['Node.js', 'Backend', 4, 'bi-node-plus'],
                ['Express.js', 'Backend', 4, 'bi-gear'],
                ['Python', 'Backend', 3, 'bi-filetype-py'],
                ['PHP', 'Backend', 3, 'bi-filetype-php'],
                ['C#', 'Backend', 3, 'bi-filetype-cs'],
                ['PostgreSQL', 'Database', 4, 'bi-database-check'],
                ['MySQL', 'Database', 3, 'bi-database-fill-gear'],
                ['SQL', 'Database', 4, 'bi-diagram-3'],
                ['Git', 'Tools', 4, 'bi-git'],
                ['Linux', 'Tools', 3, 'bi-ubuntu']
            ];
            
            for (const skill of sampleSkills) {
                await pool.query(
                    'INSERT INTO skills (name, category, proficiency, icon) VALUES ($1, $2, $3, $4)',
                    skill
                );
            }
            
            console.log('Sample skills data inserted');
        }
        
        // Check if projects table is empty
        const projectsCount = await pool.query('SELECT COUNT(*) FROM projects');
        
        if (parseInt(projectsCount.rows[0].count) === 0) {
            const sampleProjects = [
                [
                    'TechCon Event Schedule',
                    'A comprehensive event scheduling website for technology conferences with real-time updates and interactive features.',
                    '{HTML, CSS, JavaScript, "Responsive Design"}',
                    'https://ahamed-assal.github.io/TechCon-Event-Schedule/',
                    'https://github.com/ahamed-assal/TechCon-Event-Schedule',
                    true
                ],
                [
                    'Personal Portfolio Website',
                    'A responsive full-stack portfolio website built with HTML, CSS, Bootstrap, Node.js, Express.js, and PostgreSQL.',
                    '{HTML, CSS, Bootstrap, "Node.js", PostgreSQL}',
                    null,
                    'https://github.com/ahamed-assal/Portfolio',
                    true
                ],
                [
                    'E-Commerce Platform',
                    'A full-stack e-commerce application with user authentication, product management, and shopping cart functionality.',
                    '{JavaScript, "Node.js", PostgreSQL}',
                    null,
                    null,
                    false
                ],
                [
                    'Ticketing System',
                    'A comprehensive ticketing system built with C# and .NET, featuring user management, ticket creation, assignment, and tracking capabilities.',
                    '{C#, ".NET", "SQL Server", "Entity Framework"}',
                    null,
                    null,
                    false
                ],
                [
                    'Mobile Shop Website',
                    'A modern e-commerce website for mobile devices with product catalog, shopping cart, user authentication, and payment integration.',
                    '{HTML5, CSS3, JavaScript, React, "Node.js"}',
                    null,
                    null,
                    false
                ]
            ];
            
            for (const project of sampleProjects) {
                await pool.query(
                    'INSERT INTO projects (title, description, technologies, live_url, github_url, featured) VALUES ($1, $2, $3, $4, $5, $6)',
                    project
                );
            }
            
            console.log('Sample projects data inserted');
        }
    } catch (error) {
        console.error('Error inserting sample data:', error);
    }
}

module.exports = {
    pool,
    init,
    insertMessage,
    getAllMessages,
    insertSampleData
};
