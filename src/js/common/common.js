//兼容1.9以下版本jquery的toggle方法
/*$.fn.toggle = function( fn, fn2 ) {
    var args = arguments,guid = fn.guid || $.guid++,i=0,
    toggler = function( event ) {
      var lastToggle = ( $._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
      $._data( this, "lastToggle" + fn.guid, lastToggle + 1 );
      event.preventDefault();
      return args[ lastToggle ].apply( this, arguments ) || false;
    };
    toggler.guid = guid;
    while ( i < args.length ) {
      args[ i++ ].guid = guid;
    }
    return this.click( toggler );
}*/

//设置菜单active  
function initMenu(){
  var windowUrl = window.location.href;
  var index = windowUrl.lastIndexOf('\/');
  var url = windowUrl.substring(index+1,windowUrl.length);
  var curLi = $('.toggle-active a[href$="'+url+'"]').parent();
  $('.toggle-active li').removeClass('active');
  curLi.addClass('active');
  curLi.parent('ul').prev('.has-ul').parent('li').addClass('active');
  $('.has-ul').parent('li').click(function(){
    $(this).addClass('active');
  })
}

var init = jQuery(document).ready(function(){
  initMenu();

  $('.domain—dropdown li').click(function(){
    $(this).siblings('li').removeClass('active');
    $(this).addClass('active');
  });

  //限制字符个数
  $(".domain-name-span").each(function(){
    var maxwidth=16;
    var str =  $(this).text(),
        reg = /[\u4e00-\u9fa5]{1}/g,             //中文
        notReg = /\w{1}/g;                      //非中文
    var strCn = str.match(reg);
    var strEn = str.match(notReg);
    var leg = 0;
    if(strCn){
      maxwidth = maxwidth/2 - strCn.length;
    }
    if(strEn){
      maxwidth = maxwidth - strEn.length;
    }
    if(maxwidth<=0){
      var finalLen = str.length + maxwidth;
      $(this).text($(this).text().substring(0,finalLen));
    }
  });

});

export {settingModalZIndex, init}