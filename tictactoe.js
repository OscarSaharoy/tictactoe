
const randomInArray = (array) => array[Math.floor(Math.random() * array.length)];
				
const dot = (array1, array2) => array1.reduce(
	(accumulator, currentValue, index) => (accumulator + currentValue*array2[index]), 0 );

const circleSVG = "<circle cx=\"50\" cy=\"50\" r=\"20\" stroke=\"#6ECEFF\" stroke-width=\"3\" fill=\"transparent\"/>";
const crossSVG  = "<line x1=\"30\" y1=\"30\" x2=\"70\" y2=\"70\" stroke=\"red\" stroke-width=\"3\" stroke-linecap=\"round\"/> \
    			   <line x1=\"70\" y1=\"30\" x2=\"30\" y2=\"70\" stroke=\"red\" stroke-width=\"3\" stroke-linecap=\"round\"/>";

const wins = [[1,1,1,0,0,0,0,0,0],
			  [0,0,0,1,1,1,0,0,0],
			  [0,0,0,0,0,0,1,1,1],
			  [1,0,0,1,0,0,1,0,0],
			  [0,1,0,0,1,0,0,1,0],
			  [0,0,1,0,0,1,0,0,1],
			  [1,0,0,0,1,0,0,0,1],
			  [0,0,1,0,1,0,1,0,0]];

const gameResult = { CROSS_WIN: -1,
					 DRAW:       0,
					 CIRCLE_WIN: 1};

const squareState = { CROSS: -1,
					  EMPTY:  0,
					  CIRCLE: 1 };

var squares;
var boardDiv;
var endGamePopup;

const anyEmptySquares  = () => squares.find(   square => square.value == squareState.EMPTY );
const getEmptySquares  = () => squares.filter( square => square.value == squareState.EMPTY );
const boardFromSquares = () => squares.map(    square => square.value );

const getGameResult = () => evaluateBoard( boardFromSquares() );
const gameEnded     = () => getGameResult() != gameResult.DRAW || !anyEmptySquares();

function restart() {

	for(var square of squares) {

		square.value = squareState.EMPTY;
		square.innerHTML = "";

		boardDiv.classList.remove("fade");
		endGamePopup.classList.add("hidden");
	}
}

function setSquare(square, value) {

	if(square.value != squareState.EMPTY) return false;

	square.innerHTML = value == squareState.CIRCLE ? circleSVG : crossSVG;
	square.value = value;

	return true;
}

function setSquareToCircle(square) {

	if( setSquare(square, squareState.CIRCLE) && !gameEnded() ) {
		
		aiTurn();
	}

	if( gameEnded() )
		endGame( getGameResult() );
}

function registerSquareCallbacks(squares) {

	for(var square of squares) {

		square.value = squareState.EMPTY;
		square.onclick = event => setSquareToCircle(event.target);
	}
}

function aiTurn() {

	var board = boardFromSquares();

	for(var testValue of [squareState.CROSS, squareState.CIRCLE]) {

		for(var i=0; i<9; ++i) {

			if(board[i] != squareState.EMPTY) continue;

			var tempBoard = board.slice();
			tempBoard[i] = testValue;

			if( evaluateBoard(tempBoard) != gameResult.DRAW ) {

				setSquare(squares[i], squareState.CROSS);
				return;
			}
		}
	}

	setSquare( randomInArray(getEmptySquares()), squareState.CROSS );
}

function evaluateBoard(board) {

	const scores = wins.map( win => dot(board, win) );

	if( scores.includes( 3) ) return gameResult.CIRCLE_WIN;
	if( scores.includes(-3) ) return gameResult.CROSS_WIN;
	
	return gameResult.DRAW;
}

function endGame(result) {

	boardDiv.classList.add("fade");
	endGamePopup.classList.remove("hidden");

	if( result == gameResult.DRAW ) {

		endGamePopup.innerHTML = "<h3> Draw! </h3>";
		endGamePopup.style.color = "#78a6bc";
	}
	else if( result == gameResult.CROSS_WIN ) {

		endGamePopup.innerHTML = "<h3> Crosses Win! </h3>";
		endGamePopup.style.color = "red";
	}
	else {

		endGamePopup.innerHTML = "<h3> Circles Win! </h3>";
		endGamePopup.style.color = "#6ECEFF";
	}
}

squares = Array.from( document.querySelectorAll("svg") );
registerSquareCallbacks(squares);

boardDiv     = document.querySelector(".board");
endGamePopup = document.querySelector(".end-game-popup");