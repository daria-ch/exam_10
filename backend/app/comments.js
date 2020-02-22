const express = require('express');
const mysqlDb = require('../mysqlDb');

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.query.news_id) {
        const comments = await mysqlDb.getConnection().query('SELECT * FROM `comments`');
        res.send(comments);
    } else {
        const comments = await mysqlDb.getConnection().query('SELECT * FROM `comments` WHERE `post_id`= ?', req.query.news_id);
        if (comments.length === 0) {
            res.send({message: "Post doesnt exist or no comments"})
        }
        if (!comments) {
            return res.status(400).send({message: 'Not found'})
        } else {
            res.send(comments)
        }
    }
});

router.post('/', async (req, res) => {
    const comment = req.body;

    try {
        if (!comment.author) {
            comment.author = 'Anonymous'
        }
        if (!comment.post_id) {
            res.status(400).send({error: "Post does not exist"});
        }

        const result = await mysqlDb.getConnection().query('INSERT INTO `comments` (`post_id`, `author`, `message`) VALUES ' +
            '(?, ?, ?)',
            [comment.post_id, comment.author, comment.message]
        );
        res.send({author: comment.author, message: comment.message, id: result.insertId});
    } catch (error) {
        res.send({'error': error.sqlMessage})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await mysqlDb.getConnection().query('DELETE FROM `comments` WHERE `id`= ?', req.params.id);
        res.send({"message": "comment is deleted"});
    } catch (error) {
        res.send({'error': error.sqlMessage})
    }
});

module.exports = router;