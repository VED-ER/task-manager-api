const express = require('express');
const { getAllTasks, createTask, getSingleTask, deleteTask, updateTask } = require('../controllers/tasksController');

const tasksRouter = express.Router();

tasksRouter.route('/tasks').get(getAllTasks).post(createTask);
tasksRouter.route('/tasks/:id').get(getSingleTask).delete(deleteTask).patch(updateTask);

module.exports = tasksRouter;