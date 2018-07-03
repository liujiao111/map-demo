window.onload=function(){
    setInterval(function(){
            var dateTime = new Date();
            $("#time").text(dateTime.toLocaleString());
        }
        ,1000)
}
var map;
var kpMap;
var polyline;
var restorwork="workDay";
var mainRoad = new Array();
var polylineList = new Array();
var mapvLayerList = new Array();
var labelList = new Array();
var markerList = new Array();
var intersection = new Object();
var roadContent;
var echartsParams;
var hour=24;
var demo={
    init:function () {
        kpMap=new KingMap.Map({id:"allMap",apiType:"BMap",zoom:7});
        map =kpMap.getMap();
        map.centerAndZoom(new BMap.Point(113.5882674, 22.3433872), 14);
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
                        "color": "#000000"
                    }
                },
                {
                    "featureType": "highway",
                    "elementType": "geometry.stroke",
                    "stylers": {
                        "color": "#147a92"
                    }
                },
                {
                    "featureType": "arterial",
                    "elementType": "geometry.fill",
                    "stylers": {
                        "color": "#000000"
                    }
                },
                {
                    "featureType": "arterial",
                    "elementType": "geometry.stroke",
                    "stylers": {
                        "color": "#0b3d51"
                    }
                },
                {
                    "featureType": "local",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#000000"
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
                        "color": "#000000"
                    }
                },
                {
                    "featureType": "railway",
                    "elementType": "geometry.stroke",
                    "stylers": {
                        "color": "#08304b"
                    }
                },
                {
                    "featureType": "subway",
                    "elementType": "geometry",
                    "stylers": {
                        "lightness": -70
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
                },
                {
                    "featureType": "poilabel",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "on"
                    }
                }
            ]
        });
    },
    service:function (obj) {
        $(obj).addClass("li-active");
        $(obj).siblings().removeClass("li-active");
        $("#div4").hide();
        $("#details").hide();
        $("#datetimepicker").hide();
        hour=24;
        for (var i = 0; i < mainRoad.length; i++) {
            map.removeOverlay(mainRoad[i])
        }
        for (var i = 0; i < polylineList.length; i++) {
            map.removeOverlay(polylineList[i])
        }
        for (var i = 0; i < labelList.length; i++) {
            map.removeOverlay(labelList[i])
        }
        for (var i = 0; i < markerList.length; i++) {
            map.removeOverlay(markerList[i])
        }
        for (var i = 0; i < mapvLayerList.length; i++) {
            mapvLayerList[i].destroy();
        }
        map.centerAndZoom(new BMap.Point(113.5882674, 22.3433872), 14);
        var label;
        var marker;
        for (var i = 0; i <testData.length ; i++) {
            var testPolyline = {
                strokeOpacity: 1,
                strokeWeight: 3,
                strokeColor: '#00edff',
                path: testData[i]
            };
            kpPolyline=new KingMap.Polyline(map,testPolyline);
            mainRoad.push(kpPolyline.getPolylineKp());
        };
        for (var key in lukouData) {
            var icon = new BMap.Icon("images/intersection-ico001.png", new BMap.Size(30,30));
            marker = new BMap.Marker(new BMap.Point(lukouData[key]["coordinate"]["lng"], lukouData[key]["coordinate"]["lat"]),{icon:icon});
            marker.addEventListener("click", demo.roadClick);
            marker.content=key;
            map.addOverlay(marker);
            markerList.push(marker);
            label =
                {
                    option: {
                        position: [lukouData[key]["coordinate"]["lng"], lukouData[key]["coordinate"]["lat"]],    // 指定文本标注所在的地理位置
                        text: key,
                        offsets: [15,-10]	//点标记显示位置偏移量
                    },
                    style: {
                        color: "#fff",
                        fontSize: "12px",
                        height: "20px",
                        lineHeight: "20px",
                        fontFamily: "微软雅黑",
                        border: 0,
                        backgroundColor:"rgba(255,255,255,0)"
                    }
                };
            kpLabel = new KingMap.Label(map, label);
            kpLabel.addEventListenerKp("click", demo.roadClick);
            labelList.push(kpLabel.getLabelKp());
        }
        $("#div2").show();
    },
    roadClick:function (e) {
        intersection=e;
        roadContent = e.target.content;
        kpMap.setCenterKp(e.target.point.lng,e.target.point.lat);
        kpMap.setZoomKp(18);
        $("#div2").hide();
        $("#div4").show();
        $("#details").show();
        $("#details-Location").show();
        $("#road_Location").hide();
        for (var i = 0; i < polylineList.length; i++) {
            map.removeOverlay(polylineList[i])
        }
        for (var i = 0; i < mapvLayerList.length; i++) {
            mapvLayerList[i].destroy();
        }
        //加载当前点击路口的人流量以及路口类型等信息，并在details区域显示
  		demo.showDetail(roadContent);
        
        var seriesData=[];
        var seriesData1=[];
        var seriesLinks=[];
        var index=0;
        var maxCount=0;
        for (var i = 0; i < lukouData[roadContent]["direction"].length; i++) {
            var count = lukouData[roadContent]["direction"][i][restorwork][0]["count"];
            if (count>maxCount){
                index=i;
                maxCount=count;
            }
        };
        var colorArr = new Array(13);
        colorArr = colorArr.join('#00a2ff,').split(',');
        colorArr[index]='#00eaff';
        colorArr.length=colorArr.length-1;
        var opacityArr = new Array(12);
        opacityArr = opacityArr.join("0.3,").split(',');
        opacityArr[index]="0.5";
        opacityArr.length=opacityArr.length-1;
        for(var i in lukouData[roadContent]["direction"]){
            var roadName = lukouData[roadContent]["direction"][i]["nameCh"].split("-");
            var a = roadName[0]+"　";
            var b = "　"+roadName[1];
            if(seriesData.indexOf(a)==-1){
                seriesData.push(a);
            };
            if(seriesData.indexOf(b)==-1){
                seriesData.push(b);
            };
            seriesLinks.push({
                source: a,
                target: b,
                lineStyle: {
                    color:colorArr[i],
                    opacity:opacityArr[i],
                    borderColor:"#bfbfbf",
                    borderWidth:"1"
                },
                value: lukouData[roadContent]["direction"][i][restorwork][0]["count"],
                hours: lukouData[roadContent]["direction"][i][restorwork][0]["hours"]
            });
        };
        for (var i = 0; i <seriesData.length ; i++) {
            var leftRight;
            if(seriesData[i].charAt(seriesData[i].length - 1)=="　"){
                leftRight="right";
            }else{
                leftRight="left";
            }
            seriesData1.push({
                name:seriesData[i],
                itemStyle: {
                    color:"#5f77ec"
                },
                label:{
                    show:true,
                    color : "#fff",
                    position:leftRight
                }
            })
        };
        var dom = document.getElementById("div6");
        var myChart = echarts.init(dom);
        var app;
        var option ;
        option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: {
                type: 'sankey',
                layout:'none',
                data: [seriesData1][0],
                links: [seriesLinks][0]
            }
        };
        myChart.on('click', function (params) {
            demo.addPolyline(params);
            echartsParams=params;
        });
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        };
    },
    addPolyline:function (params) {
        for (var i = 0; i < polylineList.length; i++) {
            map.removeOverlay(polylineList[i])
        }
        for (var i = 0; i < mapvLayerList.length; i++) {
            mapvLayerList[i].destroy();
        }
        $("#details").show();
        $("#details-Location").hide();
        $("#road_Location").show();
        $("#datetimepicker").show();
        if(hour!=24)
            $("#datetimepicker").attr('placeholder',hour+":00"+"-"+hour+":59");
        if(hour==24)
            $("#datetimepicker").attr('placeholder',"选择时间段");
        var polylineData;
        for(var i in lukouData[roadContent]["direction"]){
            var roadName = lukouData[roadContent]["direction"][i]["nameCh"].split("-");
            var nameCh = roadName[0]+ roadName[1];
            if(nameCh==(params.data.source.substr(0,params.data.source.length-1)+params.data.target.substr(1,params.data.target.length))){
                polylineData = lukouData[roadContent]["direction"][i]["linepath"]
            }
        };
        var strokeColor;
        var road_count=0;
        if(hour != 24) {
            road_count=params.data.hours[hour];
            if (road_count > 1000) {
                strokeColor = "#ff0000";
            } else if (road_count > 800) {
                strokeColor = "#ff6500";
            } else if (road_count > 600) {
                strokeColor = "#ffc000";
            } else if (road_count > 400) {
                strokeColor = "#ffec00";
            } else if (road_count > 200) {
                strokeColor = "#a7ff00";
            } else if (road_count > 0) {
                strokeColor = "#00ff53";
            };
            $("#road_time").text(hour+":00"+"-"+hour+":59");
        }else{
            for (var i = 0; i < 24; i++) {
                road_count+=params.data.hours[i]
            };
            if (road_count > 100000) {
                strokeColor = "#ff0000";
            } else if (road_count > 80000) {
                strokeColor = "#ff6500";
            } else if (road_count > 60000) {
                strokeColor = "#ffc000";
            } else if (road_count > 40000) {
                strokeColor = "#ffec00";
            } else if (road_count > 20000) {
                strokeColor = "#a7ff00";
            } else if (road_count > 0) {
                strokeColor = "#00ff53";
            };
            $("#road_time").text("全　天");
        }
        kpPolyline=new KingMap.Polyline(map,{
            strokeColor: strokeColor,   //折线颜色
            strokeWeight: "3",      //折线宽度
            strokeOpacity: "1",   //折线透明度
            path:polylineData
        });
        polylineList.push(kpPolyline.getPolylineKp());

        $("#road_name").text(params.data.source.substr(0,params.data.source.length-1)+"　>　"+params.data.target.substr(1,params.data.target.length));
        $("#road_count").text(Math.round(road_count));

        var linePoint=kpPolyline.getPathKp();//线的坐标串
        var arrowCount=linePoint.length;
        for(var i =1;i<arrowCount;i++){ //在拐点处绘制箭头
            var pixelStart=map.pointToPixel(linePoint[i-1]);
            var pixelEnd=map.pointToPixel(linePoint[i]);
            var angle=Math.PI/7;//箭头和主线的夹角
            var r=10; // r/Math.sin(angle)代表箭头长度
            var delta=0; //主线斜率，垂直时无斜率
            var param=0; //代码简洁考虑
            var pixelTemX,pixelTemY;//临时点坐标
            var pixelX,pixelY,pixelX1,pixelY1;//箭头两个点
            if(pixelEnd.x-pixelStart.x==0){ //斜率不存在是时
                pixelTemX=pixelEnd.x;
                if(pixelEnd.y>pixelStart.y)
                {
                    pixelTemY=pixelEnd.y-r;
                }
                else
                {
                    pixelTemY=pixelEnd.y+r;
                }
                //已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法
                pixelX=pixelTemX-r*Math.tan(angle);
                pixelX1=pixelTemX+r*Math.tan(angle);
                pixelY=pixelY1=pixelTemY;
            }
            else  //斜率存在时
            {
                delta=(pixelEnd.y-pixelStart.y)/(pixelEnd.x-pixelStart.x);
                param=Math.sqrt(delta*delta+1);

                if((pixelEnd.x-pixelStart.x)<0) //第二、三象限
                {
                    pixelTemX=pixelEnd.x+ r/param;
                    pixelTemY=pixelEnd.y+delta*r/param;
                }
                else//第一、四象限
                {
                    pixelTemX=pixelEnd.x- r/param;
                    pixelTemY=pixelEnd.y-delta*r/param;
                }
                //已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法
                pixelX=pixelTemX+ Math.tan(angle)*r*delta/param;
                pixelY=pixelTemY-Math.tan(angle)*r/param;

                pixelX1=pixelTemX- Math.tan(angle)*r*delta/param;
                pixelY1=pixelTemY+Math.tan(angle)*r/param;
            }

            var pointArrow=map.pixelToPoint(new BMap.Pixel(pixelX,pixelY));
            var pointArrow1=map.pixelToPoint(new BMap.Pixel(pixelX1,pixelY1));
            Arrow = new BMap.Polyline([
                pointArrow,
                linePoint[i],
                pointArrow1
            ], {strokeColor:kpPolyline.getColorKp(), strokeWeight:kpPolyline.getWeightKp(), strokeOpacity:kpPolyline.getOpacityKp()});
            polylineList.push(Arrow);
            map.addOverlay(Arrow);
        };
        demo.addLayer(polylineData)
    },
    addLayer:function(polylineData){
        var item = polylineData;
        var _time=0;
        var polyline_time_data=[];
        for (var j = 0; j < item.length-1; j ++) {
            for (var k = 0; k <50 ; k++) {
                polyline_time_data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: [item[j][0]+(item[j+1][0]-item[j][0])/50*k, item[j][1]+(item[j+1][1]-item[j][1])/50*k]
                    },
                    count: 1,
                    time: _time
                });
                _time=_time+300/((item.length-1)*50);
            }
        };
        var pointTimeDataSet = new mapv.DataSet(polyline_time_data);
        options = {
            fillStyle: 'rgba(255, 250, 250, 0.2)',
            coordType: 'bd09ll',
            globalCompositeOperation: "lighter",
            size: 3,
            animation: {
                stepsRange: {
                    start: 0,
                    end: 300
                },
                trails: 12,
                duration: 6,
            },
            draw: 'simple'
        };
        var polyline_time_mapvLayer = new mapv.baiduMapLayer(map, pointTimeDataSet, options);
        mapvLayerList.push(polyline_time_mapvLayer)
    },
    restorwork:function (obj) {
        $(obj).removeClass("btn-default");
        $(obj).addClass("btn-primary");
        $(obj).siblings().removeClass("btn-primary");
        $(obj).siblings().addClass("btn-default");
        for (var i = 0; i < polylineList.length; i++) {
            map.removeOverlay(polylineList[i])
        }
        for (var i = 0; i < mapvLayerList.length; i++) {
            mapvLayerList[i].destroy();
        }
        restorwork=obj.name;
        demo.roadClick(intersection);
        
    },
   
   /**
    * 根据路口名称加载人流量以及路口类型信息
    * @param {Object} name 路口名称
    */
    showDetail : function(name) {
    	var crossingCount = countSum.getCrossingCount(roadContent, restorwork);
        var count = crossingCount['count'];
        var type = crossingCount['type'];
        $("#details #name").text(roadContent);
        $("#details #type").text(type);
        $("#details #count").text(Math.round(count));
    },
    changeHour:function () {
        hour=parseInt($("#datetimepicker").val().substr(0,2));
        demo.addPolyline(echartsParams);
    },
    selectTheWholeDay:function () {
        hour = 24;
        demo.addPolyline(echartsParams);
        $("div.datetimepicker").hide();
        $("#datetimepicker").val("");
        $("#datetimepicker").attr('placeholder',"选择时间段");
    }
};

var corossings = ['银坑', '叠石路口', '鸡山牌坊路口', '中山大学路口', '白埔路口', '唐家政府路口', '唐家客运站', '警备路口', '综合市场', '淇澳岛路口', '海怡湾畔', '华夏路口', '南方软件园', '赛车场路口', '下村路口', '金凤路口', '金峰路口', '下栅高速路口'];
/**
 * 人流量统计
 */
var countSum = {
	/**
	 * 人流量统计初始化：
	 * 	统计日均人流量、最拥堵路口、早晚高峰，并在页面显示数据
	 */
	init : function(){
		var _this = this;
		var dayAvgCount = _this.getDayAvgCount();  //日均人流量
		$("#div2 #visitorData").text(Math.round(dayAvgCount['allDayCountAvg']));
		
		var crowdedCross =  _this.getCrowdedCross();  //最拥堵路口
		$("#div2 #crossing").text(crowdedCross);
		
		var crowdedHour = _this.getCrowdedHour();  ///早高峰、晚高峰
        $("#div2 #morning").text(crowdedHour['morningCrowed'] + "点");
        $("#div2 #afternoon").text(crowdedHour['afternoonCrowed'] + "点");
        
        
	},
	
	
	/**
	 * 获取日均人流量数据
	 * @param {Object} corossings 各个路口人流量数据
	 */
	getDayAvgCount: function() {
		var restDayCountSum = 0; //所有路口周末的人流量总和
		var workDayCountSum = 0; //所有路口工作日的人流量总和
		var days = 1; //被统计的天数

		for(var i = 0; i < corossings.length; i++) {
			var crossingName = corossings[i];
			var curretCrossingCountData = lukouData[crossingName];
			var direction = curretCrossingCountData['direction'];
			for(var j = 0; j < direction.length; j++) {
				var oneDirectionData = direction[j];
				var restDayData = oneDirectionData['restDay'];
				var avgRestDayCount = restDayData[0]['count'];
				var workDayData = oneDirectionData['workDay'];
				var avgWorkDayCount = workDayData[0]['count'];
				restDayCountSum += avgRestDayCount;
				workDayCountSum += avgWorkDayCount;
			}
		}

		var restDayCountAvg = restDayCountSum / days;
		var workDayCountAvg = workDayCountSum / days;
		var allDayCountAvg = (restDayCountSum + workDayCountSum) / (2 * days);

		var result = {
			'restDayCountAvg': restDayCountAvg.toFixed(2),  //保留2位小数
			'workDayCountAvg': workDayCountAvg.toFixed(2),
			'allDayCountAvg': allDayCountAvg.toFixed(2)
		}

		//alert(result['restDayCountAvg'] + ',' + result['workDayCountAvg']+ ',' + result['allDayCountAvg'])
		//5828387.00,6070595.70,5949491.35

		return result;
	},

	/**
	 * 获取最堵路口名
	 * @param {Object} corossings 各个路口人流量数据
	 */
	getCrowdedCross: function() {
		var mostCrowdedCrossingIndex = 0; //最堵路口的索引
		var mostCrowdedCrossingCount = 0; //最堵路口的人数
		for(var i = 0; i < corossings.length; i++) {
			var crossingName = corossings[i];
			var curretCrossingCountData = lukouData[crossingName];
			var direction = curretCrossingCountData['direction'];
			var crossingCountSum = 0;
			for(var j = 0; j < direction.length; j++) {
				var oneDirectionData = direction[j];
				var restDayData = oneDirectionData['restDay'];
				var avgRestDayCount = restDayData[0]['count'];
				var workDayData = oneDirectionData['workDay'];
				var avgWorkDayCount = workDayData[0]['count'];
				crossingCountSum += (avgRestDayCount + avgWorkDayCount); //计算当前路口所有方向周末和工作日的人流量总和
			}
			if(crossingCountSum > mostCrowdedCrossingCount) {
				mostCrowdedCrossingCount = crossingCountSum;
				mostCrowdedCrossingIndex = i;
			}

		}

		return corossings[mostCrowdedCrossingIndex];
	},

	/**
	 * 获取时间范围内的人流量最多的时刻
	 * @param {Object} startTime 开始时间
	 * @param {Object} endTime  结束时间
	 */
	getCrowdedHourByQuantum: function(startTime, endTime) {
		var mostCrowedTime = 0; //最堵的时刻
		var mostCrowedTimeCount = 0; //最堵的时刻对应的人流量

		for(var time = startTime; time < endTime; time++) {

			var currentTimeCount = 0; //当前时刻所有路口的人流量总和

			for(var i = 0; i < corossings.length; i++) {
				var crossingName = corossings[i];
				var curretCrossingCountData = lukouData[crossingName];
				var direction = curretCrossingCountData['direction'];
				var crossingCountSum = 0;
				for(var j = 0; j < direction.length; j++) {
					var oneDirectionData = direction[j];
					var restDayData = oneDirectionData['restDay'];
					var restDayCurrentTimeCount = restDayData[0]['hours'][time];

					var workDayData = oneDirectionData['workDay'];
					var workDayCurrentTimeCount = workDayData[0]['hours'][time];

					currentTimeCount += (restDayCurrentTimeCount + workDayCurrentTimeCount);
				}
			}

			if(currentTimeCount > mostCrowedTimeCount) {
				mostCrowedTimeCount = currentTimeCount;
				mostCrowedTime = time;
			}
		}

		return mostCrowedTime;
	},

	/**
	 * 获取早高峰和晚高峰
	 */
	getCrowdedHour: function() {
		var _this = this;
		var morningCrowed = _this.getCrowdedHourByQuantum(0, 12);
		var afternoonCrowed = _this.getCrowdedHourByQuantum(13, 24);

		var result = {
			'morningCrowed': morningCrowed,
			'afternoonCrowed': afternoonCrowed
		}
		return result;
	},
	
	/**
	 * 获取被选中的路口周末和工作日的所有方向的人流量和路口类型
	 * @param {Object} name 路口名
	 * @param {Object} type 周末还是工作日，'restDay'代表周末，'workDay'代表工作日
	 */
	getCrossingCount : function(name, type){
		var curretCrossingCountData = lukouData[name];
		var direction = curretCrossingCountData['direction'];
		var directionCount = direction.length;
		var crossingType = '';
		if(directionCount == 2) {
			crossingType = "直行路口";
		} else if(directionCount == 6) {
			crossingType = "T字路口";
		} else if(directionCount == 12) {
			crossingType = "十字路口";
		}
		
		var count = 0;
		for (var i = 0; i < direction.length; i ++) {
			var dayCounts = direction[i];
			var firstDayCount = 0;
			if(type == 'restDay') {  //周末
				firstDayCount = dayCounts['restDay'][0]['count'];
			} else {  //工作日
				firstDayCount = dayCounts['workDay'][0]['count'];
			}
			count += firstDayCount;
		}
		
		var result = {
			"type" : crossingType,
			'count' : count
		}
		return result;
	}
};
