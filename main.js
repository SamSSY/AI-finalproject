$(function() {
    init();

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
                //console.log("original position is: " + ori);
                //console.log("current position is: " + cur_n);
                moveTo(cur_n, ori); //將目標位置的珠子移到原本拖曳中珠子的位置
                $(this).attr('id', cur_n); //拖曳中珠子標示為新位罝ID
            }
        },
        stop: function(e, ui){
            $(this).removeClass('sel');//停止拖曳就取消拖曳中樣式
            makeChain();//開始計算要消除的Chain
        },
        containment: ".demo", //限制珠子的移動範圍
    });
    
    testExchange();
});