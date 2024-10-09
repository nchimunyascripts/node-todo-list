const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

todoSchema.plugin(mongoosePaginate);

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
