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

var letters = [
				"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",
				"p","q","r","s","t","u","v","w","x","y","z"
              ];


var WaltDisneyMovies = [
	{ name : "aladdin", image: "assets/images/aladdin.jpg" },
	{ name : "cinderalla", image: "assets/images/cinderalla.jpg" },
	{ name : "zootopia", image: "assets/images/zootopia.jpg" },
	{ name : "frozen", image: "assets/images/frozen.jpg" },
	{ name : "mulan", image: "assets/images/mulan.jpg" },
	{ name : "hercules", image: "assets/images/hercules.jpg" }
];

var gameStarted = false;

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
    	gameStarted = true;
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
    
    checkNameContainsLetter(userLetter) {
    	return (this.movie.name.includes(userLetter))? true: false;
    },

    rightGuess : function(userLetter) {
    	var movieName = this.movie.name;
    	for (var i = 0; i< movieName.length; i++) {
			if(movieName.charAt(i) == userLetter) {
				this.name = this.name.replaceAt(i,userLetter);
				this.guessedCorrect++;
			}
		}
		document.querySelector('#currentMovie').innerHTML = this.name;
		if(this.guessedCorrect == movieName.length) {
			gameStarted = false;
			document.querySelector('#picture').src = this.movie.image;
			this.wins++;
			document.querySelector('#wins').innerHTML = this.wins;
    	}
    },
    
    wrongGuess : function(userLetter) {
		this.guesses.push(userLetter);
		this.guessesLeft--;
		document.querySelector('#guessesLeft').innerHTML = this.guessesLeft;
		document.querySelector('#lettersGuessed').innerHTML = this.guesses;
		if(this.guessesLeft == 0) {
			gameStarted = false;
			document.querySelector('#picture').src = this.movie.image;
			this.losses++
			document.querySelector('#wins').innerHTML = this.wins;
			document.querySelector('#losses').innerHTML = this.losses;
		}
    }
}

// When the user presses the key it records the keypress
document.onkeyup = function(event) {
	var userLetter = String.fromCharCode(event.keyCode).toLowerCase();
	if(letters.contains(userLetter) == true) {
		if(gameStarted == false) {
			hangmanGame.starANewGame();
		} else {
			if(hangmanGame.guesses.contains(userLetter) == false) {
				if(hangmanGame.checkNameContainsLetter(userLetter)) {
					hangmanGame.rightGuess(userLetter);
				} else {
					hangmanGame.wrongGuess(userLetter);
				}
			}
		}
	}
}