var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');

var path = require('path');
var connection = mysql.createConnection({
                host: '34.66.142.241',
                user: 'root',
                password: 'cs411',
                database: 'cs411'
});

connection.connect;

global.current_ID = 25000;
var app = express();

// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res) {
	res.render('index', { title: 'Mark Attendance' });
});

app.get('/addsuccess', function(req, res) {
      res.send({'message': 'Restaurant added successfully!'});
});

app.get('/delsuccess', function(req, res) {
      res.send({'message': 'Restaurant deleted successfully!'});
});

app.get('/updatesuccess', function(req, res) {
      res.send({'message': 'Restaurant updated successfully!'});
});

app.post('/delrest', function(req, res)	{
	var restname = req.body.RestaurantName;
	var why_not_working = req.body.RestaurantID;
//	console.log(req.body.RestaurantID);
//	res.send({'message':req.body.RestaurantID, why_not_working});

	if (restname.length === 0 || why_not_working === null)
	{
	console.log('please input a restaurant name and ID');
	}else{
	var sql = `DELETE FROM Restaurant WHERE RestaurantName='${restname}' AND RestaurantID=${why_not_working}`;
	}

console.log(sql);
   connection.query(sql, function(err, result){
      if (err)
      {
      res.send(err)
      return;
      }

    res.redirect('/delsuccess');
  });
});

// this code is executed when a user clicks the form submit button
app.post('/addrest', function(req, res) {
  var restname = req.body.RestaurantName;
  var phonenumber = req.body.PhoneNumber;
  var pricelevel = req.body.PriceLevel;
  var averating = req.body.AverageRating;
  var cuisine = req.body.Cuisine;
  var delivery = req.body.Delivery;
  var dinein = req.body.Dine_In;
   
  var sql = `INSERT INTO Restaurant (RestaurantID, RestaurantName, PhoneNumber, PriceLevel, AverageRating, Cuisine, Delivery, Dine_In, RatingNum) VALUES ('${current_ID++}','${restname}','${phonenumber}', '${pricelevel}', '${averating}', '${cuisine}', '${delivery}', '${dinein}', NULL)`;



console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/addsuccess');
  });
});

app.post('/updrest', function(req, res) {
  var rest_id = req.body.idToUpdate;
  var new_rest_name = req.body.restNameToUpdate;
  var new_phone_num = req.body.phoneNumToUpdate;
  var new_price_lvl = req.body.priceLevelToUpdate;
  var new_avg_rating = req.body.avgRatingToUpdate;
  var new_cuisine = req.body.cuisineToUpdate;
  var new_delivery = req.body.deliveryUpdate;
  var new_dinein = req.body.dineInUpdate;

  var sql = `UPDATE Restaurant SET RestaurantName='${new_rest_name}', PhoneNumber='${new_phone_num}', PriceLevel=${new_price_lvl}, AverageRating=${new_avg_rating}, Cuisine='${new_cuisine}', Delivery=${new_delivery}, Dine_In=${new_dinein} WHERE RestaurantID=${rest_id}`;

console.log(sql);
  connection.query(sql, function(err, result)  {
    if (err)  {
      res.send(err)
      return;
    }
    res.redirect('/updatesuccess');
  });
});


app.listen(80, function () {
    console.log('Node app is running on port 80');
});

