const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const { Comment } = require('../models');

// Route to display all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: Comment }],
        });
        const posts = postData.map(post => post.get({ plain: true }));

        res.render('posts', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to display form for creating a new post
router.get('/create', (req, res) => {
    res.render('createPost');
});

// Route to handle creation of a new post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.userId, // Assuming the user's ID is stored in the session
        });

        res.redirect('/posts');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
