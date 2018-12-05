/* ------------------------------------------------------------------------------
*
*  # PM.DO Project Center
*
*  Specific JS code additions for Project Center page
*
*  Version: 1.0
*  Latest update: Feb 15, 2018
*
* ---------------------------------------------------------------------------- */

$(function() {


    // Table setup
    // ------------------------------

    // Setting datatable defaults
    $.extend( $.fn.dataTable.defaults, {
        autoWidth: false,
        columnDefs: [{ 
            orderable: false,
            // width: '50px',
            targets: [ 0 ]
        },
        {
            orderable: false,
            targets: [ 6 ] 
        }],
        "order": [
            [0, null]
        ],//第一列排序图标改为默认
        dom: '<"datatable-scroll-wrap"t><"datatable-footer length-left"ilp>', 
        language: {
            lengthMenu: '<span>每页显示：</span> _MENU_ ',
            paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' },
            info: '第 _START_ 至 _END_ 项，共 _TOTAL_ 项',
            zeroRecords: "没有找到匹配的记录项",
        },
        drawCallback: function () {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
        },
        preDrawCallback: function() {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
        },
    });
    
    // Styled checkboxes/radios
	$('.styled').uniform({
		radioClass: 'choice'
	});
    
    //checkbox全选
    $("#checkAll").on("click", function () {
        if ($(this).prop("checked") === true) {
            $("input[name='checkList']").prop("checked", $(this).prop("checked"));
            $('.datatable-proj-center tbody tr').addClass('selected');
        } else {
            $("input[name='checkList']").prop("checked", false);
            $('.datatable-proj-center tbody tr').removeClass('selected');
        }
    });
    
    //checkbox 单选
    $('#datatable-proj-center tbody').on('click', 'tr input[name="checkList"]', function () {
        var $tr = $(this).parents('tr');
        $tr.toggleClass('selected');
        var $tmp = $('[name=checkList]:checkbox');
        $('#checkAll').prop('checked', $tmp.length == $tmp.filter(':checked').length);

    });

    // Project Center Table with Highlighting rows and columns on mouseover
    var lastIdx = null;
    var table = $('.datatable-proj-center').DataTable();
     
    $('.datatable-proj-center tbody').on('mouseover', 'td', function() {
        var colIdx = table.cell(this).index().column;

        if (colIdx !== lastIdx) {
            $(table.cells().nodes()).removeClass('active');
            $(table.column(colIdx).nodes()).addClass('active');
        }
    }).on('mouseleave', function() {
        $(table.cells().nodes()).removeClass('active');
    });


    // External table additions
    // ------------------------------

    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });
    
});
