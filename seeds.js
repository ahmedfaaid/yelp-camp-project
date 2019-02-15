var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [{
        name: "Green Point",
        image: "https://www.explore-mag.com/media/image/56883_max.jpg",
        description: "Start by exploring the beach. Walk or run in either direction and scan the flotsam for beach booty. Of course, you can also go for a swim, but be aware that the water is about 10°C. If you’re into surfing, there are almost always waves at Long Beach, but if you’re looking for more serious action, or lessons, you can head 20 minutes north to the town of Tofino."
    },
    {
        name: "Alice Lake Main Camp",
        image: "https://www.explore-mag.com/media/image/56884_max.jpg",
        description: "A good warm-up to Squamish mountain biking is Wonderland, a three-kilometre roller-coaster ride starting just outside the campground. Link it with Brackendale trails and Cheshire Cat and White Rabbit for an intermediate loop. Forgo hiking in the park itself for better trails a short drive away: the hike to the three summits of the Stawamus Chief, the trek to the alpine meadows on the way to Elfin Shelter, and the stiff but rewarding climb to Garibaldi Lake in Garibaldi Provincial Park."
    },
    {
        name: "Lake of the Woods",
        image: "https://www.explore-mag.com/media/image/56927_max.jpg",
        description: "The best hike is the Cathedral Rim Trail, a highline loop along a series of ridges topping out at over 2,500 metres. The route passes some of the park’s best-known geologic formations, including Smokey the Bear, the Devil’s Woodpile and Stone City. The Lake-view Mountain Trail leads to the park’s high point and provides extensive views—on a clear day you can see Mount Rainier’s bulk, 300 kilometres away."
    }
]

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds");
        Comment.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("removed comments!")
        });
        //add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create({
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function (err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created a new comment");
                        }
                    })
                }
            });
        });
    });
}

module.exports = seedDB;