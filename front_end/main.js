  //<<<<<<<<<<<<<<>>>>>>>>>>>>>
  //----
  //exporting API methods:
  //Scanner already exists from MWBScanner_wa.js
  var mwbScanner = new Scanner(); //instantiate
  
  var wasmPath = (typeof setWasmPath == "function") ? setWasmPath() : "index.wasm";
  
  var module_loaded = false;
  
  //-----
  var Module = {
	wasmBinaryFile: wasmPath || "index.wasm",
	preRun: [],
	postRun: [],
	print: (function() {
		  return function(text) {
			  //-------------
			  if (module_loaded) return;
			  //Wrapped native API methods:
				if (mwb_debug_print) console.log(text); module_loaded = true;
				
				//Get Common Scanner Information GROUP
				BarcodeScanner.MWBgetVersion = Module.cwrap('info_MWBgetVersion', 'string', []);
				
				//Configure Common Scanner Parameters/Settings GROUP
				BarcodeScanner.MWBinitDecoder	 	= mwbScanner.generateMethod('cfg_', 'MWBinitDecoder');
				BarcodeScanner.MWBsetActiveCodes 	= mwbScanner.generateMethod('cfg_', 'MWBsetActiveCodes');
				BarcodeScanner.MWBgetActiveCodes 	= mwbScanner.generateMethod('cfg_', 'MWBgetActiveCodes'); //internal use only
				BarcodeScanner.MWBsetLevel 			= mwbScanner.generateMethod('cfg_', 'MWBsetLevel');
				BarcodeScanner.MWBsetActiveParser 	= mwbScanner.generateMethod('cfg_', 'MWBsetActiveParser');
				
				//Configure Advanced Scanner Parameters/Settings GROUP
				BarcodeScanner.MWBsetActiveSubcodes = mwbScanner.generateMethod('acfg_', 'MWBsetActiveSubcodes');
				BarcodeScanner.MWBsetFlags 			= mwbScanner.generateMethod('acfg_', 'MWBsetFlags');
				BarcodeScanner.MWBsetMinLength 		= mwbScanner.generateMethod('acfg_', 'MWBsetMinLength');
				BarcodeScanner.MWBsetDirection 		= mwbScanner.generateMethod('acfg_', 'MWBsetDirection');
				BarcodeScanner.MWBsetScanningRect 	= mwbScanner.generateMethod('acfg_', 'MWBsetScanningRect');
				BarcodeScanner.MWBgetScanningRect 	= Module.cwrap('acfg_MWBgetScanningRect', 'string', ['number']); //internal use only
				BarcodeScanner.MWBsetParam 			= mwbScanner.generateMethod('acfg_', 'MWBsetParam');
				
				BarcodeScanner.MWBduplicateCodeDelay = mwbScanner.generateMethod('acfg_', 'MWBduplicateCodeDelay');
				
				if (typeof Module._free == "undefined")
				Module._free = Module.cwrap('helper_MWBfree', 'number', ['number']); //internal use only
				
				const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
				//await wait(1);
				
				scannerConfig(); //notification that scanner is ready can be sent here
				
				
				if (mwb_debug_print) console.log('scannerConfig completed');
				
	};
	})()
  };