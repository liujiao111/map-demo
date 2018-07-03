var KingMap = window.KingMap = KingMap || {};
(function(){
    /**
     * 基础地图点标记构造方法  v0.1
     * V0.1 BMap，AMap的Marker构造方法，以及公共方法,返回
     * @param {Object} kpmap 封装的地图对象
     * @param {Object} options 构造marker的基础参数
     */

    KingMap.Marker = function(map,options){
        //原生地图对象
        var map = map.getMap();
        var apiType = map.apiType;
        var opts = {
            //经度，默认为BaseMap中设定的经度
            lng : 113.330914,  
            //纬度，默认为BaseMap中设定的纬度
            lat : 23.128659,
            //横向偏移，默认为0
            offsetX : 0,
            //纵向偏移，默认为0
            offsetY : 0,
            //是否可被清除，默认可被清除
            enableMassClear : true,
            //是否可拖拽，默认可拖拽
            enableDragging : true,
            //是否可点击，默认可点击
            enableClicking : true,
            //拖拽标注时，标注是否开启离开地图表面效果 
            raiseOnDrag : false,
            //拖拽标注时的鼠标指针样式，默认标准样式
            draggingCursor : 'auto',
            //旋转角度，默认0度
            rotation : 0,
            //阴影图标，默认无
            shadow : '',    
            //鼠标移到marker上的显示内容，默认为测试内容   
            title : ''
        }
        opts = Object.assign(opts,options);

        var marker = {};
        /**
         * marker的position为默认位置
         * 偏移offset默认为0
         * icon默认使用原版设置，修改请使用setIcon方法
         * marker默认开启拖拽功能
         * marker默认不旋转
         * marker默认可点击
         * maker阴影图标默认无
         * marker鼠标样式默认为标准样式
         */
        if(apiType=="AMap"){
            var lngA = map.getCenter().getLng();
            var latA = map.getCenter().getLat();
            opts = Object.assign(opts,{lng:lngA,lat:latA});
            marker = new AMap.Marker({
                position : new AMap.LngLat(opts.lng,opts.lat),
                offset : new AMap.Pixel(opts.offsetX,opts.offsetY),
                content : '',   //标记内容，默认为icon
                topWhenClick : false,   //鼠标点击时marker是否置顶
                bubble : false, //是否将覆盖物的鼠标或touch等事件冒泡到地图上 
                draggable : opts.enableDragging,    //是否可拖拽
                raiseOnDrag : false,    //设置拖拽点标记时是否开启点标记离开地图的效果
                cursor : opts.draggingCursor,   //自定义鼠标样式
                visible : true,  //点标记是否可见
                zIndex : 100,   //点标记的叠加顺序
                angle : opts.rotation,  //点的旋转角度
                autoRotation : false,   //是否自动旋转
                animation : 'AMAP_ANIMATION_NONE',  //点标记的动画效果,默认无动画效果
                shadow : opts.shadow,   //点标记阴影，不设置该属性则点标记无阴影
                title : opts.title, //鼠标移到marker上的显示内容
                clickable : true    //点标记是否可点击
            });
            marker.setMap(map);
        }else{
            var lngB = map.getCenter().lng;
            var latB = map.getCenter().lat;
            opts = Object.assign(opts,{lng:lngB,lat:latB});
            marker = new BMap.Marker(new BMap.Point(opts.lng,opts.lat),{
                offset : new BMap.Size(opts.offsetX,opts.offsetY),  //标注的位置偏移值 
                enableMassClear : opts.enableMassClear, //是否在调用map.clearOverlays清除此覆盖物，默认为true            
                enableDragging : opts.enableDragging,   //是否启用拖拽，默认为false
                enableClicking : opts.enableClicking,   //是否响应点击事件。默认为true
                raiseOnDrag : opts.raiseOnDrag, //拖拽标注时，标注是否开启离开地图表面效果。默认为false
                draggingCursor : opts.draggingCursor,   //拖拽标注时的鼠标指针样式。此属性值需遵循CSS的cursor属性规范
                rotation : opts.rotation,   //旋转角度
                shadow : opts.shadow,   //阴影图标            
                title : opts.title  //鼠标移到marker上的显示内容
            });
            map.addOverlay(marker);
        }

        /**
         * 设置标注所用的图标对象
         * 高德可以直接传入HTML片段或者icon对象
         * 高德icon对象示例
         * AMap.Icon({
         *  size : new AMap.Size(sizeX,sizeY),  //图标尺寸，默认值(36,36)
         *  imageOffset : new AMap.Pixel(pixelX,pixelY),    //图标取图偏移量。
         *  //当image中指定了一个大图时，可通过size和imageOffset配合，显示图标的指定范围
         *  image : String  //图标的取图地址。默认为蓝色图钉图片
         *  imageSize : new AMap.Size(sizeX,sizeY), //图标所用图片大小，根据所设置的大小拉伸或压缩图片，
         *  //等同于CSS中的background-size属性。可用于实现高清屏的高清效果
         * })
         * 
         * 
         * 百度只能传入icon对象
         * 百度icon对象示例
         * BMap.Icon(url,new BMap.Size(sizeX,sizeY),{   //以给定的图像地址和大小创建图标对象实例,size图标可视区域的大小
         *  anchor : new BMap.Size(sizeX,sizeY),    //图标的定位锚点。此点用来决定图标与地理位置的关系，
         *  //是相对于图标左上角的偏移值，默认等于图标宽度和高度的中间值
         *  imageOffset : new BMap.Size(sizeX,sizeY),   //图片相对于可视区域的偏移值
         *  infoWindowAnchor : new BMap.Size(sizeX,sizeY)   //信息窗口定位锚点。
         *  //开启信息窗口时，信息窗口底部尖角相对于图标左上角的位置，默认等于图标的anchor
         *  printImageUrl : String  //用于打印的图片，此属性只适用于IE6，为了解决IE6在包含滤镜的情况下打印样式不正确的问题
         * })
         */
        /**
         * 
         * @param {Array} imageSize 显示区域大小与图标大小
         * @param {String} url 图标所用地址
         * @param {Array} imageOffset 图标偏移值
         */
        var setIcon = function(kpIcon){
            marker.setIcon(kpIcon.getIcon());
        }
        /**
         * 获取标注所用的图标对象
         * 高德返回的是icon对象或者content片段
         * 百度返回的是icon对象
         * 参考icon对象进行设置
         */
        var getIcon = function(){
            var kpIcon = {};
            var icon = marker.getIcon();
            var methodMap = {
                'AMap' : function(){
                    kpIcon = new KingMap.Icon({
                        url : icon.G.image,
                        imageOffset : [icon.G.imageOffset.getX(),icon.G.imageOffset.getY()],
                        imageSize : [icon.G.size.getWidth(),icon.G.size.getHeight()],
                        apiType : 'AMap'
                    });
                },
                'BMap' : function(){
                    kpIcon = new KingMap.Icon({
                        url : icon.imageUrl,
                        imageOffset : [icon.imageOffset.x,icon.imageOffset.y],
                        size : [icon.size.width,icon.size.height],
                        apiType : 'BMap'
                    })
                }
            }
            var method = methodMap[apiType];
            method();
            return kpIcon;
        }

        /**
         * 设置标注的地理坐标
         * @param {Number} positonX 经度 Number
         * @param {Number} positonY 纬度 Number
         */
        var setPosition = function(kpPoint){
            marker.setPosition(kpPoint.getPoint(apiType));
        }
        /**
         * 获取标注的地理坐标
         */
        var getPosition = function(){
            var point = {};
            var position = marker.getPosition();
            var methodMap = {
                'AMap' : function(){
                    point = new KingMap.Point(position.getLng(),position.getLat());
                },
                'BMap' : function(){
                    point = new KingMap.Point(position.lng,position.lat);
                }
            }
            var method = methodMap[apiType];
            if(!method){
                console.log('apiType 错误');
            }
            method();
            return point;
        }

        /**
         * 设置点标记旋转角度
         * 高德使用方法为setAngle()
         * 百度使用方法为setRotation()
         * 参数为number
         * @param {Number} angle Number
         */
        var setAngle = function(angle){
            if(apiType=="AMap"){
                marker.setAngle(angle);
            }else{
                marker.setRotation(angle);
            }
        }
        /**
         * 获得点标记旋转角度
         * 高德使用方法为getAngle()
         * 百度使用方法为getRotation()
         * 返回参数为number
         */
        var getAngle = function(){
            if(apiType=='AMap'){
                return marker.getAngle();
            }else{
                return marker.getRotation();
            }
        }

        /**
         * 设置ZIndex
         * 参数为number
         * @param {Number} zIndex Number
         */
        var setZIndex = function(zIndex){
            switch(apiType){
                case "AMap":
                marker.setzIndex(zIndex);
                break;
                case "BMap":
                marker.setZIndex(zIndex);
                break;
                default:
                console.log("覆盖物的地图类型设置错误");
                break;
            }
        }

        /**
         * 设置拖拽功能
         * 高德方法为setDraggable
         * 百度方法为enableDragging
         */
        var setDraggable = function(){
            switch(apiType){
                case "AMap":
                marker.setDraggable(true);
                break;
                case "BMap":
                marker.enableDragging();
                break;
                default:
                console.log("覆盖物的地图类型设置错误");
                break;
            }
        }
        /**
         * 关闭拖拽功能
         */
        var closeDraggable = function(){
            switch(apiType){
                case "AMap":
                marker.setDraggable(false);
                break;
                case "BMap":
                marker.disableDragging();
                break;
                default:
                console.log("覆盖物的地图类型设置错误");
                break;
            }
        }
        /**
         * 设置标记文本标签内容
         * 高德参数为Object
         * 高德object示例
         * {//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
                content: "我是一个小栗子"
            }
        * 
        * 百度参数为Label类
        * 百度Label类示例
        * BMap.Label(content,{ //创建一个文本标注实例
        *  offset : new BMap.Size(sizeX,SizeY),    //文本标注的位置偏移值
        *  position : new BMap.Point(pointX,pointY),   //文本标注的地理位置
        *  enableMassClear : Boolean   //是否在调用map.clearOverlays清除此覆盖物，默认为true
        * })
        */
        /**
         * 
         * @param {String} content label上的文字
         * @param {Array} offset 与原点的偏离值
         */
        var setLabel = function(content,offset){
            var label;
            var methodMap = {
                'AMap' : function(){
                    label = {
                        offset : new AMap.Pixel(offset?offset[0]:20,offset?offset[1]:20),
                        content : content
                    }
                },
                'BMap' : function(){
                    label = new BMap.Label(content,{
                        offset : new BMap.Size(offset?offset[0]:20,offset?offset[1]:20),
                    });
                }
            }
            var method = methodMap[apiType];
            if(!method){
                console.log("覆盖物的地图类型设置错误");
            }
            method();
            marker.setLabel(label);
        }
        /**
         * 获取点标记文本标签内容
         * 高德返回Object对象
         * 百度返回Label类
         */
        var getLabel = function(){
            var text = marker.getLabel();
            var label = {
                option : {
                    text : '',
                    offset : [0,0],
                    position : [opts.lng,opts.lat]
                }
            };
            var methodMap = {
                'AMap' : function(){
                    label.option = Object.assign(label.option,{
                        text : text.getText(),
                        offset : [text.offset.getX(),text.offset.getY()],
                        position : [marker.getPosition.getLng(),marker.getPosition.getLat()]
                    });
                },
                'BMap' : function(){
                    label.option = Object.assign(label.option,{
                        text : text.getContent(),
                        offset : [text.getOffset().width,text.getOffset().height],
                        position : [marker.getPosition.lng,marker.getPosition.lat]
                    });
                }
            }
            var method = methodMap[apiType];
            if(!method){
                console.log("覆盖物的地图类型设置错误");
            }
            method();
            var kpLabel = new KingMap.Label(kpmap,label);
            return kpLabel;
        }

        /**
         * 设置鼠标滑过点标时的文字提示
         * 参数为String
         * @param {String} title String
         */
        var setTitle = function(title){
            marker.setTitle(title);
        }
        /**
         * 获取点标记的文字提示
         * 返回参数String
         */
        var getTitle = function(){
            return marker.getTitle();
        }

        /**
         * 设置或者取消置顶
         * 地图上有多个marker时，当isTop为true时，marker将显示在最前面；当为false时，marker取消置顶
         * @param {Boolean} isTop Bollean
         */
        var setTop = function(isTop){
            marker.setTop(isTop);
        }

        /**
         * 为marker设置阴影效果
         * 高德和百度的icon类结构有区别
         * 高德icon对象示例
         * AMap.Icon({
         *  size : new AMap.Size(sizeX,sizeY),  //图标尺寸，默认值(36,36)
         *  imageOffset : new AMap.Pixel(pixelX,pixelY),    //图标取图偏移量。
         *  //当image中指定了一个大图时，可通过size和imageOffset配合，显示图标的指定范围
         *  image : String  //图标的取图地址。默认为蓝色图钉图片
         *  imageSize : new AMap.Size(sizeX,sizeY), //图标所用图片大小，根据所设置的大小拉伸或压缩图片，
         *  //等同于CSS中的background-size属性。可用于实现高清屏的高清效果
         * })
         * 
         * 百度icon对象示例
         * BMap.Icon(url,new BMap.Size(sizeX,sizeY),{   //以给定的图像地址和大小创建图标对象实例
         *  anchor : new BMap.Size(sizeX,sizeY),    //图标的定位锚点。此点用来决定图标与地理位置的关系，
         *  //是相对于图标左上角的偏移值，默认等于图标宽度和高度的中间值
         *  imageOffset : new BMap.Size(sizeX,sizeY),   //图片相对于可视区域的偏移值
         *  infoWindowAnchor : new BMap.Size(sizeX,sizeY)   //信息窗口定位锚点。
         *  //开启信息窗口时，信息窗口底部尖角相对于图标左上角的位置，默认等于图标的anchor
         *  printImageUrl : String  //用于打印的图片，此属性只适用于IE6，为了解决IE6在包含滤镜的情况下打印样式不正确的问题
         * })
         */
        var setShadow = function(kpIcon){
            marker.setShadow(kpIcon.getIcon());
        }
        /**
         * 获取marker的阴影图标
         * 高德和百度返回的icon类结构有区别
         */
        var getShadow = function(){
            var kpIcon = {};
            var icon = marker.getShadow();
            var methodMap = {
                'AMap' : function(){
                    kpIcon = new KingMap.Icon({
                        url : icon.G.image,
                        imageOffset : [icon.G.imageOffset.getX(),icon.G.imageOffset.getY()],
                        imageSize : [icon.G.size.getWidth(),icon.G.size.getHeight()],
                        apiType : 'AMap'
                    });
                },
                'BMap' : function(){
                    kpIcon = new KingMap.Icon({
                        url : icon.imageUrl,
                        imageOffset : [icon.imageOffset.x,icon.imageOffset.y],
                        size : [icon.size.width,icon.size.height],
                        apiType : 'BMap'
                    })
                }
            }
            var method = methodMap[apiType];
            method();
            return kpIcon;
        }

        /**
         * 设置Marker偏移量
         * 高德参数为Pixel类
         * 百度参数为Size类
         * @param {Number} offsetX Number
         * @param {Number} offsetY Number
         */
        var setOffset = function(offsetX,offsetY){
            offset = apiType=='AMap'?new AMap.Pixel(offsetX||0,offsetY||0):
                new BMap.Size(offsetX||0,offsetY||0);
            marker.setOffset(offset);
        }
        /**
         * 获取Marker偏移量
         * 高德返回Pixel类
         * 百度返回Size类
         */
        var getOffset = function(){
            return marker.getOffset();
        }

        /**
         * 设置动画效果
         * 1，无动画效果 'none'
         * 2，点标掉落效果 'drop'
         * 3，点标弹跳效果 'jump'
         * @param {Number} animation Number
         */
        var setAnimation = function(animation){
            var animations = '';
            switch(animation){
                case 'none':
                    if(apiType=="AMap"){
                        animations = 'AMAP_ANIMATION_NONE';
                    }else{
                        animations = '';
                    }
                break;
                case 'drop':
                    if(apiType=="AMap"){
                        animations = 'AMAP_ANIMATION_DROP';
                    }else{
                        animations = BMAP_ANIMATION_DROP;
                    }
                break;
                case 'jump':
                    if(apiType=="AMap"){
                        animations = 'AMAP_ANIMATION_BOUNCE';
                    }else{
                        animations = BMAP_ANIMATION_BOUNCE;
                    }
                break;
                default:
                    if(apiType=="AMap"){
                        animations = 'AMAP_ANIMATION_NONE';
                    }else{
                        animations = '';
                    }
                break;
            }
            marker.setAnimation(animations);
        }

        /**
         * 百度事件描述
         * 事件	参数	描述
            click	event{type, target}	点击标注图标后会触发此事件
            dblclick	event{type, target, point,pixel}	双击标注图标后会触发此事件
            mousedown	event{type, target, point,pixel}	鼠标在标注图上按下触发此事件
            mouseup	event{type, target, point,pixel}	鼠标在标注图上释放触发此事件
            mouseout	event{type, target, point,pixel}	鼠标离开标注时触发此事件
            mouseover	event{type, target, point,pixel}	当鼠标进入标注图标区域时会触发此事件
            remove	event{type, target}	移除标注时触发
            infowindowclose	event{type, target}	信息窗在此标注上关闭时触发此事件
            infowindowopen	event{type, target}	信息窗在此标注上打开时触发此事件
            dragstart	event{type, target}	开始拖拽标注时触发此事件
            dragging	event{type, target, pixel, point}	拖拽标注过程中触发此事件
            dragend	event{type, target, pixel, point}	拖拽结束时触发此事件
            rightclick	event{type, target}	右键点击标注时触发此事件

        *
        * 高德事件描述
        * 事件	参数	说明
            click	MapsEvent	鼠标左键单击事件
            dblclick	MapsEvent	鼠标左键双击事件
            rightclick	MapsEvent	鼠标右键单击事件
            mousemove	MapsEvent	鼠标移动
            mouseover	MapsEvent	鼠标移近点标记时触发事件
            mouseout	MapsEvent	鼠标移出点标记时触发事件
            mousedown	MapsEvent	鼠标在点标记上按下时触发事件
            mouseup	MapsEvent	鼠标在点标记上按下后抬起时触发事件
            dragstart	MapsEvent	开始拖拽点标记时触发事件
            dragging	MapsEvent	鼠标拖拽移动点标记时触发事件
            dragend	MapsEvent	点标记拖拽移动结束触发事件
            moving	Object	点标记在执行moveTo，moveAlong动画时触发事件，Object对象的格式是{passedPath:Array.<LngLat>}。其中passedPath为Marker对象在moveAlong或者moveTo过程中已经走过的路径。
            moveend		点标记执行moveTo动画结束时触发事件，也可以由moveAlong方法触发
            movealong		点标记执行moveAlong动画一次后触发事件
            touchstart	MapsEvent	触摸开始时触发事件，仅适用移动设备
            touchmove	MapsEvent	触摸移动进行中时触发事件，仅适用移动设备
            touchend	MapsEvent	触摸结束时触发事件，仅适用移动设备
        */
        /**
         * 事件绑定
         * 高德使用on方法
         * 百度使用addEventListener方法
         * @param {String} event 事件名
         * @param {Function} handler 事件功能函数 
         */
        var addEventListener = function(event,handler){ 
            var MapsEvent = {};
            var methodMap = {
                "AMap" : function(){
                    marker.on(event,function({type,target,pixel,lnglat}){
                        MapsEvent = Object.assign(MapsEvent,{
                            type : type,
                            target : target,
                            point : new KingMap.Point(lnglat.lng,lnglat.lat),
                            pixel : [pixel.x,pixel.y]
                        })
                        if(type){
                            handler(MapsEvent);
                        }
                    });
                },
                "BMap" : function(){
                    marker.addEventListener(event,function({type,target,point,pixel}){
                        MapsEvent = Object.assign(MapsEvent,{
                            type : type,
                            target : target,
                            point : new KingMap.Point(point.lng,point.lat),
                            pixel : [pixel.x,pixel.y]
                        })
                        if(type){
                            handler(MapsEvent);
                        }
                    });
                }
            }
            var method = methodMap[apiType];
            if(!method){
                return;
            }
            method();
        }
        /**
         * 事件解绑
         * 高德使用off方法
         * 百度使用removeEventListener方法
         * @param {String} event 事件名
         * @param {Function} handler 事件功能函数 
         */
        var removeEventListener = function(event,handler){
            switch(apiType){
                case "AMap":
                    marker.off(event,handler);
                break;
                case "BMap":
                    marker.removeEventListener(event,handler);
                break;
                default:
                    console.log("覆盖物的地图类型设置错误");
                break;
            }
        }

        /**
         * 获取原生marker对象
         */
        var getMarker = function(){
            return marker;
        }

        var getApiType = function(){
            return apiType;
        }

        var getOptions = function(){
            return opts;
        }
        /**
         * setIcon->获取标注所用的图标对象 高德返回的是icon对象或者content片段 百度返回的是icon对象
         * getIcon->获取标注所用的图标对象 高德返回的是icon对象或者content片段 百度返回的是icon对象
         * 
         * setAngle->获取标注所用的图标对象 高德返回的是icon对象或者content片段 百度返回的是icon对象
         * getAngle->获得点标记旋转角度 高德使用方法为getAngle() 百度使用方法为getRotation() 返回参数为number
         * 
         * setAnimation->设置动画效果 
         * 高德参数为String，可选值 “AMAP_ANIMATION_NONE”，无动画效果 
         * “AMAP_ANIMATION_DROP”，点标掉落效果
         * “AMAP_ANIMATION_BOUNCE”，点标弹跳效果 
         * 百度参数为Animation类
         * 
         * setDraggable->设置拖拽功能 高德方法为setDraggable 百度方法为enableDragging
         * setDraggable->setDraggable
         * 
         * setPosition->设置标注的地理坐标 高德地图参数为LngLat 百度地图参数为Point
         * getPosition->获取标注的地理坐标 高德地图返回参数为LngLat 百度地图返回参数为Point
         * 
         * setLabel->设置标记文本标签内容 高德参数为Object 百度参数为Label类
         * getLabel->获取点标记文本标签内容 高德返回Object对象 百度返回Label类
         * 
         * setOffset->设置Marker偏移量 高德参数为Pixel类 百度参数为Size类
         * getOffset->获取Marker偏移量 高德返回Pixel类 百度返回Size类
         * 
         * setRotation->设置点标记旋转角度 高德使用方法为setAngle() 百度使用方法为setRotation() 参数为number
         * getRotation->获得点标记旋转角度 高德使用方法为getAngle() 百度使用方法为getRotation() 返回参数为number
         * 
         * setShadow->为marker设置阴影效果 高德和百度的icon类结构有区别
         * getShadow->获取marker的阴影图标 高德和百度返回的icon类结构有区别
         * 
         * setTitle->设置鼠标滑过点标时的文字提示 参数为String
         * getTitle->获取点标记的文字提示 返回参数String
         * 
         * setTop->设置或者取消置顶 地图上有多个marker时，当isTop为true时，marker将显示在最前面；当为false时，marker取消置顶
         * 
         * setZIndex->设置ZIndex 参数为number
         * 
         * addEventListener->事件绑定 高德使用on方法 百度使用addEventListener方法
         * removeEventListener->事件解绑
         */
        return {
            setIcon : setIcon,
            getIcon : getIcon,
            setAngle : setAngle,
            getAngle : getAngle,
            setAnimation : setAnimation,
            setDraggable : setDraggable,
            closeDraggable : closeDraggable,
            setPosition : setPosition,
            getPosition : getPosition,
            setLabel : setLabel,
            getLabel : getLabel,
            setOffset : setOffset,
            getOffset : getOffset,
            setShadow : setShadow,
            getShadow : getShadow,
            setTitle : setTitle,
            getTitle : getTitle,
            setTop : setTop,
            setZIndex : setZIndex,
            addEventListener : addEventListener,
            removeEventListener : removeEventListener,
            getOverlay : getMarker,
            getApiType : getApiType,
            getOptions : getOptions
        };
    };
})();