const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { connect } = require('./db/models');
const mainRouter = require('./routes/mainRoute');
const goodsRouter = require('./routes/goodsRoute');

const app = express();

app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', mainRouter);
app.use('/goods', goodsRouter);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log('Я родился!');
  connect('mongodb://localhost:27017/goodsStore',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('К базе данных я тоже подключился.'); });
});
