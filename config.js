var def_clrs = ['r','g','b','p','y']; //紅,綠,藍,紫,黃
var dim_x = 6; //盤面x顆數
var dim_y = 5; //盤面y顆數
var tile_w = 60; //每塊寬px
var tile_h = 80; //每塊高px
var tile_b = 0.5; //每塊框線px

var sky_speed = 400; // 天降珠的速度
var grav_speed = 400; // 自然落珠的速度
var move_speed = 40; // 移動珠子的速度
var gone_speed = 200; // 珠子消除的速度

var combo_cnt;

// init a matrix [dim_x][dim_y] to record the color of each element 
var colorMatrix = [];
for (var i = 0; i < dim_x ; ++i){
    colorMatrix[i] = new Array(dim_y);
}

//隨機挑色
var pickRandColor = function(base){
    if (base=='' || base == undefined){
        base = def_clrs;  
    }
    var r = Math.floor(Math.random() * base.length);
    return base[r];
}

//初始化盤面
var init = function(){
    //盤面大小
    $('.demo').css('width', dim_x*tile_w).css('height', dim_y*tile_h);
    //產生珠子並指定位置、顏色
    for(var i=0; i < dim_y; i++){
        for(var j=0; j < dim_x; j++){
            var clr = pickRandColor();
            colorMatrix[j][i] = clr;
            $('.demo').append('<div id="'+j+'-'+i+'" data-clr="'+clr+'" class="'+clr+' tile" style="left:'+j*tile_w+'px; top:'+i*tile_h+'px;"></div>');
        }
    }
    //設定所有珠子的尺寸及框線
    $('.tile').css('width', tile_w-tile_b*2);
    $('.tile').css('height', tile_h-tile_b*2);
    $('.tile').css('border', tile_b+'px solid #333');
    combo_cnt=0;
}

// tiles configuration
$(function(){
    $(".tile").draggable({
        grid: [parseInt(tile_w), parseInt(tile_h)], //拖曳時移動單位(以一個珠子的尺寸為移動單位)
        drag: function(e, ui){
            //console.log("dragging!");
            combo_cnt=0;
            $('#combo').val(combo_cnt);
            $(this).addClass('sel'); //拖曳中珠子的樣式
            selLeft = Math.abs(ui.offset.left);
            selTop = ui.offset.top;
            pos_x = selLeft/tile_w;
            pos_y = selTop/tile_h;
            var cur_n = pos_x+'-'+pos_y; //拖曳中珠子的位置 "x-y"，與ID相同
            //目標位置與ID不同時，表示被移動了
            if (cur_n !== $(this).attr('id')){
                var ori = $(this).attr('id'); //原本的ID(即原本的位置)
                moveTo(cur_n, ori); //將目標位置的珠子移到原本拖曳中珠子的位置
                $(this).attr('id', cur_n); //拖曳中珠子標示為新位罝ID
                exchangeColorsInMatrix(cur_n, ori);
            }
        },
        stop: function(e, ui){
            $(this).removeClass('sel');//停止拖曳就取消拖曳中樣式
            makeChain();//開始計算要消除的Chain
        },
        containment: ".demo", //限制珠子的移動範圍
    });
});