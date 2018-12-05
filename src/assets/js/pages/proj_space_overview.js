/* ------------------------------------------------------------------------------
*
*  # PM.DO Project Space
*
*  Specific JS code additions for Project Space page
*
*  Version: 1.0
*  Latest update: Feb 15, 2018
*
* ---------------------------------------------------------------------------- */

$(function() {

    // CKEditor for SAS function
    // ------------------------------

    CKEDITOR.replace( 'add-comment', {
        height: '200px',
        removeButtons: 'Subscript,Superscript',
        toolbarGroups: [
            { name: 'styles' },
            { name: 'editing',     groups: [ 'find', 'selection' ] },
            { name: 'basicstyles', groups: [ 'basicstyles' ] },
            { name: 'paragraph',   groups: [ 'list', 'blocks', 'align' ] },
            { name: 'links' },
            { name: 'insert' },
            { name: 'colors' },
            { name: 'tools' },
            { name: 'others' },
            { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] }
        ]
    });    

    // Project Space Confirmation dialog by using bootbox.js
    $('#close_confirm').on('click', function() {
        // bootbox.setLocale("zh_CN");
        // bootbox.confirm("您确定要关闭标签页吗？", function(result) {
        //     if (result === false) {                                             
                                              
        //     } else {
        //         window.close();                          
        //     }
        // });
        bootbox.dialog({
            title: "",
            message: "您确定要关闭该标签页吗？",
            buttons: {
                OK: {
                    label: "确认",
                    className: "btn-primary",
                    callback: function() {
                         window.close();
                    }
                },
                CANCEL: {
                    label: "取消",
                    className: "btn-default",
                    callback: function() {
                    }
                },
            },
            // 同时设置 backdrop 和 onEscape 为 True 点击对话框意外区域取消功能才有效
            backdrop: true,
            onEscape: true,
        });
    });

    $('#cancel_client_confirm').on('click', function() {
        // bootbox.setLocale("zh_CN");
        // bootbox.confirm("您确定要关闭标签页吗？", function(result) {
        //     if (result === false) {                                             
                                              
        //     } else {
        //         window.close();                          
        //     }
        // });
        bootbox.dialog({
            title: "",
            message: "您确定要取消该客户与合同与项目的关联吗？",
            buttons: {
                OK: {
                    label: "确认",
                    className: "btn-primary",
                    callback: function() {
                         window.close();
                    }
                },
                CANCEL: {
                    label: "取消",
                    className: "btn-default",
                    callback: function() {
                    }
                },
            },
            // 同时设置 backdrop 和 onEscape 为 True 点击对话框意外区域取消功能才有效
            backdrop: true,
            onEscape: true,
        });
    });
    
    $('#remove_team_member_confirm').on('click', function() {
        // bootbox.setLocale("zh_CN");
        // bootbox.confirm("您确定要关闭标签页吗？", function(result) {
        //     if (result === false) {                                             
                                              
        //     } else {
        //         window.close();                          
        //     }
        // });
        bootbox.dialog({
            title: "",
            message: "您确定要将该成员从项目团队中移出吗？",
            buttons: {
                OK: {
                    label: "确认",
                    className: "btn-primary",
                    callback: function() {
                         window.close();
                    }
                },
                CANCEL: {
                    label: "取消",
                    className: "btn-default",
                    callback: function() {
                    }
                },
            },
            // 同时设置 backdrop 和 onEscape 为 True 点击对话框意外区域取消功能才有效
            backdrop: true,
            onEscape: true,
        });
    });

        // Animated progress with percentage count
    // ------------------------------

    // Initialize charts
    progressPercentage('#progress_percentage_one', 46, 3, "#eee", "#2196F3", 0.79);
    progressPercentage('#progress_percentage_two', 46, 3, "#eee", "#EF5350", 0.62);
    progressPercentage('#progress_percentage_three', 46, 3, "#039BE5", "#fff", 0.69);
    progressPercentage('#progress_percentage_four', 46, 3, "#E53935", "#fff", 0.43);

    // Chart setup
    function progressPercentage(element, radius, border, backgroundColor, foregroundColor, end) {


        // Basic setup
        // ------------------------------

        // Main variables
        var d3Container = d3.select(element),
            startPercent = 0,
            fontSize = 22,
            endPercent = end,
            twoPi = Math.PI * 2,
            formatPercent = d3.format('.0%'),
            boxSize = radius * 2;

        // Values count
        var count = Math.abs((endPercent - startPercent) / 0.01);

        // Values step
        var step = endPercent < startPercent ? -0.01 : 0.01;


        // Create chart
        // ------------------------------

        // Add SVG element
        var container = d3Container.append('svg');

        // Add SVG group
        var svg = container
            .attr('width', boxSize)
            .attr('height', boxSize)
            .append('g')
                .attr('transform', 'translate(' + radius + ',' + radius + ')');


        // Construct chart layout
        // ------------------------------

        // Arc
        var arc = d3.svg.arc()
            .startAngle(0)
            .innerRadius(radius)
            .outerRadius(radius - border)
            .cornerRadius(20);


        //
        // Append chart elements
        //

        // Paths
        // ------------------------------

        // Background path
        svg.append('path')
            .attr('class', 'd3-progress-background')
            .attr('d', arc.endAngle(twoPi))
            .style('fill', backgroundColor);

        // Foreground path
        var foreground = svg.append('path')
            .attr('class', 'd3-progress-foreground')
            .attr('filter', 'url(#blur)')
            .style({
            	'fill': foregroundColor,
            	'stroke': foregroundColor
            });

        // Front path
        var front = svg.append('path')
            .attr('class', 'd3-progress-front')
            .style({
            	'fill': foregroundColor,
            	'fill-opacity': 1
            });


        // Text
        // ------------------------------

        // Percentage text value
        var numberText = svg
            .append('text')
                .attr('dx', 0)
                .attr('dy', (fontSize / 2) - border)
                .style({
                    'font-size': fontSize + 'px',
                    'line-height': 1,
                    'fill': foregroundColor,
                    'text-anchor': 'middle'
                });


        // Animation
        // ------------------------------

        // Animate path
        function updateProgress(progress) {
            foreground.attr('d', arc.endAngle(twoPi * progress));
            front.attr('d', arc.endAngle(twoPi * progress));
            numberText.text(formatPercent(progress));
        }

        // Animate text
        var progress = startPercent;
        (function loops() {
            updateProgress(progress);
            if (count > 0) {
                count--;
                progress += step;
                setTimeout(loops, 10);
            }
        })();
    }

});
