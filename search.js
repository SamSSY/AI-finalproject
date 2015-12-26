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


// a global variable which contains color density
// that is, the sum of the distance to the same color tile 
// we will use it as a heuristic  
var colorDensityScoreMatrix = [];
// initialize it 
for (var i = 0; i < dim_x ; ++i){
    colorDensityScoreMatrix[i] = new Array(dim_y);
}

//
// colorMatrix[ dim_x ][ dim_y ] 
// [  			]
// |   	  1		|
// |   	 1x1	|
// |	  10.5	|
// [	 0.3	]
function updateColorDensityScoreMatrix(){
	for(var i = 0; i < dim_x; i++){
        for(var j = 0; j < dim_y; j++){
			var score = 0;
			var selfColor = colorMatrix[i][j];
			for(var k = 1; k <= 2; ++k){
				if((i - k) >= 0){
					if(k == 1)
						score += colorMatrix[i-k][j] == selfColor? 1 : 0;
					else if (k == 2)
						score += colorMatrix[i-k][j] == selfColor? 0.3 : 0;
				}
				if((i + k) < dim_x){
					if(k == 1)
						score += colorMatrix[i+k][j] == selfColor? 1 : 0;
					else if (k == 2)
						score += colorMatrix[i+k][j] == selfColor? 0.3 : 0;
				}
				if((j - k) >= 0){
					if(k == 1)
						score += colorMatrix[i][j - k] == selfColor? 1 : 0;
					else if (k == 2)
						score += colorMatrix[i][j - k] == selfColor? 0.3 : 0;
				}
				if((j + k) < dim_y){
					if(k == 1)
						score += colorMatrix[i][j + k] == selfColor? 1 : 0;
					else if (k == 2)
						score += colorMatrix[i][j + k] == selfColor? 0.3 : 0;
				}
				
				// only check the direction like: southeast once 
				if(k == 1){
								
					if((i - k) >= 0){
						if((j - k) >= 0){
							score += colorMatrix[i - k][j - k] == selfColor? 0.5 : 0;
						}
						if((j + k) < dim_y){
							score += colorMatrix[i - k][j + k] == selfColor? 0.5 : 0;
						}
					}
					if((i + k) < dim_x){
						if((j - k) >= 0){
							score += colorMatrix[i + k][j - k] == selfColor? 0.5 : 0;
						}
						if((j + k) < dim_y){
							score += colorMatrix[i + k][j + k] == selfColor? 0.5 : 0;
						}
					}
				}	
			}
			colorDensityScoreMatrix[i][j] = score;
        }
    }
	console.log("colorDensityScoreMatrix: ");
	console.log(colorDensityScoreMatrix);
	pickColorDensityScoreLargestTile();
}

function pickColorDensityScoreLargestTile(){
	var pos = [0,0];
	for(var i = 0; i < dim_x; ++i){
		for (var j =0; j < dim_y; ++j){
			if(colorDensityScoreMatrix[i][j] > colorDensityScoreMatrix[pos[0]][pos[1]]){
				pos[0] = i;
				pos[1] = j;
			}
		}
	}
	
	console.log("ColorDensityScoreLargestTile: ");
	console.log((pos[0] + '-' + pos[1]));
	return (pos[0] + '-' + pos[1]);
}


// to pick a random tile and return its x-y 
function pickRandomTile(){
	var randomX = Math.floor(( Math.random() * dim_x));
	var randomY = Math.floor(( Math.random() * dim_y));
	return (randomX + '-' + randomY);
}



// run search algorithm 
$(function() {
	//search();
	setTimeout(function(){
		updateColorDensityScoreMatrix();
		console.log("colorDensityScoreMatrix: ");
		console.log(colorDensityScoreMatrix);
		var ColorDensityScoreLargestTile = pickColorDensityScoreLargestTile();
		console.log("ColorDensityScoreLargestTile: ");
		console.log(ColorDensityScoreLargestTile);	
	}, 1500);
	
	console.log("colorMatrix: ");
	console.log(colorMatrix);
	
	$(document).on("moveDone", makeChain);
});