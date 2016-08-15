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

var WaltDisneyMovies = [
	{ name : "Aladdin", image: "assets/images/Aladdin.jpg" },
	{ name : "Cinderalla", image: "assets/images/Cinderalla.jpg" },
	{ name : "Zootopia", image: "assets/images/Zootopia.jpg" },
	{ name : "Frozen", image: "assets/images/Frozen.jpg" }
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

    starANewGame : function () {
 		this.movie = WaltDisneyMovies[Math.floor(Math.random() * WaltDisneyMovies.length)]; 
   		console.log(this.movie);
   		this.guessesLeft = 12;
   		this.guesses = [];
   		this.name = new Array(this.movie.name.length + 1).join( '-' );
   		document.querySelector('#wins').innerHTML = this.wins;
    	document.querySelector('#losses').innerHTML = this.losses;
    	document.querySelector('#guessesLeft').innerHTML = this.guessesLeft;
    	document.querySelector('#lettersGuessed').innerHTML = hangmanGame.guesses;
    	document.querySelector('#currentMovie').innerHTML = this.name;
    	document.querySelector('#picture').src = "assets/images/background.jpg";
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
				hangmanGame.guesses.push(userLetter);
				hangmanGame.guessesLeft--;
				document.querySelector('#guessesLeft').innerHTML = hangmanGame.guessesLeft;
				document.querySelector('#lettersGuessed').innerHTML = hangmanGame.guesses;
				if(hangmanGame.guessesLeft == 0) {
					gameStarted = false;
					document.querySelector('#picture').src = hangmanGame.movie.image;
				}
			} else {
				var msg = "Duplicate Letter : "+userLetter; 
				alert(msg);
			}
		}
	} else {
		alert("Please press a key for a letter in alphabet");
	}
	
}