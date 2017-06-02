var data = new Array();
var dataList = '';
var op = document.getElementById('op');
var btns = op.getElementsByTagName('button');
var input = document.getElementById('input');
var content = document.getElementById('content');

//队列（栈）插入
btns[0].onclick = function(){
	if (numCheck()) {
		data.unshift(input.value);
		render();
	}
	input.value = '';
	input.focus();
}
btns[1].onclick = function(){
	if (numCheck()) {
		data.push(input.value);
		render();
	}
	input.value = '';
	input.focus();
}

//队列（栈）删除
btns[2].onclick = function(){
	//先判断队列是否为空
	if(data.length < 1) {
		alert("队列（栈）为空，请输入数据！");
		input.focus();
		return false;
	}
	var conf = confirm("确定删除左侧元素" + data[0] + "?");
	if(conf) {
		data.shift();
		render();
	} 
}
btns[3].onclick = function(){
	//先判断队列是否为空
	if(data.length < 1) {
		alert("队列（栈）为空，请输入数据！");
		input.focus();
		return false;
	}
	var conf = confirm("确定删除右侧元素" + data[data.length-1] + "?");
	if(conf) {
		data.pop();
		render();
	} 
}

//用事件委托实现点击数列本身，删除自己
content.addEventListener("click",function(e){
	content.removeChild(e.target);
},false)



//检查输入框是否为空和数字
function numCheck(){
	var txt = input.value.trim();
	if (txt == '') {
		alert("输入框不能为空！");
		return false;
	}
	if (!(/^[0-9]+.?[0-9]*$/.test(txt) && txt >= 10 && txt <= 100) ) {
		alert("请输入10-100的数字！");
		return false;
	}
	if(data.length > 60) {
		alert("队列数不能超过60个！");
		return false;
	}
	return true;
}

//渲染操作后的队列
function render(){
	content.innerHTML = '';
	for (var i = 0; i < data.length; i++) {
		var li = document.createElement('li');
		li.style.height = data[i]*2 + "px";
		li.innerHTML = data[i];
		content.appendChild(li);
	}
}

//冒泡排序
var bubbleData = [];
function bubbleSort(arr){
	var len = arr.length;
	for (var i = 0; i < len-1; i++) {
		for (var j = 0; j < len-1-i; j++) {
			if (arr[j] > arr[j+1]) {
				var temp = arr[j+1];
				arr[j+1] = arr[j];
				arr[j] = temp;
			}
			bubbleData.push(arr);
		}
		bubbleData.push(arr);
	}
	bubbleData.push(arr);
	return arr;
}

//选择排序
var selectionData = [];
function selectionSort(arr){
	var len = arr.length;
	var minIndex,temp;
	for (var i = 0; i < len-1; i++) {
		minIndex = i;
		for (var j = i+1; j < len; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
			}
		}
		temp = arr[i];
		arr[i] = arr[minIndex];
		arr[minIndex] = temp;
	}
	return arr;
}

//插入排序
var insertData = [];
function insertionSort(arr){
	for (var i = 1; i < arr.length; i++) {
		var key = arr[i];
		var j = i-1;
		while (j >= 0 && arr[j] > key) {
			arr[j+1] = arr[j];
			j--;
		}
		arr[j+1] = key;
	}
	return arr;
}

