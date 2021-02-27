require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ErrorHandler = require('./src/utils/ErrorHandler');
const routes = require('./src/routes');
const { PORT, APP_NAME } = require('./src/config');

const app = express();

app.use(express.json());
app.use(cors());
app.use(`/api/${APP_NAME}`, routes);
app.use(ErrorHandler);

app.listen(PORT);
