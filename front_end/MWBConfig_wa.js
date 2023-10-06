/*
*	USAGE: INCLUDE WITH  <script type="text/javascript" src="js/MWBConfig_wa.js"></script> in your index.html
*/
var scannerConfig = function(){
	
	let mwb_debug_print = false;	
	if (mwb_debug_print) console.log('scannerConfig called');
	if (mwb_debug_print) console.log(mwbScanner);
	mwbScanner.setIcon("test_img.png");
	
	//Add an event listener
	document.addEventListener("scannerModuleLoaded", function(e) {
		
		console.log(e.detail); //Prints "Scanner is ready."
		
		//can use mwbScanner.* methods now
		
		//Example for getting available cameras and setting a desired camera
		/**
		* foundCameras.id - string hex value of the camera ID
		* foundCameras.label - string value of the camera label / description
		*/
		/*mwbScanner.getCameras().then(function(foundCameras){
			let cameraCount = foundCameras.length;
			console.log("Cameras found: " + cameraCount);
			
			//list found cameras with label / name and id
			for (let i = 0; i < cameraCount; i++)
				console.log("Camera " + i + " name: " + foundCameras[i].label + " with ID: " + foundCameras[i].id);
			
			//use desired camera.id for the param
			let desiredCameraIndex = 0;
			let desiredCameraId = foundCameras[desiredCameraIndex].id;
			mwbScanner.setCamera(desiredCameraId); //overrides the effect of the MWBuseFrontCamera setting
		});*/
		
	});
	
	//if using multicode:
	/**
	* result.code - ""
	* result.type - "Multicode"
	* result.count - the number of detected barcodes
	* result.codes - json array of detected barcodes in the result format below
	*/	
	
	//if using single code (or result.codes array elements in case of using multicode):
	/**
	* result.code - string representation of barcode result
	* result.parsedCode - string json representation of parsed barcode result (if any)
	* result.type - type of barcode detected or 'Cancel' if scanning is canceled
	* result.bytes - bytes array of raw barcode result
	* result.isGS1 - (boolean) barcode is GS1 compliant
	* result.locationPoints - contains rectangle points p1,p2,p3,p4 with the corresponding x,y
	* result.imageWidth - Width of the scanned image
	* result.imageHeight - Height of the scanned image
	*/
	
	//if an error has occured related to camera use after calling startScanning
	/**
	* result.code - string representation of a user-friendly error description
	* result.type - "Error"
	* result.errorDetails - an object containing error properties (name, message) and various explanations (mozilla, userFriendly, mostLikelyCause)
	*/
	
	//Here we have a straight forward callback that just alerts the value.
	//This callback will be set as default and mwbScanner.startScanner can be called without inline callbacks
	//However users still have the option to not even use setCallback, and set a callback function directly passed as parameter to mwbScanner.startScanner
    mwbScanner.setCallback(
		function (result) {
		
			if (result.type == "Multicode")
			{
				var resultCodes_string = "";
				let foundCodes = result.count;
				for (let i = 0; i < foundCodes; i++)
				{
					resultCodes_string += result.codes[i].type + '\n' + result.codes[i].code + '\n';
					
				}
				alert(result.type + '\n\n' + resultCodes_string);
			}
			else
			{
				if (result.type == "Cancel") console.log("No Barcode.");
				else alert(result.type + '\n' + result.code);
			}
		
			//mwbScanner.resumeScanning(); //if using !MWBcloseScannerOnDecode
		}
	);


    // Some predefined settings, comment out the ones you don't want enabled
    var mw_c = mwbScanner.getConstants(),
	settings = [
		{"method" : "MWBsetActiveCodes", "value" : [
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
			0x0 //for binary-OR syntax purposes
		]}
		,{"method" : "MWBsetLevel", "value" : [2]} //3 will try to scan harder than the default which is 2
		,{"method" : "MWBsetActiveParser", "value" : [mw_c.MWP_PARSER_MASK_NONE]}
		//,{"method" : "MWBenableFlash", "value" : [true]}
		//,{"method" : "MWBturnFlashOn", "value" : [true]}
		//,{"method" : "MWBenableZoom", "value" : [true]}
		//,{"method" : "MWBsetZoomLevel", "value" : [1]} //0 - no zoom, 1 - 50% or 2 - max zoom, supported only by chrome
		//,{"method" : "MWBenableClose", "value" : [false]}
		//,{"method" : "MWBenableCameraSwitcher", "value" : [true]}
		//,{"method" : "MWBsetOverlayMode", "value" : [mw_c.OverlayModeImage]}
		//,{"method" : "MWBsetBlinkingLineVisible", "value" : [true]}
		//,{"method" : "MWBsetPauseMode", "value" : [mw_c.PM_STOP_BLINKING]}
		//,{"method" : "MWBusePartialScanner", "value" : [false]}
		,{"method" : "MWBenableHiRes", "value" : [mw_c.CamRes_HD]} //accepts boolean (false - 480p, true - 720p) or constants (mw_c.CamRes_SD - 480p, mw_c.CamRes_HD - 720p, mw_c.CamRes_FHD - 1080p)
		//,{"method" : "MWBuseFrontCamera", "value" : [false]}
		//,{"method" : "MWBenableMirroredPreview", "value" : [mw_c.MIRROR_FRONTCAM]}
		,{"method" : "MWBsetCameraSwitcherOptions", "value" : [
			//mw_c.CAMERA_SWITCHER_INIT_ON_START | 
			//mw_c.CAMERA_SWITCHER_USE_ON_START | 
			//mw_c.CAMERA_SWITCHER_USE_BEST_CAMERA | 
			
			0x0 //for binary-OR syntax purposes
		]}
		//,{"method" : "MWBcloseScannerOnDecode", "value" : [false]}
		,{"method" : "MWBsetDecoderTimeout", "value" : [30]} //10-60, 0 to disable
		,{"method" : "MWBsetDpsLimit", "value" : [2]} //1-30
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_25, 2, 2, 96, 96]}
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_39, 2, 2, 96, 96]}
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_93, 2, 2, 96, 96]}
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_128, 2, 2, 96, 96]}
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_AZTEC, 20, 2, 60, 96]}
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_DM, 20, 2, 60, 96]}
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_EANUPC, 2, 2, 96, 96]}
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_PDF, 2, 2, 96, 96]}
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_QR, 20, 2, 60, 96]} //for some reason decoding QR codes is harder when the code fills up the viewfinder
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_RSS, 2, 2, 96, 96]}
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_CODABAR, 2, 2, 96, 96]}
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_DOTCODE, 30, 20, 40, 60]}
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_11, 2, 2, 96, 96]}
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_MSI, 2, 2, 96, 96]}
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_MAXICODE, 20, 2, 60, 96]}
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_POSTAL, 2, 2, 96, 96]}
		//,{"method" : "MWBsetScanningRect", "value" : [mw_c.MWB_CODE_MASK_TELEPEN, 2, 2, 96, 96]}
		//,{"method" : "MWBsetMinLength", "value" : [mw_c.MWB_CODE_MASK_25, 5]}
		//,{"method" : "MWBsetMinLength", "value" : [mw_c.MWB_CODE_MASK_39, 5]}
		//,{"method" : "MWBsetMinLength", "value" : [mw_c.MWB_CODE_MASK_MSI, 5]}
		//,{"method" : "MWBsetMinLength", "value" : [mw_c.MWB_CODE_MASK_CODABAR, 5]}
		//,{"method" : "MWBsetMinLength", "value" : [mw_c.MWB_CODE_MASK_11, 5]}
		//,{"method" : 'MWBsetDirection', "value" : [mw_c.MWB_SCANDIRECTION_VERTICAL | mw_c.MWB_SCANDIRECTION_HORIZONTAL]}
	];
		
	return mwbScanner.loadSettings(settings)
				.then(function(response){
					if (mwb_debug_print) console.log(response); //the response is the settings array
				})
				.catch(function(reason){
					if (mwb_debug_print) console.log(reason)
				});
}
var setWasmPath = function(){
	return "index.wasm";
}