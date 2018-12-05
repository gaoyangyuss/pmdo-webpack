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

/*page css*/
import "../../css/calendar.css";

/*common js*/
import "pace-js";
import "jquery";
import "bootstrap";
import "block-ui";
import "jquery.nicescroll";
import "../../assets/limitless/layout_fixed_custom.js";
import "../../assets/limitless/app.js";
import "../common/common.js";

/*page js*/
import "../../assets/jquery-ui-1.11.4/interaction.js";
import "jquery-uniform";
import "select2";
const Switchery = require("../../assets/switchery/switchery.js");
import "moment";
import "daterangepicker";
import "fullcalendar";

$(function(){

    initPage();

})

function initPersons(data){
    var html = '';
    var str = '';
    var data = data.persons;
    for(var i=0; i<data.length; i++) {
        var first = data[i].name.slice(0,1);
        str += '<tr>'+html+
                '<td>'+html+
                  '<input type="checkbox" name="checkList" class="styled">'+html+
                '</td>'+html+
                '<td><span class="label label-default label-icon">'+first+'</span></td>'+html+
                '<td>'+data[i].type+'</td>'+html+
              '</tr>';
    }
    $("#persons_table tbody").html(str);
    //init checkbox
    $(".styled, .multiselect-container input").uniform({
        radioClass: 'choice'
    });
}

function initEvents(data){
    var html = '',
    str = '',
    data = data.events;
    for(var i=0; i<data.length; i++) {
        str += '<li class="fc-event" data-color="'+data[i].color+'">'+html+
                    '<a><span>'+data[i].content+'</span><i class="icon-trash"></i><i class="icon-pencil5"></i></a>'+html+
                    '<div class="input-group input-group-xs">'+html+
                        '<input type="text" class="form-control" value="'+data[i].content+'">'+html+
                        '<span class="input-group-btn">'+html+
                        '<button class="btn btn-xs" type="button"><i class="icon-x"></i></button>'+html+
                        '</span>'+html+
                    '</div>'+html+
                '</li>';
    }
    $("#external-events .marklist").html(str);

    // Initialize the external events
    $('#external-events .fc-event').each(function() {

        var _color = $(this).data('color');
        var _value = $(this).find('input').val();

        // Different colors for events
        $(this).css({'backgroundColor': _color, 'borderColor': _color});
        $(this).find('input').css({'backgroundColor': _color});
        $(this).find('button').css({'backgroundColor': _color, 'borderColor': _color});

        // Store data so the calendar knows to render an event upon drop
        $(this).data('event', {
            title: $.trim($(this).find("span").html()), // use the element's text as the event title
            color: $(this).data('color'),
            stick: true // maintain when user navigates (see docs on the renderEvent method)
        });
        // Make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 999,
            revert: true, // will cause the event to go back to its
            revertDuration: 0, // original position after the drag
            scroll: false,
            appendTo: 'body',
            helper: function helper() {
              return '<span class="helper" style="color:#fff;background-color:'+_color+'";>'+_value+'</span>';
            }
        });
    });
}

function initCalendarEvents(data){
    var calendarEvents = data.calendarEvents;
    var calendarHeight=window.innerHeight-175;

    // Initialize the calendar
    $('.fullcalendar-external').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        defaultDate: '2014-11-12',
        events: calendarEvents,
        locale: 'zh-cn',
        height:calendarHeight,
        droppable: true, // this allows things to be dropped onto the calendar
        drop: function() {
        /*if ($('#drop-remove').is(':checked')) { // is the "remove after drop" checkbox checked?
            $(this).remove(); // if so, remove the element from the "Draggable Events" list
            }*/
        },
        eventClick: function() {
            $('#calendar_add_modal').modal('show');
            $.get(require("../../async/personal/calendar_add_modal.html"),function(result){
                $("#calendar_add_modal").html(result);
            });
            $.ajax({ url:"./async/js/calendar_add_modal.js",dataType: "script"});
        }
    });
}

function initPage(){
    $.ajax({
        /*mock数据*/
        url: 'http://localhost:8099/api/getCalendar',
        dataType: 'json',
        success: function (data) {
           /*console.log(data);*/
           console.log(
                JSON.stringify(data, null, 4)
            ); 
           initPersons(data);
           initEvents(data);
           initCalendarEvents(data);
        }
    });

    //init Default Select2
    $('.select').select2({
        minimumResultsForSearch: Infinity
    });

    //Colored switches
    // var primary_0 = document.querySelector('.switchery-primary-0');
    // new Switchery(primary_0, { color: '#2196F3' });
    
    // var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
    // elems.forEach(function(html) {
    // var switchery = new Switchery(html, {color: '#2196F3', size: 'small'});
    // });

    //init checkbox
    $(".styled, .multiselect-container input").uniform({
        radioClass: 'choice'
    });

    //设置日程查看器和常用事件高度
    var _h = $(window).height() - 320;
    var h = _h/2;

    $(".table-wrap, .fc-events-container").css("height",h);

    $(document).on("click",".marklist .icon-pencil5",function(){
        $(this).parents("a").hide();
        $(this).parents("a").next(".input-group").css("display","table");
        var _input = $(this).parents("a").next(".input-group").find("input");  
        _input.focusEnd();
    });

    $(document).on("keyup",".marklist input",function(e){
    if(e.which==13) {
        var markstr = $(this).val();
        if(markstr!="") {
        $(this).parents(".input-group").prev("a").find("span").text(markstr);
        }
        $(this).parents(".input-group").css("display","none");
        $(this).parents(".input-group").prev("a").show();
    }
    });

    $(document).on("click",".marklist .icon-x",function(){
        $(this).parents(".input-group").css("display","none");
        $(this).parents(".input-group").prev("a").show();
    });

    $(document).on("click",".marklist .icon-trash",function(){
        $(this).parents("li").remove();
    });

    //ajax modal
    /*加载添加日程弹窗*/
    $('.calendar-add-btn').click(function(){
        $("#calendar_add_modal").modal('show');
        $.get(require("../../async/personal/calendar_add_modal.html"), function(result){
            $("#calendar_add_modal").html(result);
            $.ajax({ url:"./async/js/calendar_add_modal.js",dataType:"script"});
        });
        // require.ensure([],function(){
        //     require("../personal/calendar_add_modal.js");
        // },"calendar_add_modal");
    });

    /*加载添加常用事件弹窗*/
    $('.calendar-event-add-btn').click(function(){
        $("#calendar_event_add_modal").modal('show');
        $.ajax({
                type: "get",
                url: require("../../async/personal/calendar_event_add_modal.html"),
                dataType:"html",
                success: function (data) { 
                    $("#calendar_event_add_modal").html(data);
                    $.ajax({ url:"./async/js/calendar_event_add_modal.js", dataType:"script"});
                }
            });
        // require.ensure([],function(){
        //     require("../personal/calendar_event_add_modal.js");
        // },"calendar_event_add_modal");
    });
}
