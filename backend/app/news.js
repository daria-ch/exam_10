const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const mysqlDb = require('../mysqlDb');
const config = require('../config');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    const news = await mysqlDb.getConnection().query('SELECT `id`, `title`, `image`, `date` FROM `news`');
    res.send(news);
});

router.get('/:id', async (req, res) => {
    const post = await mysqlDb.getConnection().query('SELECT * FROM `news` WHERE `id`= ?', req.params.id);
    let postElement = post[0];
    if (!postElement) {
        return res.status(400).send({message: 'Not found'})
    } else {
        res.send(postElement);
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const post = req.body;
    if (req.file) {
        post.image = req.file.filename;
    }
    
    post.date = new Date();

    const result = await mysqlDb.getConnection().query('INSERT INTO `news` (`title`, `text`, `image`, `date`) VALUES ' +
        '(?, ? ,?, ?)',
        [post.title, post.text, post.image, post.date]);
    res.send({
        title: post.title,
        text: post.text,
        image: post.image,
        date: post.date,
        id: result.insertId
    });
});

router.delete('/:id', async (req, res) => {
    await mysqlDb.getConnection().query('DELETE FROM `news` WHERE `id`= ?', req.params.id);
    res.send({"message": "Post is deleted"});
});

module.exports = router;
