function testExchange(){
    setInterval(function(){
        console.log("testing!");
        exchangePos('2-3', '2-2');
    }, 500);
}

function testMoveUp(){
    setInterval(function(){
        console.log("testing!");
        moveUp('2-2');
        moveUp('2-3');
        moveUp('2-4');
    }, 500);
}

function testMove(){
    setInterval(function(){
        console.log("testing!");
        moveUp('2-2');
        moveLeft('2-3');
        moveRight('2-4');
    }, 500);
}


// run test functions
$(function() {
    //testExchange();
    //testMoveUp();
    //testMove();    
});
