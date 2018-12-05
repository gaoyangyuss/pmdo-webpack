$(function(){

    initCalendarEventAddModal();

})

function initCalendarEventAddModal(){
    // Color palette
    /*var demoPalette = [
        ["#EF5350","#FF7043","#546E7A","#5C6BC0","#26A69A"]
    ]*/

    // Display palette only
    /*$(".colorpicker-palette-only").spectrum({
        showPalette: true,
        showPaletteOnly: true,
        palette: demoPalette
    });*/

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

    //提交新建事件表单
    $("#eventAddSave").click(function(){
        console.log($("#eventAddForm").serializeArray());
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            //url: 'http://localhost:8090/api/postCalendar',
            url: 'http://www.test.com:3000/api/postCalendar',
            data: $("#eventAddForm").serializeArray(),
            success: function (data) {
                alert("成功");
            },
            error: function(data) {
                alert("报错");
            }
        });
    });

}//initCalendarEventAddModal