/**
 * 广东省所有区县边界
 */
var gdAreaRegion = {
	
	/**
	 * 根据城市名、区域名称获取其边界数据，并在地图上绘制边界图
	 * @param {Object} cityName 城市名  (可选，如果没有城市名，则绘制广东省边界)
	 * @param {Object} areaName 区域名  (可选，如果没有区域名，则绘制城市边界)
	 */
	drawCityBound : function(cityName, areaName) {
		var data = gdData;
		var boundary;
		if(cityName == null || cityName == '') {
			//没有指定城市名，则绘制省边界
			//map.setCenter('广东省');
			boundary = data['广东省']['boundary'];
		} else if(areaName == null || areaName == '') {
			//只有城市名，没有区名，则绘制城市边界
			//map.setCenter(cityName);
			boundary = data['广东省']['city'][cityName]['boundary'];
		} else {
			//绘制城市下属区边界
			//map.setCenter(areaName);
			boundary = data['广东省']['city'][cityName]['area'][areaName];
		}
	
		if(boundary != null | boundary != '') {
			var boundArray = boundary.split(";");
			var pointArray = [];
			for(var i = 0; i < boundArray.length; i++) {
				var pointArr = boundArray[i].split(",");
				var lnt = pointArr[0];
				var lat = pointArr[1];
				var point = new BMap.Point(lnt, lat);
				pointArray.push(point);
			}
			var ply = new BMap.Polygon(pointArray, {
				strokeWeight: 2,
				strokeColor: "#ff0000"
			}); //建立多边形覆盖物  
			map.addOverlay(ply); //添加覆盖物 
			map.setViewport(pointArray); //调整视野           
		}
	}
}



