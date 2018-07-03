/**
 * @api {POST GET} /describe 描述
 * @apiName describe
 * @apiVersion 1.0.0
 * @apiDescription 创建一个文本标注实例<br>
 * @apiGroup Label

 * @apiExample {js} 示例
 //构造示例
 kpLabel=new KingMap.Label(map,options);

 //方法调用
 kpLabel.deleteKp();

 //监听事件
 kpLabel.addEventListenerKp(event,handler);
 */
 KingMap.Label=function(kpMap,options){
    /**
     * @api {POST GET} /construction 构造器
     * @apiName construction
     * @apiVersion 1.0.0
     * @apiGroup Label
     * @apiExample 定义示例
     kpLabel=new KingMap.Label(labelArray);
     //labelArray 是初始化数据。
     * @apiExample 调用示例
       kpLabel.getLabelKp();
     * @apiParam {Object} labelArray 初始化数据,json格式
     格式:{
         option:{
             position: [109.175995, 23.017055],    // 指定文本标注所在的地理位置
             text: "这是一个简单的文本标注哦~",
             offsets:[-10,-0]	//点标记显示位置偏移量
         },
         style: {
             color: "red",
             fontSize: "12px",
             height: "20px",
             lineHeight: "20px",
             fontFamily: "微软雅黑"
         }
     }
     */
	var map = kpMap.getMap();
	var apiType = map.apiType;
	var label;
	var opts={
    	option: {
            text: "这是一个简单的文本标注哦~",
			position: map.getCenter(),    // 指定文本标注所在的地理位置
			zIndex:1,   //标记覆盖物的叠加顺序
			offsets:[-10,-34]	//点标记显示位置偏移量
		},
		style: {
			color: "red",
			fontSize: "12px",
			height: "20px",
			lineHeight: "20px",
			fontFamily: "微软雅黑"
		}
	};
	var labelOptionStyle = new Object();
	labelOptionStyle.option = Object.assign(opts.option, options.option);
	labelOptionStyle.style = Object.assign(opts.style, options.style);
        
	if (apiType == "AMap") {
		labelOptionStyle.option.offset=new AMap.Pixel(labelOptionStyle.option.offsets[0],labelOptionStyle.option.offsets[1]);
		label = new AMap.Text(labelOptionStyle.option);
		label.setStyle(labelOptionStyle.style);
		label.id = Math.random().toString(36).substr(2) ;
		label.setMap(map);
	}else if (apiType == "BMap") {
		labelOptionStyle.option.offset=new BMap.Size(labelOptionStyle.option.offsets[0],labelOptionStyle.option.offsets[1]);
			label = new BMap.Label(labelOptionStyle.option.text, {position: new BMap.Point(labelOptionStyle.option.position[0], labelOptionStyle.option.position[1])});  // 创建文本标注对象
			label.setStyle(labelOptionStyle.style);
			label.setZIndex(labelOptionStyle.option.zIndex);
			label.id = Math.random().toString(36).substr(2) ;
			map.addOverlay(label);
	};
    /**
     * @api {POST GET} /function 方法
     * @apiName function
     * @apiVersion 1.0.0
     * @apiDescription 可使用的方法
     * @apiGroup Label
     * @apiExample 示例
     kpLabel.deleteKp();
     var label = kpLabel.getLabelKp();

     * @apiParam {none} deleteKp	删除文本标注,
     * @apiParam {none} getLabelKp 获取文本标注
     返回label对象
     * @apiParam {Object} setContentKp 设置文本标注的内容
     Object.content为文本标注的内容
     * @apiParam {none} getContentKp 获取文本标注的内容
     返回label对象
     * @apiParam {Object} setStyleKp 设置文本标注的style
     Object.style格式：{
                color: "red",
                fontSize: "12px",
                height: "20px"
            }
     * @apiParam {Object} setPositionKp 设置文本标注的Position
     Object.position格式:[109.175995, 23.017055]
     * @apiParam {string} addEventListenerKp 事件绑定，event 需要绑定的事件名，handler 绑定的方法名
     * @apiParam {string} removeEventListenerKp 事件解绑，event 需要绑定的事件名，handler 绑定的方法名
     */
	var deleteLabel=function () {
        if(apiType=="AMap") {
            map.remove(label)
        }else if(apiType=="BMap"){
            map.removeOverlay(label);
        };
    };

    var getLabel=function () {
        return Label;
    };


    var setContent=function (Object) {
        var content = Object.content;
        if(apiType=="AMap") {
            label.setText(content);
        }else if(apiType=="BMap"){
            label.setContent(content);
        };
    };

    var getContent=function () {
        if(apiType=="AMap") {
            return label.getText();
        }else if(apiType=="BMap"){
            return label.getContent();
        }
    };

    var setStyle=function (Object) {
        var style = Object.style;
        if(apiType=="AMap") {
            label.setStyle(style);
        }else if(apiType=="BMap"){
            label.setStyle(style);
        };
    };

    var setPosition=function (Object) {
        var position = Object.position;
        if(apiType=="AMap") {
            label.setPosition(new AMap.LngLat(position[0],position[1]));
        }else if(apiType=="BMap"){
            label.setPosition(new BMap.Point(position[0],position[1]));
        };
    };

	/**
	 * 覆盖物事件绑定
     * @param {String} event 事件名
     * @param {Function} handler 事件功能函数 
     */
     var addEventListener = function(event, handler) {
		if(apiType == 'AMap') {
			label.on(event, handler);
		}
		if(apiType == 'BMap') {
			label.addEventListener(event, handler);
		}
	};

	/**
	 * 覆盖物事件绑定移除
     * @param {String} event 事件名
     * @param {Function} handler 事件功能函数 
     */
	var removeEventListener = function(event,handler){
		if(apiType=='AMap'){
			label.off(event, handler);
		}else{
			label.removeEventListener(event, handler);
		}
	};

	var getApiType = function(){
		return apiType;
	}

	var getOptions = function(){
		return opts;
	}
	return {
		delete : deleteLabel,
		getOverlay : getLabel,
		setContent : setContent,
		getContent : getContent,
		setStyle : setStyle,
		setPosition : setPosition,
		addEventListener : addEventListener,
		removeEventListener : removeEventListener,
		getApiType : getApiType,
		getOptions : getOptions
	};
};

