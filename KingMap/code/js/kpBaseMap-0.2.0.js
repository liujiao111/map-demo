/**
 * 基础地图构造方法  v0.2
 * V0.2 BMap，AMap的构造方法，以及公共方法,返回
 * @param {Object} options
 */
 var KingMap = window.KingMap || {};

 (function(){
 	var map = 
 	KingMap.Map = function(options){
 		var ops={
		//必须  divId
		id:"allmap",
		//可选 API类型
		apiType:"BMap",
		//可选 中心点 经度
		lng:113.330914,
		//可选 中心点 维度
		lat:23.128659,
		//可选 地图级别
		zoom:11,
		//可选 控制地图放大缩小级别
		zooms:[3,19],
		//可选 地图拖拽
		dragEnable:true,
		//可选 滚轮放大缩小
		zoomEnable:true,
		//可选 双击放大
		doubleClickZoom:true,
		//可选 键盘操作
		//百度 启用键盘操作 键盘的上、下、左、右键可连续移动地图。同时按下其中两个键可使地图进行对角移动。PgUp、PgDn、Home和End键会使地图平移其1/2的大小。+、-键会使地图放大或缩小一级
		//高德 方向键控制地图平移，"+"和"-"可以控制地图的缩放，Ctrl+“→”顺时针旋转，Ctrl+“←”逆时针旋转。
		keyboardEnable:true
	}

	//合并属性
	ops = Object.assign(ops,options);

	var methodMapping = {
		'AMap' : function(){
			return _AMap(ops);
		},
		'BMap' : function(){
			return _BMap(ops);
		}
	}
	var apiType = ops.apiType;

	return methodMapping[apiType](); 

};
var _AMap = function(ops){
	
	var map = new AMap.Map(ops.id, {
		zoom:ops.zoom,
		center: [ops.lng, ops.lat],
		zooms:ops.zooms,
		dragEnable:ops.dragEnable,
		zoomEnable:ops.zoomEnable,
		doubleClickZoom:ops.dragEnable,
		keyboardEnable:ops.keyboardEnable
	}); 	
	var getCenter = function(){
		var position = map.getCenter();
		point = new KingMap.Point({
			lng : position.getLng(),
			lat : position.getLat(),
		});
		return point;
	}
	var setCenter = function(point){
		var LngLat = new AMap.LngLat(point.getLng(),point.getLat());
		map.setCenter(LngLat);
	};	
	var centerAndZoom = function(point,zoom){
		var LngLat = new AMap.LngLat(point.getLng(),point.getLat());
		map.setZoomAndCenter(zoom,LngLat);

	};
	/*
	 * 将覆盖物添加到地图中
	 * overlaysArray 图层数组
	 */
	 var addOverlay = function(overlaysArray){
	 	map.add(overlaysArray);
	 };
	 /*
	 * 	从地图中移除覆盖物
	 * overlaysArray 图层数组
	 */	
	 var removeOverlay = function(overlaysArray){
	 	map.remove(overlaysArray);	
	 };
		/*
	 * 	设置地图样式
	 * 百度 style 字符串或JSON 
	 * 高德  style 字符串 官方样式模版,如"amap://styles/grey"
	 */
	 var setMapStyle = function(style){
	 	map.setMapStyle(style);	
	 }
	 /**
	 * 设置一些操作
	 * @param {Object} options
	 */
	 var setOperation = function(options){
	 	ops =  Object.assign(ops,options);

			//地图拖拽
			if(ops.dragEnable){
				map.setStatus({dragEnable:true});	
			}else{
				map.setStatus({dragEnable:false});	
			}
		 	//滚轮放大缩小
		 	if(ops.zoomEnable){
		 		map.setStatus({zoomEnable:true});	
		 	}else{
		 		map.setStatus({zoomEnable:false});	
		 	}
		 	//双击放大
		 	if(ops.doubleClickZoom){
		 		map.setStatus({doubleClickZoom:true});	
		 	}else{
		 		map.setStatus({doubleClickZoom:false});	
		 	}
		 	//启用键盘操作
		 	if(ops.keyboardEnable){
		 		map.setStatus({keyboardEnable:true});	
		 	}else{
		 		map.setStatus({keyboardEnable:false});	
		 	}			


		 }
		 return {
		 	getZoom : function(){return map.getZoom();},
		 	setZoom : function(zoom){return map.setZoom(zoom);},
		 	zoomIn : function(){return map.zoomIn();},
		 	zoomOut : function(){return map.zoomOut();},
		 	getCenter : getCenter,
		 	setCenter : setCenter,
		 	centerAndZoom : centerAndZoom,
		 	addOverlay : addOverlay,
		 	removeOverlay : function(overlays){map.removeOverlay()},
		 	clearOverlays : function(){map.clearMap()},
		 	getOverlays : function(){map.getOverlays()},
		 	setMapStyle : setMapStyle,
		 	setOperation : setOperation,
		 	addEventListener : function(event,handler){map.on(event,handler);},
		 	removeEventListener : function(event,handler){map.off(event,handler);},
		 	getMap : function(){return map },
		 	getApiType: function(){return ops.apiType},
		 	getOptions  : function(){return ops;}
		 };



		};
		var _BMap = function(ops){
			var map = new BMap.Map(ops.id);
			map.centerAndZoom(new BMap.Point(ops.lng,ops.lat), ops.zoom);
			map.setMinZoom(ops.zooms[0]);
			map.setMaxZoom(ops.zooms[1]);
	 	//地图拖拽，默认启用
	 	if(!ops.dragEnable){
	 		map.disableDragging() 		
	 	}
	 	//滚轮放大缩小，默认禁用
	 	if(ops.zoomEnable){
	 		map.enableScrollWheelZoom()	 		
	 	}
	 	//双击放大，默认启用
	 	if(!ops.doubleClickZoom){
	 		map.disableDoubleClickZoom()	 		
	 	}
	 	//启用键盘操作，默认禁用
	 	if(ops.keyboardEnable){
	 		map.enableKeyboard()	 		
	 	}	
	 	var getCenter = function(){
	 		var position = map.getCenter();
	 		point = new KingMap.Point({
	 			lng : position.lng,
	 			lat : position.lat,
	 		});
	 		return point;
	 	} 	
	 	var setCenter = function(point){
	 		var point = new BMap.Point(point.getLng(),point.getLat());
	 		map.setCenter(point);

	 	};	
	 	var centerAndZoom = function(point,zoom){
	 		var point = new BMap.Point(point.getLng(),point.getLat());
	 		map.centerAndZoom(point,zoom);
	 		
	 	};
	 	/*
	 * 将覆盖物添加到地图中
	 * overlaysArray 图层数组
	 */
	 var addOverlay = function(overlaysArray){
	 	//百度api只支持一次加一个图层
	 	for(var oneOverlay in overlaysArray){
				// oneOverlay = oneOverlay.getOverlay();
				map.addOverlay(oneOverlay);
			}

		};
		/*
	 * 	从地图中移除覆盖物
	 * overlaysArray 图层数组
	 */	
	 var removeOverlay = function(overlaysArray){
	 	
			//百度api只支持一次移除一个图层
			//若不是数组，只删除一个
			if(false == Array.isArray(overlaysArray)){
				map.removeOverlay(overlaysArray);
				return;
			}
			for(var oneOverlay in overlaysArray){
				// oneOverlay = oneOverlay.getOverlay();
				map.removeOverlay(oneOverlay);
			}

		};
		/*
	 * 	设置地图样式
	 * 百度 style 字符串或JSON 
	 * 高德  style 字符串 官方样式模版,如"amap://styles/grey"
	 */
	 var setMapStyle = function(style){
	 	
	 	if(style instanceof Array ){
	 		map.setMapStyle({styleJson:style});
	 	}else{
	 		map.setMapStyle({style:style});
	 	}
	 	
	 }

/**
	 * 设置一些操作
	 * @param {Object} options
	 */
	 var setOperation = function(options){
	 	ops =  Object.assign(ops,options);
			//地图拖拽
			if(ops.dragEnable){
				map.enableDragging();		
			}else{
				map.disableDragging();
			}
		 	//滚轮放大缩小
		 	if(ops.zoomEnable){
		 		map.enableScrollWheelZoom();	 		
		 	}else{
		 		map.disableScrollWheelZoom();
		 	}
		 	//双击放大
		 	if(ops.doubleClickZoom){
		 		map.enableDoubleClickZoom();	 		
		 	}else{
		 		map.disableDoubleClickZoom();
		 	}
		 	//启用键盘操作
		 	if(ops.keyboardEnable){
		 		map.enableKeyboard();	 		
		 	}else{
		 		map.disableKeyboard();
		 	}


		 }
		 return {
		 	getZoom : function(){return map.getZoom();},
		 	setZoom : function(zoom){return map.setZoom(zoom);},
		 	zoomIn : function(){return map.zoomIn();},
		 	zoomOut : function(){return map.zoomOut();},
		 	getCenter : getCenter,
		 	setCenter : setCenter,
		 	centerAndZoom : centerAndZoom,
		 	addOverlay : addOverlay,
		 	removeOverlay : removeOverlay,
		 	clearOverlays :  function(){ map.clearOverlays();},
		 	getOverlays : function(){ map.getOverlays();},
		 	setMapStyle : setMapStyle,
		 	setOperation : setOperation,
		 	addEventListener : function(event,handler){ map.addEventListener(event,handler);},
		 	removeEventListener : function(event,handler){ map.removeEventListener(event,handler);},
		 	getMap : function(){return map },
		 	getApiType: function(){return ops.apiType},
		 	getOptions  : function(){return ops;}
		 }
		};

		var getOptions = function(){
			return ops;
		}

	})();



	


	
	

	







