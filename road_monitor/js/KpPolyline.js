/**
 * @api {POST GET} /describe 描述
 * @apiName describe
 * @apiVersion 1.0.0
 * @apiDescription 创建一个折线覆盖物实例<br>
 * @apiGroup Polyline

 * @apiExample {js} 示例
 //构造示例
 kpPolyline=new  KingMap.Polyline(map,options);

 //方法调用
 kpPolyline.deleteKp();

 //监听事件
 kpPolyline.addEventListenerKp(event,handler);
 */
 KingMap.Polyline = function(map,options) {
    /**
     * @api {POST GET} /construction 构造器
     * @apiName construction
     * @apiVersion 1.0.0
     * @apiGroup Polyline
     * @apiExample 定义示例
     kpPolyline=new  KingMap.Polyline(polylineArray);
     //testPolyline 是初始化数据。
     * @apiExample 调用示例
     kpPolyline.getPolylineKp();
     * @apiParam {Object} polylineArray 初始化数据,json格式
     格式:{
        strokeColor: "red",
        strokeWeight: "5",
        strokeOpacity: "0.5",
        path: [
            [111.885739, 21.71276],
            [111.874241, 21.749289],
            [111.802951, 21.94896],
            [111.802951, 22.041186]
        ]
    }
     */
    var polyline;
    var bmapNewPoints = function (pointArray) {
        var points = [];  // 添加海量点数据
        for (var i = 0; i < pointArray.length; i ++) {
            var p = new BMap.Point(pointArray[i][0], pointArray[i][1]);
            points.push(p);
        }
        return points;
    };
    var opts = {
        zIndex: 1,   //折线覆盖物的叠加顺序
        path: null,        //点的集合
        strokeStyle: "solid",   //线样式
        strokeColor: "black",   //折线颜色
        strokeWeight: "5",      //折线宽度
        strokeOpacity: "0.5",   //折线透明度
        isOutline: false,       //线条是否带描边，默认false
        borderWeight: 1,        //描边的宽度，默认为1
        outlineColor: "#000000",        //线条描边颜色，此项仅在isOutline为true时有效，默认：#000000
        enableMassClear: true,	    //是否在调用map.clearOverlays清除此覆盖物，默认为true
        enableEditing: false,	    //是否启用线编辑，默认为false
        enableClicking: true,    //是否响应点击事件，默认为true
        icons: null	                //配置贴合折线的图标 Array<IconSequence> IconSequence(symbol: Symbol, offset: string, repeat: string, fixedRotation: boolean)
    };
    
    opts = Object.assign(opts, options);
    
    if (map.apiType == "AMap") {
        polyline = new AMap.Polyline(opts);
        polyline.id = Math.random().toString(36).substr(2);
        polyline.setMap(map);

    } else if (map.apiType == "BMap") {
        polyline = new BMap.Polyline(bmapNewPoints(opts.path), opts);   //创建折线
        polyline.id = Math.random().toString(36).substr(2);
        map.addOverlay(polyline);   //增加折线
    }

    /**
     * @api {POST GET} /function 方法
     * @apiName function
     * @apiVersion 1.0.0
     * @apiDescription 可使用的方法
     * @apiGroup Polyline
     * @apiExample 示例
     kpPolyline.deleteKp();
     var polyline = kpPolyline.getPolylineKp();
     * @apiParam {none} deleteKp	删除折线覆盖物,
     * @apiParam {none} getPolylineKp 获取折线覆盖物
     返回polyline对象
     * @apiParam {Object} setPathKp 设置折线覆盖物的点数组
     object.pointArray为折线覆盖物的点数组
     * @apiParam {none} getPathKp 获取折线覆盖物的点数组
     返回Path数组

     * @apiParam {Object} setColorKp 设置折线覆盖物的颜色
     object.color为折线覆盖物的颜色
     * @apiParam {none} getColorKp 获取折线覆盖物的颜色
     返回color

     * @apiParam {Object} setOpacityKp 设置折线覆盖物的透明度
     object.opacity为折线覆盖物的透明度
     * @apiParam {none} getOpacityKp 获取折线覆盖物的透明度
     返回opacity

     * @apiParam {Object} setWeightKp 设置折线覆盖物的宽度
     object.weight为折线覆盖物的宽度
     * @apiParam {none} getWeightKp 获取折线覆盖物的宽度
     返回weight
     * @apiParam {string} addEventListenerKp 事件绑定，event 需要绑定的事件名，handler 绑定的事件功能函数
     * @apiParam {string} removeEventListenerKp 事件解绑，event 需要绑定的事件名，handler 绑定的事件功能函数
     */

    //删除折线
    var deletePolyline = function () {
        if (map.apiType == "AMap") {
            map.remove(polyline)
        } else if (map.apiType == "BMap") {
            map.removeOverlay(polyline);
        }
    };
    //获取折线
    var getPolyline = function () {
        return polyline;
    };
    //设置折线的点数组
    var setPath = function (object) {
        var array = object.pointArray;
        polyline.setPath(array);
    };
    //获取折线的点数组
    var getPath = function () {
        return polyline.getPath();
    };
    //设置折线的颜色
    var setColor = function (object) {
        var color = object.color;
        if (map.apiType == "AMap") {
            var options = new Object();
            options.strokeColor = color;
            polyline.setOptions(options);
        } else if (map.apiType == "BMap") {
            polyline.setStrokeColor(color);
        }
    };
    //获取折线的颜色
    var getColor = function () {
        if (map.apiType == "AMap") {
            return polyline.getOptions().strokeColor;
        } else if (map.apiType == "BMap") {
            return polyline.getStrokeColor();
        }
    };
    //设置透明度
    var setOpacity = function (object) {
        var Opacity = object.opacity;
        if (map.apiType == "AMap") {
            var options = new Object();
            options.strokeOpacity = Opacity;
            polyline.setOptions(options);
        } else if (map.apiType == "BMap") {
            polyline.setStrokeOpacity(Opacity);
        }
    };
    //获取透明度
    var getOpacity = function () {
        if (map.apiType == "AMap") {
            return polyline.getOptions().strokeOpacity;
        } else if (map.apiType == "BMap") {
            return polyline.getStrokeOpacity();
        }
    };
    //设置线的宽度
    var setWeight = function (object) {
        var weight = object.weight;
        if (map.apiType == "AMap") {
            var options = new Object();
            options.strokeWeight = weight;
            polyline.setOptions(options);
        } else if (map.apiType == "BMap") {
            polyline.setStrokeWeight(weight);
        }
    };
    //获取线的宽度
    var getWeight = function () {
        if (map.apiType == "AMap") {
            return polyline.getOptions().strokeWeight;
        } else if (map.apiType == "BMap") {
            return polyline.getStrokeWeight();
        }
    };
    
    /**
	 * 覆盖物事件绑定
     * @param {String} event 事件名
     * @param {Function} handler 事件功能函数 
	 */
	var addEventListener = function(event, handler) {
		if(map.apiType == 'AMap') {
			 polyline.on(event, handler);
		}
		if(map.apiType == 'BMap') {
			 polyline.addEventListener(event, handler);
		}
	};
	
	/**
	 * 覆盖物事件绑定移除
     * @param {String} event 事件名
     * @param {Function} handler 事件功能函数 
	 */
	var removeEventListener = function(event,handler){
        if(map.apiType=='AMap'){
             polyline.off(event, handler);
        }else{
             polyline.removeEventListener(event, handler);
        }
    };
    
    return {
        deleteKp: deletePolyline,
        getPolylineKp: getPolyline,
        setPathKp: setPath,
        getPathKp: getPath,
        setColorKp: setColor,
        getColorKp: getColor,
        setOpacityKp: setOpacity,
        getOpacityKp: getOpacity,
        setWeightKp: setWeight,
        getWeightKp: getWeight,
        addEventListenerKp:addEventListener,
        removeEventListenerKp:removeEventListener
    };
}

