 function myFlowUtil(){};
 myFlowUtil.getLine=function(obj1,obj2){
        
  var bb1 = obj1.getBBox(), 
        bb2 = obj2.getBBox(),
        p = [ {
            x : bb1.x + bb1.width / 2,
            y : bb1.y - 1
        }, {
            x : bb1.x + bb1.width / 2,
            y : bb1.y + bb1.height + 1
        }, {
            x : bb1.x - 1,
            y : bb1.y + bb1.height / 2
        }, {
            x : bb1.x + bb1.width + 1,
            y : bb1.y + bb1.height / 2
        }, {
            x : bb2.x + bb2.width / 2,
            y : bb2.y - 1
        }, {
            x : bb2.x + bb2.width / 2,
            y : bb2.y + bb2.height + 1
        }, {
            x : bb2.x - 1,
            y : bb2.y + bb2.height / 2
        }, {
            x : bb2.x + bb2.width + 1,
            y : bb2.y + bb2.height / 2
        } ], 
        d = {}, 
        dis = [];
     
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x), dy = Math.abs(p[i].y
                    - p[j].y);
            if ((i == j - 4)
                    || (((i != 3 && j != 6) || p[i].x < p[j].x)
                    && ((i != 2 && j != 7) || p[i].x > p[j].x)
                    && ((i != 0 && j != 5) || p[i].y > p[j].y) 
                    && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [ i, j ];
            }
        }
    }
    if (dis.length == 0) {
        var res = [ 0, 4 ];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x, y1 = p[res[0]].y, x4 = p[res[1]].x, y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [ x1, x1, x1 - dx, x1 + dx ][res[0]].toFixed(3), y2 = [
            y1 - dy, y1 + dy, y1, y1 ][res[0]].toFixed(3), x3 = [ 0, 0,
            0, 0, x4, x4, x4 - dx, x4 + dx ][res[1]].toFixed(3), y3 = [
            0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4 ][res[1]].toFixed(3);
    var path = [ "M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3,
            y3, x4.toFixed(3), y4.toFixed(3)].join(" ");
    
    return path;
  } 
  myFlowUtil.factory = function(type,r, x, y, data) {
  if (!window[type]) {
  return
  }
  var component = new window[type](r, x, y, data);
  return component;
};

//var common = new  Interface("common",["drag","move"])；
var Interface = function(name, methods) { 
    if(arguments.length != 2) { 
        throw new Error("Interface constructor expects 2 arguments, but exactly provided for " + arguments.length + " arguments."); 
    } 
    this.name = name; 
    this.methods = []; 
    for(var i = 0;i < methods.length; i++) { 
        if(typeof methods[i] != "string") { 
            throw new Error("Interface constructor expects to pass a string method name."); 
    } 
    this.methods.push(methods[i]); 
    } 
} 
//static class method 
Interface.ensureImplements = function(instance) { 
    if(arguments.length < 2) { 
        throw new Error("Function Interface.ensureImplements expects at least 2 arguments, but exactly passed for " + arguments.length + " arguments."); 
    } 
    for(var i = 1, len = arguments.length; i < len; i++) { 
        var interface = arguments[i]; 
        if(interface.constructor != Interface) { 
            throw new Error("Function Interface.ensureImplements expects at least 2 arguments to be instances of Interface."); 
    } 
    for(var j = 0, mLen = interface.methods.length; j < mLen; j++) { 
        var method = interface.methods[j]; 
            if(!instance[method] ) { 
                throw new Error("Function Interface.ensureImplements: object doesn't implements " + interface.name + ". Method " + method + " wasn't found."); 
            } 
        } 
    } 
};