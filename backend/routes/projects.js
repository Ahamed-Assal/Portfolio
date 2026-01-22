/**
 * API Routes for Projects
 * Handles CRUD operations for projects
 */

const express = require('express');
const router = express.Router();
const db = require('../database');

// GET all projects
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM projects ORDER BY featured DESC, created_at DESC';
        const result = await db.pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// GET featured projects
router.get('/featured', async (req, res) => {
    try {
        const query = 'SELECT * FROM projects WHERE featured = true ORDER BY created_at DESC LIMIT 3';
        const result = await db.pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching featured projects:', error);
        res.status(500).json({ error: 'Failed to fetch featured projects' });
    }
});

// GET single project by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM projects WHERE id = $1';
        const result = await db.pool.query(query, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});

// POST new project (admin functionality)
router.post('/', async (req, res) => {
    try {
        const { title, description, technologies, live_url, github_url, featured } = req.body;
        
        const query = `
            INSERT INTO projects (title, description, technologies, live_url, github_url, featured)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        
        const result = await db.pool.query(query, [title, description, technologies, live_url, github_url, featured]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// PUT update project (admin functionality)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, technologies, live_url, github_url, featured } = req.body;
        
        const query = `
            UPDATE projects 
            SET title = $1, description = $2, technologies = $3, live_url = $4, github_url = $5, featured = $6, updated_at = CURRENT_TIMESTAMP
            WHERE id = $7
            RETURNING *;
        `;
        
        const result = await db.pool.query(query, [title, description, technologies, live_url, github_url, featured, id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// DELETE project (admin functionality)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM projects WHERE id = $1 RETURNING *';
        const result = await db.pool.query(query, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

module.exports = router;
