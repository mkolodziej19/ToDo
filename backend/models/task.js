const Joi = require('joi');

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    status:{
        type: String,
        required: true,
        enum: ['to-do','in progress','done']
    }  ,
    userId: {
        type: String,
        required: true
    },
 
});

const Task = mongoose.model('Task', taskSchema);

function validateTask(task) {
    const schema = {
        content: Joi.string().min(5).max(255).required(),
        status: Joi.string().required(),
        userId: Joi.string().required()
    };

    return Joi.validate(task, schema);
}

exports.Task = Task;
exports.validate = validateTask;
