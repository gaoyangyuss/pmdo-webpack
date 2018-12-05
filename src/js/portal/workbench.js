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

/*page css*/
import "../../assets/css/icons/weather-icons/styles.css";

/*common js*/
import "pace-js";
import "jquery";
import "bootstrap";
import "block-ui";
import "jquery.nicescroll";
import "../../assets/limitless/layout_fixed_custom.js";
import "../../assets/limitless/app.js";
import "../common/common.js";
import "../common/sas.js";

/*page js*/
import "moment";
import "fullcalendar";

$(function(){
	// Event background colors
    var eventBackgroundColors = [
        {
            title: 'All Day Event',
            start: '2014-11-01'
        },
        {
            title: 'Long Event',
            start: '2014-11-07',
            end: '2014-11-10',
            color: '#DCEDC8',
            rendering: 'background'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2014-11-06T16:00:00'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2014-11-16T16:00:00'
        },
        {
            title: 'Conference',
            start: '2014-11-11',
            end: '2014-11-13'
        },
        {
            title: 'Meeting',
            start: '2014-11-12T10:30:00',
            end: '2014-11-12T12:30:00'
        },
        {
            title: 'Lunch',
            start: '2014-11-12T12:00:00'
        },
        {
            title: 'Happy Hour',
            start: '2014-11-12T17:30:00'
        },
        {
            title: 'Dinner',
            start: '2014-11-24T20:00:00'
        },
        {
            title: 'Meeting',
            start: '2014-11-03T10:00:00'
        },
        {
            title: 'Birthday Party',
            start: '2014-11-13T07:00:00'
        },
        {
            title: 'Vacation',
            start: '2014-11-27',
            end: '2014-11-30',
            color: '#FFCCBC',
            rendering: 'background'
        }
    ];

    // Set default language
    var initialLocaleCode = 'zh-cn';

    $('.panel-calendar.panel-collapsed').click(function(){
        $('.fullcalendar-background-colors').fullCalendar({
            locale: initialLocaleCode,
            header: {
                left: 'prev,next today',
                center: 'title',
                // right: 'month,agendaWeek,agendaDay,listMonth'
                right: 'month,agendaWeek,listMonth'
            },
            eventLimit: true,
            defaultDate: '2018-11-12',
            editable: true,
            events: eventBackgroundColors
        });
    });

     /*加载编辑sas弹窗*/
     $('.edit-broad-btn').click(function(){
        $.get(require("../../async/common/edit_broad_modal.html"),function(result){
            $("#edit_broad_modal").html(result);
        });
        $("#edit_broad_modal").modal('show');
      });
});