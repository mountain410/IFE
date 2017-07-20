//定义一个id选择器方法
function $(elem_id){
  if (elem_id.indexOf('#') === 0){
    return document.getElementById(elem_id.substring(1))
  }
}


document.addEventListener("click",function(e){
  var target = e.target;
  switch(target.id) {
    case "try" :
      $('#out').style.display = "block";
      $('#mask').style.display = "block";
      break;
    case "mask" :
    case "conf" :
    case "canc" :
      $('#out').style.display = "none";
      $('#mask').style.display = "none";
      break;
   } 
},false)
