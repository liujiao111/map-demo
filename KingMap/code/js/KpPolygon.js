(function(){
	/**
	 * 多边形覆盖物
	 * @param {Map} map 地图对象
	 * @param {Object} options 初始化参数对象
	 */
	KingMap.Polygon = function(kpMap, options) {
		var kpPolygon = {};
		var map = kpMap.getMap();
		
		//多边形覆盖物默认样式
		var kpPolygonOptions = {
			polygon : '', //必须，字符串类型的编辑经纬度
			strokeColor: "#FF33FF", //线颜色
			strokeOpacity: 0.2, //线透明度
			strokeWeight: 3, //线宽
			fillColor: "#1791fc", //填充色
			fillOpacity: 0.35, //填充透明度
		};
		
		kpPolygonOptions = Object.assign(kpPolygonOptions, options);
		//map = kpPolygonOptions['map'];
		apiType = map['apiType'];

		var coordArr = options['polygon'].split(";");
		
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = s[13] = s[18] = s[23] = "-";
	
		var uuid = s.join("");
		
		if(apiType == 'AMap') {
			//高德地图	
			var polygonArr = new Array(); //多边形覆盖物节点坐标数组
			for(var i = 0; i < coordArr.length; i++) {
				var oneCoord = [];
				var lng = parseFloat(coordArr[i].split(",")[0]);
				var lat = parseFloat(coordArr[i].split(",")[1]);
				oneCoord.push(lng);
				oneCoord.push(lat);
				polygonArr.push(oneCoord);
			}
			kpPolygonOptions = Object.assign(kpPolygonOptions, options);
			kpPolygonOptions['path'] = polygonArr;
			kpPolygonOptions['path'] = polygonArr;
			kpPolygon = new AMap.Polygon(kpPolygonOptions);
			kpPolygon.setMap(map);
			kpPolygon['id'] = uuid;
			//amapLayerList.push(kpPolygon);
		} else if(apiType == 'BMap') {
			//百度地图
			var polygonArr = [];
			for(var i = 0; i < coordArr.length; i++) {
				var lng = parseFloat(coordArr[i].split(",")[0]);
				var lat = parseFloat(coordArr[i].split(",")[1]);
				var point = new BMap.Point(lng, lat);
				polygonArr.push(point);
			}
			kpPolygonOptions = Object.assign(kpPolygonOptions, options);
			kpPolygon = new BMap.Polygon(polygonArr, kpPolygonOptions);
			map.addOverlay(kpPolygon);
			kpPolygon['id'] = uuid;
			//bmapLayerList.push(kpPolygon);
		}

		/**
		 * 多边形覆盖物重新设置边界经纬度
		 * @param {Object} layerData  新的边界经纬度，格式：113.232,22.333;112.565656,23.4545
		 */
		var setPolygonPath = function(layerData) {
			var lngLatList = [];
			var layerDataArr = layerData.split(";");
			for(var i = 0; i < layerDataArr.length; i++) {
				var lng = parseFloat(layerDataArr[i].split(",")[0]);
				var lat = parseFloat(layerDataArr[i].split(",")[1]);
				var lngLat;
				if(apiType == 'AMap') {
					lngLat = new AMap.LngLat(lng, lat);
				}
				if(apiType == 'BMap') {
					lngLat = new BMap.Point(lng, lat);
				}
				lngLatList.push(lngLat);
			}
			kpPolygon.setPath(lngLatList);
		};
		
		/**
		 * 获取多边形覆盖物对象的边界经纬度
		 * 返回值类型：字符串，示例：113.517032,22.350776;113.517032,22.350776
		 */
		var getPolygonPath = function() {
			var path = kpPolygon.getPath();
			var pathStr = "";
			//alert(path[0]);       //高德：113.517032,22.350776  百度：[Object, Object]
			//alert(path[0]['lat']);
			for (var i = 0; i < path.length; i ++) {
				if(apiType == 'AMap') {
					pathStr += path[i] + ";";
				}
				if(apiType == 'BMap') {
					pathStr += path[i]['lng'] + "," + path[i]['lat'] + ";";
				}
			}
			pathStr = pathStr.substring(0, pathStr.lastIndexOf(";"));
			return pathStr;
		};
		
		/**
		 * 多边形覆盖物隐藏
		 */
		var hide  = function(){
			kpPolygon.hide();
		};
		
		/**
		 * 显示多边形覆盖物
		 */
		var show  = function(){
			kpPolygon.show();
		};
		
		/**
		 * 获取覆盖物所在地图对象
		 * @return {Map} Map地图对象
		 */
		var getMap = function() {
			return kpPolygon.getMap();
		};
		
		/**
		 *  返回覆盖物的地理区域范围
		 *  @return {Object} Bounds对象, 格式如下：
		 * 	百度地图 ： {"xl":{"lng":113.519376,"lat":22.351893},"Ol":{"lng":113.517032,"lat":22.348978},"Xd":22.348978,"Le":113.517032,"Vd":22.351893,"He":113.519376}
		 *	高德地图(需要1.2版本及以上)： {"Rb":{"P":22.348978,"O":113.51703199999997,"lng":113.51703199999997,"lat":22.348978},"Kb":{"P":22.351893,"O":113.51937599999997,"lng":113.51937599999997,"lat":22.351893},"southwest":{"P":22.348978,"O":113.51703199999997,"lng":113.51703199999997,"lat":22.348978},"northeast":{"P":22.351893,"O":113.51937599999997,"lng":113.51937599999997,"lat":22.351893}}
		* 
		*/
		var getBounds = function() {
			var Bounds = kpPolygon.getBounds();
			var kpBounds = new KingMap.Bounds({
				sw : new KingMap.Point(Bounds.getSouthWest().lng,Bounds.getSouthWest().lat),
				ne : new KingMap.Point(Bounds.getNorthEast().lng,Bounds.getNorthEast().lat)
			});
			return kpBounds;
		};
		
		/**
		 * 获取原生的多边形对象
		 */
		var getPolygon = function(){
			return kpPolygon;
		};
		
		/**
		 * 覆盖物事件绑定
		 * @param {String} event 事件名
		 * @param {Function} handler 事件功能函数 
		 */
		var addEventListener = function(event, handler) {
			if(apiType == 'AMap') {
				kpPolygon.on(event, handler);
			}
			if(apiType == 'BMap') {
				kpPolygon.addEventListener(event, handler);
			}
		};
		
		/**
		 * 覆盖物事件绑定移除
		 * @param {String} event 事件名
		 * @param {Function} handler 事件功能函数 
		 */
		var removeEventListener = function(event,handler){
			if(map.apiType=='AMap'){
				kpPolygon.off(event, handler);
			}else{
				kpPolygon.removeEventListener(event, handler);
			}
		};
		
		var remove = function(){
			if(map.apiType=='AMap'){
				kpPolygon.setMap();
			} else {
				map.removeOverlay(kpPolygon);
			}
		};

		var getOptions = function(){
			return kpPolygonOptions;
		}

		var getApiType = function(){
			return apiType;
		}
		
		return {
			setPath : setPolygonPath,  //更新多边形覆盖物的边界经纬度
			getPath : getPolygonPath,  //获取多边形覆盖物的边界经纬度
			hide : hide, //覆盖物隐藏
			show : show, //覆盖物显示
			remove : remove, //移除
			getMap : getMap, //获取当前覆盖物所在地图对象
			getBounds : getBounds, //返回覆盖物的地理区域范围
			addEventListener : addEventListener, //覆盖物事件绑定
			removeEventListener : removeEventListener, //覆盖物事件绑定移除
			getOverlay : getPolygon, //获取原生的多边形对象
			getOptions : getOptions,
			getApiType : getApiType
		}
	}
})();