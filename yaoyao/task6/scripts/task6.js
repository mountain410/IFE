//定义一个id选择器方法
function $(elem_id){
  if (elem_id.indexOf('#') === 0){
    return document.getElementById(elem_id.substring(1))
  }
}
var popup =  $("#popup");
var popup2 = $("#popup2");
var deltaX,deltaY;
var scrollable = false;


$("#disable-scroll").addEventListener("click",function(e){
  scrollable = !scrollable;
  var txtScroll = scrollable === true ? "现在弹出后可以滚动，点击后禁用" : "现在弹出后禁用滚动，点击后开启";
  e.target.innerHTML = txtScroll;
})

document.addEventListener("click",function(e){
  var target = e.target;
  switch(target.id) {
    case "try" :
      popup.style.display = "block";//offsetHeight为0，因为元素没有加载完，display还是none
      $('#mask').style.display = "block";//这一句的顺序很关键，执行完 offsetHeight 刚好有值
      popup.style.top = (window.innerHeight - popup.offsetHeight) / 2 + "px";
      popup.style.left = (window.innerWidth - popup.offsetWidth) / 2 + "px";
      if(!scrollable) document.addEventListener("wheel", preventScroll)
      break;

    case "try2" :
      popup2.style.display = "block";
      $('#mask').style.display = "block";
      popup2.style.top = (window.innerHeight - popup2.offsetHeight) / 2 + "px";
      popup2.style.left = (window.innerWidth - popup2.offsetWidth) / 2 + "px";
      if(!scrollable) document.addEventListener("wheel", preventScroll)
      break;

    case "mask" :
    case "pop1-conf" :
    case "pop1-canc" :
    case "pop2-canc" :
    case "pop2-conf" :
      popHidden();
      break;

    case "pop2-change" :
      var popWidth = $("#pop-w").value;
      var popHeight = $("#pop-h").value;
      if (popWidth >= 300 && popWidth<=800 && popHeight>=300 && popHeight<=800) {
        popup2.style.width = $("#pop-w").value + "px";
        popup2.style.height = $("#pop-h").value + "px";
      }
      break;
   } 
},false)

$("#popup2").addEventListener("submit",function(e){
  e.preventDefault();
})

$("#popup-top").addEventListener("mousedown", function(e){
  deltaX = popup.offsetLeft - e.clientX;
  deltaY = popup.offsetTop - e.clientY;
  popup.style.margin = 0;


  document.addEventListener("mousemove", mousemove);
  document.addEventListener("mouseup", mouseup);
})

function mousemove(e){
  popup.style.left = e.clientX + deltaX + "px";//向左边移就是减去变化的X值！往右边则相反
  popup.style.top = e.clientY + deltaY + "px";//向上边移就是减去变化的Y值！往下边则相反
}

function mouseup(){
  document.removeEventListener("mousemove",mousemove)
  document.removeEventListener("mouseup",mouseup)
}

function preventScroll(e){
  e.preventDefault();
}

function popHidden() {
  popup.style.display = "none";
  popup2.style.display = "none";
  $('#mask').style.display = "none";
  document.removeEventListener("wheel",preventScroll)
}