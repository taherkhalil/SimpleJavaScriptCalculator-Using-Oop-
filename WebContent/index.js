window.onload = init;

var globals = {
	error : document.getElementById("error"),
	displayBox : document.getElementById("display_box"),
	regexForArthmaticOperations : new RegExp("[\+-\/\*\]"),
	regexForDigitInLastPlace : new RegExp("[0-9]$"),
	regexForArthmaticOperatorInLastPlace : new RegExp("[\+-\/\*\s]$")
}

var Calculator = function() {
	var sum = 0, a, b;
	flag = false;
	var equalFlag = false;
	Calculator.prototype.getInput = function() {
		if (equalFlag) {
			globals.error.innerHTML = "";
			if (this.innerHTML.match(/[0-9]+/g)) {
				console.log("yes");
				clearDisplayBox();
			}
			equalFlag = false;
		}
		setDisplay(this.innerHTML);
		console.log(globals.displayBox.value);
	}

	function setDisplay(val) {
		var array = getInputArray();
		if (!flag) {
			if (isDisplayBoxEmpty()) {
				if (globals.regexForArthmaticOperations.test(val))
					return;
			}
		}
		if (validate.expressionChecker(array, val)) {
			return;
		}

		if (val.match("=")) {
			if (array[array.length - 1] == "") {
				return;
			}

			operateOnInput(getInputArray());
			equalFlag = true;
			flag = true;
			return;
		}

		if (val.match("C")) {
			clearDisplayBox();
			flag = false;
			return;
		}

		if (globals.regexForArthmaticOperations.test(val)) {
			var displayBox = document.getElementById("display_box");
			displayBox.value += " " + val + " ";
			return;
		}

		globals.displayBox.value += val;
	}

	function operateOnInput(inputArray) {
		sum = 0;
		if (parser.parseValue(inputArray)) {
			for (var i = 1; i < inputArray.length - 1; i += 2) {
				b = parseInt(inputArray[i + 1]);
				switch (inputArray[i]) {
				case "+":
					sum = doOperation(add, i, inputArray, a, b);
					break;
				case "-":
					if (i == 1) {
						a = parseInt(inputArray[i - 1]);
						sum -= subtract(a, b);
					} else
						sum = subtract(b, sum);
					break;
				case "*":
					sum = doOperation(mul, i, inputArray, a, b);
					break;
				case "/":
					sum = doOperation(div, i, inputArray, a, b);
					break;
				default:
					break;
				}
			}
		}

		clearDisplayBox();
		setDisplay(sum + "");
		flag = true;
		return;
	}
	function doOperation(operation, i, inputArray, a, b) {
		if (i == 1) {
			a = parseInt(inputArray[i - 1]);
			sum += operation(a, b);
			return sum;
		} else
			sum = operation(sum, b);
		return sum;
	}

	function getInputArray() {
		var displayBoxValue = document.getElementById("display_box").value;
		var parts = displayBoxValue.split(" ");
		console.log(parts);
		return parts;
	}

	function isDisplayBoxEmpty() {
		if (globals.displayBox.value == "")
			return true;
		else
			return false;
	}

	function clearDisplayBox() {
		globals.displayBox.value = "";
	}

	function add(x, y) {
		return parseInt(x) + parseInt(y);
	}

	function subtract(x, y) {
		return parseInt(y) - parseInt(x);
	}
	function mul(x, y) {
		return parseInt(x) * parseInt(y);
	}
	function div(x, y) {
		return parseInt(x) / parseInt(y);
	}
}
var calc = new Calculator();

function init() {
	attachEventListener();
}

function attachEventListener() {
	var buttons = document.querySelectorAll("#btn");

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", calc.getInput);
		buttons[i].style.color = "blue";
	}

}
