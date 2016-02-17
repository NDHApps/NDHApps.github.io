$(document).ready(function(){
	var value = 0;
	var cur_val = 0;
	var cur_val_set = false;
	var vals_set = 0;
	var decimal = 0;
	var last_op = "none";
	var symbol = "";
	var mem = 0;
	$('#clear').click(function() {
		value = cur_val = decimal = 0;
		symbol = "";
		update_display();
		last_op="none";
		cur_val_set = false;
		vals_set = 0;
	});
	$('#dec').click(function() {
		if (last_op == "eq" && !cur_val_set) {
			value = cur_val = decimal = 0;
			symbol = "";
			last_op="none";
			vals_set = 0;
		}
		if (!decimal) {
			decimal = 1;
			update_display();
		}
		if (!cur_val_set) {
			vals_set += 1;
			cur_val_set = true;
		}
	});
	$('#pm').click(function() {
		if (cur_val_set) {
			cur_val *= -1;
			update_display();
		} else {
			value *= -1;
			$("textarea.calc-display").html(value.toString()+symbol);
		}
	});
	$('.num').click(function() {
		if (last_op == "eq" && !cur_val_set) {
			value = cur_val = decimal = 0;
			symbol = "";
			last_op="none";
			vals_set = 0;
		}
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
		if (!cur_val_set) {
			vals_set += 1;
			cur_val_set = true;
		}
	});
	$('#mc').click(function() {
		mem = 0;
	});
	$('#mplus').click(function() {
		if (cur_val_set) {
			mem += cur_val;
		} else {
			mem += value;
		}
	});
	$('#mminus').click(function() {
		if (cur_val_set) {
			mem -= cur_val;
		} else {
			mem -= value;
		}
	});
	$('#mr').click(function() {
		cur_val = decimal = 0;
		symbol = "";
		value = mem;
		$("textarea.calc-display").html(value.toString()+symbol);
		last_op="eq";
		cur_val_set = false;
		vals_set = 1;
	});
	$('.op').click(function() {
		var op = this.id;
		value = parseFloat(value);
		if (vals_set == 2) {
			switch(last_op) {
				case "plus":
					value += cur_val;
					break;
				case "minus":
					value -= cur_val;
					break;
				case "times":
					value *= cur_val;
					break;
				case "divide":
					if (cur_val != 0) {
						value /= cur_val;
					} else {
						value = cur_val = decimal = 0;
						symbol = "";
						$("textarea.calc-display").text("Not a number");
						last_op="none";
						cur_val_set = false;
						vals_set = 0;
						return;
					}
					break;
				default:
					break;
			}
			last_op = "none";
			vals_set = 1;
		} else if (vals_set == 1) {
			if (last_op == "none") {
				value = cur_val;
			}
			if (op == "eq") {
				switch(last_op) {
					case "plus":
						value = value + value;
						break;
					case "minus":
						value = value - value;
						break;
					case "times":
						value = value * value;
						break;
					case "divide":
						if (value == 0) {
						   value = cur_val = decimal = 0;
						   symbol = "";
						   $("textarea.calc-display").text("Not a number");
						   last_op="none";
						   cur_val_set = false;
						   vals_set = 0;
						   return;
						} else {
						   value = value / value;
						}
						break;
					default:
						break;
				}
			}
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
		if (cur_val_set) {
			cur_val = decimal = 0;
			cur_val_set = false;
		}
	});
	function update_display() {
		if (decimal==1) {
			$("textarea.calc-display").html(cur_val.toString()+"."+symbol);
		} else {
			$("textarea.calc-display").html(cur_val.toString()+symbol);
		}
	}
});