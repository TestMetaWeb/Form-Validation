const form_element = document.getElementById('form');

form_element.addEventListener('submit', e => {
	e.preventDefault();
	$(".js-msds").css("display","none");
	var valid_condition=true;
	var valid_condition=check_inputs(valid_condition);
	if(valid_condition==true){
		//save data
		form_data_json(e);
	}
});


function select_dropdown_btn(){
	var optionMenu = document.querySelector(".select-menu");
	optionMenu.classList.toggle("active");
}   

function option_selected(evnt){
	var optionMenu = document.querySelector(".select-menu");
	var sBtn_text = optionMenu.querySelector(".sBtn-text");
	let selectedOption = evnt.querySelector(".option-text").innerText;
	sBtn_text.innerText = selectedOption;
	var option_id=evnt.querySelector(".option-text").id;
	sBtn_text.setAttribute("option_id",option_id);
	optionMenu.classList.remove("active");
}

function multi_select_dropdown(call){
	$(call).closest('div').find('.js-msds').toggle();
  }

function input_change(evt){
	if($(evt).prop("checked") == true){
		$(evt).parent('label').addClass('msd_options_option-check');
	} else {
		$(evt).parent('label').removeClass('msd_options_option-check');
	}
  }

function check_inputs(valid_condition) {
	// trim to remove the whitespaces

	const email_element = document.getElementById('email');
	const password_element = document.getElementById('password');
	const password2_element = document.getElementById('password2');
	const nNumber_element = document.getElementById('nNumber');
	const phone_number_element = document.getElementById('phoneNumber');
	const url_element = document.getElementById('url');

	const phone_number_value = phone_number_element.value.trim();
	const nNumber_value = nNumber_element.value.trim();
	const email_value = email_element.value.trim();
	const url_value = url_element.value.trim();
	const password_value = password_element.value.trim();
	const password2_value = password2_element.value.trim();
	
	
	if(phone_number_value === '') {
		set_validation_error(phone_number_element, 'Phone Number cannot be blank');
		valid_condition=false;
	} else if (!isphoneNumber(phone_number_value)) {
		set_validation_error(phone_number_element, 'Not a valid phoneNumber');
		valid_condition=false;
	} else {
		set_validation_success(phone_number_element);
	}
	
	if(nNumber_value === '') {
		set_validation_error(nNumber_element, 'Number cannot be blank');
		valid_condition=false;
	} else if (!isnNumber(nNumber_value)) {
		set_validation_error(nNumber_element, 'Not a valid Number(max 20digits)');
		valid_condition=false;
	} else {
		set_validation_success(nNumber_element);
	}
	
	
	if(email_value === '') {
		set_validation_error(email_element, 'Email cannot be blank');
		valid_condition=false;
	} else if (!isEmail(email_value)) {
		set_validation_error(email_element, 'Not a valid email');
		valid_condition=false;
	} else {
		set_validation_success(email_element);
	}
	
	if(url_value === '') {
		set_validation_error(url_element, 'url cannot be blank');
		valid_condition=false;
	} else if (!validURL(url_value)) {
		set_validation_error(url_element, 'Not a valid url');
		valid_condition=false;
	} else {
		set_validation_success(url_element);
	}
	
	
	if(password_value === '') {
		set_validation_error(password_element, 'Password cannot be blank');
		valid_condition=false;
	}else if(!is_password(password_value)){
		set_validation_error(password_element, 'Password not valid');
		valid_condition=false;
	} else {
		set_validation_success(password_element);
	}
	
	if(password2_value === '') {
		set_validation_error(password2_element, 'Password2 cannot be blank');
		valid_condition=false;
	}else if(!is_password(password2_value)){
		set_validation_error(password2_element, 'Password2 not valid');
		valid_condition=false;
	} else if(password_value !== password2_value) {
		set_validation_error(password2_element, 'Passwords does not match');
		valid_condition=false;
	} else{
		set_validation_success(password2_element);
	}
	
	return valid_condition;
}

function set_validation_error(input, message) {
   
	var form_control_element = input.parentElement;
    var error_icon=form_control_element.querySelector('.icon-error');
    error_icon.classList.remove("hidden");
    var sucess_icon=form_control_element.querySelector('.icon-success');
    sucess_icon.classList.add("hidden");
	var small = form_control_element.querySelector('small');
	form_control_element.className = 'form-control error form-controlWidth';
	small.innerText = message;

}

function set_validation_success(input) {
	var form_control_element = input.parentElement;
    var sucess_icon=form_control_element.querySelector('.icon-success');
    sucess_icon.classList.remove("hidden");
    var error_icon=form_control_element.querySelector('.icon-error');
    error_icon.classList.add("hidden");
	form_control_element.className = 'form-control success form-controlWidth';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isphoneNumber(inputtxt){
  	var phoneno = /^\d{10}$/;
  	if(inputtxt.match(phoneno))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function isnNumber(input_val){
	var num_con=isNumeric(input_val);
  	if(num_con)
    {
    	if(input_val.length<=20){
			return true;
		}else{
			return false;
		}
    }
    else
    {
    	return false;
    }
}


function isNumeric(str) {
	if (typeof str != "string") return false // we only process strings!  
	return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		   !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

function validURL(str) {
	var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
	  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
	  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
	  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
	  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
	  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	return !!pattern.test(str);
}
function is_password(my_Input){
	var lower_case_letters = /[a-z]/g;
	var upper_case_letters = /[A-Z]/g;
	var numbers = /[0-9]/g;
	if(my_Input.length >= 8 && my_Input.match(lower_case_letters) && my_Input.match(upper_case_letters) && my_Input.match(numbers) ) {
		return true;
	}else{
		return false;
	}
}


function form_data_json(event){
	var form_element=event.path[0];
	var phone_number1=form_element.querySelector("#phoneNumber").value;
	var email1 = form_element.querySelector("#email").value;
	var password1 = form_element.querySelector("#password").value;
	var password21 = form_element.querySelector("#password2").value;
	var nNumber1 = form_element.querySelector("#nNumber").value;
	var url1 = form_element.querySelector("#url").value;
	var dropdown1=form_element.querySelector("#drop_down").innerText;
	var selected_dropdown_id=form_element.querySelector("#drop_down").getAttribute("option_id");
	var select_color_value=form_element.querySelector("#multi_drop_down");
	var selected_item_class= document.getElementsByClassName("msd_options_option-check");
	var selected_item=[];
	for (var i = 0; i < selected_item_class.length; i++) {
		selected_item.push(selected_item_class.item(i).querySelector("input").id);
	}

	var form_data={
		"phone_number":phone_number1,
		"email_address":email1,
		"password":password1,
		"url":url1,
		"number":nNumber1,
		"dropdown_content":dropdown1,
		"selected_option":selected_dropdown_id,
		"selected_colors":selected_item
	}
	console.log(form_data);
	// console.log(JSON.stringify(form_data));
}