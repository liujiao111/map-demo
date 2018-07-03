(function(){ 
    KingMap.Icon = function(options){
        var opts = {
            url : "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            imageOffset : [0,0],
            imageSize : [36,36],
            apiType : 'AMap'
        }

        opts = Object.assign(opts,options);
        var apiType = opts.apiType;

        var Icon = {}
        var iconMap = {
            'AMap' : function(){
                Icon = new AMap.Icon({
                    size : new AMap.Size(opts.imageSize[0],opts.imageSize[1]),
                    imageOffset : new AMap.Pixel(opts.imageOffset[0],opts.imageOffset[1]),
                    image : opts.url
                });
            },
            'BMap' : function(){
                Icon = new BMap.Icon(opts.url,
                    new BMap.Size(opts.imageSize[0],opts.imageSize[1]),{
                    imageOffset : new BMap.Pixel(opts.imageOffset[0],opts.imageOffset[1])
                });
            }      
        }
        var iconMethod = iconMap[apiType];
        if(!iconMap){
            console.log('地图类型错误');
        }
        iconMethod();

        var setImageSize = function(size){
            var sizes = {};
            var methodMap = {
                'AMap' : function(){
                    sizes = new AMap.Size(size[0],size[1]);
                },
                'BMap' : function(){
                    sizes = new BMap.Size(size[0],size[1]);
                }
            }
            var method = methodMap[apiType];
            if(!method){
                console.log('地图类型错误');
            }
            method();
            Icon.setImageSize(sizes);
        }

        var getIcon = function(){
            return Icon;
        }

        var getApiType = function(){
            return apiType;
        }

        var getOptions = function(){
            return options;
        }

        return {
            setImageSize : setImageSize,
            getIcon : getIcon,
            getApiType : getApiType,
            getOptions : getOptions
        }
    }
})();