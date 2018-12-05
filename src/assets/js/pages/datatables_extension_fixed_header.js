/* ------------------------------------------------------------------------------
*
*  # Fixed Header extension for Datatables
*
*  Specific JS code additions for datatable_extension_fixed_header.html page
*
*  Version: 1.1
*  Latest update: Jan 5, 2017
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
            targets: [ 5 ]
        }],
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
        drawCallback: function () {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
        },
        preDrawCallback: function() {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
        }
    });


    // Basic initialization
    var table_basic = $('.datatable-header-basic').DataTable({
        fixedHeader: true,
        buttons: {            
        }
    });

    // Basic initialization
    $('.datatable-button-init-basic').DataTable({
        buttons: {
            dom: {
                button: {
                    className: 'btn btn-default'
                }
            },
            buttons: [
                {extend: 'copy'},
                {extend: 'csv'},
                {extend: 'excel'},
                {extend: 'pdf'},
                {extend: 'print'}
            ]
        }
    });
    

    // Header and footer fixed
    var table_footer = $('.datatable-header-footer').DataTable({
        fixedHeader: {
            header: true,
            footer: true
        }
    });


    // Offset
    var table_offset = $('.datatable-header-offset').DataTable({
        fixedHeader: {
            header: true,
            
        }
    });

    // Init offset toggle
    var toggleType = document.querySelector('.toggle-offset');
    var toggleTypeInit = new Switchery(toggleType, { secondaryColor: '#FF7043'});

    // Toggle offset and fixed navbar
    toggleType.onchange = function() {
        if(toggleType.checked) {

            // Toggle necessary body and navbar classes
            $('body').children('.navbar').first().addClass('navbar-fixed-top');
            $('body').addClass('navbar-top');

            // Add offset to all
            table_basic.fixedHeader.headerOffset($('.navbar-fixed-top').height());
            table_footer.fixedHeader.headerOffset($('.navbar-fixed-top').height());
            table_reorder.fixedHeader.headerOffset($('.navbar-fixed-top').height());
            table_offset.fixedHeader.headerOffset($('.navbar-fixed-top').height());
        }
        else {

            // Toggle necessary body and navbar classes
            $('body').children('.navbar').first().removeClass('navbar-fixed-top');
            $('body').removeClass('navbar-top');

            // Remove offset from all
            table_basic.fixedHeader.headerOffset(0);
            table_footer.fixedHeader.headerOffset(0);
            table_reorder.fixedHeader.headerOffset(0);
            table_offset.fixedHeader.headerOffset(0);
        }
    };


    // ColReorder integration
    var table_reorder = $('.datatable-header-reorder').DataTable({
        fixedHeader: true,
        colReorder: true
    });


    // Adjust table header if sidebar toggler is clicked
    $('.sidebar-control').on('click', function() {
        table_basic.fixedHeader.adjust();
        table_footer.fixedHeader.adjust();
        table_offset.fixedHeader.adjust();
        table_reorder.fixedHeader.adjust();
    });


    // External table additions
    // ------------------------------

    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });
        
});
