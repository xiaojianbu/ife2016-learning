/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var aqiData = {};
var cityValue;//存储符合要求的city值
var aqiValue; //存储符合要求的aqi值                                 
/* 
用途：检查输入字符串是否只由汉字、字母组成 
输入： 
value：字符串 
返回： 
如果通过验证返回true,否则返回false 
*/
function checkCity () { 
	var city = document.getElementById("aqi-city-input").value;
	city = city.replace(/\s+/g,""); //用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理
	var regu = /^[a-zA-Z \u4E00-\u9FA5]+$/; 
	var re = new RegExp(regu); 
	if (re.test(city)) { 
		cityValue = city;
		return true;
	}else{ 
		alert("请输入中英文");
		return false;
	} 
}

/* 
用途：检查输入字符串是否是整数 
输入： 
value：字符串 
返回： 
如果通过验证返回true,否则返回false 
*/
function isInteger() {
	var aqi = document.getElementById("aqi-value-input").value;
	aqi = aqi.replace(/\s+/g,""); //用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理 
	var regu = /^[0-9]+$/; 
	var re = new RegExp(regu); 
	if (re.test(aqi)) { 
		aqiValue = aqi;
		return true;
	}else{ 
		alert("请输入整数");
		return false;
	} 
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	if (checkCity() && isInteger()) {
		aqiData[cityValue] = aqiValue;
	}
}
/*
 删除所有子节点
 */
function empty (element) {
    while(element.firstChild){  
       element.removeChild(element.firstChild);  
    }   
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var aqiTable = document.getElementById("aqi-table");
	empty(aqiTable);//删除table的所有子节点
	//表头
	var Tr = document.createElement("tr");
	var Td1 = document.createElement("td");
	var Td2 = document.createElement("td");
	var Td3 = document.createElement("td");
	var txt1 = "城市";
	var txt2 = "空气质量";
	var txt3 = "操作";                                                                                                            
	var Text1 = document.createTextNode(txt1);
	var Text2 = document.createTextNode(txt2);
	var Text3 = document.createTextNode(txt3);
	Td1.appendChild(Text1);
	Td2.appendChild(Text2);
	Td3.appendChild(Text3);
	Tr.appendChild(Td1);
	Tr.appendChild(Td2);
	Tr.appendChild(Td3);
	aqiTable.appendChild(Tr);

	var arrCity = Object.keys(aqiData);//获得aqiData的全部属性名	
	for (var i = 0; i < arrCity.length; i++) {

		var newTr = document.createElement("tr");
		var newTd1 = document.createElement("td");
		var newTd2 = document.createElement("td");
		var newTd3 = document.createElement("td");
		var newBtn = document.createElement("button");
		newBtn.className += "del";//button添加一个del类
		var inCity = arrCity[i];
		var inAqi = aqiData[inCity];
		var txt4 = "删除";                                                                                                            
		var newText1 = document.createTextNode(inCity);
		var newText2 = document.createTextNode(inAqi);
		var newText3 = document.createTextNode(txt4);
		newBtn.appendChild(newText3);
		newTd1.appendChild(newText1);
		newTd2.appendChild(newText2);
		newTd3.appendChild(newBtn);
		newTr.appendChild(newTd1);
		newTr.appendChild(newTd2);
		newTr.appendChild(newTd3);
		aqiTable.appendChild(newTr);
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(evt) {
  // do sth.
  var delData = evt.parentNode.parentNode.firstChild.innerHTML;
  delete aqiData[delData];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
 	document.getElementById("add-btn").addEventListener("click", addBtnHandle, false);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	var aqiTable = document.getElementById("aqi-table"); 
	aqiTable.onclick = function (ev) {   
		var dels = document.getElementsByClassName("del");   
	    var ev = ev || window.event;  
	    target = ev.target || ev.srcElement;   
	    for (var i = 0; i < dels.length; i++) {   
	        if (dels[i] === target) {   
	            delBtnHandle(dels[i]);  
	        }   
	    }   
	}
}
init();