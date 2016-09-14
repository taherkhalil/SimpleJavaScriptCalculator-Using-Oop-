var Validate = function() {
	var calc = new Calculator();
	Validate.prototype.expressionChecker = function(array, val) {
		if (array[array.length - 1] == "") {
			console.log("in if");

			if (globals.regexForArthmaticOperations
					.test(array[array.length - 2])) {
				if (globals.regexForArthmaticOperations.test(val)) {
					console.log("checked");
					return true;
				}
			}
		}
		return false;

	}

}
var validate = new Validate();