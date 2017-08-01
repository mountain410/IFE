//定义一个id选择器方法
var task6 = {};

var main = function(){
  function $(elem_id){
    if (elem_id.indexOf('#') === 0){
      return document.getElementById(elem_id.substring(1))
    }
  }
  var popup =  $("#popup");
      popup2 = $("#popup2"),
      mask = $('#mask'),
      title = $("#popup-top"),
      scrollable = false,
      minHeight = 150,
      minWidth = 200;

  // 通过全局事件委托，绑定点击事件

  function initial(){
    task6.setPopup(popup,mask);
    task6.setPopup(popup2,mask);
    task6.setDragable(popup,title);
    task6.setResizable(popup,minHeight,minWidth)
    
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
  interface.setResizable = setResizable;
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


  /*
   *给元素添加拖拽边缘缩放的功能
   *!!!warning 需要添加该功能的元素的position必须是relative或者absolute或者fixed
   *param1 obj Element 需要添加缩放功能的元素
   *param2 minHeight Num 允许的最小高度
   *                     可无
   *param3 minWidth Num 允许的最小宽度
   *                    可无
   *return undefined
   */
  function setResizable(obj, minHeight, minWidth) {
    if (!getComputedStyle(obj).position.match(/relative|absolute|fixed/)) {
      console.warn("argument[0] of function setResizable should be a HTMLElement with relative position or absolute or fixed position");
      return;
    }
    minHeight = minHeight || 0;
    minWidth = minWidth || 0;

    //生成并添加产生事件的元素
    var top = document.createElement("div"),
        left = document.createElement("div"),
        bottom = document.createElement("div"),
        right = document.createElement("div"),
        topLeft = document.createElement("div"),
        topRight = document.createElement("div"),
        bottomLeft = document.createElement("div"),
        bottomRight = document.createElement("div"),
        fragment = document.createDocumentFragment(),//创建文档碎片节点，类似虚拟DOM

        oStyle = getComputedStyle(obj), //取得obj 元素的所有css属性 但是border属性，IE是currentStyle()方法
        posTop = "top: -" + (oStyle.borderTopWidth || 0) + "; ", 
        posRight = "right: -" + (oStyle.borderRightWidth || 0) + "; ",
        posBottom = "bottom: -" + (oStyle.borderBottomWidth || 0) + "; ", 
        posLeft = "left: -" + (oStyle.borderLeftWidth || 0) + "; ",
        
        initClientX, initClientY, //mousedown时的鼠标坐标
        initHeight, initWidth, //mousedown时obj大小
        initOffsetLeft, initOffsetTop, //mousedown时obj位置
        target; //mousedown时的鼠标点击的元素

    // 延目标框画出可伸缩箭头
    var colText = "position: absolute; margin: 0; height: 5px; border: none; ";
    var rowText = "position: absolute; margin: 0; width: 5px; border: none;";
    var angleText = "position: absolute; margin: 0; height: 5px; width: 5px; border: none;";
    top.style.cssText = posTop + posLeft + posRight + colText +"cursor: n-resize;";
    right.style.cssText = posTop + posRight + posBottom + rowText + "cursor: e-resize;";
    bottom.style.cssText = posBottom + posLeft + posRight + colText + "cursor: s-resize;";
    left.style.cssText = posTop + posLeft + posBottom + rowText + "cursor: w-resize;";
    topRight.style.cssText = posTop + posRight + angleText + "cursor: ne-resize;";
    topLeft.style.cssText = posTop + posLeft + angleText + "cursor: nw-resize;";
    bottomRight.style.cssText = posBottom + posRight + angleText + "cursor: se-resize;";
    bottomLeft.style.cssText = posBottom + posLeft + angleText + "cursor: sw-resize;";

    fragment.appendChild(top);
    fragment.appendChild(right);
    fragment.appendChild(bottom);
    fragment.appendChild(left);
    fragment.appendChild(topRight);
    fragment.appendChild(topLeft);
    fragment.appendChild(bottomRight);
    fragment.appendChild(bottomLeft);
    obj.appendChild(fragment);
    
    obj.addEventListener("mousedown", mousedown);

    //获取mousedown时的一些参数，并添加mousemove、mouseup事件
    function mousedown(e) {
      target = e.target;
      
      // 确保鼠标是点击在可伸缩边框上面
      if (target !== top && target !== right && target !== bottom && target !== left && target !== topLeft && target !== topRight && target !== bottomLeft && target !== bottomRight) {
        return;
      }
      var style = target.style;
      
      initOffsetLeft = obj.offsetLeft;
      initOffsetTop = obj.offsetTop;
      initClientX = e.clientX;
      initClientY = e.clientY;
      initHeight = Number(oStyle.height.slice(0, -2));
      initWidth = Number(oStyle.width.slice(0, -2));
      //强制转化为top、left定位，且margin: 0;
      style.margin = "0";
      style.top = initOffsetTop;
      style.left = initOffsetLeft;
      
      document.body.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);      
    }

    function mousemove(e) {
      switch (target) {
        case top:
          foo(8);
          break;
        case right:
          foo(4);
          break;
        case bottom:
          foo(2);
          break;
        case left:
          foo(1);
          break;
        case topRight:
          foo(12);
          break;
        case topLeft:
          foo(9);
          break;
        case bottomRight:
          foo(6);
          break;
        case bottomLeft:
          foo(3);
          break;
      }
      //内部调用函数，根据resize的方向 上8 左4 下2 右1，实现obj随着mousemove缩放
      function foo(num) {
        var style = obj.style,
            delta,
            height,
            width;

        /*匹配原理：L: 1--0001, B: 2--0010, R: 4--0100, T: 8--1000
                    BL: 3--0011, BR: 6--0110, TL: 1001, TR: 12--1100 
                    */
        //只有mousedoen在 top 和 left 时才需要动态更改定位中的top和left
        
        if (num & 8) {
          delta = e.clientY - initClientY;
          height = initHeight - delta;
          if (height >= minHeight) {
            style.height = height + "px";
            style.top = initOffsetTop + delta + "px";
          }
        } else if (num & 2) {
          delta = e.clientY - initClientY;
          height = initHeight + delta;
          if (height >= minHeight) {
            style.height = height + "px";
          }
        }

        if (num & 1) {
          delta = e.clientX - initClientX;
          width = initWidth - delta;
          if (width >= minWidth) {
            style.width = width + "px";
            style.left = initOffsetLeft + delta + "px";
          }
        } else if (num & 4) {
          delta = e.clientX - initClientX;
          width = initWidth + delta;
          if (width >= minWidth) {
            style.width = width + "px";
          }
        }
      }
    }

    function mouseup() {
      document.body.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    }
  }

})(task6);

main.initial();