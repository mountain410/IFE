var data = new Array();
var dataList = '';
var timer;
var op = document.getElementById('op');
var btns = op.getElementsByTagName('button');
var input = document.getElementById('input');
var content = document.getElementById('content');

//队列（栈）插入
btns[0].onclick = function(){
	if (numCheck()) {
		data.unshift(input.value);
		render(data);
	}
	input.value = '';
	input.focus();
}
btns[1].onclick = function(){
	if (numCheck()) {
		data.push(input.value);
		render(data);
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
		render(data);
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
		render(data);
	} 
}

//用事件委托实现点击数列本身，删除自己
content.addEventListener("click",function(e){
	var index = e.target.id.substr(4);
	content.removeChild(e.target);
	data.splice(index,1);
},false)

//可视化排序绑定点击事件
var bubble = document.getElementById('btn-bubble');
var insert = document.getElementById('btn-insertion');
var select = document.getElementById('btn-selection');

bubble.onclick = function(){
	reset();
	viewSort(bubbleSort,bubbleData);
}
insert.onclick = function(){
	reset();
	viewSort(insertionSort,insertData);
}
select.onclick = function(){
	reset();
	viewSort(selectionSort,selectionData);
}

//重置按钮
var resetBtn = document.getElementById('btn-reset');
resetBtn.onclick = reset();
function reset(){
	if (timer) {
		clearInterval(timer)
	}
	render(data);
}

//非可视化直接排序
var binaryInsert = document.getElementById('btn-binaryInsert');
var quick = document.getElementById('btn-quick');
var btn_merge = document.getElementById('btn-merge');

binaryInsert.onclick = function(){
	var arr = data.slice(0);
	binaryInsertionSort(arr);
	render(arr);
}
quick.onclick = function(){
	var arr = data.slice(0);
	render(quickSort(arr));
}
btn_merge.onclick = function(){
	var arr = data.slice(0);
	render(mergeSort(arr));
}

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
function render(dataArray){
	content.innerHTML = '';
	for (var i = 0; i < dataArray.length; i++) {
		var li = document.createElement('li');
		li.id = "item" + i ;
		li.style.height = dataArray[i]*2 + "px";
		li.innerHTML = dataArray[i];
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
				/*
				 数组是引用类型不能直接赋值，需要复制一个。也可以写成这样：
				 bubbleData.push(JSON.parse(JSON.stringify(arr)))
				*/
				bubbleData.push(arr.slice(0));		
			}
		}
	}
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
		selectionData.push(arr.slice(0));
	}
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
			insertData.push(arr.slice(0));
		}
		arr[j+1] = key;
		insertData.push(arr.slice(0));
	}
}

//二分插入排序
function binaryInsertionSort(arr) {
  for (var i = 1; i < arr.length; i++) {
      var key = arr[i], left = 0, right = i - 1;
      while (left <= right) {
          var middle = parseInt((left + right) / 2);
          if (key < arr[middle]) {
              right = middle - 1;
          } else {
              left = middle + 1;
          }
      }
      for (var j = i - 1; j >= left; j--) {
          arr[j + 1] = arr[j];
      }
      arr[left] = key;
  }
  return arr;
}

//快速排序（非in place）
function quickSort(arr){
	if (arr.length <= 1) {return arr;}
	var pivotIndex = Math.floor(arr.length / 2);
	var pivot = arr.splice(pivotIndex,1)[0];
	var left = [];
	var right = [];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		}else{
			right.push(arr[i]);
		}
	}
	return quickSort(left).concat([pivot],quickSort(right));
}

//归并排序
function mergeSort(arr) {  //采用自上而下的递归方法
  if(arr.length <= 1) {
    return arr;
  }
  var middle = Math.floor(arr.length / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right){
  var result = [];
  while (left.length>0 && right.length>0) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length){
  	result.push(left.shift());
  }
  while (right.length){
  	result.push(right.shift());
  }
  return result;
}

//可视化显示排序
function viewSort(sortAlgorithm,sortArray){
	var arr = data.slice(0); //复制数组data
	sortAlgorithm(arr);
	timer = setInterval(function(){
		if (sortArray.length > 0) {
			render(sortArray.shift());
		}else{
			clearInterval(timer);
		}
	},500)
}