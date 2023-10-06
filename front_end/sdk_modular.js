/*
Collection of methods and settings for camera preview and associated UI elements.
*/

//0. helpers
//ResizeObserver polyfill start
(function(global,factory){global.ResizeObserverPF=factory()}(window,(function(){'use strict';var MapShim=(function(){if(typeof Map!=='undefined'){return Map;} function getIndex(arr,key){var result=-1;arr.some(function(entry,index){if(entry[0]===key){result=index;return true;} return false;});return result;} return(function(){function anonymous(){this.__entries__=[];} var prototypeAccessors={size:{configurable:true}};prototypeAccessors.size.get=function(){return this.__entries__.length;};anonymous.prototype.get=function(key){var index=getIndex(this.__entries__,key);var entry=this.__entries__[index];return entry&&entry[1];};anonymous.prototype.set=function(key,value){var index=getIndex(this.__entries__,key);if(~index){this.__entries__[index][1]=value;}else{this.__entries__.push([key,value]);}};anonymous.prototype.delete=function(key){var entries=this.__entries__;var index=getIndex(entries,key);if(~index){entries.splice(index,1);}};anonymous.prototype.has=function(key){return!!~getIndex(this.__entries__,key);};anonymous.prototype.clear=function(){this.__entries__.splice(0);};anonymous.prototype.forEach=function(callback,ctx){var this$1=this;if(ctx===void 0)ctx=null;for(var i=0,list=this$1.__entries__;i<list.length;i+=1){var entry=list[i];callback.call(ctx,entry[1],entry[0]);}};Object.defineProperties(anonymous.prototype,prototypeAccessors);return anonymous;}());})();var isBrowser=typeof window!=='undefined'&&typeof document!=='undefined'&&window.document===document;var global$1=(function(){if(typeof global!=='undefined'&&global.Math===Math){return global;} if(typeof self!=='undefined'&&self.Math===Math){return self;} if(typeof window!=='undefined'&&window.Math===Math){return window;} return Function('return this')();})();var requestAnimationFrame$1=(function(){if(typeof requestAnimationFrame==='function'){return requestAnimationFrame.bind(global$1);} return function(callback){return setTimeout(function(){return callback(Date.now());},1000/60);};})();var trailingTimeout=2;var throttle=function(callback,delay){var leadingCall=false,trailingCall=false,lastCallTime=0;function resolvePending(){if(leadingCall){leadingCall=false;callback();} if(trailingCall){proxy();}} function timeoutCallback(){requestAnimationFrame$1(resolvePending);} function proxy(){var timeStamp=Date.now();if(leadingCall){if(timeStamp-lastCallTime<trailingTimeout){return;} trailingCall=true;}else{leadingCall=true;trailingCall=false;setTimeout(timeoutCallback,delay);} lastCallTime=timeStamp;} return proxy;};var REFRESH_DELAY=20;var transitionKeys=['top','right','bottom','left','width','height','size','weight'];var mutationObserverSupported=typeof MutationObserver!=='undefined';var ResizeObserverController=function(){this.connected_=false;this.mutationEventsAdded_=false;this.mutationsObserver_=null;this.observers_=[];this.onTransitionEnd_=this.onTransitionEnd_.bind(this);this.refresh=throttle(this.refresh.bind(this),REFRESH_DELAY);};ResizeObserverController.prototype.addObserver=function(observer){if(!~this.observers_.indexOf(observer)){this.observers_.push(observer);} if(!this.connected_){this.connect_();}};ResizeObserverController.prototype.removeObserver=function(observer){var observers=this.observers_;var index=observers.indexOf(observer);if(~index){observers.splice(index,1);} if(!observers.length&&this.connected_){this.disconnect_();}};ResizeObserverController.prototype.refresh=function(){var changesDetected=this.updateObservers_();if(changesDetected){this.refresh();}};ResizeObserverController.prototype.updateObservers_=function(){var activeObservers=this.observers_.filter(function(observer){return observer.gatherActive(),observer.hasActive();});activeObservers.forEach(function(observer){return observer.broadcastActive();});return activeObservers.length>0;};ResizeObserverController.prototype.connect_=function(){if(!isBrowser||this.connected_){return;} document.addEventListener('transitionend',this.onTransitionEnd_);window.addEventListener('resize',this.refresh);if(mutationObserverSupported){this.mutationsObserver_=new MutationObserver(this.refresh);this.mutationsObserver_.observe(document,{attributes:true,childList:true,characterData:true,subtree:true});}else{document.addEventListener('DOMSubtreeModified',this.refresh);this.mutationEventsAdded_=true;} this.connected_=true;};ResizeObserverController.prototype.disconnect_=function(){if(!isBrowser||!this.connected_){return;} document.removeEventListener('transitionend',this.onTransitionEnd_);window.removeEventListener('resize',this.refresh);if(this.mutationsObserver_){this.mutationsObserver_.disconnect();} if(this.mutationEventsAdded_){document.removeEventListener('DOMSubtreeModified',this.refresh);} this.mutationsObserver_=null;this.mutationEventsAdded_=false;this.connected_=false;};ResizeObserverController.prototype.onTransitionEnd_=function(ref){var propertyName=ref.propertyName;if(propertyName===void 0)propertyName='';var isReflowProperty=transitionKeys.some(function(key){return!!~propertyName.indexOf(key);});if(isReflowProperty){this.refresh();}};ResizeObserverController.getInstance=function(){if(!this.instance_){this.instance_=new ResizeObserverController();} return this.instance_;};ResizeObserverController.instance_=null;var defineConfigurable=(function(target,props){for(var i=0,list=Object.keys(props);i<list.length;i+=1){var key=list[i];Object.defineProperty(target,key,{value:props[key],enumerable:false,writable:false,configurable:true});} return target;});var getWindowOf=(function(target){var ownerGlobal=target&&target.ownerDocument&&target.ownerDocument.defaultView;return ownerGlobal||global$1;});var emptyRect=createRectInit(0,0,0,0);function toFloat(value){return parseFloat(value)||0;} function getBordersSize(styles){var positions=[],len=arguments.length-1;while(len-->0)positions[len]=arguments[len+1];return positions.reduce(function(size,position){var value=styles['border-'+position+'-width'];return size+toFloat(value);},0);} function getPaddings(styles){var positions=['top','right','bottom','left'];var paddings={};for(var i=0,list=positions;i<list.length;i+=1){var position=list[i];var value=styles['padding-'+position];paddings[position]=toFloat(value);} return paddings;} function getSVGContentRect(target){var bbox=target.getBBox();return createRectInit(0,0,bbox.width,bbox.height);} function getHTMLElementContentRect(target){var clientWidth=target.clientWidth;var clientHeight=target.clientHeight;if(!clientWidth&&!clientHeight){return emptyRect;} var styles=getWindowOf(target).getComputedStyle(target);var paddings=getPaddings(styles);var horizPad=paddings.left+paddings.right;var vertPad=paddings.top+paddings.bottom;var width=toFloat(styles.width),height=toFloat(styles.height);if(styles.boxSizing==='border-box'){if(Math.round(width+horizPad)!==clientWidth){width-=getBordersSize(styles,'left','right')+horizPad;} if(Math.round(height+vertPad)!==clientHeight){height-=getBordersSize(styles,'top','bottom')+vertPad;}} if(!isDocumentElement(target)){var vertScrollbar=Math.round(width+horizPad)-clientWidth;var horizScrollbar=Math.round(height+vertPad)-clientHeight;if(Math.abs(vertScrollbar)!==1){width-=vertScrollbar;} if(Math.abs(horizScrollbar)!==1){height-=horizScrollbar;}} return createRectInit(paddings.left,paddings.top,width,height);} var isSVGGraphicsElement=(function(){if(typeof SVGGraphicsElement!=='undefined'){return function(target){return target instanceof getWindowOf(target).SVGGraphicsElement;};} return function(target){return target instanceof getWindowOf(target).SVGElement&&typeof target.getBBox==='function';};})();function isDocumentElement(target){return target===getWindowOf(target).document.documentElement;} function getContentRect(target){if(!isBrowser){return emptyRect;} if(isSVGGraphicsElement(target)){return getSVGContentRect(target);} return getHTMLElementContentRect(target);} function createReadOnlyRect(ref){var x=ref.x;var y=ref.y;var width=ref.width;var height=ref.height;var Constr=typeof DOMRectReadOnly!=='undefined'?DOMRectReadOnly:Object;var rect=Object.create(Constr.prototype);defineConfigurable(rect,{x:x,y:y,width:width,height:height,top:y,right:x+width,bottom:height+y,left:x});return rect;} function createRectInit(x,y,width,height){return{x:x,y:y,width:width,height:height};} var ResizeObservation=function(target){this.broadcastWidth=0;this.broadcastHeight=0;this.contentRect_=createRectInit(0,0,0,0);this.target=target;};ResizeObservation.prototype.isActive=function(){var rect=getContentRect(this.target);this.contentRect_=rect;return rect.width!==this.broadcastWidth||rect.height!==this.broadcastHeight;};ResizeObservation.prototype.broadcastRect=function(){var rect=this.contentRect_;this.broadcastWidth=rect.width;this.broadcastHeight=rect.height;return rect;};var ResizeObserverEntry=function(target,rectInit){var contentRect=createReadOnlyRect(rectInit);defineConfigurable(this,{target:target,contentRect:contentRect});};var ResizeObserverSPI=function(callback,controller,callbackCtx){this.activeObservations_=[];this.observations_=new MapShim();if(typeof callback!=='function'){throw new TypeError('The callback provided as parameter 1 is not a function.');} this.callback_=callback;this.controller_=controller;this.callbackCtx_=callbackCtx;};ResizeObserverSPI.prototype.observe=function(target){if(!arguments.length){throw new TypeError('1 argument required, but only 0 present.');} if(typeof Element==='undefined'||!(Element instanceof Object)){return;} if(!(target instanceof getWindowOf(target).Element)){throw new TypeError('parameter 1 is not of type "Element".');} var observations=this.observations_;if(observations.has(target)){return;} observations.set(target,new ResizeObservation(target));this.controller_.addObserver(this);this.controller_.refresh();};ResizeObserverSPI.prototype.unobserve=function(target){if(!arguments.length){throw new TypeError('1 argument required, but only 0 present.');} if(typeof Element==='undefined'||!(Element instanceof Object)){return;} if(!(target instanceof getWindowOf(target).Element)){throw new TypeError('parameter 1 is not of type "Element".');} var observations=this.observations_;if(!observations.has(target)){return;} observations.delete(target);if(!observations.size){this.controller_.removeObserver(this);}};ResizeObserverSPI.prototype.disconnect=function(){this.clearActive();this.observations_.clear();this.controller_.removeObserver(this);};ResizeObserverSPI.prototype.gatherActive=function(){var this$1=this;this.clearActive();this.observations_.forEach(function(observation){if(observation.isActive()){this$1.activeObservations_.push(observation);}});};ResizeObserverSPI.prototype.broadcastActive=function(){if(!this.hasActive()){return;} var ctx=this.callbackCtx_;var entries=this.activeObservations_.map(function(observation){return new ResizeObserverEntry(observation.target,observation.broadcastRect());});this.callback_.call(ctx,entries,ctx);this.clearActive();};ResizeObserverSPI.prototype.clearActive=function(){this.activeObservations_.splice(0);};ResizeObserverSPI.prototype.hasActive=function(){return this.activeObservations_.length>0;};var observers=typeof WeakMap!=='undefined'?new WeakMap():new MapShim();var ResizeObserver=function(callback){if(!(this instanceof ResizeObserver)){throw new TypeError('Cannot call a class as a function.');} if(!arguments.length){throw new TypeError('1 argument required, but only 0 present.');} var controller=ResizeObserverController.getInstance();var observer=new ResizeObserverSPI(callback,controller,this);observers.set(this,observer);};['observe','unobserve','disconnect'].forEach(function(method){ResizeObserver.prototype[method]=function(){return(ref=observers.get(this))[method].apply(ref,arguments);var ref;};});var index=(function(){if(typeof global$1.ResizeObserver!=='undefined'){return global$1.ResizeObserver;} global$1.ResizeObserver=ResizeObserver;return ResizeObserver;})();return index;})));
//ResizeObserver polyfill end


//1. dynamic DOM elements (preview, wrapper divs, overlay canvas, zoom/flash/close buttons, cameraSwitcher)

var mwb_debug_print = false;

var Dynamic_DOM_Elements = {
	
	previewFrame_Style: document.createElement('link'),
	previewFrame_Style_init: function () {
		this.previewFrame_Style.rel = "stylesheet";
		this.previewFrame_Style.type = "text/css";
		this.previewFrame_Style.href = "barcode-scanner-preview-style.css";
		
		document.head.appendChild(this.previewFrame_Style);
	},
	
	//create inner div container for the video element
	previewFrame: document.createElement('div'),
	previewFrame_init: function () {
		this.previewFrame.id = "root-div-inview";
		this.previewFrame.className = "barcode-scanner-wrap-inview";
	},
	
	proxyWrapPreview: document.createElement('div'), //might not be needed
	proxyWrapPreview_init: function () {
		this.proxyWrapPreview.className = "proxy-wrap-of-preview-inview";
		this.proxyWrapPreview.style.cssText = "width: 100%; height: 100%;";
	},
	
	preview: document.createElement('video'),
	preview_init: function (handler) {
		this.preview.id = "video-layer";
		this.preview.className = "barcode-scanner-preview-inview";
	},
	
	//create canvas for Overlay
	overlay: document.createElement('canvas'),
	overlay_init: function () {
		this.overlay.id = "canvas-overlay";
		this.overlay.className = "shadow-overlay";
	},
	
	//create canvas for lines
	lineV: document.createElement('canvas'),
	lineV_init: function () {
		this.lineV.id = "canvas-line-v";
		this.lineV.className = "blinking-line";
		this.lineV.style.visibility = (MW_properties.global.blinkingLines.visible) ? "visible" : "hidden";
	},
	
	lineH: document.createElement('canvas'),
	lineH_init: function () {
		this.lineH.id = "canvas-line-h";
		this.lineH.className = "blinking-line";
		this.lineH.style.visibility = (MW_properties.global.blinkingLines.visible) ? "visible" : "hidden";
	},
	
	lines: { v: null, h: null }, //at this point, because its async op, lineV and lineH aren't set yet, and undefined is what will be copied
	
	lines_Style_init: function (overlayProperties) {
		//set lines style
		this.lineV.style.backgroundColor = this.lineH.style.backgroundColor = overlayProperties.lineColor;
		this.lineV.style.animation = this.lineH.style.animation = "fadeColor " + overlayProperties.blinkingRate + "ms infinite";
	},
	
	pause: document.createElement('canvas'), //pause lines / rectangles
	pause_init: function () {
		this.pause.id = "canvas-pause";
		this.pause.className = "shadow-overlay";
	},
	
	locate: document.createElement('canvas'), //green location border
	locate_init: function () {
		this.locate.id = "canvas-locate";
		this.locate.className = "shadow-overlay";
	},
	
	//create image buttons for flash
	flash: document.createElement('div'),
	flash_init: function (buttons, handler) {
		this.flash.id = "flash-button";
		
		var divImage = document.createElement('img');
		divImage.id = "flash-image";
		divImage.src = buttons.flash_icons[0];
		
		//if not enabled hide the button as if it doesn't exist at all
		if (buttons.hideFlash) this.flash.style.display = "none";
		
		this.flash.appendChild(divImage);
		
		this.flash.addEventListener('click', handler, false);
		
		// **style for position needs to be linked to canvasOverlay's position
		this.flash.style.position = "fixed"; //absolute anchors it to page, fixed to screen
		this.flash.style.cssFloat = "none";
	},
	
	//and zoom
	zoom: document.createElement('div'),
	zoom_init: function (buttons, handler) {
		this.zoom.id = "zoom-button";
		
		var divImage = document.createElement('img');
		divImage.id = "zoom-image";
		divImage.src = buttons.zoom_icons[0];
		
		// if not enabled hide the button as if it doesn't exist at all
		if (buttons.hideZoom) this.zoom.style.display = "none";
		
		this.zoom.appendChild(divImage);
		
		this.zoom.addEventListener('click', handler, false);
		
		// **style for position needs to be linked to canvasOverlay's position
		this.zoom.style.position = "fixed"; //absolute anchors it to page, fixed to screen
		this.zoom.style.cssFloat = "none";
	},
	
	isPreviewFullscreen: function(){
		let preview = MW_properties.global.partialView;
		let isFullScreen = (preview.x == 0 && preview.y == 0 && preview.width == 100 && preview.height == 100);
		
		return isFullScreen;
	},
	
	isContainerFullscreen: function(){
		let container = MW_properties.global.container;
		let isFullScreen = (container.offsetLeft <= 0 && container.offsetTop <= 0 && container.offsetWidth >= window.innerWidth && container.offsetHeight >= window.innerHeight);
		
		return isFullScreen;
	},
	
	updateClose_state: function(){
		let buttons = MW_properties.global.fullscreenButtons;
		
		let isFullScreen = (MW_properties.global.previewType == 'container') ? this.isContainerFullscreen() : this.isPreviewFullscreen();
		let isPartialView = !isFullScreen;
		
		buttons.hideClose = (isPartialView) ? !buttons.enableClose_setting : false;
	},
	
	//and close
	close: document.createElement('div'),
	close_init: function (buttons, handler) {
		this.close.id = "close-button";
		
		var divImage = document.createElement('img');
		divImage.id = "close-image";
		divImage.src = buttons.close_icons[0];
		
		//check if isPartialView / isFullScreen and update state;
		this.updateClose_state();
		
		// if not enabled hide the button as if it doesn't exist at all
		if (buttons.hideClose) this.close.style.display = "none";
		
		this.close.appendChild(divImage);
		
		this.close.addEventListener('click', handler, false);
		
		// **style for position needs to be linked to canvasOverlay's position
		this.close.style.position = "fixed"; //absolute anchors it to page, fixed to screen
		this.close.style.cssFloat = "none";
	},
	
	camera: document.createElement('div'),
	camera_init: function (buttons, handler) {
		this.camera.id = "camera-button";
		
		var divImage = document.createElement('img');
		divImage.id = "camera-image";
		divImage.src = buttons.camera_icons[0];
		
		// if not enabled hide the button as if it doesn't exist at all
		if (buttons.hideCamera) this.camera.style.display = "none";
		
		this.camera.appendChild(divImage);
		
		this.camera.addEventListener('click', handler, false);
		
		// **style for position needs to be linked to canvasOverlay's position
		this.camera.style.position = "fixed"; //absolute anchors it to page, fixed to screen
		this.camera.style.cssFloat = "none";
	},
	
	cameraPreview_closed: true,
	
	cameraSwitcher: document.createElement('div'),
	cameraSwitcher_handler: function(event) {
		let target = event.target || event.srcElement;
		let caller = target;
		
		let is_active = caller.classList.contains('cs-active');
		if (is_active) return;
		
		let item_i = caller.dataset.value;
		
		mwbScanner.closeScanner();
		mwbScanner.setCamera(item_i);
		
		let quickRestart = setInterval(function() {
			
			if (Dynamic_DOM_Elements.cameraPreview_closed)
			{
				clearInterval(quickRestart);
				MWBScanner.start(MWBScanner.result_callback);
			}
		}, 50);
		
	},
	cameraSwitcher_isVisible: function() {
		let displayState = this.cameraSwitcher.style.display;
		
		if (displayState == "none") return false;
		else return true;
	},
	cameraSwitcher_init: async function() {
		
		this.cameraSwitcher.id = "cameraSwitcher";
		this.cameraSwitcher.style.fontFamily = "Roboto";
		
		//<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
		let roboto_font = document.createElement('link');
		roboto_font.rel = "stylesheet";
		roboto_font.href = "data:text/css;base64,QGZvbnQtZmFjZSB7DQogIGZvbnQtZmFtaWx5OiAnUm9ib3RvJzsNCiAgZm9udC1zdHlsZTogbm9ybWFsOw0KICBmb250LXdlaWdodDogNDAwOw0KICBzcmM6IHVybChkYXRhOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbTtiYXNlNjQsZDA5R01nQUJBQUFBQUQxSUFCSUFBQUFBam5RQUFEemtBQUVBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUdtUWJtV1FjaFY0R1lBQ0RJQWhVQ1lNOEVRd0tnZHg4Z2NSN0M0UUtBQktDRUFFMkFpUURpQkFFSUFXQ2RBY2dESUpKR3pOL0ZlellTNER6UUlFUWZZNGdJeEhDeHBrd05uZzlNcERiQWFsSytQM2cvNjhKY296UndQNEdhdllsTWx2T2tGMmlXOVpjZEVmYUZyTGFKU29pOG8wbXNhWjFKeWRab2doUGRJdlFZdUNma3Q3NWVUS0xYMk5mQVlPdm9BZ0d1T2hkZzZkOCtTSmI1UUNoQXRPWjNlRU9WVzIrMWxOQ1gyOXR3b3BPNXNrck93UGJSdjRrSnk4UGtkMy8vNitxcnA3WjV3clJFL1JsWnQ4UmdKZ1JySWpJNEYzRDgrdDgvOHJwY3lkNjJPUkVUK1ZVbklnNGRiTFBjVGlaQzNwdVl0d3RNRFcyV2JHVW14a3J5L0I3ZGFVMEFrdTIxemZySloyV2RJVC9RbGpsdWpaVm5RcXJWUGg2ZkQzd2xGVit1cmYzejh5Y2FlWFcvdDdlVFd1YlVza0NHTkFQRnNBUVBzQUFCdkRUVTMvYjYxOWkzbmdLQWZWTW5KcDBKOW5PNk42d1B3aDd3a1JBaWxFZ2VNQTNMMlBBRFdUYmhnTndDUXNqdTNpYXROMTU0TzlGSUxyenFUYkM4cENHWlp2L09WMHdicXlmcSs3aGNkMzdSekttOEhndVRyMjYxZ3VPZEprek92TE5hS1VQRU5UYy9sY0JXdTBlK0gxQXRoVmd3VFNTcjVQc29nbEIwVHA5T2lxbE8wUEM4UDMvZnIvenhSUlJUVlFxcEU0Tk01dTczdjNQYWNFbEVicXVza2FUL2xBY0M0OXF6OCtwR1VWd3h5Vm9Bd0FGclArbnMyeG5OUFppYUhZdkwzdGhKK3h1aTI0VExoMG9nZnJVb3k5ckpjMUl0Z3dIOHBFWER1eEQyMGRrKzhEckVHQ0hDeGNpN0lnNllLN1RwVzZUaXJnb3ExUWh3SmJOL2xCYXY2Qk9JaHpDZ3hPbExrV2lXdCs4b2pTTk1XaVU0dVFIOVpLZ0RvZHlPSXN3c3ZuL3I2cXU3NElTYlpGbXBQL1RoeTFyaGcwZ1VzUWpqMm5UU0QyUy9oQ2dTakNOU21sdDlNTjNJVDdkUUxvVnBwU3l4cGxhblRQdEh1YVlyVlYyT0x3THNZa2hNak5iLy9VM1AydWUyZFp6RW9KSWtDQ0RXK3IvdGZ1eHZlckhSYm0zaVhtQ1NNaVJzdnlSMi8vL1RHNC9rMk41WW9uaEJSZ09pL3YvWGNDd2tHUUFZczRQSkYwNlNMNThrRUtGSUNRa2tGS2xJQlFWSUQzNndjejVBUUtCQWZZQURvQUFBWklPQXV5aXpBRGlWcmV4ZFFHQ2owd25Fb0RnWTRtaDBVRHdTWUZKc1VBUUF1Q0dsUGJFUnhOakFacFJTQ0RVUFltbGJpTmFKQU51RjRxbFdaWDY0YUVlcDhmOHVEOWVqNTJ3VFk0OE1sNm5ZSjVJbmJUTjJNd2JIN0ltbTBvdVIwdHVZRXB1ZURBTWhtMHBqN0F3bGxXYW8yR1ducjRlODlSOWYrelV2cDdxUThsUnJ0RDhnWUJZUWtCaHhRWkhralFac3VRb1VhWkduUVpOV25UbzBtZkFrQlZydGh3NGNZYm54b01YYjc3OE5XclNvdFdjZVFzV0xibGgyWXFiYnJsdDFacDFEejN5MkthWDlyMXk0SjMzam56dzBTZmYvZkRUTDc5QnRQb3hCQjNjZEdIcDQ3V0pGd1RYWXBSaG1oZTJlVW0yRzhYdEQxcTRtZmNXaTM3RFVsaXhnZWVhN2RiN1BQczFyejdnTzRVS0t6WTNyemJvU09aenMyRFJraHVXazYyMmJOdXg2N2tYeVY1dnZMVHZsUVB2SGZuZ28wL0o1MTc3NHF0dnlmY08vQ2hDdkhzMmUrczVNQjQ0NUhjbkpLMWVwOU43ZFBzdC9kNjBpWUF3MGNJN3c5MTg3MEpEOUdOdVBjRzdsOFJzcDJTMWpQeTJRK3BLcGQwTmdSMDNZMXp1NG5PQmNNQ0p6WnMxRGhNUFgwSlI3UGUwYTA4ODljeEdtZzhLQnV1QzVrVXNpejVnQ1Zac3VNNjFDQlVjRzJFMGlSYXR5VjRIWHRyM3lrSHlFOFl2djlPc0xQb3RTMVpzdUtxdzU2VjlyeHlVaHJQR3lZTXFiMXhROEZaNEQwYysrT2hUR2duVFJiQ2F0ZW1ZR2FOSTJ4TlBQYk54a1pVdE1RN2dtSTN2UE81ZHhSdXI5MW80Z2c4KytsUSszUEdlNDlGSHZIc2JISHZ2TSs0dkFvMElZOTN2N2ZnYUpOOVY1TURTengzYzR1ZzdMZ1pyVDNUcnh6eDR6cjJMTVgxQlZ0OGVlazhYVXM4cTdSbnQvUUNrcVdrZzF0aEJscjRPbTNlREFPWTNWMjdDK0lHRHhrUEcrMFY3cHV1Z3pYNlQ3N3hzZmQ3OXVzT1ZscmtaaUYrQi9rSnpTSzkyVkc1bk52WlVJVnZMZmI4TWRIK3I0RWZHK2dDZTFuNGFIV3hTTi9IbXV5elMwZHpZeHdaMVJMWDR4OEo2dnlvcjlsVUJYRjZ2SDZuNDUwTHhUNVdhYW41RnNYKzJwUFV3U2xQZjZiRDc3WGJZeTFxaDlmcFlJR1pTWXJvWFBhYXo5cVF6VGZhMkxseXd2ZGp6UG1DdlRCemlhZ1hMdU9WSkJkM2VYclVoczd1TFVadDZYQTdGZEhuekk1MFl3OWxTMWtEK01NQmN6YWErRC8zTnJGRHNIZmFJVG0zZjRwVk12TUhTMjkwdSsvcSswbnAvMGFiZ2JUYjFmUlMrRTYvNFkxanB3TWE3T0JaS090aE82U3RPVGJFYmM2UmkrMjdlMXBvditWY3hUYzRhSEIxVVppdi91K2FpbE8wRGRFSjJPL0dGTHNxYjYwTnVWVXVpYVFITnRxb2FIdml1OWJacEtmYVZkM0hSK2ExMkcxcTM1YUoxc0JGckhpWHV0OWNFclpldldzYXhZLzAvRzZlV2JsOG5FamRVUllIZEZJS2hNTmdUaHBNa0MwR2VPbVphREt4VWN4WUVXSUVLczYwdHdva0xVVzVVZ2xmdDQzejRPYUdzdHJSR2JXUjBuRlZGY3c0b2VlY1RWOS85NWcxRzB3TGhJM3hFQ0FzeFVCZ3BLa0NhY3BHaEVGbUtwRWhaS0ZGV3lwU1hHb1dvVTI1YWxKMDJaYUZEQmVsU2Zub1VRNSt5TWFDY3pDbkthY3JFZ3ZQMFdBbU5FUWxuQ0hoUU9CZk8xRzhsSEdabW9GaStsSmtmNVZBbW1GNEFIVDdORUVJdmdnNmZObEFoSFZUSVhHM0l2R1V3SzJlTXkwMnJrTlk4Qm5saUE0dk5xVGFiTFMrZzdOWG04ZElCdEhlWkNPOTlBbjlOcE14K0J2bjhKRnlFeStIR0paUVhsbktURkNnNE1DZEJZUlFwSHpVS28wRmhUbkVPRHl1eEVHYkNRM0NFazdBU0RMaVhzQUt4RVFINVJ1QUU0Y0M1Z2tMY0tSdFBqdlJ3K2RBRUxkZy9VQnlZY3FFd0ZabVFlZzE0WFNWY2hKdHdFVzZIMjNVSVhoQ1VnUGxKWUlTWnNHSW1lT0VFSnlXNExBdCs5ZzJTb0MydVQ1MlZ4d2lqVW1YSmQ0YkVkQUxNRkRHcDNPVGxrU0E0ZFV1eitiVlZZNUlWYVdlUDNPcHBYV1N6dFhVaVdDSkJoMVJCeEJ4S0pHQjRJV3BlVXVWR0tleWdXUjcxbExnWVlQQnZlc1lCWmsrS0RBOEU5aGx4YVR2Z1NiSEpNU0RpU1hIQkJCRGJhaVNDcEtjVndoblBJcEduQ1JiRWFDK1llUXdUbFN1Y0JwWUprZ0RDVE9EbkhJRUZMem4yMGx6d1liQWhGWTVCQkxWaGdsRVk2bE1EVVJKR3lJUkI0ZEQzaXB1dzB3TkdrOVhXRlNiOTFGR3ZjRlFOV2pkNmQ0RVJ4UmJEakQvKyt1Yy9CTUJuQW9va1NCZ01ERGNSd0tkY3d5SldTaDBKNGNHTER6OEJvU0dTZTBEWXVCYlQ2akRiYUF5bEdBZEVVUkhFSUlnY2xMTTlJSld6NDZCQUIyT3RNRi9GeGlqdDFyM0c5NWtBcGVwaGNjR3czZDRJbW90R2pSbXYxV1pZOEp4ZWtpRlJra2xUNkJndXV3SUc2djdrUjcwc3FpQ0IrZGFwQnNRSmVmUDRuakNZb2V2ZjNVSXZBTTRBM0JGd0lzQnQ3K3BnQVl5QS9ydUFmOEJqMXBZRVlxQjNBZFRWazBhTUdEZ1VIdUtJalBDWkl1TGwzNnh1eHdnU0dyQlhqaTVEaGsxYmRNZStJLzhobGNEbmxWek1wN2x4SWhYYkVkc3RkcVRrc2lyYlpiOWNLM2ZMSTdFa3NhR1Q5dTMrLy8vL2Yvcy9VTmhMVEpkdXd5NllzZVN1Vno2TVNqaHZ1T0Roa3NwaXhhK1dPeWV1KzF2dkVlL3JlSG9XTUtTVjZ4UHlTdWMzL0h2ai94UC9ILzhGZGFjMHYwb0tkbkxseUpSbXlmaFMvUGZQN1JkdDFVS0RMb0NRc3F1dEkyOEZlSXJzM3d6Mm1tL09nOThMWHZrQ2haNTQ2cGtObTRvVTI3SnR4NjduWGlBcCtSM2hlNWVzMUdkZmZQWE5kMlYra05NdVQ1azBhMExZODFJaWdCdjExSFBGcUVyemdDUGJBT0hPVm1KREhHdGRqYnNxWUNZTjk4S1BKM3B3TFRNNGxwOUJBVmdEeU04SURvOFI4WjRUL3NXS1JNWkExczhFRXBIM2RvR1BBZ1FCZTJsQ0V2bVFsVit6b1VpbmVyenAxS2ZYK1FaVmZaWTcycmhyZlNRQW50ODBxZ3RMc05yMHBkK1ZPcGxRY0VUWldxTUxmWURJUjQ2TCtaOXhLR2xkMWlWWERHTzJBYnVoTlNuSmczWHN3WnBwckxBWWRFV1Z1ZWYzdlJRYWViYmJSOVBmU0creXpyRVpQUFZMalJzU0p2Y1gwb1dpTDRuZHhnbWhYUUxISVNzdjNod3hqaFc2dWZGTlluYzIyMnB6YmNVMUVWRFNzT2MyeTZRYUVCSmFMNkFJZDlkWlRHT3pJSXZwbTJjV0puanlnYXg1QmhsNUVOL2ZvR2dZNmUvRGlCSjBHMDhJdkk4dUpyeDQ3SVRaeG9Ga2RiT3MzTllIb1RIQSt2K3JkMFhVWmNvTjRGL0EzdDhEUjE4SDFNVkEvZ2E0OUN2YXpBZUJJM2dnWU9aRUlYSU16bFpNdEFMQUpKc1BiaXhkeGRBeWpjblNtV0tOWW1wSXdLTGJjc3VzRGhRZzFUTENRdTFLVGZqcGh5b1BLcSs1b1FtRm94aDh5MzJnYUJoU0VMN0ZWRzc4OFlDYTh4R2ZCdThDTHRyeFBJOU9vOEVRWkh0YW5Dc3ZXMk5hTHhGbHAyOWVzYWowNUl3enE4UGtSRFI1c0xyMlVaK3FrSVhUUnFHU2lJdUpkazYyVm5WdmM5VGVlSnp6NUpKTk5weDFKcjFMcHNPdVJiM3ZZMndRM3lXdHh4aEhJMktxTlRycnNEbXhzQ1pLSHpxVG1HdTFEdnJKRTZ2bWdNYlVTaWVMcmR1YzBzYTJlcmp6QkNueHppdXNzYm5pSSt3UXNaSEJuQmJIMHNuU21zTEpGTElnRFlnZnkvN2hUcmpySDJMb3JTamxPUDh2ZjdPZjRrOTZOT1RKT3ZTUlN3bENOWFJEQmZlcUdTaEVlK2J4UzA1bVE1aXpSWWE2QnRKVHFRREk4RjlYWGxJeTBFRFlwN1BFdVdSeE13b2hQTnRVTENTd0VWL0tVVTk2eEFscGNVeGd3d0ZqSThIUXhTMHpnQUZ3UnkrMitVUkNRS1lDS3JhVE1pK2Y0ejFjbWtXN1pRRGxLRGY5S1BkTEcxVFMwMGVqT3VwTnVyak41RXliclE4eHR3dGphejJYcVowTXVEY0x4bjA5NkJsUjREclVjRkUxdUcrTzUyUVF0YmxWRW9mMitBTVNsaU9od2dhNGRpN1ZyN0NPYUVlQ1k3VStkY2Y0SHQ5MFJVT2htb0R5WFplNG1mdkNwbGdUVFRKRmFkSGpyY0pnN1JrMUpBemtVTU5ENFZpMW5oNk5mUEI2WTBnemhRb3lYQzhCTnBPRWx3V29BajNyMkk2STY5TnN0d0FOd0xiRXFla0szaUJNVlZOTXJsNGVtME5aSTFJek1wYmZncGFWaWNEZzFCdzQybzhKZWN2VGtpMmVkM3I0RHFRbzBQRW1uOUUreEFSaVhHMjNvTlZCNVpidG9MZEF6OVpZUVNJU0ovYUMrOFJZc0Z0cHNZM0xvMXVzejNTbC82cXgxNExmVDNyQXhmRFMvOStiTnVkeHBlblliY05mVGExNzZVRUtKL1NwMm1OUkNtMmd3NlphbXRmVlZHbXFIVmVxTlIwZkc1akREVGdFdEtHU0ZJQk1Od1dRQzdnNUR5Q1RmM1M2dzZVajVtYkVhL3B3Ulc0QXovRTFrKzdrRDRKWTh4dGNueFNEZlZGRlZ5LytWc05GWDVoYWE5SzQ2YmRZNFNYS096bzNHU094U0R1ejBpTCtPS0VabnhoTElrdEtheFJUZXYwTHV0ejVqblI2ZCttU0NVOHpWOElBTUd1alFyVGpOaHpTL2VlK2tLMUpYbVRZNkg3U0V6MnQxbnRPM0VhdXBFWUNmUUQwNlNPUFRsd2V5KzNNc0J2MUJheWp1NXRRZlRKNGs3U3J2YjVhSEUySDIxZzdnYzU3d2pHbHZBcXNjTElETld6MDBJV1FrUGNQNkhDZndrT09RbzZiMUVwNWRnUGNpUGdaRzRRU0JsZVVRaFlyS25HUkpiMUhJUjlRZ3EzaGFNazNmR1pzdC9lT3VSTjVPekJ3c2dpMkdhTGpKU3hadzdXeW03YlA2bmdvaTBENGV5Ym5GZkxBSXBRdC9EV0dPSTV5WDVPeHhRa3hOQzBhaFhQanpuam5mNlU1Zy9EYzd5UnRVRDBVb0gzY0VIY0kyWmw2OVBVcGFETUR0ZTh0aTRLb3NhRU5PQlJZTW81c3k1TlJrMXE3T1E3ZEptRkZYUjY0U3ZyT1VWVU04RWNJbzJ1YTNJcVZMV1cyN1lybkI0UzFlTEF0eTFvRkpUbjBzTmdZMnRTZGxjMHQwaDNKMUhRQXlKU2lCbDQvOGFzUk53RzgvbGxxcWtjRHE1MWNVMUlyS3FjOGxjVjJXNkwxWDN6SmlTa0VtS1E2VFJ3R2FvSkZ1bkRHR1MxQ2JvamU0aTF1WmhndWQzaUhadWdTOGhFb0tBbUhRMXhWREhwbEsybjNySGpHNExXU3JVM1p1ODRFaW9jM3dBY2JRc3dMTE91NFBia09HcENGdWdibndlS1krcVFZdWJQZGRiSTFCcENWVU5SOHc1VGRLc0lMTFV0NmZlMlJjb3NqSzRWekFEUDVNZVZQY3dNTk1mYzBtSVdyWnpBTXN1RHJHNUYvWW91R2tBZDZpZlVWU0J4UDJsalllU2JsTEJtNGpwY01BOU1NNnpLSlFNc3JQK3F2d0lVY1pXRGQyaUgzTzl6dVVJdmxyZXF3TnBsRXJNQUVEVHhVL3k3WUVLanQrbDJmV2ZXSzV4a0d4UDRDc3g2L1JvcWdRVTNnMHU2N21mNTdzcnZFM1A2anNEMWk3ditmYk00aGRQV012bXA1cmNSQVRBTW1iM0pFVDhFZStHT1cyNFFiUmhCaG15V0F5VGcwVFJ6cXhIZ1dVZXlvQS9UVlU3OHhocmQzZzBnODlNc0xQd2tFRnIyeERETTZoSk9HeU1OVmwvVVhROFJKWmhxcWxYQTVxdVZsZFZPdEJxTFBTNjltamVqa3hvaGpPU1IraTRxdG52dW9aSFJSaUtqN3QrRm1ndzYrakEycHBYSEcrODEvMlhGMFZGMmkrdTZ4S0ZjNmhFVEtoN0FjR1F5VUt3T3ZsNHpPWE44SDc3cWZxcjNoYW1rWHEyQyswTXQ1MGdDN1FzU2JIYndnVG83aUxFck9TOU5KbnVJNmZkamluSDdVRE84NkpQMm11dXV0cUtzRnNBNjE2L1NDL1VXeEtiK0s5OXBJamxObDVnSnFSUkFzWFZDZVgyVGZNTjh5ZWhnbGJnTGVkbmJlZ0t6QWlNU05ON0RGcUpkWS9PRFAyNnBvZ3l3Ui9GQzl3VFlGSXBrcXFXaDBpZ0tTa3l5R3Y4YnRwanp0L3dLakJiVWxiVUxBRGNzVllaSVhwcEY3cStUNWljQnIrbkdadTJXZC9JZmFBVXRRQkxFcVR4RFZqam9la05HRVEvWWtsbGtVNCtsK0FvUER2VzFPaStKSGZkSFhXbWdSeEJWbW1ITDk3RlpWWmFqV1V4TGtLS25QVTdpZ0phNVlGakNuMWRJYUNjUVZPSHdjSkNxNXRpOVBFb2xhUWlXb25JajBhT0JRaS90RGJ0THkwaGtqVktyWFVoc3MwMnJ1cTA1dSs0bWd1WGk3TFpjSjVjTGlDdVp3VXNkdDMwUmRYcVBDWlhFNUZyY3RTWndtK2N2blVqcW0rZnRVK0h3QVdhZ0FBZ0xlWmFDVWdYd0hONVg3bVI5bFloTXRsWnZzeUNISGJBQXIvejluSHpFUUVMb201RGszSGg4T0ZiaDZtWElkMXdpUXduK21zSzBtWjl0elBjN2l1TkUraFM3NlVjYU9INzlaTHhIVXM2ajhibTlRL0VEMlcvN25mNnRhRlg4QUhGMWNSZG1JS2UraHNFY2U1L1JaMENwa25SRTVTYkt5Y25QNlFTSXpENUMwZVhpb0QwQXljUldZcHh5eHByN29oa08rWk1nWG51RFYwZ3ZXZUs2ejFlTVZDSVFzcnd4Q2xES1hhNXBJYUJ4NFY4NWVjamVzd0o5bXRFTXo5ZHJhVVNteldTQ01JdUxVU1owUUdsVjF2MFY1OVhUWDN5Mzk3ZEJjMVM2Qk5ndEVWMnZrcC9ya1pUZXByaGxkdjl0OTd0cTlIdHl6K28xZVhzYWIyMU1WeGVlSnFka1pzV0ZGYWNwQkF5bU83Vkg5SzdjdllhZnJwdW1ZKy91TGRFcDFQYW13UGpzU1ZkZFUyTk5mV0h4dWdHeFIxTk9UWDlEZlF5bEYyYnVIV0Z1NEJicGEyYnVHMXJtR09oOGZVeXJzNlVQMTlsSXNoQ1BtbGlNZGZnQlp1Z2E1V2p1NEJWdFplQVM1L1BnVVlTeWZSSXd3emdvaFJTYU5uRXNLU0RhbVd2VE1YZTVybUx0UTdPRlJGK3NVWlc5YVlKcmYyZnMvN2Izell5dUFhR1c4YUJhK0R1MCt0SzVOand2cVkrckpLRWhwcW9BZGZ4bVFURTEyTmxWU2NUTXdEZmF3ZGZhUExlRmNyK2FPeXdkYjlaZ2krK2RwblVmNFBIUEo5T280eGsyME1IQXBLQmR5NlUveWw0d3Zza29iZm9ObjFqVGJUbXI2NEZsb0tSWGZuTXo0QUNtSzNYZVBhQk1KZEpDS0w3Ujg3NXJTeXN4OTlwR0NwMEtEUWh6YXZablpSeVpHb1ZIVmE0RWowNWQrYkl3L3kwdE05Z1Y3dzBqRExjWXQrbGU2bnlGVUxCNWg0VnNBTCt1ZHFBNE5XdVpuRXoxb1BNQlNBNVNweEJGbHhXRmloVEF0cTFNS3BkQ0JNem9UWTc2cCsvWndXeDJ1K3QxNDg5UzdONXZ5TU8wcHRqZUZENm1WK2V2UXBzeGI4ZzZsdE9nQjdJWHVFOGE5SkhJZjE2S0lqaHFqK0x0U1hJNUxoeXV4dERxeHJLbXRuTDRNKy83azVwdTFpNCs0WklwN25qbndCNnRTQ3FENllpTDRIMWVTRStqRGYvYm1WZytmWFBmUHVCaDVNbFd5WUNSMy92L0xGckI1aVpGWVg1cERxcUFVNXJhVzFFQ1VUSzNBdzVYR0ZXZUdjMk9Nek56SEJlblBTd3NyN3RhM24xaXR2eDYwTzFrZVpVQmVPa1R0N0g2Q1BaMzl2STY1TW9MSm91YWs1TmVNdE5aMDBJclN6ZFNaUXRTL1hteVhlQVQvLzczWUlSWXVYWHZPdXJiN2hYMzFIdHpvcjBXTlc1OHo0aDdWdnpOQjFOVnN2UHRaZW5ibFpIMUQxWlNUaWF1bDVJVGxkY2w2ZnU2bXgyb0c4K294eFA1QXBRVGxvc3VwVi85dDM3My9aK2RLU3Q3VkJPVUFwYmgrd3RTYlI3TXpieDh4Si9wbnREVC9hbWo4VVZOUldGQmJ5UlVpR0VNaUpjVVZrYmVLeUZ1bGxCQzE1M25hWmwzNGdCeEdadWdPdVNiMjhHWW0rZkVQRXo3TmZnZVNNK0pFbS9RZS9PcysxMC9mdG9UamVPdEw3Uy9TTTJvWnpmV1ZNOTRZREZOaHdwOTVOZkhNR2pYeGpIbGUvYk9LSnQwbVJpWmRKdElxbzJWMXNHc2FnUmsxR29HWk03d2h6VkNLU3FrdHZvQ0U5NHVKakVtSkRNdU05cVpEM2M4WEwxMjl2M0p4cEx1ZkVHM3AyRFNqNThrL2d2Q0U3bStzSHgveFRWeFc3OVZ3S1hPMnJxeCtoYjNGY1M0TmRxMDIwaWxYenNGQVRSYTdYNXRBMlVhT1lZdE9OOW92bjFvY1MyWDV5dnFkU3BDYXVlYzFmbkwwQlBIaExaWElYK0U3b3oyc2dxell6VXVaNzQ5K0JtOFBuemZhaldldmNHejAwSXNOUGU2SFZ2aVdaWlRjOUk2Z2R5OHJpSnk1S0xGQTY1TllweTJNQ2h4OTczUHBCMGpheHJ2M2N6TmhpVzNCY3NsaTVLbTgrYi9iQjFwOWJQcWtscklNSmxIRFpvbWNobXhDR29WQUZmYXd5MThWM0JmOTlSNm1tYUJaZnJOS2pmbmN5QUVmakhkdmxuKzRwN1ZoNmk3bjc0cDNDM3lqWFFOVlFtTVdMRnBwdlhhOHQwTUQzUEJkbFh1bzFQazVpRjBEbTd5eTlRMzMzL1hIQVhZZDBqV0FkYWNpTnR2YkFaSlcyL0ZnTGRWSjczcGhjT0VNUU5KSUhZdWZnazNzWnFhdEl0RVJ0RkZjVDRNYXRKSnJwUnJKdThkeklMbytveUVtTWJ2SUFWVDBkVnRzbXRDdFpHbmgxSVloT09hQjJlNnQ3aG1BcE0wUXQ0aXo0YWw5RjFGRWVZSTJ5M1R2MTV0N1R6NXUzcGpKSmxNS1VtdnFBVWxKOE56RnFiZFRUL0F1NmM2QlhvSFVXWVg5cE1pMjBmWkVhNHhaV1VFZW1zajh1U3YvMmJSL2lpdFlaSysxVm1TdENSdHdhakgzWkp0VVdBc0ttbDExb3lwOENRK2Z0bldzNlg5SU5XRHFwUTB4OTlWb1FiY2o3MWNic3d3TWpiRDBVWTNXcjBId085eVhMOTNsaG4yTi9uMWZsTTY0eVFIN294dWhyYlBwdTRiQUVjZm41VFgwM25lM05zK1dzMVdsQldkYksyRWhEbzdZL2dmRnltbXU4SnNGYWFxZkxiZ2NHWFNuc2ZTSGNkYW5BWFNMOTlwRTNmanI3ckVra25TNFp1dG1KK0FQbWVmZjBOc1B5VFhMQlNxdWtXeXIxWWZTMUw3YXJKSXVhaU9RbXJtU3Y1M2VXVzBhd3U1c05MeE96THVaUGx2VTI5QmMyWkVWNTltUUVSVjZLeVBvYk54RjNOcXJCaml4ZkNsM3R1aDYwOW1tN3N5SDlVa2hWc25ZTllERVRnTWs5a0ZIbUpMMWVkb1d1QTJRenpqRmo0UWdhSGZuMnRPTzRRdmRaNGVHTzU3cGwvMFRSRnk4TDc1QUd4Q2ZvTjNUZXI0aU5DMHpoSVgvT01OViswTjZSSFNPNC9qZUxDOFBiUVE3TDhrYnl4dUxTNUljNFVYU1pqeGxUQXQ4Rko3ZnZQZHdjeS8wVlBpcEY0ODJiOTNialE1WnkzejY5Rmh3OWJHWlkzU0ZicWhvdFJtM242aFMyU3ZnNnZoZWNWcHM0bUFhb01qVFRlbUFhU3I5Qkt5WVJwTkNLZEJ3b0NFdnczQXltbVpkZjJMTlNndWV1M3gxZDBqdVlhN3N3MEZwN2J6R3VzWTZZWkZ6VHpzaHllM2pNditaejd6aXNhNWI0NVIrd0RnY2R3MU1KQ1lFRndkYk1KeUlEZlB1S1pjZk1PQm5QOVZMdW1PK2xMdTNla3BZYkZXN0xMa25CbWFad0xoK3ZKQ2Z1UjFYaGM0YUFDandXVCt1ckd4SEZqNkZ1RnA5dTNUU29YL05wWCs4dVBaMm1INUJjRzBxaytjSXdpZTVkejQ0ZGhNaEJZNTlsZmoxY1VuZHBROVBtSVpIbUNJcVNaRVZMU3N6eHk4M0w5djRTZjU4b3poOUxUWmZuUTVRNEQwNk1iWms4Y3BidFI5VHFLbkdPeVNhWS90SDU2WWhjdU85TUZ2Y0JrN3NrMFIzeHArTnl2d0hoenh3dTAxNDUraDhXVkNKZzZweHZIdkpYV3ppU256akdhNGFVUTZtOHBJV3dxdkJRZXBnM0FYNjFRR2pIZWI2QXcydndJZ2c0aXZxcThGUWY4bS9oM0t6aTdFVWRHcS8yUDBmSCs4bmJ3ZnJ1UG5IcHRRTWxUUTBsdm5HNXM1Y2U2MUMvelJaZjdka3hLbmp2VXZMUUVualBSSTNmaktqWWNFZFZuQ1RmZ3NrUmNURmVaWDRTOXJCNlFBRlBsdTcwblhvUzZJS01ZUnNyMHhDdENIM3VNNmtscEMrU3QxM2RRTWpFL3hscktoOHJJYm1YYWEzRGYxTFlsclc2bzY3ZzFJY2czZlB6YTBuUDBsMnZYMG1pT0RPNlNCU1V5Z3JMNXlHTmV5Ry9GTkNrR25yOUpXa1NHSjJlRWtHUy9ncVkrSHRxMHNtTGJ4MG5UVGN1QTZ5SkxQMWhtRC93dXE0ZUVsMVp2M2RLcVZ1WWxUK3NYZWsvZHFoMUd4Z1ZQN1EwZU05VDhvcnptOHNqZlp0bEpmMlBqRTNmczcxZlZkaGRpRStpNWtPa0UvNzBhbnhsT1c1NTVLb0tmaGs2d055SDc0TzZWdzdXTngyUDk1UDh2K2h6TUpNYkI0VFlRQWduOUlSY2FtTStRUGxQMU5NakxZSHhlZmRxckh1bFdkSTdXc3hzb2wxRFNxWGpGb0FYV2NjbHVWVjFhdDUxVUpaL0poTnZETy83am04ZmFKajhjN2t5TlRlMVRxR2JWNU1VR2lDdTRWcHBDbTMvcUNyYzVwNzlhc0w5SUlsNy9oekFYU0VUeG1CR0puakVzS2ZiSVJhb2E1MEdtc1lHWXRsTmxqaXpMT3k2OHM2RjZnTHFFRFZ2T2pvbkh2RDR6ZkEvQXo5OHJjYmErYnRPTG9PemVYREw4eWM0VlYrTTUwSy9pS2RxMXBtWGYrVjFLWGp4blVhTUlucUdMaDZBKzZjemhRN1hvNXpUcTQrNE51Rm83TEhnYndFaVljLzYzN1dQU0pJQlBJK3hML2o0Snc3dVNpa3ZodkN2aUZoeHRhQTg0dXdFUStSaWVFL29iaGlyZDJRM3VoTmxzUUwyRGFyRjU1T2phR3BqTzVkV2ZxOFZyMzI2UzUwNmNMT3FLb2s4YTZKNE1xTEhvOGV6NWVyTU94dFkxVlQ5bnFBdWxhUHcvNWFNVUl4Yjd3YXg0ODdIZDRVdkdzaVNhU3BYTndCVS9lUDFxclhQcTljR2QrOW9LSnEvNW01Zy9HNDFESlh2YS9XNnJpY1BUN0tyd3ZxbXJ4TnNhVVlqblQ5bkxYMVMvUTM2eC9zQTJ2YzE5bnFiUzN3SGFKbVZSQlNtOGJrTVlMTVhyaEJGVGlrdng0Vlh4TGFPTDYyTEV3VGUwN2ZydWVkZm9Dc2Q4VzdZTXV5eTB3TTA3TVdmYTlOMEladXQwdFRLWUQ4MFV3YjU5dTcwUENsTCs5dVhOdDhjSEU2T2ljekxqSy9PUnNOTjJ6UE5mc1EzMUY0NzA1SGZuRkpQcW1zUEx4MVpUWHVURTFEZmtsTmZYdnEzSHhIV2wxaklibWhPZWJNemZuUWprcHFZWWtPTERPVCtHQXUvZmxjUnZ6OXpQbzdjRDR0UG1FdWxmakFXSHhNUUsxaFBmWU9NdHZzdkZtV21jbXNpVUdXd1htRGJLYllPNDhUYXRqNUdIdzNHTjhZL0JiVkkxZnBMbWJLRmlVaGZmREZ2ZmdicDh5MXl1SnYwNkdDc1lZMjh2bWtBTStLaUx2NkUwclRzVDR0Y1l3SmQyUGwweVVoUFN4TFd3ZnczZHYwN040V1NtVVhNY2o4bEFQSlNOU2h6eUkrUUR0UGRNQ1R6MXJRQVdzZFluNWF3NkhJV01pSlpvZkRoNWg3bEJHS1VLN2VWeHBRYk5kaE9SWC9WMEhVL0pOcjgxQlhSL3VWKzVkaWFkZnV0M1lObnEydkNmWno4ZmFMTHMxTVNJc3U5ZlB4d1lmK0t4enFQSUU5YjhSMXZ2UEUwRUM3T0xhbnV3dDNydU00c1grRjRXbTltR2UxeVBCY1dSaHp0NzY3dUdDOU91SGVIRGx6MGRYR05TODFQek04cmlkMWlLQmVrbVZ1cjZIV3hSbyttRjlhM0Z4SjBnc1VjUFRPT09rdXphaU1kd1llQm1wK2NicTdxUXgwY2JlaGtPZmp6U1BFUldHT3Fhc2IxOWNtUGpUWUpvWnJmd1JOZjNHdWNPSnU3aXZJenN3MVNsY0J6ZnB1U0V6MUE3b1lwejhSUHBMYlpnRzVHMnRhMmVtRmxBMnJ2dVR0b25ZSm9FL01STlMxUmtYVXRFUkcxZFJIUk5iWC8rUFJ0RHF0cldObHJYbksycDVnYmFVaVUrdEdhQ1IwOUhia04rYTM5M0p6ZnpadE1yVWNhSEVubkJRZ2hKcXIvTkd6T1cyajNVN3NxVVUzNThSR1JFWGg3VWVxcUc2WXVqQVhhd3M5WllYRDA5cldxckx0UVdjeXNrcGIweUpPbVhzWjg5ZkpVS1A2czhoRjU3T2pPeFRzZFUxUFcrcXFKYlJDSHVXNFJiRERLbGwvbkVkZEp4MmNDV3ROV3RKdkZHUG85S0tKUHFTQldrZkw5WEIyVnB4SWFKZDk5TitINjh6Lzl0bUJvNTJzZWZ6dDVHNnNkSUZZeVNjeTFpUllFOWdaVDBWRk9iaXBLY24vREVRZkt6WjUzOUx1K1Vnckx5Z0phOHgwTHJqajh2V1cxc3N6UGRhZGpGbjFxN1BuenlCREFoSmM4SDdFVVB2Z2dBUzhrMzhNRkdDQ3dXQnNla0drVEk1Lzh1UU1TeEIzVENJeEppUXIzcHNPZGUzY25KeGZ2ekUyM0htQkVHOXNWek9qaDZhUWdueTZJajJUNDBFaVI0RDZyWURucDVDMHlhWXgzRVA3UmtzZTdLd3JWOW9OMFkxTUQwc3JCd3Y3bEF4TGUwdGlDbE9aMk5hT1ZWRHJFamJEd1FLbmdKWks2djdWNlFoOHVYU1dIOVptaFoycjZQaEhaa0NTK2tiQlh3TExqNXVTUTJON0xtVWRxaml5WHpwVklJRlA4REpNTDgxK2RrYndJbW1TZkxYUElsSm1jNjR6N2IvQWFqTUFra2EvSXNGVDJkbVFsdG5aVUFJOHplanVkMWRmTThiblJ6dXpjMWZNMWF6OUxsTmRTMnc3Vnk1ZWNoby82UzNYd2trNnFSRWQ3K3VzYnVWL3BjYXQxTW16Yk5YRkx6eks0NmxrdFAwT043Smt6TWgxMTdlaTkvSlFZL3Z6NGMxdDEraVlqSWhJU296VEpKYjZjZnh5NG9pemlyT0IvYkJiNVAxWDRERHhNV3BrK0ZwOVhack5lOE9TOWpURCtBYkxkaXVlZDN0SkVDVUdieGZwb3dGWFQ2d2J3SlFKSGlzcXJsbFJNK2Y1d2RUczI1SDA1eEdWVlBJc0wyMmJWQnQzc0pxZmZ6WXRRZWw2ZWZtVFdzdWc2WUpDcjB2S1doM3ZOUzZVWGNtekRFWVZzdk94bFZuNlZIZGY2eTN2bWN2TGJ0cWRjak81NzdFL3RlK3ZqWkNtWVdJRmpQSzFxSGlCV0luM2t1ck0rTE5UUm8zMWxiV3N6UXE5ZGIzWnFDUHo3emE1S3NKVndxb3VLM2psVnQyVTV2V0FXTGVKYmN1eTNpZWg0NWZjWXZFakVTYVVucWYwVUJOaWJqMjBURjEwemZqQzYrVENocmt5ZEJnaThWWEE4U0kzOGN6ZmVnb0hlSzh4VkliNTIzQW1xeDkzK3J2REw3bjJWTVNtaFpGUVFpaDdKWUdETUR5N0I2MXFQN2ordWlGQXFpdnQ3MU55WmVtTkpMMWdvOUE1WXZ5ZHc3OXZrbFpSL1dmblNWZFNvNjJ5eVlWZlMyN0ZHUVRyQnkzR2t6YVlsUDVOb1NjN0gxRktPeCt1WHVwNlhGYlN2VzV5OTJGdy9SbWVVZzdCYkhKOXMzTEllNWJtK3Y2Ni9tYTJyNXp4NmhMSmVlNlpTZDQrR2NsREdlbFRHZW5XcmtvbXBpcktwc1pCSm1ZcXFzYm1jbW92TndnWnhUNnlZd0g2UThLeUhTcVpxT2cwaXUveFJIOXQ4V01udFV3VmpERDd1RWdMbnh4WURYa3FLU3hnU1p5NWpqZkN3aWNmUnEyYUxBREJBWXZpNVlJUmxsNDVzT29VZWtobzBQS3hjdmtJQ3k4eXJJbE9QMGNJdXI5aFNMMGNHZWVpQSs2cW9NOGkzR1BqZkx3VENMNlM3akV4ZnI2eHNSNThJcEpRZVlWVUlVNnFxQUxEa1RoeGw1V3hLNkVLcUJKekppYjh4eGQydTFNejR6U3dJbm53NjJQM3ppZUZpdU02VTBYU2ZnaWZRTEtPWm8yV2ptYVBNaU9GUlQ5SGtVUngzUVNKMkhPMEZlVGwzT3k4MGp5Sy9rdHhTcWs2aFZ6cUpSQlByYVJXeGd0NGZWbXF2ZUY5bzg2cElOWmdsR0xhYUNxOFVtWmVLVDRUcTh0WDR3ZjBSRnV6VkJKU0k2S2kvVGFwbTROV0RCMUdzUm95T0JObmUrTitkT25KNllzZTR4UXdORDE1TVZST0R5QWYwLzNLMUJaVndJaVlFa253MjZKdWZlYXdxQnFzb2V2UU94ZG5NMmdCK0FOQU9zR1k1S3o3K2M3N0cyRHVqdEdIanpwUFRsbEplWk9zODNvYTZxczZ5NkNjbTlqYWs5cTU2djQrdWw1R2l0NjJ5MTRyQXl2V1l3Z0VBaHgvUlp2SGVUQ2dCNDRpNklmRW1tMW1aeHFIS3lpdGc2Q3o4bXpMTUtXaWNSQnFhMFBObEJYRHg4YXVVNHJnNDVib2xlRC9mODRrQjdub2d1ais5djVVWkdnYXNqdnpjRnVjMVRxdVFLVjZxOGlYcDk5STJEcXZrcHllMVZsRlN1L0pSb2EwTWdmbEcxdFlteG5ZMlZwYkRZUklGSW9XY3JGQ3ZFOHRiSWtwcEtyVXBJN21Ja3JQK1VhMXU1c3ZiaUd5cTlWc1QzSkt1RGk3R09yYjJXZWR0bkU2eC9CaDlQalVMQlJFcTVXWnBLUm9sdWtVUm5XbVlUclRva3lzQW42bGFLYUVOeVJuNXpRa2t4ZlU3YlFOREsyMTFUVnN0SE5zdENsSHAvYVVGVi9Gdi9MNWx2M1YwTXdvTktXOE5DZjlUR2QrYWVzNVdLMStXemt1SUxlaE1EQ2ozVS8ydEI3ZTNrRlAxd1p2YW14bDU0dkRZWEFZQVJ4T1FGL1M4b1NrSmVNRWt2OVpVNlBhVXN0TTQwenVqdzN6eXpULytidmN4QVYrUkp2WTJmMFRtY25PTCtIWjdJT2ZaRlB5VHpqaG1aS0MvUWVBVnRqK1BoSkpIMmc3SlZBd2UwQ3A2ZnpQUDRuT01PdC9KVlRhdFJlMDNSVlJnRE1NOTdPclNkcnZEbjdvV05IeUljQ1hlYXZVb1lleTNXbG9pRlpHbzRjMlZJRVRHNkdTclU0Ny96TmcreTJqTU1tWENIdU1VWHZhdUFHZXhqQUZLcHIyOUdnS1F6YUdMV0EzRkhTZ3RjM2hBWXdWRGNpM01iNkEzK3ltdVMrNlI5MWo3bkZwSWlWUUJQOERjbzB3b0libi9XQmxYSHFjVHRMeVVMTlFEczNrbXh6VHZwV1dGNjJ5TURwYmpmS3p4a01OeHpCRzBvZ25QZTczZHlJNzFNenZNWUZ2Y3BUNVZxcXJqakpQRkh6TnV0YzNtWVp2WlJ0VlIzVzhwV3FYL0xiVStxVE9vZVZXSzl5bE9TcTlBZEJYbytkU2k0UlFqYVd0MXVka2FDYmY1R0Q0VnBxdmp2TEYwaGNRc21sT2ZhMERCQWlHWUNlTHlxZk1xcXFlWUtwdVlZZlVRL1VWcTJYaE56RjBXOUVGd0cwVmNHR2hpWGpJUmxVbWxaZ3lkR0gyaXNiTXljY29Ua2VsWXYwUWJqQ2RiVW9QdC9ETnlSMDNudmk1OE9KeG5GOWE1MUhWVVpvc1R5V3k1UFlrYmk1UDhUQlN4YVRLOHEwblFzUzNMT3JlalF0V0dVR1JKc0pMK0FnL0VrQXFCSThRNFFvUkJuZWdEUC9CakFzbnNGeDhvb0p2UDloRCtRZUI3SmYxMTRncE03TGJyWERsZEpqR0VUTEdTaldOdERIQkZaaXZtY01jSjE4VDkvSmY1MlZuazFJVlEwTDFWRCtYODRvb2xieTg0T2dWYjVJV0FGN2ZYMnZWUFpyWm1wY25qV05XWlB1YzBqVzFEL01PdmVBV0IrY2xPcmJ6SEVLblAxcGxkZGFMdHRvNS9YWjU1MFh4cnljYzg0dmNnWHpabkNTWng1STlQMHdZbU1ldG1vTkxvc3Z5RzQrZmFxbGJNM3M4NS9VRGRadlZCS2xNdlFQRUMzVkVzL1B1S085RGZCdThIbnZJeXBRZU5YT3puaXlsMzk3TTY1VnduVnF6L0YvNUt0aUJWWE9NNVRkT29ENFJVTXh1T0s4WGdKbm5XOWRDbTRzM242MFozNVk5WDJ5SHp3c0FHenVlWGdUaXNmTS9lQXJrRlNqL2Z3ZWZpeSszZnFzNXJ4d1lQNTl2ZVdNM3JQb0NVRjlYTXhlUXk4OUdmc2p3OEc1dFNGTWc2OG53RXZlWEdncWJ4OFZ6WWZHR3haZ1BCdXFTT2M5djNQZ0pRME9mLzI2VHBpVzBDc0JOSHVWNVVWRnRpVGt2cFAvRGZ4Z2xRQWZ6dVgwYzkzcjlKemtXU0VZRTBTZnBKWHFYUjdFd1hiMy83akNVUWQ4QWtud2hDajkxU2FLR3Mybi9kd1hpQjRpeXc3cHBxU2hqaSswSldyaCtKejlianhmL2V1S1JRWll4QUsycGRTeVFGREdXRWoyQTJKVTRuSGpxMVZpNWU5empQc2JVd2sveXB3bFRnMkZyd3gxTlFueENkcWNXVnJOMHU2Q0FMTXAxSmFLY2ptb2RJTnFSNEx3enJFczAzdm5PbnRMdFdwbzB5OGxOU24xY2FGYWdwOEt1WDkrOWFKRUpYMWhQblVmMURERXJZZmpBQnloSk40T0xHaml6OHVORzNmYnJoeGROOW9RR3MrcysxcWRRNTFXUDMrMG9QKzBkZUc5dWxFMS9qOFBpRVk5S2gxdmVTbDZ4THhwNUhQY2ZxOWoyY1ZVNjNqYXpRYk9ZYW5ZTnJZZXpnOURJWHZSdTZMYnVnZExxdktwSGg5c0J2ZjgrQ0h1MEhXTWtPSWJNZXNCVW1wR0dlZXdlRVppanJvZ3ltYklSSXlaaHVnQm9QZTExSVNlQ0paYzR4alJyVGd0Z1hsdUdUY0FvRVRPSjdZTmhaOXAwZVRoaXZpN2NJY3VWNzFVSU13MVNhcngrQTV5V05HM01qU1VtQmNZVHdBL0FMUkpiZHlYcm5hU2FkV0hoeXg0ZHVrMWdZTXFmQVBCWGFmQkg2WTRYRlBwNWtvZTh4aE1mYlNhQmZkbTlLdlpqWFoySFJ1cDhpeDJEd0JqM29FbTBDUUxUcGV6WEhua1E1WnVZeExQTllVQThZaVJEUDBuWUtKaVdBNTJVY0QrcWVMVmxXU2dqN3l1N3BKdnQ0QVdvRHdSQk1pMitpdUgzWjdRRkVKQVR4UmtEUVVEbFZVYU5yRGw5eHNYbm4rRHZnWWFVaXVXRGg0a0hjeC8wTGV1cTlwQjlmN0JsaXlJdWVHazJhaEJMd1ZCV0NwWFowVjVrT1VyTVVaWUJjR2M2T0hGR2NpY20wTHJCeEgrb2dRbkpFQVFGL2RMaUlnNnZ3ZXF0ZzBPYVVqRHZ2a1dRdzNQS0tyMFlOVlNpZ25XelM4V3IxUmNxQWg1R2xQY3E5a2ZTZGlURHpUSTdFSHRGc29rZVA5N3lNWHhFTWVDSG1kMERtS1lWK2w3RFF2R0ZkblNFOEVSRjJZS1U1Sm9tak0xcXBBL1NqVkpxL0ZHcGpSVWJ1eSt4aGUzUG9rRmdZSXk1RkNNci90ekJzREptM21MWHg4bDkreHlQYklpZkNJUmJlQlp0YlNMcmh4SElNTk5zdTFUSDlwWG45MXFUMWRjSFVraG5seEdqOSt4dTU1K1JIbGIvMW9nVVZ4dE45WDMxZlNTZTVDQXBDZ0NRRWtvRjhQM1RHdndmU2FTLzhWK05kdnlPUGg5eDY1ODR4dlNIUFpTMGd5VTRPUGVYNXh0cGgwTEk0ZExNWVQycmdQd3ZmdmFzdzZ1b01pcnowbnRmaE9BalR2V0Z3M1AvN3dQTjhrZlpyUnhXVGltVFBQWGFCekUyVjJ5cGZVbG04VktXMGl1WVlMYUZaNTdxSVpzdzdJak41NW02RVZJUXdxeHFNOGJ6SU5SSjEyT2QwTGljWHRFekVwVlFlSm5hZUFSbkJwT2sxSEtoaFl3U3krZmRhcld6UzJxNlExYk9vRHlsV1pnNE1qOFFLUVJYemRPTStQN1ZQaERlODFPcFRsSldHVXNpV0NzNE9MUzRqMGt6dWhLOGcrRmhNSFNyTDduc3VLQmcwblA5NFQydXlsNUFwMmdHaE1TeStKblIwS2FEMEU3dFdpTWNsalZiRlJBUWk3WVpuVktnS2VuWXJwRm1PNDF2bWU0Ums2anhGVk12aXlhOERYTk1OM1pIZ2x5VzQ0UDl5bWVOMUZPdmZXQURjZXRxcFY1NDU3TStVNm5QRzZTOVFBYWxHY1M4YUFjZGFVSWFGVWo2K01Ocmw0V3RGMkkyRmRSaHhZUmFPN2Npc3VhcGNLYTVZV0pqTTlYMGdFQXFCYktnSWhjMTJyelpxd05FclJFNzlRZ0hXRCtjSXAzeWlFc1ZtcU5qOHIrYnRUb2NtckZOVmhiQWd3cWRkYkZOaG9qRnowajJVTTBiUXY5Q05uQTAreXQ1OFYwNWkwbjBHOENvTTlPbURIWDZQSEFjMnJSMHV3QWozd3ltMG1waloxYVl6OTdKU005d05HSkp5aEE0VTVlcW5TOTdha2VPeFlTeWtnUmtUL3l4YXRxYWFlc1V3YmFrZWxKZTBIVG96TXBRZlpBTHFCN3BJZitiSThLa1hJcktTc0dwd1BEaU9KMll3VkN5RjRmTW1VMkRaK0FnM3R6bldlZW9pRXQ0VS92ZWZsYzdyQTZKUVNES0FuYkdqbzFPdGlYcHJWU2NOYkw0VTNyMUVKdWlZNUp2Y0ZlbUgweEdmd0JKZzRESzZSNWhJSVFjYkxGNUkxQ0p3WkJwNGhSRTRpL0FnMVdheVNrSTE0MU9zeW1sRWxoTm44YUNsL1k1amljK1FnVW5GNnFpQ0ozWlpTNVZDVGpwU0NlKzN2a3o2cVh6bU9YOSt0Y3laQ2hZdjZTZ0ZsdVViVE5sdWZYVFBjclY4aUtHWk1DYVNtZ1MzbVNEODZlNE5iWFlLdGs2UENBUE9tZERNaVEybktCVmJyRmlGZVNLWUNUVDVhVlRFd2E3NVFJNnFCanFsQTZkMStOMGpqRzd5RnUvWndjUk8xVHRudFZCUVlsNVpZSFdibnhUMkkwR1lqdmxBSmxPeGhhY280aGFiYnlIRHNta1pHUlo4aDdZSXZzS24yRUdEc1o1bzlGTEc0MzV1ekVQQnNBRFdTWHZVYURJekNHMWM0Wk16M2xXMEpIdVNZeXlPRGZFeU9RTVppbEYyMjBUcVpRd3NBQ09oZDBGY3YwODVkNEFQaGkrM2E0ZTJQMndtRnVGWnBrM1lYZ1kwWU1JOGE1Rjl1b2U0cU1NNVhqT0MzRFArR1c1L0hqOFlhWnptYk9KUVVza3k3dnVjM3RhRnhlYjgvZnNoUUQ1dmU5Z3FUUXN6QnNyaGJkbmkyK0ZkMGE3cWRWWnMwYUdvVDlYdk84dHlzVlptaGxQUllrTk1vbUJTYkhFMy9xeGFJV21BSVhFcG1mdDBOeEtTUW16Mnpzb1VXWncvNktVY0tsa3FFeXlsdGNXUFdpeGN4U2RtY2hzc295UjlyVUwrSG1DSHZ5K3pYVTg1R05BV1JibDZhUlN1emJrYWRtM09BNUZUMDRaalhNbldhUHZKZ2tHSEpTblVncWVwNERaTkxFeU1tMDdpYWRLNm1hbm5HVWpwMWxOUFBxU0pFNVp3dGhTVEZCK1owMkNnSGdNcm5tM0grQzQvQnBtNG1DOUM1ZHh4TWZEYVIxMmRpWnI5bmR6Vm5UNmtVcnRlamtVYzlJdmQ2cjAwdmYrNGFkYmw0T2xwOVNWaEZUaWlIam1VWmZZR2JVazJuUTl3SG4zUlFTZHhCWnA1YmJ5ZUw3NlhINjRlYmU3Mk0zem5QTDVValNuQWdKemZuK0R6SlZRaitzcTFEeUpNNktnQVpxMEhrejluaHQ3dFEvVDgrSnB3WDltLzZDclVNNFhoWFN1dVd6YkgzRjB0VW50SXJHcDJRVlY4NEs1TkdzV0RhTVJrK2draHM4U0VVR1IwVXhJM3g1K3hEZFg1VmFweUIxVW5WMU5kUlFWUU4rdytkcjhmbWdGZTc2UTlpdGd1N3Y5TU8vS2R0WHZ2b2NiT3N5NUc5MjdRNzFJVVYvWGQ0K3RyQmR5amJFN21mK2FnMWJFZXF0YTFnZ3NSLzJrRXptWXVjZ1ErYWxWbzVNSUMyMnIyZkY3VVc2cDhPN0paTjJ1bEs0T0txdEVLQWZBVnBpZXhEVlZ3aXJka3NJOFJSVElYbHhPMjIvQWVuQW9YTzZIZWROdG0rMS9tZjJTM0toTThGMXBsMFYxaXZmZ3ZoaUZRYm5PMm5RYi91bXpwVEpsRXN3L0cxZDZNa0drcUgweHhxbW5kUVRZdGg2ZjlRelQzZWt6UmNqWnBJYzBLbzJaamF5SVJUYTExK0Z5MnJUMk11UkRFRlZlMGF4dUdGZGlKYkFaazAraXEyeU01Y3N5cEgxdUt2eXRqQWpMbmtoM2lHRHdnNzhORXVyWXE2TjFwaUhVZ3dXK3hBS0pYVjJaZVlGanNSSEo1QXI4Ums0aHMwcHBybU1yYlQxMDBaTTB4a01PNERuS0R3Szh4WFIyWTErSm42SHRDQWFYT2JSbjhCOGk4eEpRV0dzWlJ0bXJxdjdoZHc1d3QrTnlMMmMwcXJxTnRGSXg4UUhRVk0yN1NXMHIvU0l1U0ZzLzNHRWRHbzlQWWdSYWJvMjd5UDZibVlIcXVaaHlOSmx5YUtEa21FcXFkRWZvdS9EYTEyWlRKQ09qYkdwV1JEVmNBTnRNcXRrSVFKYmJnaUhld2dWaGh2bFNBODIwREdWR3BZY0pibFlOOWZXOTE0ZW1EdUtPS3plcFBmem9QcGZXMEkrNU4weU5VODRNbi9wMEdmMXA1MVlYeWlFOXRQK2FOTlJrZitMMnVSNzltL1NuWmVEVDNOMS96eU84R1lmL2Z2bjZxL3RFNGs3SEN6Mk9iOHJYOHZTTTVIRlhDZUIwbHRELzdyaFoyU05Oc2l1aU5GTWsxNG1GMTlLc0M5SWFtY2w1RFY2OU5lZExjc0tycktXTHEvVVYxdFBhd1dGcEdIb2s5SWhlekIzSFZpbzd4V1FMTWt0b250SGR2RU5kY1pYVWU1akxhTzc5QkYrV1gwS3lJcnQ3dkI3amVqbFdKVkhPWG1VYXBhQkZxUnBxK2tuZzBsejJyWjRxTDhReEZjeHFOKzY3RjJrNVh5cEJ4cERHSmdJOXY5ZXlYaVd2bWlmb0ZXeVpqZCtmYnl2cjFvZU9UL0U5dnNjenllRXZ5WHFlRkt0VEJRRzNldHFmaVJmTEkyR1FGSmxSOEJNdHVxbE54dkR4NklnalEzeHYzMlRkVGZKQmFKQ0NtZ3VuYWp0QlkzNUp5aEVKeVZkeXROZHRoUFhNeGhyUWhhSTFhUlR2NHNLRFFBODFSUE9EL1JTVUtZazJ3WjY5MlIxMnFGMGg1Zzh0dE5hbUcvRU1CNHlUZlVmMEU5REtqM0JGZE0wcW1XYnRCeVN4dHJ0T0tzTnRQNEhhWFI5djBVZGNUaHd3MEQ5elNEOG1jQjZQamlTMmFMbktnaXl1TjA3WUtBVFhTcVhJa1lwOGJkVjIvRFZqTm9nUXJ5aW1OaW4zSWVvZnpYUjZHUXBLVjI2WVdJTWY5RDZLeDdqaU0wYlNuU21OTU5rRHFPVUZtajFWbkVmcmJzbkRyUEVlSzlzbjhSSDUyTHdVRDZIZGVoQjNmcXpDSnp2U1dRc2ZVS08yekJWcmVVV08zT0k5OExqOEdJL0tqM0NzSGhkeGVtZHhaZHI3d0hzUkVWbXNEZU9VRThOVzNuQ2R1ZmJGalNrdHZuVE1xSUU4ZTRCRUhUV2xLOTBudlZZc1RjdjMvR2ZEYnZIK2o4TWx6Wm5ocE1PbmFNVDgycE9nZXpDdUNqYmR0KzF6WmR2SjYrSHpXSkZYcXN0cTdJSjRLWkRRMTZsVU9XbS9KVmczVDVwa21PeE01d1NxNkFqenJBZUd6VnFhSVJuQUg1YU9UVFltYXFqSU1pdDA2RHBKMnRKZmV2NDArMDg5OFNwbFIyVVhxVnlIVERKbTdxcHBmMVBDMXI2bVk0cWh0RDFOQ2syaHNhR2o0S2F4b0RyRGRJSXJPeDlWUlV0aVhrbmt0bU1nSlBPKzgzNCtVczJaOFUzT2xFM3UzL25KaHgrL1EvWnY5MnYzdWN2STR1N0c3a1VqUXRYYXBjbjh3NDM0bE82U3VYS3pYUWFWZVJNVk1zNXJTT3QxcGlxUHBodWxUNUh0ZlgrQjl6eERVZk1jVkxvRnhXcklQdkU3UGdtdWlYeWg3VkRVMkZMaVRYblE0b0ZHbE5HWW5CZFdvenZwRmxWR1hvdDVMbFZIZlpkRHBydC9OSGtSWkx1OGFOQ2ZYSWNxYktJTzJJOG43aHNLOEtRZkVQaDZ1L0EvQ2s0MUJwODVmNEhvRndnMnl0RHhETmx0RFI2dFRQaUdveHdMQ3dza244OXJVSThPY0Jnd2p3Mkl4c3dmbzN6OVljYitLNFhkWXVFOWp5MnpEdDFEL0FLSHBmTkVMd1h6M015V0FibVhEMVNObVQrbThmVUhkL2JmNFNDcExZejg5bnNLUDQ2MzBDY2hPdXdwdlR5Rmo3SWtzbVhMRGNwVEF3dEhjd3RkUXpUZGovQWNEVjZ1RTcxY0ozcDVpSzdKZG1vSk0xdHBvSWRqcHRpRXppRTZiS0ZqdEtmL3BKM0VlYlFjYmxCa3poOVQ2WnJhRVRZMFpFRWplbkdwZWVPdC8xRkVSYlJVbFlrQVlQS2NRSm9ETUg4M0I3aXlrbkRiZlVVUTNxdTBSaUgyYWk2WVVmQStpa0pMMEMxYlR3Z2NsbE1ZaWU1NHRtQndIaGFnV2M1aUZBaGYzSWlxbUNDTktpbUxKbCtNdEhGT1pDbmZzMFVxM2dvK2JFRGlVSnNtTzlUNm1Sbll2NkNWNzFKdzYzT3dIbE8rR0ZGT3ZiK2pCVFlBNElzZmw2SUMvR2ljLy9icm1ML3JPOHFiUk1BT0dJQUExaWR0MlFEWXVmMS9oUDVaVjhvZ3paMm84WEloMVBYL2RwK2ErM1VsRmJuZVNhMGNzWE5EWlAwVUdxSEM4NHJpdkVGcUVBbFhLZnVvSVpJYUpGTkkxYkNGM1RrV0VtR0FMejhhV2hTeEU1OTNTSHhBaW90a2k0dGxoV2dxUmFTeHhHWlZFalcxQ05kdi9WTkQ2alRVWCtWVElPaGppVExtZUVZcW1Ld29HaE5oRit3SGxqLzZyOHc4S1pNdHp6ZW0zdW1yYVk2MVNHVXFLNTk4aEZjQitoTkJ1MVp4MXRlNTVURTF3NUxNbEEvenVCK2owUWFSejZkZFhtSXFXM2twODZsQy9xWFBONWZvV2FVQ0trSjVmRlFSaHoyOUhIanRvN1lWamxKUnlxdUt0enlXODg4SkVDdTNIWE05SG5uc0VGL2dUbzd2Wk1jeTNtbWlSMDR3aXM5R0ltNG1LTlN5S0JVZ3NucDR6M0g4RDlWd3hwL1YxZ0d2NFNGMHNlSTlhdFdPV1dFVkszZXg1alVHVk9aZkJYVmFZQjR4eVNNR1dTQ3p5RnJHSWRQa1ZSdS9KZVdSakhGV3hwZ1JOamU0TGhvY0YyMXhZNW5abXRHZnlvem56Sk5TREQxMUhXV1paVjgwT1ZYTm9zaThxMDE5L05LNmRvdFl6UVNPZWYwNUxIMHN5aXh1SU40TEJBRG1qYzRzaHFxaVdVQTBVNDVHSjNKTlJENmpsN05PNUtpeTZhVXV3eEF5ak9jNFN6ZVBhRllPL3drSnJ4cDlGZXRZVWVndGE4ZHoraWVieS9qMEdqS0VJd09hdkxuUjRjQ0s0K00xQjVVckI3TEdqaTh4dWlPZGUvUWh5bzNURjFNRTh5YUlwQkpIalFCMjc2QU1yYndQQSt0UnpBbUlZUllBRUxXOEJOR0QyR1ZSVGZ6cXhUSU41WDBuY0RseU9RRnh5d0lBQUpjdlhOWXdKcmt2ejlRYVRkV2ppSEdJS0xuOWpsMm9lTGxBc3BjWSs0QUVPeFVLQk5nSUF3ZlZEdUFod0d4aENCdS9oV0U0UkJYQ3k0VUlMSXdrSlcxaEZHRWRGNVNEQ3daVGNlS2xJNG9VTGtJU01hcVVxVlFlTVJiaW1GQ0MwTVZiaVJWTTBUQTJNQ0hvTEJhSnJCSEtpVkJFS2RrSm9XZzRjWUlPbkFSVnFlR1NFUVE2c1p1SEtGR2tpRzJORlllcU9VWFhTTXRUT3NVVTV0QThOVWs4SFVvVlNVMG9DaFEvcHdhTEVFcFJER0xHU2s2azRJeGp3V3JiU214Wk1XWE9IcDZFZ28wbVpYQUhhOWRSUXB6Z2gvYWMvSkNUUmdPVEoyUDBJSkV6TUhudzA4WGVuQlg2SEpOaGVZM2lvc1c1V3htVE1BOUxMWm1KRjl6WlZGMlMxd3ZoWjZkM1VzQUxxU2t2SWNEcGhVcndQYTBxNU1WVW5lcWpjOXdMblJQdXFDM294ZXhpcmluRjdjV1NFbUNqS2RMTVdoaGlYKy9GOW1TMExGalBpNTBidzhhTTh1TFFVNVVXNXZMaU5GS1hGZUh1aVhFME5qY2VHTVd5TXAya2dXL2RTaDgxRklRU1IvMVBwRnlrVkpVMDZpREZTVlJwUlBxUGpsVWxqeHBLL2xLdXd5a0tmUU1nSGFGalZVbWovaEpWdWlQOVI0WlZ5YU54Y1NVeEtGR0ppVUdKQUE9PSkgZm9ybWF0KCd3b2ZmMicpOw0KICB1bmljb2RlLXJhbmdlOiBVKzAwMDAtMDBGRiwgVSswMTMxLCBVKzAxNTItMDE1MywgVSswMkJCLTAyQkMsIFUrMDJDNiwgVSswMkRBLCBVKzAyREMsIFUrMjAwMC0yMDZGLCBVKzIwNzQsIFUrMjBBQywgVSsyMTIyLCBVKzIxOTEsIFUrMjE5MywgVSsyMjEyLCBVKzIyMTUsIFUrRkVGRiwgVStGRkZEOw0KfQ==";
		document.head.appendChild(roboto_font);
		
		for (let i = 0; i < 10; i++)
		{
			let cameraSwitcher_item = document.createElement('div');
			
			cameraSwitcher_item.style.display = "none";			
			cameraSwitcher_item.classList.add("cs-items");			
			cameraSwitcher_item.addEventListener("click", this.cameraSwitcher_handler, false);
			
			this.cameraSwitcher.appendChild(cameraSwitcher_item);
		}
		
		await mwbScanner.getCameras().then(function(foundCameras) {
			
			let cameraSwitcherOptions = MW_properties.global.cameraSwitcherOptions;
			
			if ((cameraSwitcherOptions & CONSTANTS.CAMERA_SWITCHER_USE_BEST_CAMERA) == CONSTANTS.CAMERA_SWITCHER_USE_BEST_CAMERA)
			{
				try {
					
					let cameraLabels = mwb_VDList.map(({ label }) => label);
					let backCameras = cameraLabels.filter(e => e.includes("back"));
					let backCameras_count = backCameras.length;
					
					if (mwb_debug_print) console.log(cameraLabels);
					if (mwb_debug_print) console.log(backCameras);
					
					if (backCameras_count > 1)
					{
						let mainBackCamera = backCameras.filter(e => e.includes("0"));
						
						let mainBackCamera_i = cameraLabels.indexOf(mainBackCamera[0]);
						
						if (mainBackCamera_i > 0)
						{
							let mainBackCamera_tmp = mwb_VDList[mainBackCamera_i];
							let defaultCamera_tmp = mwb_VDList[0];
							
							//swap
							mwb_VDList[0] = mainBackCamera_tmp;
							mwb_VDList[mainBackCamera_i] = defaultCamera_tmp;
						}
					}
					
				} catch (error) {
					if (mwb_debug_print) console.log(error);
				}
			}
			
			let cameraCount = foundCameras.length;
			
			for (let i = 0; i < cameraCount; i++)
			{
				let cameraSwitcher_item = Dynamic_DOM_Elements.cameraSwitcher.children[i];
				
				cameraSwitcher_item.textContent = " " + foundCameras[i].label + " ";
				cameraSwitcher_item.dataset.value = foundCameras[i].id;
				cameraSwitcher_item.style.display = "block";
			}
			
			//simulated
			//{
			//	let i = 1;
			//	let cameraSwitcher_item = Dynamic_DOM_Elements.cameraSwitcher.children[i];
			//	
			//	cameraSwitcher_item.textContent = " " + "Simulated camera" + " ";
			//	cameraSwitcher_item.dataset.value = "57c89eddf271a407ce036aa7075b173b832698161a08a56b8940557acaaf6670";
			//	cameraSwitcher_item.style.display = "block";
			//}
			
			//.style.width = "fit-content";
			
			if ((cameraSwitcherOptions & CONSTANTS.CAMERA_SWITCHER_USE_ON_START) == CONSTANTS.CAMERA_SWITCHER_USE_ON_START)
			{
				mwbScanner.setCamera(foundCameras[0].id);
			}
			
			//pos and size:
			//calc once in here (because now width and height are known) and always in resizeCanvas
			
			MW_methods.calcCameraSwitcherPos();
			
			if (mwb_debug_print) console.log("getCameras.then completed and cameraCount is " + cameraCount);
		});
	},
	
	ready_to_use_ResizeObs: false,
	resizeObs: new ResizeObserverPF(entries => {
		
		if (mwb_debug_print) console.log('Container was resized');
		if (Dynamic_DOM_Elements.ready_to_use_ResizeObs)
		{
			MW_methods.resizePartialScannerView(MW_properties, Dynamic_DOM_Elements);
		}
	}),
	
	updated_XYWH_forContainer: false,
	preparePreviewForContainer: function () {
		//1. set css changes
		this.previewFrame.style.position = 'relative'; //*xywh should be 0,0,100,100
		
		MW_properties.global.partialView.x = 0;
		MW_properties.global.partialView.y = 0;
		MW_properties.global.partialView.width = 100;
		MW_properties.global.partialView.height = 100;
		
		this.updated_XYWH_forContainer = true;
		
		this.flash.style.position = 'absolute';
		this.zoom.style.position = 'absolute';
		this.close.style.position = 'absolute';
		this.camera.style.position = 'absolute';
		this.cameraSwitcher.style.position = 'absolute';
		
		this.lineV.style.position = 'absolute';
		this.lineH.style.position = 'absolute';
		
		this.overlay.style.position = 'relative';
		this.pause.style.position = 'relative';
		this.locate.style.position = 'relative';
		
		//2. update size and pos i.e. recalc those calcs for when
		//either the window or the container element change in size or pos
		
		//the window listener is already there, so just the container listener
		
		//ResizeObserver does that
		//only thing - iOS Safari has the latest support - from 13.4 released 03.2020
		//which is why a polyfill is used
		
		//3. and some extras
		this.preview.playsInline = true; //for iOS Safari
		this.overlay.style.top = "-100%";
		this.pause.style.top = "-200%";
		this.locate.style.top = "-300%";
	},
	
	setTop_forContainerElements: function (element) {
		
		//for relative position for canvas elements
		//lineV and lineH are calced from the overlay and set in their draw method, so they are skipped
		
		let child_i = Array.from(MW_properties.global.container.getElementsByClassName('shadow-overlay')).indexOf(element);
		let element_order = child_i + 1;
		
		//in resizeCanvas (sdk_modular.js:1399 + lines of this method) and drawPauseRects do
		element.style.top = "-" + ((element_order * this.previewFrame.offsetHeight) + (child_i * 4) - ((this.previewFrame.offsetHeight * MW_properties.global.partialView.y) / 100)) + "px";
		//iOS Safari needs px calc instead of %
	},
	
	preparePreviewForDynamic: function () {
		//1. set css changes
		this.previewFrame.style.position = 'fixed'; //*xywh should be x,y,w,h args
		
		this.flash.style.position = 'fixed';
		this.zoom.style.position = 'fixed';
		this.close.style.position = 'fixed';
		this.camera.style.position = 'fixed';
		this.cameraSwitcher.style.position = 'fixed';
		
		this.lineV.style.position = 'fixed';
		this.lineH.style.position = 'fixed';
		
		this.overlay.style.position = 'fixed';
		this.pause.style.position = 'fixed';
		this.locate.style.position = 'fixed';
		
		//2. update size and pos i.e. recalc those calcs for when
		//either the window or the container element change in size or pos
		
		//the window listener is already there, preview resize is done with API method
		
		//3. and some extras
		this.preview.playsInline = true; //for iOS Safari, probs its not a problem if left
		this.overlay.style.top = "0%";
		this.pause.style.top = "0%";
		this.locate.style.top = "0%";
	},
	
	setTop_forDynamicElements: function (element) {
		
		//for fixed position for canvas elements
		//lineV and lineH are calced from the overlay and set in their draw method, so they are skipped
		
		//in resizeCanvas (sdk_modular.js:1399 + lines of this method) and drawPauseRects do
		element.style.top = this.previewFrame.style.top; //exact % asign should be ok
	},
	
	preparePreviewForPreviewType: function () {
		if (MW_properties.global.previewType == 'container')
		this.preparePreviewForContainer();
		else
		this.preparePreviewForDynamic();
	},
	
	setTop_forPreviewTypeElements: function (element) {
		if (MW_properties.global.previewType == 'container')
		this.setTop_forContainerElements(element);
		else
		this.setTop_forDynamicElements(element);
	},
	
	disappearElements: function (onStart)
	{
		//until video is loaded
		this.overlay.style.display = "none"; //or style.visibility = "hidden";
		this.lineV.style.display = "none";
		this.lineH.style.display = "none";
		this.pause.style.display = "none";
		this.locate.style.display = "none";
		this.flash.style.display = "none";
		this.zoom.style.display = "none";
		this.close.style.display = "none";
		this.camera.style.display = "none";
		this.cameraSwitcher.style.display = "none";
		
		//hidden might be more reliable than none
		this.previewFrame.style.visibility = "hidden";
	},
	
	revealElements: function ()
	{
		//when video stream data is loaded AND preview-overlay calcs are done
		this.overlay.style.display = "initial"; //or style.visibility = "visible";
		this.lineV.style.display = "initial";
		this.lineH.style.display = "initial";
		this.pause.style.display = (MW_properties.global.overlay.pauseMode == 1) ? "initial" : "none";
		this.locate.style.display = (MW_properties.global.overlay.useLocationLayer) ? "initial" : "none";
		this.flash.style.display = (JavaScript_mediaDevices_API.flash.supported) ? ((MW_properties.global.fullscreenButtons.hideFlash) ? "none" : "initial") : "none"; //HERE
		this.zoom.style.display = (JavaScript_mediaDevices_API.zoom.supported) ? ((MW_properties.global.fullscreenButtons.hideZoom) ? "none" : "initial") : "none";
		this.updateClose_state();
		this.close.style.display = (MW_properties.global.fullscreenButtons.hideClose) ? "none" : "initial";
		this.camera.style.display = (MW_properties.global.fullscreenButtons.hideCamera) ? "none" : "initial";
		
		//HTC flash/zoom buttons sometimes not there on first run Bug fix
		setTimeout(function () {
			
			if (Dynamic_DOM_Elements.flash.style.display == "none" ||
				Dynamic_DOM_Elements.zoom.style.display == "none")
			{
				let zoom = Dynamic_DOM_Elements.zoom;
				let canvasOverlay = Dynamic_DOM_Elements.overlay;
				
				Dynamic_DOM_Elements.flash.style.display = (JavaScript_mediaDevices_API.flash.supported) ? ((MW_properties.global.fullscreenButtons.hideFlash) ? "none" : "initial") : "none";
				Dynamic_DOM_Elements.zoom.style.display = (JavaScript_mediaDevices_API.zoom.supported) ? ((MW_properties.global.fullscreenButtons.hideZoom) ? "none" : "initial") : "none";
				
				zoom.style.left = ((canvasOverlay.offsetWidth + canvasOverlay.offsetLeft) - zoom.offsetWidth) + "px"; //crucial
			}
			
		}, 0);
		
		//visible seems to work fine, no height 0 bug either
		this.previewFrame.style.visibility = "visible";
	},
	
	previewFrameParent: null,
	
	addPreview: function (container) {
		[this.proxyWrapPreview].forEach(function (element) {
			Dynamic_DOM_Elements.previewFrame.appendChild(element); //this. has a different scope here
		});
		//Insert preview frame and controls into container if provided or into page
		var container_exists = (container != undefined && container != null && typeof container === 'object' && container.tagName === 'DIV'); //NOTE: should container be limited to div ?
		this.previewFrameParent = (container_exists) ? container : document.body; //can also use default container HERE
		MW_properties.global.previewType = (container_exists) ? 'container' : 'dynamic';
		
		this.previewFrameParent.appendChild(this.previewFrame);
		this.previewFrameParent.appendChild(this.overlay);
		this.previewFrameParent.appendChild(this.lineV);
		this.previewFrameParent.appendChild(this.lineH);
		this.previewFrameParent.appendChild(this.pause);
		this.previewFrameParent.appendChild(this.locate);
		this.previewFrameParent.appendChild(this.flash);
		this.previewFrameParent.appendChild(this.zoom);
		this.previewFrameParent.appendChild(this.close);
		this.previewFrameParent.appendChild(this.camera);
		this.previewFrameParent.appendChild(this.cameraSwitcher);
		
		if (mwb_debug_print) { console.log("All preview elements were added to camera preview parent."); }
	},
	
	destroyPreview: async function (this_root, track) {
		
		//stop decoder
		MWBScanner.DECODER_ACTIVE = false;
		
		//rm decoder timeout timer
		if (JavaScript_mediaDevices_API.scanner_timeout != null)
		{
			clearTimeout(JavaScript_mediaDevices_API.scanner_timeout);
			JavaScript_mediaDevices_API.scanner_timeout = null;
		}
		
		//to prevent 'black blinks before T's are finalized' for next run
		this.disappearElements();
		
		//set the remaining 'execution heavy' tasks after some time (128ms)
		//giving a chance for the DOM changes to complete
		setTimeout(function () {
			if (Dynamic_DOM_Elements.preview.srcObject != null) Dynamic_DOM_Elements.preview.play(); //calling this before track.stop() will 'clear' the last frame
			//that might be left from pause on result success (both on HTC and Note5)
			
			//while that fixes that on devices like HTC, it also makes closing the scanner / removing the preview much slower on devices like Note5 - actually, doesn't matter, seems Note5 does the slow removal anyways
			
			//on Note5 Firefox, it seems last frame is always stored, regardless of .play() above or
			//using .pause for result success
			
			//video.pause(); //it works, but camera is still not stopped and keeps dissipating heat CONFIRMED! camera is on and running, its just the preview thats no longer updated
			//we're gonna have to stop this in its tracks
			if (track != null) track.stop(); //should hold the local ref, yes, it does
			this_root.videoTrack = null;
			this_root.mediaStream = null;
			
			//clear last frame from videoElement
			//Dynamic_DOM_Elements.preview.src = ""; // empty source
			//Dynamic_DOM_Elements.preview.load();
			//^that however messes with the clearing of the timeout for some reason
			
			if (this_root.torchState) //has to be done on any close/stop/destroy
			{
				this_root.torchState = false;
				Dynamic_DOM_Elements.flash.getElementsByTagName("img")[0].src = MW_properties.global.fullscreenButtons.flash_icons[0];
			}
			
			//remove event listeners:
			
			window.removeEventListener('resize', MW_methods.eventHandlers.resize, false);
			
			if (MW_methods.helpers._Screen_Orientation === 'undefined')
			{
				window.removeEventListener('resize', MW_methods.helpers.orientationChangeHandler, false); //same handler - checks inside
			}
			else
			{
				screen.orientation.removeEventListener('change', MW_methods.helpers.orientationChangeHandler);
			}
			
			// Unobserves all observed
			Dynamic_DOM_Elements.resizeObs.disconnect();
			
			Dynamic_DOM_Elements.ready_to_use_ResizeObs = false;
			
			//NOTE: flash and zoom use already_inited
			//so the EL is added once
			//no need to remove it
			
			Dynamic_DOM_Elements.preview.removeEventListener('loadeddata', this_root.videoStreamData_handler_wrapper); //crucial
			
			var this_root_2 = Dynamic_DOM_Elements;
				
			//remove added elements
			this_root_2.previewFrameParent.removeChild(this_root_2.cameraSwitcher);
			this_root_2.previewFrameParent.removeChild(this_root_2.camera);
			this_root_2.previewFrameParent.removeChild(this_root_2.close);
			this_root_2.previewFrameParent.removeChild(this_root_2.zoom);
			this_root_2.previewFrameParent.removeChild(this_root_2.flash);
			this_root_2.previewFrameParent.removeChild(this_root_2.locate);
			this_root_2.previewFrameParent.removeChild(this_root_2.pause);
			this_root_2.previewFrameParent.removeChild(this_root_2.lineH);
			this_root_2.previewFrameParent.removeChild(this_root_2.lineV);
			this_root_2.previewFrameParent.removeChild(this_root_2.overlay);
			this_root_2.previewFrameParent.removeChild(this_root_2.previewFrame);
			
			this_root_2.cameraPreview_closed = true;
			MW_methods.eventHandlers.preview_closed();
			
		}, 128);
	},
	already_inited: false,
	main_createPreview: async function (MW_properties, MW_methods) {
		//
		if (mwb_debug_print) console.log('Starting to create the camera preview.');
		
		if (!this.already_inited) {
			this.previewFrame_Style_init();
			this.previewFrame_init();			
		}
		
		var partialView = MW_properties.global.partialView;
		var viewfinderOnScreenView = MW_properties.runtime.viewfinderOnScreenView;
		
		MW_methods.anchorView_toOrientation(this.previewFrame, partialView.x, partialView.y, partialView.width, partialView.height, partialView.orientation, viewfinderOnScreenView.orientation);
		
		if (!this.already_inited) {
			this.proxyWrapPreview_init(); //might not be needed
			this.preview_init(function(){}); //needs a handler for focus on click OR not? Maybe propagate thru canvas-overlay, or let continuous handle it?
			
			this.overlay_init();
			
			this.proxyWrapPreview.appendChild(this.preview); //might not be needed
			
			var mwBlinkingLines = MW_properties.global.blinkingLines;
			
			this.lineV_init();
			this.lineH_init();
			
			//obtain a ref
			mwBlinkingLines.v = this.lineV;
			mwBlinkingLines.h = this.lineH;
			
			var mwOverlayProperties = MW_properties.global.overlay;
			
			this.lines_Style_init(mwOverlayProperties); //might need to be exec more that once on start if different MW_overlay modes are used
			
			this.pause_init();
			this.locate_init();
			
			//scanningRects, union - here or? -taken care of in separate f() called before 'start scanning'
			
			var fullscreenButtons = MW_properties.global.fullscreenButtons;
			
			this.flash_init(fullscreenButtons, JavaScript_mediaDevices_API.flashToggler); //clickedFlash
			this.zoom_init(fullscreenButtons, JavaScript_mediaDevices_API.zoomLooper); //clickedZoom
			this.close_init(fullscreenButtons, JavaScript_mediaDevices_API.closeHandler); //clickedClose
			this.camera_init(fullscreenButtons, JavaScript_mediaDevices_API.cameraHandler); //clickedCamera
			
			//always execute camera switcher init
			{
				await this.cameraSwitcher_init();
				
				if (mwb_debug_print) console.log("Camera switcher init (async-await) completed.");
			}
			
			if (mwb_debug_print) console.log("Camera preview init completed.");
			
			this.already_inited = true;
		}
		
		this.disappearElements(true); //same as no MWOverlay
		this.addPreview(MW_properties.global.container);
		
		this.preparePreviewForPreviewType();
	}
};

//add-on to 2. APIs
var mwb_VDList;
var mwb_VDSelection = '';

//2. APIs: mesiaStream obj, zoom/flash capabilities settings, navigator.* , orientation/back events info
var JavaScript_mediaDevices_API = {
	//
	supported: false,
	browser_supported_constraints: null,
	runtime_settings_videoTrack: null,
	hardware_capabilities_ranges_videoTrack: null,
	
	_ImageCapture: (typeof ImageCapture === 'undefined') ? 'undefined' : ImageCapture,
	imageCapture: null,
	get_videoTrack_capabilities_timeout: 200,
	
	mediaStream: null,
	videoTrack: null,
	
	frameWidth: { min: 640, ideal: 1280, max: 1920 },
	frameHeight: { min: 480, ideal: 720, max: 1080 },
	
	frontCamera: false,
	
	constraints: {
		video: {
			width: null,//this.frameWidth,
			height: null,//this.frameHeight,
			frameRate: 30,
			facingMode: '',//(this.frontCamera) ? 'user' : 'environment',
			focusMode: 'continuous'
		}
	},
	
	constraints_init: function (width, height, useFrontCamera) {
		
		//this function can be called without args which will set the defaults
		if (typeof width === 'number') this.frameWidth.ideal = width;
		if (typeof height === 'number') this.frameHeight.ideal = height;
		if (typeof useFrontCamera === 'boolean') this.frontCamera = useFrontCamera;
		
		this.constraints.video.width = this.frameWidth;
		this.constraints.video.height = this.frameHeight;
		if (mwb_VDSelection === '')
		this.constraints.video.facingMode = (this.frontCamera) ? 'user' : 'environment';
		else
		this.constraints.video.deviceId = { exact: mwb_VDSelection };
		
		//maybe set to MW_properties here (and maybe keep caps object there)
		MW_properties.global.hardwareCameraResolution.width = this.frameWidth.ideal;
		MW_properties.global.hardwareCameraResolution.height = this.frameHeight.ideal;
		
		if (mwb_debug_print) {
			console.log('Camera constraints were initiated.'); //after MWBenableHiRes
			console.log(this.constraints);
		}
	},
	
	flash: { supported: false, ready: false },
	zoom: { supported: false, ready: false },
	
	torchState: false,
	zoomLevels: [],
	zoomLevel: 0,
	
	imageCapture_options: {
		fillLightMode: (true/*this.torchState*/) ? 'flash' : 'off' //doesn't make a difference at this time | Tho is might with proper context? (and re-set)
		//focusMode: 'continuous'
	},
	
	flashToggler: function (use_toggle) {
		//because this is added as a handler to flash (DOM element) click
		//the context of this is different, i.e. the flash div
		let flash_state = JavaScript_mediaDevices_API.flash; //by ref
		let torchState = JavaScript_mediaDevices_API.torchState; //by value!
		let imageCapture = JavaScript_mediaDevices_API.imageCapture; //by ref
		let imageCapture_options = JavaScript_mediaDevices_API.imageCapture_options; //by ref
		let videoTrack = JavaScript_mediaDevices_API.videoTrack; //by ref
		
		if (mwb_debug_print && flash_state.supported) console.log('Torch is supported.');
		if (mwb_debug_print) console.log('flash_state.supported is ' + flash_state.supported + " and flash_state.ready is " + flash_state.ready);
		if (!flash_state.supported || !flash_state.ready) return;
		if (use_toggle) torchState = !torchState;
		if (mwb_debug_print) console.log('torchState is ' + torchState);
		
		try {
			//(re)setOptions is enough to turn the torch off	
			imageCapture.setOptions(imageCapture_options).then(() => {
				videoTrack.applyConstraints({
					advanced: [{torch: torchState}] //this set to true is a must to turn it on
					}); //but flash isn't turned off, only on LG
			});
		} catch (e) { if (mwb_debug_print) { console.log('imageCapture.setOptions is NOT supported'); console.log(e); }
		
			//instead try the one-way ON
			if (JavaScript_mediaDevices_API.browser_supported_constraints.torch) {
				videoTrack.applyConstraints({
					advanced: [{torch: torchState}]
				})
				.catch(e => console.log(e));
			}
		};
		
		Dynamic_DOM_Elements.flash.getElementsByTagName("img")[0].src = MW_properties.global.fullscreenButtons.flash_icons[Number(torchState)];
		JavaScript_mediaDevices_API.torchState = torchState;
	},
	
	zoomLooper: function ()
	{
		let zoom_state = JavaScript_mediaDevices_API.zoom; //by ref
		let zoomLevel = JavaScript_mediaDevices_API.zoomLevel; //by value!
		let zoomLevels = JavaScript_mediaDevices_API.zoomLevels; //by ref
		let videoTrack = JavaScript_mediaDevices_API.videoTrack; //by ref
		
		if (mwb_debug_print && zoom_state.supported) console.log('Zoom is supported.');
		
		if (!zoom_state.supported || !zoom_state.ready) return;
		zoomLevel++; zoomLevel %= 3;
		videoTrack.applyConstraints({ advanced: [{zoom: zoomLevels[zoomLevel]}] });
		
		if (mwb_debug_print) console.log('req zoomLevel: ' + zoomLevels[zoomLevel]);
		setTimeout(function(){
		if (mwb_debug_print) console.log('new zoomLevel: ' + videoTrack.getSettings().zoom);
		//Note5 and LG: [1, 2.45, 3.9], and then 1, 1, 1 on clicks but zooms fine, so it seems the report doesn't work, otherwise it's fine
		//HTC: [100, 245, 390], and then 100, 240, 390 might not report always correctly but thats just console/js lag (y), otherwise zooms fine
		}, 128);
		
		JavaScript_mediaDevices_API.zoomLevel = zoomLevel;
	},
	
	closeHandler: function ()
	{
		MWBScanner.destroyPreview();
	},
	
	cameraHandler: function ()
	{
		JavaScript_mediaDevices_API.activeCameraHandler();
		
		//show or hide list
		let displayState = Dynamic_DOM_Elements.cameraSwitcher_isVisible();
		
		if (displayState == false)
		{
			MW_methods.calcCameraSwitcherPos();
			Dynamic_DOM_Elements.cameraSwitcher.style.display = "initial";
		}
		else Dynamic_DOM_Elements.cameraSwitcher.style.display = "none";
		
		//cameraSwitcher_handler will handle things from there
	},
	
	activeCameraHandler: function ()
	{
		//match used camera with active camera on cameraSwitcher list
		if (typeof mwb_VDList != "undefined")
		{
			let cameraSwitcher = Dynamic_DOM_Elements.cameraSwitcher;
			let foundCameras = mwb_VDList.length;
			
			for (let i = 0; i < foundCameras; i++)
			{
				if (mwb_VDList[i].id == JavaScript_mediaDevices_API.runtime_settings_videoTrack.deviceId)
				cameraSwitcher.children[i].classList.add("cs-active"); //children[i] matches mwb_VDList[i]
				else
				cameraSwitcher.children[i].classList.remove("cs-active"); //children[i] matches mwb_VDList[i]
			}
		}
	},
	
	//simple error handling code; handleError() is called to handle promises which fail (.catch)
	handleError: function (reason) { 
		if (mwb_debug_print) console.log("Error " + reason.name + " in constraint " + reason.constraint + ": " + reason.message);
		
		//this before you return the callback
		MWBScanner.destroyPreview(false);
		
		if ((typeof MWBScanner.result_callback) == 'function')
		MWBScanner.result_callback(
			MW_methods.helpers.otherResult(
				MW_properties.runtime.errorDescriptions[reason.name].userFriendly, //code
				MW_properties.runtime.errorDescriptions[reason.name], //errorDescriptions
				"Error" //type
			)
		);
	},
	
	scanner_timeout: null,
	videoStreamData_handler_wrapper: null,
	
	init_values: function (video, videoStreamData_handler, inactiveStream_handler) {
		//
		MW_methods.helpers.CreateErrorDescriptions();
		//
		this.supported = (typeof navigator.mediaDevices === 'object' && typeof navigator.mediaDevices.getUserMedia === 'function') ? true : false;
		
		if (!this.supported) {
			if (location.protocol == "http:") JavaScript_mediaDevices_API.handleError({name: "ProtocolError"});
			return 'undefined';
		}
		
		this.browser_supported_constraints = navigator.mediaDevices.getSupportedConstraints();
		
		if (mwb_debug_print) {
			
			console.log('capabilities / browser_supported_constraints:');
			console.log(this.browser_supported_constraints); //might be needed for conditional code in different browsers
		}
		
		//set objects to nested objects in constraints
		this.constraints_init();
		
		BarcodeScanner.MWBenableMirroredPreview(MW_properties.global.mirroredType, true);
		
		//you need capabilities.zoom.constructor.name MediaSettingsRange and .torch | if not there if will be 'undefined'
		navigator.mediaDevices.getUserMedia(this.constraints)
		.then(function (stream) {
			
			let this_root = JavaScript_mediaDevices_API; //different scope of this
			
			this_root.mediaStream = stream;
			stream.oninactive = function () {				
				if (typeof inactiveStream_handler === 'function') inactiveStream_handler();
			};			
			
			const track = stream.getVideoTracks()[0];
			this_root.videoTrack = track;
						
			this_root.runtime_settings_videoTrack = track.getSettings();
			
			if (mwb_debug_print) {
				
				console.log('VT capabilities / runtime_settings_videoTrack:');
				console.log(this_root.runtime_settings_videoTrack); //might be needed for conditional code in different browsers
			}
			
			//actual available camera resolution might be different from requested ideal
			if ((typeof this_root.runtime_settings_videoTrack.width === 'undefined') || (typeof this_root.runtime_settings_videoTrack.height === 'undefined'))
			{
				throw "Properties width and height in VT capabilities aren't available!";
			}
			else
			{
				if (mwb_debug_print) console.log('Video stream from camera is ' + this_root.runtime_settings_videoTrack.width + "x" + this_root.runtime_settings_videoTrack.height);
				MW_properties.global.hardwareCameraResolution.width = this_root.runtime_settings_videoTrack.width;
				MW_properties.global.hardwareCameraResolution.height = this_root.runtime_settings_videoTrack.height;
			}
			
			//cs-active
			this_root.activeCameraHandler();
			
			//videoTrack capabilities depends on ImageCapture promise or timeout
			function capabilitiesDependentCode() {
				
				let capabilities_Indicator = null;
				let ranges_exist = false;
				
				try {
					const videoCapabilities = track.getCapabilities(); //Firefox doesn't support this method
					capabilities_Indicator = this_root.hardware_capabilities_ranges_videoTrack = videoCapabilities;
					ranges_exist = true;
					
				} catch (e) { if (mwb_debug_print) { console.log('track.getCapabilities not supported'); console.log(e); }
					
					//use this.browser_supported_constraints instead
					capabilities_Indicator = this_root.browser_supported_constraints;
					//Firefox doesn't support torch and zoom anyways
				}
				
				if (capabilities_Indicator.torch) 
				{
					this_root.flash.supported = true;
					Dynamic_DOM_Elements.flash.style.display = "initial";
				}
				else 
				{ 
					if (mwb_debug_print) console.log('Torch is NOT supported.'); 
					
					this_root.flash.supported = false;
					Dynamic_DOM_Elements.flash.style.display = "none"; 
				}
				
				if (capabilities_Indicator.zoom) this_root.zoom.supported = true;
				else { if (mwb_debug_print) console.log('Zoom is NOT supported.'); Dynamic_DOM_Elements.zoom.style.display = "none"; return; } //display of flash and zoom is also handled by revealElements
				
				if (ranges_exist)
				{
					const min = capabilities_Indicator.zoom.min;
					const max = capabilities_Indicator.zoom.max;
					const step = capabilities_Indicator.zoom.step;
					
					//ranges might use different scale on different devices
					const number_of_digits = MW_methods.helpers.get_number_of_Digits(max);
					
					const _max = max - Math.pow(10, (number_of_digits - 2)); //this substracts 1% from max (needed because values are stepped and max might be ignored like out-of-range value)
					const mid = min + ((_max - min) / 2);
					
					this_root.zoomLevels = [min, mid, _max];
					if (mwb_debug_print) console.log('this_root.zoomLevels');
					if (mwb_debug_print) console.log(this_root.zoomLevels);
					if (mwb_debug_print) console.log('step: ' + step);
				}
				else
					this_root.zoomLevels = [100, 250-8, 400-16]; //extrapolated defaults
				
				//this_root.zoomLevel = 0; //reset to 100% (no zoom)
				
				this_root.flash.ready = true;
				this_root.zoom.ready = true;

				//apply config-selected zoomLevel
				let zoom_state = JavaScript_mediaDevices_API.zoom; //by ref
				let zoomLevel = JavaScript_mediaDevices_API.zoomLevel; //by value!
				let zoomLevels = JavaScript_mediaDevices_API.zoomLevels; //by ref
				let videoTrack = JavaScript_mediaDevices_API.videoTrack; //by ref
				
				if (mwb_debug_print && zoom_state.supported) console.log('Zoom is supported.');
				
				if (!zoom_state.supported || !zoom_state.ready) return;
				videoTrack.applyConstraints({ advanced: [{zoom: zoomLevels[zoomLevel]}] });
			}
			
			if (JavaScript_mediaDevices_API._ImageCapture === 'undefined')
			{
				if (mwb_debug_print) console.log('There is no ImageCapture API');
				setTimeout(function () {
					capabilitiesDependentCode();
				}, this_root.get_videoTrack_capabilities_timeout);
			}
			else
			{
				//Create image capture object and get camera capabilities
				const imageCapture = new JavaScript_mediaDevices_API._ImageCapture(track);
				this_root.imageCapture = imageCapture;
				const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {
					
					//check if camera has a torch
					capabilitiesDependentCode();
					
					if (!JavaScript_mediaDevices_API.flash.supported) return;
					else JavaScript_mediaDevices_API.flash.ready = true;
				});
			}
			
			if (typeof videoStreamData_handler === 'function')
			{
				this_root.videoStreamData_handler_wrapper = function () { MW_methods.eventHandlers.loadeddata(); videoStreamData_handler(this_root.mediaStream); };
				video.addEventListener('loadeddata', this_root.videoStreamData_handler_wrapper);
			}
			
			video.srcObject = this_root.mediaStream;			
			video.onloadedmetadata = function (e) { //also make the proxy wrapper visible
			if (mwb_debug_print) console.log('loadedmetadata'); //seems this event come later than
				
				if (mwb_debug_print) console.log('Video is ' + ((this.muted) ? 'muted.' : 'not muted.'));
				if (mwb_debug_print) console.log('About to mute the video.');
				this.muted = true;
				if (mwb_debug_print) console.log('Video is ' + ((this.muted) ? 'muted.' : 'not muted.'));
				if (mwb_debug_print) console.log('video.play() is called');
				this.play()
				.catch(function(e) {
					//JavaScript_mediaDevices_API.handleError(e); //scope
					
					//video.setAttribute('webkit-playsinline', 'webkit-playsinline');
					video.setAttribute('playsinline', 'playsinline');
					if (mwb_debug_print) console.log('video.play() is called again');
					
					MW_methods.helpers.safari_video_click_workaround(video);
				});
				
				this_root.flashToggler(false);
				
				if (MWBScanner.decoder_timeout != 0)
				JavaScript_mediaDevices_API.scanner_timeout = setTimeout(async function () {
					
					MWBScanner.DECODER_ACTIVE = false;
					JavaScript_mediaDevices_API.scanner_timeout = null;
					
					const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
					await wait(100); //waiting for last frame to finish decoding, tho it really shouldn't matter, and can be handled in another way
					MWBScanner.destroyPreview(); //not truly awaitable at this point
					//await wait(1000); //no need for this arbitrary max wait
					//but at least 128 for destroyPreview to finalize and another 100 of leeway
					await wait(128);
					await wait(100);
				}, MWBScanner.decoder_timeout * 1000);
			};
		})
		.catch(function(e) {
			JavaScript_mediaDevices_API.handleError(e); //scope
		});
	}
	
};

//3. SDK-related setting and features, partial view calculations, MWOverlay logic,
//	changes in DOM elements AND SDK-settings on C++ (scanRects), resize calculations,
//	event handlers, maybe back/close handling
const MW_assetsPath = "./assets/"; //added './' prefix for webpack
var MW_properties = {
	
	global: {
		partialView: { x: 5, y: 5, width: 90, height: 54.73, orientation: 0 },
		blinkingLines: { v: null, h: null, visible: true }, //MWOverlay DOM elements ref //final
		overlay: { 
			mode: 1, 
			pauseMode: 2, //PM_PAUSE
			lineColor: "rgba(255, 0, 0, 1.0)", 
			locationColor: "rgba(0, 255, 0, 1.0)", 
			borderVisible: true, 
			borderWidth: 2, 
			linesWidth: 1, 
			blinkingRate: 500, 
			locationShowTime: 200 + 300, //Safari actually shows the frame with more time - actually no, even with 500ms the glitch after show happens in Landscape
			locationAllPointsDraw: true, 
			useLocationLayer: false, //use separate canvas layer for green location lines
			imageSrc: MW_assetsPath + "overlay_mw.png" 
		}, //partial const
		fullscreenButtons: {
			flash: null,	   
			zoom: null,
			close: null,
			camera: null,
			flash_icons: [MW_assetsPath + "flashbuttonoff.png", MW_assetsPath + "flashbuttonon.png"],
			zoom_icons:  [MW_assetsPath + "zoom.png"],
			close_icons:  [MW_assetsPath + "closebutton.png"],
			camera_icons: [MW_assetsPath + "camerabutton.png"],
			hideFlash: false,
			hideZoom: false,
			enableClose_setting: false, //i.e. PreviewOptions.SHOW_CLOSE_BUTTON
			hideClose: true,
			hideCamera: true
		}, //partial const
		useBurstRefresh: true, //const
		useRuntimeResolution: true, //const
		hideDuringUpdate: false, //(mostly) const
		hardwareCameraResolution: { width: 1280, height: 720 }, //ini
		cameraSwitcherOptions: 0x0,
		numberOfSupporedCodes: 16, //const
		codeMasksArray: [], //const-final
		untouchedScanningRectsArray: [], //const-final
		video: null, //final
		container: document.getElementById("cmbweb-preview-container"), //final, null if not found
		previewType: 'dynamic', //'container' or 'dynamic'
		mirroredType: 0, //not mirrored
		has_mirror_css: false,
		returnCapturedFrame: false
	},
	
	runtime: {
		viewfinderOnScreenView: { orientation: 0, x: 0, y: 0, width: 0, height: 0 }, //only one that needs to be updated during orientation change
		untouchedScanningRectsUnion: { x: 0, y: 0, width: 100, height: 100 }, //init from SDK
		is_portrait: false,
		operatingSystem: '', //final
		firstTimeUpdate: false,
		currentOrientation: 0, //landscape, portrait, landscapeFlipped
		errorDescriptions: {}
	},
	
	//note: initial_value for all settings are api configurable
	//also, runtime_value is set from initial_value and then gets changed
	//adapters should change gui states and also adapt gui values to expected method
	//values and vice-versa
	//requires type of control n data (int/[int]/bool/[bool], arr w/ len) value
	//n data type of method/arg, i.e. always [arg]
	
	gui2api_adapter: function () {
		//
		//all it does is convert one data type to another adequate one
		//can use the *.gui_*.cam*.*_value and their typeof to determine what 2 what
		//also can hold there gui_values and api_value(S), as in
		//copy the ones you use to init the gui s with generate
		
		//FIRST OF ALL CHANGE THE SCRIPTS TO POINT TO wa_dev		//done
		//same for bookmarks on phones 		THIS needs doing
		//in fact, do it now ..done
	},
	
	gui_accessible: {
		//
		cameraResolution: {
			values: [[640, 480], [1280, 720], [1920, 1080]],
			default_value: true, //gui toggle state i.e. 720
			initial_value: true,
			runtime_value: true
		},
		
		frontCamera: {
			values: [false, true],
			default_value: false,
			initial_value: false,
			runtime_value: false
		},
		
		multipleBarcodes: {
			values: [false, true],
			default_value: false,
			initial_value: false,
			runtime_value: false
		},
		
		activeCode: {
			values: null, //2^i
			default_value: 1, //Select barcode: on 0
			initial_value: 1,
			runtime_value: 1
		},
		
		activeCodes: {
			values: null, //binary OR union of 2^i
			default_value: [true, true, false, false, true, true, true, false, false, false, false, false, false, false, false, false],
			//115 //contains QR | DM | EAN/UPC | CODE128 | PDF
			initial_value: [true, true, false, false, true, true, true, false, false, false, false, false, false, false, false, false],
			runtime_value: [true, true, false, false, true, true, true, false, false, false, false, false, false, false, false, false]
		},
		
		effortLevel: {
			values: [1, 2], //not actually used (bool to number + 1 logic applied)
			default_value: true, //gui toggle => 2
			initial_value: 2, //needs adapter | 2-5 mapped to toggle on
			runtime_value: 2
			//gui2api
			//api2gui adapter
			//changes when/on:
		},
		
		partialView: { // !fullScreen
			values: [false, true],
			default_value: true,
			initial_value: true,
			runtime_value: true
		},
		
		partialView_XYWH: {
			values: null, //0-100 for each
			default_value: [5, 5, 90, 50],
			initial_value: [5, 5, 90, 50],
			runtime_value: [5, 5, 90, 50]
		},
		
		partialView_Anchor: {
			values: null, //0-3
			default_value: 1 //selects must have 0 reserved | select_AnchorView_handler does -= 1
			
			//NO NEED?
		},
		
		continuous: {
			values: [false, true],
			default_value: false,
			initial_value: false,
			runtime_value: false
		},
		
		parser: {
			values: [0x0, 0xFF], //again, not actually used (same values used tho)
			default_value: true, //gui toggle state i.e. 0xFF
			initial_value: true,
			runtime_value: true
		},
		
		timeout: {
			values: null, //10-60
			default_value: [30],
			initial_value: [30],
			runtime_value: [30]
		},
		
		dps: {
			values: null, //1-30 (fps max)
			default_value: [2], //20
			initial_value: [2],
			runtime_value: [2]
		},		
		
		pause: {
			values: [false, true],
			default_value: false,
			initial_value: false,
			runtime_value: false
		}		
	}
};

var MW_methods = {
	
	/**
	 * Processes preview behaviour.
	 * FEATURE: can transform based on anchor_to
	 * Generic method.
	 */
	anchorView_toOrientation: function (view, x1, y1, w1, h1, anchor_to, current_orientation) {

		if (anchor_to < 0 || anchor_to > 3 || current_orientation < 0 || current_orientation > 2) return;

		if (anchor_to == 0) //anchor_free: percentages are applied "as is" | behaviour: preview transforms dynamically for different orientations
		{
			//view.style.cssText = "left: " + x1 + "%; top: " + y1 + "%; width: " + w1 + "%; height: " + h1 + "%;";
			view.style.left 	= "" + x1 + "%";
			view.style.top 		= "" + y1 + "%";
			view.style.width 	= "" + w1 + "%";
			view.style.height 	= "" + h1 + "%";
		}
		else //anchor_to_orientation: percentages are applied wrt. orientation | behaviour: preview stays fixed/immutable wrt. orientation
		{
			//[anchor_to] x [current_orientation]
			var anchoringProperties = [
				//landscape                                 portrait                                landscape flipped
				[{ x: x1, y: y1, width: w1, height: h1 }, { x: (100 - y1 - h1), y: x1, width: h1, height: w1 }, { x: (100 - x1 - w1), y: (100 - y1 - h1), width: w1, height: h1 }], // landscape
				[{ x: y1, y: (100 - x1 - w1), width: h1, height: w1 }, { x: x1, y: y1, width: w1, height: h1 }, { x: (100 - y1 - h1), y: (100 - x1 - w1), width: h1, height: w1 }], // portrait
				[{ x: (100 - x1 - w1), y: (100 - y1 - h1), width: w1, height: h1 }, { x: y1, y: (100 - x1 - w1), width: h1, height: w1 }, { x: x1, y: y1, width: w1, height: h1 }]  // landscape flipped
			];
			anchor_to--;
			
			view.style.left 	= "" + anchoringProperties[anchor_to][current_orientation].x + "%";
			view.style.top 		= "" + anchoringProperties[anchor_to][current_orientation].y + "%";
			view.style.width 	= "" + anchoringProperties[anchor_to][current_orientation].width + "%";
			view.style.height 	= "" + anchoringProperties[anchor_to][current_orientation].height + "%";
		}
	},
	
	/**
	 * Transforms the viewfinder to reflect scanning area in decoder.
	 */
	rotateAny_toOrientation: function (scanningRect1, to_orientation) {
		
		if (to_orientation < 0 || to_orientation > 2) return;

		var x1 = scanningRect1.x;
		var y1 = scanningRect1.y;
		var w1 = scanningRect1.width;
		var h1 = scanningRect1.height;

		var from_orientation = MW_properties.runtime.viewfinderOnScreenView.orientation; //it was always from landscape (decoder) until now

		var orientationRotationT = [
			//landscape                                 portrait                                landscape flipped
			[{ x: x1, y: y1, width: w1, height: h1 }, { x: y1, y: (100 - x1 - w1), width: h1, height: w1 }, { x: (100 - x1 - w1), y: (100 - y1 - h1), width: w1, height: h1 }], //landscape
			[{ x: (100 - y1 - h1), y: x1, width: h1, height: w1 }, { x: x1, y: y1, width: w1, height: h1 }, { x: y1, y: (100 - x1 - w1), width: h1, height: w1 }], //portrait
			[{ x: (100 - x1 - w1), y: (100 - y1 - h1), width: w1, height: h1 }, { x: (100 - y1 - h1), y: (100 - x1 - w1), width: h1, height: w1 }, { x: x1, y: y1, width: w1, height: h1 }]  //landscape flipped
		];

		return orientationRotationT[from_orientation][to_orientation];
	},

	/**
	 * Transforms the viewfinder to reflect scanning area in decoder 2.
	 */
	scaleFull_toPartial: function (scanningRect1, partialScale, scaleHeight) {
		
		if (partialScale < 0.01 || partialScale > 1.0 || scaleHeight < 0 || scaleHeight > 1) return;

		var x1 = scanningRect1.x;
		var y1 = scanningRect1.y;
		var w1 = scanningRect1.width;
		var h1 = scanningRect1.height;

		var cropScaleP = (1 - partialScale) * 100; //on [0,100) scale
		//[scaleDirection]
		var scale_and_center = [
			//scale down and translate to justified position
			{ x: ((cropScaleP / 2) + (x1 * partialScale)), y: y1, width: (w1 * partialScale), height: h1 }, //scaleWidth
			{ x: x1, y: ((cropScaleP / 2) + (y1 * partialScale)), width: w1, height: (h1 * partialScale) }  //scaleHeight
		];

		return scale_and_center[scaleHeight];
	},
	
	/**
	 * Calculates the scanningRects for all codes and sets them in the SDK.
	 */
	calcScanningRect: function (is_portrait, _isDivArHigher, _croppedCameraAreaScale, numberOfSupporedCodes, untouchedScanningRectsArray, viewfinderOnScreenView)
	{
		if (mwb_debug_print) console.log('calcScanningRect(portrait: ' + is_portrait + ', isDivArHigher: ' + _isDivArHigher + ', croppedCameraAreaScale: ' + _croppedCameraAreaScale.toFixed(2) + ') called');

		var viewfinderAreaScale = (1 - _croppedCameraAreaScale);
		
		var widthIndex = 0;
		var heightIndex = 1;
		
		//since w3/mozilla were considerate enough to design an API that results in getting each
		//frame exaclty in the orientation its preview-ed in (unlike landscape only)
		//that messes with the calcs in scaleFull_toPartial, so this small but crucial extra step is needed:
		if (is_portrait)
		{
			widthIndex = 1;
			heightIndex = 0;
		}
		
		var codeMasksArray = MW_properties.global.codeMasksArray; //global access
		
		// determine if cutting is done by width or height
		if ((!is_portrait && _isDivArHigher) || (is_portrait && !_isDivArHigher))
		{
			// it's done by height, rare                
			var codeMask, 
				scanningRectTM;

			var i = 0;
			for (; i < numberOfSupporedCodes; i++) {
				// copy needed primitive types BY VALUE | these functions create new structures and assign primitive types by value | no ref here
				scanningRectTM = this.rotateAny_toOrientation(untouchedScanningRectsArray[i], viewfinderOnScreenView.orientation);
				scanningRectTM = this.scaleFull_toPartial(scanningRectTM, viewfinderAreaScale, heightIndex);
				
				// set in decoder
				codeMask = codeMasksArray[i];
				
				BarcodeScanner.MWBsetScanningRect(codeMask, scanningRectTM.x, scanningRectTM.y, scanningRectTM.width, scanningRectTM.height);
			}
		}
		else
		{
			// it's by width, most common
			var codeMask,
				scanningRectTM;

			var i = 0;
			for (; i < numberOfSupporedCodes; i++) {
				
				// copy needed primitive types BY VALUE | these functions create new structures and assign primitive types by value | no ref here
				scanningRectTM = this.rotateAny_toOrientation(untouchedScanningRectsArray[i], viewfinderOnScreenView.orientation);
				scanningRectTM = this.scaleFull_toPartial(scanningRectTM, viewfinderAreaScale, widthIndex);
				
				//HERE undefined .x => because DOM lags, previewFrame is 0, so viewfinderAreaScale is 0, and
				//scaleFull_toPartial checks 0.01 - 1, and just returns, which is undefined for scanningRectTM
				//sol: place resize in setTimeout(0) ?

				// set in decoder
				codeMask = codeMasksArray[i];
				
				BarcodeScanner.MWBsetScanningRect(codeMask, scanningRectTM.x, scanningRectTM.y, scanningRectTM.width, scanningRectTM.height);
			}
		}
		
		if (mwb_debug_print) {
			//get viewfinder			
			var viewfnderUnionRect = BarcodeScanner.MWBgetScanningRect(0);
			
			viewfnderUnionRect = JSON.parse(viewfnderUnionRect);
			if (mwb_debug_print) console.log('viewfinderUnion after transformation is ' + viewfnderUnionRect.x + ', ' + viewfnderUnionRect.y + ', ' + viewfnderUnionRect.width + ', ' + viewfnderUnionRect.height + ' ');
		}
	},
	
	/**
	 * Calculates overlay coordinates for canvas and calls calcScanningRect.
	 */
	calcPreview: function (is_portrait, hardwareCameraResolution, preview, MW_properties, Dynamic_DOM_Elements) {
		
		//obtain args
		var numberOfSupporedCodes = MW_properties.global.numberOfSupporedCodes;
		var untouchedScanningRectsArray = MW_properties.global.untouchedScanningRectsArray;
		var viewfinderOnScreenView = MW_properties.runtime.viewfinderOnScreenView;
		var previewFrame = Dynamic_DOM_Elements.previewFrame;
		
		if (mwb_debug_print) console.log('calcPreview(portrait: ' + is_portrait + ') called');
		
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;
		var window_AR = windowWidth / windowHeight;
		var rootDivInviewTop = previewFrame.offsetTop; //or just get it through _DOM ? //document.getElementById("root-div-inview")
		var rootDivInviewLeft = previewFrame.offsetLeft;
		var rootDivInviewWidth = previewFrame.offsetWidth;
		var rootDivInviewHeigth = previewFrame.offsetHeight;
		var rootDivInview_AR = rootDivInviewWidth / rootDivInviewHeigth;
		
		var use_runtime_resolution = MW_properties.global.useRuntimeResolution;
		
		var cameraWidth;
		var cameraHeight;
		var camera_AR;
		
		if (use_runtime_resolution)
		{
			//new way
			cameraWidth = Dynamic_DOM_Elements.preview.videoWidth;
			cameraHeight = Dynamic_DOM_Elements.preview.videoHeight;
			camera_AR = cameraWidth / cameraHeight;
		}
		else
		{
			//old way
			cameraWidth = hardwareCameraResolution.width;
			cameraHeight = hardwareCameraResolution.height;
			camera_AR = cameraWidth / cameraHeight;
			if (is_portrait) {
				cameraWidth = hardwareCameraResolution.height;
				cameraHeight = hardwareCameraResolution.width;
				camera_AR = cameraWidth / cameraHeight;
			}
		}
		//DOM elements weren't fully rendered (previewFrame has size of 0)
		//although after moving this code after video load, it works just fine, both on firefox and chrome
		
		
		if (mwb_debug_print) console.log("In calcPreview | cameraPreview_AR is "+ rootDivInview_AR.toFixed(1) +" and camera_AR is "+ camera_AR.toFixed(1) +" | cameraPreview size is "+ rootDivInviewWidth +"x"+ rootDivInviewHeigth);

		if (rootDivInview_AR == camera_AR) return;
		else
			if (rootDivInview_AR > camera_AR)
			{
				// fill div by width, most likely portrait
				if (mwb_debug_print) console.log("fill div by width, most likely portrait");
				
				var scalingFactor = rootDivInviewWidth / cameraWidth;
				var new_cameraHeight = cameraHeight * scalingFactor;
				var croppedCameraArea = new_cameraHeight - rootDivInviewHeigth;
				
				// get percentages:
				var croppedCameraAreaScale = croppedCameraArea / new_cameraHeight;
				var translatedCameraTopP = -(croppedCameraAreaScale / 2) * 100;
				
				preview.style.cssText = "position: absolute; margin: auto; top: 0; bottom: 0; width: 100%; height: auto;";
				
				this.calcScanningRect(is_portrait, true, croppedCameraAreaScale, numberOfSupporedCodes, untouchedScanningRectsArray, viewfinderOnScreenView);
			}
			else
				if (rootDivInview_AR < camera_AR) // default remaining
				{
					//fill div by height
					if (mwb_debug_print) console.log("fill div by height");
					
					var scalingFactor = rootDivInviewHeigth / cameraHeight;
					var new_cameraWidth = cameraWidth * scalingFactor;
					var croppedCameraArea = new_cameraWidth - rootDivInviewWidth;

					// get percentages
					var croppedCameraAreaScale = croppedCameraArea / new_cameraWidth;
					var translateCameraLeftP = -(croppedCameraAreaScale / 2) * 100;

					var croppedinDivAreaScale = croppedCameraArea / rootDivInviewWidth;
					var translateinDivLeftP = -(croppedinDivAreaScale / 2) * 100;
					translateinDivLeftP += 0;
					
					preview.style.cssText = "position: absolute; margin-left: " + translateinDivLeftP + "%; width: auto; height: 100%;";
					
					this.calcScanningRect(is_portrait, false, croppedCameraAreaScale, numberOfSupporedCodes, untouchedScanningRectsArray, viewfinderOnScreenView);
				}
	},
	
	/**
	 * Draws overlay lines inside the canvasOverlay area.
	 * @param  {object} lines	canvases for overlay blinking lines
	 * @param  {float} x1		canvasOverlay Left
	 * @param  {float} y1		canvasOverlay Top
	 * @param  {float} w1		canvasOverlay Width
	 * @param  {float} h1		canvasOverlay Left
	 * @param  {float} lineThickness CanvasBlinkingLine lineThickness
	 */
	drawOverlayLines: function (lines, x1, y1, w1, h1, lineThickness) {

		var startLeft = x1;
		var startTop = y1;
		lines.v.style.left = lines.h.style.left = (startLeft - 0) + "px";
		lines.v.style.top = lines.h.style.top = (startTop - 0) + "px";

		lines.v.width = lines.h.width = w1;
		lines.v.height = lines.h.height = h1;
		
		
		lines.v.width = lineThickness;
		lines.v.style.left = (startLeft + (w1 / 2) - (lines.v.width / 2) - 0) + "px";

		lines.h.height = lineThickness;
		lines.h.style.top = (startTop + (h1 / 2) - (lines.h.height / 2) - 0) + "px";
		
		// NOTE: at the time this is called the canvas lines have already been added to the html document and the animation has been started and can't be changed at this point
		// SOLUTION: execute these instructions in createPreview before canvas lines are added (because resize and subsequently this function is called after)
		//canvasBlinkingLineV.style.backgroundColor = canvasBlinkingLineH.style.backgroundColor = mwOverlayProperties.lineColor;
		//canvasBlinkingLineV.style.animation = canvasBlinkingLineH.style.animation = "fadeColor " + mwOverlayProperties.blinkingRate + "ms infinite";
	},
	
	/**
	 * Stops or restarts blinking lines in overlay for PM_STOP_BLINKING depending on pause state
	 */
	toggleBlinkingLines: function () {
		//use this code and set anim to 0 (this resets lines to full stroke)
		var this_root = Dynamic_DOM_Elements;
		var anim_state = (MWBScanner.PAUSE_DECODING) ? 0 : MW_properties.global.overlay.blinkingRate;
		
		this_root.lineV.style.animation = this_root.lineH.style.animation = "fadeColor " + anim_state + "ms infinite";
		
	},
	
	/**
	 * Update overlay elements accordingly
	 */
	handleOverlayModes: function () {
		
		var canvasOverlay = Dynamic_DOM_Elements.overlay;
		var lines = MW_properties.global.blinkingLines;
		var mwOverlayProperties = MW_properties.global.overlay;
		var viewfinderOnScreenView = MW_properties.runtime.viewfinderOnScreenView;
		
		var ctx = canvasOverlay.getContext("2d");
		
		if (mwOverlayProperties.mode == 0) {
			
			lines.v.style.visibility = "hidden";
			lines.h.style.visibility = "hidden";
			
			ctx.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
		}
		else if (mwOverlayProperties.mode == 1)
		{
			// draw fullcanvas shadow and clear the viewfinder area
			ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
			ctx.fillRect(0, 0, canvasOverlay.width, canvasOverlay.height);
			ctx.clearRect(viewfinderOnScreenView.x, viewfinderOnScreenView.y, viewfinderOnScreenView.width, viewfinderOnScreenView.height);

			if (mwOverlayProperties.borderVisible)
			{
				// draw red viewfinder border
				ctx.lineWidth = mwOverlayProperties.borderWidth;
				ctx.strokeStyle = mwOverlayProperties.lineColor;
				ctx.strokeRect(viewfinderOnScreenView.x, viewfinderOnScreenView.y, viewfinderOnScreenView.width, viewfinderOnScreenView.height);
			}
			
			// draw red lines
			this.drawOverlayLines(
			lines,
			canvasOverlay.offsetLeft + viewfinderOnScreenView.x,
			canvasOverlay.offsetTop + viewfinderOnScreenView.y,
			viewfinderOnScreenView.width,
			viewfinderOnScreenView.height,
			mwOverlayProperties.linesWidth);
			
			//show lines if visible is set
			lines.v.style.visibility = (lines.visible) ? "visible" : "hidden";
			lines.h.style.visibility = (lines.visible) ? "visible" : "hidden";
			
			// draw pause rects or stop blinking lines
			if (mwOverlayProperties.pauseMode == 2) //PM_STOP_BLINKING
			this.toggleBlinkingLines();
			else if (mwOverlayProperties.pauseMode == 1) //PM_PAUSE
			this.drawPauseRects();
		}
		else if (mwOverlayProperties.mode == 2)
		{
			lines.v.style.visibility = "hidden";
			lines.h.style.visibility = "hidden";
			
			ctx.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);

			var imageOverlay = document.createElement("img");
			imageOverlay.src = mwOverlayProperties.imageSrc;

			imageOverlay.onload = function () {
				ctx.drawImage(imageOverlay, 0, 0, imageOverlay.width, imageOverlay.height,      // source rectangle
											0, 0, canvasOverlay.width, canvasOverlay.height);   // destination rectangle
			}
		}
	},
	
	/**
	 * Draws overlay pause rectangles inside the canvasOverlay area for PM_PAUSE
	 * and alternates display with overlay lines
	 */
	drawPauseRects: function () {
		//first 'disapper' lines
		var this_root = Dynamic_DOM_Elements;
		
		if(MWBScanner.PAUSE_DECODING)
		{
			this_root.lineV.style.display = "none";
			this_root.lineH.style.display = "none";
		}
		else
		{
			//if resumed re-enable lines
			this_root.lineV.style.display = "initial";
			this_root.lineH.style.display = "initial";
		}
		
		//then draw pause lines on canvas
		let pauseOverlay = Dynamic_DOM_Elements.pause;
		let previewFrame = Dynamic_DOM_Elements.previewFrame;
		
		//set pause canvas over preview i.e. copy overlay pos and size to pause overlay
		Dynamic_DOM_Elements.setTop_forPreviewTypeElements(pauseOverlay);
		pauseOverlay.style.left = previewFrame.style.left;
		pauseOverlay.width = previewFrame.offsetWidth;
		pauseOverlay.height = previewFrame.offsetHeight;
		
		var ctx = pauseOverlay.getContext("2d");
		
		let mwOverlayProperties = MW_properties.global.overlay;
		
		//calculate position and size for pause rectangles
		let r1 = {x:0, y: 0, w: 0, h: 0};
		let r2 = {x:0, y: 0, w: 0, h: 0};
		
		let aspectRatio = pauseOverlay.width / pauseOverlay.height;
		
		let AR_dynamic_props = [
			//x-axis percentages 42-5-6-5-42 (ok for AR 0.6)
			{rh: 20, rw: 5, r1x: 42, r2x: 53},
			//x-axis percentages 43-4-6-4-43 (ok for AR 1.6)
			{rh: 25, rw: 4, r1x: 43, r2x: 53},
			//x-axis percentages 45-3-4-3-45 (ok for AR 3.6)
			{rh: 30, rw: 3, r1x: 45, r2x: 52}
		];
		
		let AR_group = 1;
		if (aspectRatio < 1.0) AR_group = 0;
		if (aspectRatio > 2.2) AR_group = 2;
		
		let best_props = AR_dynamic_props[AR_group];
		
		r1.y = r2.y = (pauseOverlay.height / 100) * ((100 - best_props.rh) / 2);
		r1.h = r2.h = (pauseOverlay.height / 100) * best_props.rh;
		
		r1.w = r2.w = (pauseOverlay.width / 100) * best_props.rw;
		
		//x-axis percentages 43-4-6-4-43 (ok for AR 1.6)
		r1.x = (pauseOverlay.width / 100) * best_props.r1x;
		r2.x = (pauseOverlay.width / 100) * best_props.r2x;
		
		
		ctx.lineWidth = mwOverlayProperties.borderWidth * 1;
		ctx.fillStyle = mwOverlayProperties.lineColor;
		
		if(MWBScanner.PAUSE_DECODING)
		{
			ctx.fillRect(r1.x, r1.y, r1.w, r1.h);
			ctx.fillRect(r2.x, r2.y, r2.w, r2.h);
		}
		else
		{
			//if resumed remove pause rectangles
			ctx.clearRect(r1.x-1, r1.y-1, r1.w+2, r1.h+2);
			ctx.clearRect(r2.x-1, r2.y-1, r2.w+2, r2.h+2);
		}
	},
	
	calcCameraSwitcherPos: async function () {
		
		let previewFrame = Dynamic_DOM_Elements.previewFrame;
		let cameraSwitcher = Dynamic_DOM_Elements.cameraSwitcher;
		
		//set camera switcher over preview
		cameraSwitcher.style.top = previewFrame.style.top;
		cameraSwitcher.style.left = previewFrame.style.left;
		//cameraSwitcher.width = previewFrame.offsetWidth;
		//cameraSwitcher.height = previewFrame.offsetHeight;
		
		//needs to be visible to have size
		let cs_displayState = cameraSwitcher.style.display;
		cameraSwitcher.style.visibility = "hidden";
		cameraSwitcher.style.display = "initial";
		
		let aspectRatio = previewFrame.width / previewFrame.height;
		
		let AR_dynamic_props = [
			//cam_list_port percentages (ok for AR 0.6)
			{x: 10, y: 20, w: 80, h: 60},
			//cam_list_norm percentages (ok for AR 1.6)
			{x: 10, y: 10, w: 80, h: 80},
			//cam_list_land percentages (ok for AR 3.6)
			{x: 20, y: 10, w: 60, h: 80}
		];

		let AR_group = 1;
		if (aspectRatio < 1.0) AR_group = 0;
		if (aspectRatio > 2.2) AR_group = 2;

		let best_props = AR_dynamic_props[AR_group];
		
		cameraSwitcher.style.top = previewFrame.offsetTop + ((previewFrame.offsetHeight * best_props.y) / 100.0) + "px";
		cameraSwitcher.style.left = previewFrame.offsetLeft + ((previewFrame.offsetWidth * best_props.x) / 100.0) + "px";
		
		//adjust font size and padding
		let width_percentage = cameraSwitcher.offsetWidth / previewFrame.offsetWidth;
		let height_percentage = cameraSwitcher.offsetHeight / previewFrame.offsetHeight;
		
		if (mwb_debug_print)
		{
			console.log('Camera switcher W,H are ' + [((width_percentage * 100).toFixed(1))+'%', ((height_percentage * 100).toFixed(1))+'%'] + ' w.r.t camera preview W,H');
		}
		
		function adjustFontSize() {
			let fontSizes = ["1.125em", "0.75em"];
			let paddings = ["10px", "5px"];
			if (typeof width_percentage == 'number'  && (!isNaN(width_percentage)) && (!isNaN(aspectRatio)))
			{
				let item_count = cameraSwitcher.children.length;
				let fontSize = (width_percentage > 0.9) ? fontSizes[1] : fontSizes[0];
				let padding = (width_percentage > 0.9) ? paddings[1] : paddings[0];
				
				for (let i = 0; i < item_count; i++)
				{
					let item_i = cameraSwitcher.children[i];
					item_i.style.fontSize = fontSize;
					item_i.style.padding = padding;
				}
			}
		}
		adjustFontSize();
		
		//calc centering values
		let topOffset_fromPreview = (previewFrame.offsetHeight - cameraSwitcher.offsetHeight) / 2;
		let leftOffset_fromPreview = (previewFrame.offsetWidth - cameraSwitcher.offsetWidth) / 2;
		
		if (mwb_debug_print)
		{
			console.log("previewFrame.offsetHeight - cameraSwitcher.offsetHeight is " + previewFrame.offsetHeight + " - " + cameraSwitcher.offsetHeight);
			console.log("previewFrame.offsetWidth - cameraSwitcher.offsetWidth is " + previewFrame.offsetWidth + " - " + cameraSwitcher.offsetWidth);
			
			console.log("previewFrame.offsetTop + topOffset_fromPreview is " + previewFrame.offsetTop + " + " + topOffset_fromPreview);
			console.log("previewFrame.offsetLeft + leftOffset_fromPreview is " + previewFrame.offsetLeft + " + " + leftOffset_fromPreview);
		}
		
		cameraSwitcher.style.top = previewFrame.offsetTop + topOffset_fromPreview + "px";
		cameraSwitcher.style.left = previewFrame.offsetLeft + leftOffset_fromPreview + "px";
		
		//restore state as before
		cameraSwitcher.style.visibility = ""; //"visible";
		cameraSwitcher.style.display = cs_displayState;
	},
	
	/**
	 * Resizes the canvas to fill browser window dynamically.
	 */
	resizeCanvas: function (MW_properties, Dynamic_DOM_Elements) {
		
		//obtain args
		var viewfinderUnionRect = MW_properties.runtime.untouchedScanningRectsUnion; // get viewfinder (landscape)
		//^THIS is supposed to NOT be touched!
		
		var previewFrame = Dynamic_DOM_Elements.previewFrame;
		var canvasOverlay = Dynamic_DOM_Elements.overlay;
		let locateOverlay = Dynamic_DOM_Elements.locate;
		var lines = MW_properties.global.blinkingLines;
		var flash = Dynamic_DOM_Elements.flash;
		var zoom = Dynamic_DOM_Elements.zoom;
		var close = Dynamic_DOM_Elements.close;
		var camera = Dynamic_DOM_Elements.camera;
		let cameraSwitcher = Dynamic_DOM_Elements.cameraSwitcher;
		var mwOverlayProperties = MW_properties.global.overlay;
		var viewfinderOnScreenView = MW_properties.runtime.viewfinderOnScreenView;
		
		if (mwb_debug_print) console.log('resizeCanvas called');

		// set canvas over preview
		Dynamic_DOM_Elements.setTop_forPreviewTypeElements(canvasOverlay);
		canvasOverlay.style.left = previewFrame.style.left;
		canvasOverlay.width = previewFrame.offsetWidth; // capturePreviewFrame is a <div> element so it doesn't have width and height properties
		canvasOverlay.height = previewFrame.offsetHeight;
					
		// set locate canvas over preview i.e. copy overlay pos and size to locate overlay
		Dynamic_DOM_Elements.setTop_forPreviewTypeElements(locateOverlay);
		locateOverlay.style.left = previewFrame.style.left;
		locateOverlay.width = previewFrame.offsetWidth;
		locateOverlay.height = previewFrame.offsetHeight;
		
		// and clear it
		let ctx_locate = locateOverlay.getContext("2d");
		ctx_locate.clearRect(0, 0, locateOverlay.width, locateOverlay.height);
		
		// linking image buttons to position
		flash.style.top = (canvasOverlay.offsetTop + 2) + "px";
		flash.style.left = canvasOverlay.offsetLeft + "px";
		zoom.style.top = (canvasOverlay.offsetTop + 2) + "px";
		zoom.style.left = ((canvasOverlay.offsetWidth + canvasOverlay.offsetLeft) - zoom.offsetWidth) + "px";
		
		close.style.top = ((canvasOverlay.offsetTop + canvasOverlay.height) - ((close.offsetHeight * 2) + 2)) + "px";
		close.style.left = ((canvasOverlay.offsetWidth + canvasOverlay.offsetLeft) - (close.offsetWidth * 2)) + "px";
		
		camera.style.top = ((canvasOverlay.offsetTop + canvasOverlay.height) - ((camera.offsetHeight * 1) + 2)) + "px";
		camera.style.left = (canvasOverlay.offsetLeft + 8) + "px";
		
		this.calcCameraSwitcherPos();

		// set viewfinder in pixels
		viewfinderOnScreenView.x = canvasOverlay.width * (viewfinderUnionRect.x / 100);
		viewfinderOnScreenView.y = canvasOverlay.height * (viewfinderUnionRect.y / 100);
		viewfinderOnScreenView.width = canvasOverlay.width * (viewfinderUnionRect.width / 100);
		viewfinderOnScreenView.height = canvasOverlay.height * (viewfinderUnionRect.height / 100);

		/**
		 * Your drawings need to be inside this function otherwise they will be reset when 
		 * you resize the browser window and the canvas goes will be cleared.
		 */
		
		//handle overlay mode
		MW_methods.handleOverlayModes();
	},
	
	/**
	 * Resize partial scanning view.
	 */
	resizePartialScannerView: async function resizeView(MW_properties, Dynamic_DOM_Elements) { //function name not needed | also this was referenced from global var
		
		if (mwb_debug_print) {
			let BR_properties = MW_methods.helpers.burstRefresh.properties;
			BR_properties.resizeHandlerCallCount++;
			console.log('resizeHandlerCallCount: ' + BR_properties.resizeHandlerCallCount + ' at resizeEventCount: ' + BR_properties.resizeEventCount);
		}
		
		//setTimeout(function(){let this_root = MW_methods;
		//obtain needed args
		var hideDuringUpdate = MW_properties.global.hideDuringUpdate;
		var proxyWrapPreview = Dynamic_DOM_Elements.proxyWrapPreview;
		var lines = MW_properties.global.blinkingLines; //Dynamic_DOM_Elements.lines; //_DOM doesn't work but MW_ works (its the time of setting those)
		
		var previewFrame = Dynamic_DOM_Elements.previewFrame;
		var partialView = MW_properties.global.partialView;
		var viewfinderOnScreenView = MW_properties.runtime.viewfinderOnScreenView;
		
		var is_portrait = MW_properties.runtime.is_portrait;
		var hardwareCameraResolution = MW_properties.global.hardwareCameraResolution;
		var preview = Dynamic_DOM_Elements.preview;
		
		//var canvasOverlay = Dynamic_DOM_Elements.canvas;
		
		if (mwb_debug_print) console.log('In resizePartialScannerView | window size is ' + window.innerWidth + 'x' + window.innerHeight);

		// USE THIS IF YOU WANT TO STORE THE VALUES OF THE RESIZE FOR THE NEXT SCAN
		/*partialView.x = x1;
		partialView.y = y1;
		partialView.width = w1;
		partialView.height = h1;*/
		
		//cameraSwitcher font helper
		let cameraSwitcher_displayState = Dynamic_DOM_Elements.cameraSwitcher_isVisible();
		if (cameraSwitcher_displayState) JavaScript_mediaDevices_API.cameraHandler();

		// improve UIX during update | users don't need to see the underlying changes only the final result
		if (hideDuringUpdate) {
			proxyWrapPreview.style.visibility = "hidden"; //HERE
			//canvasOverlay.style.display = "none";
			lines.v.style.display = "none";
			lines.h.style.display = "none";
		}
			
		this.anchorView_toOrientation(previewFrame, partialView.x, partialView.y, partialView.width, partialView.height, partialView.orientation, viewfinderOnScreenView.orientation);
		//HERE - either anchorView_toOrientation messes up, or the DOM is lagging after the resize event is fired and so previewFrame height is 0 - in which case, use setTimeout(0)
		
		
		if (mwb_debug_print) console.log('anchor is ' + partialView.orientation + " [0-3] | orientation is " + viewfinderOnScreenView.orientation + " [0-2]");
		
		//maybe wait(1) between these calcs?
		
		this.calcPreview(is_portrait, hardwareCameraResolution, preview, MW_properties, Dynamic_DOM_Elements);
		this.resizeCanvas(MW_properties, Dynamic_DOM_Elements);
		
		//cameraSwitcher font helper (checks pre-changes displayState so its ok)
		if (cameraSwitcher_displayState) JavaScript_mediaDevices_API.cameraHandler();
		
		// reappear video preview
		setTimeout(function () {
			if (hideDuringUpdate) {
				proxyWrapPreview.style.visibility = "visible";
				//canvasOverlay.style.display = "initial";
				lines.v.style.display = "initial";
				lines.h.style.display = "initial";
			}
		}, 1000); //THIS might be able to do with less - depending on device's speed?
		//}, 100);
	},
	
	eventHandlers: {
		//
		resize: function(e) {
			
			if (mwb_debug_print) { console.log('The window was resized.'); console.log(e); }
			MW_methods.resizePartialScannerView(MW_properties, Dynamic_DOM_Elements);
			
			//turn it on or off here
			if (MW_properties.global.useBurstRefresh)
			{
				let BR_properties = MW_methods.helpers.burstRefresh.properties;
				let BR_methods = MW_methods.helpers.burstRefresh;
				
				var current_valuesForResize = BR_methods.getValuesForResize();
				BR_properties.previous_valuesForResize = JSON.parse(JSON.stringify(current_valuesForResize));
				
				BR_methods.burstRefresh_main(++BR_properties.resizeEventCount);
			}
			//turn it on or off here
		},
		
		loadeddata: function() {
			
			var camera_event = new CustomEvent("cameraReady", {"detail":"Camera is ready."});
			document.dispatchEvent(camera_event);
		},
		
		preview_closed: function() {
			
			var preview_event = new CustomEvent("cameraPreviewClosed", {"detail":"Camera preview closed."});
			document.dispatchEvent(preview_event);
		}
	},
	
	helpers: {
		already_inited: false,
		init_codeMasks_and_scanRects_and_union: function (MW_properties) {
			
			var _numberOfSupporedCodes = MW_properties.global.numberOfSupporedCodes;
			var codeMasksArray = MW_properties.global.codeMasksArray;
			var untouchedScanningRectsArray = MW_properties.global.untouchedScanningRectsArray;
			var untouchedScanningRectsUnion = MW_properties.runtime.untouchedScanningRectsUnion;
			
			if (!this.already_inited) //fill arrays first time
			{
				for (var _i = 0; _i < _numberOfSupporedCodes; _i++)
				{			
					codeMasksArray.push(Math.pow(2, _i));
					
					var rect = BarcodeScanner.MWBgetScanningRect(codeMasksArray[_i]);
					//if (mwb_debug_print) console.log(codeMasksArray[_i] + ', ');
					//if (mwb_debug_print) console.log(rect);
					var rect = JSON.parse(rect);
					untouchedScanningRectsArray.push(rect);
				}
				
				this.already_inited = true;
			}
			else //2+ 'th start
			{				
				for (var _i = 0; _i < _numberOfSupporedCodes; _i++)
				{					
					var rect = BarcodeScanner.MWBgetScanningRect(codeMasksArray[_i]);
					//if (mwb_debug_print) console.log(codeMasksArray[_i] + ', ');
					//if (mwb_debug_print) console.log(rect);
					var rect = JSON.parse(rect);
					untouchedScanningRectsArray[_i] = rect;
				}
			}
			
			var sdk_union = JSON.parse(BarcodeScanner.MWBgetScanningRect(0));
			
			untouchedScanningRectsUnion.x = sdk_union.x;
			untouchedScanningRectsUnion.y = sdk_union.y;
			untouchedScanningRectsUnion.width = sdk_union.width;
			untouchedScanningRectsUnion.height = sdk_union.height;

			if (mwb_debug_print) console.log('-> one-time initCodeMasksArray_and_untouchedScanningRectsArray_and_untouchedScanningRectsUnion ')
		},
		
		reset_Decoder: function () { if (mwb_debug_print) console.log('Scanning rects were reset.'); BarcodeScanner.MWBinitDecoder(); },
		
		IsJsonString: function (jsonString, jsonDefault) { 
			var jsonObject = null;
			try {
				jsonObject = JSON.parse(jsonString);
			} catch (e) {
				return jsonDefault;
			}
			return jsonObject;
		},
		
		//orientation
		OrientationType_hash: [],
		
		OrientationType_hash_init: function ()
		{
			//enum OrientationType {
			//	"portrait-primary",
			//	"portrait-secondary",
			//	"landscape-primary",
			//	"landscape-secondary"
			//};
			
			//var OrientationType_hash = [];
			this.OrientationType_hash["landscape-primary"] 	= 0;
			this.OrientationType_hash["portrait-primary"] 	= 1;
			this.OrientationType_hash["landscape-secondary"]= 2;
			//if (mwb_debug_print) console.log(this.OrientationType_hash); //[] (0) in Safari
		},
		
		_Screen_Orientation: (typeof screen.orientation === 'undefined') ? 'undefined' : screen.orientation,
		orientationChangeHandler: function () {
			//if (mwb_debug_print) console.log(typeof screen); //object on Safari
			//if (mwb_debug_print) console.log(typeof screen.orientation); //undefined on Safari

			if (mwb_debug_print) console.log("_Screen_Orientation: " + (MW_methods.helpers._Screen_Orientation));
			
			let orientation_number = 0; //land assumed for default
			
			if (MW_methods.helpers._Screen_Orientation === 'undefined') //because of ctx change that will be undefined (different than 'undefined' of type string)
			{
				orientation_number = (window.innerWidth > window.innerHeight) ? /*MW_methods.helpers.OrientationType_hash["landscape-primary"]*/ 0 : /*MW_methods.helpers.OrientationType_hash["portrait-primary"]*/ 1;
				
				if (mwb_debug_print) console.log('screen.width is ' + screen.width + " and screen.height is " + screen.height + " => orientation is " + orientation_number); //screen wh are different than window.inner wh
			}
			else
			{
				//logs
				if (mwb_debug_print) console.log('Orientation has changed.');
				if (mwb_debug_print) console.log(MW_methods.helpers._Screen_Orientation);
				//if (mwb_debug_print) console.log(MW_methods.helpers.OrientationType_hash);
				//set properties
				orientation_number = MW_methods.helpers.OrientationType_hash[MW_methods.helpers._Screen_Orientation.type];
			}
			
			//
			
			let is_portrait = ((orientation_number % 2) == 1);
			if (mwb_debug_print) console.log('orientation_number is ' + orientation_number + ' & ' + ((is_portrait) ? 'is portrait.' : 'is NOT portrait.'));
			
			let prev_is_portrait = MW_properties.runtime.is_portrait;
			
			MW_properties.runtime.viewfinderOnScreenView.orientation = orientation_number;
			MW_properties.runtime.is_portrait = is_portrait;
			
			if (mwb_debug_print) console.log("Orientation is " + ((MW_properties.runtime.is_portrait) ? 'portrait.' : 'NOT portrait.'));
			
			//since w3/mozilla were considerate enough to design an API that results in getting each
			//frame exaclty in the orientation its preview-ed in (unlike landscape only),
			//the hardwareCameraResolution also has to change values to reflect that when in portrait (already had been handled in calcPreview)
			{
				//no need to obtain frame size values from video, a simple swap should suffice
				//but that requires too many extra steps, so best to do it str8 from the source
				var videoWidth = Dynamic_DOM_Elements.preview.videoWidth,// || video.naturalWidth;
				videoHeight = Dynamic_DOM_Elements.preview.videoHeight;// || video.naturalHeight;
				
				//MW_properties.global.hardwareCameraResolution.width = videoWidth;
				//MW_properties.global.hardwareCameraResolution.height = videoHeight;
				
				//does it change at this point tho? -y.
				if (mwb_debug_print) console.log('Frame resolution from camera is ' + videoWidth + 'x' + videoHeight);
				
				//MW_properties.global.hardwareCameraResolution assumes static WxH
				//for camera, e.g. 1280x720, regardless of land/port
				//since Safari doesn't get its camera WH values from runtime caps api
				//it gets them from here, BUT the higher value MUST ALWAYS BE WIDTH
				
				var videoWidth_b = videoWidth,
					videoHeight_s = videoHeight;
					
				if (videoWidth < videoHeight)
				{
					videoWidth_b = videoHeight;
					videoHeight_s = videoWidth;
				}
				
				MW_properties.global.hardwareCameraResolution.width  = videoWidth_b;
				MW_properties.global.hardwareCameraResolution.height = videoHeight_s;
				
				if (mwb_debug_print) console.log(MW_properties.global.hardwareCameraResolution);
			}
			
			// PREVIEW UPDATE SHOULD BE DONE AFTER UI CHANGE WHICH MAY TAKE SOME TIME TO COMPLETE RENDERING AFTER ORIENTATION CHANGE | HANDLED BY window.resizeEvent->resizePartialScannerView
		},
		
		safari_video_click_workaround: function (video) {
			let virtual_button = document.createElement('button');
			virtual_button.onclick = function() {
				//
				video.play(); if (mwb_debug_print) console.log('video.play() 2nd call completed');
				
				//at this point its Safari
				if (mwb_debug_print) setTimeout(function() {
					//MWBScanner.resizePreview(2, 2, 96, 50);			
					if (mwb_debug_print) console.log(Dynamic_DOM_Elements.preview);
				}, 2500);
				
				this.onclick = null;
			};
			virtual_button.click();
		},
		
		safari_audio_click_workaround: function (audio) {
			if (BeepHelper.webAudio_supported) {
				if (mwb_debug_print) console.log('AudioContext is supported.');
				BeepHelper.webAudio_init();
			}
			else {
				if (mwb_debug_print) console.log('AudioContext is not supported, fallback to old Audio.');
				audio.volume = 0;
				audio.muted = true;
				audio.play();
			}
		},
		
		get_number_of_Digits: function(x) {
			return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
		},
		
		CreateErrorProperties: function(name,message,mozilla,userFriendly,mostLikelyCause) {
			return {
				name: name,
				message: message,
				mozilla: mozilla,
				userFriendly: userFriendly,
				mostLikelyCause: mostLikelyCause
			};
		},
		
		CreateErrorDescriptions: function() {
			//Cannot start the cameraPreview when calling startScanning, only a black preview is shown.
			MW_properties.runtime.errorDescriptions["NotReadableError"] = new MW_methods.helpers.CreateErrorProperties(
				"NotReadableError",
				"Could not start video source",
				"Although the user granted permission to use the matching devices, a hardware error occurred at the operating system, browser, or Web page level which prevented access to the device.",
				"Could not start the camera",
				"Running / using the camera in another browser / native app");
			//Cannot start the cameraPreview when calling startScanning, nothing is shown. The "http:" protocol is used and domain is not localhost.
			MW_properties.runtime.errorDescriptions.ProtocolError = new MW_methods.helpers.CreateErrorProperties(
				"ProtocolError",
				"",
				"If a document isn't loaded in a secure context (that is, the page was loaded using HTTP rather than HTTPS), the navigator.mediaDevices property is undefined, making access to getUserMedia() impossible.",
				"Cannot use the camera under HTTP because HTTPS is needed",
				"Accessing the web app under HTTP and not HTTPS");
				
			//Cannot start the cameraPreview when calling startScanning, nothing is shown. "Camera - Block" permission setting set in browser by user.
			MW_properties.runtime.errorDescriptions.NotAllowedError = new MW_methods.helpers.CreateErrorProperties(
				"NotAllowedError",
				"Permission denied",
				"It also happens if the user has specified that the current browsing instance is not permitted access to the device, the user has denied access for the current session, or the user has denied all access to user media devices globally.",
				"Cannot use the camera because camera access isn't allowed",
				"No permission to access the camera i.e. camera is blocked in the browser for this site");
				
			//Cannot start the cameraPreview when calling startScanning, nothing is shown. No camera is present i.e. no USB camera is plugged in on a desktop computer.
			MW_properties.runtime.errorDescriptions.NotFoundError = new MW_methods.helpers.CreateErrorProperties(
				"NotFoundError",
				"Requested device not found",
				"No media tracks of the type specified were found that satisfy the given constraints.",
				"Cannot use the camera because no camera device is present",
				"There is no physical camera device plugged in");
				
			//Cannot test
			MW_properties.runtime.errorDescriptions.AbortError = new MW_methods.helpers.CreateErrorProperties(
				"AbortError",
				"",
				"Although the user and operating system both granted access to the hardware device, and no hardware issues occurred that would cause a NotReadableError, some problem occurred which prevented the device from being used.",
				"Some problem occurred which prevented the device from being used.",
				"");
				
			//Cannot test
			//Note: OverconstrainedError probably can never happen because we request camera properties such as resolution with values that are supported, and in the rare case they aren't any other resolutions that can be supported will be used. In case torch or zoom aren't supported they won't be requested.
			MW_properties.runtime.errorDescriptions.OverconstrainedError = new MW_methods.helpers.CreateErrorProperties(
				"OverconstrainedError",
				"",
				"The specified constraints resulted in no candidate devices which met the criteria requested.",
				"No camera is available with the resolution / features being requested",
			"");
		},
		
		otherResult: function (code, errorDetails, type) {
			return {
				code: code,
				errorDetails: errorDetails,
				type: type,
				parsedCode: null,
				isGS1: null,
				bytes: null,
				locationPoints: null,
				imageWidth: null,
				imageHeight: null,
				moduleSizeX: null,
				moduleSizeY: null,
				modulesCountX: null,
				modulesCountY: null,
				ppm: null
			};
		},
		
		burstRefresh: {
			
			properties: {
				previous_valuesForResize: null,
				resizeEventCount: 0,
				resizeHandlerCallCount: 0
			},
			
			clearProperties: function () {
				//
				this.properties.previous_valuesForResize = null;
				this.properties.resizeEventCount = 0;
				this.properties.resizeHandlerCallCount = 0;
			},

			getValuesForResize: function () {

				var previewFrame = Dynamic_DOM_Elements.previewFrame;

				var orientation = MW_properties.runtime.viewfinderOnScreenView.orientation;
				var is_portrait = MW_properties.runtime.is_portrait;

				var previewFrameTop = previewFrame.offsetTop;
				var previewFrameLeft = previewFrame.offsetLeft;
				var previewFrameWidth = previewFrame.offsetWidth;
				var previewFrameHeigth = previewFrame.offsetHeight;
				
				var cameraWidth = Dynamic_DOM_Elements.preview.videoWidth;
				var cameraHeight = Dynamic_DOM_Elements.preview.videoHeight;
				
				let valuesObject = 
				{
					previewFrameTop: 		previewFrameTop,
					previewFrameLeft: 		previewFrameLeft,
					previewFrameWidth: 		previewFrameWidth,
					previewFrameHeigth: 	previewFrameHeigth,
					cameraWidth: 			cameraWidth,
					cameraHeight: 			cameraHeight,
					orientation: 			orientation,
					is_portrait: 			is_portrait
				};
				
				return valuesObject;
			},

			//if method returns true, values are equal and there is no point in doing the resize
			checkSameValuesForResize: function () {
				
				let previous_valuesForResize = this.properties.previous_valuesForResize;
				var valuesForResize = this.getValuesForResize();
				
				//place logging to div here if needed
				
				return (
					(valuesForResize.previewFrameTop == previous_valuesForResize.previewFrameTop) &&
					(valuesForResize.previewFrameLeft == previous_valuesForResize.previewFrameLeft) &&
					(valuesForResize.previewFrameWidth == previous_valuesForResize.previewFrameWidth) &&
					(valuesForResize.previewFrameHeigth == previous_valuesForResize.previewFrameHeigth) &&
					(valuesForResize.cameraWidth == previous_valuesForResize.cameraWidth) &&
					(valuesForResize.cameraHeight == previous_valuesForResize.cameraHeight) &&
					(valuesForResize.orientation == previous_valuesForResize.orientation) &&
					(valuesForResize.is_portrait == previous_valuesForResize.is_portrait)
				);
			},
			
			burstRefresh_main: function(resizeEventCount_at) {
				var refreshDuration = 0;
				var refreshRate = 50;
				var burstFinish = 500;
				var burstRefresh = setInterval(function()
				{
					refreshDuration += refreshRate;
					
					let resizeEventCount = MW_methods.helpers.burstRefresh.properties.resizeEventCount; //this is ok (copy by value) because its read-only in this code
					let BR_properties = MW_methods.helpers.burstRefresh.properties;
					let BR_methods = MW_methods.helpers.burstRefresh;
					
					if (refreshDuration > burstFinish) { 
						if (mwb_debug_print) console.log('cleared burstRefresh at ' + refreshDuration + 'ms because it reached burstFinish'); 
						clearInterval(burstRefresh); 
					}
					
					if (resizeEventCount > resizeEventCount_at) { 
						if (mwb_debug_print) console.log('cleared burstRefresh at ' + refreshDuration + 'ms because ' + resizeEventCount + ' > ' + resizeEventCount_at); 
						clearInterval(burstRefresh); 
					}
					
					//in resize: handler:
					var current_valuesForResize = BR_methods.getValuesForResize();

					if (BR_methods.checkSameValuesForResize()) return;
					
					let ri = resizeEventCount_at;
					if (mwb_debug_print) console.log('burstRefresh['+ri+'] at ' + refreshDuration + 'ms');
					
					//place logging to div here if needed

					BR_properties.previous_valuesForResize = JSON.parse(JSON.stringify(current_valuesForResize));
					
					MW_methods.helpers.orientationChangeHandler();
					MW_methods.resizePartialScannerView(MW_properties, Dynamic_DOM_Elements);
				}, refreshRate);
			}
		}
	}
};

var timePoll = 0; //for dev / testing (preview height 0 bug specifically), rm later
var callCount = 0;


//4. execution flow control, pauseDecoder, args, pointers, scanImage, result callbck,
//	[future: pthreads, altho its not 'real' mthreading], clean-free
var MWBScanner = {
	
	DECODER_ACTIVE: false, 
	
	CONTINUOUS_DECODING: false, 
	
	USE_PARSER: true, 
	
	decoder_timeout: 30, 
	
	dps_limit: 20,
	
	PAUSE_DECODING: false, //runtime
	
	external_helper: null, 
	
	result_callback: null,
	
	decoder: async function (video) {
		
		const DEBUG_PRINT = 0;
		var BEEP_ON_SUCCESS = false;
		var jump = 1; var jmp_count = 0; //jump one means every result is beep-ed, do not use 0 because that will be undefined
		//
		var dataPtr = null;
		var callCount = 0;
		const frameInterval = 1000 / MWBScanner.dps_limit; 
		const minTimeout = MWBScanner.decoder_timeout; //decoder_timeout is value in seconds and scanner_timeout is the actual method, which unsets DECODER_ACTIVE, which is the condition that will execute clearInterval on the next frame
		
		const totalFrames = ( 1000 / frameInterval ) * minTimeout;
		
		//var DECODER_ACTIVE = true;
		var startTime = performance.now(); //new Date().getTime();
		//
		var videoWidth = video.videoWidth,// || video.naturalWidth;
			videoHeight = video.videoHeight;// || video.naturalHeight;
		
		if (mwb_debug_print) console.log('loaded data of video ' + videoWidth + 'x' + videoHeight); //w,h have values i.e. 640,480 as soon as loadedmetadata Event (first frame loaded)
			
		//resize should always be called before reaching the decoder
			
		let mwOverlayProperties = MW_properties.global.overlay;
		let viewfinderOnScreen = MW_properties.runtime.viewfinderOnScreenView;
		
		var locationClear = null;
		
		var startFrameScanning = setInterval(async function () {
			//processing
			callCount++;
			if (!MWBScanner.DECODER_ACTIVE/*callCount > totalFrames*/) { clearInterval(startFrameScanning); return; }
			
			if (MWBScanner.PAUSE_DECODING) return;
			
			//relevant on orientation change
			videoWidth = video.videoWidth;
			videoHeight = video.videoHeight;
			
			if (videoWidth == 0 || videoHeight == 0) {
				if (mwb_debug_print) console.log('video frame is ' + videoWidth + 'x' + videoHeight);
				return;
			}
			
			var canvasFrame = document.createElement("canvas");
			var pad = 0;
			
			canvasFrame.width = videoWidth  + (pad * 2);
			canvasFrame.height = videoHeight + (pad * 2);
			
			var ctx = canvasFrame.getContext("2d");
			
			ctx.drawImage(video, 0, 0, videoWidth, videoHeight); //source rectangle
			var imgData = ctx.getImageData(0, 0, canvasFrame.width, canvasFrame.height);
			var data = imgData.data; //new Uint8ClampedArray([1, 20, -3, 129, 15]); //for testing purposes
			var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
			
			dataPtr = Module._malloc(nDataBytes); //buffer
			Module.HEAPU8.set(data, dataPtr); //[typedArray_dataSource, heapMemory_pointer]
			
			// Call function and get result
			var jsonMWResult = "";
			var scanFrame = Module.cwrap('scanFrame', 'string', ['number', 'number', 'number', 'number']); //asign cwrap when Module is loaded
			
			startTime = performance.now(); //new Date().getTime();
			
			//set active symbologies (and all other native sdk settings) before decoding
			
			//frame TEST			
			if (false && mwb_debug_print && (callCount == ((totalFrames/4) - 1)))
			{
				//
				console.log('Frame TEST');
				let url = canvasFrame.toDataURL(); //dataURL is png (no bmp or something raw)
				let windowName = 'Frame TEST';
				//window.open(url, windowName);
				
				console.log(url);
			}
			
			jsonMWResult = scanFrame(dataPtr, canvasFrame.width, canvasFrame.height, DEBUG_PRINT);
			
			var dps = 1000/(performance.now() - startTime); //current dps
			
			var MWResult_obj = (DEBUG_PRINT == 0) ? JSON.parse(jsonMWResult) : jsonMWResult;
			
			if (DEBUG_PRINT) { console.log(MWResult_obj); return; }
			
			if (MWResult_obj.type == "No MWResult.") //maybe check for undefined
			{
				if (mwb_debug_print) console.log( "dps(" + Math.round(dps) + "), frame " + callCount + " : " + MWResult_obj.code + " " + MWResult_obj.type );
			}
			else
			{
				//pause decoding right after result
				MWBScanner.PAUSE_DECODING = true;
				
				//location
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
				
				//capturedFrame
				if (MW_properties.global.returnCapturedFrame)
				result.capturedFrame = imgData;
				
				//location
				if (result != null && result.locationPoints != null)
				{
					//capturePreview.pause();
					//MWOverlay location points green box draw
					let canvasOverlay = (mwOverlayProperties.useLocationLayer) ? Dynamic_DOM_Elements.locate : Dynamic_DOM_Elements.overlay;
					let preview = Dynamic_DOM_Elements.preview;
					
					//if (mwb_debug_print) console.log(preview.offsetWidth); //one of preview's sides will be cropped and bigger than canvasOverlay | note: preview.width (and height) are 0
					
					var ctx = canvasOverlay.getContext("2d");
					
					//actual draw is further down in code, but its just calcs for getting the right coords
					//so clearing the timed clear + doing the clear now is just as ok
					
					if (locationClear != null) clearTimeout(locationClear);
					
					ctx.clearRect(viewfinderOnScreen.x + 1, viewfinderOnScreen.y + 1, viewfinderOnScreen.width - 2, viewfinderOnScreen.height - 2);
					
					const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
					await wait(10);
					//--

					if (mwb_debug_print) console.log("result.locationPoints:");
					if (mwb_debug_print) console.log(result.locationPoints);
					
					//let mwOverlayProperties = MW_properties.global.overlay;
					//let viewfinderOnScreen = MW_properties.runtime.viewfinderOnScreenView;
					
					ctx.lineWidth = mwOverlayProperties.borderWidth * 1; //location lines thickness
					ctx.strokeStyle = mwOverlayProperties.locationColor;

					var navigationBarHeight = (window.innerWidth > window.innerHeight) ? ((window.innerHeight * (16 / 9)) - window.innerWidth) : ((window.innerWidth * (16 / 9)) - window.innerHeight);
					
					navigationBarHeight = 0; //above is only good for windows phone

					if (mwb_debug_print) console.log('navigationBarHeight: ' + navigationBarHeight);

					var window_actualWidth = preview.offsetWidth;//canvasOverlay.width;//window.innerWidth;
					var window_actualHeight = preview.offsetHeight;//canvasOverlay.height;//window.innerHeight;

					//when the navigation bar is present, the image is pushed/translated by the size of the navigation bar
					if (viewfinderOnScreen.orientation == 0 || viewfinderOnScreen.orientation == 2) //landscape or flipped landscape
					{
						window_actualWidth += navigationBarHeight;
					}
					else //portrait
					{
						window_actualHeight += navigationBarHeight;
					}
					
					var translate_x = preview.offsetWidth - canvasOverlay.width;
					var translate_y = preview.offsetHeight - canvasOverlay.height;
					translate_x /= 2;
					translate_y /= 2;
					
					var scale_x = window_actualWidth / result.imageWidth;
					var scale_y = window_actualHeight / result.imageHeight;

					if (mwb_debug_print) console.log('window inner WxH is: ' + window.innerWidth + 'x' + window.innerHeight + ' | image WxH is: ' + result.imageWidth + 'x' + result.imageHeight + ' | scale_x and scale_y are: ' + scale_x + ' and ' + scale_y);
					
					if (false && viewfinderOnScreen.orientation == 1) //swap scales operands to account for the rotation
					{
						scale_x = window_actualWidth / result.imageHeight;
						scale_y = window_actualHeight / result.imageWidth;
						
						//most likely there won't be any need to swap translates
						//because they aren't tied with image - however, TEST!
					}

					//viewfinderOnScreen.orientation 1 port 2 flipped land
					var coordSysOrigin_x_Axis_toCenter = 0;
					var coordSysOrigin_y_Axis_toCenter = 0;

					if (false && viewfinderOnScreen.orientation != 0) //if not landscape, do some transformations to match the position on the current orientation
					{
						coordSysOrigin_x_Axis_toCenter = canvasOverlay.width / 2; //this /2 is correct
						coordSysOrigin_y_Axis_toCenter = canvasOverlay.height / 2;

						ctx.translate(coordSysOrigin_x_Axis_toCenter, coordSysOrigin_y_Axis_toCenter);
						ctx.rotate(viewfinderOnScreen.orientation * 90 * Math.PI / 180);
					}
					
					ctx.translate(-navigationBarHeight / 2, 0); //this needs to be /2 no matter what the scale_x value is

					if (!mwOverlayProperties.locationAllPointsDraw) //draw box from p1 and p3
					{
						var x = result.locationPoints.p1.x;
						var y = result.locationPoints.p1.y;

						var w = result.locationPoints.p3.x - x;
						var h = result.locationPoints.p3.y - y;

						x *= scale_x;
						y *= scale_y;
						w *= scale_x;
						h *= scale_y;

						//draw green location border polygon | swap translation back operands to account for the different width and height for portrait, otherwise just normal translation back
						if (viewfinderOnScreen.orientation == 1)
						{
							ctx.strokeRect(x - coordSysOrigin_y_Axis_toCenter, y - coordSysOrigin_x_Axis_toCenter, w, h);
						}
						else ctx.strokeRect(x - coordSysOrigin_x_Axis_toCenter, y - coordSysOrigin_y_Axis_toCenter, w, h);
					}
					else
					{
						var x1 = result.locationPoints.p1.x;
						var y1 = result.locationPoints.p1.y;
						var x2 = result.locationPoints.p2.x;
						var y2 = result.locationPoints.p2.y;
						var x3 = result.locationPoints.p3.x;
						var y3 = result.locationPoints.p3.y;
						var x4 = result.locationPoints.p4.x;
						var y4 = result.locationPoints.p4.y;
						
						x1 *= scale_x;
						y1 *= scale_y;
						x2 *= scale_x;
						y2 *= scale_y;
						x3 *= scale_x;
						y3 *= scale_y;
						x4 *= scale_x;
						y4 *= scale_y;
						
						x1 -= translate_x;
						y1 -= translate_y;
						x2 -= translate_x;
						y2 -= translate_y;
						x3 -= translate_x;
						y3 -= translate_y;
						x4 -= translate_x;
						y4 -= translate_y;
						
						if (mwb_debug_print) ctx.strokeStyle = "rgba(255, 225, 0, 1.0)";

						//draw green location border lines | swap translation back operands to account for the different width and height for portrait, otherwise just normal translation back
						if (viewfinderOnScreen.orientation == 1)
						{
							ctx.beginPath();
							ctx.moveTo(x1 - coordSysOrigin_y_Axis_toCenter, y1 - coordSysOrigin_x_Axis_toCenter);
							ctx.lineTo(x2 - coordSysOrigin_y_Axis_toCenter, y2 - coordSysOrigin_x_Axis_toCenter);
							ctx.lineTo(x3 - coordSysOrigin_y_Axis_toCenter, y3 - coordSysOrigin_x_Axis_toCenter);
							ctx.lineTo(x4 - coordSysOrigin_y_Axis_toCenter, y4 - coordSysOrigin_x_Axis_toCenter);
							ctx.lineTo(x1 - coordSysOrigin_y_Axis_toCenter, y1 - coordSysOrigin_x_Axis_toCenter);

							ctx.stroke();
						}
						else
						{
							ctx.beginPath();
							ctx.moveTo(x1 - coordSysOrigin_x_Axis_toCenter, y1 - coordSysOrigin_y_Axis_toCenter);
							ctx.lineTo(x2 - coordSysOrigin_x_Axis_toCenter, y2 - coordSysOrigin_y_Axis_toCenter);
							ctx.lineTo(x3 - coordSysOrigin_x_Axis_toCenter, y3 - coordSysOrigin_y_Axis_toCenter);
							ctx.lineTo(x4 - coordSysOrigin_x_Axis_toCenter, y4 - coordSysOrigin_y_Axis_toCenter);
							ctx.lineTo(x1 - coordSysOrigin_x_Axis_toCenter, y1 - coordSysOrigin_y_Axis_toCenter);

							ctx.stroke();
						}
						
						//ctx.beginPath();
						//ctx.moveTo(x1, y1);
						//ctx.lineTo(x2, y2);
						//ctx.lineTo(x3, y3);
						//ctx.lineTo(x4, y4);
						//ctx.lineTo(x1, y1);

						//ctx.stroke();
					}
				}
				
				if (BEEP_ON_SUCCESS && ++jmp_count % jump == 0) mwbScanner.beep();
				
				//SHOW RESULT STRING HERE
				if (MWBScanner.CONTINUOUS_DECODING)
				{
					var successString = "dps(" + Math.round(dps) + "), good frame " + callCount + " ... " + jsonMWResult + "\n\n" + MWResult_obj.code;
					
					//MWBcloseScannerOnDecode dependency
					MWBScanner.PAUSE_DECODING = true;
					
					let locationBorderTime = (frameInterval > mwOverlayProperties.locationShowTime) ? mwOverlayProperties.locationShowTime : frameInterval;
					locationBorderTime /= 100;
					locationBorderTime *= 90;
					
					locationClear = setTimeout(async function(){
						ctx.clearRect(viewfinderOnScreen.x + 1, viewfinderOnScreen.y + 1, viewfinderOnScreen.width - 2, viewfinderOnScreen.height - 2);
						
						const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
						await wait(10);
						
						if (mwOverlayProperties.pauseMode == 2) //PM_STOP_BLINKING
						MW_methods.toggleBlinkingLines();
						else if (mwOverlayProperties.pauseMode == 1) //PM_PAUSE
						MW_methods.drawPauseRects();
						
					}, locationBorderTime);
					
					if (MWBScanner.result_callback) //return to callback!
						MWBScanner.result_callback(MWResult_obj);
					else
						if (mwb_debug_print) console.log("decoded string (" + callCount + ") " + MWResult_obj.code);
					
				}
				else
				{
					MWBScanner.PAUSE_DECODING = true; //lock it from being changable from the gui/outside
					
					//pause preview so frame fits the location
					Dynamic_DOM_Elements.preview.pause();
					
					//show location breefly
					const wait = ms => new Promise(resolve => setTimeout(resolve, ms)); //keep this in common place - helpers
					await wait(mwOverlayProperties.locationShowTime);
					
					MWBScanner.destroyPreview(true); //has_res
					await wait(128); //wait a bit for DOM actions to complete
					//100 - PC
					//1500 Note5
					//rather fast on LG
					
					//maybe poll DOM state then show alert (or clbck)
					
					MWBScanner.PAUSE_DECODING = false; 
					
					//API callback
					if (MWBScanner.result_callback) //return to callback!
						MWBScanner.result_callback(MWResult_obj);
					else
						if (mwb_debug_print) console.log("decoded string (" + callCount + ") " + MWResult_obj.code);
					
				}
			}
			
			
			// Free memory
			Module._free(dataPtr); 
			dataPtr = null;
			Module._free(jsonMWResult);
			
		}, frameInterval); 
	},
	
	start: async function (callback/*, container*/) { //result_clb, video
		
		if (MWBScanner.DECODER_ACTIVE) return null; //can't start two
		MWBScanner.DECODER_ACTIVE = true;
		
		Dynamic_DOM_Elements.cameraPreview_closed = false;
		
		MWBScanner.result_callback = ((typeof callback) == 'function') ? callback : mwbScanner.dflt_clb;
		
		async function after_VideoLoadedData (mediaStream) {
		
		MW_methods.helpers.reset_Decoder(); //this here -
		//call on each start scan //above method calls it as well
		//BUT - scannerConfig() needs to be called AFTER
		//AAND - reset should happen BEFORE init, cause init gets
		
		scannerConfig(); //HERE - previous set(s) will be overridden
		
		//if (!Dynamic_DOM_Elements.already_inited)
		await MW_methods.helpers.init_codeMasks_and_scanRects_and_union(MW_properties);
		
		const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
		await wait(1); //loading video takes some time, try in play (or pool the state each, say, 50ms, for size != 0)
		Dynamic_DOM_Elements.revealElements(); //calling it here after wait(1) works just fine for no 'flashing inter-transformation changes'
		//^THAT HAS TO BE DONE BEFORE resize, so that elements are properly calced together wrt. eachother
		
		MW_methods.helpers.OrientationType_hash_init();
		
		//first time 4 everything | only if != landscape
		//if (MW_methods.helpers.OrientationType_hash[screen.orientation.type] != 0)
		MW_methods.helpers.orientationChangeHandler();
		
		if (MW_methods.helpers._Screen_Orientation === 'undefined')
		{
			//
			window.addEventListener('resize', MW_methods.helpers.orientationChangeHandler, false); //same handler - checks inside, for now
		}
		else
		{
			//window.
			screen.orientation.addEventListener('change', MW_methods.helpers.orientationChangeHandler);
		}
				
		window.addEventListener('resize', MW_methods.eventHandlers.resize, false);
		
		// Observe one or multiple elements
		if (MW_properties.global.previewType == 'container' && MW_properties.global.container != null)
		Dynamic_DOM_Elements.resizeObs.observe(MW_properties.global.container);
		
		//turn it on or off here
		let BR_properties = MW_methods.helpers.burstRefresh.properties;
		let BR_methods = MW_methods.helpers.burstRefresh;
		let useBurstRefresh = MW_properties.global.useBurstRefresh;
		
		//clear vars
		if (MW_properties.global.useBurstRefresh) BR_methods.clearProperties();
		
		//get values (without checking) before the 1st resize method call
		if (MW_properties.global.useBurstRefresh) var current_valuesForResize = BR_methods.getValuesForResize();
		
		await MW_methods.resizePartialScannerView(MW_properties, Dynamic_DOM_Elements); //anchor, calcP, resizeC - which is also to be called on orient/windows size changes
		
		//then set as previous values
		if (MW_properties.global.useBurstRefresh) BR_properties.previous_valuesForResize = JSON.parse(JSON.stringify(current_valuesForResize));
		//turn it on or off here
		
		Dynamic_DOM_Elements.ready_to_use_ResizeObs = true;
		
		//MWBScanner.DECODER_ACTIVE = true;
		
		await MWBScanner.decoder(Dynamic_DOM_Elements.preview);
		
		if (mwb_debug_print) console.log('Scanner start completed.');
		};
		
		//promise here
		//call create
		try {
			
			MW_methods.helpers.safari_audio_click_workaround(sound);
			
			await Dynamic_DOM_Elements.main_createPreview(MW_properties, MW_methods);
			
			await JavaScript_mediaDevices_API.init_values(Dynamic_DOM_Elements.preview, after_VideoLoadedData, function(){});
			
		} catch(error) {
			//handle error
		}
		
		return 0;		
	},
	
	set_DecoderTimeout: function (timeout) {
		
		var timeout1 = ((typeof timeout === 'number') && (timeout == 0 || (timeout >= 10 && timeout <= 60))) ? timeout : 30; //these mix, max, default values should be taken from gui_demo_controls (prev set there)
		
		MWBScanner.decoder_timeout = timeout1;
	},
	
	set_DpsLimit: function (dps_limit) {
		
		var dps_limit1 = ((typeof dps_limit === 'number') && (dps_limit >= 1 && dps_limit <= 30)) ? dps_limit : 30; //these mix, max, default values should be taken from gui_demo_controls (prev set there)
		
		MWBScanner.dps_limit = dps_limit1;
	},
	
	set_Continuous: function (continuous) {
		
		if (!(typeof continuous === 'boolean')) { if (mwb_debug_print) console.log('error: boolean argument required for arg in set_Continuous'); return; }
		
		MWBScanner.CONTINUOUS_DECODING = continuous;
	},
	
	set_Parsing: function (use_parser) {
		
		if (!(typeof use_parser === 'boolean')) { if (mwb_debug_print) console.log('error: boolean argument required for arg in set_Parsing'); return; }
		
		if (use_parser) BarcodeScanner.MWBsetActiveParser(0xFF);
		else BarcodeScanner.MWBsetActiveParser(0x0); 
		
		MWBScanner.USE_PARSER = use_parser;
	},
	
	set_Pause: function (pause) {
		
		if (!(typeof pause === 'boolean')) { if (mwb_debug_print) console.log('error: boolean argument required for arg in set_Pause'); return; }
		
		MWBScanner.PAUSE_DECODING = pause;
	},
	
	set_Preview_anchor: function (orientation) {
		
		var anchor_to = ((typeof orientation === 'number') && (orientation >= 0 && orientation <= 3)) ? orientation : 0;
		
		if (!MWBScanner.DECODER_ACTIVE) //might need a scanner_running/active/started flag instead
		MW_properties.global.partialView.orientation = anchor_to; //0 for none, subsequent values - 1 for respective orientation
	},
	
	resizePreview: function (x, y, w, h) { //(x, y, width, height)
		
		if (MW_properties.global.previewType == 'container') return;
		
		var x1 = ((typeof x === 'number') && (x >= 0 && x <= 100)) ? x : MW_properties.global.partialView.x;
        var y1 = ((typeof y === 'number') && (y >= 0 && y <= 100)) ? y : MW_properties.global.partialView.y;
        var w1 = ((typeof w === 'number') && (w >= 0 && w <= 100)) ? w : MW_properties.global.partialView.width;
        var h1 = ((typeof h === 'number') && (h >= 0 && h <= 100)) ? h : MW_properties.global.partialView.height;
		
		if (mwb_debug_print) console.log("Camera preview X,Y,W,H size is set to " + [x1, y1, w1, h1]);
		
		MW_properties.global.partialView.x = x1;
		MW_properties.global.partialView.y = y1;
		MW_properties.global.partialView.width = w1; //this can also be wrapped for fullscreen, and for transitions/zoom-out effect
		MW_properties.global.partialView.height = h1;
		
		if (MWBScanner.DECODER_ACTIVE) //might need a scanner_running/active/started flag instead
		MW_methods.resizePartialScannerView(MW_properties, Dynamic_DOM_Elements);
	},
	
	destroyPreview: async function (has_res) {
		
		const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
		
		var this_root = JavaScript_mediaDevices_API;
		var track = this_root.videoTrack;
		Dynamic_DOM_Elements.destroyPreview(this_root, track); //not truly awaitable at this point
		
		//complete empty callback
		await wait(128);
		if (typeof has_res == "undefined")
		if (MWBScanner.result_callback) //return to callback!
			MWBScanner.result_callback(
				{
					code: "",
					type: "Cancel",
					isGS1: null,
					bytes: null,
					location: null,
					imageWidth: null,
					imageHeight: null
				}
			);
	}
};