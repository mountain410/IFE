//模仿块级作用域，匿名函数立即执行
(function(){
	var spans = document.getElementsByTagName('span');

	//名称输入框
	var fname = document.getElementById('fname');
	fname.onfocus = function(){
		spans[0].innerHTML = '请输入4~16位名称'
		fname.removeAttribute('style');
		spans[0].removeAttribute('style');
	}
	fname.onblur = function(){
		nameCheck(fname.value.trim())
	}

	// 密码输入框
	var pass = document.getElementById('password');
	pass.onfocus = function(){
		spans[1].innerHTML = '密码为6~12位，只能数字、字母和下划线';
		pass.removeAttribute('style');
		spans[1].removeAttribute('style');
	}
	pass.onblur = function(){
		passCheck(pass.value.trim())
	}

	// 确认密码输入框
	var passAgain = document.getElementById('pass-again');
	passAgain.onfocus = function(){
		spans[2].innerHTML = '请确认密码，与输入密码相同';
		passAgain.removeAttribute('style');
		spans[2].removeAttribute('style');
	}
	passAgain.onblur = function(){
		passAgainCheck(passAgain.value.trim());
	}

	// 邮箱输入框
	var mail = document.getElementById('mail');
	mail.onfocus = function(){
		spans[3].innerHTML = '请输入正确邮箱格式：如xx@xx.com';
		mail.removeAttribute('style');
		spans[3].removeAttribute('style');
	}
	mail.onblur = function(){
		mailCheck(mail.value.trim());
	}

	// 手机号输入框
	var tel = document.getElementById('tel');
	tel.onfocus = function(){
		spans[4].innerHTML = '请输入11位正确手机号，如13812345678';
		tel.removeAttribute('style');
		spans[4].removeAttribute('style');
	}
	tel.onblur = function(){
		telCheck(tel.value.trim());
	}

	//名称验证
	function nameCheck(input){
		var len = 0;
		//输入字符串长度计算（英文及符号长度为1，中文及符号长度为2）
		for (var i = 0; i < input.length; i++) {
			if((/[^\x00-\xff]/).test(input[i])){
				len +=2;
			}else{
				len++;
			}
		}
		if(input == ''){
			fname.style.border = "2px solid red";
			spans[0].innerHTML = "名称不能为空！";
			spans[0].style.color = "red"; 
		}else if(!(len>=4 && len<=16)){
			fname.style.border = "2px solid red";
			spans[0].innerHTML = "名称必须为4~16位字符！";
			spans[0].style.color = "red"; 
		}else{
			fname.style.border = "2px solid green";
			spans[0].innerHTML = "名称格式正确√";
			spans[0].style.color = "green"; 
		}
	}
	//密码验证
	function passCheck(input){
		var pattern = /^[0-9a-zA-Z_]{6,12}$/;
		if(input == ''){
			pass.style.border = "2px solid red";
			spans[1].innerHTML = "密码不能为空！";
			spans[1].style.color = "red"; 
		}else if(pattern.test(input)){
			pass.style.border = "2px solid green";
			spans[1].innerHTML = "密码格式正确√";
			spans[1].style.color = "green";
		}else{
			pass.style.border = "2px solid red";
			spans[1].innerHTML = "密码格式不对！";
			spans[1].style.color = "red";
		}
	}
	//确认密码验证
	function passAgainCheck(input){
		var passInput = pass.value.trim()
		if(!/^[0-9a-zA-Z_]{6,12}$/.test(passInput)){
			passAgain.style.border = "2px solid red";
			spans[2].innerHTML = "请先输入正确格式密码！";
			spans[2].style.color = "red";
		}else if(passInput === input){
			passAgain.style.border = "2px solid green";
			spans[2].innerHTML = "密码确认正确√";
			spans[2].style.color = "green";
		}else{
			passAgain.style.border = "2px solid red";
			spans[2].innerHTML = "密码确认有误！";
			spans[2].style.color = "red";
		}
	}
	//邮箱验证
	function mailCheck(input){
		var pattern = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
		if(input == ''){
			mail.style.border = "2px solid red";
			spans[3].innerHTML = "邮箱不能为空！";
			spans[3].style.color = "red"; 
		}else if(pattern.test(input)){
			mail.style.border = "2px solid green";
			spans[3].innerHTML = "邮箱格式正确√";
			spans[3].style.color = "green";
		}else{
			mail.style.border = "2px solid red";
			spans[3].innerHTML = "邮箱格式有误！";
			spans[3].style.color = "red";
		}
	}
	//手机验证
	function telCheck(input){
		var pattern = /^1[34578]\d{9}$/;
		if(input == ''){
			tel.style.border = "2px solid red";
			spans[4].innerHTML = "手机号不能为空！";
			spans[4].style.color = "red"; 
		}else if(pattern.test(input)){
			tel.style.border = "2px solid green";
			spans[4].innerHTML = "手机号格式正确√";
			spans[4].style.color = "green";
		}else{
			tel.style.border = "2px solid red";
			spans[4].innerHTML = "手机号格式有误！";
			spans[4].style.color = "red";
		}
	}

	//验证按钮
	var check = document.getElementById('check');
	check.onclick = function(){
		var count = 0;
		for (var i = 0; i < spans.length; i++) {
			if(spans[i].style){
				if(spans[i].style.color == 'green'){
					count++;
				}
			}
		}
		if (count == 5) {
			alert('提交成功！')
		}else{
			alert('提交失败！')
		}
	}
	
})()