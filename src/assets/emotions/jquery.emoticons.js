/**
 * jquery.emoticons.js 1.0
 * http://jquerywidget.com
 */

const weixiao = require('./image/weixiao.gif');
const xixi = require('./image/xixi.gif');
const haha = require('./image/haha.gif');
const keai = require('./image/keai.gif');
const kelian = require('./image/kelian.gif');
const wabi = require('./image/wabi.gif');
const chijing = require('./image/chijing.gif');
const haixiu = require('./image/haixiu.gif');
const jiyan = require('./image/jiyan.gif');
const bizui = require('./image/bizui.gif');
const bishi = require('./image/bishi.gif');
const aini = require('./image/aini.gif');
const lei = require('./image/lei.gif');
const touxiao = require('./image/touxiao.gif');
const qinqin = require('./image/qinqin.gif');
const shengbing = require('./image/shengbing.gif');
const taikaixin = require('./image/taikaixin.gif');
const baiyan = require('./image/baiyan.gif');
const youhengheng = require('./image/youhengheng.gif');
const zuohengheng = require('./image/zuohengheng.gif');
const xu = require('./image/xu.gif');
const shuai = require('./image/shuai.gif');
const tu = require('./image/tu.gif');
const haqian = require('./image/haqian.gif');
const baobao = require('./image/baobao.gif');
const nu = require('./image/nu.gif');
const yiwen = require('./image/yiwen.gif');
const chanzui = require('./image/chanzui.gif');
const baibai = require('./image/baibai.gif');
const sikao = require('./image/sikao.gif');
const han = require('./image/han.gif');
const kun = require('./image/kun.gif');
const shui = require('./image/shui.gif');
const qian = require('./image/qian.gif');
const shiwang = require('./image/shiwang.gif');
const ku = require('./image/ku.gif');
const se = require('./image/se.gif');
const heng = require('./image/heng.gif');
const guzhang = require('./image/guzhang.gif');
const yun = require('./image/yun.gif');
const beishang = require('./image/beishang.gif');
const zhuakuang = require('./image/zhuakuang.gif');
const heixian = require('./image/heixian.gif');
const yinxian = require('./image/yinxian.gif');
const numa = require('./image/numa.gif');
const hufen = require('./image/hufen.gif');
const shudaizi = require('./image/shudaizi.gif');
const fennu = require('./image/fennu.gif');
const ganmao = require('./image/ganmao.gif');
const xin = require('./image/xin.gif');
const shangxin = require('./image/shangxin.gif');
const zhu = require('./image/zhu.gif');
const xiongmao = require('./image/xiongmao.gif');
const tuzi = require('./image/tuzi.gif');
const ok = require('./image/ok.gif');
const ye = require('./image/ye.gif');
const good = require('./image/good.gif');
const no = require('./image/no.gif');
const zan = require('./image/zan.gif');
const lai = require('./image/lai.gif');
const ruo = require('./image/ruo.gif');
const caonima = require('./image/caonima.gif');
const shenma = require('./image/shenma.gif');
const jiong = require('./image/jiong.gif');
const fuyun = require('./image/fuyun.gif');
const geili = require('./image/geili.gif');
const weiguan = require('./image/weiguan.gif');
const weiwu = require('./image/weiwu.gif');
const huatong = require('./image/huatong.gif');
const lazhu = require('./image/lazhu.gif');
const dangao = require('./image/dangao.gif');
const fahongbao = require('./image/fahongbao.gif');


var emoticons = (function (factory) {
    if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        // AMD或CMD
        define([ "jquery" ],factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        //Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.emoticons = function(parameter,getApi) {
        if(typeof parameter == 'function'){ //重载
            getApi = parameter;
            parameter = {};
        }else{
            parameter = parameter || {};
            getApi = getApi||function(){};
        }
        var defaults = {
            'prefix':'widget',
            'publisherCls':'publisher',
            'triggerCls':'trigger',
            'activeCls':'active',
            'path':'./image/',
            'list':[
                {'title':'微笑','url':weixiao},
                {'title':'嘻嘻','url':xixi},
                {'title':'哈哈','url':haha},
                {'title':'可爱','url':keai},
                {'title':'可怜','url':kelian},
                {'title':'挖鼻','url':wabi},
                {'title':'吃惊','url':chijing},
                {'title':'害羞','url':haixiu},
                {'title':'挤眼','url':jiyan},
                {'title':'闭嘴','url':bizui},
                {'title':'鄙视','url':bishi},
                {'title':'爱你','url':aini},
                {'title':'泪','url':lei},
                {'title':'偷笑','url':touxiao},
                {'title':'亲亲','url':qinqin},
                {'title':'生病','url':shengbing},
                {'title':'太开心','url':taikaixin},
                {'title':'白眼','url':baiyan},
                {'title':'右哼哼','url':youhengheng},
                {'title':'左哼哼','url':zuohengheng},
                {'title':'嘘','url':xu},
                {'title':'衰','url':shuai},
                {'title':'吐','url':tu},
                {'title':'哈欠','url':haqian},
                {'title':'抱抱','url':baobao},
                {'title':'怒','url':nu},
                {'title':'疑问','url':yiwen},
                {'title':'馋嘴','url':chanzui},
                {'title':'拜拜','url':baibai},
                {'title':'思考','url':sikao},
                {'title':'汗','url':han},
                {'title':'困','url':kun},
                {'title':'睡','url':shui},
                {'title':'钱','url':qian},
                {'title':'失望','url':shiwang},
                {'title':'酷','url':ku},
                {'title':'色','url':se},
                {'title':'哼','url':heng},
                {'title':'鼓掌','url':guzhang},
                {'title':'晕','url':yun},
                {'title':'悲伤','url':beishang},
                {'title':'抓狂','url':zhuakuang},
                {'title':'黑线','url':heixian},
                {'title':'阴险','url':yinxian},
                {'title':'怒骂','url':numa},
                {'title':'互粉','url':hufen},
                {'title':'书呆子','url':shudaizi},
                {'title':'愤怒','url':fennu},
                {'title':'感冒','url':ganmao},
                {'title':'心','url':xin},
                {'title':'伤心','url':shangxin},
                {'title':'猪','url':zhu},
                {'title':'熊猫','url':xiongmao},
                {'title':'兔子','url':tuzi},
                {'title':'OK','url':ok},
                {'title':'耶','url':ye},
                {'title':'GOOD','url':good},
                {'title':'NO','url':no},
                {'title':'赞','url':zan},
                {'title':'来','url':lai},
                {'title':'弱','url':ruo},
                {'title':'草泥马','url':caonima},
                {'title':'神马','url':shenma},
                {'title':'囧','url':jiong},
                {'title':'浮云','url':fuyun},
                {'title':'给力','url':geili},
                {'title':'围观','url':weiguan},
                {'title':'威武','url':weiwu},
                {'title':'话筒','url':huatong},
                {'title':'蜡烛','url':lazhu},
                {'title':'蛋糕','url':dangao},
                {'title':'发红包','url':fahongbao}
            ],
            'top':0,
            'left':0,
            'onShow':function(){},
            'onHide':function(){},
            'onSelect':function(){}
        };
        var options = $.extend({}, defaults, parameter);

        var _api = {};
        var $document = $(document);
        var $body = $('body');
        var $layer = $('<div class="'+options.prefix+'-layer">').appendTo($body);
        var $tool = $('<div class="'+options.prefix+'-tool"></div>').appendTo($layer);
        var $close = $('<a class="'+options.prefix+'-close" href="javascript:;" title="关闭">X</a>').appendTo($tool);
        var $panel = $('<div class="'+options.prefix+'-panel"></div>').appendTo($layer);
        var $list = $('<ul></ul>').appendTo($panel);
        var $trigger = null;
        var $textarea = null;
        var _hash = {};
        //结构处理
        $layer.css({
            'position':'absolute',
            'display':'none'
        });
        $.each(options.list,function(index,item){
            /*_hash[item.title] = options.path+item.url;*/
            $list.append('<li title="'+item.title+'"><img data-src="'+item.url+'"/></li>');
        });
        //接口处理
        _api.getTextarea = function(){
            return $textarea;
        },
        _api.format = function(str){
            var list = str.match(/\[[\u4e00-\u9fa5]*\w*\]/g);
            var filter = /[\[\]]/g;
            var title;
            if(list){
                for(var i=0;i<list.length;i++){
                    title = list[i].replace(filter,'');
                    $.each(options.list,function(index,item){
                       if(item.title == title) {
                            str = str.replace(list[i],' <img src="'+item.url+'"/> ');
                       }
                    });
                }                
            }
            return str;
        };
        //关闭弹框
        var closeLayer = function(){
            if($trigger){
                $trigger.removeClass(options.activeCls);
            }
            $layer.hide();
            $trigger = null;
            $textarea = null;
            options.onHide();
        };
        //事件绑定
        $document.on('click','.'+options.triggerCls,function(){
            $trigger = $(this);
            var $publisher = $trigger.parents('.'+options.publisherCls);
            $textarea = $publisher.find('textarea');
            var offset = $trigger.offset();
            var height = $trigger.outerHeight();
            var bodyHeight = $('body').height();
            var difference = bodyHeight - offset.top;
            $trigger.addClass(options.activeCls);
            $layer.find('img').each(function(){
                var $this = $(this);
                $this.attr('src',$this.data('src'));
            });
            /*console.log(offset.top , bodyHeight , height , options.top);*/
            if(difference<254) {
                $layer.css({
                    left: offset.left+options.left,
                    top: offset.top+height+options.top+difference-254
                }).show();
            }else{
                $layer.css({
                    left: offset.left+options.left,
                    top: offset.top+height+options.top
                }).show();
            }
            options.onShow();
        });
        $document.on('click',function(e){
            var $target = $(e.target);
            if(!$target.is('.'+options.triggerCls)&&!$target.closest('.'+options.prefix+'-layer').length){
                closeLayer();
            }
        });
        $layer.on('click','.'+options.prefix+'-close',closeLayer);
        $layer.on('click','li',function(){
            var $this = $(this);
            var title = $this.attr('title');
            if($textarea){
                insertText($textarea[0],'['+title+']');
            }
            options.onSelect(_api);
        });
        //为了兼容insertText
        $document.on('select click keyup','.'+options.publisherCls+' textarea',function(){
            if (this.createTextRange){
                this.caretPos = document.selection.createRange().duplicate();
            }
        });
        //初始化
        getApi(_api);
        return this;
    };

    //插入文字
    function insertText(obj,str) {
        if(document.all && obj.createTextRange && obj.caretPos){ 
            var caretPos=obj.caretPos; 
            caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ? 
            str+'' : str; 
        }else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
            var startPos = obj.selectionStart,
                endPos = obj.selectionEnd,
                cursorPos = startPos,
                tmpStr = obj.value;
            obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
            cursorPos += str.length;
            obj.selectionStart = obj.selectionEnd = cursorPos;
        } else {
            obj.value += str;
        }
    }
}));

export {emoticons}
