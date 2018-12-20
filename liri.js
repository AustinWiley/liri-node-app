require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var moment = require('moment');
var keys = require("./keys");
var Spotify = require('node-spotify-api');



// var spotify = new Spotify(keys.spotify);

// console.log(spotify);

var clientInput = process.argv;
var search = clientInput[2];
var term = clientInput.slice(3).join(" ");
console.log(search);
console.log(term);

function findMovie(movie) {
    console.log("inside findMovie: " + movie)
    // We then run the request with axios module on a URL with a JSON
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(
        function (response) {
            var divider = "\n====================================================\n";
            if (response.data.Response === "False") {
                console.log(divider + response.data.Error + divider);
            } else if (response.data.Response === "True") {
                // Then we print out the imdbRating

                var movieData = response.data;
                var movie = movieData.Title;
                var year = movieData.Year;
                var imdbRating = movieData.imdbRating;

                var rottenRating = getRating(movieData)

                function getRating(movieData) {
                    for (var i = 0; i < movieData.Ratings.length; i++)
                        if (movieData.Ratings[i].Source === "Rotten Tomatoes") {
                            return movieData.Ratings[i].Value
                        }
                }

                var countryProduced = movieData.Country;
                var language = movieData.Language;
                var plot = movieData.Plot;
                var actors = movieData.Actors;
                console.log("rotten Tomatoes Rating: " + rottenRating);

                var divider = "\n====================================================\n"
                console.log(divider +
                    "Title: " + movie,
                    "\nRelease Date: " + year,
                    "\nIMDB Rating: " + imdbRating,
                    "\nRotten Tomatoes: " + rottenRating,
                    "\nCountry: " + countryProduced,
                    "\nLanguage: " + language,
                    "\nPlot: " + plot,
                    "\nActors/Actresses: " + actors + divider
                );

            }
        }
    );
};

function findMusic(song) {


    var spotify = new Spotify(keys.spotify);

    spotify.search({
        type: 'track',
        query: song,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

          console.log(data.tracks.items[0].album.artists[0].name);
//   console.log(data.tracks.items[0].artists[0].name);
  console.log(data.tracks.items[0].name);
  console.log(data.tracks.items[0].external_urls.spotify);
  console.log(data.tracks.items[0].album.name);
    });
}

function findConcert(artist) {
    // We then run the request with axios module on a URL with a JSON
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response, error) {
            // Then we print out the imdbRating

            if (error) {
                console.log("not in concert");
                return
            } else {
                console.log("The concert: " + JSON.stringify(response.data[0].venue.name))
                var concertData = response.data;
                var divider = "\n============================= " + artist + " In Concert =============================\n";
                for (var i = 0; i < concertData.length; i++) {
                    var venue = concertData[i].venue.name;
                    var city = concertData[i].venue.city;
                    var country = concertData[i].venue.country;
                    var when = moment(concertData[i].datetime).format('MM/DD/YYYY');
                    console.log(divider + venue + "\n" + city + ", " + country + "\n" + when)
                }
            }
        }
    );
};




function liriBot(search, term) {
    if (search === "concert-this") {
        // console.log("concert Search: " + term);
        findConcert(term);
    } else if (search === "spotify-this-song") {
        // console.log("search song: " + term);
        term = term || "ace of base"
        findMusic(term)
    } else if (search === "movie-this") {
        if (!term) {
            term = "Mr. Nobody";
        }
        findMovie(term);
    } else if (search === "do-what-it-says") {
        console.log("do what is says thingy");
        var random = fs.readFile("random.txt")
        // console.log(random);
    } else {
        console.log("not a valad input");
    }
}




liriBot(search, term)

var data = {
    "tracks": {
        "href": "https://api.spotify.com/v1/search?query=stare+at+the+sun&type=track&market=US&offset=0&limit=1",
        "items": [{
            "album": {
                "album_type": "album",
                "artists": [{
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/3NChzMpu9exTlNPiqUQ2DE"
                    },
                    "href": "https://api.spotify.com/v1/artists/3NChzMpu9exTlNPiqUQ2DE",
                    "id": "3NChzMpu9exTlNPiqUQ2DE",
                    "name": "Thrice",
                    "type": "artist",
                    "uri": "spotify:artist:3NChzMpu9exTlNPiqUQ2DE"
                }],
                "available_markets": [
                    "AD",
                    "ZA"
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/7yu7B1B8O07jAFAZEFSRXA"
                },
                "href": "https://api.spotify.com/v1/albums/7yu7B1B8O07jAFAZEFSRXA",
                "id": "7yu7B1B8O07jAFAZEFSRXA",
                "images": [{
                        "height": 638,
                        "url": "https://i.scdn.co/image/2a26557eba45fb46db456dbfb9071d23a2b86bce",
                        "width": 640
                    },
                    {
                        "height": 299,
                        "url": "https://i.scdn.co/image/f60ee9ee9cf58fc285dc9e74e6aa261b46a4e597",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/8547f4f8caad9d8ba962c1b3954339efcd59dc84",
                        "width": 64
                    }
                ],
                "name": "The Artist In The Ambulance",
                "release_date": "2003-01-01",
                "release_date_precision": "day",
                "total_tracks": 12,
                "type": "album",
                "uri": "spotify:album:7yu7B1B8O07jAFAZEFSRXA"
            },
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/3NChzMpu9exTlNPiqUQ2DE"
                },
                "href": "https://api.spotify.com/v1/artists/3NChzMpu9exTlNPiqUQ2DE",
                "id": "3NChzMpu9exTlNPiqUQ2DE",
                "name": "Thrice",
                "type": "artist",
                "uri": "spotify:artist:3NChzMpu9exTlNPiqUQ2DE"
            }],
            "available_markets": [
                "AD",
                "ZA"
            ],
            "disc_number": 1,
            "duration_ms": 203240,
            "explicit": false,
            "external_ids": {
                "isrc": "USIR20300325"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/0FXSU5PXzvKl3CpA5h3Hqx"
            },
            "href": "https://api.spotify.com/v1/tracks/0FXSU5PXzvKl3CpA5h3Hqx",
            "id": "0FXSU5PXzvKl3CpA5h3Hqx",
            "is_local": false,
            "name": "Stare At The Sun",
            "popularity": 44,
            "preview_url": null,
            "track_number": 5,
            "type": "track",
            "uri": "spotify:track:0FXSU5PXzvKl3CpA5h3Hqx"
        }],
        "limit": 1,
        "next": "https://api.spotify.com/v1/search?query=stare+at+the+sun&type=track&market=US&offset=1&limit=1",
        "offset": 0,
        "previous": null,
        "total": 151
    }
}

//   console.log(data.tracks.items[0].album.artists[0].name);
// //   console.log(data.tracks.items[0].artists[0].name);
//   console.log(data.tracks.items[0].name);
//   console.log(data.tracks.items[0].external_urls.spotify);
//   console.log(data.tracks.items[0].album.name);