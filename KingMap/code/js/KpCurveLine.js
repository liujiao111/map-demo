(function(){
	/**
	 * 弧线类构造方法
	 * @param {Object} map
	 * @param {Object} options
	 */
	KingMap.CurveLine = function(kpMap, options) {

		var curveLineOptions = {
			apiType: '', //必须，地图类型
			path: '', //必须，折线路径
			strokeColor: "#FF33FF", //线颜色
			strokeOpacity: 1, //线透明度
			strokeWeight: 3, //线宽
			strokeStyle: "solid", //线样式
			isOpenEdit : false, //是否开启编辑，默认false
		};
		
		curveLineOptions = Object.assign(curveLineOptions, options);

		var apiType = curveLineOptions['apiType'];
		var map = kpMap.getMap();
		var curve = {};
		
		if(apiType == 'AMap') {
			curveLineOptions['map'] = map;
			
			curve = new AMap.BezierCurve(curveLineOptions);
			
			AMap.plugin('AMap.BezierCurveEditor', function() {
				var lineEditor = new AMap.BezierCurveEditor(map, curve, {
					'getCtrlLineOptions': function() { //自定义控制线的样式
						return {
							'lineCap': 'round',
							'strokeDasharray': [10, 10],
							'strokeColor': "blue", //线颜色
							'strokeOpacity': 0.5, //线透明度
							'strokeWeight': 3, //线宽
							'strokeStyle': "dashed" //线样式
						};
					}
				});
				
				if(curveLineOptions['isOpenEdit']) {
					lineEditor.open();
				}
			});
			
		}

		if(apiType == 'BMap') {
			var pointStr = curveLineOptions['path'];
			var pointArr = pointStr.split(";");
			var points = [];
			for (var i = 0; i < pointArr.length; i++) {
				var lng = pointArr[i].split(",")[0];
				var lat = pointArr[i].split(",")[1];
				var point = new BMap.Point(lng, lat);
				points.push(point);
			}
			var curve = new BMapLib.CurveLine(points, curveLineOptions);
			
			map.addOverlay(curve);
			
			if(curveLineOptions['isOpenEdit']) {
				// 开启编辑功能
				curve.enableEditing();
			}
			
		};
		
		var getPath = function() {
			var path = curve.getPath();
			return path;
		};
		
		/**
		 * 设置折线路径
		 * @param {Object} path
		 */
		/*var setPath = function(path) {
			if(apiType == 'AMap') {
				curve.setPath(path);
			} 
			if(apiType == 'BMap') {
				var pointArr = path.split(";");
				var points = [];
				for (var i = 0; i < pointArr.length; i++) {
					var lng = pointArr[i].split(",")[0];
					var lat = pointArr[i].split(",")[1];
					var point = new BMap.Point(lng, lat);
					points.push(point);
				}
				curve.setPath(points);
			}
		}*/
		
		var getCurveLine = function (){
			return curve;
		};
		
		/**
		 * 覆盖物事件绑定
		 * @param {String} event 事件名
		 * @param {Function} handler 事件功能函数 
		 */
		var addEventListener = function(event, handler) {
			if(apiType == 'AMap') {
				curve.on(event, handler);
			}
			if(apiType == 'BMap') {
				curve.addEventListener(event, handler);
			}
		};
		
		/**
		 * 覆盖物事件绑定移除
		 * @param {String} event 事件名
		 * @param {Function} handler 事件功能函数 
		 */
		var removeEventListener = function(event,handler){
			if(map.apiType=='AMap'){
				curve.off(event, handler);
			}else{
				curve.removeEventListener(event, handler);
			}
		};
		
		/**
		 * 弧线隐藏
		 */
		var hide  = function(){
			curve.hide();
		};
		
		/**
		 * 弧线显示
		 */
		var show  = function(){
			curve.show();
		};
		
		var getMap = function() {
			return curve.getMap();
		};
		
		var getBounds = function() {
			var Bounds = curve.getBounds();
			var kpBounds = new KingMap.Bounds({
				sw : new KingMap.Point(Bounds.getSouthWest().lng,Bounds.getSouthWest().lat),
				ne : new KingMap.Point(Bounds.getNorthEast().lng,Bounds.getNorthEast().lat)
			});
			return kpBounds;
		};
		
		//移除弧线覆盖物
		var remove = function(){
			if(map.apiType=='AMap'){
				curve.setMap();
			} else {
				map.removeOverlay(curve);
			}
		}

		var getOptions = function(){
			return curveLineOptions;
		}
		
		var getApiType = function(){
			return apiType;
		}

		return {
			getPath : getPath, //获取节点经纬度
			//setPath : setPath, //设置折线路径 
			hide : hide, //弧线隐藏
			show : show, //弧线显示
			remove : remove, //移除
			getMap : getMap, //获取当前弧线所在地图对象
			getBounds : getBounds, //返回弧线的地理区域范围
			addEventListener : addEventListener, //覆盖物事件绑定
			removeEventListener : removeEventListener, //覆盖物事件绑定移除
			getOverlay : getCurveLine, //获取原生的CurveLine对象
			getOptions : getOptions,
			getApiType : getApiType
		}
	}
})();