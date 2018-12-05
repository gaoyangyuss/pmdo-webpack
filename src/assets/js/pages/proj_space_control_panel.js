/* ------------------------------------------------------------------------------
*
*  # PM.DO Project Space Control Panel
*
*  Specific JS code additions for Project Space page
*
*  Version: 1.0
*  Latest update: Feb 15, 2018
*
* ---------------------------------------------------------------------------- */

$(function() {

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

    // Project summary by using summernote basic editors
    // ------------------------------

    // Default initialization
    $('.summernote').summernote();


    // Control editor height
    $('.summernote-height').summernote({
        height: 400
    });


});
