var Parser = function () {
	Parser.prototype.parseValue = function (val) {
		if (globals.regexForArthmaticOperations.test(val) ||  globals.regexForDigitInLastPlace.test(val))
		return true;
		else return false;
	}
	
	Parser.prototype.getDisplayBoxInput = function() {
		displayBoxValue = document.getElementById("display_box").value;
		return displayBoxValue;
	}
}
var parser = new Parser();
