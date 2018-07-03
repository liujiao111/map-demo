


KingMapUtil = {

  copy : function (obj){
    if(typeof obj != 'object'){
        return obj;
    }
    var newobj = {};
    //数组的处理
    if (obj && obj.length) {
        newobj = new Array();
        obj.forEach(function(data,index,array){
            newobj.push(data);
        });
        return newobj ;
    }
    //纯对象的处理
    for ( var attr in obj) {
        newobj[attr] = this.copy(obj[attr]);
    }
    return newobj;
},





} ||{};