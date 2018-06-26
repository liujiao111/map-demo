/**
 * 时间轴工具 不请求后台 初始化的数组各自业务里请求后传过来  需求上没刷新 暂不设计 需求上没断点续播
 * 1.凡是时间轴的初始化 传过来的对象为{year:0,month:0,day:0,hour:0,minute:0,paramValue:""}的数组 要求默认升序
 * 2.默认升序的数组最后一个对象为初始化的选中状态并callBackFunc(paramValue) 要求调用者有对应的初始化方法
 * 3.地图放大缩小 鼠标双击 要调用时间控件的暂停功能 具体在对应map的事件 zoomstart dragstart dbclick(实际上也是zoomstart)控制
 * 4.切换其他图层时候 不需要时间轴则需要清除时间轴 remove
 * 5.级别优先 上锁的flag>播放的flag
 * 6.有关所有class控制的 后期整理在ctrlCode作为统一控制标示字典...
 * 7,当前方案用混合的构造函数/原型方式  老方案用 原始的方式  不能满足多个时间的问题
 * create by  chenqz
 */
 var kpTimeTool={
 	/**
 	 * 时间轴初始化
 	 * @param {} dayTimeArr
 	 * @param {} callBackFunc
 	 * @return {}
 	 */
	init:function(dayTimeArr,callBackFunc){
      var timeTool=new TimeTool();
  	  var myDate = new Date();//获取系统当前时间
      timeTool.id=timeTool.ctrlCode.timeBoxClass+myDate.getTime();
      timeTool.init(dayTimeArr,callBackFunc,timeTool.id);
      this.timeToolArr.push(timeTool);
      return timeTool.id;
	},
	//存放时间轴实例
	timeToolArr:[],
	//移除所有时间轴
	remove:function(){
	 for(var i=this.timeToolArr.length-1;i>=0;i--){
	 	this.timeToolArr[i].remove();
	 	this.timeToolArr.splice(i,1);
	 }	
	},
	//暂停所有时间轴
	stop:function(){
	 for(var i=0;i<this.timeToolArr.length;i++){
	 	this.timeToolArr[i].stop();
	 }
	},
	/**
	 * 更新某个时间轴的刻度
	 * @param {} id
	 * @param {} dayTimeArr
	 */
	update:function(id,dayTimeArr){
	    var timetool =this.getTimeTool(id);
	    timetool.update(dayTimeArr);
	},
	/**
	 * 控制某个时间轴展示
	 * @param {} id
	 */
	show:function(id){
		var timetool =this.getTimeTool(id);
		timetool.show();
	},
	/**
	 * 控制某个时间轴隐藏
	 * @param {} id
	 */	
	hide:function(id){
		var timetool =this.getTimeTool(id);
		timetool.hide();
	},
	/**
	 * 获取某个时间轴
	 * @param {} id
	 * @return {}
	 */
    getTimeTool:function(id){
     var result;
     for(var i=0;i<this.timeToolArr.length;i++){
      if(this.timeToolArr[i].id==id){
      	result=this.timeToolArr[i];
      	break;
      }
     }
     return result;
    },
    /**
     * 覆盖某个时间轴对象
     * @param {} obj
     */
    setTimeTool:function(obj){
       for(var i=0;i<this.timeToolArr.length;i++){
      if(this.timeToolArr[i].id==obj.id){
      	this.timeToolArr[i]=obj;
      	break;
      }
     }  	
    }
}

/**
 * 时间轴刻度对象
 */
function DayTime(){
			this.year = 0,
			this.month = 0,
			this.day=0,
			this.hour = 0,
			this.minute = 0,
			this.paramValue = ""
}

/**
 * 时间轴对象
 */
function TimeTool(){
	    this.id=null;
	 	//存放回调函数
	 	this.callBackFunc=null,
	 	//存放定时间隔 单位秒
	 	this.intervalTime=3,
	 	//存放定时ID 移除需要
	 	this.intervalId="",
	 	//播放的时间刻度index
	 	this.curDayTimeArrIndex=0,
	 	//播放状态
	 	this.playFlag=false,
	 	//是否循环播放标示
	 	this.loopFlag=true,
	 	//是否上锁
	 	this.lockFlag=false,
	 	//存放小时分钟刻度对象数组 {year:0,month:0,day:0,hour:0,minute:0,paramValue:""}
	 	this.dayTimeArr=[],
		/**
		 * 字典标示控制 非配置型参数 例如存放一些样式class的名称或者id 相对固定的东西
		 */
	 	this.ctrlCode={
	 		hourAndMinuteSeperator:":",
	 		timeBoxClass:"mb_time_box"
	 	}
	 	}
	 	
	 	/**
	 	 * 初始化方法
	 	 * @param {} dayTimeArr
	 	 * @param {} callBackFunc
	 	 */
	 	TimeTool.prototype.init=function(dayTimeArr,callBackFunc,id){
	 		this.dayTimeArr=dayTimeArr;
	 		this.callBackFunc=callBackFunc;
	 		this.id=id;

	 		this.createDatePanel();
	 		
	 		var lastHourDayTime=new DayTime();
			$.extend(lastHourDayTime,this.dayTimeArr[this.dayTimeArr.length-1],true);
	 		this.showOneHourTime(lastHourDayTime);
	 		
	 	},
	 	/**
	 	 * 展示某一个时间刻度
	 	 * @param {} dayTime
	 	 */
	 	TimeTool.prototype.showOneHourTime=function(oneHourDayTime){
	 		var _this=this;
	 		var hourDayTime=new DayTime();
	 		$.extend(hourDayTime,oneHourDayTime,true);
	 		
	 		var month=hourDayTime.month<=9?"0"+hourDayTime.month:hourDayTime.month;
	 		var day=hourDayTime.day<=9?"0"+hourDayTime.day:hourDayTime.day;
	 		var yearMonthDay=hourDayTime.year+" "+month+"-"+day;
	 		//设置面板日历
	 		this.setDatePanelDate(yearMonthDay);
			var hour=hourDayTime.hour<=9?"0"+hourDayTime.hour:hourDayTime.hour;
			var minute=hourDayTime.minute<=9?"0"+hourDayTime.minute:hourDayTime.minute;	
			//设置 hour active		
	
			$("#"+this.id+" .Map-DateAxis .timeAxis .timeAxis-top ul li .active").removeClass("active");
			$("#"+this.id+" .Map-DateAxis .timeAxis .timeAxis-top ul li div").each(function(){
				if($(this).text()==hour){
					$(this).addClass("active");
				}
			});		
			//是否要翻页
			this.setHourPage(hourDayTime.hour);
			var setHourAndMinute = hour+this.ctrlCode.hourAndMinuteSeperator+minute
	 		//this.createMinutesPanel(setHourAndMinute);
	 		if(setHourAndMinute){
						if(!_this.playFlag){
							$("#"+this.id+" .Map-DateAxis .timeAxis .timeAxis-top ul li .active").click();
						}else{
							var paramValue=_this.getParamValue();
							_this.callBackFunc(paramValue);
						}	
	 		}

	 	},
	 	/**
	 	 * 清除时间轴
	 	 */
	 	TimeTool.prototype.remove=function(){
	 		$("#"+this.id+" .Map-DateAxis").remove();
	 		$("#"+this.id+" .Map-MinuteDiv").remove();
	 		
	 	 	//清除定时器  避免在其他图例中影响
	 		clearInterval(this.intervalId);		
	 		//重置变量  避免图例切换使用的公共变量影响
		 	//存放定时ID 移除需要
		 	this.intervalId="";
		 	//播放的时间刻度index
		 	this.curDayTimeArrIndex=0;
		 	//播放状态
		 	this.playFlag=false;
		 	//是否循环播放标示
		 	this.loopFlag=true;
		 	//是否上锁
		 	this.lockFlag=false;
		 	
	 	},
	 	/**
	 	 * 清除分钟面板
	 	 */
	 	TimeTool.prototype.removeMinutesPanel=function(){
	 		$("#"+this.id+" .Map-MinuteDiv").remove();
	 	}
	    /**
	     * 创建小时刻度面板 如果有默认值就按默认值初始化
	     * @param {} setHour
	     */	
	    TimeTool.prototype.createDatePanel=function(){
	    	var _this=this;
	    	var timeToolDiv = $("<div>").addClass("mb_time_right").attr("id",_this.id);
		    var mainDiv = $("<div>").addClass("Map-DateAxis");
		    timeToolDiv.append(mainDiv);
		    var div1 = $("<div>").addClass("Date").text("yyyy MM-dd");
		    mainDiv.append(div1);
		    var div2 =$("<div>").addClass("timeAxis");
		    mainDiv.append(div2);
		    var div2_1 =$("<div>").addClass("BreakingNewsController").addClass("timeAxis-top").addClass("breakingnews");
		    div2.append(div2_1);
		    var div2_1_1=$("<div>").addClass("bn-arrows").append($("<span>").addClass("bn-arrows-left"));
		    div2_1.append(div2_1_1);
		    var ul2_1_2=$("<ul>");
		    div2_1.append(ul2_1_2);
		    var li2_1_2_1=$("<li>");
		    var li2_1_2_2=$("<li>").css("display","none")
		    ul2_1_2.append(li2_1_2_1);
		     ul2_1_2.append(li2_1_2_2);
		    for(var i=0;i<24;i++){
		    	if(i<12){
		    		if(i<=9){
		    			li2_1_2_1.append($("<div>").text("0"+i));
		    		}else{
		    			li2_1_2_1.append($("<div>").text(i));
		    		}
		    	}else{
		    		li2_1_2_2.append($("<div>").text(i));
		    	}
		    }
		    var div2_1_3=$("<div>").addClass("bn-arrows").append($("<span>").addClass("bn-arrows-right"));
		    div2_1.append(div2_1_3); 
	//	    var div2_2 =$("<div>").addClass("timeAxis-bottom");
	//	    div2.append(div2_2);
	//	    var span2_2_1=$("<span>").addClass("left-time");
	//	    div2_2.append(span2_2_1);
	//	    var div2_2_2=$("<div>").addClass("ProgressBar").append($("<div>").addClass("ProgressBar-add")).append($("<div>").addClass("ProgressBar-add1"));
	//	    div2_2.append(div2_2_2);
	//	    var span2_2_3=$("<span>").addClass("right-time");
	//		div2_2.append(span2_2_3);
			var div3 =$("<div>").addClass("right-play");
			mainDiv.append(div3);
			var div3_1=$("<div>").addClass("play").click(function(){_this.play(this)});
			var div3_2=$("<div>").addClass("suspend").click(function(){_this.suspend()});
			var div3_3=$("<div>").addClass("unlock").click(function(){_this.lockSwitch(this)});
			div3.append(div3_1);
			div3.append(div3_2);
			div3.append(div3_3);
			
			timeToolDiv.appendTo($("."+this.ctrlCode.timeBoxClass));
			//绑定事件 
			$(ul2_1_2).find("div").click(function(){
				_this.hourBindClick(this);
			});
			_this.hourPageBindClick();
		
	    }
		/**
		 * 
		 */	    
	   TimeTool.prototype.update=function(dayTimeArr){
   		var hourDayTime=new DayTime();
   		//获取第一个 
 		$.extend(hourDayTime,dayTimeArr[dayTimeArr.length-1],true);
 		  var month=hourDayTime.month<=9?"0"+hourDayTime.month:hourDayTime.month;
 		  var day=hourDayTime.day<=9?"0"+hourDayTime.day:hourDayTime.day;
 		  var yearMonthDay=hourDayTime.year+" "+month+"-"+day;
	      this.setDatePanelDate(yearMonthDay);
	      this.dayTimeArr=dayTimeArr;
	      this.showOneHourTime(hourDayTime);
	   },
	    /**
	     * 设置小时面板上的日历时间 yyyyMMdd
	     * @param {} yyyyMMdd
	     */
	   TimeTool.prototype.setDatePanelDate=function(yyyyMMdd){
		    $("#"+this.id+" .Map-DateAxis .Date").text(yyyyMMdd);
	    }
	    /**
	     * 创建分钟刻度面板  如果有默认值根据默认值设置
	     * @param {} setHourAndMinute
	     */
	 	TimeTool.prototype.createMinutesPanel=function(setHourAndMinute){
	 		var _this=this;
	 		_this.removeMinutesPanel();
	 		var dayTimeArr=_this.getDayTimeArr();
	 		var div1 =$("<div>").addClass("Map-MinuteDiv");
	 		var ul2=$("<ul>");
	 		div1.append(ul2);
	  		for(var i=0;i<dayTimeArr.length;i++){
	 			var one=new DayTime();
	 			$.extend(one,dayTimeArr[i],true);
				var hour=one.hour<=9?"0"+one.hour:one.hour;
				var minute=one.minute<=9?"0"+one.minute:one.minute; 
				ul2.append($("<li>").text(hour+_this.ctrlCode.hourAndMinuteSeperator+minute));
	 		}
	 		$(ul2).find("li").click(function(){
				_this.minuteBindClick(this);
	 		});
	 		div1.prependTo($("#"+_this.id));
	 		
	 		$("#"+_this.id+" .Map-MinuteDiv ul .active").removeClass("active");
	 		
	 		if(setHourAndMinute){
		  		//设置minute active
		 		$("#"+_this.id+" .Map-MinuteDiv ul li").each(function(){
					if($(this).text()==setHourAndMinute){
						$(this).addClass("active");
						if(!_this.playFlag){
							$("#"+_this.id+" .Map-MinuteDiv ul .active").click();
						}else{
							var paramValue=_this.getParamValue();
							_this.callBackFunc(paramValue);
						}
					}
				});		
	 		}else{
	 		   //默认设置一个 并回调函数	
	 			$("#"+_this.id+" .Map-MinuteDiv ul li:first").click();
	 		}
	 			
	 	}
	 	TimeTool.prototype.contrlProgressBar=function(){
	 	
	 	}
	 	/**
	 	 * 获取选中某个小时的分钟段 或获取指定某个小时的
	 	 * @return {}
	 	 */
	 	TimeTool.prototype.getDayTimeArr=function(hour){
			if(!hour){
				hour=$("#"+this.id+" .Map-DateAxis .timeAxis .timeAxis-top ul li .active").text();
			}
	 		
	 		var hourTimeArr=[];
	 		for(var i=0;i<this.dayTimeArr.length;i++){
	 			var one=new DayTime();
	 			$.extend(one,this.dayTimeArr[i],true);
	 			if(one.hour==parseInt(hour)){
	 				hourTimeArr.push(one);
	 			}
	 		}
	 		return hourTimeArr;
	 	}
	 	/**
	 	 * 获取选中时间值的回传值  具体回传值根据业务设置在对象的字段paramValue里面
	 	 * @return {}
	 	 */
	 	TimeTool.prototype.getParamValue=function(){
	 		var _this=this;
			var hour=$("#"+_this.id+" .Map-DateAxis .timeAxis .timeAxis-top ul li .active").text();
			var paramValue="";
			for(var i=0;i<_this.dayTimeArr.length;i++){
	 			var one=new DayTime();
	 			$.extend(one,_this.dayTimeArr[i],true);
	 			if(one.hour==parseInt(hour)){
	 				paramValue=one.paramValue;
	 				break;
	 			}
			}
			return paramValue;
	 	}
	 	/**
	 	 * 时间刻度上下页按钮切换方法
	 	 */
	 	TimeTool.prototype.hourPageBindClick=function(){
	 		var _this=this;
			$("#"+_this.id+" .breakingnews .bn-arrows span").on("click",function(){
				//第一个是否隐藏 =0就是隐藏
				if($("#"+_this.id+" .breakingnews  ul li:first:visible").length==0){
					$("#"+_this.id+" .breakingnews  ul li:last").hide();
					$("#"+_this.id+" .breakingnews  ul li:first").fadeIn();
				}else{
					$("#"+_this.id+" .breakingnews  ul li:first").hide();
					$("#"+_this.id+" .breakingnews  ul li:last").fadeIn();				
				}
			});	
	 	}
	 	/**
	 	 * 根据时间小时控制翻页
	 	 * @param {} hour
	 	 */
	 	TimeTool.prototype.setHourPage=function(hour){
	 		var _this=this;
	 		if(hour<12){
		 		//第一个是否隐藏 =0就是隐藏
				if($("#"+_this.id+" .breakingnews  ul li:first:visible").length==0){
					$("#"+_this.id+" .breakingnews .bn-arrows span:first").click();			
				}
	 		}else{
	 	 		//第二个是否隐藏 =0就是隐藏
				if($("#"+_this.id+" .breakingnews  ul li:last:visible").length==0){
					$("#"+_this.id+" .breakingnews .bn-arrows span:first").click();
	 		    }
	 		}
	 	}
	 	/**
	 	 * 小时刻度的点击事件
	 	 * @param {} dom
	 	 */
	 	TimeTool.prototype.hourBindClick=function(dom){
	 		var _this=this;
	 		_this.stop();
	 		var curHour =$(dom).text();
	 		
	 		var curDayTimeArr=_this.getDayTimeArr(curHour);
	 		//判断是否有子列表
		    if(curDayTimeArr.length>0){
		 		//清除小时刻度的选中状态
		 		$("#"+_this.id+" .Map-DateAxis .timeAxis .timeAxis-top ul li .active").removeClass("active");
		 		//设置当前的小时刻度选中
		 		$(dom).addClass("active");	    	
		    	//加载子列表
	 			var paramValue=_this.getParamValue();
				_this.callBackFunc(paramValue);
		    	//_this.createMinutesPanel();
		    }else{
		    	//_this.removeMinutesPanel();
		    	//空情况
		    	var paramValue=_this.getParamValue();
				_this.callBackFunc(paramValue);
		    }
	 	}
	 	/**
	 	 * 分钟刻度的点击事件
	 	 * @param {} dom
	 	 */
	 	TimeTool.prototype.minuteBindClick=function(dom){
	 		var _this=this;
	 		_this.stop();
	 		//清除分钟刻度的选中状态
	 		$("#"+_this.id+" .Map-MinuteDiv ul .active").removeClass("active");
	 		//设置当前的分钟刻度选中
	 		$(dom).addClass("active");
	 		var paramValue=_this.getParamValue();
			_this.callBackFunc(paramValue);
	 	}
	 	/**
	 	 * 播放执行的定时方法
	 	 */
	 	TimeTool.prototype.loopShowHourMinutes=function(){
	 		var _this=this;
	 		var curIndex=_this.curDayTimeArrIndex;
	 		var nextIndex=_this.curDayTimeArrIndex+1;
	 		//设置起点  数据的第一个  最早的时间刻度
	  		var oneHourDayTime=new DayTime();
			$.extend(oneHourDayTime,_this.dayTimeArr[curIndex],true);
	 		_this.showOneHourTime(oneHourDayTime);
	 		_this.curDayTimeArrIndex=nextIndex;
	 		//是否要翻页
	 		if(nextIndex==12||nextIndex==24||nextIndex==_this.dayTimeArr.length&&nextIndex>12){
	 			$("#"+_this.id+" .breakingnews .bn-arrows span:first").click();
	 		}
//	 		console.log(curIndex+"|"+nextIndex);
	 		//设置是否要轮回

//	 		console.log(_this.loopFlag+"|"+_this.curDayTimeArrIndex+"|"+_this.dayTimeArr.length);
	 		if(_this.loopFlag&&_this.curDayTimeArrIndex>=_this.dayTimeArr.length){
	 			_this.curDayTimeArrIndex=0;
	 		}


	 	}
	 	/**
	 	 * 时间轴播放 播放的时候从最早的刻度开始播放 
	 	 */
	 	TimeTool.prototype.play=function(dom){
	 		var _this=this;
	 		//设置播放器 定时
	 		if(!_this.lockFlag){
	 			if(this.playFlag){
	 				_this.stop();
	 			    //如果在播放 转停止
	 			}else{
		 			//如果没播放 开始播放	
		 	 		//先默认设置为最早的一个
			 		_this.loopShowHourMinutes();

			 		var intervalId =setInterval(function(){
			 		_this.loopShowHourMinutes();
			 		},_this.intervalTime*1000);
			 		_this.intervalId=intervalId; 
			 		//改变状态
			 		_this.playFlag=true;
			 		//改变样式
		 			$(dom).removeClass("play");
		 			$(dom).addClass("stop");
	 			}
	 		}
	 	}
	 	/**
	 	 * 暂停播放
	 	 */
	 	TimeTool.prototype.stop=function(){
	 		if(!this.lockFlag){
	 			if(this.playFlag){
	 			//清除定时器
	 			clearInterval(this.intervalId);
	 			//改变状态
	 			this.playFlag=false;

	 			//改变样式
	 			var dom=$("#"+this.id+" .Map-DateAxis .right-play .stop");
	 			dom.removeClass("stop");
	 			dom.addClass("play");
	 			
//	 			kpTimeTool.setTimeTool(this);
	 			}
	 		}
	 	}
	 	/**
	 	 * 停止播放 并设置为最新的时间刻度
	 	 */
	 	TimeTool.prototype.suspend=function(){
	 		this.stop();
	 		var lastHourDayTime=new DayTime();
	 		
			$.extend(lastHourDayTime,this.dayTimeArr[this.dayTimeArr.length-1],true);
	 		this.showOneHourTime(lastHourDayTime); 		
	 	}
	 	/**
	 	 * 上锁功能
	 	 * @param {} dom
	 	 */
	 	TimeTool.prototype.lockSwitch=function(dom){
	 		this.stop();
	 		var _this=this;
	 		if(!_this.lockFlag){
		  		//改变状态
		 		_this.lockFlag=true;
		 		//改变样式
		 		$(dom).removeClass("unlock");
		 		$(dom).addClass("locking");
		 		//关掉面板上的点击事件
		 		$("#"+this.id+" .breakingnews1 .bn-arrows span").off("click");
		 		$("#"+this.id+" .Map-DateAxis .timeAxis .timeAxis-top ul li div").off("click");
		 		$("#"+this.id+" .Map-MinuteDiv ul li").off("click");
		 		
	 		}else{
		  		_this.stop();
		 		//改变状态
		 		_this.lockFlag=false;
		 		//改变样式
		 		$(dom).removeClass("locking");
		 		$(dom).addClass("unlock");
		 		//时间轴时间重新绑定时间
				_this.hourPageBindClick();
				//小时刻度 分钟刻度时间绑定
		 		$("#"+this.id+" .Map-DateAxis .timeAxis .timeAxis-top ul li div").click(function(){
					_this.hourBindClick(this);
	 		    });
		 		$("#"+this.id+" .Map-MinuteDiv ul li").click(function(){
					_this.minuteBindClick(this);
	 			});			
	 		}	 	
	 	}
		
	 	/**
	 	 * 显示组件
	 	 */
	 	TimeTool.prototype.show=function(){
	 		$("#"+this.id).show();
	 	}
 		
	 	/**
	 	 * 隐藏组件
	 	 */
 	 	TimeTool.prototype.hide=function(){
	 		$("#"+this.id).hide();
	 	}


	function initTimeToolDate(yyyyMMdd){

		
		var HH=23;
		
		var yyyy = parseInt(yyyyMMdd.substr(0,4));
		var MM = parseInt(yyyyMMdd.substr(4,2));
		var dd = parseInt(yyyyMMdd.substr(6,2));
		
    		var dayTimeArr=[];
    		//生成到当前时间点最近的间隔数据   
			for(var i=0;i<=parseInt(HH);i++){
						var oneDayTime = new DayTime();
						oneDayTime.year=yyyy;
						oneDayTime.month=MM;
						oneDayTime.day=dd;
						oneDayTime.hour=parseInt(i);
						oneDayTime.minute=0;
						oneDayTime.paramValue=parseInt(i);
						dayTimeArr.push(oneDayTime);
			

			}			
		
		return dayTimeArr;
    }
