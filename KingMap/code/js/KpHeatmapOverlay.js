/**
 * 热力图构造方法  v0.1
 * V0.1 
 * @param {Object} map  地图原生对象
 * @param {Object} dataSet 数据集合
 * @param {Object} options 初始化配置
 */
KingMap.HeatmapOverlay = function(kpMap,dataSet,options){
	
	var heatmapOverlay = {};
	//百度初始化热力图的配置不能为缺省  默认一个属性
	var ops = {"visible":1};
	ops = Object.assign(ops,options);
	var dataSet = dataSet;
	var map = kpMap.getMap();
	var apiType = map.apiType;
//百度的配置	
//{"radius" : {String} 热力图的半径, 
//"visible" : {Number} 热力图是否显示, 
//"gradient" : {JSON} 热力图的渐变区间, 
//"opacity" : {Number} 热力的透明度
//}
//高德的配置
//radius	Number	热力图中单个点的半径，默认：30，单位：pixel
//gradient	Object	热力图的渐变区间，热力图按照设置的颜色及间隔显示热力图，例：
//opacity	Array	热力图透明度数组，取值范围[0,1]，0表示完全透明，1表示不透明，默认：[0,1]
//zooms	Array	支持的缩放级别范围，取值范围[3-18]，默认：[3,18]
//   
     
      //初始化heatmapOverlay对象
     if(apiType=="BMap"){
     	heatmapOverlay =  new BMapLib.HeatmapOverlay(ops);
     	map.addOverlay(heatmapOverlay);
     	heatmapOverlay.setDataSet(dataSet);
     }else{
	     map.plugin(["AMap.Heatmap"], function() {
	        heatmapOverlay = new AMap.Heatmap(map);
	        heatmapOverlay.setDataSet(dataSet);
	    });    	
     }
     
     /**
      * 添加热力图的详细坐标点
      * @param {Number} lng
      * @param {Number} lat
      * @param {Number} count
      */

     var addDataPoint = function(lng, lat, count){
     	//百度提供的addDataPoint会报错
     	heatmapOverlay.addDataPoint(lng, lat, count);
     };
     
     /**
      * 设置热力图展现的详细数据, 实现之后,即可以立刻展现
      * @param {Array} data
      */
     var setDataSet =function(data){
     	heatmapOverlay.setDataSet(data);
     };
     
     /**
      * 设置热力图展现的配置
      * @param {Object} options
      */
	var setOptions=function(options){
     	heatmapOverlay.setOptions(options);
	};
	
     /**
      * 隐藏热力图
      */	
	var hide=function(){
		heatmapOverlay.hide();
	}

     /**
      * 显示热力图
      */
	var show=function(){
		heatmapOverlay.show();
	}
	
     /**
      * 返回原生热力图层对象
      */
	var getHeapMap=function(){
		return heatmapOverlay;
	}

	var getApiType = function(){
		return apiType;
	}

	var getOptions = function(){
		return ops;
	}
    
	return {
		addDataPoint : addDataPoint,
		setDataSet : setDataSet,
		setOptions : setOptions,
		hide : hide,
		show : show,
		getOverlay : getHeapMap,
		getApiType : getApiType,
		getOptions : getOptions
	}
	
};

	

