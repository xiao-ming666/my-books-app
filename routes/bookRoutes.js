const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // 假设你把 Schema 移动到了 models 文件夹

router.get('/', async (req, res) => {
    try {
        const { title } = req.query;
        let query = {}
        if (title) {
            query.title = { $regex: title, $options: 'i' }; // 模糊搜索，忽略大小写
        }
        console.log('查询条件:', query);
        const books = await Book.find(query);
        console.log("books", books)
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. 修改 POST 路由：真正存入数据库
router.post('/', async (req, res) => {
    try {
        const newBook = new Book({
            title: req.body.title
        });
        const savedBook = await newBook.save(); // 保存到数据库
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 5.删除一本书
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; //获取URL中的:id
        const deletedBook = await Book.findByIdAndDelete(id)
        if (!deletedBook) {
            return res.status(404).json({ message: '找不到这本书' })
        }
        res.json({ message: '删除成功', data: deletedBook })
    } catch (err) {
        res.status(500).json({ message: '服务器错误' })
    }
})

// 6.实现更新(Update)
router.patch('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title: req.body.title },
            { new: true }
        )
        res.json(updatedBook)
    } catch (err) {
        res.status(400).json({ message: '更新失败' })
    }
})

router

module.exports = router;