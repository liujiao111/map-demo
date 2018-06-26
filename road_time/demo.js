var map;
var divList = new Map();
var blist = [];
var districtLoading = 0;
var polylineList = new Map();
var time ;
var oneTimeData = [];
var gradualColorInterval = 2;
var heatmapOverlay;
if(!isSupportCanvas()){
    alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
}
initialize();
/**
 * 道路网数据
 */
var road = {
    roadList: [],
    //colorList : ['rgb(255,255,0)', 'rgb(255,215,0)', 'rgb(244,164,96)', 'rgb(255,99,71)', 'rgb(255,69,0)', 'rgb(255,0,0)'],
	colorList : ['rgb(48,255,0,0.7)', 'rgb(186,255,0,0.7)', 'rgb(255,222,0,0.7)', 'rgb(255,168,0,0.7)', 'rgb(255,108,0,0.7)', 'rgb(255,0,0,0.7)'],
	
    /**
     * 给每条街道数据添加颜色属性
     * @param {Object} roadList
     */
    addRoadColor : function(roadList) {

        //获取最大值、最小值、颜色分段间隔
        var params = road.getCountParams(roadList);

        //给每条街道数据设置color属性
        var roadList = road.addColorBySplit(roadList, params);

        return roadList;
    },

    /**
     * 统计数据中人流量的最大值、最小值，以及分段间隔
     * @param {Object} countList
     */
    getCountParams : function(roadList) {

        var result = {}

        var minCount = roadList[0][0]['count'];
        var countSum = 0;
        var num = 0;
        var countList = [];
        for(var i = 0; i < roadList.length; i++) {
            var oneTimeRoadList = roadList[i];
            for(var j = 0; j < oneTimeRoadList.length; j++) {
                var roadCount = oneTimeRoadList[j]['count'];
                countSum += parseInt(roadCount);
                countList.push(roadCount);

                if(roadCount < minCount) {
                    minCount = roadCount;
                }
            }
        }

        //计算平均值
        var meanCount = countSum / countList.length; //1230

        //计算方差
        var sum = 0;
        for(var i = 0; i < countList.length; i ++){
            sum += Math.pow((countList[i] - meanCount) , 2);
        }
        var varianceCount = sum / countList.length;
        var standardCount = Math.sqrt(varianceCount);

        //最大值 = 均值 + 标准差的平方
        var maxCount = meanCount + standardCount * 2;

        //间隔d = ((最大值 - 最小值) / n) + 1
        var colorCount = road.colorList.length;
        var d = Math.round((maxCount - minCount) / colorCount) + 1;

        result['maxCount'] = maxCount;
        result['minCount'] = minCount;
        result['d'] = d;

        return result;
    },

    /**
     * 根据颜色分段参数给人流量分段设置颜色
     * @param {Object} roadList
     */
    addColorBySplit : function(roadList, params) {
        var maxCount = params['maxCount'];
        var minCount = params['minCount'];
        var d = params['d'];

        console.log("最大值：" + maxCount);
        console.log("最小值" + minCount);
        console.log("分段间隔：" + d);

        for(var i = 0; i < roadList.length; i++) {
            var oneTimeRoadList = roadList[i];
            for(var j = 0; j < oneTimeRoadList.length; j++) {
                var onePoint = oneTimeRoadList[j];
                var count = onePoint['count']
                if(count >= minCount && count < (minCount +d)) {
                    onePoint['color'] = road.colorList[0];
                } else if(count >= (minCount + d) && count < (minCount + 2 * d)) {
                    onePoint['color'] = road.colorList[1];
                } else if(count >= (minCount + 2 * d) && count < (minCount + 3 * d)) {
                    onePoint['color'] = road.colorList[2];
                } else if(count >= (minCount + 3 * d) && count < (minCount + 4 * d)) {
                    onePoint['color'] = road.colorList[3];
                } else if(count >= (minCount + 4 * d) && count < (minCount + 5 * d)) {
                    onePoint['color'] = road.colorList[4];
                } else if(count >= (minCount + 5 * d)) {
                    onePoint['color'] = road.colorList[5];
                }
            }
        }

        return roadList;
    },
    
    
    /**
     * 根据当前时刻和下一时刻的道路网数据， 重新组织道路网颜色数据， 进行渲染
     * @param {Object} nowRoadData  当前时刻的道路网数据
     * @param {Object} nextRoadData  下一时刻的道路网数据
     * @param {Object} changeIndex  渐变的次数
     */
    gradualChangeColor : function(nowRoadData, nextRoadData, changeIndex) {
    	for(var i = 0; i < nowRoadData.length; i ++) {
    		
    		var nowRoadColor = nowRoadData[i]['color'];
    		var nextRoadColor = nextRoadData[i]['color'];
    		var gradualColor = road.getMiddleColor(nowRoadColor, nextRoadColor, changeIndex);
    		
    		nowRoadData[i]['color'] = gradualColor;
    	}
    	return nowRoadData;
    },
    
	/**
	 * 根据前后颜色值获取中间颜色值
	 * @param {Object} nowRoadColor
	 * @param {Object} nextRoadColor
	 * @param {Object} changeIndex   1, 2, 3, 4
	 */
    getMiddleColor : function(nowRoadColor, nextRoadColor, changeIndex) {
    	var nowRgb = nowRoadColor.split('(')[1].split(')')[0];
    	var nowRed = parseInt(nowRgb.split(',')[0]);
    	var nowGreen = parseInt(nowRgb.split(',')[1]);
    	var nowBlue = parseInt(nowRgb.split(',')[2]);
    	
    	var nextRgb = nextRoadColor.split('(')[1].split(')')[0];
    	var nextRed = parseInt(nextRgb.split(',')[0]);
    	var nextGreen = parseInt(nextRgb.split(',')[1]);
    	var nextBlue = parseInt(nextRgb.split(',')[2]);
    	
    	var redIntervel =  Math.round((nextRed - nowRed) / gradualColorInterval);
    	var greenIntervel =  Math.round((nextGreen - nowGreen) / gradualColorInterval);
    	var blueIntervel =  Math.round((nextBlue - nowBlue) / gradualColorInterval);
    	
    	var redResult = nowRed + redIntervel * changeIndex;
    	var greenResult = nowGreen + greenIntervel * changeIndex;
    	var blueResult = nowBlue + blueIntervel * changeIndex;
		
		//rgb(48,255,0,0.7)
		var resultRgb = 'rgb(' +  redResult + "," + greenResult + "," + blueResult + "," + '0.7)';
		return resultRgb;
    }
}

/**
 * 线程休眠
 * @param {Object} numberMillis   单位是毫秒(1秒等于1000毫秒)
 */
function sleep(numberMillis) { 
	var now = new Date(); 
	var exitTime = now.getTime() + numberMillis; 
	while (true) { 
		now = new Date(); 
		if (now.getTime() > exitTime) 
			return; 
	} 
}

function initialize() {
    map = new BMap.Map("container", {
        enableMapClick: false
    }); // 创建地图实例，禁止点击地图底图
    //设置样式
    map.centerAndZoom(new BMap.Point(113.538478, 22.272419), 15);
    map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_SATELLITE_MAP,BMAP_HYBRID_MAP ]}));
    map.enableScrollWheelZoom(true);
    map.disableDoubleClickZoom()
    map.setMapStyle({
        styleJson: [
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": {
                    "color": "#021019"
                }
            },
            {
                "featureType": "highway",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#000000",
                    "visibility": "off"
                }
            },
            {
                "featureType": "highway",
                "elementType": "geometry.stroke",
                "stylers": {
                    "color": "#147a92",
                    "visibility": "off"
                }
            },
            {
                "featureType": "arterial",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#000000",
                    "visibility": "off"
                }
            },
            {
                "featureType": "arterial",
                "elementType": "geometry.stroke",
                "stylers": {
                    "color": "#0b3d51",
                    "visibility": "off"
                }
            },
            {
                "featureType": "local",
                "elementType": "geometry",
                "stylers": {
                    "color": "#000000",
                    "visibility": "off"
                }
            },
            {
                "featureType": "land",
                "elementType": "all",
                "stylers": {
                    "color": "#08304b"
                }
            },
            {
                "featureType": "railway",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#000000",
                    "visibility": "off"
                }
            },
            {
                "featureType": "railway",
                "elementType": "geometry.stroke",
                "stylers": {
                    "color": "#08304b",
                    "visibility": "off"
                }
            },
            {
                "featureType": "subway",
                "elementType": "geometry",
                "stylers": {
                    "lightness": -70,
                    "visibility": "off"
                }
            },
            {
                "featureType": "building",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#000000"
                }
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": {
                    "color": "#857f7f"
                }
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": {
                    "color": "#000000"
                }
            },
            {
                "featureType": "building",
                "elementType": "geometry",
                "stylers": {
                    "color": "#022338"
                }
            },
            {
                "featureType": "green",
                "elementType": "geometry",
                "stylers": {
                    "color": "#062032"
                }
            },
            {
                "featureType": "boundary",
                "elementType": "all",
                "stylers": {
                    "color": "#1e1c1c"
                }
            },
            {
                "featureType": "manmade",
                "elementType": "geometry",
                "stylers": {
                    "color": "#022338"
                }
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": {
                    "color": "#2da0c6",
                    "visibility": "on"
                }
            }
        ]
    });
    addDistrict('珠海');
}

function addDistrict(districtName) {
    //使用计数器来控制加载过程
    districtLoading++;
    var bdary = new BMap.Boundary();
    bdary.get(districtName,
        function(rs) { //获取行政区域
            var count = rs.boundaries.length; //行政区域的点有多少个
            if (count === 0) {
                alert('未能获取当前输入行政区域');
                return;
            }
            for (var i = 0; i < count; i++) {
                blist.push({
                    points: rs.boundaries[i],
                    name: districtName
                });
            };
            //加载完成区域点后计数器-1
            districtLoading--;
            if (districtLoading == 0) {
                //全加载完成后画端点
                drawBoundary();
            }
        });
}

function drawBoundary() {
    //包含所有区域的点数组
    var pointArray = [];
    /*画遮蔽层的相关方法
*思路: 首先在中国地图最外画一圈，圈住理论上所有的中国领土，然后再将每个闭合区域合并进来，并全部连到西北角。
*      这样就做出了一个经过多次西北角的闭合多边形*/
    //定义中国东南西北端点，作为第一层
    var pNW = {
        lat: 59.0,
        lng: 73.0
    }
    var pNE = {
        lat: 59.0,
        lng: 136.0
    }
    var pSE = {
        lat: 3.0,
        lng: 136.0
    }
    var pSW = {
        lat: 3.0,
        lng: 73.0
    }
    //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
    var pArray = [];
    pArray.push(pNW);
    pArray.push(pSW);
    pArray.push(pSE);
    pArray.push(pNE);
    pArray.push(pNW);
    //循环添加各闭合区域
    for (var i = 0; i < blist.length; i++) {
        //添加显示用标签层
        var label = new BMap.Label(blist[i].name, {
            offset: new BMap.Size(20, -10)
        });
        label.hide();
        map.addOverlay(label);
        //添加多边形层并显示
        var ply = new BMap.Polygon(blist[i].points, {
            strokeWeight: 2,
            strokeColor: "blue",
            fillOpacity: 0.01,
            fillColor: " #FFFFFF"
        }); //建立多边形覆盖物
        ply.name = blist[i].name;
        ply.label = label;
        map.addOverlay(ply);
        //添加名称标签层
        // var centerlabel = new BMap.Label(blist[i].name, { offset: new BMap.Size(0, 0) });
        // centerlabel.setPosition(ply.getBounds().getCenter());
        // map.addOverlay(centerlabel);
        //将点增加到视野范围内
        var path = ply.getPath();
        pointArray = pointArray.concat(path);
        //将闭合区域加到遮蔽层上，每次添加完后要再加一次西北角作为下次添加的起点和最后一次的终点
        pArray = pArray.concat(path);
        pArray.push(pArray[0]);
    }
    //限定显示区域，需要引用api库
    var boundply = new BMap.Polygon(pointArray);
    BMapLib.AreaRestriction.setBounds(map, boundply.getBounds());
    //map.setViewport(pointArray); //调整视野
    //添加遮蔽层
    var plyall = new BMap.Polygon(pArray, {
        strokeOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 0.01,
        fillColor: "#ffffff",
        fillOpacity: 0.01
    }); //建立多边形覆盖物
    map.addOverlay(plyall);
    getBoundary();
}

function getBoundary() {
    var data =road_data_v1;
        for (var i = 0; i <data.length ; i++) {
            allBoundary = data[i]["coord"].split(";");
            var polyline = new BMap.Polyline(newPoints(allBoundary), {
                strokeColor: "#5f7931",
                strokeWeight: 3,
                strokeOpacity: 1
            });   //创建折线
            polyline.addEventListener("click",attribute);
            polyline.id=data[i]["id"];
            polyline.name=data[i]["name"];
            map.addOverlay(polyline);   //增加折线
            polylineList.set(polyline.id,polyline);
        }
};

function newPoints(list) {
    var newPoints = []; // 添加海量点数据
    for (var i = 0; i < list.length; i++) {
        var p = new BMap.Point(list[i].split(",")[0],list[i].split(",")[1]);
        newPoints.push(p);
    }
    return newPoints;
};
function ComplexCustomOverlay(point, text){
    this._point = point;
    this._text = text;
}
function attribute(e) {
    kpTimeTool.stop();
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function (mp) {
        this._map = mp;
        var div = this._div = document.createElement("div");
        div.style.position = "absolute";
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        div.style.backgroundColor = "#ffffff";
        div.style.border = "1px solid #BC3B3A";
        div.style.color = "#ff15c2";
        div.style.height = "36px";
        div.style.width = "80px";
        div.style.padding = "2px";
        div.style.lineHeight = "18px";
//        div.style.whiteSpace = "pre";
        div.style.MozUserSelect = "none";
        div.style.fontSize = "12px";
        div.style.textAlign = "center";
        div.style.border = "2px solid #00edff";
        div.style.borderRadius = "10px";
        var span = this._span = document.createElement("span");
        div.appendChild(span);
        span.appendChild(document.createTextNode(this._text));
        var that = this;

        var arrow = this._arrow = document.createElement("div");
        arrow.style.background = "url(label.png) no-repeat";
        arrow.style.position = "absolute";
        arrow.style.width = "11px";
        arrow.style.height = "10px";
        arrow.style.top = "40px";
        arrow.style.left = "10px";
        arrow.style.overflow = "hidden";
        div.appendChild(arrow);
        div.id=Math.random().toString(36).substr(2);
        divList[div.id]=e.target.id;
        map.getPanes().labelPane.appendChild(div);
        return div;
    }
    ComplexCustomOverlay.prototype.draw = function () {
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
        this._div.style.top = pixel.y - 50 + "px";
    };
    for (var i = 0; i < oneTimeData.length; i++) {
        if(oneTimeData[i].id==e.target.id){
            e.target.count=oneTimeData[i].count;
        }
    };
    var txt;
    var myCompOverlay;
    txt = e.target.name+"<br>"+e.target.count;
    myCompOverlay = new ComplexCustomOverlay(new BMap.Point(e.point.lng ,e.point.lat), txt);

    map.addOverlay(myCompOverlay);
    var span = document.getElementsByTagName("span");
    for (var i = 0; i < span.length; i++) {
        var text = span[i].innerHTML;
        text = text.replace("&lt;", "<").replace("&gt;", ">");
        span[i].innerHTML = text;
    };
}

var nowOverAllTimeData = [];
var nextOverAllTimeData = [];

function firstTimeSplit() {
	var gradualRoadData = road.gradualChangeColor(nowOverAllTimeData, nextOverAllTimeData, 1);
	setColorAndCount(gradualRoadData);
	setTimeout('secondTimeSplit()', 1000);
}

function secondTimeSplit() {
	var gradualRoadData = road.gradualChangeColor(nowOverAllTimeData, nextOverAllTimeData, 2);
	setColorAndCount(gradualRoadData);
	
	setTimeout('setColorAndCount(nextOverAllTimeData)', 1000);
}

function openRoadConditions() {
    /**
     * 根据时间点获取数据
     * @param {Object} time
     */
        var data = road_data_v2;
        
            if(road.roadList == null || road.roadList.length == 0) {
                road.roadList = road.addRoadColor(data);
            }
            
            var oneTimeData = road.roadList[time];
            
             if(time > 0) {
            	nowOverAllTimeData = road.roadList[time - 1];//
            	nextOverAllTimeData = oneTimeData;
            	setTimeout('firstTimeSplit()', 1000);
            } else {
            	setColorAndCount(oneTimeData);
            }
}





function setColorAndCount(list) {
    oneTimeData=list;
    console.log(list)
    for (var i = 0; i <list.length ; i++) {
        changeColor(list[i].id,list[i].color);
        $.each(divList, function(key, value) {
            if(value==list[i].id){
                $("#"+key).html(list[i].name+"<br>"+list[i].count);
            }
        });
    };

}

function changeColor(id,color) {
    var polyline = polylineList.get(id);
    if(polyline){
        polyline.setStrokeColor(color);
    }
}

var heatMap={
    init:function () {
        var points=flow_chart_data[time];
        if(heatmapOverlay==null) {
            var zoom = map.getZoom();
            var radius = heatMap.getRadiusValue(zoom);
            heatmapOverlay = new BMapLib.HeatmapOverlay({"radius": radius});
        }else{
        	var zoom = map.getZoom();
        	var radius = heatMap.getRadiusValue(zoom);
            heatmapOverlay.setOption({"radius": radius});
        }
        map.addOverlay(heatmapOverlay);
        heatmapOverlay.setDataSet({data:points,max:1600});
        heatmapOverlay.show();
    },
    getRadiusValue:function(zoom) {
        var radius = 40;
        switch (zoom) {
            case 6:
                radius = 5;
                break;
            case 7:
                radius = 10;
                break;
            case 8:
                radius = 10;
                break;
            case 9:
                radius = 15;
                break;
            case 10:
                radius = 20;
                break;
            case 11:
                radius = 30;
                break;
            case 12:
                radius = 40;
                break;
            case 13:
                radius = 40;
                break;
            case 14:
                radius = 40;
                break;
            case 15:
                radius = 40;
                break;
            case 16:
                radius = 80;
                break;
            case 17:
                radius = 120;
                break;
            case 18:
                radius = 160;
                break;
            case 19:
                radius = 200;
                break;
            default:
                if (zoom < 6) {
                    radius = 1;
                } else if (zoom > 19) {
                    radius = 200;
                }
        }
        console.log(radius);
        return radius;
    }
}


//判断浏览区是否支持canvas
function isSupportCanvas(){
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

function roadHeat() {
     if($("input[type='checkbox'][value='路况']").prop('checked')){
          openRoadConditions();
     }else{
         getBoundary();
     }
    if($("input[type='checkbox'][value='热力']").prop('checked')){
        heatMap.init();
        }else{
        if(heatmapOverlay!=null)
            heatmapOverlay.hide();
    }
}