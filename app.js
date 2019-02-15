var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  seedDB = require("./seeds"),
  PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true
});
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); //using body parser
app.set("view engine", "ejs"); //setting up view engine
app.use(express.static(__dirname + "/public"));
// seedDB();

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
  //get all campgrounds from db
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log("There was an error");
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: allCampgrounds
      });
    }
  });
});

app.post("/campgrounds", function (req, res) {
  //get data from form and add to campgrounds array
  var name = req.body.name,
    image = req.body.image,
    desc = req.body.description,
    newCampground = {
      name: name,
      image: image,
      description: desc
    };
  //create a new campground and save to database
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log("There was an error");
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function (req, res) {
  res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function (req, res) {
  //find campground with provided id
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        //render showpage with that campground
        res.render("campgrounds/show", {
          campground: foundCampground
        });
      }
    });
});

// ====================
// COMMENTS ROUTES
// ====================

app.get("/campgrounds/:id/comments/new", function (req, res) {
  // find campground by id
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {
        campground: campground
      });
    }
  });
});

app.post("/campgrounds/:id/comments", function (req, res) {
  // lookup campground using ID
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

app.listen(PORT, function () {
  console.log("YelpCamp server has started");
});