var numInput = document.getElementById("num-input");
var leftIn = document.getElementById("left-in");
var rightIn = document.getElementById("right-in");
var leftOut = document.getElementById("left-out");
var rightOut = document.getElementById("right-out");
var container = document.getElementById("container");
var randomNum = document.getElementById("random-num");
var sortNum = document.getElementById("sort-num");
var emptyNum = document.getElementById("empty");

// 返回一个介于min和max之间的整型随机数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//清除父元素下的所有元素
function empty () {
	 while (container.firstChild) {
	 	container.removeChild(container.firstChild);
	 }
}


//随机产生30个数添加到container中
function randomNumFun () {
	empty();
	while (container.childNodes.length < 30) {
		var num = getRandomInt(10, 100);
		var newChild = document.createElement("div");
		newChild.className += " queue";
		newChild.style.height = num + "px";
		//把新节点添加到container最后面
		container.appendChild(newChild);
	}
		 
}

function sortNumFun () {
 	// var numList = container.childNodes;
 	// var len = numList.length;
 	// var temp;
 	// for (var i = 0; i < len; i++) {
 	// 	for (var j = 0; j < len - 1; j++) {
 	// 		if (parseInt(numList[j].style.height, 10) > parseInt(numList[j+1].style.height, 10)){
 	// 			temp = numList[j].style.height;
 	// 			numList[j].style.height = numList[j+1].style.height;
 	// 			numList[j+1].style.height = temp;
 	// 		}
 	// 	}
 	// }
 	var numList = container.childNodes;
 	var len = numList.length,
			i = 0,
			j = 0,
			temp,
			clear = null;
		clear = setInterval(run,15);

		function run() {
			if(i < len ){
				if(j < len - i -1) {
					if (parseInt(numList[j].style.height, 10) > parseInt(numList[j+1].style.height, 10)) {
						temp = numList[j].style.height;
 	 					numList[j].style.height = numList[j+1].style.height;
 	 					numList[j+1].style.height = temp;
					}
					j++;
					return; 
				} else {
					j = 0;
				}
				i++;
			} else {
				clearInterval(clear);
			}

		}
}




function leftInFun () {
	var num = parseInt(numInput.value);
	if((!isNaN(num)) && (num >= 10) && (num <= 100)){
		var newChild = document.createElement("div");
		newChild.className += " queue";
		newChild.style.height = num + "px";
		//container有子节点则添加到第一个子节点的前面，否则添加为第一个子节点
		if (container.hasChildNodes()) {
			if (container.childNodes.length < 60) {
				container.childNodes[0].parentNode.insertBefore(newChild,container.firstChild);
			} else {
				alert("队列元素数量最多限制为60个");
			}		
		} else {
			container.appendChild(newChild);
		}
	} else {
		alert("请输入10-100的数字");
	}  
}

function rightInFun () {
	var num = parseInt(numInput.value);
	if((!isNaN(num)) && (num >= 10) && (num <= 100)){
		var newChild = document.createElement("div");
		newChild.className += " queue";
		newChild.style.height = num + "px";
		//把新节点添加到container最后面
		if (container.childNodes.length < 60) {
			container.appendChild(newChild);
		} else {
			alert("队列元素数量最多限制为60个");
		}					
	} else {
		alert("请输入10-100的数字");
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



function init () {
	leftIn.addEventListener("click", leftInFun, false);
	rightIn.addEventListener("click", rightInFun, false);
	leftOut.addEventListener("click", leftOutFun, false);
	rightOut.addEventListener("click", rightOutFun, false);
	randomNum.addEventListener("click", randomNumFun, false);
	sortNum.addEventListener("click", sortNumFun, false);
	emptyNum.addEventListener("click", empty, false);
	container.addEventListener("click", queueDel, false);
}

init();
