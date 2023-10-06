var log_info = true;

var GUI_helper = {
	gui_demo_controls: [],
	gui_demo_controls_Array: [],
	
	gui_demo: {
		//		
		generateCustomToggleControl: function (id, text1_label, text2_values, initial_state, switch_handler) {
			//			
			var div_wrapper = document.createElement('div');
			
			var span_label = document.createElement('span');
			const whiteSpace = "    ";
			span_label.id = id + "_text1";
			span_label.innerHTML = text1_label + whiteSpace;
			
			var label_holder = document.createElement('label');
			label_holder.id = id + "_holder";
			label_holder.className = "switch";
			
			var input_checkbox = document.createElement('input');
			input_checkbox.id = id;
			input_checkbox.type = "checkbox";
			input_checkbox.checked = initial_state;
			
			var span_slider = document.createElement('span');
			span_slider.className = "slider round";
			
			var span_value = document.createElement('span');
			span_value.id = id + "_text2";
			span_value.innerHTML = text2_values[Number(initial_state)];
			
			
			function myToggle() {
				
				GUI_helper.gui_demo_controls[this.id].value = this.checked;
				
				var id = this.dataset.id;
				var text2_values = GUI_helper.gui_demo_controls[id].text2_values;
				var toggle = this; //.checked //document.getElementById(id)
				var toggle_text2 = document.getElementById(id + "_text2");
								
				//if (toggle.checked) toggle_text2.innerHTML = "HD 720p";
				//else toggle_text2.innerHTML = "SD 480p";
				
				toggle_text2.innerHTML = text2_values[Number(toggle.checked)];
				
				//first the above code will execute, then the GUI will change
				
				switch_handler();
			}			
			
			
			label_holder.appendChild(input_checkbox);
			label_holder.appendChild(span_slider);
			
			div_wrapper.appendChild(span_label);
			div_wrapper.appendChild(label_holder);
			div_wrapper.appendChild(span_value);
			
			input_checkbox.dataset.id = id; //custom data-*
			
			var custom_object = { id: id, element_ref: div_wrapper, text2_values: text2_values, event_handler: myToggle, disable_element: null, value: initial_state };
			
			input_checkbox.onclick = custom_object.event_handler;
			
			//will init work for dynamic dom elements? -y.
			
			label_holder.style.position = "absolute";
			span_value.style.position = "absolute";
			
			label_holder.style.marginTop = "-5px";
			span_value.style.marginLeft = "80px";
			span_value.style.color = "#7f7f7f";
			
			custom_object.disable_element = function (disable, hide) {
				//
				var id = this.id;
				var toggle = document.getElementById(id); //.checked
				var toggle_holder = document.getElementById(id + "_holder");
				var toggle_text1 = document.getElementById(id + "_text1");
				var toggle_text2 = document.getElementById(id + "_text2");
				
				if (disable)
				{
					toggle_holder.style.opacity = "0.5"; //use the holder
					toggle.disabled = true;
				}
				else
				{
					toggle.disabled = false;
					toggle_holder.style.opacity = "1.0"; //use the holder
				}
				
				if (typeof hide === 'boolean')
				{
					let show = !hide;
					toggle_holder.style.opacity = (show) ? ((disable) ? "0.5" : "1.0") : "0.0";
				}
				
			};
			
			document.body.appendChild(div_wrapper);
			
			GUI_helper.gui_demo_controls[id] = custom_object;
			GUI_helper.gui_demo_controls_Array.push(GUI_helper.gui_demo_controls[id]); 
		},
		
		//NOTE: select_values is used in place of text2_values and will be placed inside the select's options
		generateCustomSelectControl: function (id, text1_label, select_values, initial_state, change_handler) {
			//			
			var div_wrapper = document.createElement('div');
			
			var span_label = document.createElement('span');
			const whiteSpace = "    ";
			span_label.id = id + "_text1";
			span_label.innerHTML = text1_label + whiteSpace;
			
			//actual select
			var div_holder = document.createElement('div');
			div_holder.className = "custom-select";
			div_holder.style.width = "220px";
			
			var main_select = document.createElement('select');
			main_select.id = id;
			
			//check if array?
			const optionsCount = select_values.length; // The length property returns the number of elements
			
			for(let i = 0; i < optionsCount; i++)
			{
				var option_i = document.createElement('option');
				option_i.value = i;
				option_i.innerHTML = select_values[i];
				main_select.appendChild(option_i);
			}			
			main_select.value = Number(initial_state) + 1; //set this After options have been added
			
			div_holder.appendChild(main_select);
			//end of actual select			
			
			//var span_value = document.createElement('span');
			//span_value.id = id + "_text2";
			//span_value.innerHTML = text2_values[Number(initial_state)];
			
			
			//function handler
			function mySelect()
			{
				GUI_helper.gui_demo_controls[this.id].value = this.value; //update value
				
				change_handler(); //this should take the value above, which should be the mask
			}			
			
			div_wrapper.appendChild(span_label);
			div_wrapper.appendChild(div_holder);
			//div_wrapper.appendChild(span_value);
			
			var custom_object = { id: id, element_ref: div_wrapper, text2_values: select_values, event_handler: mySelect, disable_element: null, value: initial_state };
			
			main_select.onchange = custom_object.event_handler;
			
			//div_holder.style.position = "absolute"; //see for different positions of div_wrapper
			//span_value.style.position = "absolute";
			
			div_holder.style.marginTop = "-35px";
			div_holder.style.marginLeft = Math.round((text1_label.length + 4) * 10) + "px";
			//span_value.style.marginLeft = "100px";
			//span_value.style.color = "#7f7f7f";
			
			//custom_object.disable_element = function (disable) {
			
			document.body.appendChild(div_wrapper);
			
			GUI_helper.gui_demo_controls[id] = custom_object;
			GUI_helper.gui_demo_controls_Array.push(GUI_helper.gui_demo_controls[id]);
		},
		
		//all selects
		init_customSelects: function () {
			//
			var x, i, j, selElmnt, a, b, c;

			/*look for any elements with the class "custom-select":*/
			x = document.getElementsByClassName("custom-select");
			
			function closeAllSelect(elmnt) {
				//if (mwb_log_info) console.log("pazi mori 2");
				/*a function that will close all select boxes in the document,
				except the current select box:*/
				var x, y, i, arrNo = [];
				x = document.getElementsByClassName("select-items");//if (mwb_log_info) console.log(x);
				y = document.getElementsByClassName("select-selected");//if (mwb_log_info) console.log(y);
				for (i = 0; i < y.length; i++) {
					if (elmnt == y[i]) {
						arrNo.push(i)
					} else {
						y[i].classList.remove("select-arrow-active");
					}
				}
				for (i = 0; i < x.length; i++) {
					if (arrNo.indexOf(i)) {
						x[i].classList.add("select-hide");
					}
				}
			}

			for (i = 0; i < x.length; i++) {
				
				selElmnt = x[i].getElementsByTagName("select")[0];
				
				/*for each element, create a new DIV that will act as the selected item:*/
				a = document.createElement("DIV");
				a.dataset.id = selElmnt.id; //custom data-* //to serve as ref to parent select later on click
				a.setAttribute("class", "select-selected");
				a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
				x[i].appendChild(a);
				
				/*for each element, create a new DIV that will contain the option list:*/
				b = document.createElement("DIV");
				b.setAttribute("class", "select-items select-hide");
				
				for (j = 1; j < selElmnt.length; j++) {
					
					/*for each option in the original select element,
					create a new DIV that will act as an option item:*/
					c = document.createElement("DIV");
					c.innerHTML = selElmnt.options[j].innerHTML;
					c.addEventListener("click", function(e) {
						
						/*when an item is clicked, update the original select box,
						and the selected item:*/
						var i, s, h;
						s = this.parentNode.parentNode.getElementsByTagName("select")[0];
						h = this.parentNode.previousSibling;
						
						for (i = 0; i < s.length; i++) {
							
							if (s.options[i].innerHTML == this.innerHTML) {
								s.selectedIndex = i;
								h.innerHTML = this.innerHTML;
								break;
							}
						}
						h.click();
					});
					b.appendChild(c);
				}
				x[i].appendChild(b);
				a.addEventListener("click", function(e) {
					
					/*when the select box is clicked, close any other select boxes,
					and open/close the current select box:*/
					e.stopPropagation();
					closeAllSelect(this);
					this.nextSibling.classList.toggle("select-hide");
					this.classList.toggle("select-arrow-active");
					
					let parent_select = document.getElementById(this.dataset.id);
					let prev_value = GUI_helper.gui_demo_controls[parent_select.id].value;
					
					//but is value actually changed? we need previous to compare (stored in custom object)
					if (parent_select.value != prev_value) parent_select.onchange();
				});
			}
			
			/*if the user goes anywhere outside the select box,
			then close all select boxes:*/
			document.addEventListener("click", closeAllSelect); //onfocusout works, you just have to set it for the right element|(s)
		},
		
		//NOTE: initial_states is used in place of initial_state and is an array for the initial state of each checkbox
		//multiple checkboxes can be created - only 1 text1_label for 1+ text2_values/initial_states
		//change_handler should handle changes from all checkboxes
		//checkboxes are id'd by _0x_i, where i is the index from the array text2_values
		generateCustomCheckboxesControl: function (id, text1_label, text2_values, initial_states, change_handler) {
			//
			//verify aRRays beforehand?
			var div_wrapper = document.createElement('div');
			div_wrapper.style.width = "90%"; //here
			//this is just a root-parent, but if you need to make it a table:
			//div_wrapper.style.border = "1px solid black";
			//div_wrapper.style.display = "table";
			//div_wrapper.style.tableLayout = "fixed";
			
			var span_label = document.createElement('span');
			const whiteSpace = "    ";
			span_label.id = id + "_text1";
			span_label.innerHTML = text1_label + whiteSpace;
			
			var span_padding_workaround = document.createElement('span');
			span_padding_workaround.innerHTML = whiteSpace;
			span_padding_workaround.style.display = "block";
			span_padding_workaround.style.fontSize = "8px";
			
			div_wrapper.appendChild(span_label);
			div_wrapper.appendChild(span_padding_workaround);
			
			//function handler
			function myCheckboxes()
			{
				let control_IDs = this.id.split("_0x_"); //or lastIndexOf
				let group_id =  control_IDs[0];
				let checkbox_id =  control_IDs[1];
				
				GUI_helper.gui_demo_controls[group_id].value[checkbox_id] = this.checked; //update value
				
				//this.id is id + '_' + i, where i is the index from the array text2_values
				//you could also use .dataset.custom_mask or something like that
				
				//test
				//alert(this.checked);
				
				change_handler(); //this should take the value above, which should be the mask
			}
			
			//check if array?
			const checkboxesCount = text2_values.length; // The length property returns the number of elements
			const numberOfColumns = 2; //could be changed to 4 for portrait, but that would involve re-caling all of this
			const checkboxesPerColumn = Math.ceil(checkboxesCount / numberOfColumns);
			
			var div_column_wrapper = document.createElement('div');
			div_column_wrapper.style.width = "100%"; //here
			//div_column_wrapper.style.border = "2px solid black";
			div_column_wrapper.style.display = "table";
			div_column_wrapper.style.tableLayout = "fixed";
			
			var div_columns_Array = [];
			
			for(let j = 0; j < numberOfColumns; j++)
			{
				//
				var div_column = document.createElement('div');
				div_column.style.width = "50%"; //here
				//div_column.style.border = "1px solid black";
				div_column.style.display = "table-cell";
				
				div_columns_Array.push(div_column);
				div_column_wrapper.appendChild(div_columns_Array[j]);
			}
			
			//if (mwb_log_info) console.log(div_columns_Array);
			let j = 0;
			let column_ref = div_columns_Array[j];
			
			for(let i = 0; i < checkboxesCount; i++)
			{
				//actual checkboxes
				var label_holder = document.createElement('label');
				label_holder.id = id + "_holder";
				label_holder.className = "container";
				label_holder.innerHTML = text2_values[i]; //this element serves as span_value
				
				var input_checkbox = document.createElement('input');
				input_checkbox.id = id + '_0x_' + i; //conversion should be as expected
				input_checkbox.type = "checkbox";
				input_checkbox.checked = initial_states[i];
				input_checkbox.onchange = myCheckboxes;
				
				var span_mark = document.createElement('span');
				span_mark.className = "checkmark";
				
				label_holder.appendChild(input_checkbox);
				label_holder.appendChild(span_mark);
				
				//var span_value = document.createElement('span');
				//span_value.id = id + "_text2";
				//span_value.innerHTML = text2_values[Number(initial_state)];
				
				//div_wrapper.appendChild(label_holder); //all checkboxes in one parent div
				
				if ((checkboxesPerColumn / (i - (checkboxesPerColumn * j))) <= 1.0) j++;
				
				//if (mwb_log_info) console.log('i and j: ' + i + ' ' + j); //dev test
				
				div_columns_Array[j].appendChild(label_holder);
			}
			
			div_wrapper.appendChild(div_column_wrapper);
			//if (mwb_log_info) console.log('sound ost');
			var custom_object = { id: id, element_ref: div_wrapper, text2_values: text2_values, event_handler: myCheckboxes, disable_element: null, value: initial_states }; //value is an array here
			
			//no need to use margins?
			//nothing works as needed with span_label
			
			//custom_object.disable_element = function (disable) {
			
			document.body.appendChild(div_wrapper);
			
			GUI_helper.gui_demo_controls[id] = custom_object;
			GUI_helper.gui_demo_controls_Array.push(GUI_helper.gui_demo_controls[id]);
		},
		
		//NOTE: text2_values is replaced with range_values, which serve as [[min, max], ...] array of arrays for 1 or multiple range sliders
		//initial_states is an array for 1 or multiple range sliders
		generateCustomRangeSliderControl: function (id, text1_label, range_values, initial_states, change_handler) {
			//			
			var div_wrapper = document.createElement('div');
			
			var span_label = document.createElement('span');
			const whiteSpace = "    ";
			span_label.id = id + "_text1";			
			//span_label.innerHTML = text1_label + ": " + initial_states[0] + whiteSpace; //later
			
			var text1_label_Values = "";
			
			var div_holder = document.createElement('div');
			div_holder.id = id + "_holder";
			div_holder.className = "slidecontainer";
			
			function myRange() {
				
				let control_IDs = this.id.split("_0x_"); //or lastIndexOf
				let group_id =  control_IDs[0];
				let range_id =  control_IDs[1];
				
				GUI_helper.gui_demo_controls[group_id].value[range_id] = Number(this.value); //update value (for some reason originally its a string, nothing a little conversion can't fix)
				
				var id = this.dataset.id;
				var rangeSlider_text1 = document.getElementById(id + "_text1");
				
				const whiteSpace = "    ";
				let label = rangeSlider_text1.innerHTML;
				
				var rangeSlidersCount = GUI_helper.gui_demo_controls[group_id].value.length;
				
				if (rangeSlidersCount == 1)
				{
					let delimPos = label.lastIndexOf(": ");
				
					label = label.substring(0, delimPos) + ": " + this.value + whiteSpace; //label.substring(delimPos, dateString.length);
				}
				else
				{
					//4
					if (rangeSlidersCount == 4)
					{
						let delimPos = label.lastIndexOf("→ (");
						
						//Perform a global replacement:
						//str.replace(/blue/g, "red");
						let values = GUI_helper.gui_demo_controls[group_id].value + "";
						values = values.replace(/,/g, ", ");
						
						label = label.substring(0, delimPos) + "→ (" + values + ")" + whiteSpace;
					}
				}
				
				rangeSlider_text1.innerHTML = label;
				
				//first the above code will execute, then the GUI will change
				
				change_handler();
			}
			
			//check if array? and both?
			const rangeSlidersCount = range_values.length;
			
			for(let i = 0; i < rangeSlidersCount; i++)
			{
				var span_padding_workaround = document.createElement('span');
				span_padding_workaround.innerHTML = whiteSpace;
				span_padding_workaround.style.display = "block";
				span_padding_workaround.style.fontSize = "6px";
				
				var input_range = document.createElement('input');
				input_range.id = id + '_0x_' + i;
				input_range.type = "range";
				input_range.min = range_values[i][0];
				input_range.max = range_values[i][1];
				input_range.value = initial_states[i];
				input_range.className = "slider_range";
				
				input_range.dataset.id = id; //custom data-*
				input_range.oninput = myRange;
				
				text1_label_Values += initial_states[i] + ", ";
				
				//var span_value = document.createElement('span'); //inside div_holder |change: span_label will be used
				//span_value.id = id + "_text2";
				//span_value.innerHTML = initial_states[i];
				
				div_holder.appendChild(span_padding_workaround);
				div_holder.appendChild(input_range);
				//div_holder.appendChild(span_value); //span_label will be used
			}
			
			if (rangeSlidersCount == 1)
			{
				text1_label_Values = text1_label_Values.substring(0, text1_label_Values.length - 2);
				span_label.innerHTML = text1_label + ": " + text1_label_Values + whiteSpace;
			}
			else
			{
				text1_label_Values = text1_label_Values.substring(0, text1_label_Values.length - 2);
				span_label.innerHTML = text1_label + " → (" + text1_label_Values + ")" + whiteSpace;
			}	
			
			div_wrapper.appendChild(span_label);
			div_wrapper.appendChild(div_holder);
			//div_wrapper.appendChild(span_value); //already done inside div_holder
			
			
			var custom_object = { id: id, element_ref: div_wrapper, text2_values: range_values, event_handler: myRange, disable_element: null, value: initial_states }; //finish here, make it work fully
			
			
			//will init work for dynamic dom elements? -y.
			
			//label_holder.style.position = "absolute";
			//span_value.style.position = "absolute";
			//
			//label_holder.style.marginTop = "-5px";
			//span_value.style.marginLeft = "100px";
			//span_value.style.color = "#7f7f7f";
			
			custom_object.disable_element = function (disable) {
				//
				//var id = this.id;
				//var toggle = document.getElementById(id); //.checked
				//var toggle_holder = document.getElementById(id + "_holder");
				//var toggle_text1 = document.getElementById(id + "_text1");
				//var toggle_text2 = document.getElementById(id + "_text2");
				//
				//if (disable)
				//{
				//	toggle_holder.style.opacity = "0.5"; //use the holder
				//	toggle.disabled = true;
				//}
				//else
				//{
				//	toggle.disabled = false;
				//	toggle_holder.style.opacity = "1.0"; //use the holder
				//}
			};
			
			document.body.appendChild(div_wrapper);
			
			GUI_helper.gui_demo_controls[id] = custom_object;
			GUI_helper.gui_demo_controls_Array.push(GUI_helper.gui_demo_controls[id]);
		}
	},
	
	//configuration values selected from UI control elements
	gui_settings: null
};


//get constants after this event has happened
document.addEventListener("scannerModuleLoaded", function(e) {
	
	sessionStorage.clear();
	
	var mw_c = mwbScanner.getConstants();
	
	GUI_helper.gui_settings = {
		//
		cameraResolution: {
			values: {
				CamRes_SD: 	{ sdk: mw_c.CamRes_SD,	UI: 0 },	//  640 x  480
				CamRes_HD: 	{ sdk: mw_c.CamRes_HD,	UI: 1 },	// 1280 x  720
				CamRes_FHD:	{ sdk: mw_c.CamRes_FHD,	UI: 2 }		// 1920 x 1080
			},
			default_value: mw_c.CamRes_HD
		},
		
		frontCamera: {
			values: {
				disable: 	Number(false),
				enable: 	Number(true)
			},
			default_value: false
		},
		
		cameraSwitcher: {
			values: {
				disable: 	Number(false),
				enable: 	Number(true)
			},
			default_value: false
		},
		
		flashButton: {
			values: {
				disable: 	Number(false),
				enable: 	Number(true)
			},
			default_value: false
		},
		
		zoomButton: {
			values: {
				disable: 	Number(false),
				enable: 	Number(true)
			},
			default_value: false
		},
		
		closeButton: {
			values: {
				disable: 	Number(false),
				enable: 	Number(true)
			},
			default_value: false
		},
		
		activeCodes: {
			values: {
				QR: 		{ sdk: mw_c.MWB_CODE_MASK_QR, 		UI:  0 },
				DataMatrix: { sdk: mw_c.MWB_CODE_MASK_DM, 		UI:  1 },
				RSS: 		{ sdk: mw_c.MWB_CODE_MASK_RSS, 		UI:  2 },
				Code_39: 	{ sdk: mw_c.MWB_CODE_MASK_39, 		UI:  3 },
				EAN_UPC: 	{ sdk: mw_c.MWB_CODE_MASK_EANUPC, 	UI:  4 },
				Code_128: 	{ sdk: mw_c.MWB_CODE_MASK_128, 		UI:  5 },
				PDF_417: 	{ sdk: mw_c.MWB_CODE_MASK_PDF, 		UI:  6 },
				Aztec: 		{ sdk: mw_c.MWB_CODE_MASK_AZTEC, 	UI:  7 },
				Code_25: 	{ sdk: mw_c.MWB_CODE_MASK_25, 		UI:  8 },
				Code_93: 	{ sdk: mw_c.MWB_CODE_MASK_93, 		UI:  9 },
				Codabar: 	{ sdk: mw_c.MWB_CODE_MASK_CODABAR, 	UI: 10 },
				DotCode: 	{ sdk: mw_c.MWB_CODE_MASK_DOTCODE, 	UI: 11 },
				Code_11: 	{ sdk: mw_c.MWB_CODE_MASK_11, 		UI: 12 },
				MSI: 		{ sdk: mw_c.MWB_CODE_MASK_MSI, 		UI: 13 },
				MaxiCode: 	{ sdk: mw_c.MWB_CODE_MASK_MAXICODE, UI: 14 },
				POSTAL: 	{ sdk: mw_c.MWB_CODE_MASK_POSTAL, 	UI: 15 },
				Telepen: 	{ sdk: mw_c.MWB_CODE_MASK_TELEPEN, 	UI: 16 }
			},
			default_value: { 
				sdk: 
					mw_c.MWB_CODE_MASK_QR | 
					mw_c.MWB_CODE_MASK_DM | 
					//mw_c.MWB_CODE_MASK_RSS | 
					//mw_c.MWB_CODE_MASK_39 | 
					mw_c.MWB_CODE_MASK_EANUPC | 
					mw_c.MWB_CODE_MASK_128 | 
					mw_c.MWB_CODE_MASK_PDF | 
					//mw_c.MWB_CODE_MASK_AZTEC | 
					//mw_c.MWB_CODE_MASK_25 | 
					//mw_c.MWB_CODE_MASK_93 | 
					//mw_c.MWB_CODE_MASK_CODABAR | 
					//mw_c.MWB_CODE_MASK_DOTCODE | 
					//mw_c.MWB_CODE_MASK_11 | 
					//mw_c.MWB_CODE_MASK_MSI | 
					//mw_c.MWB_CODE_MASK_MAXICODE | 
					//mw_c.MWB_CODE_MASK_POSTAL | 
					//mw_c.MWB_CODE_MASK_TELEPEN | 
					0x0, //for binary-OR syntax purposes
				UI: 
					[true, true, false, false, true, true, true, false, false, false, false, false, false, false, false, false, false] //contains QR | DM | EAN/UPC | CODE128 | PDF
			}
		},
		
		effortLevel: {
			values: {
				Quick: 		{ sdk: 1, UI: 0 },	//effort level 1
				Normal: 	{ sdk: 2, UI: 1 },	//effort level 2
				High: 		{ sdk: 3, UI: 2 },	//effort level 3
				VeryHigh: 	{ sdk: 4, UI: 3 },	//effort level 4
				UltraHigh: 	{ sdk: 5, UI: 4 }	//effort level 5
			},
			default_value: { sdk: 2, UI: 1 }	//(2) Normal
		},
		
		partialView: { // !fullScreen
			values: {
				disable: 	Number(false),
				enable: 	Number(true)
			},
			default_value: true
		},
		
		partialView_XYWH: {
			values: null, //0-100 for each
			default_value: [5, 15, 90, 50]
		},
		
		continuous: {
			values: {
				disable: 	Number(false),
				enable: 	Number(true)
			},
			default_value: false
		},
		
		parser: {
			values: {
				disable: 	Number(false),
				enable: 	Number(true)
			},
			default_value: true
		},
		
		timeout: {
			values: null, //10-60s
			default_value: [30]
		},
		
		dps: {
			values: null, //1-30 (fps max)
			default_value: [2]
		}
	};
	
	//helper methods
	GUI_helper.gui_settings.sdk_to_UI_value = function (sdk_value, setting) {
		
		let setting_values = setting.values;
		let value_Key = Object.keys(setting_values).find(key => setting_values[key].sdk === Number(sdk_value));
		let value_UI = setting.values[value_Key].UI;
		
		return value_UI;
	};
	
	GUI_helper.gui_settings.UI_to_sdk_value = function (value_UI, setting) {
		
		let setting_values = setting.values;
		let value_Key = Object.keys(setting_values).find(key => setting_values[key].UI === Number(value_UI));
		let sdk_value = setting.values[value_Key].sdk;
		
		return sdk_value;
	};
	
	GUI_helper.gui_settings.UI_array_to_sdk_value = function (value_UI, setting) {
		
		let union_mask = 0;
		
		let count = Object.keys(setting.values).length;

		for (let i = 0; i < count; i++)
		{
			if (value_UI[i]) {
				let mask_i = Math.pow(2, i); //can also use UI_helper.gui_settings.UI_to_sdk_value(i, setting)
				union_mask = union_mask | mask_i;
			}
		}
		
		return union_mask;
	};
	
	GUI_helper.gui_settings.sdk_to_UI_array_value = function (sdk_value, setting) {
		
		let value_UI = [];
		sdk_value = Number(sdk_value);
		
		let count = Object.keys(setting.values).length;

		for (let i = 0; i < count; i++)
		{
			let mask_i = Math.pow(2, i); //can also use UI_helper.gui_settings.UI_to_sdk_value(i, setting)
			if ((sdk_value & mask_i) == mask_i) {
				value_UI.push(true);
			}
			else value_UI.push(false);
		}
		
		return value_UI;
	};
	
	//Your custom configuration is set here:
	
	//configuration values selected from UI control elements will be
	//stored in sessionStorage to be accessible from any environment
	
	//any value assigned to localStorage/sessionStorage is automatically converted to string
	sessionStorage.cameraResolution_config_value = GUI_helper.gui_settings.cameraResolution.values.CamRes_HD.sdk;
	sessionStorage.frontCamera_config_value = GUI_helper.gui_settings.frontCamera.values.disable;
	sessionStorage.effortLevel_config_value = GUI_helper.gui_settings.effortLevel.values.Normal.sdk;
	sessionStorage.activeCodes_config_value = 
		GUI_helper.gui_settings.activeCodes.values.QR.sdk | 
		GUI_helper.gui_settings.activeCodes.values.DataMatrix.sdk | 
		GUI_helper.gui_settings.activeCodes.values.EAN_UPC.sdk | 
		GUI_helper.gui_settings.activeCodes.values.Code_128.sdk | 
		GUI_helper.gui_settings.activeCodes.values.PDF_417.sdk | 
		0x0; //for binary-OR syntax purposes
	sessionStorage.continuous_config_value = GUI_helper.gui_settings.continuous.values.disable;
	sessionStorage.cameraSwitcher_config_value = GUI_helper.gui_settings.cameraSwitcher.values.enable;
	sessionStorage.flashButton_config_value = GUI_helper.gui_settings.flashButton.values.enable;
	sessionStorage.zoomButton_config_value = GUI_helper.gui_settings.zoomButton.values.enable;
	sessionStorage.closeButton_config_value = GUI_helper.gui_settings.closeButton.values.enable;
	sessionStorage.parser_config_value = GUI_helper.gui_settings.parser.values.enable;
	sessionStorage.timeout_config_value = GUI_helper.gui_settings.timeout.default_value[0]; //30
	sessionStorage.dps_config_value = GUI_helper.gui_settings.dps.default_value[0]; //2
	
	
	add_gui_controls();
	
});

var add_gui_controls = function(){

//breathing space between UI control elements

var br = [];
var brCount = 0;
for (let i = 0; i < 50; i++) {
	var br1 = document.createElement('br');
	br.push(br1);
}

//handler methods for clicks or state change on UI control elements

var select_CamRes_handler = function (call_value) {
	
	var value = call_value;
	
	if (typeof value == 'undefined')
	{
		value = GUI_helper.gui_demo_controls["select_CamRes"].value - 1; //(-1) because select needs one more place on start to show the picked value
		
		value = GUI_helper.gui_settings.UI_to_sdk_value(value, GUI_helper.gui_settings.cameraResolution);
	}
	
	if (log_info)
		console.log('Setting ' + value + ' for camera resolution.');

	sessionStorage.cameraResolution_config_value = value;
};

var toggle_FrontCam_handler = function (call_value) {
	
	var value = (typeof call_value != 'undefined') ? call_value : GUI_helper.gui_demo_controls["toggle_FrontCam"].value;

	if (log_info)
		console.log('Setting ' + value + ' for front camera.');

	sessionStorage.frontCamera_config_value = Number(value);

	//note, its only applicable for mobile devices with 2 cameras
};

var toggle_CamSwitch_handler = function (call_value) {
	
	var value = (typeof call_value != 'undefined') ? call_value : GUI_helper.gui_demo_controls["toggle_CamSwitch"].value;

	if (log_info)
		console.log('Setting ' + value + ' for camera switcher.');

	sessionStorage.cameraSwitcher_config_value = Number(value);

	//note, its only applicable for mobile devices with multiple cameras
};

var toggle_Flash_handler = function (call_value) {
	
	var value = (typeof call_value != 'undefined') ? call_value : GUI_helper.gui_demo_controls["toggle_Flash"].value;

	if (log_info)
		console.log('Setting ' + value + ' for flash button.');

	sessionStorage.flashButton_config_value = Number(value);
};

var toggle_Zoom_handler = function (call_value) {
	
	var value = (typeof call_value != 'undefined') ? call_value : GUI_helper.gui_demo_controls["toggle_Zoom"].value;

	if (log_info)
		console.log('Setting ' + value + ' for zoom button.');

	sessionStorage.zoomButton_config_value = Number(value);
};

var toggle_Close_handler = function (call_value) {
	//
	//console.log(call_value);
	var value = (typeof call_value != 'undefined') ? call_value : GUI_helper.gui_demo_controls["toggle_Close"].value;

	if (log_info)
		console.log('Setting ' + value + ' for close button.');

	sessionStorage.closeButton_config_value = Number(value);
	
	//console.log(sessionStorage.closeButton_config_value); //
};

var union_ActiveCodes_handler = function (call_value) {
	
	var value = call_value;
	
	if (typeof value == 'undefined')
	{
		value = GUI_helper.gui_demo_controls["union_ActiveCodes"].value; //value is an array
		
		value = GUI_helper.gui_settings.UI_array_to_sdk_value(value, GUI_helper.gui_settings.activeCodes);
	}
	
	if (log_info)
		console.log('Setting ' + value + ' as active codes.');

	sessionStorage.activeCodes_config_value = value;
};

var select_EffortLVL_handler = function (call_value) {
	
	var value = call_value;
	
	if (typeof value == 'undefined')
	{
		value = GUI_helper.gui_demo_controls["select_EffortLVL"].value - 1; //(-1) because select needs one more place on start to show the picked value
		
		value = GUI_helper.gui_settings.UI_to_sdk_value(value, GUI_helper.gui_settings.effortLevel);
	}
	
	if (log_info)
		console.log('Setting ' + value + ' as effort level.');

	sessionStorage.effortLevel_config_value = value;
};

window.xywh_value = GUI_helper.gui_settings.partialView_XYWH.default_value;
var toggle_FullScreen_handler = function (call_value) {
	//
	var value = (typeof call_value != 'undefined') ? call_value : GUI_helper.gui_demo_controls["toggle_FullScreen"].value;

	if (!value) //value - true for PartialView, false for FullScreen
	{
		GUI_helper.gui_demo_controls["range_XYWH"].element_ref.style.visibility = "hidden";

		if (log_info)
			console.log('Setting ' + 'Full Screen' + ' for scanner preview mode.');
		
		mwbScanner.resizePartialScanner(0, 0, 100, 100);
		window.xywh_value = [0, 0, 100, 100];
	}
	else
	{
		GUI_helper.gui_demo_controls["range_XYWH"].element_ref.style.visibility = "visible";

		if (log_info)
			console.log('Setting ' + 'Partial View' + ' for scanner preview mode.');
		
		mwbScanner.resizePartialScanner.apply(null, GUI_helper.gui_demo_controls["range_XYWH"].value);
		window.xywh_value = GUI_helper.gui_demo_controls["range_XYWH"].value;
	}
};

var range_XYWH_handler = function (call_value) {
	//
	var value = (typeof call_value != 'undefined') ? call_value : GUI_helper.gui_demo_controls["range_XYWH"].value; //array
	
	if (log_info)
		console.log('Setting ' + value + ' for scanner preview.');
	
	mwbScanner.resizePartialScanner.apply(null, value);
};

var toggle_Continuous_handler = function (call_value) {
	
	var value = (typeof call_value != 'undefined') ? call_value : GUI_helper.gui_demo_controls["toggle_Continuous"].value;

	if (log_info)
		console.log('Setting ' + value + ' for Continuous.');

	sessionStorage.continuous_config_value = Number(value);
};

var toggle_Parser_handler = function (call_value) {
	
	var value = (typeof call_value != 'undefined') ? call_value : GUI_helper.gui_demo_controls["toggle_Parser"].value;
	
	if (log_info)
		console.log('Setting ' + value + ' for Parsing.');
	
	sessionStorage.parser_config_value = Number(value);
};

var range_DecodeTimer_handler = function (call_value) {
	
	var value = (typeof call_value != 'undefined') ? call_value : GUI_helper.gui_demo_controls["range_DecodeTimer"].value[0];
	
		if (log_info)
			console.log('Setting ' + value + ' for Decoder Timeout.');
	
	sessionStorage.timeout_config_value = Number(value);
};

var range_DpsLimit_handler = function (call_value) {
	
	var value = (typeof call_value != 'undefined') ? call_value : GUI_helper.gui_demo_controls["range_DpsLimit"].value[0];
	
		if (log_info)
			console.log('Setting ' + value + ' for Decodes per second Limit.');
	
	sessionStorage.dps_config_value = Number(value);
};


//inits for all gui controls and initial values that depend from their initial states
var gui_controls_Initial_values = function () {
	//
	select_CamRes_handler(Number(sessionStorage.cameraResolution_config_value));
	toggle_FrontCam_handler(Boolean(Number(sessionStorage.frontCamera_config_value)));
	toggle_CamSwitch_handler(Boolean(Number(sessionStorage.cameraSwitcher_config_value)));
	toggle_Flash_handler(Boolean(Number(sessionStorage.flashButton_config_value)));
	toggle_Zoom_handler(Boolean(Number(sessionStorage.zoomButton_config_value)));
	toggle_Close_handler(Boolean(Number(sessionStorage.closeButton_config_value)));	
	
	union_ActiveCodes_handler(Number(sessionStorage.activeCodes_config_value));
	
	select_EffortLVL_handler(Number(sessionStorage.effortLevel_config_value));
	
	range_XYWH_handler(GUI_helper.gui_settings.partialView_XYWH.default_value);
	toggle_FullScreen_handler(GUI_helper.gui_settings.partialView.default_value); //must be after range_XYWH_handler
	
	toggle_Continuous_handler(Boolean(Number(sessionStorage.continuous_config_value)));
	toggle_Parser_handler(Boolean(Number(sessionStorage.parser_config_value)));
	range_DecodeTimer_handler(Number(sessionStorage.timeout_config_value));
	range_DpsLimit_handler(Number(sessionStorage.dps_config_value));
};

var show_or_hide_gui_controls_on_Scanner_State = function (show) {
	//
	let controlCount = GUI_helper.gui_demo_controls_Array.length;
	
	function show_element(control_element) {
		control_element.element_ref.style.visibility = "visible";
		let cond = control_element.id.startsWith("toggle_");
		if (cond)
			control_element.disable_element(false, false); //(disable, hide)
	}
	
	function hide_element(control_element) {
		control_element.element_ref.style.visibility = "hidden";
		let cond = control_element.id.startsWith("toggle_");
		if (cond)
			control_element.disable_element(false, true); //(disable, hide)
	}

	if (!show) {
		for (let i = 0; i < controlCount; i++)
		{
			hide_element(GUI_helper.gui_demo_controls_Array[i]);
		}
	} else {
		for (let i = 0; i < controlCount; i++)
		{
			show_element(GUI_helper.gui_demo_controls_Array[i]);
		}
		
		toggle_FullScreen_handler(); //must be after range_XYWH_handler
	}
};

document.body.appendChild(br[brCount++]);
document.body.appendChild(br[brCount++]);
document.body.appendChild(br[brCount++]);
document.body.appendChild(br[brCount++]);

let cameraResolution_value_UI = GUI_helper.gui_settings.sdk_to_UI_value(sessionStorage.cameraResolution_config_value, GUI_helper.gui_settings.cameraResolution);

GUI_helper.gui_demo.generateCustomSelectControl("select_CamRes", "Camera Resolution ", ["Select camera resolution:", "SD 480p", "HD 720p", "Full HD 1080p"], cameraResolution_value_UI, select_CamRes_handler);
document.body.appendChild(br[brCount++]);
Boolean(Number(sessionStorage.frontCamera_config_value))

GUI_helper.gui_demo.generateCustomToggleControl("toggle_FrontCam", "Front Camera", ["Back", "Front"], Boolean(Number(sessionStorage.frontCamera_config_value)), toggle_FrontCam_handler);
document.body.appendChild(br[brCount++]);

GUI_helper.gui_demo.generateCustomToggleControl("toggle_CamSwitch", "Camera Switcher", ["Disable", "Enable"], Boolean(Number(sessionStorage.cameraSwitcher_config_value)), toggle_CamSwitch_handler);
document.body.appendChild(br[brCount++]);

GUI_helper.gui_demo.generateCustomToggleControl("toggle_Flash", "Flash button", ["Disable", "Enable"], Boolean(Number(sessionStorage.flashButton_config_value)), toggle_Flash_handler);
document.body.appendChild(br[brCount++]);

GUI_helper.gui_demo.generateCustomToggleControl("toggle_Zoom", "Zoom button", ["Disable", "Enable"], Boolean(Number(sessionStorage.zoomButton_config_value)), toggle_Zoom_handler);
document.body.appendChild(br[brCount++]);

GUI_helper.gui_demo.generateCustomToggleControl("toggle_Close", "Close button", ["Disable", "Enable"], Boolean(Number(sessionStorage.closeButton_config_value)), toggle_Close_handler);
document.body.appendChild(br[brCount++]);


let activeCodes_value_UI = GUI_helper.gui_settings.sdk_to_UI_array_value(sessionStorage.activeCodes_config_value, GUI_helper.gui_settings.activeCodes);

GUI_helper.gui_demo.generateCustomCheckboxesControl("union_ActiveCodes", "Active Codes", ["QR", "DM", "RSS", "CODE 39", "EAN / UPC", "CODE 128", "PDF", "AZTEC", "CODE 25", "CODE 93", "CODABAR", "DOTCODE", "CODE 11", "MSI", "MAXICODE", "POSTAL", "TELEPEN"], activeCodes_value_UI, union_ActiveCodes_handler);
document.body.appendChild(br[brCount++]);

let effortLevel_value_UI = GUI_helper.gui_settings.sdk_to_UI_value(sessionStorage.effortLevel_config_value, GUI_helper.gui_settings.effortLevel);

GUI_helper.gui_demo.generateCustomSelectControl("select_EffortLVL", "Decoding Effort", ["Select effort level:", "(1) Quick", "(2) Normal", "(3) High", "(4) Very High", "(5) Ultra High"], effortLevel_value_UI, select_EffortLVL_handler);
document.body.appendChild(br[brCount++]);

GUI_helper.gui_demo.generateCustomToggleControl("toggle_FullScreen", "Scanner Preview Mode", ["Full Screen", "Partial View"], GUI_helper.gui_settings.partialView.default_value, toggle_FullScreen_handler);
document.body.appendChild(br[brCount++]);

GUI_helper.gui_demo.generateCustomRangeSliderControl("range_XYWH", "Partial View XYWH", [[0, 100], [0, 100], [0, 100], [0, 100]], GUI_helper.gui_settings.partialView_XYWH.default_value, range_XYWH_handler);
document.body.appendChild(br[brCount++]);

GUI_helper.gui_demo.generateCustomToggleControl("toggle_Continuous", "Continuous scanning", ["Stop on success", "Continuous"], Boolean(Number(sessionStorage.continuous_config_value)), toggle_Continuous_handler);
document.body.appendChild(br[brCount++]);

GUI_helper.gui_demo.generateCustomToggleControl("toggle_Parser", "Parse Result", ["No", "Yes"], Boolean(Number(sessionStorage.parser_config_value)), toggle_Parser_handler);
document.body.appendChild(br[brCount++]);

//--
GUI_helper.gui_demo.generateCustomRangeSliderControl("range_DecodeTimer", "Decoder Timeout", [[10, 60]], [Number(sessionStorage.timeout_config_value)], range_DecodeTimer_handler);
document.body.appendChild(br[brCount++]);

GUI_helper.gui_demo.generateCustomRangeSliderControl("range_DpsLimit", "Dps Limit", [[1, 30]], [Number(sessionStorage.dps_config_value)], range_DpsLimit_handler);
document.body.appendChild(br[brCount++]);

document.body.appendChild(br[brCount++]);
document.body.appendChild(br[brCount++]);

GUI_helper.gui_demo.init_customSelects();
gui_controls_Initial_values();
show_or_hide_gui_controls_on_Scanner_State(false);

window.show_or_hide = show_or_hide_gui_controls_on_Scanner_State;

};