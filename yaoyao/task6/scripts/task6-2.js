//定义一个id选择器方法
var task6 = {};

var main = function(){
  // 私有方法
  function $(elem_id){
    if (elem_id.indexOf('#') === 0){
      return document.getElementById(elem_id.substring(1))
    }
  }
  // 下面都是私有变量
  var popup =  $("#popup");
  var popup2 = $("#popup2");
  var mask = $('#mask');
  var title = $("#popup-top");
  var scrollable = false;

  // 通过全局事件委托，绑定点击事件

  function initial(){
    task6.setPopup(popup,mask);
    task6.setPopup(popup2,mask);
    task6.setDragable(popup,title);
    
    document.addEventListener("click",function(e){
      switch(e.target.id) {
        // 点击第一个浮层按钮，显示浮层1
        case "try" :
          task6.popShow(popup,mask,scrollable);
          break;
        // 点击第二个浮层按钮，显示浮层2
        case "try2" :
          task6.popShow(popup2,mask,scrollable);
          break;
        // 当点击蒙层、确定和取消按钮时，关闭浮层
        case "mask" :
        case "pop1-conf" :
        case "pop1-canc" :
        case "pop2-canc" :
        case "pop2-conf" :
          task6.popHidden(popup,mask);
          task6.popHidden(popup2,mask);
          break;

        // 第二个浮层里面的改变宽高的按钮
        case "pop2-change" :
          var popWidth = $("#pop-w").value;
          var popHeight = $("#pop-h").value;
          if (popWidth >= 300 && popWidth<=800 && popHeight>=300 && popHeight<=600) {
            // 获取输入框的值，更改浮层的宽高
            popup2.style.width = popWidth + "px";
            popup2.style.height = popWidth + "px";

            // 这两句是为了让浮层在浏览器窗口居中显示
            popup2.style.top = (window.innerHeight - popup2.offsetHeight) / 2 + "px";
            popup2.style.left = (window.innerWidth - popup2.offsetWidth) / 2 + "px";
          }
          break;
      }
    },false)
  }

  //禁用鼠标滚轮的按钮绑定点击事件
  $("#disable-scroll").addEventListener("click",function(e){
    scrollable = !scrollable;
    var txtScroll = scrollable === true ? "现在弹出后可以滚动，点击后禁用" : "现在弹出后禁用滚动，点击后开启";
    e.target.innerHTML = txtScroll;
  })

  // 取消表单默认提交事件
  $("#popup2").addEventListener("submit",function(e){
    e.preventDefault();
  },false)

  return {
    initial : initial
  };
}();

(function(interface){
  
  interface.setPopup = setPopup;
  interface.setDragable = setDragable;
  interface.popShow = popShow;
  interface.popHidden = popHidden;

  // 设置浮层函数
  function setPopup(popup,mask){
    var maskStyle = mask.style;
    maskStyle.position = "fixed";
    maskStyle.left = "0";
    maskStyle.top = "0";
    maskStyle.right = "0";
    maskStyle.bottom = "0";
    popup.style.position = "absolute";
  }

  // 显示浮层函数
  function popShow(popup,mask,scrollable){
    mask.style.display = "block";//这一句的顺序很关键，执行完 offsetHeight 刚好有值
    popup.style.display = "block";//offsetHeight为0，因为元素没有加载完，display还是none

    // 这两句是为了让浮层在浏览器窗口居中显示
    popup.style.top = (window.innerHeight - popup.offsetHeight) / 2 + "px";
    popup.style.left = (window.innerWidth - popup.offsetWidth) / 2 + "px";

    // 如果scrollable为false则绑定鼠标滚轮事件
    if(!scrollable) document.addEventListener("wheel", preventScroll)
  }

  // 关闭浮层函数
  function popHidden(popup,mask,) {
    popup.style.display = "none";
    mask.style.display = "none";
    document.removeEventListener("wheel",preventScroll)
  }

  // 设置可拖动
  function setDragable(popup,trigger){
    var deltaX,deltaY;
    // 绑定鼠标点中事件，点中浮层标题栏，移动浮层
    trigger.addEventListener("mousedown",mouseDown)

    // 点击浮层标题函数
    function mouseDown(e){
      deltaX = popup.offsetLeft - e.clientX;//随着鼠标拖拽移动的横坐标变化
      deltaY = popup.offsetTop - e.clientY;//随着鼠标拖拽移动的纵坐标变化

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }

    // 浮层移动函数
    function mouseMove(e){
      popup.style.left = e.clientX + deltaX + "px";//向左边移就是减去变化的X值！往右边则相反
      popup.style.top = e.clientY + deltaY + "px";//向上边移就是减去变化的Y值！往下边则相反
    }

    // 鼠标松开方法
    function mouseUp(){
      document.removeEventListener("mousemove",mouseMove);
      document.removeEventListener("mouseup",mouseUp);
    }
  }

  // 鼠标滚轮失效函数
  function preventScroll(e){
    e.preventDefault();
  }

})(task6);

main.initial();