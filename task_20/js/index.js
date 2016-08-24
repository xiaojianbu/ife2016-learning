var numInput = document.getElementById("num-input");
var leftIn = document.getElementById("left-in");
var rightIn = document.getElementById("right-in");
var leftOut = document.getElementById("left-out");
var rightOut = document.getElementById("right-out");
var container = document.getElementById("container");
var inquire = document.getElementById("inquire");

function leftInFun () {
	var re = /[^0-9a-zA-Z\u4E00-\u9FA5]/; 
	var inList = numInput.value.split(re);
	for (var i = 0; i < inList.length; i++) {
		if (inList[i].length == 0) {
			inList.splice(i,1);
		}
	}
	for (var i = 0; i < inList.length; i++) {
		var newChild = document.createElement("div");
		var newText = document.createTextNode(inList[i]);
		newChild.appendChild(newText);
		newChild.className += " queue";
		//container有子节点则添加到第一个子节点的前面，否则添加为第一个子节点
		if (container.hasChildNodes()) {
			container.childNodes[0].parentNode.insertBefore(newChild,container.firstChild);
		} else {
			container.appendChild(newChild);
		} 
	}
}

function rightInFun () {
	var re = /[^0-9a-zA-Z\u4E00-\u9FA5]/; 
	var inList = numInput.value.split(re);
	for (var i = 0; i < inList.length; i++) {
		if (inList[i].length == 0) {
			inList.splice(i,1);
		}
	}
	for (var i = 0; i < inList.length; i++) {
		var newChild = document.createElement("div");
		var newText = document.createTextNode(inList[i]);
		newChild.appendChild(newText);
		newChild.className += " queue";
		//把新节点添加到container最后面
		container.appendChild(newChild);
	}	
}

function leftOutFun () {
	//container有子节点则移除第一个子节点，否则弹出提示框表明没有子节点
	if (container.hasChildNodes()) {
		var oldChild = container.removeChild(container.firstChild);
		alert("移除的元素中数值是：" + oldChild.innerHTML);
	} else {
		alert("队列是空的");
	}
}

function rightOutFun () {
	//container有子节点则移除最后一个子节点，否则弹出提示框表明没有子节点
	if (container.hasChildNodes()) {
		var oldChild = container.removeChild(container.childNodes[container.childNodes.length - 1]);
		alert("移除的元素中数值是：" + oldChild.innerHTML);
	} else {
		alert("队列是空的");
	}
}

function queueDel () {
	// 给container中的所有子节点绑定删除事件
	container.onclick = function (ev) {   
		var queue = document.getElementsByClassName("queue");
	    var ev = ev || window.event;  
	    target = ev.target || ev.srcElement;   
	    for (var i = 0; i < queue.length; i++) {   
	        if (queue[i] === target) {   
	           var oldChild = container.removeChild(container.childNodes[i]);
	           alert("移除的元素中数值是：" + oldChild.innerHTML);
	        }   
	    }   
	}  
}

function inquireFun () {
	//每次先复原
	for (var i = 0; i < container.childNodes.length; i++) {
		if (container.childNodes[i].innerHTML.search(re) != -1) {
			container.childNodes[i].className = "queue";
		}
	}
	//查询到时 添加类color
	var inquireInputValue = document.getElementsByTagName("input")[0].value;
	var re = new RegExp(inquireInputValue);
	for (var i = 0; i < container.childNodes.length; i++) {
		if (container.childNodes[i].innerHTML.search(re) != -1) {
			container.childNodes[i].className += " color";
		}
	}
}





function init () {
	leftIn.addEventListener("click", leftInFun, false);
	rightIn.addEventListener("click", rightInFun, false);
	leftOut.addEventListener("click", leftOutFun, false);
	rightOut.addEventListener("click", rightOutFun, false);
	container.addEventListener("click", queueDel, false);
	inquire.addEventListener("click", inquireFun, false);
}

init();
