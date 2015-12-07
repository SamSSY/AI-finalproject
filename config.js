var def_clrs = ['r','g','b','p','y']; //紅,綠,藍,紫,黃
var dim_x = 6; //盤面x顆數
var dim_y = 5; //盤面y顆數
var tile_w = 60; //每塊寬px
var tile_h = 80; //每塊高px
var tile_b = 1; //每塊框線px

var sky_speed = 400; // 天降珠的速度
var grav_speed = 400; // 自然落珠的速度
var move_speed = 40; // 移動珠子的速度
var gone_speed = 200; // 珠子消除的速度

var combo_cnt;

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
    for(i=0; i<dim_y; i++){
        for(j=0; j<dim_x; j++){
            var clr = pickRandColor();
            $('.demo').append('<div id="'+j+'-'+i+'" data-clr="'+clr+'" class="'+clr+' tile" style="left:'+j*tile_w+'px; top:'+i*tile_h+'px;"></div>');
        }
    }
    //設定所有珠子的尺寸及框線
    $('.tile').css('width', tile_w-tile_b*2);
    $('.tile').css('height', tile_h-tile_b*2);
    $('.tile').css('border', tile_b+'px solid #333');
    combo_cnt=0;
}