// - search.js -
// search algorithm should output the move sequence
// eg. ['up', 'down', 'left', 'right'] 

// for demo 
function search(){
	console.log("start search!");
	var startPos = '2-2'; // start position
	var moveSeq = ['up', 'down', 'left', 'right', 'right', 'right', 'down', 'down', 'left', 'left'];
	setTimeout(function(){
		console.log("done search!");
		move(moveSeq, startPos);
	}, 2000);
}


// run search algorithm 
$(function() {
	//search();
	$(document).on("moveDone", makeChain);
});