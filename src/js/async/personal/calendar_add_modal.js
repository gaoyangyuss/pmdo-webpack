$(function(){

    initCalendarAddModal();

});

function initCalendarAddModal(){
    //init checkbox
    $(".styled, .multiselect-container input").uniform({
        radioClass: 'choice'
    });

    // Primary
    $(".control-primary").uniform({
        radioClass: 'choice',
        wrapperClass: 'border-primary-600 text-primary-800'
    });

    // Danger
    $(".control-danger").uniform({
        radioClass: 'choice',
        wrapperClass: 'border-danger-600 text-danger-800'
    });

    // Success
    $(".control-success").uniform({
        radioClass: 'choice',
        wrapperClass: 'border-success-600 text-success-800'
    });

    // Warning
    $(".control-warning").uniform({
        radioClass: 'choice',
        wrapperClass: 'border-warning-600 text-warning-800'
    });

    // Info
    $(".control-info").uniform({
        radioClass: 'choice',
        wrapperClass: 'border-info-600 text-info-800'
    });

    // Custom color
    $(".control-custom").uniform({
        radioClass: 'choice',
        wrapperClass: 'border-indigo-600 text-indigo-800'
    });

    // Single picker
    var datePicker = $('.daterange-single').daterangepicker({ 
        singleDatePicker: true,
        timePicker: true,
        timePicker24Hour: true,
        locale: {
            format: 'YYYY-MM-DD HH:mm'
        }
    });

    //设置全天时间
    $(".all-day").click(function(){
        if ($(this).prop("checked")){
            $('.daterange-single').daterangepicker({ 
                singleDatePicker: true,
                timePicker24Hour: true,
                locale: {
                    format: 'YYYY-MM-DD'
                }
            });
        }else {
            $('.daterange-single').daterangepicker({ 
                singleDatePicker: true,
                timePicker: true,
                timePicker24Hour: true,
                locale: {
                    format: 'YYYY-MM-DD HH:mm'
                }
            });
        };
    });

    //init Default Select2
    $('.select, .hourselect, .minuteselect').select2({
        minimumResultsForSearch: Infinity
    });

    //init Select2 with search
    $('.select-search').select2();

    // Colored switches
    // var primary_1 = document.querySelector('.switchery-primary-1');
    // new Switchery(primary_1, { color: '#2196F3' });
    
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
    elems.forEach(function(html) {
    var switchery = new Switchery(html, { color: '#2196F3' });
    });

    $.ajax({
        //url: 'http://localhost:8090/api/getCalendar',
        url: 'http://www.test.com:3000/api/getCalendar',
        dataType: 'json',
        success: function (data) { 
            var data = data.calendarAddForm;
            $('#calTitle').val(data[0].title);
            $('#calDetail').val(data[0].detail);
            $('#calStart').val(data[0].start);
            $('#calEnd').val(data[0].end);
            if(data[0].isWholeDay=="on"){
              $('#calWholeDay').click();
            };
            var selectPersons = data.selectPersons;
            if(selectPersons){
                var strGroups = "";
                for(var i=0; i<selectPersons.length; i++){
                    var personsName = selectPersons[i].personsName;
                    var strOptions = "";
                    for(var j=0; j<personsName.length; j++){
                        strOptions += '<option value="'+personsName[j]+'">'+personsName[j]+'</option>'
                    }
                    strGroups += '<optgroup label="'+selectPersons[i].groupLabel+'">'+strOptions+'</optgroup>'
                }
                $('#calJoinPersons').html(strGroups);
            }
            $('#calJoinPersons').val(data[0].joinPersons).change();
            $('#calAddress').val(data[0].address);
            $('#calOpenLevel').val(data[0].openLevel).change();
            $('[value="'+data[0].color+'"]').parent("span").addClass("checked");
        }
    });

    //提交新建/编辑日程表单
    $("#calendarAddSave").click(function(){
        console.log($("#calendarAddForm").serializeArray());
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            //url: 'http://localhost:8090/api/postCalendar',
            url: 'http://www.test.com:3000/api/postCalendar',
            data: $("#calendarAddForm").serializeArray(),
            success: function (data) {
                alert("成功");
            },
            error: function(data) {
                alert("报错");
            }
        });
    });
}//initCalendarAddModal end