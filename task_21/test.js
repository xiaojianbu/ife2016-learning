var tagInput = document.getElementById("tag-input");
var tagContainer = document.getElementById("tag-container");
var re = /,|，|\s$/;
tagInput.addEventListener("keyup", function (ev) {
	var val = this.value;
	 if (13 === ev.keyCode || re.test(val)) {
	 	val = trim(val.replace(re, ""));
	 	console.log(val);
	 	if (!!val) {
	 		var tagList = tagContainer.childNodes;
	 		//无tag直接添加
	 		if (tagList.length == 0) {		 			
	 			tagContainer.appendChild(createNewChild(val, " tag-queue"));
	 			// this.value = "";
	 		} else {
	 			if (!isrepeat(val,tagList)) {
	 				if (numberIsTen (tagList)) {
	 					tagContainer.removeChild(tagContainer.firstChild);
	 					tagContainer.appendChild(createNewChild(val, " tag-queue"));
	 				} else {
	 					tagContainer.appendChild(createNewChild(val, " tag-queue"));
	 				}
	 			}
	 		}
	 	}
	 	this.value = "";
	 }  
}, false);

tagContainer.addEventListener("click", function (ev) {
	  	var tagQueue = document.getElementsByClassName("tag-queue");
	    var ev = ev || window.event;  
	    target = ev.target || ev.srcElement;   
	    for (var i = 0; i < tagQueue.length; i++) {   
	        if (tagQueue[i] === target) {   
	        	tagContainer.removeChild(tagContainer.childNodes[i]);
	        }   
	    }  
}, false);






//创建新的带有className的子元素
function createNewChild (val, className) {
	var newDiv = document.createElement("div");
	var newText = document.createTextNode(val);
	newDiv.appendChild(newText);
	newDiv.className += className;
	return newDiv; 
}

//判断是否有10个
function numberIsTen (list) {
	if (list.length == 10) {
		return true;
	}
	return false;
}
//判断是否有重复
function isrepeat (val,list) {
	// var flag = 0;//flag为零时，不重复
	for (var i = 0; i < list.length; i++) {
		if (list[i].innerHTML == val) {
			return true;
		}
	}	
	return false;  
}
//去掉空字符
function trim(str) {
    // attetion to condition test
    var start = 0,
        end = str.length - 1
    while (start < end && str[start] === ' ')
        start++
    while (start < end && str[end] === ' ')
        end--
    return str.substring(start, end + 1)
}