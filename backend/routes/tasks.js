//const jwt = require('jsonwebtoken');
const config = require('config');
//const bcrypt = require('bcrypt');
const _ = require('lodash');
//const {User, validate} = require('../models/user');
const {Task, validate} = require('../models/task');
//const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    task = new Task(_.pick(req.body, ['content', 'status', 'userId']));
    await task.save();
    
    res.send(_.pick(task, ['content', 'status', 'userId']));
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let task = await Task.findOne({ _id: req.params.id});
    if (!task) return res.status(400).send("Task doesn't exist.");

    task.status = req.body.status;
    await task.save();
    
    res.send(_.pick(task, ['content', 'status', 'userId']));
});

router.get('/:id', async (req, res) => {
    const tasks = await Task.find({userId: req.params.id})
    res.send(tasks);
});

router.delete('/:id', async (req, res) => {
    const { error } = validate(req.body);
    let task = await Task.findOne({ _id: req.params.id});
    await task.remove();  
    res.send(_.pick(task, ['content', 'status', 'userId']));
});

module.exports = router;