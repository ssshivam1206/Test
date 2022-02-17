const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const categoryRouter = require('./routes/categoryRoutes');
const subCategoryRouter = require('./routes/subCategoryRoutes');
const productsRouter = require('./routes/productsRoutes');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/subCategories', subCategoryRouter);
app.use('/api/v1/products', productsRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`can't find ${req.originalUrl} on this server`);
  // err.status = 'Fail';
  // err.statusCode = 404;

  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
