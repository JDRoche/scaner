/*
Changelog: https://cmbdn.cognex.com/downloads/changelog/cmbWEB/cmbweb-web-assembly
*/

 var CONSTANTS = {
	/** @name Grayscale image size range
	 ** @{ */
	MWB_GRAYSCALE_LENX_MIN :      10,
	MWB_GRAYSCALE_LENX_MAX :      5000,
	MWB_GRAYSCALE_LENY_MIN :      10,
	MWB_GRAYSCALE_LENY_MAX :      5000,
	/** @} */


	/** @brief  Code39 decoder flags value: require checksum check
	*/
	MWB_CFG_CODE39_REQUIRE_CHECKSUM :  0x2,
	/**/

	/** @brief  Code39 decoder flags value: don't require stop symbol - can lead to false results
	*/
	MWB_CFG_CODE39_DONT_REQUIRE_STOP : 0x4,
	/**/

	/** @brief  Code39 decoder flags value: decode full ASCII
	*/
	MWB_CFG_CODE39_EXTENDED_MODE :      0x8,
	/**/
	
	/** @brief  Code39 decoder flags value: Try decoding result to CODE32. if failed, Code39 will return
	*/
	MWB_CFG_CODE39_CODE32_ENABLED :      0x10,
	/**/

	/** @brief  Code39 decoder flags value: ADD 'A' prefix to Code32 result
	*/
	MWB_CFG_CODE39_CODE32_PREFIX :      0x20,
	/**/


	/** @brief  Code93 decoder flags value: decode full ASCII
	*/
	MWB_CFG_CODE93_EXTENDED_MODE :      0x8,
	/**/


	/** @brief  Code25 decoder flags value: require checksum check
	 * MWB_CFG_CODE25_REQ_CHKSUM is deprecated and shouldn't be used in combination with other checksum flags
	*/
	MWB_CFG_CODE25_REQ_CHKSUM               : 0x01,
	MWB_CFG_CODE25_REQ_CHKSUM_STANDARD      : 0x02,
	MWB_CFG_CODE25_REQ_CHKSUM_INTERLEAVED   : 0x04,
	MWB_CFG_CODE25_REQ_CHKSUM_IATA          : 0x08,
	MWB_CFG_CODE25_REQ_CHKSUM_MATRIX        : 0x10,
	MWB_CFG_CODE25_REQ_CHKSUM_COOP          : 0x20,
	MWB_CFG_CODE25_REQ_CHKSUM_INVERTED      : 0x40,
	/**/


	/** @brief  Code11 decoder flags value: require checksum check
	* Requires single checksum. Set by default.
	*/
	MWB_CFG_CODE11_REQ_SINGLE_CHKSUM:         0x1,
	/**/
	
	/** @brief  Code11 decoder flags value: require checksum check
	* Requires double checksum.
	*/
	MWB_CFG_CODE11_REQ_DOUBLE_CHKSUM:         0x2,
	/**/

	/** @brief  MSI Plessey decoder flags value: require checksum check
	* Use mod 10 checksum. Set by default.
	*/
	MWB_CFG_MSI_REQ_10_CHKSUM :                 0x01,
	/**/
	
	/** @brief  MSI Plessey decoder flags value: require checksum check
	* Use mod 10 mod 10 checksum.
	*/
	MWB_CFG_MSI_REQ_1010_CHKSUM :               0x02,
	/**/
	
	/** @brief  MSI Plessey decoder flags value: require checksum check
	* Use mod 11 checksum (IBM algorithm).
	*/
	MWB_CFG_MSI_REQ_11_IBM_CHKSUM :             0x04,
	/**/
	
	/** @brief  MSI Plessey decoder flags value: require checksum check
	* Use mod 11 checksum (NCR algorithm).
	*/
	MWB_CFG_MSI_REQ_11_NCR_CHKSUM :             0x08,
	/**/
	
	/** @brief  MSI Plessey decoder flags value: require checksum check
	* Use mod 11 mod 10 checksum (IBM algorithm).
	*/
	MWB_CFG_MSI_REQ_1110_IBM_CHKSUM :           0x10,
	/**/
	
	/** @brief  MSI Plessey decoder flags value: require checksum check
	* Use mod 11 mod 10 checksum (NCR algorithm)
	*/
	MWB_CFG_MSI_REQ_1110_NCR_CHKSUM :           0x20,
	/**/


	/** @brief  Codabar decoder flags value: include start/stop symbols in result
	*/
	MWB_CFG_CODABAR_INCLUDE_STARTSTOP :        0x1,
	/**/


	/** @brief  Datamatrix decoder flags value: enable DPM mode
	  */
	MWB_CFG_DM_DPM_MODE :      0x2,
	/**/


	/** @brief  Telepen decoder flags
	 */
	MWB_CFG_TELEPEN_FORCE_NUMERIC :      0x1,
	/**/


	/** @brief  Barcode decoder param types
	*/
	MWB_PAR_ID_ECI_MODE :            0x08,
	MWB_PAR_ID_RESULT_PREFIX :       0x10,
	MWB_PAR_ID_VERIFY_LOCATION :	 0x20,
	
	/** Scan color: working for Datamatrix currently
	*/
	MWB_PAR_ID_SCAN_COLOR :			 0x40,
	/**/


	/** @brief  Barcode param values
	* Default for ECI (ECI is DM only)
	*/
	MWB_PAR_VALUE_ECI_DISABLED :    0x00, //default
	MWB_PAR_VALUE_ECI_ENABLED :     0x01,
	/**/
	
	/** @brief  Barcode param values
	* Default for result prefix (all symbologies except DataBar / RSS)
	*/
	MWB_PAR_VALUE_RESULT_PREFIX_NEVER :   0x00, //default
	MWB_PAR_VALUE_RESULT_PREFIX_ALWAYS :  0x01,
	/** Default for result prefix for DataBar / RSS only
	*/
	MWB_PAR_VALUE_RESULT_PREFIX_DEFAULT : 0x02,
	/**/
	
	MWB_PAR_VALUE_VERIFY_LOCATION_OFF :   0x00,
	MWB_PAR_VALUE_VERIFY_LOCATION_ON :  0x01,
	
	MWB_PAR_VALUE_COLOR_NORMAL :  		0x01,
	MWB_PAR_VALUE_COLOR_INVERTED :  	0x02,
	
	/** @brief  Barcode param values
	* Default for color (all symbologies)
	*/
	MWB_PAR_VALUE_COLOR_BOTH :  		0x04, //default
	/**/


	/** @brief  UPC/EAN decoder disable addons detection
	*/
	MWB_CFG_EANUPC_DISABLE_ADDON :  0x1,
	MWB_CFG_EANUPC_DONT_EXPAND_UPCE :   0x2,
	/**/


	/** @brief  Global decoder flags value: apply sharpening on input image
	*/
	MWB_CFG_GLOBAL_HORIZONTAL_SHARPENING :          0x01,
	MWB_CFG_GLOBAL_VERTICAL_SHARPENING :            0x02,
	MWB_CFG_GLOBAL_SHARPENING :                     0x03,
	
	/** @brief  Global decoder flags value: apply rotation on input image
	*/
	MWB_CFG_GLOBAL_ROTATE90 :                       0x04,
	MWB_CFG_GLOBAL_ROTATE180:                       0x08,


	/** @brief  Global decoder flags value: calculate location for 1D barcodeTypes (Code128, Code93, Code39 supported)
	*/
	MWB_CFG_GLOBAL_CALCULATE_1D_LOCATION   :  0x10,

	/** @brief  Global decoder flags value: fail 1D decode if result is not confirmed by location expanding (Code128, Code93, Code39 supported)
	*/
	MWB_CFG_GLOBAL_VERIFY_1D_LOCATION    :   0x20,
	
	/** @brief  Global decoder flags value: fail decode if result is not touching the center of viewfinder (2D + Code128, Code93, Code39 supported)
	* 1D locaiton flags will be enabled automatically with this one
	*/
	MWB_CFG_GLOBAL_USE_CENTRIC_SCANNING  :   0x40,
	
	/** @brief  Global decoder flags value: disable some image pre-processing, suitable for devices with weak CPU
	  */
	MWB_CFG_GLOBAL_DISABLE_PREPROCESSING :            0x80,
	
	/** @brief  Global decoder flags value: Enable multiple barcode detection in single image
	  */
	MWB_CFG_GLOBAL_ENABLE_MULTI :                    0x100,
	
	/** @brief  Global decoder flags value: multiple scan lines density
	  */
	MWB_CFG_GLOBAL_SCANLINESx2 :                    0x200,
	MWB_CFG_GLOBAL_SCANLINESx4 :                    0x400,
	MWB_CFG_GLOBAL_SCANLINESx8 :                    0x800,


	/** @brief  Code39 decoder flags value: require checksum check
	*/
	MWB_CFG_CODE39_REQ_CHKSUM            :    0x2,
	/**/


	/**
	* @name Bit mask identifiers for supported decoder types
	* @{ */
	MWB_CODE_MASK_NONE :             0x00000000,
	MWB_CODE_MASK_QR :               0x00000001,
	MWB_CODE_MASK_DM :               0x00000002,
	MWB_CODE_MASK_RSS :              0x00000004,
	MWB_CODE_MASK_39 :               0x00000008,
	MWB_CODE_MASK_EANUPC :           0x00000010,
	MWB_CODE_MASK_128 :              0x00000020,
	MWB_CODE_MASK_PDF :              0x00000040,
	MWB_CODE_MASK_AZTEC :            0x00000080,
	MWB_CODE_MASK_25 :               0x00000100,
	MWB_CODE_MASK_93 :               0x00000200,
	MWB_CODE_MASK_CODABAR :          0x00000400,
	MWB_CODE_MASK_DOTCODE :          0x00000800,
	MWB_CODE_MASK_11 :               0x00001000,
	MWB_CODE_MASK_MSI :              0x00002000,
	MWB_CODE_MASK_MAXICODE:          0x00004000,
	MWB_CODE_MASK_POSTAL:            0x00008000,
	MWB_CODE_MASK_TELEPEN:           0x00010000,
	MWB_CODE_MASK_ALL :              0x00ffffff,
	/** @} */


	/**
	* @name Bit mask identifiers for RSS decoder types
	* @{ */
	MWB_SUBC_MASK_RSS_14 :           0x00000001,
	MWB_SUBC_MASK_RSS_14_STACK :     0x00000002,
	MWB_SUBC_MASK_RSS_LIM :          0x00000004,
	MWB_SUBC_MASK_RSS_EXP :          0x00000008,
	/** @} */


	/**
	* @name Bit mask identifiers for QR decoder types
	* @{ */
	MWB_SUBC_MASK_QR_STANDARD :      0x00000001,
	MWB_SUBC_MASK_QR_MICRO    :      0x00000002,
	/** @} */
	

	/**
	* @name Bit mask identifiers for PDF decoder types
	* @{ */
	MWB_SUBC_MASK_PDF_STANDARD :      0x00000001,
	MWB_SUBC_MASK_PDF_MICRO    :      0x00000002,
	/** @} */


	/**
	* @name Bit mask identifiers for Code 2 of 5 decoder types
	* @{ */
	MWB_SUBC_MASK_C25_INTERLEAVED :  0x00000001,
	MWB_SUBC_MASK_C25_STANDARD :     0x00000002,
	MWB_SUBC_MASK_C25_ITF14 :        0x00000004,
	MWB_SUBC_MASK_C25_IATA  :        0x00000008,
	MWB_SUBC_MASK_C25_MATRIX :       0x00000010,
	MWB_SUBC_MASK_C25_COOP   :       0x00000020,
	MWB_SUBC_MASK_C25_INVERTED:      0x00000040,
	/** @} */


	/**
	* @name Bit mask identifiers for POSTAL decoder types
	* @{ */
	MWB_SUBC_MASK_POSTAL_POSTNET :   0x00000001,
	MWB_SUBC_MASK_POSTAL_PLANET  :   0x00000002,
	MWB_SUBC_MASK_POSTAL_IM      :   0x00000004,
	MWB_SUBC_MASK_POSTAL_ROYAL   :   0x00000008,
	MWB_SUBC_MASK_POSTAL_AUSTRALIAN :0x00000010,
	/** @} */


	/**
	* @name Bit mask identifiers for UPC/EAN decoder types
	* @{ */
	MWB_SUBC_MASK_EANUPC_EAN_13 :    0x00000001,
	MWB_SUBC_MASK_EANUPC_EAN_8 :     0x00000002,
	MWB_SUBC_MASK_EANUPC_UPC_A :     0x00000004,
	MWB_SUBC_MASK_EANUPC_UPC_E :     0x00000008,
	MWB_SUBC_MASK_EANUPC_UPC_E1 :    0x00000010,
	/** @} */


	/**
	* @name Bit mask identifiers for 1D scanning direction
	* @{ */
	MWB_SCANDIRECTION_HORIZONTAL :   0x00000001,
	MWB_SCANDIRECTION_VERTICAL :     0x00000002,
	MWB_SCANDIRECTION_OMNI :         0x00000004,
	MWB_SCANDIRECTION_AUTODETECT :   0x00000008,
	MWB_SCANDIRECTION_CUSTOM :   	 0x00000010,
	/** @} */


	FOUND_NONE          :   0,
	FOUND_DM            :   1,
	FOUND_39            :   2,
	FOUND_RSS_14        :   3,
	FOUND_RSS_14_STACK  :   4,
	FOUND_RSS_LIM       :   5,
	FOUND_RSS_EXP       :   6,
	FOUND_EAN_13        :   7,
	FOUND_EAN_8         :   8,
	FOUND_UPC_A         :   9,
	FOUND_UPC_E         :   10,
	FOUND_128           :   11,
	FOUND_PDF           :   12,
	FOUND_QR            :   13,
	FOUND_AZTEC         :   14,
	FOUND_25_INTERLEAVED:   15,
	FOUND_25_STANDARD   :   16,
	FOUND_93            :   17,
	FOUND_CODABAR       :   18,
	FOUND_DOTCODE       :   19,
	FOUND_128_GS1       :   20,
	FOUND_ITF14         :   21,
	FOUND_11            :   22,
	FOUND_MSI           :   23,
	FOUND_25_IATA       :   24,
	FOUND_25_MATRIX     :   25,
	FOUND_25_COOP       :   26,
	FOUND_25_INVERTED   :   27,
	FOUND_QR_MICRO      :   28,
	FOUND_MAXICODE      :   29,
	FOUND_POSTNET       :   30,
	FOUND_PLANET        :   31,
	FOUND_IMB           :   32,
	FOUND_ROYALMAIL     :   33,
	FOUND_MICRO_PDF     :   34,
	FOUND_32	        :   35,
	FOUND_AUSTRALIAN    :   36,
	FOUND_TELEPEN	    :   37,


	/** Camera scanning resolutions
    * Available resolutions:
    *   SD		 640x480
    *   HD		1280x720
    *   FHD		1920x1080
    */
	CamRes_SD			: 0,
	CamRes_HD			: 1,
	CamRes_FHD			: 2,	
	
	
	/** Camera switcher options
    * Available options:
	
    *   CAMERA_SWITCHER_INIT_ON_START		 [Deprecated] The camera switcher initialization happens after a startScanning call,
	i.e. on creating a cameraPreview. The operation for listing all available cameras is async, thus it can be awaited
	which ensures the camera list is obtained first before proceeding to starting the camera and scanning, otherwise,
	it would be executed as asynchronous, where the camera and scanning will be started most likely before the camera
	list is obtained. This option will await the initialization, thus it will take longer until the camera and scanning
	is started.
	Note: this option has beed deprecated i.e. it has no effect as camera switcher initialization is always awaited.
	
	*   CAMERA_SWITCHER_USE_ON_START		 By default the MWBuseFrontCamera setting has priority at picking which
	camera (back or front) to use on the cameraPreview, and will continue to be the case until a specific camera is
	picked and switched to from the camera switcher UI. This option will use the first camera from the camera list on
	the start of the cameraPreview, thus the MWBuseFrontCamera setting would no longer have effect.
	Using CAMERA_SWITCHER_USE_ON_START also implies CAMERA_SWITCHER_INIT_ON_START.
	
    *   CAMERA_SWITCHER_USE_BEST_CAMERA 	 [Experimental] Devices with multple back cameras may provide the multple
	back cameras separately rather than as one system, and the wide-angle camera which has no autofocus could be used by
	default. While there is no official indicator which camera has autofocus, based on observed common denominator in
	such cases, this option will try to order the multple found cameras such that the main camera which has autofocus
	will be listed first and used as default.
	
    */
	CAMERA_SWITCHER_INIT_ON_START				: 0x00000001,	
	CAMERA_SWITCHER_USE_ON_START				: 0x00000003,	
	CAMERA_SWITCHER_USE_BEST_CAMERA				: 0x00000004,	
	
	
	/** Overlay modes
	* Available modes:
	*   None	No overlay is displayed
	*   MW		Use MW Dynamic Viewfinder with blinking lines
	*   Image	Show image on top of cameraPreview
	*/
	OverlayModeNone :           0,
	OverlayModeMW :             1,
	OverlayModeImage :          2,
	
	
	/** Mirror modes
	* Available modes:
	*   NONE		No camera preview mirroring is done.
	*   FRONTCAM	Camera preview mirroring is done only when using front cameras.
	*   ALWAYS		Camera preview mirroring is always done.
	*/
	MIRROR_NONE :				0,
	MIRROR_FRONTCAM :			1,
	MIRROR_ALWAYS :				2,
	
	
	/** Pause modes
	* Available modes:
	*   NONE			Nothing happens
	*   PAUSE			Blinking lines are replaced with a pause view
	*   STOP_BLINKING	Blinking lines stop blinking
	*/
	PM_NONE :                   0,
	PM_PAUSE :                  1,
	PM_STOP_BLINKING :          2,


	/**
	* @name Bit mask identifiers for supported parser types
	* @{ */
	MWP_PARSER_MASK_NONE :               0x00000000,
	MWP_PARSER_MASK_GS1  :               0x00000001,
	MWP_PARSER_MASK_IUID :               0x00000002,
	MWP_PARSER_MASK_ISBT :               0x00000004,
	MWP_PARSER_MASK_AAMVA:               0x00000008,
	MWP_PARSER_MASK_HIBC :               0x00000010,
	MWP_PARSER_MASK_SCM  :               0x00000020,
	MWP_PARSER_MASK_AUTO :               0x000000ff
	/** @} */
};


var BarcodeScanner = {
	/**
	* Init decoder with default params.
	*/
	MWBinitDecoder: null, //assigned with cwrap on module load //default settings are the first thing executed in native main
	MWBinitDecoder_arguments: [], //data_types
	
	/**
	* Returns json object of cmbWebVersion, decoderVersion and fullVersion.
	*/
	MWBgetVersion: null, //assigned with cwrap on module load
	MWBgetVersion_arguments: [],
	
	/**
	* Enables or disables symbology types to decode.
	* 
	* @param {number} activeCodes
	* ORed bit flags (MWB_CODE_MASK_...) of symbology types to be activated.
	*/
	MWBsetActiveCodes: null, //assigned with cwrap on module load
	MWBsetActiveCodes_arguments: ['number'],
	
	/**
	* Get active decoder types
	*
	* @retval          Active decoder types
	*/
	MWBgetActiveCodes: null, //assigned with cwrap on module load
	MWBgetActiveCodes_arguments: [],
	
	/**
	* Set active subcodes for given code group flag.
	* Subcodes under some symbology types are all activated by default.
	* 
	* @param {number} codeMask                Single symbology type/group (MWB_CODE_MASK_...)
	* @param {number} subMask                 ORed bit flags of requested symbology subtypes (MWB_SUBC_MASK_)
	*/
	MWBsetActiveSubcodes: null, //assigned with cwrap on module load
	MWBsetActiveSubcodes_arguments: ['number', 'number'],
	
	/**
	* Sets options (if any) for symbology type specified in codeMask.
	* Options are given in  flags as bitwise OR of option bits. Available options depend on selected symbology type.
	*
	* @param {number} codeMask                Single symbology type (MWB_CODE_MASK_...) or 0 for global flags
	* @param {number} flags                   ORed bit mask of selected symbology type options (MWB_FLAG_...) or
	*                                         global flags (MWB_CFG_GLOBAL_...)
	*/
	MWBsetFlags: null, //assigned with cwrap on module load
	MWBsetFlags_arguments: ['number', 'number'],
	
	/**
	* Sets minimum result length for symbology type specified in codeMask.
	*
	* @param {number} codeMask                Single symbology type (MWB_CODE_MASK_...)
	* @param {number} minLength               Minimum result length for selected symbology type
	*/
	MWBsetMinLength: null, //assigned with cwrap on module load
	MWBsetMinLength_arguments: ['number', 'number'],
	
	/**
	* This function enables some control over scanning lines choice for 1D barcodes. By ORing
	* available bit-masks user can add one or more direction options to scanning lines set.
	* 
	* @param {number} direction
	* ORed bit mask of direction modes given with MWB_SCANDIRECTION_... bit-masks
	* 
	* Available direction modes:
	* 	- MWB_SCANDIRECTION_HORIZONTAL - horizontal lines
	* 	- MWB_SCANDIRECTION_VERTICAL - vertical lines
	* 	- MWB_SCANDIRECTION_OMNI - omnidirectional lines
	* 	- MWB_SCANDIRECTION_AUTODETECT - enables BarcodeScanner's autodetection of barcode direction
	*/
	MWBsetDirection: null, //assigned with cwrap on module load
	MWBsetDirection_arguments: ['number'],
	
	/**
	* Sets rectangular area for barcode scanning with selected single symbology type.
	* 
	* After applying this setting, all subsequent scans will be restricted to this region.
	* Only codes inside defined region are decoded. If rectangle is not set, whole image / frame is scanned.
	* If width or height is zero, whole image / frame is scanned.
	*
	* Dimensions parameters (left, top, width, height) are interpreted as percentage of image / frame dimensions,
	* i.e. ranges are 0 - 100 for all parameters.
	*
	* @param {number} codeMask            Single symbology type selector (MWB_CODE_MASK_...)
	* @param {number} left                X coordinate of left edge (percentage)
	* @param {number} top                 Y coordinate of top edge (percentage)
	* @param {number} width               Rectangle witdh (x axis) (percentage)
	* @param {number} height              Rectangle height (y axis) (percentage)
	*/
	MWBsetScanningRect: null, //assigned with cwrap on module load
	MWBsetScanningRect_arguments: ['number', 'number','number', 'number', 'number'],
	
	/**
	 * Get rectangular area for barcode scanning with selected single or multiple decoder type(s).
	 * If codeMask is 0, union rectangle of all ACTIVE barcode types will be returned
	 * Output values are in percentages of screeen width and height (range 0 - 100)
	 *
	 * @param[in]   codeMask             Single decoder type selector (MWB_CODE_MASK_...) or 0
	 * @param[out]  left                 X coordinate of left edge
	 * @param[out]  top                  Y coordinate of top edge
	 * @param[out]  width                Rectangle witdh (x axis)
	 * @param[out]  height               Rectangle height (y axis)
	 *
	 * @retval      MWB_RT_OK            Rectangle get successfully
	 * @retval      MWB_RT_NOT_SUPPORTED Rectangle get failed
	 */
	MWBgetScanningRect: null, //assigned with cwrap on module load - for internal use only
	MWBgetScanningRect_arguments: ['number'],
	
	/**
	* Set the barcode scanner effort level.
	* 
	* Barcode detector relies on image processing and geometry interpolation for
	* extracting optimal data for decoding. Higher effort level involves more processing
	* and intermediate parameter values, thus increasing probability of successful
	* detection with low quality images, but also consuming more CPU time.
	*
	* @param {number} level                   Effort level - available values are 1, 2, 3, 4 and 5.
	*                                         Levels greater than 3 are not suitable for real-time decoding
	*/
	MWBsetLevel: null, //assigned with cwrap on module load
	MWBsetLevel_arguments: ['number'],
	
	/**
	* Choose overlay graphics type for scanning screen:
	* 
	* @param {number} mode
	* Default value is OverlayModeMW
	* 
	* Available overlay modes:
	* OverlayModeNone   - No overlay is displayed
	* OverlayModeMW     - Use MW Dynamic Viewfinder with blinking line (you can customize display options
	*                     by changing defaults)
	* OverlayModeImage  - Show image on top of camera preview
	*/
	MWBsetOverlayMode: function (mode) { 
		MW_properties.global.overlay.mode = ((typeof mode) == 'number') ? mode : 1;
	},
	MWBsetOverlayMode_arguments: ['number'],
	
	/**
	* Customize overlay appearance for OverlayModeMW:
	* BorderVisible 					 - boolean
	* BorderAndLinesColor 				 - string (css color value in the rgba() functional notation)
	* LocationBorderColor 				 - string (css color value in the rgba() functional notation)
	* LocationShowTime 					 - number (ms)
	*
	* Default values are true | "rgba(255, 0, 0, 1.0)" | "rgba(0, 255, 0, 1.0)" | 500
	*/
	MWBsetOverlayAppearance: function (values) { //overlayAppearanceValues
		if ((typeof values) == 'object')
		{
			MW_properties.global.overlay.borderVisible = ((typeof values.BorderVisible) == 'boolean') ? values.BorderVisible : true;
			MW_properties.global.overlay.lineColor = ((typeof values.BorderAndLinesColor) == 'string') ? values.BorderAndLinesColor : "rgba(255, 0, 0, 1.0)";
			MW_properties.global.overlay.locationColor = ((typeof values.LocationBorderColor) == 'string') ? values.LocationBorderColor : "rgba(0, 255, 0, 1.0)";
			MW_properties.global.overlay.locationShowTime = ((typeof values.LocationShowTime) == 'number' && values.LocationShowTime >= 0) ? values.LocationShowTime : 500;
		}
	},
	MWBsetOverlayAppearance_arguments: ['object'],
	
	/**
	* Set the visibility of the cameraPreview blinking lines.
	* 
	* @param {boolean} visible
	* Default value is true.
	*/
	MWBsetBlinkingLineVisible: function (visible) { 
		if ((typeof visible) == 'boolean')
		{
			var mwBlinkingLines = MW_properties.global.blinkingLines;
			mwBlinkingLines.visible = visible;
		}
	},
	MWBsetBlinkingLineVisible_arguments: ['boolean'],
	
	/**
	* Set cameraPreview pause mode.
	* 
	* @param {number} mode
	* Pause mode defines what happens when the scanner is paused.
	* Default value is PM_STOP_BLINKING
	* 
	* Available pause modes:
	* 	PM_NONE             - Nothing happens
	* 	PM_PAUSE            - Blinking lines are replaced with a pause view
	* 	PM_STOP_BLINKING    - Blinking lines stop blinking
	*/
	MWBsetPauseMode: function (mode) { 
		/* What happens when the scanner is paused:
            *
            *   PM_NONE             - Nothing happens
            *   PM_PAUSE            - Blinking lines are replaced with a pause view
            *   PM_STOP_BLINKING    - Blinking lines stop blinking
            *
            *   Default value is PM_PAUSE
        */
        MW_properties.global.overlay.pauseMode = ((typeof mode) == 'number') ? mode : 2;
		
		//use this code and set anim to 0
		//this.lineV.style.animation = this.lineH.style.animation = "fadeColor " + overlayProperties.blinkingRate + "ms infinite";
		
		//or you could do
		//mwBlinkingLines.v.style.animationPlayState = "running";
		//mwBlinkingLines.v.style.animationPlayState = "paused";
		
		//the PM_STOP_BLINKING behaviour is done in togglePause method
	},
	MWBsetPauseMode_arguments: ['number'],
	
	/**
	* Enable or disable high resolution scanning. It's recommended to enable it when target barcodes
	* are of high density or small footprint. If device doesn't support high or exact resolution
	* param will have no effect and closest available resolution will be used.
	* 
	* @param {boolean|number} enable
	* Default value is true (enabled) / CamRes_HD (720p)
	*/
	MWBenableHiRes: function (enable) { 
		if ((typeof enable) == 'boolean' || (typeof enable) == 'number')
		{
			//range check
			let arg_value = Number(enable);
			arg_value = ((typeof enable) == 'number' && (arg_value < 0 || arg_value > 2)) ? CONSTANTS.CamRes_HD : arg_value;
			
			//book-keeping
			MW_properties.gui_accessible.cameraResolution.runtime_value =
			MW_properties.gui_accessible.cameraResolution.initial_value = enable;
			
			let from_MW_properties = MW_properties.gui_accessible.cameraResolution.values;
			let actual_value = from_MW_properties[arg_value];
			
			//used-in setter
			JavaScript_mediaDevices_API.constraints_init(actual_value[0], actual_value[1], null);
		}
	},
	MWBenableHiRes_arguments: ['boolean'],
	
	/**
	* Choose configuration options for camera switcher:
	* CAMERA_SWITCHER_INIT_ON_START   - Init camera switcher before starting a scan
	* CAMERA_SWITCHER_USE_ON_START    - Use the first camera from all detected cameras
	* CAMERA_SWITCHER_USE_BEST_CAMERA - Try to use the main back camera from multiple back cameras
	* 
	* @param {number} options
	* Default value is 0x0 (no option enabled)
	*/
	MWBsetCameraSwitcherOptions: function (options) { 
	
		let arg_value = ((typeof options) == 'number') ? options : 0; //decide on default
		
		MW_properties.global.cameraSwitcherOptions = arg_value;
		
		//parse and apply options
		
		if ((arg_value & CONSTANTS.CAMERA_SWITCHER_INIT_ON_START) == CONSTANTS.CAMERA_SWITCHER_INIT_ON_START)
		{
			//cameraSwitcher handles it
		}
		
		if ((arg_value & CONSTANTS.CAMERA_SWITCHER_USE_ON_START) == CONSTANTS.CAMERA_SWITCHER_USE_ON_START)
		{
			//cameraSwitcher handles it
		}
		
		if ((arg_value & CONSTANTS.CAMERA_SWITCHER_USE_BEST_CAMERA) == CONSTANTS.CAMERA_SWITCHER_USE_BEST_CAMERA)
		{
			//cameraSwitcher handles it
		}
	},
	MWBsetCameraSwitcherOptions_arguments: ['number'],
	
	/**
	* Set refresh options for the camera preview after a resize or orientation change event.
	* 
	* @param {number} options
	* Default value is 0x3 (all options enabled)
	*/
	MWBsetRefreshOptions: function (options) { 
		let default_options = (0x1 | 0x2);
		let arg_value = ((typeof options) == 'number') ? options : default_options;
		
		MW_properties.global.useBurstRefresh = ((arg_value & 0x1) == 0x1);
		MW_properties.global.useRuntimeResolution = ((arg_value & 0x2) == 0x2);
	},
	MWBsetRefreshOptions_arguments: ['number'],
	
	/**
	* Enable or disable flash toggle button on scanning screen. If device doesn't support flash mode
	* button will be hidden regardles of param
	* 
	* @param {boolean} enable
	* Default value is true (enabled)
	*/
	MWBenableFlash: function (enable) { 
		if ((typeof enable) == 'boolean') MW_properties.global.fullscreenButtons.hideFlash = !enable;
	},
	MWBenableFlash_arguments: ['boolean'],
	
	/**
	* Set default state of flash (torch) when scanner is started
	* 
	* @param {boolean} flashOn
	* Default value is false (disabled)
	*/
	MWBturnFlashOn: function (on) { 
		if ((typeof on) == 'boolean') JavaScript_mediaDevices_API.torchState = on;
	},
	MWBturnFlashOn_arguments: ['boolean'],
	
	/**
	* Toggle on/off flash state
	*
	*/
	MWBtoggleFlash: function () { JavaScript_mediaDevices_API.flashToggler(true); },
	MWBtoggleFlash_arguments: [],
	
	/**
	* Enable or disable zoom button on scanning screen. If device doesn't support zoom,
	* button will be hidden regardles of param
	* 
	* @param {boolean} enable
	* Default value is true (enabled)
	*/
	MWBenableZoom: function (enable) { 
		if ((typeof enable) == 'boolean') MW_properties.global.fullscreenButtons.hideZoom = !enable;
	},
	MWBenableZoom_arguments: ['boolean'],
	
	/**
	* Set desired initial zoom level. Zoom is supported only by chrome.
	* 
	* @param {number} zoomLevel
	* Initial zoom level can be 0 - no zoom, 1 - 50% or 2 - max zoom.
	* Default is 0.
	*/
	MWBsetZoomLevel: function (zoomLevel) {
		if ((typeof zoomLevel) == 'number' && (zoomLevel >=0 && zoomLevel <= 2))
		JavaScript_mediaDevices_API.zoomLevel = zoomLevel;
	},
	MWBsetZoomLevel_arguments: ['number'/*, 'number', 'number'*/],
	
	/**
	* Toggle on/off zoom state
	*
	*/
	MWBtoggleZoom: function () { JavaScript_mediaDevices_API.zoomLooper(); },
	MWBtoggleZoom_arguments: [],
	
	/**
	* Enable or disable close button on cameraPreview (partial view). If cameraPreview is in full screen mode
	* button will be present regardless of param
	* 
	* @param {boolean} enable
	* Default value is false (disabled)
	*/
	MWBenableClose: function (enable) { 
		if ((typeof enable) == 'boolean') MW_properties.global.fullscreenButtons.enableClose_setting = enable;
	},
	MWBenableClose_arguments: ['boolean'],
	
	/**
	* Enable or disable camera switcher button on cameraPreview.
	* 
	* Usually for situations where the device has multiple cameras, the camera switcher UI lists all found cameras,
	* and allows to switch to a different camera. Doing so stops the current scanning and starts a new scanning session
	* with the chosen camera.
	* 
	* By default MWBuseFrontCamera is used until another camera is selected (picked and switched to)
	* from the camera switcher UI (either manually or by using the CAMERA_SWITCHER_USE_ON_START option).
	* 
	* Once a specific camera is selected (picked and switched to) from the camera switcher,
	* the MWBuseFrontCamera setting no longer has effect.
	* 
	* @param {boolean} enable
	* Default value is false (disabled)
	*/
	MWBenableCameraSwitcher: function (enable) { 
		if ((typeof enable) == 'boolean') MW_properties.global.fullscreenButtons.hideCamera = !enable;
	},
	MWBenableCameraSwitcher_arguments: ['boolean'],
	
	/**
	* Enable/disable the return of the captured frame in the result on a successful scan. Default is 'false'.
	*/
	MWBenableCapturedFrameReturn: function (enableCapturedFrame) { 
		if ((typeof enableCapturedFrame) == 'boolean')
		{
			MW_properties.global.returnCapturedFrame = enableCapturedFrame;
		}
	},
	MWBenableCapturedFrameReturn_arguments: ['boolean'],
	
	/**
	* Enable/disable continuous scanning.
	* 
	* @param {boolean} shouldClose
	* Default value is true (disable continuous scanning).
	* If false, result callback will be performed and scanner will be paused.
	* The User can call 'resumeScanning' to continue scanning, or 'closeScanner' to close the scanner.
	*/
	MWBcloseScannerOnDecode: function (_close) { 
		if ((typeof _close) == 'boolean')
		{
			//book-keeping
			MW_properties.gui_accessible.continuous.runtime_value =
			MW_properties.gui_accessible.continuous.initial_value = !_close;
			
			//used-in setter
			MWBScanner.set_Continuous(!_close);
		}
	},
	MWBcloseScannerOnDecode_arguments: ['boolean'],
	
	/**
	* Resume scanning. Use this method if already using MWBcloseScannerOnDecode(false).
	* Function is not available on WP8 due to the technical limitations.
	*/
	MWBresumeScanning: function () { 
		MWBScanner.PAUSE_DECODING = false;
		
		if (MW_properties.global.overlay.pauseMode == 2) //PM_STOP_BLINKING
		MW_methods.toggleBlinkingLines();
		else if (MW_properties.global.overlay.pauseMode == 1) //PM_PAUSE
		MW_methods.drawPauseRects();
	},
	MWBresumeScanning_arguments: [],
	
	/**
	* Close scanner. Use this method if already using MWBcloseScannerOnDecode(false).
	* Function is not available on WP8 due to the technical limitations.
	*/
	MWBcloseScanner: function () { MWBScanner.destroyPreview(); },
	MWBcloseScanner_arguments: [],
	
		
	MWBscanFrame_ext : function (imgData, success) {
		{
			var data = imgData.data; //new Uint8ClampedArray([1, 20, -3, 129, 15]); //checks out
			var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
			
			var dataPtr = Module._malloc(nDataBytes); //buffer
			Module.HEAPU8.set(data, dataPtr); //[typedArray_dataSource, heapMemory_pointer]
			
			// Call function and get result
			var jsonMWResult = "";
			var scanFrame = Module.cwrap('scanFrame', 'string', ['number', 'number', 'number', 'number']); //for some reason this has to be inside this scope
			//probs asign cwrap when Module is loaded
			
			let DEBUG_PRINT = 0;
			
			jsonMWResult = scanFrame(dataPtr, imgData.width, imgData.height, DEBUG_PRINT); //dataURL is png (no bmp or something raw)
			
			var MWResult_obj = (DEBUG_PRINT == 0) ? JSON.parse(jsonMWResult) : jsonMWResult;
			
			//MWResult_obj take .code and JSON.parse it as well (but how can we know if its JSON result from the parser? -needs indicator)

			//var result = WindowsComponnent.ScannerPage.scanImage(imgData.data, imgData.width, imgData.height); // imgData.data is a byte array where each pixel is [RGBA]
			
			//HERE display-return result
			
			/**
			  * result.code - string representation of barcode result (MWResult.text or JSON string from parser)
			  * result.parsedCode - string json representation of parsed barcode result (if any)
			  * result.type - type of barcode detected or 'Cancel' if scanning is canceled
			  * result.bytes - bytes array of raw barcode result
			  * result.isGS1 - (boolean) barcode is GS1 compliant
			  * result.location - contains rectangle points p1,p2,p3,p4 with the corresponding x,y
			  * result.imageWidth - Width of the scanned image
			  * result.imageHeight - Height of the scanned image
			  */
			
			if ((typeof success) == 'function')
			{
				if (MWResult_obj && MWResult_obj.type != "No MWResult.")
				{
					let result = MWResult_obj;
					
					//PPM
					var ppm;
					
					if (result.type == "Multicode")
					{
						let foundCodes = result.count;
						for (let i = 0; i < foundCodes; i++)
						{
							let result_i = result.codes[i];
							let type_supports_ppm = (result_i.type != "Dotcode" && result_i.type != "Micro QR" && result_i.type != "Maxicode");
							if (type_supports_ppm && result_i.moduleSizeX > 0.01)
							{
								let is2D = (result_i.type == "QR" || result_i.type == "Micro QR" || result_i.type == "AZTEC" || result_i.type == "Datamatrix" || result_i.type == "Dotcode" || result_i.type == "Maxicode");
								ppm = (is2D)? ((result_i.moduleSizeX + result_i.moduleSizeY) / 2) : result_i.moduleSizeX;
								
								result.codes[i].ppm = ppm;
							}
						}
					}
					else
					{
						let type_supports_ppm = (result.type != "Dotcode" && result.type != "Micro QR" && result.type != "Maxicode");
						if (type_supports_ppm && result.moduleSizeX > 0.01)
						{
							let is2D = (result.type == "QR" || result.type == "Micro QR" || result.type == "AZTEC" || result.type == "Datamatrix" || result.type == "Dotcode" || result.type == "Maxicode");
							ppm = (is2D)? ((result.moduleSizeX + result.moduleSizeY) / 2) : result.moduleSizeX;
							
							result.ppm = ppm;
						}
					}
					
					success(MWResult_obj);
				}
				else
					success(MW_methods.helpers.otherResult(
						"No barcode found.",	//code
						null,					//errorDetails
						"NoResult"				//type
					));
			}
			else if (mwb_debug_print) console.log(MWResult_obj);
			
			//return;
			
			// Free memory
			Module._free(dataPtr); //but what if you change the address the dataPtr points to in C++ | Verify, and if true, store a copy to restore OG from (or just -= size)
			dataPtr = null;
			Module._free(jsonMWResult);
		}
	},
	
	/**
	* Scan image.
	* imageURI - path to the image to be scanned.
	*/
	MWBscanImage: function (imageURI, success) { //callback is optional
        imageURI = ((typeof imageURI) == 'string') ? imageURI : '';

        // clear needs to be done for every scan
        //WindowsComponnent.ScannerPage.iniClear();
		MW_methods.helpers.reset_Decoder(); //but ScanRects are not 0-100 //and effort lvl is 2
		scannerConfig();
		
		//mwb_debug_print = true;
        if (mwb_debug_print) console.log('About to scan "' + imageURI + '"');
		
        var canvasFrame = document.createElement("canvas");

        var pad = 20;

        var imageOverlay = document.createElement("img");
        imageOverlay.src = imageURI;

        imageOverlay.onload = function () {
            canvasFrame.width = imageOverlay.width + (pad * 2);
            canvasFrame.height = imageOverlay.height + (pad * 2);

            var ctx = canvasFrame.getContext("2d");

            // draw white background to pad image with white frame
            ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
            ctx.fillRect(0, 0, canvasFrame.width, canvasFrame.height);

            ctx.drawImage(imageOverlay, 0, 0, imageOverlay.width, imageOverlay.height,      // source rectangle
                                        pad, pad, imageOverlay.width, imageOverlay.height);   // destination rectangle

            var imgData = ctx.getImageData(0, 0, canvasFrame.width, canvasFrame.height);
			
			BarcodeScanner.MWBscanFrame_ext(imgData, success);
			
			//ios canvas memory limit workaround
			ctx.clearRect(0, 0, canvasFrame.width, canvasFrame.height);
			canvasFrame.width = 0;
			canvasFrame.height = 0;
        }
    },
	MWBscanImage_arguments: ['string'], //callback is optional
	
	/**
	* Scan frame.
	* image_data - ImageData object or dataURL string to be scanned.
	* image_type - "ImageData" or "dataURL" string describing image_data data type.
	*/
	MWBscanFrame: function (image_data, image_type, success) { //callback is optional
        
		var isImageData;
		
		if ((typeof image_type) == 'string' && image_type === "ImageData") isImageData = true;
		else 
			if ((typeof image_type) == 'string' && image_type === "dataURL") isImageData = false;
		else 
			return null; //or a specific {} ?		

        // clear needs to be done for every scan
		MW_methods.helpers.reset_Decoder(); //but ScanRects are not 0-100 //and effort lvl is 2
		scannerConfig();
		
		var imgData;
		
		if (isImageData === false)
		{
			if (image_data.startsWith("data:image") === false) return null; //or a specific {} ?
			
			var canvasFrame = document.createElement("canvas");
			var pad = 0;
			var ctx = canvasFrame.getContext("2d");
			
			var imageOverlay = new Image();			
			imageOverlay.onload = function () {
				
				canvasFrame.width = imageOverlay.width + (pad * 2);
				canvasFrame.height = imageOverlay.height + (pad * 2);

				// draw white background to pad image with white frame
				ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
				ctx.fillRect(0, 0, canvasFrame.width, canvasFrame.height);

				ctx.drawImage(imageOverlay, 0, 0, imageOverlay.width, imageOverlay.height,      // source rectangle
											pad, pad, imageOverlay.width, imageOverlay.height);   // destination rectangle

				imgData = ctx.getImageData(0, 0, canvasFrame.width, canvasFrame.height);
				
				//
				BarcodeScanner.MWBscanFrame_ext(imgData, success);
				
				//ios canvas memory limit workaround
				ctx.clearRect(0, 0, canvasFrame.width, canvasFrame.height);
				canvasFrame.width = 0;
				canvasFrame.height = 0;

			};
			imageOverlay.src = image_data; //strDataURI;
		}
		else 
		{
			imgData = image_data;
        
			BarcodeScanner.MWBscanFrame_ext(imgData, success);
		}
    },
	MWBscanFrame_arguments: ['object|string', 'string'], //callback is optional
	
	/**
	* Set custom symbology param id / value pair for symbology type specified in a codeMask.
	* 
	* @param {number} codeMask                Single symbology type (MWB_CODE_MASK_...)
	* @param {number} paramId                 ID of param
	* @param {number} paramValue              Integer value of param
	*/
	MWBsetParam: null, //assigned with cwrap on module load
	MWBsetParam_arguments: ['number','number', 'number'],
	
	/**
	* Pause scanner view
	*/
	MWBtogglePauseResume: function () {
		MWBScanner.PAUSE_DECODING = !MWBScanner.PAUSE_DECODING; //this works as intended
		
		if (MW_properties.global.overlay.pauseMode == 2) //PM_STOP_BLINKING
		MW_methods.toggleBlinkingLines();
		else if (MW_properties.global.overlay.pauseMode == 1) //PM_PAUSE
		MW_methods.drawPauseRects();
	},
	MWBtogglePauseResume_arguments: [],
	
	/**
	* Ignore result if the same code is scanned in continuous scanning mode.
	*
	* @param {number} delay
	* Time interval between 2 scan results with the same result.code in milliseconds
	* Note: Internal implementation uses seconds. Provided value is rounded.
	*/
	MWBduplicateCodeDelay: null, //assigned with cwrap on module load
	MWBduplicateCodeDelay_arguments: ['number'],
	
	/**
	* Enable mirrored camera preview.
	* 
	* The mirroring is done along the X-axis. It's recommended when the used camera is facing the user (i.e. front camera).
	* 
	* @param {number} The type of mirroring to apply
	* @param {boolean} Apply mirroring
	* Default value is MIRROR_NONE.
	*/
	MWBenableMirroredPreview: function (mirrorType, apply) {
		if ((typeof mirrorType) == 'number')
		{
			MW_properties.global.mirroredType = mirrorType;
		}
		
		if ((typeof apply) == 'boolean')
		{
			var previewFrame_MirroredStyle = document.createElement('link');
			var previewFrame_MirroredStyle_init = function () {
				previewFrame_MirroredStyle.id = "mirror-preview-style";
				previewFrame_MirroredStyle.rel = "stylesheet";
				previewFrame_MirroredStyle.type = "text/css";
				previewFrame_MirroredStyle.href = "data:text/css;base64,I3ZpZGVvLWxheWVyey13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWCgtMSk7dHJhbnNmb3JtOnNjYWxlWCgtMSk7fQ==";
				
				document.head.appendChild(previewFrame_MirroredStyle);
			};
			
			var previewFrame_MirroredStyle_remove = function () {
				var sheet = document.getElementById("mirror-preview-style");
				sheet.disabled = true;
				sheet.parentNode.removeChild(sheet);
			};
			
			var mirrored = ((mirrorType == CONSTANTS.MIRROR_FRONTCAM && JavaScript_mediaDevices_API.frontCamera) || mirrorType == CONSTANTS.MIRROR_ALWAYS);
			
			if (mirrored)
			{
				if (mwb_debug_print) console.log('mirrored mode');
				if (!MW_properties.global.has_mirror_css)
				{
					if (mwb_debug_print) console.log('apply mirrored style');
					previewFrame_MirroredStyle_init();
					MW_properties.global.has_mirror_css = true;
				}
			}
			else
			{
				if (MW_properties.global.has_mirror_css)
				{
					if (mwb_debug_print) console.log('remove mirrored style');
					previewFrame_MirroredStyle_remove();
					MW_properties.global.has_mirror_css = false;
				}
			}
		}
	},
	MWBenableMirroredPreview_arguments: ['number', 'boolean'],
	
	/**
	* Use front facing camera
	* 
	* @param {boolean} useFrontCamera
	* Whether or not to use front facing camera.
	* Default value is false (i.e. use back camera).
	*/
	MWBuseFrontCamera: function (front) {
		if ((typeof front) == 'boolean')
		{
			//book-keeping
			MW_properties.gui_accessible.frontCamera.runtime_value =
			MW_properties.gui_accessible.frontCamera.initial_value = front;
			
			//used-in setter
			JavaScript_mediaDevices_API.constraints_init(null, null, front);
			
			//and, only makes sense for mobile devices with 2 cams, PC doesn't have that
		}
	},
	MWBuseFrontCamera_arguments: ['boolean'],
	
	/**
	* Sets active or inactive status of parser types.
	* 
	* @param {number} activeParser
	* 
	* Available options:
	* 	MWP_PARSER_MASK_NONE
	* 	MWP_PARSER_MASK_AUTO
	* 	MWP_PARSER_MASK_GS1
	* 	MWP_PARSER_MASK_IUID
	* 	MWP_PARSER_MASK_ISBT
	* 	MWP_PARSER_MASK_AAMVA
	* 	MWP_PARSER_MASK_HIBC
	* 	MWP_PARSER_MASK_SCM
	*/
	MWBsetActiveParser: null, //assigned with cwrap on module load
	MWBsetActiveParser_arguments: ['number'],
	
	/**
	*  Resize partial scanner view
	*
	*  x, y, width, height (percentage of screen size)
	*/
	MWBresizePartialScanner: function (x, y, w, h) { //just a wrapper
		MWBScanner.resizePreview(x, y, w, h); 
		
		//note - has to be inside a f()
		//because MWBScanner is probs not defined when this var is defined
		//but when its called later on, it will be
		//Works!
	},
	MWBresizePartialScanner_arguments: ['number','number', 'number', 'number'],
	
	/**
	* Set the amount of time in seconds the camera preview will be on before closeScanner is called.
	* 
	* @param {number} timeout
	* Time in seconds. Default value is 30.
	* Accepted value range is 10-60. Also accepts 0 to disable the timeout.
	* Values out of range will result in applying the default value 30.
	*/
	MWBsetDecoderTimeout: function (timeout) { 
		if ((typeof timeout) == 'number')
		{
			//no book-keeping
			MWBScanner.set_DecoderTimeout(timeout);
		}
	},
	MWBsetDecoderTimeout_arguments: ['number'],
	
	/**
	* Set decodes per second, i.e. number of frames that are sent for decoding in a given second.
	* This setting only works with our camera preview i.e. when using the startScanning method.
	* 
	* Performance: Use of a decodes per second limit is recommended, such as 1 or 2 at the most, and in reality,
	* there is rarely a need for a higher decoding rate. Having a higher dps results in higher CPU usage,
	* which can lead to non-responsiveness of the cameraPreview.
	* 
	* @param {number} dpsLimit
	* Decodes per second limit. Default value is 2.
	* Accepted value range is 1-30.
	*/
	MWBsetDpsLimit: function (dps) { 
		if ((typeof dps) == 'number')
		{
			//no book-keeping
			MWBScanner.set_DpsLimit(dps);
		}
	},
	MWBsetDpsLimit_arguments: ['number']//,
	
};

/**
* Scanner Defaults to be loaded in the constructor of Scanner
* TODO: maybe set the callback function to an empty anonymous function
**/
var defaults = {
	
	init_decoder : false,
	valid_key : false,
	dflt_clb : function(result) {
		/**
		* result.code - string representation of barcode result
		* result.parsedCode - string json representation of parsed barcode result (if any)
		* result.type - type of barcode detected or 'Cancel' if scanning is canceled
		* result.bytes - bytes array of raw barcode result
		* result.isGS1 - (boolean) barcode is GS1 compliant
		* result.location - contains rectangle points p1,p2,p3,p4 with the corresponding x,y
		* result.imageWidth - Width of the scanned image
		* result.imageHeight - Height of the scanned image
		*/
		
		if (result.type == "Error") console.log(result.errorDetails);            
		else if (result.type == "Cancel") console.log("No Barcode.");
		else if (result.type == "NoResult") console.log("No Barcode.");
		
		else if (result.type == "Multicode")
		{
			let resultCodes_string = "";
			let foundCodes = result.count;
			for (let i = 0; i < foundCodes; i++)
			{
				resultCodes_string += result.codes[i].type + '\n' + result.codes[i].code + '\n';
				
			}
			console.log(result.type + '\n\n' + resultCodes_string);
		}
		else
		{
			console.log(result.type + (result.isGS1 ? " (GS1)" : "") + '\n' + result.code);
		}
	},
	company_logo: "cognex_icon.png", //different domain host req. cross-origin code
	company_logo_set: false,
	company_logo_allow_cross_origin: false,
	icon_or_key_lock: false
}

/**
* @name
*   Scanner
* @description
*   constructor of the scanner object
* @params
*   key   optional license key
*
*/
var Scanner = function() {

	var self = this;
	//load defaults
	for (var key in defaults) {
		if (defaults.hasOwnProperty(key)) {
			self[key] = defaults[key];
		}
	}
}

/**
* @name getVersion
* Returns an object of cmbWebVersion, decoderVersion and fullVersion.
* 
* @return {object}
* 	cmbWebVersion 	- cmbWeb version
* 	decoderVersion 	- decoding library version
* 	fullVersion 	- cmbWebVersion and decoderVersion
**/
Scanner.prototype.getVersion = function() {
	var jsonVersion = BarcodeScanner.MWBgetVersion();
	var jsonVersion_obj = JSON.parse(jsonVersion);
	Module._free(jsonVersion);
	
	return jsonVersion_obj;
}

/**
* @name setCallback
* Set a custom callback function that's called once the scan is performed. Should be called in the configuration stage.
* 
* Note: If the scanning method provides its own callback, the provided callback will be used.
* 
* @param {function} callback
**/
Scanner.prototype.setCallback = function(callback) {
	if (mwb_debug_print) console.log('setCallback called');
	this.dflt_clb = callback;
}

Scanner.prototype.setIcon = function(/*iconURI, allowCrossOrigin*/) {
	
	if (mwbScanner.icon_or_key_lock) return;
	if (mwbScanner.company_logo_set) return;
	
	if (mwb_debug_print) console.log('setIcon called');
	
	let argsCount = arguments.length;
	
	if (argsCount >= 1)
	{
		if (typeof arguments[0] == 'string') this.company_logo = arguments[0];
		
		if (argsCount == 2) {
			if (typeof arguments[1] == 'boolean')
			this.company_logo_allow_cross_origin = arguments[1];
		}
	}
	
	mwbScanner.icon_or_key_lock = true;
	
	var allowCrossOrigin = this.company_logo_allow_cross_origin;
	
	var ImageScanner = {
		
		MWBgetDataFromImage: function (imageURI) {
			imageURI = ((typeof imageURI) == 'string') ? imageURI : '';
			
			if (imageURI === '') return; //simple

			var canvasFrame = document.createElement("canvas");

			var pad = 0;

			var imageOverlay = document.createElement("img");
			if (allowCrossOrigin) imageOverlay.crossOrigin = "anonymous";
			
			imageOverlay.onerror = function () {
				
				if (mwb_debug_print) console.log("icon image did not load");
				return;
			}
			
			imageOverlay.src = imageURI;

			imageOverlay.onload = function () {
				
				canvasFrame.width = imageOverlay.width + (pad * 2);
				canvasFrame.height = imageOverlay.height + (pad * 2);

				var ctx = canvasFrame.getContext('2d');//, { alpha: false });
				
				ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
				ctx.fillRect(0, 0, canvasFrame.width, canvasFrame.height);
				//ctx.clearRect(0, 0, canvasFrame.width, canvasFrame.height);
				//ctx.globalAlpha = 0.0;

				ctx.drawImage(imageOverlay, 0, 0, imageOverlay.width, imageOverlay.height,
					pad, pad, imageOverlay.width, imageOverlay.height);

				var imgData = ctx.getImageData(0, 0, canvasFrame.width, canvasFrame.height);

				var data = imgData.data;
				var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
				
				var dataPtr = Module._malloc(nDataBytes);
				Module.HEAPU8.set(data, dataPtr);
				
				var _set_Icon = Module.cwrap('set_Icon', 'number', ['number', 'number', 'number']);
				
				var _rt = _set_Icon(dataPtr, canvasFrame.width, canvasFrame.height);
				
				Module._free(dataPtr);
				dataPtr = null;
				
				mwbScanner.company_logo_set = true;
			}
		}
	};
	
	try {
		//Scanner.defaults.company_logo
		var count = 0;
		//if (mwb_debug_print) console.log(count, mwbScanner.company_logo);
		
		ImageScanner.MWBgetDataFromImage(mwbScanner.company_logo);
		
	} catch (e) {
		if (mwb_debug_print) console.log('error: ' + e);
	}
}

Scanner.prototype.setKey = function() {
	
	if (mwbScanner.icon_or_key_lock) return;
	
	if (mwb_debug_print) console.log('setKey called');
	
	let s_key = "";
	
	if (arguments.length == 1)
	{
		if (typeof arguments[0] == 'string') s_key = arguments[0];
	}
	else return;
	
	mwbScanner.icon_or_key_lock = true;
	
	if (mwb_debug_print) console.log('s_key: ' + s_key);
	
	try {
		let s_key_len = s_key.length;
		const uintc8 = new Uint8ClampedArray(s_key_len + 1);
		
		for (let i = 0; i < s_key_len; i++) uintc8[i] = s_key.charCodeAt(i);
		uintc8[s_key_len] = 0;
		
		if (mwb_debug_print)
		{
			console.log(uintc8);
			console.log(uintc8.length);
			console.log(uintc8.BYTES_PER_ELEMENT);
		}
		
		var data = uintc8;
		var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
		
		if (mwb_debug_print) console.log('nDataBytes: ' + nDataBytes);
		
		var dataPtr = Module._malloc(nDataBytes);
		Module.HEAPU8.set(data, dataPtr);
		
		var _set_Key = Module.cwrap('set_Key', 'number', ['number']);
		
		if (mwb_debug_print) {
			console.log('dataPtr: ' + dataPtr);
			console.log('[dataPtr+0]: ' + Module.HEAPU8[dataPtr]);
			console.log('[dataPtr+1]: ' + Module.HEAPU8[dataPtr+1]);
			console.log('[dataPtr+2]: ' + Module.HEAPU8[dataPtr+2]);
			console.log('[dataPtr+3]: ' + Module.HEAPU8[dataPtr+3]);
		}
		
		var _rt = _set_Key(dataPtr);
		
		Module._free(dataPtr);
		dataPtr = null;
		
	} catch (e) {
		
		if (mwb_debug_print) console.log('error: ' + e);
	}
}

/**
* @name loadSettings
* Load the array of configuration settings. Returns a promise that resolves with the loaded settings.
* Should be called in the configuration stage.
* 
* @param settings - an array of settings objects with the following structure:
*     {"method" : "MWBmethod" , "value" : "array of params that the method expects"}
*     example:
*       [
*         {'method': 'MWBsetActiveCodes', 'value' : [cc.MWB_CODE_MASK_128]},
*         {'method': 'MWBsetFlags', 'value' : [cc.MWB_CODE_MASK_39, cc.MWB_CFG_CODE39_EXTENDED_MODE]},
*         {'method': 'MWBsetDirection', 'value' : [cc.MWB_SCANDIRECTION_VERTICAL | cc.MWB_SCANDIRECTION_HORIZONTAL]},
*         {'method': 'MWBsetScanningRect', 'value' : [cc.MWB_CODE_MASK_39, 20,20,60,60]},
*         {'method': 'MWBsetMinLength', 'value' : [cc.MWB_CODE_MASK_39, 4]},
*         {'method': 'MWBsetParam', 'value' : [cc.MWB_CODE_MASK_DM, cc.MWB_PAR_ID_RESULT_PREFIX, cc.MWB_PAR_VALUE_RESULT_PREFIX_ALWAYS]},
*         {'method': 'MWBsetActiveParser', 'value' : [cc.MWP_PARSER_MASK_ISBT]}
*       ]
* @returns Promise that resolves with the loaded settings.
**/
Scanner.prototype.loadSettings = function(settings) {
	if (mwb_debug_print) console.log('loadSettings called');
    var that = this;
	var good_settings = [];
	var bad_settings = [];
	var has_good_settings = false;
	var has_bad_settings = false;
    return new window.Promise(function(resolve, reject) {
        if(Array.isArray(settings)) {
			for (var i = settings.length - 1; i >= 0; i--) {
				var expression = settings[i];
				if (mwb_debug_print) console.log(expression);
				if (mwb_debug_print) console.log(expression.value);
				
				if (typeof expression == 'object'
				 && typeof expression.method == 'string'
				 && typeof expression.value == 'object'
				 && Array.isArray(expression.value)
				 && typeof BarcodeScanner[expression.method] == 'function')
				 {
					 BarcodeScanner[expression.method].apply(null, expression.value);
					 good_settings.push(expression);
					 has_good_settings = true;
				 }
				else
				{
					bad_settings.push(expression);
					has_bad_settings = true;
				}
			}
        }
		else
		{
			reject('The settings argument is not an array.');
		}
		
		if (has_good_settings) resolve(good_settings);
		if (has_bad_settings) reject(bad_settings);
    });
}

/**
* @name getConstants
* Get the constants of the scanner so they can be used when calling configuration functions.
* 
* @returns {object} constants
**/
Scanner.prototype.getConstants = function() {
	
	return CONSTANTS;
}

/**
* @name checkBrowserCompatibility
* Check browser support for features.
* 
* By default this method only checks synchronous features.
* 
* Some of the features are obtained asynchronously. The check for those features can be enabled by passing their respective parameters.
* 
* @param {boolean|undefined} checkDefaultCamera
* Check default camera properties and capabilities.
* 
* @return {Promise<object>} Promise that resolves with an object of features needed for cmbWeb and their browser support state.
* @property {boolean} MEDIA_DEVICES 		- Support for mediaDevices and getUserMedia
* @property {boolean} SECURE_CONTEXT 		- Current context is secure
* @property {boolean} SCREEN_ORIENTATION 	- Support for screen.orientation
* @property {boolean} WEB_ASSEMBLY 			- Support for WebAssembly
* @property {boolean} WEB_AUDIO 			- Support for Web Audio
* @property {boolean} CAMERA_FLASH 			- Support for camera flash
* @property {object}  DEFAULT_CAMERA 		- (optional) Default camera properties and capabilities
**/
Scanner.prototype.checkBrowserCompatibility = async function(checkDefaultCamera) {
	let MEDIA_DEVICES = (typeof navigator.mediaDevices === 'object' && typeof navigator.mediaDevices.getUserMedia === 'function');
	let SECURE_CONTEXT = window.isSecureContext;
	let WEB_ASSEMBLY = (typeof window.WebAssembly === 'object');
	let WEB_AUDIO = ('AudioContext' in window || 'webkitAudioContext' in window);
	
	const _Screen_Orientation = (typeof screen.orientation === 'undefined') ? 'undefined' : screen.orientation;	//undefined on Safari
	let SCREEN_ORIENTATION = !(_Screen_Orientation === 'undefined');
	
	let browser_supported_constraints = navigator.mediaDevices.getSupportedConstraints();
	let CAMERA_FLASH = browser_supported_constraints.torch || false;
	let CAMERA_ZOOM = browser_supported_constraints.zoom || false;
	
	let DEFAULT_CAMERA = {
		LABEL: ""
		,ID: ""
		,FLASH: false
		,ZOOM: false
		,ZOOM_VALUES: false
		,ZOOM_LEVELS: null
	};
	
	if (checkDefaultCamera) //async
	{
		navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
		.then(function(stream) {
			const track = stream.getVideoTracks()[0];
			let runtime_settings_videoTrack = track.getSettings();
			
			DEFAULT_CAMERA.LABEL = track.label;
			DEFAULT_CAMERA.ID = runtime_settings_videoTrack.deviceId;
			
			//videoTrack capabilities depends on ImageCapture promise or timeout
			function capabilitiesDependentCode() {
				let capabilities_Indicator = null;
				let ranges_exist = false;
				
				try {
					capabilities_Indicator = track.getCapabilities(); //Firefox doesn't support this method
					ranges_exist = true;
				} catch (e) {
					//use browser_supported_constraints instead
					capabilities_Indicator = browser_supported_constraints;
					//Firefox doesn't support torch and zoom anyways
				}
				
				if (capabilities_Indicator.torch) DEFAULT_CAMERA.FLASH = true;
				if (capabilities_Indicator.zoom) DEFAULT_CAMERA.ZOOM = true;
				if (ranges_exist) DEFAULT_CAMERA.ZOOM_VALUES = true;
				
				if (ranges_exist) {
					try {
						const min = capabilities_Indicator.zoom.min;
						const max = capabilities_Indicator.zoom.max;
						const step = capabilities_Indicator.zoom.step;
						
						//ranges might use different scale on different devices
						const number_of_digits = MW_methods.helpers.get_number_of_Digits(max);
						
						const _max = max - Math.pow(10, (number_of_digits - 2)); //this substracts 1% from max (needed because values are stepped and max might be ignored like out-of-range value)
						const mid = min + ((_max - min) / 2);
						
						DEFAULT_CAMERA.ZOOM_LEVELS = [min, mid, _max] //different from ^
					}
					catch (e) {
						//browser supports zoom but physical device doesn't
						DEFAULT_CAMERA.ZOOM_VALUES = false;
					}
				}
				else {
					DEFAULT_CAMERA.ZOOM_LEVELS = [100, 250-8, 400-16] //extrapolated defaults
				}
				
				//turn off the camera
				if (track != null) track.stop();
				
			} //end of capabilitiesDependentCode
			
			const _ImageCapture = (typeof ImageCapture === 'undefined') ? 'undefined' : ImageCapture;
			
			if (_ImageCapture === 'undefined')
			{
				setTimeout(function () {
					capabilitiesDependentCode();
				}, 200); //get_videoTrack_capabilities_timeout
			}
			else
			{
				//Create image capture object and get camera capabilities
				const imageCapture = new _ImageCapture(track);
				const photoCapabilities = imageCapture.getPhotoCapabilities()
				.then(() => {
					//check if camera has a torch and zoom
					capabilitiesDependentCode();
				});
			}
		})
		.catch(function(e) {
			//JavaScript_mediaDevices_API.handleError(e); //scope
		});
	}
	
	let browserFeatures =  (checkDefaultCamera) ? {
		 MEDIA_DEVICES: MEDIA_DEVICES
		,SECURE_CONTEXT: SECURE_CONTEXT
		,SCREEN_ORIENTATION: SCREEN_ORIENTATION
		,WEB_ASSEMBLY: WEB_ASSEMBLY
		,WEB_AUDIO: WEB_AUDIO
		,CAMERA_FLASH: CAMERA_FLASH
		,CAMERA_ZOOM: CAMERA_ZOOM
		//optional:
		,DEFAULT_CAMERA: DEFAULT_CAMERA
	} : {
		 MEDIA_DEVICES: MEDIA_DEVICES
		,SECURE_CONTEXT: SECURE_CONTEXT
		,SCREEN_ORIENTATION: SCREEN_ORIENTATION
		,WEB_ASSEMBLY: WEB_ASSEMBLY
		,WEB_AUDIO: WEB_AUDIO
		,CAMERA_FLASH: CAMERA_FLASH
		,CAMERA_ZOOM: CAMERA_ZOOM
	};
	
	return new window.Promise(function(resolve, reject) {
		resolve(browserFeatures);
	});
}

/**
* @name getCameras
* Get available cameras for this device.
* 
* @returns Promise<[{ id: string; label: string }]>
* 	id 		- Unique id of the camera
* 	label 	- Descriptive label of the camera
**/
Scanner.prototype.getCameras = async function() {
	
	async function requestPermission()
	{
		let supported = (typeof navigator.mediaDevices === 'object' && typeof navigator.mediaDevices.getUserMedia === 'function' && (location.protocol === 'https:' || (location.hostname === 'localhost' || location.hostname === '127.0.0.1'))) ? true : false;
		
		if (supported)
		{
			await navigator.mediaDevices.getUserMedia({ video: true });
		}
	};
	
	//Permissions first!
	try {
		const { state } = await navigator.permissions.query({name: "camera"});
		if (state != "granted")
		{
			await requestPermission();
		}
	}
	catch (error) {
		await requestPermission();
	}
	
	return new window.Promise(function(resolve, reject) {
		const mwb_getCameraSelection = async () => {
		  const devices = await navigator.mediaDevices.enumerateDevices();
		  const videoDevices = devices.filter(device => device.kind === 'videoinput');
		  mwb_VDList = videoDevices.map(videoDevice => {
			return { id: videoDevice.deviceId, label: videoDevice.label };
		  });
		  resolve(mwb_VDList);
		};
		navigator.mediaDevices.enumerateDevices().then(mwb_getCameraSelection);
	});
}

/**
* @name getActiveCamera
* Returns the ID of the currently used camera, empty string if no camera is used.
* 
* 
* @returns {string} id
**/
Scanner.prototype.getActiveCamera = function() {
	return (MWBScanner.DECODER_ACTIVE) ? ((typeof JavaScript_mediaDevices_API.runtime_settings_videoTrack == "object") ? JavaScript_mediaDevices_API.runtime_settings_videoTrack.deviceId : '') : '';
}

/**
* @name setCamera
* Set a specific camera to use for this device.
* 
* Note: Overrides the effect of the MWBuseFrontCamera setting.
* 
* @param {string} id
**/
Scanner.prototype.setCamera = function(id) {
	if (typeof id == "string") mwb_VDSelection = id;
}

/**
* @name scanImage
* Scan an image file.
* 
* @param {string} imageURI 				The path to the image file.
* @param {function|undefined} callback 	Result callback (will get replaced by a default callback if it's missing)
**/
Scanner.prototype.scanImage = function() {
	if (mwb_debug_print) console.log('scanImage called');

	var args = Array.prototype.slice.call(arguments)
	,callback = this.dflt_clb
	,that = this
	,imageUri = args[0];


	if(args.length == 2)
	if(typeof args[1] === 'function') callback = args[1];

	BarcodeScanner.MWBscanImage(imageUri, callback);
}

/**
* @name scanFrame
* Scan a single frame.
* 
* @param {ImageData|dataURL} imageData 	Either an ImageData object or a dataURL image string to be scanned.
* @param {function|undefined} callback 	Result callback (will get replaced by a default callback if it's missing)
**/
Scanner.prototype.scanFrame = function() {

	var args = Array.prototype.slice.call(arguments)
	,callback = this.dflt_clb
	,that = this
	,image_data = args[0]; //ImageData or dataURL
	
	var image_type = "";

	if(args.length == 2)
	if(typeof args[1] === 'function') callback = args[1];
	
	if(typeof args[0] === 'object') image_type = "ImageData";
	if(typeof args[0] === 'string') image_type = "dataURL";

	BarcodeScanner.MWBscanFrame(image_data, image_type, callback);
}

/**
* @name startScanning
* Starts the scanner with different params (in view / fullscreen).
* 
* If a div element with "cmbweb-preview-container" id is used in the html page, the sdk will detect this and operate in 'container mode' (the cameraPreview will fill the container).
* The x,y,width,height args have no effect in container mode.
* 
* Calling the startScanning method involves camera access and requests user permissions if needed.
* A "cameraReady" event is triggered when the camera is fully initialized after calling the startScanning method. After this event the cameraPreview is shown.
* 
* Depending on device features and user permissions for camera access, any of the following camera-related errors could be returned in the result.errorDetails.name of the callback:
* - NotReadableError
* - ProtocolError
* - NotAllowedError
* - NotFoundError
* - AbortError
* - OverconstrainedError
* 
* @param {function|undefined} callback
* @param {number|undefined} x
* @param {number|undefined} y
* @param {number|undefined} width
* @param {number|undefined} height
**/
Scanner.prototype.startScanning = function() {
	if (mwb_debug_print) console.log('startScanning called');
	if (mwb_debug_print) console.log('Provided ' + arguments.length + ' arguments.');
	
	scannerConfig();
	if (MWBScanner.PAUSE_DECODING) BarcodeScanner.MWBtogglePauseResume(); //reset
	
	//expected number of args: 0, 1, 4, 5
	
	let argsCount = arguments.length;
	let callback;
	let x,y,w,h; //and also the args in a common runtime location
	
	let args_ok = true; //assume and test to disprove
	
	let partialView = false;
	if (argsCount < 4)
	{
		//fullScreen
		if (argsCount >= 1)
		if (typeof arguments[0] == 'function') callback = arguments[0]; else args_ok = false;
	
		partialView = false;
	}
	else
	{
		//partialView
		if (argsCount >= 5)
		{
			if (typeof arguments[0] == 'function') callback = arguments[0];  else args_ok = false;
			if (typeof arguments[1] == 'number') x = arguments[1]; else args_ok = false;
			if (typeof arguments[2] == 'number') y = arguments[2]; else args_ok = false;
			if (typeof arguments[3] == 'number') w = arguments[3]; else args_ok = false;
			if (typeof arguments[4] == 'number') h = arguments[4]; else args_ok = false;
		}
		else
		{
			if (typeof arguments[0] == 'number') x = arguments[0]; else args_ok = false;
			if (typeof arguments[1] == 'number') y = arguments[1]; else args_ok = false;
			if (typeof arguments[2] == 'number') w = arguments[2]; else args_ok = false;
			if (typeof arguments[3] == 'number') h = arguments[3]; else args_ok = false;
		}
		
		partialView = true;
	}
	
	MW_properties.global.container = document.getElementById("cmbweb-preview-container");
	
	if (args_ok)
	{
		//call with args
		
		if (partialView) MWBScanner.resizePreview(x,y,w,h);
		else MWBScanner.resizePreview(0, 0, 100, 100);
		
		MWBScanner.start(callback); //callback is safe-checked
	}
	else
	{
		//argless call (use defaults)
		if (mwb_debug_print) console.log("error: provided arguments for startScanning don't match the expected data types");
		
		//implement as you wanted - theres callback for start
		MWBScanner.start();
	}
	
};

/**
* @name closeScanner
* Close a previously started scan from startScanning.
**/
Scanner.prototype.closeScanner = function(){
	BarcodeScanner.MWBcloseScanner();
};

/**
* @name togglePauseResume
* Toggles between pause and resume of scanning.
* 
* The camera stream will continue running (i.e. will be shown on the cameraPreview), but no frames will be scanned by the decoder during the paused state. This will significantly reduce CPU usage.
**/
Scanner.prototype.togglePauseResume = function(){
	BarcodeScanner.MWBtogglePauseResume();
};

/**
* @name toggleFlash
* Toggles the flash feature (if present) of the camera. The toggle switches between on and off state.
**/
Scanner.prototype.toggleFlash = function(){
	BarcodeScanner.MWBtoggleFlash();
};

/**
* @name toggleZoom
* Toggles the zoom feature (if present) of the camera.
* 
* Typically there are 3 zoom states that the toggle cycles through: no zoom, 50% zoom, 100% zoom.
**/
Scanner.prototype.toggleZoom = function(){
	BarcodeScanner.MWBtoggleZoom();
};

/**
* @name resumeScanning
* Resumes scanning after it was paused.
* 
* Use this method if already using MWBcloseScannerOnDecode(false) to achieve continuous scanning.
**/
Scanner.prototype.resumeScanning = function(){
	BarcodeScanner.MWBresumeScanning();
};

/**
* @name setScannerOverlayMode
* An API version of the MWBsetOverlayMode configuration method.
* 
* @param {number} overlayMode
**/
Scanner.prototype.setScannerOverlayMode = function(overlayMode){
	BarcodeScanner.MWBsetOverlayMode(overlayMode);
	
	if ((typeof overlayMode) == 'number' && MWBScanner.DECODER_ACTIVE)
	MW_methods.handleOverlayModes();
};

/**
* @name setBlinkingLineVisible
* Set the visibility of the cameraPreview blinking lines.
* An API version of the MWBsetBlinkingLineVisible configuration method.
* 
* @param {boolean} visible
**/
Scanner.prototype.setBlinkingLineVisible = function(visible){
	BarcodeScanner.MWBsetBlinkingLineVisible(visible);
	
	if ((typeof visible) == 'boolean' && MWBScanner.DECODER_ACTIVE)
	{
		var mwBlinkingLines = MW_properties.global.blinkingLines;
		if (visible) {
			mwBlinkingLines.v.style.visibility = "visible";
			mwBlinkingLines.h.style.visibility = "visible";
		}
		else {
			mwBlinkingLines.v.style.visibility = "hidden";
			mwBlinkingLines.h.style.visibility = "hidden";
		}
	}
};

/**
* @name resizePartialScanner
* Resizes partial scanner cameraPreview dimensions.
* 
* If a div element with "cmbweb-preview-container" id is used in the html page, the sdk will detect this
* and operate in 'container mode' (the cameraPreview will fill the container).
* The resizePartialScanner method has no effect in container mode.
* 
* @param {number} x
* @param {number} y
* @param {number} width
* @param {number} height
**/
Scanner.prototype.resizePartialScanner = function(x, y, width, height) {
	BarcodeScanner.MWBresizePartialScanner(x, y, width, height);
};

Scanner.prototype.CONSTANTS = CONSTANTS;
//var mwbScanner = new Scanner();

Scanner.prototype.generateMethod = function(methodPrefix, methodName){
	function new_method(){
		//var methodName = 'MWBsetActiveCodes'; //maybe keep a table of valid method names to avoid errors due to missed strings
		var argsCount = BarcodeScanner[methodName + "_arguments"].length;
		var jsonArgs = JSON.stringify(BarcodeScanner[methodName + "_arguments"]);
		if(arguments.length != argsCount) { if (mwb_debug_print) console.log('error: provided ' + arguments.length + ' argument(s) but function '+ methodName + '(' + jsonArgs + ') takes ' + argsCount + ' argument(s)'); return; }
		
		for (var arg = 0; arg < argsCount; arg++)
		{
			var argType = BarcodeScanner[methodName + "_arguments"][arg];
			if (typeof arguments[arg] !== argType) { if (mwb_debug_print) console.log('error: provided "' + typeof arguments[arg] + '" in arguments[' + arg + '] but function ' + methodName + '(' + jsonArgs + ') takes "' + argType + '"'); return; }
		}
		
		var cwrap_args_array = []; //every arg is a number regardless of the data type on the native side
		for (var arg = 0; arg < argsCount; arg++) { cwrap_args_array.push('number'); }
		
		var f = Module.cwrap(methodPrefix + methodName, 'number', cwrap_args_array);
		var RT = f.apply(null, arguments);
		
		if (RT < 0) //this only works for functions that return int (most do, but some- like scanFrame, don't)
		{
			var json_args = JSON.stringify(arguments);
			if (mwb_debug_print) console.log('error: function ' + methodName + ' returned ' + RT); return;
		}
		
		return RT; //maybe use mwb_debug_print above
	};
	
	return new_method;
}

var BeepHelper = {
	
	// Check if the browser supports web audio. Safari wants a prefix.
	webAudio_supported: ('AudioContext' in window || 'webkitAudioContext' in window),
	webAudio_initialized: false,
	AudioContext: null, //window.AudioContext || window.webkitAudioContext,
	context: null, //new AudioContext()// Make it crossbrowser
	gainNode: null,
	beepBuffer: void 0,
	
	webAudio_audio_init: async function() {
		// The Promise-based syntax for BaseAudioContext.decodeAudioData() is not supported in Safari(Webkit).
		window.fetch(sound_base64)
		.then(response => response.arrayBuffer())
		.then(arrayBuffer => BeepHelper.context.decodeAudioData(arrayBuffer,
				audioBuffer => {
					BeepHelper.beepBuffer = audioBuffer;
				},
				error =>
				console.error(error)));
	},
	
	webAudio_audio_play: function(audioBuffer) {
		var source = BeepHelper.context.createBufferSource();
		source.buffer = audioBuffer;
		source.connect(BeepHelper.context.destination);
		source.start();
	},
	
	webAudio_unlock: function() {
		//Here's the part for unlocking the audio context, probably for iOS only
		if (mwb_debug_print) console.log("Attempting to unlock the audio context.")
		// create empty buffer and play it
		var buffer = BeepHelper.context.createBuffer(1, 1, 22050);
		var source = BeepHelper.context.createBufferSource();
		source.buffer = buffer;
		source.connect(BeepHelper.context.destination);

		// play the file. noteOn is the older version of start()
		source.start ? source.start(0) : source.noteOn(0);
	},
	
	webAudio_init: async function() {
		if (BeepHelper.webAudio_supported && !BeepHelper.webAudio_initialized) {
			
			BeepHelper.AudioContext = window.AudioContext || window.webkitAudioContext;
			BeepHelper.context = new BeepHelper.AudioContext();
			
			BeepHelper.gainNode = BeepHelper.context.createGain();
			BeepHelper.gainNode.gain.value = 1; // set volume to 100%

			await BeepHelper.webAudio_audio_init();
			
			// Try to unlock, so the unmute is hidden when not necessary (in most browsers).
			BeepHelper.webAudio_unlock();
			
			BeepHelper.webAudio_initialized = true;
			// Play the file. You won't hear it in iOS until the audio context is unlocked.
			//BeepHelper.webAudio_audio_play(BeepHelper.beepBuffer);
		}
	}
};

const sound_base64 = "data:audio/mpeg;base64,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";
const sound = new Audio(sound_base64);

/**
* @name beep
* Play a beep sound (requires user input).
* 
* The use of startScanning (initiated by user action such as the click of a button, once per session)
* must precede the use of this method.
**/
Scanner.prototype.beep = function() {
	if (BeepHelper.webAudio_supported && BeepHelper.webAudio_initialized) {
		BeepHelper.webAudio_audio_play(BeepHelper.beepBuffer);
	}
	else {
		sound.volume = 1;
		sound.muted = false;
		sound.pause();
		sound.currentTime = 0;
		sound.play();
	}
}