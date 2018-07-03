

/**
 * @module KingMap.DrawingManager
 * @desc 基于地图api 封装的简单圈定工具
 * @param {object} map 地图对象
 * @version 0.1.0
 * @author Wilson Lai 
 */

var KingMap = window.KingMap || KingMap ||{};

 KingMap.DrawingManager = function(map) {
	//

     var apiType = map.getApiType() || 'BMap';
     var  _this  = this;
     this._map = map;
     var orgiMap = map.getMap();
     this.defaultStyle = {
		 	strokeColor : "#d76969", // 边线颜色。
        	fillColor : "#e68c8c", // 填充颜色。当参数为空时，圆形将没有填充效果。
       	    strokeWeight : 2, // 边线的宽度，以像素为单位。
        	strokeOpacity : 0.8, // 边线透明度，取值范围0 - 1。
        	fillOpacity : 0.5, // 填充的透明度，取值范围0 - 1。
        	strokeStyle : 'solid' // 边线的样式，solid或dashed。
        };

      //方法映射
    	var methodMap = {
        		'BMap' :function(options){
        			return _this.drawBmap(options);
        		},
        		'AMap' :function(options){
        			return _this.drawAmap(options);
        		}
        }
		 /* @func draw 开启绘制模式
		  * @param {string} type 绘制类型，有BMAP_DRAWING_POLYGON,BMAP_DRAWING_CIRCLE,BMAP_DRAWING_RECTANGLE
		  * @param {object} options {
		  *		style :{},//样式，若不传，使用默认样式
		  *      overlayComplete : function
		  *      args：[]
		  * }
		  */
	 	_this.draw = function(options){
        	return methodMap[apiType](options);
        },
		 
	  //百度地图实现
	  this.drawBmap = function (options){
		  	var _style =  options && options.style ? Object.assign(this.defaultStyle, options.style) :this.defaultStyle;
		  	var _this = this;
		  	var manager = new  BMapLib.DrawingManager(map.getMap(), {
                isOpen : true, // 是否开启绘制模式
                //enableCalculate : true,//开启面积计算
                circleOptions : _style, // 圆的样式
                polylineOptions : _style, // 线的样式
                polygonOptions : _style, // 多边形的样式
                rectangleOptions : _style// 矩形的样式
            });

		  	manager.setDrawingMode(options.type|| BMAP_DRAWING_POLYGON);
		  	var overlay;
		  	var _overlayComplete = function(e){
		  		overlay = e.overlay;
		 		manager.close();//关闭绘制
		 		//回调函数
		 		if(options && options.overlayComplete){
		 			executeOverlayComplete(options.overlayComplete,overlay);
		 			/*var args =  new Array ();
		 			options.overlayComplete.apply(this, args);*/
		 		} 


		 		if(options && (options.enableCopyMenu||options.enableRemoveMenu)){
		 			_this.addMenuItemBMap(overlay,orgiMap);
		 		}

		 	}
		 	manager.addEventListener('overlaycomplete',
		 		_overlayComplete);
		 	return overlay ;
		 },

      //基于高德地图的实现
	 this.drawAmap = function (options){
		 	//
		 	var _style =  options && options.style ? 
		 	Object.assign(this.defaultStyle, options.style) :this.defaultStyle;
		 	var mouseTool = new AMap.MouseTool(map.getMap());

		 	var methodMap = {
		 		'polygon': function(){mouseTool.polygon(_style)},
		 		'circle' : function(){mouseTool.circle(_style)},
		 		'polyline' : function(){mouseTool.polyline(_style)},
		 		'rectangle' : function(){mouseTool.rectangle(_style)},
		 	};

		 	var method = methodMap[options.type];
		 	if (!method) {
		 		console.log("AMap mouseTool inits failed !");
		 		return;
		 	}
		 	method();

		 	var overlay;
		 	var _overlayComplete = function(e){
		 		overlay = e.obj;
		 		mouseTool.close();//关闭绘制
		 		//回调函数
		 		if(options && options.overlayComplete){
		 			executeOverlayComplete(options.overlayComplete,overlay);
		 		} 
		 		if(options || options.enableCopyMenu){
		 			//KingMap.Drawing.addMenuItemBMap(overlay);
		 		}

		 	}
		 	mouseTool.on('draw',_overlayComplete);
		 	return overlay;
	 };
	 var executeOverlayComplete = function (overlaycomplete,overlay){
	 	if (typeof overlaycomplete === "function") {
	 		overlaycomplete(overlay);
	 	}

	 }
	 this.addCopyMenuItem = function(_overlay,map){




	 };
	// 添加右键菜单的静态方法
	this.addMenuItemBMap = function(_overlay,map) {

    	var overlayCopy;// 复制粘贴存放的对象
    	var editingOpt = 'click';
		var mapMenu;// 地图右键菜单
		var pasteItem;
		var _this = this;
		var removeOverlayer = function(e, ee, overlay) {
		//这里this 是bind传来的overlay 指针
			//drawing.overlays.remove(this);
			map.removeOverlay(this);
		}

		var pasteOverlay;
		// 粘贴多边形
		var pastePolygon = function(e, ee) {
			console.log(e);
			if (!overlayCopy || !overlayCopy.getPath()) {
				return;
			}
		    // 粘贴的算法为：所有点简单平移
		    var path = overlayCopy.getPath();
		    var d_lng = e.lng - path[0].lng;
		    var d_lat = e.lat - path[0].lat;
		    var newPath = new Array();
		    for (i = 0; i < path.length; i++) {
		    	var point = new BMap.Point(path[i].lng + d_lng, path[i].lat + d_lat);
		    	newPath.push(point);
		    }
		    pasteOverlay = new BMap.Polygon(newPath, KpOverlay.getStyle(overlayCopy));


		    map.addOverlay(pasteOverlay);

		    // 
		    _this.addMenuItemBMap(pasteOverlay,map);
		}
		var copyPolygon = function(e, ee, overlay) {

		    overlayCopy = overlay;//
		    if (!mapMenu) {
		    	mapMenu = new BMap.ContextMenu();
		    }
		    if (!pasteItem) {
		    	pasteItem = new BMap.MenuItem('粘贴', pastePolygon);
		    }

		    mapMenu.addItem(pasteItem);
		    map.addContextMenu(mapMenu);
		   
		}

		var overlayMenu = new BMap.ContextMenu();
        // 添加复制右键
        var copyMenuItem = new BMap.MenuItem('复制', copyPolygon.bind(_overlay));
        overlayMenu.addItem(copyMenuItem);
        // 删除
        var removeMenuItem = new BMap.MenuItem('删除', removeOverlayer
        	.bind(_overlay));
        overlayMenu.addItem(removeMenuItem);
        _overlay.addContextMenu(overlayMenu);
        return _overlay;
    };


};

KpOverlay = {
	/* 判断是否为覆盖物*/
	isOverlay : function(overlay){
		if (!overlay || !overlay._type||overlay._type != 'overlay' ) {
			return false;
		}
    		//其他判断标准TODO:
    		return true;
    	},

	getStyle :function (overlay){
		if (this.isOverlay(overlay)== false ) {return;}
    		return {
    			strokeColor : overlay.getStrokeColor(),
    			strokeStyle : overlay.getStrokeStyle(),
    			strokeOpacity : overlay.getStrokeOpacity(),
    			strokeWeight : overlay.getStrokeWeight(),
    			fillOpacity : overlay.getFillOpacity(),
    			fillColor : overlay.getFillColor(),
    		}


    	}
    }










