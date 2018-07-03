(function(){
    KingMap.InfoWindow = function(options){
        var opts = {
            content : "地址：北京市东城区王府井大街88号乐天银泰百货八层",
            width : 0,
            height : 0,
            offset : [20,20],
            position : new KingMap.Point(),
            autoMove : true,
            closeWhenClickMap : true,
            apiType : 'AMap'
        }

        opts = Object.assign(opts,options);
        var apiType = opts.apiType;
        var InfoWindow = {};
        var map = {};

        var InfoWindowMap = {
            'AMap' : function(){
                InfoWindow = new AMap.InfoWindow({
                    autoMove : opts.autoMove,
                    closeWhenClickMap : opts.closeWhenClickMap,
                    content : opts.content,
                    size : new AMap.Size(opts.width,opts.height),
                    offset : new AMap.Pixel(opts.offset[0],opts.offset[1]),
                    position : opts.position.getPoint('AMap')
                })
            },
            'BMap' : function(){
                InfoWindow = new BMap.InfoWindow(opts.content,{
                    width : opts.width,
                    height : opts.height,
                    offset : new BMap.Size(opts.offset[0],opts.offset[1]),
                    enableAutoPan : opts.autoMove,
                    enableCloseOnClick : opts.closeWhenClickMap
                })
            }
        }
        var InfoWindowMethod = InfoWindowMap[apiType];
        if(!InfoWindowMethod){
            console.log('地图类型错误');
        }
        InfoWindowMethod();

        var setContent = function(content){
            InfoWindow.setContent(content);
        }

        var getContent = function(){
            return InfoWindow.getContent();
        }

        var getIsOpen = function(){
            var flag = false;
            var methodMap = {
                'AMap' : function(){
                    flag = InfoWindow.getIsOpen();
                },
                'BMap' : function(){
                    flag = InfoWindow.isOpen();
                }
            }
            var method = methodMap[apiType];
            if(!method){
                console.log('地图类型错误');
            }
            method();
            return flag;
        }

        var getPosition = function(){
            var kpPoint = {};
            var point = InfoWindow.getPosition();
            var methodMap = {
                'AMap' : function(){
                    kpPoint = new KingMap.Point(point.getLng(),point.getLat());
                },
                'BMap' : function(){
                    kpPoint = new KingMap.Point(point.lng,point.lat);
                }
            }
            var method = methodMap[apiType];
            if(!method){
                console.log('地图类型错误');
            }
            method();
            return kpPoint;
        }

        var setSize = function(size){
            var methodMap = {
                'AMap' : function(){
                    InfoWindow.setSize(new AMap.Size(size[0],size[1]));
                },
                'BMap' : function(){
                    InfoWindow.setWidth(size[0]);
                    InfoWindow.setHeight(size[1]);
                }
            }
            var method = methodMap[apiType];
            if(!method){
                console.log('地图类型错误');
            }
            opts = Object.assign(opts,{
                width : size[0],
                height : size[1]
            })
            method();
        }

        var open = function(kpMap,kpPoint){
            var methodMap = {
                'AMap' : function(){
                    InfoWindow.open(kpMap.getMap(),kpPoint.getPoint('AMap'));
                },
                'BMap' : function(){
                    kpMap.getMap().openInfoWindow(InfoWindow,kpPoint.getPoint('BMap'));
                }
            }
            var method = methodMap[apiType];
            if(!method){
                console.log('地图类型错误');
            }
            method();
            map = kpMap.getMap();
        }

        var close = function(){
            var methodMap = {
                'AMap' : function(){
                    InfoWindow.close();
                },
                'BMap' : function(){
                    map.closeInfoWindow();
                }
            }
            var method = methodMap[apiType];
            if(!method){
                console.log('地图类型错误');
            }
            method();
            map = {};
        }

        var addEventListener = function(event,handler){
            var methodMap = {
                'AMap' : function(){
                    InfoWindow.on(event,handler);
                },
                'BMap' : function(){
                    InfoWindow.addEventListener(event,handler);
                }
            }
            var method = methodMap[apiType];
            if(!method){
                console.log('地图类型错误');
            }
            method();
        }

        var removeEventListener = function(event,handler){
            var methodMap = {
                'AMap' : function(){
                    InfoWindow.off(event,handler);
                },
                'BMap' : function(){
                    InfoWindow.removeEventListener(event,handler);
                }
            }
            var method = methodMap[apiType];
            if(!method){
                console.log('地图类型错误');
            }
            method();
        }

        var getInfoWindow = function(){
            return InfoWindow;
        }

        var getApiType = function(){
            return apiType;
        }

        var getOptions = function(){
            return opts;
        }

        return {
            setContent : setContent,
            getContent : getContent,
            getIsOpen : getIsOpen,
            getPosition : getPosition,
            setSize : setSize,
            open : open,
            close : close,
            addEventListener : addEventListener,
            removeEventListener : removeEventListener,
            getInfoWindow : getInfoWindow,
            getApiType : getApiType,
            getOptions : getOptions
        }
    }
})();