/**
 * API Routes for Skills
 * Handles CRUD operations for skills
 */

const express = require('express');
const router = express.Router();
const db = require('../database');

// GET all skills
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM skills ORDER BY category, proficiency DESC';
        const result = await db.pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ error: 'Failed to fetch skills' });
    }
});

// GET skills by category
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const query = 'SELECT * FROM skills WHERE category = $1 ORDER BY proficiency DESC';
        const result = await db.pool.query(query, [category]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching skills by category:', error);
        res.status(500).json({ error: 'Failed to fetch skills by category' });
    }
});

// GET single skill by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM skills WHERE id = $1';
        const result = await db.pool.query(query, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching skill:', error);
        res.status(500).json({ error: 'Failed to fetch skill' });
    }
});

// POST new skill (admin functionality)
router.post('/', async (req, res) => {
    try {
        const { name, category, proficiency, icon } = req.body;
        
        const query = `
            INSERT INTO skills (name, category, proficiency, icon)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        
        const result = await db.pool.query(query, [name, category, proficiency, icon]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating skill:', error);
        res.status(500).json({ error: 'Failed to create skill' });
    }
});

// PUT update skill (admin functionality)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, proficiency, icon } = req.body;
        
        const query = `
            UPDATE skills 
            SET name = $1, category = $2, proficiency = $3, icon = $4
            WHERE id = $5
            RETURNING *;
        `;
        
        const result = await db.pool.query(query, [name, category, proficiency, icon, id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating skill:', error);
        res.status(500).json({ error: 'Failed to update skill' });
    }
});

// DELETE skill (admin functionality)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM skills WHERE id = $1 RETURNING *';
        const result = await db.pool.query(query, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        
        res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).json({ error: 'Failed to delete skill' });
    }
});

module.exports = router;
