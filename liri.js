//Require npm twitter package
var twitter = require('twitter');

// Then run a request to the Twitter API with the movie specified
var keys = require("./keys.js");

//Include the request npm package 
var request = require("request");

//Require npm spotify package
var spotify = require('spotify');

var fs = require("fs");

//Takes command line arguments
var nodeArgs = process.argv[2];

var userInput = process.argv[3];

if (nodeArgs === "my-tweets"){
	
	//TWEETS START HERE
	var client = new twitter({

		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret

	});



	var params = {screen_name: 'standardsoundz', count: 20};
		
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		 
		if (!error) {		  	
		 	for (var i = 0; i < tweets.length; i++ ){		 		
		 		var date = tweets[i].created_at;
		  	 	var text = tweets[i].text;
		 	  		
		  		console.log(date);
		  		console.log(text);
		   	}
		}
		
		else {
		  	  console.log(error);
		}
	});
}

if ( nodeArgs === "movie-this"){
	//OMBD STARTS HERE
	
	// Then run a request to the OMDB API with the movie specified
	var movie = userInput;
		
	if (movie){
		
		request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&r=json", function(error, response, body) {
		  // If the request is successful (i.e. if the response status code is 200)
			if (!error && response.statusCode === 200) {

				var tomatoes;
			    // Parse the body of the site and recover just the imdbRating
			    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
			    console.log( "The movie's title is: " + JSON.parse(body).Title); 
			    console.log( "Year: " + JSON.parse(body).Year );
			    console.log( "IMDB Rating " + JSON.parse(body).imdbRating);
			    console.log( "Country: " + JSON.parse(body).Country);
			    console.log( "Language: " + JSON.parse(body).Language );
			    console.log( "Plot: " + JSON.parse(body).Plot);
			    console.log( "Actors: " + JSON.parse(body).Actors);
			    console.log( "Rotten Tomatoes: " + JSON.parse(body).Ratings);  


			     // fix ratings and url
			    	// "Rotten Tomoatoes URL: " + JSON.parse(body).Actors 
		    }
		});
	}

	else  {

		request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&tomatoes=true=json", function(error, response, data) {
		  // If the request is successful (i.e. if the response status code is 200)
			if (!error && response.statusCode === 200) {
			    // Parse the body of the site and recover just the imdbRating
			    var parseInfo = JSON.parse(data);
			    // var tomatoes;
	    		// parseInfo.tomatoRating === "N/A" ? tomatoes = movie.Ratings[1].Value : tomatoes = movie.tomatoRating;
			    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
			    console.log( "The movie's title is: " + paresInfo.Title); 
			    console.log( "Year: " + paresInfo.Year );
			    console.log( "IMDB Rating " + paresInfo.imdbRating);
			    console.log( "Country: " + paresInfo.Country);
			    console.log( "Language: " + paresInfo.Language );
			    console.log( "Plot: " + paresInfo.Plot);
			    console.log( "Actors: " + paresInfo.Actors);
			    console.log( "Rotten Tomatoes: " + tomatoes);
			    console.log("Rotten Tomatoes URL:");
			}
			   	// "Rotten Tomoatoes URL: " + JSON.parse(body).Actors 	
		});
	}
}

var spotSearch  = function (track) {
	
	var song;

	var input = userInput;

	if (track){
		console.log("Callback worked");
		song = track;
	}

	else {	
		song = input;
	}
	
		
		// song = userInput;
	
 	
 	spotify.search({ type: 'track', query: song }, function(err, data) {
	    
	    if ( err ) {
	       
	        console.log('Error occurred: ' + err);
	        
	        // return;
	    }
	    else {
	    	
	    	var tracks = data.tracks.items[0];

	    	var songDetails = "\nSong name : " + tracks.name 	    		 
	    		+ "\nAlbum name : " + tracks.album.name
	    		+ "\nArtist(s) : " + tracks.artists[0].name
	    		+ "\nPreview link : " + tracks.preview_url;

	        console.log(songDetails);
	        // fs.appendFile("log.txt",songDetails);
	        // return true;
	    }
	 
	});

}

if (nodeArgs === "spotify-this-song") {

	spotSearch();
}


//Read the text file and then use it to call one of LIRI's commands.
if (nodeArgs === "do-what-it-says"){
	

	fs.readFile("random.txt", "utf8", function(error, data) {
  		
  		data = data.split(",");
  		var track = data[1];
  		console.log(track);


  		spotSearch(track);
  		// return true;
	});
}
 

