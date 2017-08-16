class MyForm {
	
	constructor(){
		this.$inputs = getInputs(['fio','email','phone']);
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
				let $field = this.$inputs[name];
				$field.addClass('error');
			}
		})
	}

	hideErrorFields(){
		//прячем класс error если он есть у поля
	}

}