var KingMap = window.KingMap = KingMap || {};
(function(){
    KingMap.Bounds = function(options){
        var opts = {
            sw : new KingMap.Point(113.330914,23.128659),
            ne : new KingMap.Point(113.340914,23.118659)
        };

        if(!options.sw||!options.ne){
            console.log('请输入规定的参数');
        }

        opts = Object.assign(opts,options);

        var Bounds = {};
        var bound = {
            'AMap' : function(){
                Bounds = new AMap.Bounds(opts.sw.getPoint('AMap'),opts.ne.getPoint('AMap'));            
            },
            'BMap' : function(){
                Bounds = new BMap.Bounds(opts.sw.getPoint('BMap'),opts.ne.getPoint('BMap'));           
            }
        }

        var sw_x = opts.sw.getLng();
        var sw_y = opts.sw.getLat();
        var ne_x = opts.ne.getLng();
        var ne_y = opts.ne.getLat();
        
        var contains = function(point){
            var flag = false;
            var pointX = point.getLng();
            var pointY = point.getLat();
            flag = pointX>sw_x&&pointY>sw_y&&pointX<ne_x&&pointY<ne_y;
            return flag;
        }

        var getCenter = function(){
            var new_x = (sw_x+ne_x)/2;
            var new_y = (sw_y+ne_y)/2;
            var kpPoint = new KingMap.Point(new_x,new_y);
            return kpPoint;
        }

        var getSouthWest = function(){
            var kpPoint = opts.sw;
            return kpPoint;
        }

        var getNorthEast = function(){
            var kpPoint = opts.ne;
            return kpPoint;
        }

        var getBounds = function(apiType){
            var boundMethod = bound[apiType];
            if(!boundMethod){
                console.log('地图类型错误');
            }
            boundMethod();
            return Bounds;
        }

        return {
            getBounds : getBounds,
            getCenter : getCenter,
            getSouthWest : getSouthWest,
            getNorthEast : getNorthEast,
            contains : contains
        }
    }
})();