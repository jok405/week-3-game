// Initialize the score
var score = 0;

// Initialize list of Matrix names
matrixNames = ['neo', 'trinity', 'morpheus', 'smith', 'oracle', 'cypher', 'merovingian', 'niobe', 'architect', 'tank', 'dozer'];


// Game Telephone Ring 
var phoneCall = new Audio("http://www.soundjay.com/phone/sounds/telephone-ring-01a.mp3");


// Initialize list of letters for keystroke validation
var testLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


// Initialize Global Variables
var guessCount;
var wrongGuesses;
var correctGuesses;
var displayLetters;
var displayString;
var name;



// Game reset function
function reset(){
	// Initialize the number of guesses remaining
	guessCount = 12;

	// Initialize the array of wrong guessed letters
	wrongGuesses = [];

	// Initialize the array of correct guessed letters
	correctGuesses = [];

	// Initialize the array displayed to user
	displayLetters = [];



	// Randomly select a new name from the list
	name = matrixNames[Math.floor(Math.random() * matrixNames.length) + 1];

	// Update the display array to show "_" for the length of the name
	for(var i = 0; i < name.length; i++){
		displayLetters.push('_');
	}

	// Place the html into the game
	document.querySelector('#remaining_guesses').innerHTML = guessCount;
	document.querySelector('#displayed_letters').innerHTML = displayLetters;
	document.querySelector('#guessed_letters').innerHTML = wrongGuesses;
}


// Run re-set function to initialize the game
reset();

// First ring for new caller
phoneCall.play();


// Playing the game
document.onkeyup = function(event) {

	// User inputs keystroke
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

	// Validate that user input is a letter
	if(testLetters.indexOf(userGuess) === -1){
		// Nothing happens since not a letter
	}
	else{
		// Determine if the letter was guessed already
		if(wrongGuesses.indexOf(userGuess) === -1  &&  correctGuesses.indexOf(userGuess) === -1){


			// ---------- Determine if letter is in name array -----------

			// Yes, change the screen to show the correctly guessed letter
			if(name.indexOf(userGuess) !== -1){

				// Ensure that any repeat instance of the same letter are found
				for(var i = 0; i < displayLetters.length; i++){
					if(name[i] == userGuess){
						displayLetters[i] = userGuess;
					}
				}

				// Write the new display array to the screen
					// !!!!!!!!!!!!    MORE CODE HERE    !!!!!!!!!!!!!
					document.querySelector('#displayed_letters').innerHTML = displayLetters;
				
				// Update Correct Guess Array
				correctGuesses.push(userGuess);

				// Minus 1 guess
				guessCount--;
				document.querySelector('#remaining_guesses').innerHTML = guessCount;

			}
			// No, change the screen to show the wrongly guessed letter
			else{

				// Update Wrong Guess Array
				wrongGuesses.push(userGuess);


				// Write the new Wrong Guess Array to screen
					// !!!!!!!!!!!!    MORE CODE HERE    !!!!!!!!!!!!!
					document.querySelector('#guessed_letters').innerHTML = wrongGuesses;

				// Minus 1 guess
				guessCount--;
				document.querySelector('#remaining_guesses').innerHTML = guessCount;

			}


			// ----------- Determine if win or loss (otherwise it will just keep playing) -----------

			// Check for loss - reset
			if(guessCount === 0 && displayLetters.indexOf("_") !== -1){
				reset();
				phoneCall.play();
			}
			// Check for win - add score & reset
			if (displayLetters.indexOf("_") === -1){
				score++;
				document.querySelector('#score').innerHTML = "Wins: " + score;

				reset();
				phoneCall.play();
			}


		} // New Input Check

	} // Letter Input Check 

} // Function End





		
		