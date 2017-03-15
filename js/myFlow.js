 ;var lineTemp=[];
 (function($, window, document,undefined) {
 	var r2 =null;
	var Beautifier = function(ele, opt) {
        this.$element = ele,
        this.defaults={
		  tools:[
		  {
	       
		  }
	     ]};
        this.options = $.extend({}, this.defaults, opt)
    }
    Beautifier.prototype = { 
	    loadData:function (){
		  var  paper = Snap("#svg2");
		  
		  var data=eval(this.options);
		  $.each(data.data, function() {
              myFlowUtil.factory(this.type,paper,this.attr.x,this.attr.y,this.attr);
              
			});
//		 
          var line=false;
           //工具栏支持拖拽
		   $(".node").each(function()
			{   
				$(this).draggable({helper:"clone", scroll: false,revert: true});
			});
            //工具栏拖拽画图
			$("#myflow").droppable({
				accept:".node",
				drop:function(event,ui)
				{  					
				   myFlowUtil.factory(ui.helper.attr("type"),paper,event.clientX-220-40,event.clientY-20,"");
				  
				}
			});
      
		 //保存
		  $("#save").click(function(){

              var  sets = paper.selectAll("rect");
              sets.forEach(function(element, index) {
				  alert(element);
				});	
			      			
          });

	      //连线   	  
          $("#line").click(function(){         	
          	if(line){
                   line=false;
              $("#line").css("background-color","");
              	
	         }else{
	              line=true;
               $("#line").css("background-color","green");


              }
              $("#line").attr("note",line);
		  });
           

         
		},
	   //工具栏初始化（组件加载）
	   loadTools:function() {
			var temp='<div class="propTitle">工具栏</div>';
			var str = eval(this.options.tools);
			var group="";
		    $.each(str, function() {
	            temp+='<div class="MenuPanel">';   
	            temp+='<div class="MenuTitle">'+this.group+'</div>';    
	            temp+='<div class="MenuContent">';     
	            $.each(this.child,function(){

	               temp+='<img  title="'+this.text+'" type="'+this.id+'" class="node" src="'+this.src+'" />';  
	            })
                temp+='</div></div>';  
			   // temp+='<div class="state" id="'+this.id+'" type="'+this.type+'"  ><img src="'+this.src+'" />&nbsp;&nbsp;'+this.text+'</div>';
			});    
         	temp+='<div><input id="line" type="button" value="连线" note="false"/></div>';
			
			return $("#tool").html(temp);
	   }	
    };

    $.fn.myFlow= function(options) {
        
        var beautifier = new Beautifier(this, options);
        beautifier.loadTools();
		beautifier.loadData();

        window.mu = new nono.MutationJs();
		//取消监听
		mu.disconnect();
		//重新监听
		mu.reObserve();
		$("#svg2").on("click", function ( ev ) {
          
           ///redo
	       $("#redo").on("click", function ( ev ) {
			mu.undo();

			});

			$("#undo").on("click", function ( ev ) {
			mu.redo();
			});
	    }); 

	     $(".MenuPanel").each(function(){    
                $(this).children(".MenuContent").hide();    
            });    
                
            $(".MenuTitle").each(function(){    
                $(this).click(function(){    
                    //    $(this).parents(".MenuPanel").children(".MenuContent").toggle("slow");
                     if($(this).parents(".MenuPanel").children(".MenuContent").css("display") != "none"){    
                         $(this).parents(".MenuPanel").children(".MenuContent").slideUp();       
                     }else{    
                         $(this).parents(".MenuPanel").children(".MenuContent").slideDown();    
                     }    
                });    
                    
            });    
        return ;
    }
})(jQuery, window, document)




