var KingMap = window.KingMap = KingMap || {};


(function(){
    var Label = 
    /**
    */
    KingMap.Label = function(map,options){
        var methodMapping = {
            'AMap' : function(){
                return _AMap(map,options);
            },
            'BMap' : function(){
                return _BMap(map,options);
            }
        }
        var apiType = map.getApiType();

        return methodMapping[apiType]();
    };
    //高德实现
    var _AMap = function (map,options){
        var opts = {
            text : (options && options.text )|| "这是一个简单的文本标注哦",
            position: options.position || [113.330914,23.128659],    // 指定文本标注所在的地理位置
            zIndex: options.zIndex || 1,   //标记覆盖物的叠加顺序
            offsets: options.offsets || [-10,-34]   //点标记显示位置偏移量

        }
        var label = new AMap.Text(opts);
        var style =  {
                color: options.color || "red",
                fontSize:  options.fontSize ||"12px",
                height:  options.height ||"20px",
                fontFamily: options.fontFamily || "微软雅黑"
            }
        label.setStyle(style);
        label.setMap(map.getMap());
        return {
            delete : function(){
                map.removeOverlay(label);
            },
            getLabel : function(){
                return label;
            },
            setContent : label.setContent,
            getContent : label.getContent,
            setStyle : label.setStyle,
            setPosition : label.setPosition,
            addEventListener : label.on,
            removeEventListener : label.off

        }
    }
    //百度实现
    var _BMap = function (map,options){
        var opts = {
            
            position: options.position || new BMap.Point(113.330914,23.128659),    // 指定文本标注所在的地理位置
            offsets: options.offsets || [-10,-34]   //点标记显示位置偏移量

        }
        var text = (options && options.text )|| "这是一个简单的文本标注哦"
        var label = new BMap.Label(text,opts);
        var style =  {
                color: options.color || "red",
                fontSize:  options.fontSize ||"12px",
                height:  options.height ||"20px",
                fontFamily: options.fontFamily || "微软雅黑"
            }
        label.setStyle(style);
        map.getMap().addOverlay(label)
        return {
            delete : function(){
                map.removeOverlay(label);
            },
            getLabel : function(){
                return label;
            },
            setContent : label.setContent,
            getContent : label.getContent,
            setStyle : label.setStyle,
            setPosition : label.setPosition,
            addEventListener : label.addEventListener,
            removeEventListener : label.removeEventListener

        }
    }

}());