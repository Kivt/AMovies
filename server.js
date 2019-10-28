const compression = require('compression');
const express = require('express');
const path = require('path');

const app = express();

// Gzip
app.use(compression());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/movies'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/movies/index.html'));
});

// Start the app by listening on the default port
const listener = app.listen(process.env.PORT || 8080, () => {
  console.log('Listening on port ' + listener.address().port);
});
