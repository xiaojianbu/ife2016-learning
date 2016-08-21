/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
 
 var chartData = {
  "北京": {
      day: {
        "2016-01-01": 10,
        "2016-01-02": 10,
        "2016-01-03": 10,
        "2016-01-04": 10
      },
      week: {
        1:10
      },
      month: {janAverage:10}
 }
}    
 
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};


// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

//柱状图颜色
function chartColor (aqi) {
  if (aqi > 400) {
    return "black";
  } else if (aqi >= 300 && aqi < 400) {
    return "purple";
  } else if (aqi >= 200 && aqi < 300) {
    return "red";
  } else if (aqi >= 100 && aqi < 200) {
    return "blue";
  } else if (aqi < 100) {
    return "green";
  }
}

//绘制以时间为粒度的柱状图
function drawDay (day) {
  var aqiChartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];
  empty(aqiChartWrap);//删除table的所有子节点 
  var days = Object.keys(day);

  for (var i = 0; i < days.length; i++) {
    var newDiv = document.createElement("div");
    newDiv.style.background = chartColor(day[days[i]]);
    newDiv.style.height = day[days[i]] + "px";
    newDiv.style.width = "10px";
    newDiv.style.marginRight = "5px";
    newDiv.title = "第" + (i+1) + "天aqi:" + day[days[i]];
    aqiChartWrap.appendChild(newDiv);
   }   
} 
//绘制以周为粒度的柱状图
function drawWeek (week) {
  var aqiChartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];
  empty(aqiChartWrap);//删除table的所有子节点 
  var weeks = Object.keys(week);
  for (var i = 0; i < weeks.length; i++) {
    var newDiv = document.createElement("div");
    newDiv.style.background = chartColor(week[weeks[i]]);
    newDiv.style.height = week[weeks[i]] + "px";
    newDiv.style.width = "50px";
    newDiv.style.marginRight = "10px";
    newDiv.title = "第" + (i+1) + "周aqi:" + week[weeks[i]];
    aqiChartWrap.appendChild(newDiv);
   }  
}

//绘制以月为粒度的柱状度
function drawMonth (month) {
  var aqiChartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];
  empty(aqiChartWrap);//删除table的所有子节点 
  var months = Object.keys(month);
  for (var i = 0; i < months.length; i++) {
    var newDiv = document.createElement("div");
    newDiv.style.background = chartColor(month[months[i]]);
    newDiv.style.height = month[months[i]] + "px";
    newDiv.style.width = "200px";
    newDiv.style.marginRight = "20px";
    newDiv.title = "第" + (i+1) + "月aqi:" + month[months[i]];
    aqiChartWrap.appendChild(newDiv);
   }
}
//确定柱状图以什么为粒度
function dayWeekMonth (city) {
  if (pageState.nowGraTime == "day") {
    drawDay(city.day);    
  } else if (pageState.nowGraTime == "week") {
    drawWeek(city.week);
  } else if (pageState.nowGraTime == "month") {
    drawMonth(city.month);
  } 
}

/**
 * 渲染图表
 */
function renderChart(pageState) {
  switch (pageState.nowSelectCity) {
    case 0:
      break;
    case 1:
    dayWeekMonth(chartData[citys[0]]);
      break;
    case 2:
    dayWeekMonth(chartData[citys[1]]);
      break;
    case 3:
    dayWeekMonth(chartData[citys[2]]);
      break;
    case 4:
    dayWeekMonth(chartData[citys[3]]);
      break;
    case 5:
    dayWeekMonth(chartData[citys[4]]);
      break;
    case 6:
    dayWeekMonth(chartData[citys[5]]);
      break;
    case 7:
    dayWeekMonth(chartData[citys[6]]);
      break;
    case 8:
    dayWeekMonth(chartData[citys[7]]);
      break;  
    case 9:
    dayWeekMonth(chartData[citys[8]]);
      break;  
    default:
      break;
  }  
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  // 设置对应数据
  // 调用图表渲染函数
    for (var i = 0; i < graTime.length; i++) {
    if (graTime[i].checked) {
      if (graTime[i].value != pageState.nowGraTime) {
        pageState.nowGraTime = graTime[i].value;
        renderChart(pageState);
        break;
      }
    }
  } 
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  // 设置对应数据
  if (pageState.nowSelectCity != this.options.selectedIndex) {
    pageState.nowSelectCity = this.options.selectedIndex;
  }
  // 调用图表渲染函数
  renderChart(pageState);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
var graTime = document.getElementsByName("gra-time");
function initGraTimeForm () {
  for (var i = 0; i < graTime.length; i++) {
    graTime[i].onclick = graTimeChange;
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
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById("city-select");
  empty(citySelect);//删除table的所有子节点
  var newOption = document.createElement("option");
  var newText = document.createTextNode("选择城市");
  newOption.appendChild(newText);
  citySelect.appendChild(newOption);              
  for (var i = 0; i < citys.length; i++) {
    var newOption = document.createElement("option");
    var newText = document.createTextNode(citys[i]);
    newOption.appendChild(newText);
    citySelect.appendChild(newOption);
  }
// 给select设置事件，当选项发生变化时调用函数citySelectChange 
citySelect.onchange = citySelectChange;
}

var citys = Object.keys(aqiSourceData);
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for (var i = 0; i < citys.length; i++) {
    chartData[citys[i]] = {
      day: {},
      week: {},
      month: {}
    }
  }
  //日
  for (var i = 0; i < citys.length; i++) {
    chartData[citys[i]].day = aqiSourceData[citys[i]];
  }
//周
for (var i = 0; i < citys.length; i++) {
  var weekSum = 0;
  var weekDays = 0;
  var weeks = 1;
  var days = Object.keys(chartData[citys[i]].day);
  for (var j = 0; j < days.length; j++) {
    var day = new Date(days[j]);
    if (day.getDay() == 0) {
      weekDays += 1;
      weekSum += chartData[citys[i]].day[days[j]];
      chartData[citys[i]].week[weeks] = Math.round(weekSum / weekDays);
      weeks++;
      weekDays = 0;
      weekSum = 0;
      continue;
    }
    weekDays += 1;
    weekSum += chartData[citys[i]].day[days[j]];
  }
  //保证最后一周若不满也能算一周
  if (weekSum!=0) {
    weeks++;
    chartData[citys[i]].week[weeks] = Math.round(weekSum / weekDays);
  }
}


//月
for (var i = 0; i < citys.length; i++) {
  var janAqiSum = 0;
  var febAqiSum = 0;
  var marAqiSum = 0;
  var janDays = 0;
  var febDays = 0;
  var marDays = 0;
  var days = Object.keys(chartData[citys[i]].day);
  for (var j = 0; j < days.length; j++) {
    var date = new Date(days[j]);
    var month = date.getMonth() + 1;
    switch (month) {
      case 1:
        janDays += 1;
        janAqiSum += chartData[citys[i]].day[days[j]];
        break;
      case 2:
        febDays += 1;
        febAqiSum += chartData[citys[i]].day[days[j]];
        break;
      case 3:
        marDays += 1;
        marAqiSum += chartData[citys[i]].day[days[j]];
        break;
      default:
        break;
    }
  }
  chartData[citys[i]].month.janAverage = Math.round(janAqiSum / janDays);
  chartData[citys[i]].month.febAverage = Math.round(febAqiSum / febDays);
  chartData[citys[i]].month.marAverage = Math.round(marAqiSum / marDays);
}
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();