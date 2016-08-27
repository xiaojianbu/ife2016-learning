// 得到文本节点的值，在进行去空字符处理
// console.log(document.getElementsByClassName("container-1")[1].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, ''));
var root = document.getElementsByClassName("container")[0];
var btn1 = document.getElementsByTagName("button")[0];
var btn2 = document.getElementsByTagName("button")[1];
var btn3 = document.getElementsByTagName("button")[2];
var btn4 = document.getElementsByTagName("button")[3];
var divList = [];
var timer = null;
btn1.addEventListener("click", traverseDF, false); //深度遍历
btn2.addEventListener("click", traverseBF, false); //广度遍历
btn3.addEventListener("click", traverseDFSearch, false); //深度搜索
btn4.addEventListener("click", traverseBFSearch, false); //广度搜索
function traverseDF() {
    reset();
    // var inputValue = document.getElementsByTagName("input")[0].value;
    inputValue = null;
    (function recurse(currentNode) {
        // if (!(currentNode == null)) {
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            recurse(currentNode.children[i]);
            divList.push(currentNode.children[i]);
            // console.log(currentNode.children[i]);
            // } 
        }
        divList.push(currentNode);
    })(root);
    changeBcgColor();
}

function traverseBF() {
    reset();
    // var inputValue = document.getElementsByTagName("input")[0].value;
    inputValue = null;
    (function function_name(argument) {
        var queue = [];
        queue.push(root);
        // console.log(queue);
        divList.push(root);
        var currentTree = queue.shift();
        // console.log(queue);
        // console.log(currentTree);
        while (currentTree) {
            for (var i = 0, length = currentTree.children.length; i < length; i++) {
                queue.push(currentTree.children[i]);
                divList.push(currentTree.children[i]);
            }
            currentTree = queue.shift();
        }
    })();
    changeBcgColor();
}

function traverseDFSearch() {
    reset();
    var inputValue = document.getElementsByTagName("input")[0].value;
    (function recurse(currentNode) {
        // if (!(currentNode == null)) {
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            recurse(currentNode.children[i]);
            divList.push(currentNode.children[i]);
            // console.log(currentNode.children[i]);
            // } 
        }
        divList.push(currentNode);
    })(root);
    search(inputValue);
}

function traverseBFSearch() {
    reset();
    var inputValue = document.getElementsByTagName("input")[0].value;
    (function function_name(argument) {
        var queue = [];
        queue.push(root);
        // console.log(queue);
        divList.push(root);
        var currentTree = queue.shift();
        // console.log(queue);
        // console.log(currentTree);
        while (currentTree) {
            for (var i = 0, length = currentTree.children.length; i < length; i++) {
                queue.push(currentTree.children[i]);
                divList.push(currentTree.children[i]);
            }
            currentTree = queue.shift();
        }
    })();
    search(inputValue);
}
//初始化
function reset() {
    divList = [];
    clearInterval(timer);
    var divs = document.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = '#fff';
    }
}
//改变背景颜色
function changeBcgColor() {
    var i = 0;
    divList[i].style.backgroundColor = "blue";
    timer = setInterval(function() {
        i++;
        if (i < divList.length) {
            divList[i - 1].style.backgroundColor = "#fff";
            divList[i].style.backgroundColor = "blue";
        } else {
            clearInterval(timer);
            divList[divList.length - 1].style.backgroundColor = "#fff";
        }
    }, 500);
}
function search(value) {
    var i = 0;
    divList[i].style.backgroundColor = "blue";
    if (value === divList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, '')) {
        divList[i].style.backgroundColor = "red";
        return;
    }
    timer = setInterval(function() {
        i++;
        if (i < divList.length) {
            divList[i - 1].style.backgroundColor = "#fff";
            divList[i].style.backgroundColor = "blue";
            if (value === divList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, '')) {
                divList[i].style.backgroundColor = "red";
                document.getElementsByTagName("input")[0].value = "";
                clearInterval(timer);
            }
        } else {
            clearInterval(timer);
            divList[divList.length - 1].style.backgroundColor = "#fff";
            alert("没有该元素");
        }
    }, 500);
}