class FormClass {
	
	constructor(){
		this.inputsNames = ['fio','email','phone'];
		this.$form = document.forms.myForm;
		this.$inputs = this.getInputs();
		this.$button = this.$form.submitButton;
		this.$result = document.getElementById('resultContainer');
		this.validationRules = {
			fio: /^(([а-яА-Яa-zA-Z]+)\s){2}([а-яА-Яa-zA-Z]+)$/,
			email: /^[a-zA-Z0-9_]+@(ya\.ru|yandex\.(ru|ua|by|kz|com))$/,
			phone: /^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/
		}
		this.createListeners();
	}

	getInputs(){
		let inputsObj = {};
		this.inputsNames.forEach(name => {
			const $input = this.$form[name];
			if ($input) inputsObj[name] = $input;
		});
		return inputsObj;
	}

	createListeners(){
		this.$form.addEventListener('submit',event => this.submit(event));
	}

	validate(){
		let isValid = true,
			errorFields = [];
		const data = this.getData(),
			  rules = this.validationRules;
		for (let key in data){
			const value = data[key];
			if (rules.hasOwnProperty(key)){
				if (!(rules[key].test(value))){
					isValid = false;
					errorFields.push(key);
					continue;
				}
				if (key == 'phone'){
					const sum = value.replace( /\D/g, '' ).split('').reduce((prev,current)=> prev + parseInt(current),0);
					if (sum > 30) {
						isValid = false;
						errorFields.push(key);
					}
				}
			}
		}
		return {isValid, errorFields};
	}

	getData(){
		let dataObj = {};
		for (let key in this.$inputs){
			let $input = this.$inputs[key];
			dataObj[$input.name] = $input.value.trim();
		}
		return dataObj;
	}

	setData(data){
		for (let key in data){
			const value = data[key];
			if (this.inputsNames.indexOf(key) != -1) this.$inputs[key].value = value;
		}
	}

	submit(e){
		e.preventDefault();
		this.hideErrorFields();
		const validateResult = this.validate();
		if (validateResult.isValid) {
			this.$button.disabled = true;
			this.sendRequest();
		} else {
			this.showErrorFields(validateResult.errorFields);
		}
	}

	sendRequest(){
		fetch('./test-json/progress.json').then(responce => responce.json()).then(data => {
			this.$result.classList.add(data.status);
			switch (data.status){
				case 'success':
					this.$result.innerHTML = 'Success';
					break;
				case 'error':
					this.$result.innerHTML = data.reason;
					break;
				case 'progress':
					setTimeout(self.sendRequest,data.timeout);
					break;
			}
		});
	}

	showErrorFields(names){
		names.forEach(name => {
			if (this.$inputs.hasOwnProperty(name)) {
				let $input = this.$inputs[name];
				$input.classList.add('error');
			}
		})
	}

	hideErrorFields(){
		for (let key in this.$inputs){
			let $input = this.$inputs[key];
			if ($input.classList.contains('error')) $input.classList.remove('error');
		};
	}

}

const MyForm = new FormClass();