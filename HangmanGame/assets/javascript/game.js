var gameStarted = false;
var letters = [
               "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",
               "p","q","r","s","t","u","v","w","x","y","z"
              ];

Array.prototype.contains = function(elem) { 
	for (var i in this) {
		if (this[i] == elem) return true;
	}
	return false;
}

String.prototype.replaceAt=function(index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
}

var WaltDisneyMovies = [
	{ name : "aladdin", image: "assets/images/aladdin.jpg" },
	{ name : "cinderalla", image: "assets/images/cinderalla.jpg" },
	{ name : "zootopia", image: "assets/images/zootopia.jpg" },
	{ name : "frozen", image: "assets/images/frozen.jpg" },
	{ name : "mulan", image: "assets/images/mulan.jpg" },
	{ name : "hercules", image: "assets/images/hercules.jpg" }
];

var hangmanGame = {
	//# of times the user has guessed the letter correctly
	wins : 0,
	//# of times the user has failed to guess the letter correctly after exhausting all guesses
	losses : 0, 
	//# of guesses left. This will update
	guessesLeft : 12, 
	// Your Guesses so far: # of times the user has failed to guess the letter correctly after exhausting all guesses
	guesses : [], 
    movie : null,
    name :"",
    guessedCorrect:0,

    starANewGame : function () {
 		this.movie = WaltDisneyMovies[Math.floor(Math.random() * WaltDisneyMovies.length)]; 
   		console.log(this.movie);
   		this.guessesLeft = 12;
   		this.guesses = [];
   		this.guessedCorrect = 0;
   		this.name = new Array(this.movie.name.length + 1).join( '-' );
   		document.querySelector('#wins').innerHTML = this.wins;
    	document.querySelector('#losses').innerHTML = this.losses;
    	document.querySelector('#guessesLeft').innerHTML = this.guessesLeft;
    	document.querySelector('#lettersGuessed').innerHTML = hangmanGame.guesses;
    	document.querySelector('#currentMovie').innerHTML = this.name;
    	document.querySelector('#picture').src = "assets/images/background.gif";
    },
}

// When the user presses the key it records the keypress
document.onkeyup = function(event) {
	var userLetter = String.fromCharCode(event.keyCode).toLowerCase();
    if(letters.contains(userLetter) == true) {
		if(gameStarted == false) {
			gameStarted = true;
			hangmanGame.starANewGame();
		} else {
			if(hangmanGame.guesses.contains(userLetter) == false) {
				var movieName = hangmanGame.movie.name;
				if(movieName.includes(userLetter)) {
					for (var i = 0; i< movieName.length; i++) {
						if(movieName.charAt(i) == userLetter) {
							hangmanGame.name = hangmanGame.name.replaceAt(i,userLetter);
							hangmanGame.guessedCorrect++;
						}
					}
					document.querySelector('#currentMovie').innerHTML = hangmanGame.name;
					if(hangmanGame.guessedCorrect == movieName.length) {
						gameStarted = false;
						document.querySelector('#picture').src = hangmanGame.movie.image;
						hangmanGame.wins++;
						document.querySelector('#wins').innerHTML = hangmanGame.wins;
    				}
				} else {
					hangmanGame.guesses.push(userLetter);
					hangmanGame.guessesLeft--;
					document.querySelector('#guessesLeft').innerHTML = hangmanGame.guessesLeft;
					document.querySelector('#lettersGuessed').innerHTML = hangmanGame.guesses;
					if(hangmanGame.guessesLeft == 0) {
						gameStarted = false;
						document.querySelector('#picture').src = hangmanGame.movie.image;
						hangmanGame.losses++
						document.querySelector('#wins').innerHTML = this.wins;
    					document.querySelector('#losses').innerHTML = this.losses;
					}
				}
			}
		}
	}
}