const express = require('express');
const bodyParser = require('body-parser');
// const travelRouter = require('./routes/travels');

const loginRouter = require('./routes/login.js');
const createRouter = require('./routes/create.js');
const getRouter = require('./routes/get.js');
const updateRouter = require('./routes/update.js');
const deleteRouter = require('./routes/delete.js');
const cors = require('cors');
const app = express();

app.get('/', (req, res) => {
  console.log('this is main page');
  res.send('this is main page');
});

// app.use(cors());
// app.use(bodyParser.json());

var rawBodyHandler = function (req, res, buf, encoding) {
  if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
      console.log('Raw body: ' + req.rawBody);
  }
}

app.use(cors());
app.options('*', cors());  // enable pre-flight

app.use(bodyParser.json({ verify: rawBodyHandler }));


// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// router
// app.use('/travels', travelRouter);
app.use('/login', loginRouter);
app.use('/create', createRouter);
app.use('/get', getRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);

// localhost:3000
app.listen(3000, () => {
  console.log('listening 3000');
});
