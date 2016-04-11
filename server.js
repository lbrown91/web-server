var express = require('express');
var app = express();		// create express app by calling express function
var PORT = 3000;		// uppercase var name says that var name will not change
var date = new Date().toString();

var middleware = {
	requireAuthentication: function (req, res, next) {
		console.log('private route hit!');
		next();
	},
	logger: function (req, res, next) {
		console.log('Request (' + date +  '): ' + req.method + ' ' + req.originalUrl);
		next();
	}
};

// app.use(middleware.requireAuthentication);		// important to specify middleware sooner
app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function (req, res) {  	// create about page at localhost:3000/about
	res.send('About Us!');
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
	console.log('Express server started on port ' + PORT + '!');
});