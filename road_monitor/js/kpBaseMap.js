/**
 * 基础地图构造方法  v0.1
 * V0.1 BMap，AMap的构造方法，以及公共方法,返回
 * @param {Object} options
 */
var KingMap = window.KingMap || {};
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
     ops =Object.assign(ops,options);
     
	 var map ={};
	 if(ops.apiType=="BMap"){
		map = new BMap.Map(ops.id)
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


	 }else{
	    map = new AMap.Map(ops.id, {
        zoom:ops.zoom,
        center: [ops.lng, ops.lat],
        zooms:ops.zooms,
 		dragEnable:ops.dragEnable,
		zoomEnable:ops.zoomEnable,
		doubleClickZoom:ops.dragEnable,
		keyboardEnable:ops.keyboardEnable
    	}); 	
	 }
	 map.apiType = ops.apiType;
	 

	/*
	 * 返回地图当前缩放级别
	 */
	var getZoom = function(){
		return map.getZoom();
	};
	
	/*
	 * 将视图切换到指定的缩放等级，中心点坐标不变
	 */
	var setZoom = function(zoom){
 		map.setZoom(zoom);
	};
	
	/*
	 * 放大一级视图
	 */
	var zoomIn = function(){
 		map.zoomIn();
	};
	
	/*
	 * 缩小一级视图
	 */
	var zoomOut = function(){
 		map.zoomOut();
	};
	
	
	/*
	 * 获取地图中心点经纬度坐标值    
	 * 百度返回的是Point类  
	 * 高德返回的是LngLat类
	 */
	var getCenter = function(){
 		return map.getCenter();
	};	
	
	/*
	 * 设置地图中心点
	 * lng 经度
	 * lac 维度
	 * 百度使用Point类  
	 * 高德使用LngLat 类
	 */
	var setCenter = function(lng,lat){
 		if(ops.apiType=="BMap"){
 			var point = new BMap.Point(lng,lat);
 			map.setCenter(point);
 		}else{
 			var LngLat = new AMap.LngLat(lng,lat);
 			map.setCenter(LngLat);
 		}
	};	
	
	
	/*
	 * 设初始化地图
	 * lng 经度
	 * lac 维度
	 * zoom 地图级别
	 * 百度使用Point类  
	 * 高德使用LngLat 类
	 */
	var centerAndZoom = function(lng,lat,zoom){
 		if(ops.apiType=="BMap"){
 			var point = new BMap.Point(lng,lat);
 			map.centerAndZoom(point,zoom);
 		}else{
 			var LngLat = new AMap.LngLat(lng,lat);
 			map.setZoomAndCenter(zoom,LngLat);
 		}
	};
	
	/*
	 * 将覆盖物添加到地图中
	 * overlaysArray 图层数组
	 */
	var addOverlay = function(overlaysArray){
		if(ops.apiType=="BMap"){
			//百度api只支持一次加一个图层
			for(var oneOverlay in overlaysArray){
				map.addOverlay(oneOverlay);
			}
		}else{
			map.add(overlaysArray);
		}
	};
	
	/*
	 * 	从地图中移除覆盖物
	 * overlaysArray 图层数组
	 */	
	var removeOverlay = function(overlaysArray){
		if(ops.apiType=="BMap"){
			//百度api只支持一次移除一个图层
			//若不是数组，只删除一个
			if(false == Array.isArray(overlaysArray)){
				map.removeOverlay(overlaysArray);
				return;
			}
			for(var oneOverlay in overlaysArray){
				map.removeOverlay(oneOverlay);
			}
		}else{
			map.remove(overlaysArray);
		}		
	};

	/*
	 * 清除地图上所有覆盖物
	 */
	var clearOverlays = function(){
		if(ops.apiType=="BMap"){
			map.clearOverlays();
		}else{
			map.clearMap();
		}		
	}
	
	/*
	 * 返回地图上的所有覆盖物
	 * 百度返回Array<Overlay>
	 * 高德返回Object
	 * 高德 可选类型包括marker、circle、polyline、polygon； Type可缺省，缺省时返回所有覆盖物（marker、circle、polyline、polygon）
	 */
	var getOverlays = function(type){
		if(ops.apiType=="BMap"){
			return map.getOverlays();
		}else{
			return map.getAllOverlays(type);
		}		
	}
	
	/*
	 * 	设置地图样式
	 * 百度 style 字符串或JSON 
	 * 高德  style 字符串 官方样式模版,如"amap://styles/grey"
	 */
	var setMapStyle = function(style){
		if(ops.apiType=="BMap"){
			if(style instanceof Array ){
				map.setMapStyle({styleJson:style});
			}else{
				map.setMapStyle({style:style});
			}
		}else{
			 map.setMapStyle(style);
		}		
	}
	
	/**
	 * 设置一些操作
	 * @param {Object} options
	 */
	var setOperation = function(options){
		ops =  Object.assign(ops,options);
		//高德和百度地图的操作控制 	
		if(ops.apiType=="BMap"){
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
		}else{
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
		
	}
	
    /**
     * 事件绑定
     * 高德使用on方法
     * 百度使用addEventListener方法
     * @param {String} event 事件名
     * @param {Function} handler 事件功能函数 
     */
    var addEventListener = function(event,handler){
        if(map.apiType=='BMap'){
            marker.addEventListener(event,handler);
        }else{
            marker.on(event,handler);
        }
    }
    /**
     * 事件解绑
     * 高德使用off方法
     * 百度使用removeEventListener方法
     * @param {String} event 事件名
     * @param {Function} handler 事件功能函数
     */
    var removeEventListener = function(event,handler){
        if(map.apiType=='BMap'){
        	marker.removeEventListener(event,handler);
        }else{
            marker.off(event,handler);
        }
    }
	
	/**
	 * 获取原生地图对象
	 */
	var getMap = function(){
		return map;
	}
	
	var getApiType = function(){
		return map.apiType;
	}

	return {
		getZoomKp:getZoom,
		setZoomKp:setZoom,
		zoomInKp:zoomIn,
		zoomOutKp:zoomOut,
		getCenterKp:getCenter,
		setCenterKp:setCenter,
		centerAndZoomKp:centerAndZoom,
		addOverlayKp:addOverlay,
		removeOverlayKp:removeOverlay,
		clearOverlaysKp:clearOverlays,
		getOverlaysKp:getOverlays,
		setMapStyleKp:setMapStyle,
		setOperationKp:setOperation,
		addEventListenerKp:addEventListener,
		removeEventListenerKp:removeEventListener,
		getMap:getMap,
		getApiType:getApiType
	}
};






