const TaskModel = require("../models/taskModel");

const createTask = async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new Error('Please provide a task name'));
    }

    const task = await TaskModel.create({ name });

    res.status(201).json({ task });
};

const getAllTasks = async (req, res) => {

    const tasks = await TaskModel.find({});

    res.status(200).json({ tasks });
};

const getSingleTask = async (req, res, next) => {
    const taskId = req.params.id;

    const task = await TaskModel.findById(taskId);

    if (!task) {
        return next(new Error('no task with id: '.concat(taskId)));
    }

    res.status(200).json({ task });
};

const deleteTask = async (req, res, next) => {
    const taskId = req.params.id;

    const task = await TaskModel.findByIdAndDelete(taskId);

    if (!task) {
        return next(new Error('No task with id: '.concat(taskId)));
    }

    res.status(200).json({ task });
};

const updateTask = async (req, res) => {
    const taskId = req.params.id;

    const task = await TaskModel.findByIdAndUpdate(taskId, req.body, {
        runValidators: true,
        new: true
    });

    if (!task) {
        return next(new Error('no task with id: '.concat(taskId)));
    }

    res.status(200).json({ task });
};

module.exports = {
    getAllTasks,
    getSingleTask,
    deleteTask,
    updateTask,
    createTask
};