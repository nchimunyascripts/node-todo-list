const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/todos', auth, getTodos);
router.post('/todos', auth, createTodo);
router.put('/todos/:id', auth, updateTodo);
router.delete('/todos/:id', auth, deleteTodo);

module.exports = router;
