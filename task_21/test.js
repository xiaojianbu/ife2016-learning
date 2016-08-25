var tagInput = document.getElementById("tag-input");
var tagContainer = document.getElementById("tag-container");
var re = /,|，|\s$/;
tagInput.addEventListener("keyup", function(ev) {
    var val = this.value;
    if (13 === ev.keyCode || re.test(val)) {
        val = trim(val.replace(re, ""));
        // console.log(val);
        if (!!val) {
            var tagList = tagContainer.childNodes;
            //无tag直接添加
            if (tagList.length === 0) {
                tagContainer.appendChild(createNewChild(val, " tag-queue"));
                // this.value = "";
            } else {
                if (!isrepeat(val, tagList)) {
                    if (numberIsTen(tagList)) {
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
tagContainer.addEventListener("click", function(ev) {
    var tagQueue = document.getElementsByClassName("tag-queue");
    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    for (var i = 0; i < tagQueue.length; i++) {
        if (tagQueue[i] == target) {
            tagContainer.removeChild(tagContainer.childNodes[i]);
        }
    }
}, false);
//创建新的带有className的子元素
function createNewChild(val, className) {
    var newDiv = document.createElement("div");
    var newText = document.createTextNode(val);
    newDiv.appendChild(newText);
    newDiv.className += className;
    return newDiv;
}
//判断是否有10个
function numberIsTen(list) {
    if (list.length == 10) {
        return true;
    }
    return false;
}
//判断是否有重复
function isrepeat(val, list) {
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
    while (start < end && str[start] === ' ') {
        start++;
    }

    while (start < end && str[end] === ' ') {
        end--;
    }
    return str.substring(start, end + 1)
}
var hobby = document.getElementById("hobby");
var btn = document.getElementsByTagName("button")[0];
var hobbyContainer = document.getElementById("hobby-container");
hobbyContainer.addEventListener("click", function(ev) {
    var tagQueue = document.getElementsByClassName("hobby-queue");
    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    for (var i = 0; i < tagQueue.length; i++) {
        if (tagQueue[i] === target) {
            hobbyContainer.removeChild(hobbyContainer.childNodes[i]);
        }
    }
}, false);
btn.addEventListener("click", btnFun, false);

function btnFun() {
    var re = /[^0-9a-zA-Z\u4E00-\u9FA5]/;
    var inList = hobby.value.split(re); //通过间隔分隔输入
    //去空格
    for (var i = 0; i < inList.length; i++) {
        if (inList[i].length === 0) {
            inList.splice(i, 1);
        }
    }
    //输入去重
    inList = unique(inList);
    for (i = 0; i < hobbyContainer.childNodes.length; i++) {
        for (var j = 0; j < inList.length; j++) {
            if (hobbyContainer.childNodes[i].innerHTML == inList[j]) {
                inList[j] = "";
                break;
            }
        }
    }
    //去空格
    inList = inList.filter(function(n) {
            return n;
        })
        // console.log(inList);
    if (inList.length !== 0) {
        //如果长度不大于10直接添加
        if (inList.length + hobbyContainer.childNodes.length <= 10) {
            for (i = 0; i < inList.length; i++) {
                // var newChild = document.createElement("div");
                // var newText = document.createTextNode(inList[i]);
                // newChild.appendChild(newText);
                // newChild.className += " hobby-queue";
                //把新节点添加到container最后面
                hobbyContainer.appendChild(createNewChild(inList[i], " hobby-queue"));
            }
        } else {
            for (i = 0; i < inList.length; i++) {
                // var newChild = document.createElement("div");
                // var newText = document.createTextNode(inList[i]);
                // newChild.appendChild(newText);
                // newChild.className += " hobby-queue";
                //把新节点添加到container最后面
                hobbyContainer.appendChild(createNewChild(inList[i], " hobby-queue"));
                if (hobbyContainer.childNodes.length > 10) {
                    hobbyContainer.removeChild(hobbyContainer.firstChild);
                }
            }
        }
    }
}
// 思路：获取没重复的最右一值放入新数组
function unique(array) {
    var r = [];
    for (var i = 0, l = array.length; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
            if (array[i] === array[j]) {
                j = ++i;
            }
            r.push(array[i]);
        }
    }
    return r;
}
