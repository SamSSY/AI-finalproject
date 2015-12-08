// define moving functions 
// current postion: type(string) 'X-Y'  eg. '2-2'
// function exchangePos(newPos, oldPos)

function moveUp(currPos){
	var posArr = currPos.split('-');
	var nextPos = posArr[0] + '-' + (parseInt(posArr[1]) - 1).toString();
	exchangePos(nextPos, currPos);
}

function moveDown(currPos){
	var posArr = currPos.split('-');
	var nextPos = posArr[0] + '-' + (parseInt(posArr[1]) + 1).toString();
	exchangePos(nextPos, currPos);
}

function moveLeft(currPos){
	var posArr = currPos.split('-');
	var nextPos = + (parseInt(posArr[0]) - 1).toString() + '-' + posArr[1];
	exchangePos(nextPos, currPos);
}

function moveRight(currPos){
	var posArr = currPos.split('-');
	var nextPos = + (parseInt(posArr[0]) + 1).toString() + '-' + posArr[1];
	exchangePos(nextPos, currPos);
}