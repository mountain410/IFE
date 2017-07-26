// ！！！注意 引用此文件时，确保 task.css 文件pop和mask的position

//定义一个id选择器方法
function $(elem_id){
  if (elem_id.indexOf('#') === 0){
    return document.getElementById(elem_id.substring(1))
  }
}
var popup =  $("#popup");
var popup2 = $("#popup2");
var mask = $('#mask');
var deltaX,deltaY;
var scrollable = false;

// 通过全局事件委托，绑定点击事件
document.addEventListener("click",function(e){
  switch(e.target.id) {
    // 点击第一个浮层按钮，显示浮层1
    case "try" :
      popShow(popup,mask);
      break;
    // 点击第二个浮层按钮，显示浮层2
    case "try2" :
      popShow(popup2,mask);
      break;
    // 当点击蒙层、确定和取消按钮时，关闭浮层
    case "mask" :
    case "pop1-conf" :
    case "pop1-canc" :
    case "pop2-canc" :
    case "pop2-conf" :
      popHidden();
      break;

    // 第二个浮层里面的改变宽高的按钮
    case "pop2-change" :
      var popWidth = $("#pop-w").value;
      var popHeight = $("#pop-h").value;
      if (popWidth >= 300 && popWidth<=800 && popHeight>=300 && popHeight<=600) {
        // 获取输入框的值，更改浮层的宽高
        popup2.style.width = $("#pop-w").value + "px";
        popup2.style.height = $("#pop-h").value + "px";

        // 这两句是为了让浮层在浏览器窗口居中显示
        popup2.style.top = (window.innerHeight - popup2.offsetHeight) / 2 + "px";
        popup2.style.left = (window.innerWidth - popup2.offsetWidth) / 2 + "px";
      }
      break;
   } 
},false)

// 取消表单默认提交事件
$("#popup2").addEventListener("submit",function(e){
  e.preventDefault();
})

//禁用鼠标滚轮的按钮绑定点击事件
$("#disable-scroll").addEventListener("click",function(e){
  scrollable = !scrollable;
  var txtScroll = scrollable === true ? "现在弹出后可以滚动，点击后禁用" : "现在弹出后禁用滚动，点击后开启";
  e.target.innerHTML = txtScroll;
})

// 绑定鼠标点中事件，点中浮层标题栏，移动浮层
$("#popup-top").addEventListener("mousedown", function(e){
  deltaX = popup.offsetLeft - e.clientX;
  deltaY = popup.offsetTop - e.clientY;

  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", cancelMove);
})

// 浮层移动函数
function mouseMove(e){
  popup.style.left = e.clientX + deltaX + "px";//向左边移就是减去变化的X值！往右边则相反
  popup.style.top = e.clientY + deltaY + "px";//向上边移就是减去变化的Y值！往下边则相反
}

// 鼠标松开方法
function cancelMove(){
  document.removeEventListener("mousemove",mouseMove)
  document.removeEventListener("mouseup",cancelMove)
}

// 鼠标滚轮失效函数
function preventScroll(e){
  e.preventDefault();
}

// 显示浮层函数
function popShow(pop,mask){
  mask.style.display = "block";//这一句的顺序很关键，执行完 offsetHeight 刚好有值
  pop.style.display = "block";//offsetHeight为0，因为元素没有加载完，display还是none

  // 这两句是为了让浮层在浏览器窗口居中显示
  pop.style.top = (window.innerHeight - pop.offsetHeight) / 2 + "px";
  pop.style.left = (window.innerWidth - pop.offsetWidth) / 2 + "px";

  // 如果scrollable为false则绑定鼠标滚轮事件
  if(!scrollable) document.addEventListener("wheel", preventScroll)
}

// 关闭浮层函数
function popHidden() {
  popup.style.display = "none";
  popup2.style.display = "none";
  mask.style.display = "none";
  document.removeEventListener("wheel",preventScroll)
}