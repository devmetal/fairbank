'use strict';

require('dotenv').load();

let express = require('express');
let path = require('path');
let app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res,next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT);
console.log('Application is started on ' + process.env.PORT);
