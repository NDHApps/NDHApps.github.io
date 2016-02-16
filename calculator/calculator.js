$(document).ready(function(){
	var value = 0;
	var cur_val = 0;
	var cur_val_set = false;
	var decimal = 0;
	var last_op = "none";
	var symbol = "";
	$('#clear').click(function() {
		value = cur_val = decimal = 0;
		symbol = "";
		update_display();
		last_op="none";
		cur_val_set = false;
	});
	$('#dec').click(function() {
		if (!decimal) {
			decimal = 1;
			update_display();
		}
		cur_val_set = true;
	});
	$('.op').click(function() {
		var op = this.id;
		value = parseFloat(value);
		switch(last_op) {
			case "none":
				value = cur_val;
				break;
			case "plus":
				if (cur_val_set) {
				   value += cur_val;
				} else {
				   value = value + value;
				}
				break;
			case "minus":
				if (cur_val_set) {
				   value -= cur_val;
				} else {
				   value = value - value;
				}
				break;
			case "times":
				if (cur_val_set) {
				   value *= cur_val;
				} else {
				   value = value * value;
				}
				break;
			case "divide":
				if (cur_val_set && cur_val != 0) {
				   value /= cur_val;
				} else if (cur_val == 0) {
				   value = cur_val = decimal = 0;
				   symbol = "";
				   $("textarea.calc-display").text("Not a number");
				   last_op="none";
				   cur_val_set = false;
				   return;
				} else {
				   value = value / value;
				}
				break;
			default:
				break;
		}
		switch(op) {
			case "plus":
				symbol = "&#013;&plus;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				break;
			case "minus":
				symbol = "&#013;&minus;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				break;
			case "times":
				symbol = "&#013;&times;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				break;
			case "divide":
				symbol = "&#013;&divide;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				break;
			default:
				symbol = "";
				break;
		}
		last_op = op;
		$("textarea.calc-display").html(value.toString()+symbol);
		cur_val = decimal = 0;
		cur_val_set = false;
	});
	$('#pm').click(function() {
		cur_val *= -1;
		update_display();
	});
	$('.num').click(function() {
		var digit = parseInt(this.id);
		if (decimal) {
			cur_val = parseFloat(cur_val);
			cur_val += digit * Math.pow(10, -decimal);
			cur_val = cur_val.toFixed(decimal);
			decimal += 1;
		} else {
			cur_val = cur_val * 10 + digit;
		}
		update_display();
		cur_val_set = true;
	});
	function update_display() {
		if (decimal==1) {
			$("textarea.calc-display").html(cur_val.toString()+"."+symbol);
		} else {
			$("textarea.calc-display").html(cur_val.toString()+symbol);
		}
	}
});