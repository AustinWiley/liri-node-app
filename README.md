# liri-node-app

### Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.   LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

### Instructions on how to use Liri-node-app

1. Copy the `liri-node-app` repository to your computer.  Navigate to the root of your project and run `npm install` in a terminal to download the nessesary npm packages.  

2. Next, create a file named `.env`, add the following to it, replacing the values with your API keys for spotify:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```
   * This file will be used by the `dotenv` package to set environment variables to the global `process.env` object in node.
     
   * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can visit                      <https://developer.spotify.com/my-applications/#!/> in order to generate a **client id** and **client secret**:
   
3. Open a node termial to run the `liri.js` file.

4. liri.js can take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

### What Each Command Does

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

      ```
       * Artist(s)
       * The song's name
       * A preview link of the song from Spotify
       * The album that the song is from
     ```

    * If no song is provided then the program will default to "The Sign" by Ace of Base.

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

4. `node liri.js do-what-it-says`

  * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It will run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

     * The text in random.txt can be edited to search movie-this and concert-this as well.
     
 #### NOTE
 * In addition to logging the data to the terminal/bash window, the app will also log the output data to a .txt file called `log.txt`.
     
### NPM Packages used

   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Axios](https://www.npmjs.com/package/axios)

     * Axios is used to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)
   
   * [fs](https://www.npmjs.com/package/file-system) is a native node package.

## Watch the Demo 

* Click the link to watch a full Demo of the app. [liri-node-app-Demo](http://www.google.com)
   
