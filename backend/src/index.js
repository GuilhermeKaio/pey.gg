const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const db = require('./database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(3333);