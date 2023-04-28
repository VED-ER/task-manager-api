require('dotenv').config();
const express = require('express');
const tasksRouter = require('./routes/tasksRoute');
const connectDB = require('./db/connectDB');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('./public'));

app.use(express.json());
app.use('/api/v1', tasksRouter);

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log('listening on port ', port);
        });
    } catch (error) {
        console.error(error);
    }
};

start();