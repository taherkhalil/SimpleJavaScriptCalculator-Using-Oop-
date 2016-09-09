window.onload = init;

var globals = {
	displayBox : document.getElementById("display_box"),
	regexForArthmaticOperations : new RegExp("[\+-\/\*\]"),
	regexForDigitInLastPlace : new RegExp("[0-9]$"),

	regexForArthmaticOperatorInLastPlace : new RegExp("[\+-\/\*\s]$")
}

flag = false;
var equalFlag = false;

var Calculator = function() {
	Calculator.prototype.getInput = function() {
		if (equalFlag) {
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
		if (!flag){
		 if ( isDisplayBoxEmpty() ) {
		 if ( globals.regexForArthmaticOperations.test(val) )
			 
		 return;
		 }
		}

		if (val.match("=")) {
			var displayBoxInput = parser.getDisplayBoxInput();
			var parts = parser.parseValue(displayBoxValue);
			operateOnInput(getInputArray());

			equalFlag = true;
			flag=true;

			return;
		}

		if (val.match("Clear")) {
			clearDisplayBox();
			flag=false;
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
		var sum = 0, a, b;
		if (parser.parseValue(inputArray)) {
			for (var i = 1; i < inputArray.length - 1; i += 2) {
				b = parseInt(inputArray[i + 1]);
				switch (inputArray[i]) {
				case "+":
					console.log(inputArray[i]);
					if (i == 1) {
						a = parseInt(inputArray[i - 1]);
						sum += add(a, b);
					} else
						sum = add(sum, b);
					console.log("iteration " + i + ":" + sum);
					break;
				case "-":
					console.log(inputArray[i]);
					if (i == 1) {
						a = parseInt(inputArray[i - 1]);
						sum -= subtract(a, b);
					} else
						sum = subtract(b, sum);
					console.log("iteration " + i + ":" + sum);
					break;
				case "*":
					console.log(inputArray[i]);
					if (i == 1) {
						a = parseInt(inputArray[i - 1]);
						sum += mul(a, b);
					} else
						sum = mul(b, sum);
					console.log("iteration " + i + ":" + sum);
					break;
				case "/":
					console.log(inputArray[i]);
					if (i == 1) {
						a = parseInt(inputArray[i - 1]);
						sum += div(a, b);
					} else
						sum = div(sum, b);
					console.log("iteration " + i + ":" + sum);
					break;
				default:

					break;
				}
			}
		}
		;
		clearDisplayBox();
		setDisplay(sum + "");
		flag = true;
		return;
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
	}
}
