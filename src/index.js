require('dotenv').config();
const express = require('express');

const route = require('./router');


const app = express();


app.use(express.json());
app.use(route);

app.listen(3000, () => console.log('Server started at http://localhost:3000'));
