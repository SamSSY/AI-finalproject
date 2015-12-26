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

// only use for AI search algorithm 
// exchange two tiles' positions wihtout dragging
function exchangePos(newPos, oldPos){
    
     $('#' + oldPos).addClass('select');
     var oldPosArr = oldPos.split("-");
     var newPosArr = newPos.split("-");
     var x1 = newPosArr[0]*tile_w;
     var y1 = newPosArr[1]*tile_h;
     var x2 = oldPosArr[0]*tile_w;
     var y2 = oldPosArr[1]*tile_h;
     
     exchangeColorsInMatrix(newPos, oldPos);
     
     $('#'+ newPos).animate({'top':y2, 'left':x2}, {'duration':move_speed});
     $('#'+ oldPos).animate({'top':y1, 'left':x1}, {'duration':move_speed});
     $('#'+ newPos).attr('id', oldPos);
     $('.select').attr('id', newPos);
     $('#' + newPos).removeClass('select');
}

//exchange the colors in the colorMatrix
function exchangeColorsInMatrix(newPos, oldPos){
     var oldPosArr = oldPos.split("-");
     var newPosArr = newPos.split("-");
     var tempClr = colorMatrix[newPosArr[0]][newPosArr[1]];     
     colorMatrix[newPosArr[0]][newPosArr[1]] = colorMatrix[oldPosArr[0]][oldPosArr[1]];
     colorMatrix[oldPosArr[0]][oldPosArr[1]] = tempClr;
}

// use for manually dragging
// 移動珠子
function moveTo(id, pos){
    var aryPos = pos.split("-");
    var x = aryPos[0]*tile_w;
    var y = aryPos[1]*tile_h;
    $('#'+id).animate({'top':y, 'left':x}, {'duration':move_speed});
    $('#'+id).attr('id', pos);
}

function updateColorMatrix(){
	for(var i = 0; i < dim_x; ++i){
		for (var j =0; j < dim_y; ++j){
			var pos = i + '-' + j;		
			colorMatrix[i][j] = $('#' + pos).attr('data-clr');
		}
	}
	// print current matrix status
    console.log("color: ");
	console.log(colorMatrix);
}

// to pick a random tile and return its x-y 
function pickRandomTile(){
	var randomX = Math.floor(( Math.random() * dim_x));
	var randomY = Math.floor(( Math.random() * dim_y));
	return (randomX + '-' + randomY);
}


//testing
$(function() {
	//setInterval(function(){
	//	pickRandomTile(); 	
	//}, 500);
});
