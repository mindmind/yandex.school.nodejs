class MyForm {
	
	constructor(){
		this.$inputs = getInputs(['fio','email','phone']);
		this.validationRules = {
			fio: /^(([а-яА-Яa-zA-Z]+)\s){2}([а-яА-Яa-zA-Z]+)$/,
			email: /^[a-zA-Z0-9_]+@(ya\.ru|yandex\.(ru|ua|by|kz|com))$/,
			phone: /^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/
		}
	}

	getInputs(names){
		let inputsObj = {};
		names.forEach(name => {
			const $input = document.getElementsByName(name);
			if ($input.length) inputsObj[name] = $input[0];
		});
		return inputsObj;
	}

	validate(){

	}

	getData(){

	}

	setData(data){

	}

	submit(e){
		e.preventDefault();
		const validateResult = this.validate();
		if (validateResult) {
			//send ajax
		} else {
			this.showErrorFields(validateResult.errorFields);
		}
	}

	showErrorFields(names){
		names.forEach(name => {
			if (this.$inputs.hasOwnProperty(name)) {
				let $input = this.$inputs[name];
				$input.addClass('error');
			}
		})
	}

	hideErrorFields(){
		this.$inputs.forEach($input => {
			if ($input.classList.contains('error')) $input.classList.remove('error');
		});
	}

}