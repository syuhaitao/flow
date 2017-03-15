;
var timeoutID=null;

function Component_Circle(r,x,y,data){
  
   this.Cricle=r.image("images/circle.svg", x, y, 60, 60);
   this.Cricle.drag();
}
function Component_Ellipse(r,x,y,data){

   this.ellipse=r.image("images/ellipse.svg", x, y, 60, 60);
   this.ellipse.drag();
}
function Component_Triangle(r,x,y,data){

   this.Triangle=r.image("images/三角形_triangle23.svg", x, y, 60, 60);
   this.Triangle.drag();
}
function Component_Square(r,x,y,data){

   this.Triangle=r.image("images/广场_square80.svg", x, y, 60, 60);
   this.Triangle.drag();
}
function Component_Rect(r,x,y,data){

   this.Triangle=r.image("images/矩形_rectangular47.svg", x, y, 60, 60);
   this.Triangle.drag();
}

function Component_Rhomb(r,x,y,data){

   this.Triangle=r.image("images/菱形_rhomb.svg", x, y, 60, 60);
   this.Triangle.drag();
}

function Component_Pentagon(r,x,y,data){

   this.Triangle=r.image("images/五角大厦_pentagon1.svg", x, y, 60, 60);
   this.Triangle.drag();
}
function Component_Hexagon(r,x,y,data){

   this.Triangle=r.image("images/六角_hexagon7.svg", x, y, 60, 60);
   this.Triangle.drag();
}
function Component_Octagon(r,x,y,data){

   this.Triangle=r.image("images/八角形_octagon.svg", x, y, 60, 60);
   this.Triangle.drag();
}
function Component_Cube(r,x,y,data){

   this.Triangle=r.image("images/立方体_cube12.svg", x, y, 60, 60);
   this.Triangle.drag();
}
function Component_Cylinarical(r,x,y,data){

   this.Triangle=r.image("images/圆柱_cylindrical7.svg", x, y, 60, 60);
   this.Triangle.drag();
}
function Component_Cone(r,x,y,data){

   this.Triangle=r.image("锥_cone4.svg", x, y, 60, 60);
   this.Triangle.drag();
}



function Component_Start (r, x, y, data){

	 // $.each(data, function() {
			 //alert(this.id);
	 //});
	
     var rect=r.rect(x, y,40, 40, 10).attr({fill:"brown", stroke:"#666"});
     var text=r.text(x,y+20,"开始");
     text.attr("id",text.id);
     var g3=r.g(rect,text);
     g3.attr("x",x);
     g3.attr("y",y);
     g3.attr("data","开始");
     g3.attr("id",g3.id);
     g3.attr("type","Component_Start");

     //拖拽
    g3.drag(); 
    function start(){
		this.xx = this.attr("x");
		this.yy = this.attr("y");
		
	}
	function move(dx,dy){
	
		var attr = {x: parseInt(this.xx) + parseInt(dx), y: parseInt(this.yy) + parseInt(dy)};

	    rect.attr(attr);
		var attr2 = {x2: parseInt(this.xx) + parseInt(dx), y2: parseInt(this.yy) + parseInt(dy)};
		var attr3 = {x1: parseInt(this.xx) + parseInt(dx), y1: parseInt(this.yy) + parseInt(dy)};
		
        var ids=this.id;
		var  set = r.selectAll("line");
	    set.forEach(function(element, index) {
			if(element.attr("to")==ids){
	           element.attr(attr2);
			}else if(element.attr("from")==ids){

			 element.attr(attr3);
		     }
		});	
       
	}

	function up(){
		
	}
	 this.Rect1 =g3;
	
    
    this.Rect1.dblclick(function(event){
    	
        clearTimeout(timeoutID);
        if($("#line").attr("note")=='true'){
        	if(lineTemp.length==0){
        		
        		lineTemp.push(this);

        	}
            else if(0<lineTemp.length<2){
            	alert(lineTemp.length);
            	if(lineTemp[0].attr("id")!=this.id){
            	   lineTemp.push(this);
            	   //r.line(lineTemp[0].attr("x"),lineTemp[0].attr("y"),lineTemp[1].attr("x"),lineTemp[1].attr("y"))
            	   //.attr({fill:"red", stroke:"#666","from":lineTemp[0].attr("id"),"to":lineTemp[1].attr("id")});;
            	   myFlowUtil.factory("Commponent_Line",r,lineTemp[0].attr("id"),lineTemp[1].attr("id"),"");
                lineTemp=[];
            	}else{
            		alert("不能同一个连接点连接");
            	}
            }
            
        }  	
    })
   
	//单击组件右侧显示属性
	this.Rect1.click(function(event){
		 	
         timeoutID= window.setTimeout(function(){
         
          },300);
	   event.stopPropagation();   	
       var props = [   
	  {   
	    "id":this.id,   
	    "x": this.attr("x"), 
	    "y": this.attr("y"),
	    "from":"rect1",
	    "to":"rect2",
	    "name":text.attr("text") 
	  }

	];   
	   
	var html = '';   
	//属性div渲染
	$.each(props, function() {   
	  html += '<table >';   
	  html += '<tr style="display:inline"><label>编号:</label><input type="text" readonly="readonly"  value="'+this.id+'"/></tr></br>';   
	  html += '<tr style="display:inline"><label>x  轴:</label><input type="text" readonly="readonly" value="'+this.x+'"/></tr></br>';
	  html += '<tr style="display:inline"><label>y  轴:</label><input type="text"  readonly="readonly"value="'+this.y+'"/></tr></br>';   
	  html += '<tr style="display:inline"><label>from:</label><input id="'+this.id+'_From" readonly="readonly"  value="'+this.from+'" /></tr></br>';   
	  html += '<tr style="display:inline"><label>to  :</label><input id="'+this.id+'_To"   readonly="readonly"  value="'+this.to+'" /></tr></br>';
	  html += '<tr style="display:inline"><label>名称:</label><input id="'+this.id+'_Name"   value="'+this.name+'" /></tr></br>';  
	  html += '<tr style="display:inline"><a href="#" id="'+this.id+'_SP">高级配置</a></tr></br>';  
	  html += '<tr style="display:inline"><input type="button" id="'+this.id+'_OK" value="确定" />    <input id="'+this.id+'_DEL" type="button" name="lname" value="删除" /></tr>';         
	  html += '</table>';   
	});   
	   
	$('#propBody').html(html);
	

	//点击确定按钮修改属性
	$("#"+this.id+"_OK").click(function(){
       var textVal=$("#"+g3.id+"_Name").val();
      // //alert();
	   $("#"+text.id).text(textVal);
	 });

	//点击删除按钮删除组件
	$("#"+this.id+"_DEL").click(function(){     
	   
	    g3.remove();

	 });
	$("#"+this.id+"_SP").click(function (){
		alert("高级配置界面！！！");
	})
  });
};

function Component_End(r, x,y,data){
   this.x="123";
}
Component_End.draw=function (){

	alert(this.x);
}

/** 
 * 定义一个类User,js中使用构造函数实现 
 */  
Component_End = function(r, x,y,data){  
    //定义属性  
    this.r = r;  
    this.x = x;  
    this.y = y;  
    this.data=data;
 }  
  
// js通过prototype动态为类添加方法  
Component_End.prototype.draw = function(){  
     rect = this.r.rect(this.x, this.y, 80, 40, 10).attr({fill:"green", stroke:"#777",title:"结束",opacity:1})
    
     rect.attr("data",JSON.stringify(eval(this.data)));
     rect.attr("id",rect.id);
     rect.attr("type","COMMENT_END");
     rect.drag();

};  


function Component_Ends(r, x,y,data){
	 	  
	 rect = r.rect(x, y, 80, 40, 10).attr({fill:"green", stroke:"#777",title:"结束",opacity:1,"x":x,"y":y,"data":JSON.stringify(eval(data)),"id":rect.id,"type":"COMMENT_END"});
    
	 rect.drag(move,start,up); 
    function start(){
		this.xx = this.attr("x");
		this.yy = this.attr("y");
		
	}
	function move(dx,dy){
		var attr = {x: parseInt(this.xx) + parseInt(dx), y: parseInt(this.yy) + parseInt(dy)};
		this.attr(attr);
	
		var attr2 = {x2: parseInt(this.xx)+40+ parseInt(dx), y2: parseInt(this.yy) +20+ parseInt(dy)};
		var attr3 = {x1: parseInt(this.xx) +40+ parseInt(dx), y1: parseInt(this.yy)+20+ parseInt(dy)};
		
        var ids=this.id;
		var  set = r.selectAll("path");
	    set.forEach(function(element, index) {
			if(element.attr("to")==ids&&element.attr("type")=="line"){
                element.attr("d",myFlowUtil.getLine(document.getElementById(element.attr("from")),document.getElementById(ids)));
	           //element.attr(attr2);
			}else if(element.attr("from")==ids&&element.attr("type")=="line"){
				 element.attr("d",myFlowUtil.getLine(document.getElementById(ids),document.getElementById(element.attr("to"))));
			 //element.attr(attr3);
		     }
		});	

	}
	function up(){
		
	}
    this.Rectangle=rect;
    this.Rectangle.dblclick(function (){

    	 if($("#line").attr("note")=='true'){
        	if(lineTemp.length==0){
        		lineTemp.push(this);
        	}
            else if(0<lineTemp.length<2){
            	
            	if(lineTemp[0].attr("id")!=this.id){
            	   lineTemp.push(this);
            	   //r.line(lineTemp[0].attr("x"),lineTemp[0].attr("y"),lineTemp[1].attr("x"),lineTemp[1].attr("y"))
            	  // .attr({fill:"red", stroke:"#666","from":lineTemp[0].attr("id"),"to":lineTemp[1].attr("id")});
            	   myFlowUtil.factory("Commponent_Line",r,lineTemp[0].attr("id"),lineTemp[1].attr("id"),data.tools);
               
                lineTemp=[];
            	}else{
            		alert("不能同一个连接点连接");
            	}
            }       
        }  	
    })
	//单击组件右侧显示属性
	this.Rectangle.click(function(){

		timeoutID= window.setTimeout(function(){
          },300);
       var entries = [   
	  {   
	    "id":this.id,   
	    "x": this.attr("x"), 
	    "y": this.attr("y"),
	   
	    "name":"结束"  
	  }
	];   
	
	var html = '';   
	//属性div渲染
	$.each(entries, function() {   
	  html += '<table >';   
	  html += '<tr style="display:inline"><label>编号:</label><input  type="text"  value="'+this.id+'"/></tr></br>';   
	  html += '<tr style="display:inline"><label>x  轴:</label><input type="text"  value="'+this.x+'"/></tr></br>';
	  html += '<tr style="display:inline"><label>y  轴:</label><input type="text"  value="'+this.y+'"/></tr></br>';   
	
	  html += '<tr style="display:inline"><label>名称:</label><input id="'+this.id+'_Name"   value="'+this.name+'" /></tr></br>';  
	  html += '<tr style="display:inline"><a href="#" id="'+this.id+'_SP">高级配置</a></tr></br>';  
	  html += '<tr style="display:inline"><input type="button" id="'+this.id+'_OK" value="确定" />    <input id="'+this.id+'_DEL" type="button" name="lname" value="删除" /></tr>';         
	  html += '</table>';   
	});   
	   
	$('#propBody').html(html);
   })	 
};

function Commponent_Line(r,from,to,data){
    //alert(lineTemp[0].attr("x"));
    var paths=myFlowUtil.getLine(lineTemp[0],lineTemp[1]);
   // var line=r.line(parseInt(lineTemp[0].attr("x"))+40,parseInt(lineTemp[0].attr("y"))+20,parseInt(lineTemp[1].attr("x"))+40,parseInt(lineTemp[1].attr("y"))+20)
   // alert(path);
   // alert(paths);
     var line=r.path(paths)
     .attr({stroke : "black",
                fill : "none",
				"stroke-width": "2px",
				//"stroke-dasharray":6,
               type:"line" ,"from":lineTemp[0].attr("id"),"to":lineTemp[1].attr("id")});
    line.attr("id",line.id);
  
    $("#"+line.id).css("marker-end","url(#arrow)");

   
    line.click(function(){

    	 var entries = [   
	  {   
	    "id":this.id, 
	    "type":"Commponent_Line", 
	    "x1": this.attr("x1"), 
	    "y1": this.attr("y1"),
	    "x2": this.attr("x2"), 
	    "y2": this.attr("y2"),
	    "path":this.attr("d"),
	    "color":this.attr("stroke"),
	    "from": this.attr("from"), 
	    "to": this.attr("to"),
	    "name":"连线"  
	  }

	];   
	
	var html = '';   
	//属性div渲染
	$.each(entries, function() {   
	  html += '<table >';   
	  html += '<tr style="display:inline"><label>编号:</label><input  type="text"  value="'+this.id+'"/></tr></br>'; 
	  html += '<tr style="display:inline"><label>类型:</label><input  type="text"  value="'+this.type+'"/></tr></br>';   
	  html += '<tr style="display:inline"><label>x1 轴:</label><input type="text"  value="'+this.x1+'"/></tr></br>';
	  html += '<tr style="display:inline"><label>y1 轴:</label><input type="text"  value="'+this.y1+'"/></tr></br>'; 
	  html += '<tr style="display:inline"><label>x2  轴:</label><input type="text"  value="'+this.x2+'"/></tr></br>';
	  html += '<tr style="display:inline"><label>y2  轴:</label><input type="text"  value="'+this.y2+'"/></tr></br>';
	  html += '<tr style="display:inline"><label>path:</label><input type="text"  value="'+this.path+'"/></tr></br>';    
	  html += '<tr style="display:inline"><label>from:</label><input type="text"  value="'+this.from+'"/></tr></br>';
	  html += '<tr style="display:inline"><label>to:</label><input type="text"  value="'+this.to+'"/></tr></br>'; 
      
      html += '<tr style="display:inline"><label>颜色:</label><input type="color" id="'+this.id+'_Color" value="'+this.color+'"/></tr></br>'; 
	
	  html += '<tr style="display:inline"><label>名称:</label><input id="'+this.id+'_Name"   value="'+this.name+'" /></tr></br>';  
	  html += '<tr style="display:inline"><a href="#" id="'+this.id+'_SP">高级配置</a></tr></br>';  
	  html += '<tr style="display:inline"><input type="button" id="'+this.id+'_OK" value="确定" /><input id="'+this.id+'_DEL" type="button" name="lname" value="删除" /></tr>';         
	  html += '</table>';   
	});   
	   
	$('#propBody').html(html);

	 //点击确定按钮修改属性
	$("#"+this.id+"_OK").click(function(){
       var textVal=$("#"+line.id+"_Color").val();
      alert(textVal);
	  line.attr("stroke",textVal);
	 });

	 //点击确定按钮修改属性
	$("#"+this.id+"_DEL").click(function(){
       var textVal=$("#"+line.id+"_Color").val();
       line.remove();
	 });

    })

   
   

}





  
