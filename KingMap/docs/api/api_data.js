define({ "api": [
  {
    "type": "POST GET",
    "url": "/construction",
    "title": "构造器",
    "group": "Bounds",
    "name": "construction",
    "version": "0.1.0",
    "examples": [
      {
        "title": "调用示例",
        "content": "var KingBounds = new KingMap.Bounds(options);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "options",
            "description": "<p>Icon初始化参数</p>"
          },
          {
            "group": "Parameter",
            "type": "Point",
            "optional": false,
            "field": "options.sw",
            "description": "<p>必须，矩形区域的西北角（左上角），参数为KingMap.Point类</p>"
          },
          {
            "group": "Parameter",
            "type": "Point",
            "optional": false,
            "field": "options.ne",
            "description": "<p>必须，矩形区域的东南角（右下角角），参数为KingMap.Point类</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Bounds.api",
    "groupTitle": "Bounds"
  },
  {
    "type": "POST GET",
    "url": "/describe",
    "title": "描述",
    "group": "Bounds",
    "name": "describe",
    "version": "0.1.0",
    "description": "<p>地物对象的经纬度矩形范围。创建一个包含所有给定点坐标的矩形区域。其中sw表示矩形区域的西南角，参数ne表示矩形区域的东北角</p>",
    "filename": "doc/KingMap.Bounds.api",
    "groupTitle": "Bounds"
  },
  {
    "type": "POST GET",
    "url": "/function",
    "title": "方法",
    "group": "Bounds",
    "name": "function",
    "version": "0.1.0",
    "description": "<p>Bounds的方法</p>",
    "examples": [
      {
        "title": "示例",
        "content": "//设置标注所用的图标对象\nKingBounds.getCenter();",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Point",
            "optional": false,
            "field": "contains",
            "description": "<p>指定点坐标是否在矩形范围内（边界上的点不属于矩形范围内），参数为KingMap.Point类</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getCenter",
            "description": "<p>获取当前Bounds的中心点经纬度坐标，返回KingMap.Point类</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getSouthWest",
            "description": "<p>获取西南角坐标，返回KingMap.Point类</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getNorthEast",
            "description": "<p>获取东北角坐标，返回KingMap.Point类</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "getBounds",
            "description": "<p>获取原生API的Bounds对象。参数为apiType,地图API类型：'BMap','AMap'</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Bounds.api",
    "groupTitle": "Bounds"
  },
  {
    "type": "POST GET",
    "url": "/construction",
    "title": "构造器",
    "name": "construction",
    "group": "Circle",
    "version": "0.1.0",
    "examples": [
      {
        "title": "调用示例",
        "content": "var options = {\n\tcenterLng : 113.517032,\n\tcenterLat : 22.350776,\n\tapiType : 'BMap'\n}\n\t\t\n//构造实例\nvar Circle1 = new KingMap.Circle(map, options);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "map",
            "description": "<p>必须,经过封装的KingMap对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "options",
            "description": "<p>覆盖物渲染的参数定义对象：</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "options.centerLng",
            "description": "<p>必须，圆心经度，例：113.330914</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "options.centerLat",
            "description": "<p>必须，圆心纬度，例：23.128659</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "options.apiType",
            "description": "<p>必须，地图类型\\n高德地图类型：&quot;AMap&quot;；百度地图类型：&quot;BMap&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.radius",
            "description": "<p>可选，半径，默认值500</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "options.strokeColor",
            "description": "<p>可选，线颜色，默认值#FF33FF</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.strokeOpacity",
            "description": "<p>可选，线透明度，默认值0.2</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.strokeWeight",
            "description": "<p>可选，线粗细度,默认值3</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "options.fillColor",
            "description": "<p>可选，填充颜色，默认值#1791fc</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.fillOpacity",
            "description": "<p>可选，填充透明度，默认值0.35</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Circle.api",
    "groupTitle": "Circle"
  },
  {
    "type": "POST GET",
    "url": "/describe",
    "title": "描述",
    "name": "describe",
    "group": "Circle",
    "version": "0.1.0",
    "description": "<p>基于高德和百度地图的Circle圆形覆盖物的KingMap.Circle对象</p>",
    "filename": "doc/KingMap.Circle.api",
    "groupTitle": "Circle"
  },
  {
    "type": "POST GET",
    "url": "/event",
    "title": "事件",
    "group": "Circle",
    "name": "event",
    "version": "0.1.0",
    "description": "<p>Circle覆盖物的触发事件。 参数MapsEvent参考MapsEvent对象规范说明部分，none表示此事件没有参数</p>",
    "examples": [
      {
        "title": "调用示例",
        "content": "var Function = function(MapsEvent){\n    console.log(MapsEvent.target);\n    console.log(MapsEvent.point);\n    ....\n}\nCircle1.addEventListener('dblclick',Function);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "click",
            "description": "<p>点击圆形标记图标后会触发此事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "dblclick",
            "description": "<p>双击圆形标记图标后会触发此事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mousedown",
            "description": "<p>鼠标在圆形标记上按下时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseup",
            "description": "<p>鼠标在圆形标记上按下后抬起时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseover",
            "description": "<p>鼠标移近圆形标记时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseout",
            "description": "<p>鼠标离开圆形标记时触发此事件</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Circle.api",
    "groupTitle": "Circle"
  },
  {
    "type": "POST GET",
    "url": "/function",
    "title": "方法",
    "name": "function",
    "group": "Circle",
    "version": "0.1.0",
    "description": "<p>可使用的方法</p>",
    "examples": [
      {
        "title": "示例",
        "content": "var centerLng : 113.517032;\nvar centerLat : 22.360776;\nCircle.setCenter(new KingMap.Point(centerLng,centerLat));",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Point",
            "optional": false,
            "field": "setCenter",
            "description": "<p>设置圆形覆盖物的圆形坐标，参数：KingMap.Point对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getCenter",
            "description": "<p>获取圆形覆盖物的圆形坐标，返回KingMap.Point对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "hide",
            "description": "<p>覆盖物隐藏</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "show",
            "description": "<p>覆盖物显示</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "remove",
            "description": "<p>覆盖物移除</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "setRadius",
            "description": "<p>设置圆形覆盖物的半径大小，参数：半径长度，例：20</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getRadius",
            "description": "<p>获取当前圆形覆盖物的半径长度</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getBounds",
            "description": "<p>获取覆盖物的地理区域范围，返回KingMap.Bounds对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getMap",
            "description": "<p>获取覆盖物所在地图对象，返回原生百度地图对象或者高德地图对象</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "addEventListener",
            "description": "<p>覆盖物事件绑定，参数1：事件名；参数2：事件回调函数</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "removeEventListener",
            "description": "<p>覆盖物事件绑定移除，参数1：事件名；参数2：事件回调函数</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOverlay",
            "description": "<p>获取原生的覆盖物对象，返回原生的圆形对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOptions",
            "description": "<p>获取初始化时的配置参数</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getApiType",
            "description": "<p>获取地图覆盖物类型，高德地图类型：&quot;AMap&quot;；百度地图类型：&quot;BMap&quot;</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Circle.api",
    "groupTitle": "Circle"
  },
  {
    "type": "POST GET",
    "url": "/construction",
    "title": "构造器",
    "name": "construction",
    "group": "CurveLine",
    "version": "0.1.0",
    "examples": [
      {
        "title": "调用示例",
        "content": "var bmapOptions = {\n\tid: \"allmap\",\n\tapiType: \"BMap\",\n\tzoom: 15,\n\tlng: '113.551694',\n\tlat: '22.365569'\n};\n\nvar map = new KingMap.Map(bmapOptions).getMap();\nvar path = [ \n\t[116.39, 39.91, 116.37, 39.91], //起点\n\t//第一段弧线\n\t[116.380298, 39.907771, 116.38, 39.90]\n]\n\nvar options = {\n\tpath: path,\n\tapiType: \"AMap\",\n\tisOpenEdit : true// 开启编辑功能\n}\n//构造实例\nvar curveLine = new KingMap.CurveLine(map, options);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "map",
            "description": "<p>必须,经过封装的KingMap对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "options",
            "description": "<p>覆盖物渲染的参数定义对象：</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "options.apiType",
            "description": "<p>必须，地图类型\\n百度地图类型：&quot;BMap&quot;；高德地图类型：&quot;AMap&quot;；</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "options.path",
            "description": "<p>必须，折线路径坐标，由于高德和百度需要的数据格式\\n差距较大，因此需要参考各自的API定义该字段。详情参见高德\\n地图的BezierCurve类和百度地图第三方开源项目BMapLib.CurveLine类\\n地址：http://huiyan-fe.github.io/BMap-JavaScript-library/#\\nBMapLib.CurveLine</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "options.strokeColor",
            "description": "<p>可选，线颜色，默认值#FF33FF</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.strokeOpacity",
            "description": "<p>可选，线透明度，默认值1</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.strokeWeight",
            "description": "<p>可选，线宽，默认值 3</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "options.strokeStyle",
            "description": "<p>可选，线样式，默认值solid</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "options.isOpenEdit",
            "description": "<p>可选，是否开启编辑，默认false</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.CurveLine.api",
    "groupTitle": "CurveLine"
  },
  {
    "type": "none",
    "url": "/describe",
    "title": "描述",
    "name": "describe",
    "group": "CurveLine",
    "version": "0.1.0",
    "description": "<p>基于高德和百度地图的弧线覆盖物的KingMap.CurveLine对象</p>",
    "filename": "doc/KingMap.CurveLine.api",
    "groupTitle": "CurveLine"
  },
  {
    "type": "POST GET",
    "url": "/event",
    "title": "事件",
    "group": "CurveLine",
    "name": "event",
    "version": "0.1.0",
    "description": "<p>CurveLine覆盖物的触发事件。 参数MapsEvent参考MapsEvent对象规范说明部分，none表示此事件没有参数</p>",
    "examples": [
      {
        "title": "调用示例",
        "content": "var Function = function(MapsEvent){\n    console.log(MapsEvent.target);\n    console.log(MapsEvent.point);\n    ....\n}\ncurveLine.addEventListener('dblclick',Function);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "click",
            "description": "<p>点击弧线标记图标后会触发此事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "dblclick",
            "description": "<p>双击弧线标记图标后会触发此事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mousedown",
            "description": "<p>鼠标在弧线标记上按下时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseup",
            "description": "<p>鼠标在弧线标记上按下后抬起时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseover",
            "description": "<p>鼠标移近弧线标记时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseout",
            "description": "<p>鼠标离开弧线标记时触发此事件</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.CurveLine.api",
    "groupTitle": "CurveLine"
  },
  {
    "type": "POST GET",
    "url": "/function",
    "title": "方法",
    "name": "function",
    "group": "CurveLine",
    "version": "0.1.0",
    "description": "<p>可使用的方法</p>",
    "examples": [
      {
        "title": "示例",
        "content": "var curveLine = new KingMap.CurveLine(map, options);\nvar path = curveLine.getPath();",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getPath",
            "description": "<p>获取弧线路径，返回路径数组，详情参考高德地图和百度地图具体类</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "hide",
            "description": "<p>弧线隐藏</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "show",
            "description": "<p>弧线显示</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "remove",
            "description": "<p>弧线移除</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getMap",
            "description": "<p>获取弧线所在的地图对象，返回原生地图对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getBounds",
            "description": "<p>获取弧线的地理区域范围，返回KingMap.Bounds对象</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "addEventListener",
            "description": "<p>覆盖物事件绑定，参数1：事件名；参数2：事件回调函数</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "removeEventListener",
            "description": "<p>覆盖物事件绑定移除，参数1：事件名；参数2：事件回调函数</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOverlay",
            "description": "<p>获取原生对象，返回原生弧线对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOptions",
            "description": "<p>获取初始化时的配置参数</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getApiType",
            "description": "<p>获取地图覆盖物类型，高德地图类型：&quot;AMap&quot;；百度地图类型：&quot;BMap&quot;</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.CurveLine.api",
    "groupTitle": "CurveLine"
  },
  {
    "type": "POST GET",
    "url": "/construction",
    "title": "构造器",
    "name": "construction",
    "version": "0.1.0",
    "group": "DrawingManager",
    "examples": [
      {
        "title": "调用示例",
        "content": "//实例化一个工具类\nvar drawingManager = new KingMap.DrawingManager(map);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "map",
            "description": "<p>必须,经过封装的KingMap对象</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.DrawingManager.api",
    "groupTitle": "DrawingManager"
  },
  {
    "type": "POST GET",
    "url": "/describe",
    "title": "描述",
    "name": "describe",
    "group": "DrawingManager",
    "version": "0.1.0",
    "description": "<p>DrawingManager类，地图绘制工具, 基于地图api 封装的简单圈定工具（暂支持百度地图与高德地图）<br> 通过该工具，可进行鼠标画折线、多边形、矩形、圆等功能</p>",
    "filename": "doc/KingMap.DrawingManager.api",
    "groupTitle": "DrawingManager"
  },
  {
    "type": "POST GET",
    "url": "/event",
    "title": "事件",
    "name": "event",
    "version": "0.1.0",
    "group": "DrawingManager",
    "description": "<p>初始时可配置的事件列表</p>",
    "examples": [
      {
        "title": "示例",
        "content": "var options = {\n  overlayComplete : callback \n}",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "overlay",
            "optional": false,
            "field": "overlayComplete",
            "description": "<p>圈定绘制完成触发事件,参数为地图原生的overlay</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.DrawingManager.api",
    "groupTitle": "DrawingManager"
  },
  {
    "type": "POST GET",
    "url": "/function",
    "title": "方法",
    "name": "function",
    "version": "0.1.0",
    "group": "DrawingManager",
    "description": "<p>基于原生地图封装后暴露出来的方法</p>",
    "examples": [
      {
        "title": "示例",
        "content": "var callback = function  (overlay){\n\tconsole.log(\"回调函数\")\n\talert(\"这里是回调函数:\" + (overlay ||' == ')  );\n};\nvar drawingManager = new KingMap.DrawingManager(map);\nvar overlay = drawingManager.draw(type,{\n\toverlayComplete : callback,//回调函数实例\n\tenableCopyMenu : true,//百度地图，开启右键复制 \n\tenableRemoveMenu : true,//百度地图，开启右键删除\n\tstyle : {fillColor : 'red'}//绘制的样式，不传默认样式\n});",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "draw",
            "description": "<p>开启绘制功能，参数如下：</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "draw.type",
            "description": "<p>必须，绘制类型：'polygon','circle','polyline','rectangle'等；</p>"
          },
          {
            "group": "Parameter",
            "type": "Function",
            "optional": true,
            "field": "draw.overlayComplete",
            "description": "<p>可选，回调函数实例;</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "draw.enableCopyMenu",
            "description": "<p>可选，百度地图，开启右键复制 ;</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "draw.enableRemoveMenu",
            "description": "<p>可选，百度地图，开启右键删除;</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "draw.style",
            "description": "<p>可选，绘制的样式，不传默认样式；</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.DrawingManager.api",
    "groupTitle": "DrawingManager"
  },
  {
    "type": "POST GET",
    "url": "/construction",
    "title": "构造器",
    "name": "construction",
    "version": "0.1.0",
    "group": "HeatmapOverlay",
    "examples": [
      {
        "title": "调用示例",
        "content": " //构造示例\n    var map =new KingMap.Map({id:\"allmap\",apiType:\"BMap\",lng:116.418261,lat:39.921984,zoom:15}).getMap();\n    var points =[\n    \t{\"lng\":116.418261,\"lat\":39.921984,\"count\":50},\n    \t{\"lng\":116.423332,\"lat\":39.916532,\"count\":51},\n    \t{\"lng\":116.425867,\"lat\":39.918989,\"count\":8}\n\t];\n    \n    var dataSet ={\n    \tmax:12,\n    \tdata:points\n    }\n    \n    var heatmap= new KingMap.HeatmapOverlay(map,dataSet);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "map",
            "description": "<p>必须，地图对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "dataSet",
            "description": "<p>必须,数据对象数组，数据对象如：{lng:116.39,lat:23.12,count:12},其中lng（经度）、lat（纬度）属性必须，count（权重）属性可缺省</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "options",
            "description": "<p>可选,覆盖物渲染的参数定义对象</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "options.radius",
            "description": "<p>可选，热力图的半径，默认：30，单位：pixel</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.visible",
            "description": "<p>可选，热力图是否显示（仅百度）,1为显示热力图</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "options.gradient",
            "description": "<p>可选，热力图的渐变区间，热力图按照设置的颜色及间隔显示热力图</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.opacity",
            "description": "<p>可选，热力的透明度（仅百度），取值范围[0,1]，0表示完全透明，1表示不透明，默认：[0,1]</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.HeatmapOverlay.api",
    "groupTitle": "HeatmapOverlay"
  },
  {
    "type": "POST GET",
    "url": "/describe",
    "title": "描述",
    "name": "describe",
    "version": "0.1.0",
    "description": "<p>创建热力图实例</p>",
    "group": "HeatmapOverlay",
    "filename": "doc/KingMap.HeatmapOverlay.api",
    "groupTitle": "HeatmapOverlay"
  },
  {
    "type": "POST GET",
    "url": "/function",
    "title": "方法",
    "name": "function",
    "version": "0.1.0",
    "description": "<p>可使用的方法</p>",
    "group": "HeatmapOverlay",
    "examples": [
      {
        "title": "示例",
        "content": "heatmap.addDataPoint(new KingMap.Point(116.42076,39.915251),70);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Point,Number",
            "optional": false,
            "field": "addDataPoint",
            "description": "<p>添加热力图的详细坐标点\\n参数1：KingMap.Point对象；参数2：可选，热力图权值，如12。</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "setDataSet",
            "description": "<p>设置热力图展现的详细数据, 实现之后,即可以立刻展现\\n参数：热力详细数据，必须。例：\\n[{&quot;lng&quot;:116.191031,&quot;lat&quot;:39.988585,&quot;count&quot;:10}...],其中lng为经度，lat为纬度，count为权值（可选）</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "hide",
            "description": "<p>隐藏热力图</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "show",
            "description": "<p>显示热力图</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOverlay",
            "description": "<p>返回原生热力图层对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOptions",
            "description": "<p>获取初始化时的配置参数</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getApiType",
            "description": "<p>获取地图覆盖物类型，高德地图类型：&quot;AMap&quot;；百度地图类型：&quot;BMap&quot;</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.HeatmapOverlay.api",
    "groupTitle": "HeatmapOverlay"
  },
  {
    "type": "POST GET",
    "url": "/construction",
    "title": "构造器",
    "group": "Icon",
    "name": "construction",
    "version": "0.1.0",
    "examples": [
      {
        "title": "调用示例",
        "content": "var KingIcon = new KingMap.Icon(options);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "options",
            "description": "<p>Icon初始化参数</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "options.size",
            "description": "<p>可选，显示区域的大小，仅限百度。默认值：[500,500]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "options.url",
            "description": "<p>必须，图标的地址</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "options.imageOffset",
            "description": "<p>可选，图标偏移值，默认值：[20,20]</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "options.imageSize",
            "description": "<p>可选，图标大小，仅限高德，默认值：[36,36]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "options.apiType",
            "description": "<p>必须，坐标的类型，例：\\n百度坐标类型：&quot;BMap&quot;；高德坐标类型：&quot;AMap&quot;；</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Icon.api",
    "groupTitle": "Icon"
  },
  {
    "type": "POST GET",
    "url": "/describe",
    "title": "描述",
    "group": "Icon",
    "name": "describe",
    "version": "0.1.0",
    "description": "<p>基础坐标构造方法，实现对百度地图和高德地图Icon对象的封装</p>",
    "examples": [
      {
        "title": "示例",
        "content": "//构造示例\nvar KingIcon = new KingMap.Icon({...});\n//方法调用\nKingIcon.getImageSize();",
        "type": "js"
      }
    ],
    "filename": "doc/KingMap.Icon.api",
    "groupTitle": "Icon"
  },
  {
    "type": "POST GET",
    "url": "/function",
    "title": "方法",
    "group": "Icon",
    "name": "function",
    "version": "0.1.0",
    "description": "<p>Icon图标使用的方法</p>",
    "examples": [
      {
        "title": "示例",
        "content": "//设置标注所用的图标对象\nKingIcon.setImageSize([36,36]);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "setImageSize",
            "description": "<p>设置图标的大小，参数为数值型数组，例：[36,36]</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getIcon",
            "description": "<p>返回原生的百度和高德Icon对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getApiType",
            "description": "<p>返回原生point的类型，百度坐标类型：&quot;BMap&quot;；高德坐标类型：&quot;AMap&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOptions",
            "description": "<p>返回Icon类的基础配置参数options</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Icon.api",
    "groupTitle": "Icon"
  },
  {
    "type": "POST GET",
    "url": "/construction",
    "title": "构造器",
    "group": "InfoWindow",
    "name": "construction",
    "version": "0.1.0",
    "examples": [
      {
        "title": "调用示例",
        "content": "var KingInfoWindow = new KingMap.InfoWindow({\n    content : '',\n    offset : [20,20],\n    width : 500,\n    height : 350\n});",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "options",
            "description": "<p>地图初始化参数定义对象：</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "options.content",
            "description": "<p>必须，信息展示窗体显示的内容，可以是HTML要素字符串或者HTMLElement对象</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "options.apiType",
            "description": "<p>必须，信息窗体的类型，'AMap'为高德地图，'BMap'为百度地图</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.width",
            "description": "<p>可选，信息窗宽度，单位像素。取值范围： 220 - 730。如果不设置此参数，则信息窗口的宽度将按照其内容自动调整</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.height",
            "description": "<p>可选，信息窗高度，单位像素。取值范围： 60 - 650。如果不设置此参数，则信息窗口的高度将按照其内容自动调整</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "options.offset",
            "description": "<p>可选，信息窗位置偏移值，例[20,20]。</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "options.position",
            "description": "<p>可选，信息窗体定位的位置，参数为KingMap.Point对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "options.autoMove",
            "description": "<p>可选，是否自动调整窗体到视野内</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "options.closeWhenClickMap",
            "description": "<p>可选，控制是否在鼠标点击地图后关闭信息窗体，默认false，鼠标点击地图后不关闭信息窗体</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.InfoWindow.api",
    "groupTitle": "InfoWindow"
  },
  {
    "type": "POST GET",
    "url": "/describe",
    "title": "描述",
    "group": "InfoWindow",
    "name": "describe",
    "version": "0.1.0",
    "description": "<p>基础地图构造方法，在地图上弹出一个详细信息展示窗体</p>",
    "examples": [
      {
        "title": "示例",
        "content": "//构造示例\nvar KingInfoWindow = new KingMap.InfoWindow({...});\n//方法调用\nKingInfoWindow.getIsOpen();",
        "type": "js"
      }
    ],
    "filename": "doc/KingMap.InfoWindow.api",
    "groupTitle": "InfoWindow"
  },
  {
    "type": "POST GET",
    "url": "/event",
    "title": "事件",
    "group": "InfoWindow",
    "name": "event",
    "version": "0.1.0",
    "description": "<p>InfoWindow信息窗口的触发事件。</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "change",
            "description": "<p>属性发生变化时</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "open",
            "description": "<p>信息窗体打开之后触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "close",
            "description": "<p>信息窗体关闭之后触发事件</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.InfoWindow.api",
    "groupTitle": "InfoWindow"
  },
  {
    "type": "POST GET",
    "url": "/function",
    "title": "方法",
    "group": "InfoWindow",
    "name": "function",
    "version": "0.1.0",
    "description": "<p>可使用的map对象方法</p>",
    "examples": [
      {
        "title": "示例",
        "content": "//返回地图上的信息窗口是否已打开\nKingInfoWindow.getIsOpen();",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "setContent",
            "description": "<p>设置窗体显示的内容，参数：信息展示窗体显示的内容，可以是HTML要素字符串或者HTMLElement对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getContent",
            "description": "<p>返回窗体显示的内容，HTML要素字符串或者HTMLElement对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getIsOpen",
            "description": "<p>返回信息窗口的打开状态，打开时为true</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getPosition",
            "description": "<p>返回信息窗体的基点坐标，返回KingMap.Point对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "setSize",
            "description": "<p>设置信息窗体的大小，参数：信息框宽高数组，例：[200,200]，若参数为空或者0则表示大小随内容自适应，宽度取值范围取值范围：220 - 730，高度取值范围：60 - 650</p>"
          },
          {
            "group": "Parameter",
            "type": "Map,Point",
            "optional": false,
            "field": "open",
            "description": "<p>打开信息框，参数1：封装的KingMap.Map地图对象；参数2：封装的KingMap.Point对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "close",
            "description": "<p>关闭地图上的信息框</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "addEventListener",
            "description": "<p>事件绑定\\n参数1：事件名；参数2：事件功能函数</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "removeEventListener",
            "description": "<p>事件解绑\\n参数1：事件名；参数2：事件功能函数</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getInfoWindow",
            "description": "<p>获取原生InfoWindow对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getApiType",
            "description": "<p>获取地图类型，返回地图类型，百度地图类型：&quot;BMap&quot;；高德地图类型：&quot;AMap&quot;；</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOptions",
            "description": "<p>获取初始化时的配置参数</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.InfoWindow.api",
    "groupTitle": "InfoWindow"
  },
  {
    "type": "POST GET",
    "url": "/construction",
    "title": "构造器",
    "name": "construction",
    "version": "0.1.0",
    "group": "Label",
    "examples": [
      {
        "title": "调用示例",
        "content": "kpLabel = new KingMap.Label(map,options);\nkpLabel.getLabel();",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "map",
            "description": "<p>必须,经过封装的KingMap对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "options",
            "description": "<p>初始化数据,基础配置参数</p>"
          },
          {
            "group": "Parameter",
            "type": "Point",
            "optional": false,
            "field": "options.position",
            "description": "<p>必须，指定文本标注所在的地理位置</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.zIndex",
            "description": "<p>可选，标记覆盖物的叠加顺序，参数为负数远离屏幕，为正数靠近屏幕</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "options.text",
            "description": "<p>必须，文本标注的内容，例：&quot;这是一个简单的文本标注哦~&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "options.offsets",
            "description": "<p>可选，点标记显示位置偏移量，例：[10,10]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "option.color",
            "description": "<p>可选，颜色，例：&quot;red&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "option.fontSize",
            "description": "<p>可选，字体大小，例：&quot;12px&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "option.height",
            "description": "<p>可选，标注高度，例：&quot;20px&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "option.fontFamily",
            "description": "<p>可选，字体型号，例：&quot;微软雅黑&quot;</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Label.api",
    "groupTitle": "Label"
  },
  {
    "type": "POST GET",
    "url": "/describe",
    "title": "描述",
    "name": "describe",
    "version": "0.1.0",
    "description": "<p>创建一个文本标注实例<br></p>",
    "group": "Label",
    "examples": [
      {
        "title": "示例",
        "content": "//构造示例\nkpLabel=new KingMap.Label(map,options);\n\n//方法调用\nkpLabel.delete();\n\n//监听事件\nkpLabel.addEventListener(event,handler);",
        "type": "js"
      }
    ],
    "filename": "doc/KingMap.Label.api",
    "groupTitle": "Label"
  },
  {
    "type": "POST GET",
    "url": "/event",
    "title": "事件",
    "group": "Label",
    "name": "event",
    "version": "0.1.0",
    "description": "<p>Label覆盖物的触发事件。 参数MapsEvent参考MapsEvent对象规范说明部分，none表示此事件没有参数</p>",
    "examples": [
      {
        "title": "调用示例",
        "content": "var Function = function(MapsEvent){\n    console.log(MapsEvent.target);\n    console.log(MapsEvent.point);\n    ....\n}\nkpLabel.addEventListener('dblclick',Function);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "click",
            "description": "<p>点击文本标注后会触发此事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "dblclick",
            "description": "<p>双击文本标注后会触发此事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mousedown",
            "description": "<p>鼠标在文本标注上按下时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseup",
            "description": "<p>鼠标在文本标注上按下后抬起时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseover",
            "description": "<p>鼠标移进文本标注区域时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseout",
            "description": "<p>鼠标离开文本标注时触发此事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "rightclick",
            "description": "<p>右键点击文本标注时触发此事件</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Label.api",
    "groupTitle": "Label"
  },
  {
    "type": "POST GET",
    "url": "/function",
    "title": "方法",
    "name": "function",
    "version": "0.1.0",
    "description": "<p>可使用的方法</p>",
    "group": "Label",
    "examples": [
      {
        "title": "示例",
        "content": "kpLabel.delete();\nvar label = kpLabel.getLabel();",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "delete",
            "description": "<p>删除文本标注</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOverlay",
            "description": "<p>获取原生对象，返回原生文本标注对象</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "setText",
            "description": "<p>设置文本标注的内容，参数：text，为文本标注的内容</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getText",
            "description": "<p>获取文本标注的内容，返回文本标注的内容</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "setStyle",
            "description": "<p>设置文本标注的style，参数格式参考css样式表，格式如下：\\nstyle：{\\n\tcolor: &quot;red&quot;,//字体颜色\\n\tfont-size: &quot;12px&quot;,//字体大小\\n\theight: &quot;20px&quot;//高度\\n}</p>"
          },
          {
            "group": "Parameter",
            "type": "Point",
            "optional": false,
            "field": "setPosition",
            "description": "<p>设置文本标注的位置，参数：KingMap.Point对象</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "addEventListener",
            "description": "<p>事件绑定\\n参数1：需要绑定的事件名；参数2： 绑定的事件功能函数</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "removeEventListener",
            "description": "<p>事件解绑\\n参数1：event，需要解绑的事件名；参数2：解绑的事件功能函数</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOptions",
            "description": "<p>获取初始化时的配置参数</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getApiType",
            "description": "<p>获取地图覆盖物类型，高德地图类型：&quot;AMap&quot;；百度地图类型：&quot;BMap&quot;</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Label.api",
    "groupTitle": "Label"
  },
  {
    "type": "POST GET",
    "url": "/construction",
    "title": "构造器",
    "group": "Map",
    "name": "construction",
    "version": "0.1.0",
    "examples": [
      {
        "title": "调用示例",
        "content": "var KingMap = new KingMap.Map({\n    id : 'allmap',\n    apiType : 'BMap',\n    lng : 113.330914,\n    lan : 23.128659\n});",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "options",
            "description": "<p>地图初始化参数定义对象：</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "options.id",
            "description": "<p>必须，容器div id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "options.apiType",
            "description": "<p>可选，api类型，百度地图类型：&quot;BMap&quot;；高德地图类型：&quot;AMap&quot; ,默认'BMap'</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.lng",
            "description": "<p>可选，中心点经度，例：113.330914</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.lat",
            "description": "<p>可选，中心点纬度，例：23.128659</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "options.zooms",
            "description": "<p>可选，控制地图放大缩小级别，范围[3,19]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.zoom",
            "description": "<p>可选，设置地图级别范围，默认值[3,19]</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "options.dragEnable",
            "description": "<p>可选，地图拖拽</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "options.zoomEnable",
            "description": "<p>可选，滚轮放大缩小</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "options.doubleClickZoom",
            "description": "<p>可选，双击放大</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "options.keyboardEnable",
            "description": "<p>可选，键盘操作。\\n百度：启用键盘操作 键盘的上、下、左、右键可连续移动地图。同时按下其中两个键可使地图进行对角移动。PgUp、PgDn、Home和End键会使地图平移其1/2的大小。+、-键会使地图放大或缩小一级。<br>\\n高德：方向键控制地图平移，&quot;+&quot;和&quot;-&quot;可以控制地图的缩放，Ctrl+“→”顺时针旋转，Ctrl+“←”逆时针旋转。<br></p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.BaseMap.api",
    "groupTitle": "Map"
  },
  {
    "type": "POST GET",
    "url": "/describe",
    "title": "描述",
    "group": "Map",
    "name": "describe",
    "version": "0.1.0",
    "description": "<p>基础地图构造方法，实现对百度地图和高德地图相关方法的封装</p>",
    "examples": [
      {
        "title": "示例",
        "content": "//构造示例\nvar KingMap = new KingMap.Map({...});\n//方法调用\nKingMap.getMap();",
        "type": "js"
      }
    ],
    "filename": "doc/KingMap.BaseMap.api",
    "groupTitle": "Map"
  },
  {
    "type": "POST GET",
    "url": "/event",
    "title": "事件",
    "group": "Map",
    "name": "event",
    "version": "0.1.0",
    "description": "<p>基础地图map的触发事件。 参数MapsEvent参考MapsEvent对象规范说明部分，none表示此事件没有参数</p>",
    "examples": [
      {
        "title": "调用示例",
        "content": "var Function = function(MapsEvent){\n    console.log(MapsEvent.target);\n    console.log(MapsEvent.point);\n    ....\n}\nKingMap.addEventListener('dblclick',Function);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "click",
            "description": "<p>鼠标左键单击事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "dblclick",
            "description": "<p>鼠标左键双击事件</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "movestart",
            "description": "<p>地图平移开始时触发</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "moveend",
            "description": "<p>地图移动结束后触发</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "dragstart",
            "description": "<p>开始拖拽地图时触发</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseover",
            "description": "<p>鼠标移入地图容器内时触发</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseout",
            "description": "<p>鼠标移出地图容器时触发</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mousemove",
            "description": "<p>鼠标在地图上移动时触发</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "dragging",
            "description": "<p>拖拽地图过程中触发</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "dragend",
            "description": "<p>停止拖拽地图时触发</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "rightclick",
            "description": "<p>右键单击地图时触发此事件</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "resize",
            "description": "<p>地图容器大小改变事件</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "zoomstart",
            "description": "<p>地图缩放开始时触发</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "zoomend",
            "description": "<p>地图缩放停止时触发</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.BaseMap.api",
    "groupTitle": "Map"
  },
  {
    "type": "POST GET",
    "url": "/function",
    "title": "方法",
    "group": "Map",
    "name": "function",
    "version": "0.1.0",
    "description": "<p>可使用的map对象方法</p>",
    "examples": [
      {
        "title": "示例",
        "content": "//返回地图当前缩放级别\nKingMap.getZoom();\n//将视图切换到指定的缩放等级，中心点坐标不变\nKingMap.setZoom(zoom);\n//放大一级视图\nKingMap.zoomIn();",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getZoom",
            "description": "<p>返回地图当前缩放级别，范围[3,19]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "setZoom",
            "description": "<p>将视图切换到指定的缩放等级，中心点坐标不变，参数：缩放等级，范围[3,19]</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "zoomIn",
            "description": "<p>放大一级视图</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "zoomOut",
            "description": "<p>缩小一级视图</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getCenter",
            "description": "<p>获取地图中心点经纬度坐标值，返回KingMap.Point对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Point",
            "optional": false,
            "field": "setCenter",
            "description": "<p>设置地图中心点 参数：KingMap.Point对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Point,Number",
            "optional": false,
            "field": "centerAndZoom",
            "description": "<p>设初始化地图,参数1：KingMap.Point对象,参数2：地图级别</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "addOverlay",
            "description": "<p>将覆盖物添加到地图中，参数Array中的对象：KingMap封装的覆盖物对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "removeOverlay",
            "description": "<p>从地图中移除覆盖物，参数Array中的对象：KingMap封装的覆盖物对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "clearOverlays",
            "description": "<p>清除地图上所有覆盖物</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOverlays",
            "description": "<p>返回地图上的所有覆盖物，返回Array<Overlay>，</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "setMapStyle",
            "description": "<p>设置地图样式，参数：地图样式名。如：'normal'。不同地图API有差异。\\nBMap:默认地图样式(normal),清新蓝风格(light),黑夜风格(dark),详见http://lbsyun.baidu.com/custom/list.htm\\nAMap:默认地图样式(normal)，还有'dark','darkblue'等不同，具体详见http://lbs.amap.com/api/javascript-api/guide/map/map-style/</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "addEventListener",
            "description": "<p>事件绑定\\n参数1：事件名；参数2：事件功能函数，详细参见事件列表</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "removeEventListener",
            "description": "<p>事件解绑\\n参数1：事件名；参数2：事件功能函数,详细参见事件列表</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getMap",
            "description": "<p>获取原生地图api对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getApiType",
            "description": "<p>获取地图类型，返回地图类型，百度地图类型：&quot;BMap&quot;；高德地图类型：&quot;AMap&quot;；</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOptions",
            "description": "<p>获取初始化时的配置参数</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.BaseMap.api",
    "groupTitle": "Map"
  },
  {
    "type": "POST GET",
    "url": "/describe",
    "title": "描述",
    "group": "MapsEvent",
    "name": "describe",
    "version": "0.1.0",
    "description": "<p>此对象用于表示地图、覆盖物、叠加层上的各种鼠标事件返回，包含以下字段：</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>事件类型，如click。</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "target",
            "description": "<p>发生事件的目标对象，百度或高德的原生对象。</p>"
          },
          {
            "group": "Parameter",
            "type": "Point",
            "optional": false,
            "field": "point",
            "description": "<p>发生事件时光标所在处的经纬度坐标，KingMap.Point类</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "pixel",
            "description": "<p>发生事件时光标所在处的像素坐标，数组[666,666]</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.MapsEvent.api",
    "groupTitle": "MapsEvent"
  },
  {
    "type": "POST GET",
    "url": "/construction",
    "title": "构造器",
    "group": "Marker",
    "name": "construction",
    "version": "0.1.0",
    "examples": [
      {
        "title": "调用示例",
        "content": "var KingMarker = new KingMap.Marker(map,{\n    lng : 113.330914,\n    lat : 23.128659\n});",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "map",
            "description": "<p>必须,经过封装的KingMap对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "options",
            "description": "<p>覆盖物渲染的配置参数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.lng",
            "description": "<p>可选，标注的经度，默认为BaseMap的中心点经度</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.lat",
            "description": "<p>可选，标注的纬度，默认为BaseMap的中心点纬度</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.offsetX",
            "description": "<p>可选，标注的横向偏移度，默认为0</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.offsetY",
            "description": "<p>可选，标注的纵向偏移度，默认为0</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "options.enableMassClear",
            "description": "<p>可选，标注是否可被清除，默认可被清除</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "options.enableDragging",
            "description": "<p>可选，标注是否可拖拽，默认可拖拽</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "options.enableClicking",
            "description": "<p>可选，标注是否可点击，默认可点击</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "options.raiseOnDrag",
            "description": "<p>可选，拖拽标注时，标注是否开启离开地图表面效果</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "options.draggingCursor",
            "description": "<p>可选，拖拽标注时的鼠标指针样式，默认标准样式auto</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.rotation",
            "description": "<p>可选，旋转角度，默认0度</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "options.shadow",
            "description": "<p>可选，阴影图标，默认无</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "options.title",
            "description": "<p>可选，鼠标移到marker上的显示内容，默认为无</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Marker.api",
    "groupTitle": "Marker"
  },
  {
    "type": "POST GET",
    "url": "/describe",
    "title": "描述",
    "group": "Marker",
    "name": "describe",
    "version": "0.1.0",
    "description": "<p>基础地图点标记构造方法，实现对百度地图和高德地图相关方法的封装</p>",
    "examples": [
      {
        "title": "示例",
        "content": "//构造示例\nvar KingMarker = new KingMap.Marker(map,{...});\n//方法调用\nKingMarker.getMarker();\n//事件绑定\nKingMarker.addEventListener(event,FunctionName);",
        "type": "js"
      }
    ],
    "filename": "doc/KingMap.Marker.api",
    "groupTitle": "Marker"
  },
  {
    "type": "POST GET",
    "url": "/event",
    "title": "事件",
    "group": "Marker",
    "name": "event",
    "version": "0.1.0",
    "description": "<p>marker覆盖物的触发事件。 参数MapsEvent参考MapsEvent对象规范说明部分</p>",
    "examples": [
      {
        "title": "调用示例",
        "content": "var Function = function(MapsEvent){\n    console.log(MapsEvent.target);\n    console.log(MapsEvent.point);\n    ....\n}\nKingMarker.addEventListener('dblclick',Function);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "click",
            "description": "<p>点击点标记图标后会触发此事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "dblclick",
            "description": "<p>双击点标记图标后会触发此事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mousedown",
            "description": "<p>鼠标在点标记上按下时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseup",
            "description": "<p>鼠标在点标记上按下后抬起时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "dragstart",
            "description": "<p>开始拖拽点标记时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseover",
            "description": "<p>鼠标移近点标记时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseout",
            "description": "<p>鼠标离开点标记时触发此事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "dragging",
            "description": "<p>鼠标拖拽移动点标记时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "dragend",
            "description": "<p>点标记拖拽移动结束触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "rightclick",
            "description": "<p>鼠标右键单击事件</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Marker.api",
    "groupTitle": "Marker"
  },
  {
    "type": "POST GET",
    "url": "/function",
    "title": "方法",
    "group": "Marker",
    "name": "function",
    "version": "0.1.0",
    "description": "<p>marker覆盖物使用的方法</p>",
    "examples": [
      {
        "title": "示例",
        "content": "//设置标注所用的图标对象\nKingMarker.setIcon(new XMap.Icon());\n//获取标注所用的图标对象\nKingMarker.getIcon();\n//设置标注的地理坐标，(Number,Number);\nKingMarker.setPosition(positonX,positonY);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Icon",
            "optional": false,
            "field": "setIcon",
            "description": "<p>设置标注所用的图标对象\\n参数：KingMap.Icon对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getIcon",
            "description": "<p>获取标注所用的图标对象，返回KingMap.Icon对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Point",
            "optional": false,
            "field": "setPosition",
            "description": "<p>设置标注的地理坐标\\n参数：KingMap.Point对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getPosition",
            "description": "<p>获取标注的地理坐标，返回KingMap.Point对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "setAngle",
            "description": "<p>设置标注的旋转角度，参数：角度数值，范围[0,360]</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getAngle",
            "description": "<p>获得标注的旋转角度，返回角度，范围[0,360]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "setZIndex",
            "description": "<p>设置标注的堆叠顺序，参数：覆盖物堆叠等级负数为远离屏幕，正数为靠近屏幕</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "setDraggable",
            "description": "<p>启用标注拖拽功能</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "closeDraggable",
            "description": "<p>关闭拖拽功能</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Array",
            "optional": false,
            "field": "setLabel",
            "description": "<p>设置标注的文本标签内容\\n参数1：标签的文本，例：“这是个栗子”；参数2：标签偏离原点的坐标值，例：[10,10]</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getLabel",
            "description": "<p>获取标注的文本标签内容，返回KingMap.Label对象</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "setTitle",
            "description": "<p>设置鼠标滑过标注时的文字提示，参数：提示的内容，例：“这是个栗子”</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getTitle",
            "description": "<p>获取鼠标滑过标注时的文字提示，返回提示的内容</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "setTop",
            "description": "<p>设置或者取消标注置顶，\\n参数： 地图上有多个marker时，当参数为true时，marker将显示在最前面；当参数为false时，marker取消置顶</p>"
          },
          {
            "group": "Parameter",
            "type": "Icon",
            "optional": false,
            "field": "setShadow",
            "description": "<p>设置标注阴影效果\\n参数：KingMap.Icon对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getShadow",
            "description": "<p>获取标注阴影效果，返回KingMap.Icon对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Number,Number",
            "optional": false,
            "field": "setOffset",
            "description": "<p>设置标注的偏移量<br>\\n参数1：偏移的横坐标，例：20；参数2：偏移的纵坐标，例：20</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOffset",
            "description": "<p>获取标注的偏移量，返回偏移坐标数组，[x,y]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "setAnimation",
            "description": "<p>设置动画效果\\n参数：'none'为无动画效果；'drop'为点标掉落效果；'jump'为点标弹跳效果</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "addEventListener",
            "description": "<p>事件绑定\\n参数1：事件名；参数2：事件功能函数</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "removeEventListener",
            "description": "<p>事件解绑\\n参数1：事件名；参数2：事件功能函数</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOverlay",
            "description": "<p>获取原生对象，返回原生点标注对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOptions",
            "description": "<p>获取初始化时的配置参数</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getApiType",
            "description": "<p>获取地图覆盖物类型，高德地图类型：&quot;AMap&quot;；百度地图类型：&quot;BMap&quot;</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Marker.api",
    "groupTitle": "Marker"
  },
  {
    "type": "POST GET",
    "url": "/construction",
    "title": "构造器",
    "group": "Point",
    "name": "construction",
    "version": "0.1.0",
    "examples": [
      {
        "title": "调用示例",
        "content": "var KingPoint = new KingMap.Point(10,10);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lng",
            "description": "<p>必选，点坐标的经度，例：113.1111</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lat",
            "description": "<p>必选，点坐标的纬度，例：23.11111</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Point.api",
    "groupTitle": "Point"
  },
  {
    "type": "POST GET",
    "url": "/describe",
    "title": "描述",
    "group": "Point",
    "name": "describe",
    "version": "0.1.0",
    "description": "<p>基础坐标构造方法，实现地图基础坐标点对象的封装</p>",
    "examples": [
      {
        "title": "示例",
        "content": "//构造示例\nvar KingPoint = new KingMap.Point(10,10);\n//方法调用\nKingPoint.getLng();",
        "type": "js"
      }
    ],
    "filename": "doc/KingMap.Point.api",
    "groupTitle": "Point"
  },
  {
    "type": "POST GET",
    "url": "/function",
    "title": "方法",
    "group": "Point",
    "name": "function",
    "version": "0.1.0",
    "description": "<p>point的方法</p>",
    "examples": [
      {
        "title": "示例",
        "content": "//设置标注所用的图标对象\nKingPoint.getLng();",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getLng",
            "description": "<p>获取坐标经度，返回经度数值（Number）</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getLat",
            "description": "<p>获取坐标纬度，返回纬度数值（Number）</p>"
          },
          {
            "group": "Parameter",
            "type": "Point",
            "optional": false,
            "field": "equals",
            "description": "<p>比较输入坐标和当前坐标是否一致，参数：KingMap.Point对象。返回值为Boolean</p>"
          },
          {
            "group": "Parameter",
            "type": "apiType",
            "optional": false,
            "field": "getPoint",
            "description": "<p>返回原生的Point（BMap）或者LngLat（AMap）对象</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Point.api",
    "groupTitle": "Point"
  },
  {
    "type": "POST GET",
    "url": "/construction",
    "title": "构造器",
    "name": "construction",
    "group": "Polygon",
    "version": "0.1.0",
    "examples": [
      {
        "title": "调用示例",
        "content": "var bmapOptions = {\n\tid: \"allmap\",\n\tapiType: \"BMap\",\n\tzoom: 15,\n\tlng: '113.551694',\n\tlat: '22.365569'\n};\n\nvar map = new KingMap.Map(bmapOptions).getMap();\n\nvar polygonStr = [[111.885739, 21.71276],[111.874241, 21.749289]];\nvar options = {\n\tpolygon: polygonStr\n};\n\n//构造KingMap.Polygon实例\nvar kpPolygon = new KingMap.Polygon(map, options);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "map",
            "description": "<p>必须,经过封装的KingMap对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "options",
            "description": "<p>覆盖物渲染的参数定义对象：</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "options.apiType",
            "description": "<p>必须，地图类型\\n百度地图类型：&quot;BMap&quot;；高德地图类型：&quot;AMap&quot;；</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "options.polygon",
            "description": "<p>必须，数组格式的多边形覆盖物的边界经纬度。\\n例：[[111.885739, 21.71276],[111.874241, 21.749289]]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "options.strokeColor",
            "description": "<p>可选，线颜色,默认值：'#FF33FF'</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.strokeOpacity",
            "description": "<p>可选，线透明度，默认值：0.2</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.strokeWeight",
            "description": "<p>可选，线宽，默认值：3</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "options.fillColor",
            "description": "<p>可选，填充色，默认值：'#1791fc'</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.fillOpacity",
            "description": "<p>可选，填充透明度，默认值：0.35</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Polygon.api",
    "groupTitle": "Polygon"
  },
  {
    "type": "none",
    "url": "/describe",
    "title": "描述",
    "name": "describe",
    "group": "Polygon",
    "version": "0.1.0",
    "description": "<p>基于高德和百度地图的Polygon多边形覆盖物的KingMap.Polygon对象<br></p>",
    "examples": [
      {
        "title": "示例",
        "content": "var bmapOptions = {\n\tid: \"allmap\",\n\tapiType: \"BMap\",\n\tzoom: 15,\n\tlng: '113.551694',\n\tlat: '22.365569'\n};\n\nvar map = new KingMap.Map(bmapOptions).getMap();\n\nvar polygonStr = [[111.885739, 21.71276],[111.874241, 21.749289]];\nvar options = {\n\tpolygon: polygonStr\n};\n\n//构造KingMap.Polygon实例\nvar kpPolygon = new KingMap.Polygon(map, options);",
        "type": "js"
      }
    ],
    "filename": "doc/KingMap.Polygon.api",
    "groupTitle": "Polygon"
  },
  {
    "type": "POST GET",
    "url": "/event",
    "title": "事件",
    "group": "Polygon",
    "name": "event",
    "version": "0.1.0",
    "description": "<p>Polygon覆盖物的触发事件。 参数MapsEvent参考MapsEvent对象规范说明部分，none表示此事件没有参数</p>",
    "examples": [
      {
        "title": "调用示例",
        "content": "var Function = function(MapsEvent){\n    console.log(MapsEvent.target);\n    console.log(MapsEvent.point);\n    ....\n}\nkpPolygon.addEventListener('dblclick',Function);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "click",
            "description": "<p>点击多边形图标后会触发此事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "dblclick",
            "description": "<p>双击多边形图标后会触发此事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mousedown",
            "description": "<p>鼠标在多边形上按下时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseup",
            "description": "<p>鼠标在多边形上按下后抬起时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseover",
            "description": "<p>鼠标移近多边形时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseout",
            "description": "<p>鼠标离开多边形时触发此事件</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Polygon.api",
    "groupTitle": "Polygon"
  },
  {
    "type": "POST GET",
    "url": "/function",
    "title": "方法",
    "name": "function",
    "group": "Polygon",
    "version": "0.1.0",
    "description": "<p>可使用的方法</p>",
    "examples": [
      {
        "title": "示例",
        "content": "var polygonStr = [[111.885739, 21.71276],[111.874241, 21.749289]];\nkpPolygon1.setPath(polygonStr);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "setPath",
            "description": "<p>多边形覆盖物重新设置边界经纬度\\n参数：边界节点数组，例：[[111.885739, 21.71276],[111.874241, 21.749289]]</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getPath",
            "description": "<p>获取多边形覆盖物对象的边界经纬度,返回为经纬度点数组\\n例：[[111.885739, 21.71276],[111.874241, 21.749289]]</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "hide",
            "description": "<p>覆盖物隐藏</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "show",
            "description": "<p>覆盖物显示</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "remove",
            "description": "<p>覆盖物移除</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getMap",
            "description": "<p>获取覆盖物图层所在的地图对象，返回原生对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getBounds",
            "description": "<p>获取覆盖物的地理区域范围，返回KingMap.Bounds对象</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "addEventListener",
            "description": "<p>覆盖物事件绑定\\n参数1：事件名；参数2：事件功能函数</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "removeEventListener",
            "description": "<p>覆盖物事件绑定移除\\n参数1：事件名；参数2：事件功能函数</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOverlay",
            "description": "<p>获取原生对象，返回原生多边形覆盖物对象</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOptions",
            "description": "<p>获取初始化时的配置参数</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getApiType",
            "description": "<p>获取地图覆盖物类型，高德地图类型：&quot;AMap&quot;；百度地图类型：&quot;BMap&quot;</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Polygon.api",
    "groupTitle": "Polygon"
  },
  {
    "type": "POST GET",
    "url": "/construction",
    "title": "构造器",
    "name": "construction",
    "version": "0.1.0",
    "group": "Polyline",
    "examples": [
      {
        "title": "调用示例",
        "content": "kpPolyline = new KingMap.Polyline(polylineArray);\nkpPolyline.getPolyline();",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "map",
            "description": "<p>必须,经过封装的KingMap对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "options",
            "description": "<p>初始化数据</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "options.strokeColor",
            "description": "<p>可选，折线颜色，例：&quot;black&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.strokeWeight",
            "description": "<p>可选，折线粗细，例：5</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "options.strokeOpacity",
            "description": "<p>可选，折线透明度，例：0.5</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "options.path",
            "description": "<p>必须，参数：折线点数组，例子：\\n[[111.885739, 21.71276],[111.874241, 21.749289]]</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Polyline.api",
    "groupTitle": "Polyline"
  },
  {
    "type": "POST GET",
    "url": "/describe",
    "title": "描述",
    "name": "describe",
    "version": "0.1.0",
    "description": "<p>创建一个折线覆盖物实例<br></p>",
    "group": "Polyline",
    "examples": [
      {
        "title": "示例",
        "content": "//构造示例\nkpPolyline=new  KingMap.Polyline(map,options);\n\n//方法调用\nkpPolyline.delete();",
        "type": "js"
      }
    ],
    "filename": "doc/KingMap.Polyline.api",
    "groupTitle": "Polyline"
  },
  {
    "type": "POST GET",
    "url": "/event",
    "title": "事件",
    "group": "Polyline",
    "name": "event",
    "version": "0.1.0",
    "description": "<p>Polyline覆盖物的触发事件。 参数MapsEvent参考MapsEvent对象规范说明部分，none表示此事件没有参数</p>",
    "examples": [
      {
        "title": "调用示例",
        "content": "var Function = function(MapsEvent){\n    console.log(MapsEvent.target);\n    console.log(MapsEvent.point);\n    ....\n}\nkpPolyline.addEventListener('dblclick',Function);",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "click",
            "description": "<p>点击折线后会触发此事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "dblclick",
            "description": "<p>双击折线后会触发此事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mousedown",
            "description": "<p>鼠标在折线上按下时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseup",
            "description": "<p>鼠标在折线上按下后抬起时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseover",
            "description": "<p>鼠标移近折线时触发事件</p>"
          },
          {
            "group": "Parameter",
            "type": "MapsEvent",
            "optional": false,
            "field": "mouseout",
            "description": "<p>鼠标离开折线时触发此事件</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Polyline.api",
    "groupTitle": "Polyline"
  },
  {
    "type": "POST GET",
    "url": "/function",
    "title": "方法",
    "name": "function",
    "version": "0.1.0",
    "description": "<p>可使用的方法</p>",
    "group": "Polyline",
    "examples": [
      {
        "title": "示例",
        "content": "kpPolyline.delete();\nvar polyline = kpPolyline.getPolyline();",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "delete",
            "description": "<p>删除折线覆盖物,</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOverlay",
            "description": "<p>获取原生对象，返回原生折线覆盖物对象</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "setPath",
            "description": "<p>设置折线覆盖物的点数组，参数：pointArray，折线覆盖物的点数组，\\n例：[[111.885739, 21.71276],[111.874241, 21.749289]]</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getPath",
            "description": "<p>获取折线覆盖物的点数组，返回Path数组，\\n例：[[111.885739, 21.71276],[111.874241, 21.749289]]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "setColor",
            "description": "<p>设置折线覆盖物的颜色，参数：折线覆盖物的颜色\\n例：&quot;black&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getColor",
            "description": "<p>获取折线覆盖物的颜色，返回颜色代码，例：'#1791fc'</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "setOpacity",
            "description": "<p>设置折线覆盖物的透明度,参数：折线覆盖物的透明度，例：&quot;0.5&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOpacity",
            "description": "<p>获取折线覆盖物的透明度，返回覆盖物透明度，例：&quot;0.5&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "setWeight",
            "description": "<p>设置折线覆盖物的宽度，参数：折线覆盖物的宽度，例：&quot;5&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getWeight",
            "description": "<p>获取折线覆盖物的宽度,返回覆盖物宽度，例：&quot;5&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "addEventListener",
            "description": "<p>事件绑定\\n参数1：事件名；参数2：事件功能函数</p>"
          },
          {
            "group": "Parameter",
            "type": "String,Function",
            "optional": false,
            "field": "removeEventListener",
            "description": "<p>事件解绑\\n参数1：事件名；参数2：事件功能函数</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getOptions",
            "description": "<p>获取初始化时的配置参数</p>"
          },
          {
            "group": "Parameter",
            "type": "none",
            "optional": false,
            "field": "getApiType",
            "description": "<p>获取地图覆盖物类型，高德地图类型：&quot;AMap&quot;；百度地图类型：&quot;BMap&quot;</p>"
          }
        ]
      }
    },
    "filename": "doc/KingMap.Polyline.api",
    "groupTitle": "Polyline"
  }
] });
