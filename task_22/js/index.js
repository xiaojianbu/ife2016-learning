var root = document.getElementsByClassName("container")[0];
var btn1 = document.getElementsByTagName("button")[0];
var btn2 = document.getElementsByTagName("button")[1];
var btn3 = document.getElementsByTagName("button")[2];
var divList = [];
var timer = null;
btn1.addEventListener("click", preOrder, false);//前序
btn2.addEventListener("click", inOrder, false);//中序
btn3.addEventListener("click", postOrder, false);//后序


//前序
function preOrder() {
	reset();
    preOrderTraverse(root);
    changeBcgColor();
}

function preOrderTraverse(node) {
    if (!(node === null)) {
        divList.push(node);
        preOrderTraverse(node.firstElementChild);
        preOrderTraverse(node.lastElementChild);
    }
}
//中序
function inOrder() {
	reset();
    inOrderTraverse(root);
    changeBcgColor();
}

function inOrderTraverse(node) {
    if (!(node === null)) {
        inOrderTraverse(node.firstElementChild);
        divList.push(node);
        inOrderTraverse(node.lastElementChild);
    }
}
//后序
function postOrder() {
	reset();
    postOrderTraverse(root);
    changeBcgColor();
}

function postOrderTraverse(node) {
    if (!(node === null)) {
        postOrderTraverse(node.firstElementChild);
        postOrderTraverse(node.lastElementChild);
        divList.push(node);
    }
}
//初始化
function reset () {
	divList = [];
	clearInterval(timer);
	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.backgroundColor = '#fff';
	}
}


function changeBcgColor () {
	  var i = 0;
	  divList[i].style.backgroundColor = "blue";
	  timer = setInterval(function () {
	  	 i++;
	  	 if (i < divList.length) {
	  	  	divList[i-1].style.backgroundColor= "#fff";
	  	  	divList[i].style.backgroundColor = "blue";
	  	  } else {
	  	  	clearInterval(timer);
	  	  	divList[divList.length - 1].style.backgroundColor = "#fff";
	  	  }
	  }, 500);
}