import Todo from '../models/todo.model.js';

const createTodo = async (req, res) => {

    const userId = req.user;
    const { title, description } = req.body;

    try {
        const todo = await Todo.create({ title, description, userId });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
};

const showAllTodos = async (req, res) => {
    
    const userId = req.user;

    try {
        const todos = await Todo.find({ userId });
        res.json(todos);
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }

};

const updateTodo = async (req, res) => {
    
    const { id } = req.params;
    const { title, description, status } = req.body; 
    const userId = req.user;

    try {
        const todo = await Todo.findOneAndUpdate({ _id: id, userId }, { title, description, status }, { new: true });
        if(!todo) {
            return res.status(404).json({ error: 'Todo does not exist!' });
        }
        res.status(200).json(todo);
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }

};

const deleteTodo = async (req, res) => {

    const { id } = req.params;
    const userId = req.user;

    try {
        const todo = await Todo.findOneAndDelete({ _id: id, userId });
        if(!todo) {
            return res.status(400).json({ error: 'Todo does not exist!' });
        }
        res.json({ message: 'Todo is deleted successfully!' });
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }

};

export { createTodo, showAllTodos, updateTodo, deleteTodo };
