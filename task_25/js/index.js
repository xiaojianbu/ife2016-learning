//增加类
function addClass(obj,name){
    if(obj.className.search(name)==-1){
        if(obj.className) {
            obj.className += " "+name;
        }
        else {
            obj.className = name;
        }
    }
}
//删除类
function removeClass(obj,name){
    if(obj.className){
        var reg=new RegExp("(\\s|^)"+name+"(\\s|$)")
        obj.className=obj.className.replace(reg,"");
    } 
}
//判断是否有类
function hasClass (obj, name) {
	if (obj.className.search(name)==-1) {
		return false;
	}
	return true;
}
var ul = document.getElementsByTagName("ul")[0];
ul.addEventListener("click", function (ev) {
	var lis = document.getElementsByTagName("li");   
	ev = ev || window.event;  
	var target = ev.target || ev.srcElement;   
	for (var i = 0,length = lis.length; i < length; i++) {   
	    if (lis[i] === target) {   
            test(lis[i]);  
        }   
    } 
}, false);


var childList = [];
var testNode = null;
function test (node) {
	testNode = node;
	(function recurse(currentNode) {
        // if (!(currentNode == null)) {
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            recurse(currentNode.children[i]);
            childList.push(currentNode.children[i]);
            // console.log(currentNode.children[i]);
            // } 
        }
        childList.push(currentNode);
    })(node);
    
    for (var i = 0; i < childList.length; i++) {
    	removeClass(childList[i], " bcg-color-white");
    	removeClass(childList[i], " bcg-color-blue");
    	addClass(childList[i], " bcg-color-white");
    }
    removeClass(node, " bcg-color-blue");
    removeClass(node, " bcg-color-white");
    addClass(node, " bcg-color-blue");
	var length = node.children.length;
	if (hasClass(node, "img-1")) {
		removeClass(node, "img-1");
		addClass(node, "img-2");
		for (i = 0 ; i < length; i++) {
			// removeClass(node.children[i], "show");
			// addClass(node.children[i], "hide");
			// removeClass(node.children[i], "img-1");
			// addClass(node.children[i], "img-2");
			reset(node.children[i]);
		}
		reset(node);
	} else {
		removeClass(node, "img-2");
		addClass(node, "img-1");
		for (var j = 0; j < length; j++) {
			removeClass(node.children[j], "hide");
			addClass(node.children[j], "show");
		}
	}	 
}	
//重置
function reset (node) {
	var lis = node.getElementsByTagName("li");
	for (var i = 0, length = lis.length; i < length; i++) {
		removeClass(node, " bcg-color-red");
		removeClass(lis[i], "img-1");
		addClass(lis[i], "img-2");		
	} 
	var uls = node.getElementsByTagName("ul");
	for (i = 0, length = uls.length; i < length; i++) {
		removeClass(uls[i], "show");
		addClass(uls[i], "hide");		
	} 
}

reset(ul);

var btn1 = document.getElementsByTagName("button")[0];
var btn2 = document.getElementsByTagName("button")[1];
var btn3 = document.getElementsByTagName("button")[2];
var input = document.getElementsByTagName("input")[0];

//绑定增加事件
btn2.addEventListener("click", function() {
    var inputNodeValue = input.value;
    var newUl = document.createElement("ul");
    var newLi = document.createElement("li");
    newLi.innerHTML = inputNodeValue;
    newUl.appendChild(newLi);
    if (testNode !== null) {
        testNode.appendChild(newUl);
        removeClass(testNode, "img-1");
		addClass(testNode, "img-2");	
        reset(testNode);
        testNode = null;
    }
}, false);
//绑定删除事件
btn3.addEventListener("click", function() {
    if (testNode !== null) {
        empty(testNode);
        testNode = null;
    }
}, false);

/*
 删除自身和所有子节点
 */
function empty(element) {
    // while (element.firstChild) {
    //     element.removeChild(element.firstChild);
    // }
    element.parentNode.removeChild(element);
}

btn1.addEventListener("click", traverseDFSearch, false);
var liList = [];
var timer = 0;
//深度搜索
function traverseDFSearch() {
    reset(ul);
    var inputValue = document.getElementsByTagName("input")[0].value;
    (function recurse(currentNode) {
        // if (!(currentNode == null)) {
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            recurse(currentNode.children[i]);
            liList.push(currentNode.children[i]);
            // console.log(currentNode.children[i]);
            // } 
        }
        liList.push(currentNode);
    })(ul);
    search(inputValue);
}

//查找显示
function search(value) {
    var i = 0;
    // liList[i].style.backgroundColor = "blue";
    if (value === liList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, '')) {
        liList[i].style.backgroundColor = "red";
        return;
    }
    timer = setInterval(function() {
        i++;
        if (i < liList.length) {
           	// liList[i - 1].style.backgroundColor = "#fff";
            // liList[i].style.backgroundColor = "blue";
            if (value === liList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, '')) {
            	clearInterval(timer);
                addClass(liList[i], " bcg-color-red");
                document.getElementsByTagName("input")[0].value = "";
                alert("找到了");
            }
        } else {
            clearInterval(timer);
            liList[liList.length - 1].style.backgroundColor = "#fff";
            alert("没有该元素");
        }
    }, 500);
}
