

var KingMap = window.KingMap = KingMap || {};

(function(){

    // var Point = 
    /**
    *封装地图上的点
    *
    *
    */
    KingMap.Point = function(lng,lat){
        var _lng = lng || 113.330914;
        var _lat = lat || 23.128659;
        var getLng = function(){
        	return lng;
      	}

      	var getLat = function(){
        	return lat;
      	}

      	var equals = function(point){
    		return (_lat == point.getLat() && _lng == point.getLng()) ? true : false;
    	}

    	var pointMap = {
			'AMap' : function(){
				return new AMap.LngLat(_lng,_lat);
			},
			'BMap' : function(){
				return new BMap.Point(_lng,_lat);
			}
		}
		
		var getPoint = function(apiType){
			return pointMap[apiType]();
		}
		return {
			getLng : getLng,
			getLat : getLat,
			getPoint : getPoint,
			equals : equals
		}
}
})();/*闭包结束*/