const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const todos = await Todo.paginate({ user: req.user.id }, { page, limit });
        res.json(todos);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const createTodo = async (req, res) => {
    const { title } = req.body;
    try {
        const todo = new Todo({ title, user: req.user.id });
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    try {
        const todo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
