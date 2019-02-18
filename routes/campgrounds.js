var express = require('express'),
	router = express.Router(),
	Campground = require("../models/campground");

//view all campgrounds
router.get('/', function (req, res) {
	//get all campgrounds from db
	Campground.find({}, function (err, allCampgrounds) {
		if (err) {
			console.log('There was an error');
			console.log(err);
		} else {
			res.render('campgrounds/index', {
				campgrounds: allCampgrounds
			});
		}
	});
});
//save new campground
router.post('/', isLoggedIn, function (req, res) {
	//get data from form and add to campgrounds array
	var name = req.body.name,
		image = req.body.image,
		desc = req.body.description,
		author = {
			id: req.user._id,
			username: req.user.username
		}
	newCampground = {
		name: name,
		image: image,
		description: desc,
		author: author
	};
	//create a new campground and save to database
	Campground.create(newCampground, function (err, newlyCreated) {
		if (err) {
			console.log('There was an error');
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect('/campgrounds');
		}
	});
});
//new campground form
router.get('/new', isLoggedIn, function (req, res) {
	res.render('campgrounds/new');
});
//view single campground
router.get('/:id', function (req, res) {
	//find campground with provided id
	Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			//render showpage with that campground
			res.render('campgrounds/show', {
				campground: foundCampground
			});
		}
	});
});
//middleware
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = router;