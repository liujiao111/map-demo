var KingMap = window.KingMap = KingMap || {};
(function(){
	/**
	 * 圆形覆盖物
	 * @param {Object} map 地图对象
	 * @param {Object} options 初始化参数对象
	 */
	KingMap.Circle = function(kpmap, options){
		var KpCircle = {};
		//圆形覆盖物默认样式
		var baseOptions = {
			centerLng : '', //必须，圆心经度
			centerLat : '', //必须，圆心纬度
			apiType : '', //必须，地图类型 AMap高德地图 BMap百度地图
			radius: 500, //半径，默认值500
			strokeColor: "#FF33FF", //线颜色
			strokeOpacity: 0.2, //线透明度
			strokeWeight:3, //线粗细度
			fillColor : "#1791fc", //填充颜色
			fillOpacity: 0.35, //填充透明度
		};
		
		baseOptions = Object.assign(baseOptions, options);
		apiType = baseOptions['apiType'];
		var map = kpmap.getMap();
		
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = s[13] = s[18] = s[23] = "-";
	
		var uuid = s.join("");
		
		var lng = baseOptions['centerLng'];
		var lat = baseOptions['centerLat'];
		
		if(apiType == 'AMap') {
			var center = new AMap.LngLat(lng, lat);
			baseOptions['center'] = center;
			KpCircle = new AMap.Circle(baseOptions);
			var circleId = uuid;
			KpCircle['id'] = circleId;
			map.add(KpCircle);
		}
		if(apiType == 'BMap') {
			var point = new BMap.Point(lng, lat);
			var radius = baseOptions['radius'];
			KpCircle = new BMap.Circle(point, radius, baseOptions);
			var circleId = uuid;
			KpCircle['id'] = circleId;
			map.addOverlay(KpCircle);
		};
		
		/**
		 * 设置圆心
		 * @param {Number} centerLng 中心经度坐标
		 * @param {Number} centerLat 中心纬度坐标
		 */
		var setCenter =	function(centerLng, centerLat) {
			if(apiType == 'AMap') {
				KpCircle.setCenter(new AMap.LngLat(centerLng, centerLat));
			}
			if(apiType == 'BMap') {
				KpCircle.setCenter(new BMap.Point(centerLng, centerLat));
			}
		};
		
		/**
		 * 获取圆心坐标系
		 * @return {String} coord 字符串类型的经纬度坐标
		 */
		var getCenter = function() {
			var center = KpCircle.getCenter();
			var kpPoint = new KingMap.Point(center['lng'],center['lat']);
			return kpPoint;
		};
		
		/**
		 * 返回圆形的地理区域范围
		 * @return {Bounds} Bounds 表示地理坐标的矩形区域的对象
		 */
		var getBounds = function() {
			var Bounds = KpCircle.getBounds();
			var kpBounds = new KingMap.Bounds({
				sw : new KingMap.Point(Bounds.getSouthWest().lng,Bounds.getSouthWest().lat),
				ne : new KingMap.Point(Bounds.getNorthEast().lng,Bounds.getNorthEast().lat)
			});
			return kpBounds;
		};
		
		/**
		 * 设置圆半径
		 * @param {Number} radius 圆半径
		 */
		var setRadius = function(radius){
			KpCircle.setRadius(radius);
		}
		
		/**
		 * 获取圆半径大小
		 *  @return {Number} radius 圆半径
		 */
		var getRadius = function(){
			return KpCircle.getRadius();
		};
		
		/**
		 * 显示
		 */
		var show = function() {
			KpCircle.show();
		};
		
		/**
		 * 隐藏
		 */
		var hide = function() {
			KpCircle.hide();
		};
		
		/**
		 * 获取圆所在地图对象
		 * @return {Map} map 地图对象
		 */
		var getMap = function() {
			return KpCircle.getMap();
		};
		
		/**
		 * 获取原生的圆对象
		 */	
		var getCircle = function(){
			return KpCircle;
		};
		
		/**
		 * 覆盖物事件绑定
		 * @param {String} event 事件名
		 * @param {Function} handler 事件功能函数 
		 */
		var addEventListener = function(event, handler) {
			if(apiType == 'AMap') {
				KpCircle.on(event, handler);
			}
			if(apiType == 'BMap') {
				KpCircle.addEventListener(event, handler);
			}
		};
		
		/**
		 * 覆盖物事件绑定移除
		 * @param {String} event 事件名
		 * @param {Function} handler 事件功能函数 
		 */
		var removeEventListener = function(event,handler){
			if(map.apiType=='AMap'){
				KpCircle.off(event, handler);
			}else{
				KpCircle.removeEventListener(event, handler);
			}
		};
		
		var remove = function(){
			if(map.apiType=='AMap'){
				KpCircle.setMap();
			} else {
				map.removeOverlay(KpCircle);
			}
		};

		var getOptions = function(){
			return baseOptions;
		} 

		var getApiType = function(){
			return apiType;
		}
		
		return {
			setCenter : setCenter,  //设置圆心
			getCenter : getCenter, //获取圆心
			getBounds : getBounds, //返回圆形的地理区域范围
			setRadius : setRadius, //设置圆半径
			getRadius : getRadius, //获取圆半径
			show : show, //显示
			hide : hide, //隐藏
			remove : remove, //移除
			getMap : getMap, //获取圆形覆盖物所在地图对象
			addEventListener : addEventListener, //覆盖物事件绑定
			removeEventListener : removeEventListener, //覆盖物事件绑定移除
			getOverlay : getCircle, //获取原生覆盖物对象
			getOptions : getOptions,
			getApiType : getApiType
		}
	}
})();

