//記錄成為Chain的珠子，分別在X和Y軸有多少相同的珠子
function RepeatMap(repeatX, repeatY, clr, xn, yn) {
    this.repeatX = repeatX;
    this.repeatY = repeatY;
    this.clr = clr;
    this.xn = xn;
    this.yn = yn;
}

var flagMatrix;

//消除成為Chain的珠子
function makeChain() {
    
    //flagMatrix記錄每個珠子XY軸有多少相同珠，"2,3"表示X相鄰有2顆、Y相鄰有3顆 (Chain的例子)
    flagMatrix = new Array();
    for ( var i = 0; i < dim_x; i++) {
        flagMatrix[i] = new Array();
    }
    //開始統計Chain，由左至右，由上而下的visit每一顆，記錄它的X,Y軸的鄰居擁有同色珠的數目(是否成為可消的Chain)
    for ( var x = 0; x < dim_x; x++) {
        for ( var y = 0; y < dim_y; y++) {
            var repeatX = 0;
            var repeatY = 0;
            var clr = '';
            var xn = 0;
            var yn = 0;
            
            if (x > 0) {
                var curX_TileClr = $('#' + x + '-' + y).attr('data-clr');
                var lasX_TileClr = $('#' + (x - 1) + '-' + y).attr('data-clr');
                //目前X軸這顆的顏色 和 X軸上一顆的顏色 相同，repeatX+1
                if (curX_TileClr == lasX_TileClr){
                    repeatX = flagMatrix[x-1][y].repeatX+1;
                }else{
                    repeatX = 0;
                }
                clr = curX_TileClr;
                //repeatX>1表示有三顆相同，成為Chain了                
                if (repeatX >= 2) {
                    var i = repeatX;
                    //將X Chain上的每一顆都標上此Chain的總顆數
                    for (i; i > 0; i--) {
                        flagMatrix[x-i][y].repeatX = repeatX;
                        flagMatrix[x-i][y].clr = clr;
                        flagMatrix[x-i][y].xn = i;
                    }
                }
            }
            
            if (y > 0) {
                var curY_TileClr = $('#'+x+'-'+y).attr('data-clr');
                var lasY_TileClr = $('#'+x+'-'+(y-1)).attr('data-clr');
                //目前Y軸這顆的顏色 和 Y軸上一顆的顏色 相同，repeatY+1
                if (curY_TileClr == lasY_TileClr){
                    repeatY = flagMatrix[x][y-1].repeatY+1;
                }else{
                    repeatY = 0;
                }
                clr = curY_TileClr;
                //repeatY>1表示有三顆相同，成為Chain了     
                if (repeatY >= 2) {
                    var i = repeatY;
                    for (i; i > 0; i--) {
                        flagMatrix[x][y - i].repeatY = repeatY;
                        flagMatrix[x][y - i].clr = clr;
                        flagMatrix[x][y - i].yn = i;
                    }
                }
            }
           
            flagMatrix[x][y] = new RepeatMap(repeatX, repeatY, clr, xn, yn);
        }
    }
    
    // 記錄完Chain了，開始準備消除珠子
    var flag = false;
    var aryChk = new Array();
    var aryChains = new Array();
    var aryCombo = new Array();
    //收集combo group
    for ( x = 0; x < dim_x; x++) {
        for ( y = 0; y < dim_y; y++) {
            if (flagMatrix[x][y].repeatX >= 2 || flagMatrix[x][y].repeatY >= 2
            ) {
                aryChains.push(x+'-'+y);
            }
        }
    }
    
    console.log("combo group: " + aryChains);
    
    var combo_n = 0;
    for ( var i = 0; i < aryChains.length; i++){
        if (!isChecked(aryChk, aryChains[i])){
            aryChk.push(aryChains[i]);
            aryCombo[combo_n] = new Array();
            aryCombo[combo_n].push(aryChains[i]); //combo head
            var ap = aryChains[i].split('-');
            var x = parseInt(ap[0]);
            var y = parseInt(ap[1]);
            var rx = flagMatrix[x][y].repeatX;
            var ry = flagMatrix[x][y].repeatY;
            
            if (rx >= 2){
                var ofs_x = rx - parseInt(flagMatrix[x][y].xn);
                x = x - ofs_x;
                for (var a = 0; a <= rx; ++a){
                    if (!isChecked(aryChk, (x + a) + '-' + y)){
                        aryChk.push((x + a)+ '-' +y);
                        aryCombo[combo_n].push((x+a)+'-'+y);
                        var sry = flagMatrix[x+a][y].repeatY;
                        var syn = flagMatrix[x+a][y].yn;
                        if (sry > 1){
                            var ofs_y = sry - syn;
                            var sy = y-ofs_y;
                            for (var sb=0; sb<=sry; sb++){
                                if (!isChecked(aryChk, (x+a)+'-'+(sy+sb))){
                                    aryChk.push((x+a)+'-'+(sy+sb));
                                    aryCombo[combo_n].push((x+a)+'-'+(sy+sb));
                                }
                            }
                        }
                    }
                }
            }
            
            if (ry >= 2 ){
                var ofs_y = ry - parseInt(flagMatrix[x][y].yn);
                y = y-ofs_y;
                for (var b=0; b<=ry; b++){
                    if (!isChecked(aryChk, x+'-'+(y+b))){
                        aryChk.push(x+'-'+(y+b));
                        aryCombo[combo_n].push(x+'-'+(y+b));
                        var srx = flagMatrix[x][y+b].repeatX;
                        var sxn = flagMatrix[x][y+b].xn;
                        if (srx > 1){
                            var ofs_x = srx - sxn;
                            var sx = x- ofs_x;
                            for (var sa=0; sa<=srx; sa++){
                                if (!isChecked(aryChk, (sx+sa)+'-'+(y+b))){
                                    aryChk.push((sx+sa)+'-'+(y+b));
                                    aryCombo[combo_n].push((sx+sa)+'-'+(y+b));
                                }
                            }
                        }
                    }
                }
            }
            combo_n++;
        }
        
    }
    console.log("array of combo: " + aryCombo);
    
    //走訪combo chain
    for ( var d = 0; d < aryCombo.length; d++){
        for (var e = 0; e < aryCombo[d].length; e++){
            $('#'+aryCombo[d][e]).addClass('c'+d);
            var aryP = aryCombo[d][e].split('-');
            var x = aryP[0];
            var y = aryP[1];
            
        }
        
        $('#combo').val(++combo_cnt);
    }
    
    for ( x = 0; x < dim_x; x++) {
        for ( y = 0; y < dim_y; y++) {
            if (flagMatrix[x][y].repeatX > 1 || flagMatrix[x][y].repeatY > 1) {                
                $('#'+x+'-'+y).animate({'opacity':0.2}, gone_speed, function(){
                    $(this).addClass('gone').attr('data-gone', '1');
                    //$('#'+x+'-'+y).html(flagMatrix[x][y].repeatX+':'+flagMatrix[x][y].repeatY);
                });
                flag = true;
            }
            //$('#'+x+'-'+y).html(flagMatrix[x][y].repeatX+':'+flagMatrix[x][y].repeatY+'<br>('+flagMatrix[x][y].clr+') ['+flagMatrix[x][y].xn+'.'+flagMatrix[x][y].yn+']');
        }
    }
    $( ".tile" ).promise().done(function() {
        if (flag){
            $('.tile').css('opacity',1);
            fallNewTiles();
            updateColorMatrix();
            updateColorDensityScoreMatrix();
        }
    });
}

                          
var markChain = function(aryChk, id){
    if (!isChecked(aryChk, id)){
        aryChk.push(id);
        var ary_pos = id.split('-');
        var x = parseInt(ary_pos[0]);
        var y = parseInt(ary_pos[1]);
        var p1,p2,p3,p4;
        alert(id);
        if (x>=1 && flagMatrix[x][y].clr == flagMatrix[(x-1)][y].clr){
            if (markChain(aryChk, (x-1)+'-'+y)){
                p1 = true;
            }else{
                return true;
            }
        }
        if (flagMatrix[x][y].clr == flagMatrix[(x+1)][y].clr){
            if (markChain(aryChk, (x+1)+'-'+y)){
                p2 = true;
            }else{
                return true;
            }
        }
        if (y>=1 && flagMatrix[x][y].clr == flagMatrix[(x)][y-1].clr){
            if (markChain(aryChk, x+'-'+(y-1))){
                p3 = true;
            }else{
                return true;
            }
        }
        if (flagMatrix[x][y].clr == flagMatrix[(x)][y+1].clr){
            if (markChain(aryChk, x+'-'+(y+1))){
                p4 = true;
            }else{
                return true;
            }
        }
        if (p1 && p2 && p3 && p4){
            return true;
        }else{
            return false;
        }
    }else{
        return true;
    }

}

var isChecked = function(aryChk, id){
    for (var s = 0; s < aryChk.length; s++) {
		var thisEntry = aryChk[s].toString();
		if (thisEntry == id) {
			return true;
        }
	}
    return false;
}

//交換珠子
function tileExchange(oid,nid){
    if (oid!=nid && 
        ( $('#'+oid).attr('data-gone')=='1' || $('#'+nid).attr('data-gone')=='1' ) && 
        $('#'+oid).not(':animated') || $('#'+nid).not(':animated') ){
        var pos_o = oid.split("-");
        var pos_n = nid.split("-");
        var ox = pos_o[0]*tile_w;
        var oy = pos_o[1]*tile_h;
        var nx = pos_n[0]*tile_w;
        var ny = pos_n[1]*tile_h;

        $('#'+oid).animate({'top':ny, 'left':nx}, {'duration':grav_speed});
        //$('#'+oid).offset({top:ny, left:nx});
        $('#'+nid).offset({top:oy, left:ox});
        
        $('#'+oid).attr('name',oid);
        $('#'+nid).attr('name',nid);
        
        $('#'+oid).attr('id',nid);
        $('div[name='+nid+']').attr('id',oid);
        
        $('#'+oid).attr('name','');
        $('#'+nid).attr('name','');
    }
}

//自然落珠+天降新珠
function fallNewTiles() {
    console.log('New tiles fall down.');
    //計算被消除的珠子產生的hole有多少，再把上方的珠子和被消除的珠子交換位置
    for ( x = 0; x < dim_x; x++) {
        var hole = 0;
        for ( y = dim_y - 1; y >= 0; y--) {
            if ('1' == $('#'+x+'-'+y).attr('data-gone')) {
                hole++;
            } 
            else {
                var oldPos = x+'-'+y;
                var newPos = x+'-'+(y+hole);
                tileExchange(oldPos, newPos);
            }
        }
    }
    // 讓被消除掉的珠子重生
    $('.tile[data-gone=1]').each(function(){
        //隨機取色珠的母體 (暗珠:16/20)
        var clrs = [
            'r','g','b','p','y',
            //'p','p','p','p','p',
            //'p','p','p','p','p',
            //'p','p','p','p','p'
        ];
        var clr = pickRandColor(clrs);
        $(this).removeClass('r g b p y gone');
        $(this).addClass(clr);
        $(this).attr('data-clr',clr);
        
        $(this).removeAttr('data-gone');
        var oset = $(this).offset();
        var ol = oset.left;
        var ot = oset.top;
        $(this).css('z-index',999);
        $(this).offset({top:ot-300});
        $(this).animate({'top':ot, 'left':ol}, sky_speed);
    });
    
    setTimeout(makeChain, sky_speed + 100);
}