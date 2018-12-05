$(function (){
	
	initKMCenterDetailModal();

});


function initKMCenterDetailModal(){
	//init Default Select2
    $('.select').select2({
        minimumResultsForSearch: Infinity
    });

    //init Select2 with search
	$('.select-search').select2();

    // Single picker
    var datePicker = $('.daterange-single').daterangepicker({ 
        singleDatePicker: true,
        locale: {  
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                    '七月', '八月', '九月', '十月', '十一月', '十二月' ],
            format: 'YYYY-MM-DD'
        }
    });

    /*加载编辑sas弹窗*/
    $('.edit-broad-btn').click(function(){
        $.get("../async/edit_broad_modal.html",function(result){
            $("#edit_broad_modal").html(result);
        });
        $("#edit_broad_modal").modal('show');
    });

    //设置弹层
    function settingModalZIndex(dialog, beforeDialog){
        var defaultBGIndex = 1040;
        var defaultMDIndex = 1050;
        //获取前面一个元素
        var prev = $("#"+beforeDialog);
        if($(prev).hasClass("in")){
            defaultBGIndex = parseInt($(prev).css("z-index"))+10;
            defaultMDIndex = parseInt(defaultBGIndex)+10;
        }
        $("#"+dialog).css("cssText", "display:block; z-index:"+ defaultMDIndex+"  !important");
        setTimeout(function(){ $(".modal-backdrop").last().css("cssText", "z-index:"+ defaultBGIndex+"  !important");},0);  
    }

    //层弹层层级设置
    $('#edit_broad_modal').on('show.bs.modal', function () {
        settingModalZIndex("edit_broad_modal","km_center_detail_modal");
    });

    //层弹层设置滚动
    $('#edit_broad_modal').on('hidden.bs.modal', function () {
    $('body').addClass('modal-open')
    });
} //initKMCenterDetailModal end


