/**
 * Contact Form API Routes
 * Handles POST requests for contact form submissions
 */

const express = require('express');
const router = express.Router();
const db = require('../database');

/**
 * POST /api/contact
 * Submit a new contact form message
 * Body: { name, email, subject, message }
 */
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'Name, email, and message are required fields'
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Please provide a valid email address'
            });
        }

        // Insert message into database
        const newMessage = await db.insertMessage(
            name.trim(),
            email.trim(),
            subject ? subject.trim() : null,
            message.trim()
        );

        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully!',
            data: {
                id: newMessage.id,
                name: newMessage.name,
                email: newMessage.email
            }
        });
    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send message. Please try again later.'
        });
    }
});

/**
 * GET /api/contact
 * Get all messages (for admin purposes - in production, add authentication)
 */
router.get('/', async (req, res) => {
    try {
        const messages = await db.getAllMessages();
        res.json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch messages'
        });
    }
});

module.exports = router;
