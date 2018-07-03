var KRTemplate={
	js:{
		before:function(apiProject, apiData){
			apiProject.order=["undefined","通用","事件","外部事件","方法","描述","构造器"];
		},
		after:function(){
			var span = $("span[name='type']");
			span.next().detach();
			span.detach();
			//将Success 200 改为返回
			var h2 = $("h2:contains(Success 200)");
			h2.text("返回");
			var table = h2.next();
			table.find("tr").each(function(i,item){
				var td = $(item).find("td:last");
				var text =td.text();
				text = text.replace(/\\n/g,'<br>');
				text = text.replace(/\t/g,'&emsp;');
				td.html(text);
			});
			
			h2 = $("h2:contains(参数)");
			var table = h2.next();
			table.find("tr").each(function(i,item){
				var td = $(item).find("td:last");
				var text =td.text();
				text = text.replace(/\\n/g,'<br>');
				text = text.replace(/\t/g,'&emsp;');
				td.html(text);
			});
		}
	},
	js2:{
		before:function(apiProject, apiData){
			//apiProject.order=["describe","construction","event","function"];
		},
		after:function(){
			KRTemplate.js.after.call(this);
			var h2 = $("h1:contains(事件)").parent().parent().find("h2:contains(参数)");
			h2.text("事件列表");
			var table = h2.next();
			var ths = table.find("th");
			$(ths[0]).text("名称");
			$(ths[1]).text("参数");
			
			h2 = $("h1:contains(方法)").parent().parent().find("h2:contains(参数)");
			h2.text("方法列表");
			var table = h2.next();
			var ths = table.find("th");
			$(ths[0]).text("名称");
			$(ths[1]).text("参数");
		}
	}
}