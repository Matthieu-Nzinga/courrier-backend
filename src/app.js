const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
require('dotenv').config();


const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api', routes);


app.get('/', (req, res) => res.json({ ok: true, service: 'courrier-backend' }));


module.exports = app;