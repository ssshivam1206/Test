const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

process.on('uncaughtException', (err) => {
  //console.log(err);
  console.log('Unhandle Rejection..... Shutting Down!!');
  console.log(err.name, err.messgae);
  process.exit(1);
});

const port = process.env.PORT || 4000;

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Database Connected Successfully !!');
  });

app.listen(port, () => console.log('app is running in 4000 '));
