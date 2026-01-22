/**
 * API Routes for Analytics
 * Handles visitor tracking and analytics
 */

const express = require('express');
const router = express.Router();
const db = require('../database');

// POST track visitor
router.post('/track', async (req, res) => {
    try {
        const { ip_address, user_agent, page_visited } = req.body;
        
        const query = `
            INSERT INTO visitors (ip_address, user_agent, page_visited)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        
        const result = await db.pool.query(query, [ip_address, user_agent, page_visited]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error tracking visitor:', error);
        res.status(500).json({ error: 'Failed to track visitor' });
    }
});

// GET visitor statistics
router.get('/stats', async (req, res) => {
    try {
        // Total visitors
        const totalVisitorsQuery = 'SELECT COUNT(*) as total FROM visitors';
        const totalResult = await db.pool.query(totalVisitorsQuery);
        
        // Visitors today
        const todayVisitorsQuery = 'SELECT COUNT(*) as today FROM visitors WHERE DATE(visit_time) = CURRENT_DATE';
        const todayResult = await db.pool.query(todayVisitorsQuery);
        
        // Most visited pages
        const pagesQuery = `
            SELECT page_visited, COUNT(*) as visits 
            FROM visitors 
            WHERE page_visited IS NOT NULL 
            GROUP BY page_visited 
            ORDER BY visits DESC 
            LIMIT 10
        `;
        const pagesResult = await db.pool.query(pagesQuery);
        
        // Visitors by date (last 7 days)
        const dailyVisitorsQuery = `
            SELECT DATE(visit_time) as date, COUNT(*) as visitors
            FROM visitors 
            WHERE visit_time >= CURRENT_DATE - INTERVAL '7 days'
            GROUP BY DATE(visit_time)
            ORDER BY date DESC
        `;
        const dailyResult = await db.pool.query(dailyVisitorsQuery);
        
        res.json({
            totalVisitors: parseInt(totalResult.rows[0].total),
            todayVisitors: parseInt(todayResult.rows[0].today),
            topPages: pagesResult.rows,
            dailyVisitors: dailyResult.rows
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
});

// GET all visitors (admin functionality)
router.get('/visitors', async (req, res) => {
    try {
        const query = 'SELECT * FROM visitors ORDER BY visit_time DESC LIMIT 100';
        const result = await db.pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching visitors:', error);
        res.status(500).json({ error: 'Failed to fetch visitors' });
    }
});

module.exports = router;
