// define moving functions 
// current postion: type(string) 'X-Y'  eg. '2-2'
// function exchangePos(newPos, oldPos)

function move(moveSeq, startPos){
	
	var currPos = startPos;
	if(moveSeq.length){
		for(var i = 0; i < moveSeq.length; ++i ){
			console.log(currPos);
			switch ( moveSeq[i] ){
				case 'up': // move up
					currPos = moveUp(currPos);
					break;
				case 'down': // move up
					currPos = moveDown(currPos);
					break;
				case 'left': // move up
					currPos = moveLeft(currPos);
					break;	
				case 'right': // move up
					currPos = moveRight(currPos);
					break;				
			}	
		}
		console.log("Done moving.");
		$.event.trigger({
			type: "moveDone"
		});
	}
}

function moveUp(currPos){
	var posArr = currPos.split('-');
	var nextPos = posArr[0] + '-' + (parseInt(posArr[1]) - 1).toString();
	exchangePos(nextPos, currPos);
	return nextPos;
}

function moveDown(currPos){
	var posArr = currPos.split('-');
	var nextPos = posArr[0] + '-' + (parseInt(posArr[1]) + 1).toString();
	exchangePos(nextPos, currPos);
	return nextPos;
}

function moveLeft(currPos){
	var posArr = currPos.split('-');
	var nextPos = + (parseInt(posArr[0]) - 1).toString() + '-' + posArr[1];
	exchangePos(nextPos, currPos);
	return nextPos;
}

function moveRight(currPos){
	var posArr = currPos.split('-');
	var nextPos = + (parseInt(posArr[0]) + 1).toString() + '-' + posArr[1];
	exchangePos(nextPos, currPos);
	return nextPos;
}