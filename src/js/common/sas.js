import "../../assets/emotions/jquery.emoticons.js";
import "../../assets/commentImg/commentImg.js";

var sas = $(function(){
    //获取当前时间
    function getCurrentTime() {
        var date = new Date();
        //获取当前年
        var year=date.getFullYear();
        //获取当前月
        var month=date.getMonth()+1;
        //获取当前日
        var day=date.getDate();
        //获取当前时
        var hour=date.getHours();
        //获取当前分
        var minutes=date.getMinutes();
        //获取当前秒
        var seconds=date.getSeconds();
        function p(s) {
            return s < 10 ? '0' + s: s;
        }
        var create_time = year+'-'+p(month)+'-'+p(day)+' '+p(hour)+':'+p(minutes)+':'+p(seconds);
        return create_time;
    }

    //表情初始化
    $.emoticons({
        'activeCls':'trigger-active',
        'triggerCls':'trigger',
        'publisherCls':'publisher',
    })

    //查看图片初始化
    $('.tm-m-photos').commentImg({
        activeClass: 'tm-current', //缩略图当前状态class,默认'current'
        nextButton: '.tm-m-photo-viewer-navright', //向后翻页按钮，默认'.next'
        prevButton: '.tm-m-photo-viewer-navleft', //向前翻页按钮，默认'.prev'
        imgNavBox:'.tm-m-photos-thumb', //缩略图容器，默认'.photos-thumb'
        imgViewBox:'.tm-m-photo-viewer' //浏览图容器，默认'.photo-viewer'
    })

    var html = '',
    publisherImgStr = '',
    publisherImgs = '',
    publisherImgsList = new Array();
    /*image = new Object();*/

    //编辑框获取焦点
    $('.publisher textarea').focus(function(){
        $(this).siblings("button").show();
    })

    //设置编辑框换行
    $('.publisher textarea').bind('input propertychange',function(){
        var strContent = $(this).val();
        strContent = strContent.replace(/\r\n/g, '<br/>'); //IE9、FF、chrome
        strContent = strContent.replace(/\n/g, '<br/>'); //IE7-8
        strContent = strContent.replace(/\s/g, ' '); //空格处理
        $(this).prev('.pre').html(strContent);
        var h = $(this).prev('.pre').height() + 22;
        $(this).height(h);
    })

    //标记为已读
    $('.btn-mark').click(function(){
        $(this).addClass('btn-default').removeClass('btn-success');
        $(this).text('已读');
    })

    //发表工作动态
    $(document).on('click','.announce',function(){  
        var hasLi = $(this).siblings(".announce-imgs").find("li").length;
        if(result_before != '' || hasLi > 0){
            if(hasLi > 0){
                for(var i=0;i<publisherImgsList.length;i++){
                    publisherImgs = publisherImgs + '<li data-src="'+publisherImgsList[i]+
                                                    '"> <img src="'+publisherImgsList[i]+
                                                    '"> <b class="tm-photos-arrow"></b> </li>';
                    }
                    publisherImgStr = '<div class="tm-m-photos">'+html+
                                    '<ul class="tm-m-photos-thumb">'+publisherImgs+     
                                    '</ul>'+html+
                                    '<div class="tm-m-photo-viewer">'+html+ 
                                        '<img src="'+publisherImgsList[0]+ 
                                        '"><a class="tm-m-photo-viewer-navleft"><i></i></a>'+html+ 
                                        '<a class="tm-m-photo-viewer-navright"><i></i></a>'+html+
                                    '</div>'+html+
                                '</div>';
            }
            var result_before = $(this).siblings("textarea").val();
            var result;
            $.emoticons(function(api){
                result = api.format(result_before);
            })
            var create_time = getCurrentTime();
            var str = '<div class="panel panel-flat">'+html+
                            '<div class="panel-body">'+html+
                                '<ul class="media-list content-group-lg stack-media-on-mobile">'+html+
                                    '<li class="broad-media media">'+html+
                                        '<div class="media-left">'+html+
                                            '<button type="button" class="btn bg-primary btn-icon btn-rounded btn-bubbles5"><i class="icon-bubbles5"></i></button>'+html+
                                        '</div>'+html+
                                        '<div class="media-body">'+html+
                                            '<div class="media-heading">'+html+
                                                '<span class="name-semibold"><span class="label label-default label-icon">杜</span> 臻</span>'+html+
                                                '<span class="media-annotation dotted"><i class="icon-office"></i> 客户：中国移动</span>'+html+
                                            '</div>'+html+
                                            '<p>'+result+
                                            '</p>'+publisherImgStr+
                                            '<ul class="list-inline list-inline-separate text-size-small list-time">'+html+
                                                '<li>'+create_time+
                                            '</ul>'+html+
                                            '<ul class="list-inline list-inline-separate text-size-small list-operation">'+html+
                                                '<li><a class="agree-btn"><i class="fa fa-heart-o"></i> (<span class="number">0</span>)</a></li>'+html+
                                                '<li><a class="comment-btn"><i class="fa fa-comment-o"></i> 评论 (<span>0</span>)</a></a></li>'+html+
                                                '<li><a class="edit-broad-btn" data-toggle="modal" data-target="#edit_broad_modal"><i class="fa fa-edit"></i> 编辑</a></li>'+html+
                                                '<li><a class="delete-broad-btn"><i class="fa fa-trash"></i> 删除</a></li>'+html+ 
                                            '</ul>'+html+
                                            '<div style="clear: both;"></div>'+html+
                                            '<div class="comment publisher">'+html+
                                                '<textarea type="text" class="form-control" rows="1" style="resize:none;"></textarea>'+html+
                                                '<ul class="announce-imgs"></ul>'+html+
                                                '<div style="clear: both;"></div>'+html+
                                                '<button type="button" class="btn btn-link broad-btn left-btn"><i class="fa fa-smile-o trigger"></i></button>'+html+
                                                '<button type="button" class="btn btn-link btn-file broad-btn left-btn" style="margin-left: 10px;"><i class="fa fa-file-image-o"></i><input type="file" class="file-input"></button>'+html+
                                                '<button type="button" class="btn btn-link broad-btn left-btn" style="margin-left: 10px;"><i class="fa fa-at"></i></button>'+html+
                                                '<button type="button" class="btn btn-default btn-xs right-btn cancel-child"></i> 取消</button>'+html+
                                                '<button type="button" class="btn btn-primary btn-xs right-btn announce-child" style="margin-right: 10px;"></i> 发表</button>'+html+
                                                '<div style="clear: both;"></div>'+html+
                                            '</div>'+html+
                                        '</div>'+html+
                                    '</li>'+html+
                                '</ul>'+html+
                            '</div>'+html+
                        '</div>';
            $(this).parents('.row').next('.panel').before(str);
            $(this).siblings("textarea").val('');
            $(this).siblings('.announce-imgs').empty();
            publisherImgStr = '';
            publisherImgsList.length = 0;
            publisherImgs = '';
            //查看图片初始化
            $('.tm-m-photos').commentImg({
                activeClass: 'tm-current', //缩略图当前状态class,默认'current'
                nextButton: '.tm-m-photo-viewer-navright', //向后翻页按钮，默认'.next'
                prevButton: '.tm-m-photo-viewer-navleft', //向前翻页按钮，默认'.prev'
                imgNavBox:'.tm-m-photos-thumb', //缩略图容器，默认'.photos-thumb'
                imgViewBox:'.tm-m-photo-viewer' //浏览图容器，默认'.photo-viewer'
            })
        }
    })

    //添加图片
    $('.file-input').change(function(){
        var filePath = $(this).val();
        var fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
        src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
        // 检查是否是图片  
        if( !fileFormat.match(/.png|.jpg|.jpeg/) ) {  
            return;
            //检查是否重复上传
            /*if ($.inArray(src,publisherImgsList)>=0) {
                return;
            }*/
            /*for(var i=0;i<publisherImgsList.length<1;i++){
                if(publisherImgsList[i].filePath==filePath){
                    return;
                }
            }*/    
        } 
        var announceImg = '<li><img src="'+src+
                          '"><i class="icon-cancel-circle2 delete-img"></i></li>';                     
        $(this).parents('.publisher').find('.announce-imgs').prepend(announceImg);
        /*image.filePath = filePath;
        image.src = src;
        publisherImgsList.push(image);*/
        publisherImgsList.push(src);
    })

    //删除图片
    $(document).on('click','.delete-img',function(){
        var src = $(this).attr("src");
        /*publisherImgsList = publisherImgsList.filter(function(item){
            return item.src != src;
        })*/
        publisherImgsList.splice($.inArray(src,publisherImgsList),1);
        $(this).parent('li').remove();
    })

    //发表评论或回复
    $(document).on('click','.announce-child',function(){  
        if(result_before != ''){
            var result_before = $(this).siblings("textarea").val();
            var result;
            $.emoticons(function(api){
                result = api.format(result_before);
            });
            var create_time = getCurrentTime();
            var str = '<div class="reply-media media">'+html+
                            '<div class="media-left">'+html+
                                '<button type="button" class="btn bg-primary btn-icon btn-rounded btn-bubbles5"><i class="icon-bubbles5"></i></button>'+html+
                            '</div>'+html+
                            '<div class="media-body">'+html+
                                '<div class="media-heading">'+html+
                                    '<span class="name-semibold"><span class="label label-default label-icon">杜</span> 臻</span>'+html+
                                    '<span class="media-annotation dotted">回复@小明</span>'+html+
                                '</div>'+html+
                                '<p>'+result+
                                '</p>'+html+
                                '<ul class="list-inline list-inline-separate text-size-small list-time">'+html+
                                    '<li>'+create_time+
                                '</ul>'+html+
                                '<ul class="list-inline list-inline-separate text-size-small list-operation">'+html+
                                    '<li><a class="agree-btn"><i class="fa fa-heart-o"></i> (<span class="number">0</span>)</a></li>'+html+
                                    '<li><a class="reply-btn"><i class="fa fa-mail-reply"></i> 回复</a></li>'+html+
                                    '<li><a class="edit-broad-btn" data-toggle="modal" data-target="#edit_broad_modal"><i class="fa fa-edit"></i> 编辑</a></li>'+html+
                                    '<li><a class="delete-broad-btn"><i class="fa fa-trash"></i> 删除</a></li>'+html+ 
                                '</ul>'+html+
                                '<div style="clear: both;"></div>'+html+
                                '<div class="reply publisher">'+html+
                                    '<textarea type="text" class="form-control" rows="1" style="resize:none;"></textarea>'+html+
                                    '<ul class="announce-imgs"></ul>'+html+
                                    '<div style="clear: both;"></div>'+html+
                                    '<button type="button" class="btn btn-link broad-btn left-btn"><i class="fa fa-smile-o trigger"></i></button>'+html+
                                    '<button type="button" class="btn btn-link btn-file broad-btn left-btn" style="margin-left: 10px;"><i class="fa fa-file-image-o"></i><input type="file" class="file-input"></button>'+html+
                                    '<button type="button" class="btn btn-link broad-btn left-btn" style="margin-left: 10px;"><i class="fa fa-at"></i></button>'+html+
                                    '<button type="button" class="btn btn-default btn-xs right-btn cancel-child"></i> 取消</button>'+html+
                                    '<button type="button" class="btn btn-primary btn-xs right-btn announce-child" style="margin-right: 10px;"></i> 发表</button>'+html+
                                '</div>'+html+
                            '</div>'+html+
                        '</div>';
            $(this).parents('.broad-media').find('.media-body:first').append(str);
            $(this).siblings('textarea').val('');
        }
        $(this).parent().slideToggle();
    })

    $(document).on('focus','.publisher textarea',function(){
        $(this).attr('rows','3');
    })

    //取消操作
    $(document).on('click','.publisher-panel .cancel',function(){
        $(this).siblings('textarea').val('').blur().height('auto').attr('rows','1');
        $(this).siblings('.pre').empty()
        $(this).siblings('.announce-imgs').empty();
        $(this).hide().siblings('button').hide();
    })

    $(document).on('click','.publisher2-panel .cancel',function(){
        $(this).siblings('textarea').val('').blur().height('auto').attr('rows','2');
        $(this).siblings('.pre').empty()
        $(this).hide().siblings('button').hide();
    })

    $(document).on('click','.cancel-child',function(){
        $(this).siblings("textarea").val('').height('auto').attr('rows','1');
        $(this).parent().slideToggle();
    })

    $(document).on('click','.publisher .cancel,.publisher .announce',function(){
        $(this).siblings('textarea').val('').blur().height('auto').attr('rows','2');
        $(this).siblings('.pre').empty()
    })

    $(document).on('click','#edit_broad_modal .close',function(){
        $(this).parents('.modal-content').find('textarea').val('').blur().height('auto').attr('rows','2');
        $(this).parents('.modal-content').find('.pre').empty()
    })

    //隐藏显示评论和回复
    $(document).on('click','.comment-btn',function(){
        $(this).parents('ul').siblings('.publisher').find('textarea').attr('rows','1');
        $(this).parents('ul').siblings('.comment').slideToggle();
    })

    $(document).on('click','.reply-btn',function(){
        $(this).parents('ul').siblings('.publisher').find('textarea').attr('rows','1');
        $(this).parents('ul').siblings('.reply').slideToggle();
    })

    //删除操作
    $(document).on('click','.delete-broad-btn',function(){
        $(this).parents('.panel').remove();
    })
    $(document).on('click','.delete-reply-btn',function(){
        $(this).parents('.reply-media').remove();
    })

    //点赞
    $(document).on('click','.agree-btn',function(){
        $(this).find('i').removeClass('fa-heart-o').addClass('fa-heart text-warning');
        $(this).find('.number').text(1);
    })
});

export {sas}