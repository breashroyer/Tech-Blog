const express = require('express');
const { Comment } = require('../models');
const router = express.Router();

// POST a new comment
router.post('/', async (req, res) => {
    if (!req.session.loggedIn) {
        return res.redirect('/login');
    }

    try {
        await Comment.create({
            ...req.body,
            userId: req.session.userId, // Assuming user session tracking
        });
        res.redirect('/posts');
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).send(err.toString());
    }
});

module.exports = router;

