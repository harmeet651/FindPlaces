var express = require('express'); //Express is the backend part of the MEAN stack, together with MongoDB database and AngularJS frontend framework. This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
var bodyParser = require('body-parser'); //body-parser extract the entire body portion of an incoming request stream and exposes it on req.body . This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request.
var path = require('path');
var request = require('request');
//init app
var app = express();

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set static path
app.use(express.static(path.join(__dirname, 'public')))

//home route
app.get('/', function (req, res) {
	res.render('public');
});

app.get("/allData", function (req, res) {
	console.log(req.url);
	console.log(req.query);
	var temp = req.query;
	var data = temp.newData;

	urlNp = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + req.query.lat + "," + req.query.lon + "&radius=" + req.query.distance + "&type=" + req.query.catu + "&keyword=" + req.query.key + "&key="+process.env.ENV_VARIABLE;
	var urlNew = urlNp.replace(/ /g, '+');
	console.log(urlNp);
	var urlNew = encodeURI(urlNp);
	request.get({
		url: urlNew,
		json: true,
		headers: { 'User-Agent': 'request' }
	}, (err, response, data) => {
		if (err) {
			console.log('Error:', err);
		}
		else if (res.statusCode !== 200) {
			console.log('Status:', response.statusCode);
		} else {

			console.log(data);
			res.setHeader('content-type', 'application/json');
			res.json(data);
		}
	});

});


app.get("/locWala", function (req, res) {
	var temp = req.query;
	var data = temp.newLOC;
	urlLoc = "https://maps.googleapis.com/maps/api/geocode/json?address=" + req.query.location + "&key="+process.env.ENV_VARIABLE;
	console.log(urlLoc);
	request.get(urlLoc, (error, response, body) => {
		let json = JSON.parse(body);
		console.log(json);
		var urlNpLo = encodeURI(urlLoc);
		console.log(urlNpLo);
		var b = json.results[0].geometry.location.lat;
		var c = json.results[0].geometry.location.lng;
		urlNpLo = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + json.results[0].geometry.location.lat + "," + json.results[0].geometry.location.lng + "&radius=" + req.query.distance + "&type=" + req.query.catu + "&keyword=" + req.query.key + "&key="+process.env.ENV_VARIABLE;
		console.log(urlNpLo);
		var urlNew2 = encodeURI(urlNpLo);
		//console.log(urlNew2);
		request.get({
			url: urlNew2,
			json: true,
			headers: { 'User-Agent': 'request' }
		}, (err, response, data) => {
			if (err) {
				console.log('Error:', err);
			}
			else if (res.statusCode !== 200) {
				console.log('Status:', response.statusCode);
			} else {

				console.log(data);
				res.setHeader('content-type', 'application/json');
				res.json(data);
			}
		});
	})
});

app.get("/cadataAya", function (req, res) {
	var temp = req.query;
	var next = temp.cadata;
	console.log(next);
	console.log("agai value cadata kijjjjjjj");
	urlcadata = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=" + next + "&key="+process.env.ENV_VARIABLE;
	console.log("urlcadata ki", urlcadata);
	request.get({
		url: urlcadata,
		json: true,
		headers: { 'User-Agent': 'request' }
	}, (err, response, data) => {
		if (err) {
			console.log('Error:', err);
		}
		else if (res.statusCode !== 200) {
			console.log('Status:', response.statusCode);
		} else {

			console.log(data);
			res.setHeader('content-type', 'application/json');
			res.json(data);
		}
	});

});

app.get("/yelpBanaing", function (req, res) {
	console.log(req.url);
	console.log(req.query);
	var temp = req.query;
	var next = temp.nameyelp;
	console.log(next);
	console.log("agai value cadata ki");
	yelpUrl = "https://api.yelp.com/v3/businesses/matches/best?name=" + req.query.nameyelp + "&address1=" + req.query.adddr + "&city=" + req.query.cityzz + "&state=" + req.query.statezz + "&country=" + req.query.country;
	var urlc = encodeURI(yelpUrl);
	request.get({
		url: urlc,
		json: true,
		headers: { 'User-Agent': 'request', 'Authorization': 'Bearer Njza3sFCRA9Ryj9ThYlmY38oXieiZrYlQvvTIe1DUnG89_VajllQVQntnGhSLpKHofkjdo7GYbDuQcyD0sgeaas3E5X6A31g6qMEzv1UmBg1p4EX_utsDkASwHPJWnYx' }
	}, (err, response, data) => {
		if (err) {
			console.log('Error:', err);
		}
		else if (res.statusCode !== 200) {
			console.log('Status:', response.statusCode);
		} else {
			// data already parsed
			console.log(data);
			res.setHeader('content-type', 'application/json');
			res.json(data);
		}
	});

});


app.get("/yelpKaTable", function (req, res) {
	console.log(req.url);
	console.log(req.query);
	var temp = req.query;
	var next = temp.naviTaziId;
	console.log(next);
	yelpFinalUrl = "https://api.yelp.com/v3/businesses/" + req.query.naviTaziId + "/reviews";
	var urlc2 = encodeURI(yelpFinalUrl);
	request.get({
		url: urlc2,
		json: true,
		headers: { 'User-Agent': 'request', 'Authorization': 'Bearer Njza3sFCRA9Ryj9ThYlmY38oXieiZrYlQvvTIe1DUnG89_VajllQVQntnGhSLpKHofkjdo7GYbDuQcyD0sgeaas3E5X6A31g6qMEzv1UmBg1p4EX_utsDkASwHPJWnYx' }
	}, (err, response, data) => {
		if (err) {
			console.log('Error:', err);
		} else if (res.statusCode !== 200) {
			console.log('Status:', response.statusCode);
		} else {
			console.log(data);
			res.setHeader('content-type', 'application/json');
			res.json(data);
		}
	});

});
//start server
app.listen(8081, function () {
	console.log('Server started on port 8081..')
});
