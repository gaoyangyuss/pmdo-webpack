/*common css*/
import "../../assets/css/bootstrap.css";
import "../../assets/css/core.css";
import "../../assets/css/components.css";
import "../../assets/css/colors.css";
import "../../assets/css/icons/icomoon/styles.css";
import "../../assets/css/icons/fontawesome/styles.min.css";
import "../../assets/emotions/common.css";
import "../../assets/commentImg/commentImg.css";
import "../../css/common.css";
import "../../css/list_pages.css";

/*common js*/
import "pace-js";
import "jquery";
import "bootstrap";
import "block-ui";
import "jquery.nicescroll";
import "../../assets/limitless/layout_fixed_custom.js";
import "../../assets/limitless/app.js";
import {settingModalZIndex, init} from "../common/common.js";
import "../common/sas.js";

/*page js*/
import "jquery-ui";
import "datatables";
import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';
import "jquery-uniform";
import "select2";
import "moment";
import "daterangepicker";

$(function (){
	
	initPage();
	initPageData();
	initPageEvent();

});


//define global variable
var col_show_list = new Array();
var tree = $("#km_center_tree");
var table = "km_center_table";
var fancytree_h = $(window).height() - 206;
var table_h = $(window).height() - 292;

function initPage(){

	//init checkbox
	$(".styled, .multiselect-container input").uniform({
        radioClass: 'choice'
    });

	//init daterangepicker
	$('.daterange-basic').daterangepicker({
        applyClass: 'bg-slate-600',
        cancelClass: 'btn-default',
        locale : {    
                    daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
                    monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                            '七月', '八月', '九月', '十月', '十一月', '十二月' ], 
                    firstDay : 1  
                }  
	});

	//init Default Select2
    $('.select').select2({
        minimumResultsForSearch: Infinity
	});
	
	 //set fancytree height	
	 $(".fancytree-container").css("height",fancytree_h);
	
}//initPage end

function initTree(data){
	//init fancytree with filter start
	tree.fancytree({
		tooltip: true,
		extensions: ["filter"],
		quicksearch: true,
		source: data.tree,
		filter: {
			autoApply: true,   // Re-apply last filter if lazy data is loaded
			autoExpand: false, // Expand all branches that contain matches while filtered
			counter: true,     // Show a badge with number of matching child nodes near parent icons
			fuzzy: false,      // Match single characters in order, e.g. 'fb' will match 'FooBar'
			hideExpandedCounter: true,  // Hide counter badge if parent is expanded
			hideExpanders: false,       // Hide expanders if all child nodes are hidden by filter
			highlight: true,   // Highlight matches by wrapping inside <mark> tags
			leavesOnly: false, // Match end nodes only
			nodata: true,      // Display a 'no data' status node if result is empty
			mode: "dimm"       // Grayout unmatched nodes (pass "hide" to remove unmatched node instead)
		}
	});
	//init fancytree with filter end

	//fancytree filter start
	var tree_filter = tree.fancytree("getTree");
	$("input[name=search]").keyup(function(e){
		var n,
		tree_filter = $.ui.fancytree.getTree(),
		args = "autoApply autoExpand fuzzy hideExpanders highlight leavesOnly nodata".split(" "),
		opts = {},
		filterFunc = $("#branchMode").is(":checked") ? tree_filter.filterBranches : tree_filter.filterNodes,
		match = $(this).val();

	  $.each(args, function(i, o) {
		opts[o] = $("#" + o).is(":checked");
	  });
	  opts.mode = $("#hideMode").is(":checked") ? "hide" : "dimm";

	  /*if(e && e.which === $.ui.keyCode.ESCAPE || $.trim(match) === ""){
		$("button#btnResetSearch").click();
		return;
	  }*/
	  if($("#regex").is(":checked")) {
		// Pass function to perform match
		n = filterFunc.call(tree_filter, function(node) {
		  return new RegExp(match, "i").test(node.title);
		}, opts);
	  } else {
		// Pass a string to perform case insensitive matching
		n = filterFunc.call(tree_filter, match, opts);
	  }
	  $("button#btnResetSearch").attr("disabled", false);
	  /*$("span#matches").text("(" + n + " matches)");*/
	}).focus();

	$("button#btnResetSearch").click(function(e){
	  $("input[name=search]").val("");
	  /*$("span#matches").text("");*/
	  tree_filter.clearFilter();
	}).attr("disabled", true);

	$("fieldset input:checkbox").change(function(e){
		var id = $(this).attr("id"),
		  flag = $(this).is(":checked");

		// Some options can only be set with general filter options (not method args):
		switch( id ){
		case "counter":
		case "hideExpandedCounter":
		  tree_filter.options.filter[id] = flag;
		  break;
		}
		tree_filter.clearFilter();
		$("input[name=search]").keyup();
	});
	//fancytree filter end
}

function initTable(data){
	var data = data.table;

	//init datatable start
	$("#"+table).DataTable( {
		data: data,
        columns: [
            {
				"render" : function(data, type, row) {
					return "<input type='checkbox' name='checkList' class='styled'>"
				}
			},
            {
				"data" : "name"
			},
			{
				"data" : "type"
			},
			{
				"data" : "size"
			},
			{
				"data" : "version"
			},
			{
				"data" : "latest"
			},
			{
				"render" : function(data, type, row) {
					return "<ul class='icons-list'>"+
					"<li data-popup='tooltip' title='预览' data-container='body'><a href='#'><i class='icon-file-eye2 text-primary-700'></i></a></li>"+
					"<li data-popup='tooltip' title='下载' data-container='body'><a href='#'><i class='icon-file-download2 text-purple'></i></a></li>"+
				"</ul>"
				}
			}
		],
		// 创建行回调
		"createdRow" : function(row, data, index) {
			$(row).addClass("km-center-detail-btn");	
		},
        "scrollY": table_h,
        "scrollX": true,
        dom: '<"datatable-scroll-wrap"t><"datatable-footer length-left"ilp>',
        //dom: '<"datatable-header length-left"lp><"datatable-scroll"t><"datatable-footer info-right"fi>',
        language: {
            // search: '<span>搜索:</span> _INPUT_',
            search: '_INPUT_',
            searchPlaceholder: '项目搜索...',
            lengthMenu: '<span>每页显示：</span> _MENU_ ',
            paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' },
            info: '第 _START_ 至 _END_ 项，共 _TOTAL_ 项',
            zeroRecords: "没有找到匹配的记录项",
        },
        "order" : [ 1, "desc" ],
        columnDefs: [{ 
            orderable: false,
            targets : [ 0, 6 ]
        }],
       /* buttons: [
            {
                extend: 'colvis',
                className: 'btn btn-default',
                text: '列'
            }
        ],*/
        drawCallback: function () {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
        	
        	//checkbox
    		$(".styled, .multiselect-container input").uniform({
		        radioClass: 'choice'
		    });

    		//colvis
		    if(col_show_list.length != 0) {
		    	for(var n=0; n<col_show_list.length; n++) {
		    		$("#"+table+"_wrapper tr").each(function (e) {
		    			$(this).find("th").eq(col_show_list[n]).toggle();
					  	$(this).find("td").eq(col_show_list[n]).toggle();
				    });
		    	}
		    }
        },
        preDrawCallback: function() {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
        	
        	//checkbox
    		$(".styled, .multiselect-container input").uniform({
		        radioClass: 'choice'
		    });

    		//colvis
            if(col_show_list.length != 0) {
		    	for(var n=0; n<col_show_list.length; n++) {
		    		$("#"+table+"_wrapper tr").each(function (e) {
		    			$(this).find("th").eq(col_show_list[n]).toggle();
					  	$(this).find("td").eq(col_show_list[n]).toggle();
				    });
		    	}
		    }
        }
        
    } );
    //init datatable start
}

function initPageData(){

	$.ajax({
        /*mock数据*/
        url: 'http://localhost:8099/api/getKMCenter',
        dataType: 'json',
        success: function (data) {
           /*console.log(data);*/
           console.log(
                JSON.stringify(data, null, 4)
			); 
			
			initTree(data);
			initTable(data);
			
        }
    });

}//initPageData end

function initPageEvent(){
	//table colvis start
	/*$(".colvis-btn").click(function(){
		var block = $("#knowledge_file_table_wrapper");
		$(block).block({ 
			message: '',
			overlayCSS: {
				backgroundColor: '#ddd',
				opacity: 0.5,
				cursor: 'wait'
			},
			css: {
				border: 0,
				padding: 0,
				backgroundColor: 'transparent'
			}
		});
	});*/
	$(".colvis-menu li").click(function(event){
		event.stopPropagation();
		var col_num = $(this).toggleClass("active").attr("id");
		if($(this).hasClass("active")){
			col_show_list.splice($.inArray(col_num,col_show_list));
		}else{
			col_show_list.push(col_num);
		}
		$("#"+table+"_wrapper tr").each(function (e) {
			$(this).find("th").eq(col_num).toggle();
			$(this).find("td").eq(col_num).toggle();
		});
	});
	//table colvis start end

	//切换侧边栏后设置表头宽度
	$(".sidebar-secondary-hide").on("click",function(){
		$(".dataTables_scrollHeadInner").css("width","100%");
		$(".dataTables_scrollHeadInner .table").css("width","100%");
	});

	//取消复选框弹窗
	$(".table tr").each(function(){
		$(this).find("td:first").click(function(event){
			event.stopPropagation();
		})
	});

	//全选
	$("."+table).find("#checkAll").on("click",function(event){
		if ($(this).prop("checked")) {
				$("."+table+" tbody").find(".checker > span").addClass("checked");
			}else {
				$("."+table+" tbody").find(".checker > span").removeClass("checked");
			}
	});
	
	//ajax modal
	/*加载知识文档详情弹窗*/
	$(document).on("click", ".km-center-detail-btn",  function(){
		$("#km_center_detail_modal").modal('show');
		$.get(require("../../async/km/km_center_detail_modal.html"), function(result){
			$("#km_center_detail_modal").html(result);
			$.ajax({ url:"./async/js/km_center_detail_modal.js",dataType:"script"});
		});
	});

	/*加载新增树节点弹窗*/
	$(document).on("click", ".km-tree-add-btn", function(){
		$("#km_tree_add_modal").modal('show');
		$.get(require("../../async/km/km_tree_add_modal.html"), function(result){
			$("#km_tree_add_modal").html(result);
		});
	});
}//initPageEvent end
