import mongoose from "mongoose";

const todoSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
