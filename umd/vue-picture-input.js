!function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports.PictureInput=t():e.PictureInput=t()}(window,(function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i(i.s=1)}([function(e,t,i){},function(e,t,i){e.exports=i(3)},function(e,t,i){"use strict";i(0)},function(e,t,i){"use strict";i.r(t);function n(e){return(n="function"===typeof Symbol&&"symbol"===n(Symbol.iterator)?function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){return"undefined"===typeof e?"undefined":n(e)})):function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":"undefined"===typeof e?"undefined":n(e)})))(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){return!t||"object"!==("undefined"===typeof t?"undefined":n(t))&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function o(e,t){return(o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var s={name:"picture-input",props:{width:{type:[String,Number],default:Number.MAX_SAFE_INTEGER},height:{type:[String,Number],default:Number.MAX_SAFE_INTEGER},margin:{type:[String,Number],default:0},accept:{type:String,default:"image/*"},capture:{type:String,default:null},size:{type:[String,Number],default:Number.MAX_SAFE_INTEGER},name:{type:String,default:null},id:{type:[String,Number],default:null},buttonClass:{type:String,default:"btn btn-primary button"},removeButtonClass:{type:String,default:"btn btn-secondary button secondary"},aspectButtonClass:{type:String,default:"btn btn-secondary button secondary"},prefill:{type:"undefined"===typeof File||"undefined"===typeof Blob?[String]:[String,File,Blob],default:""},prefillOptions:{type:Object,default:function(){return{}}},crop:{type:Boolean,default:!0},radius:{type:[String,Number],default:0},removable:{type:Boolean,default:!1},hideChangeButton:{type:Boolean,default:!1},autoToggleAspectRatio:{type:Boolean,default:!1},toggleAspectRatio:{type:Boolean,default:!1},changeOnClick:{type:Boolean,default:!0},plain:{type:Boolean,default:!1},zIndex:{type:Number,default:1e4},alertOnError:{type:Boolean,default:!0},customStrings:{type:Object,default:function(){return{}}}},watch:{prefill:function(){this.prefill?this.preloadImage(this.prefill,this.prefillOptions):this.removeImage()}},data:function(){return{imageSelected:!1,previewHeight:0,previewWidth:0,draggingOver:!1,canvasWidth:0,canvasHeight:0,strings:{upload:"<p>Your device does not support file uploading.</p>",drag:"Drag an image or <br>click here to select a file",tap:"Tap here to select a photo <br>from your gallery",change:"Change Photo",aspect:"Landscape/Portrait",remove:"Remove Photo",select:"Select a Photo",selected:"<p>Photo successfully selected!</p>",fileSize:"The file size exceeds the limit",fileType:"This file type is not supported."}}},mounted:function(){var e=this;if(this.updateStrings(),this.prefill&&this.preloadImage(this.prefill,this.prefillOptions),this.$nextTick((function(){window.addEventListener("resize",e.onResize),e.onResize()})),this.supportsPreview){this.pixelRatio=Math.round(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI);var t=this.$refs.previewCanvas;t.getContext&&(this.context=t.getContext("2d"),this.context.scale(this.pixelRatio,this.pixelRatio))}"image/*"!==this.accept&&(this.fileTypes=this.accept.split(","),this.fileTypes=this.fileTypes.map((function(e){return e.trim()}))),this.canvasWidth=this.width,this.canvasHeight=this.height,this.$on("error",this.onError)},beforeDestroy:function(){window.removeEventListener("resize",this.onResize),this.$off("error",this.onError)},methods:{updateStrings:function(){for(var e in this.customStrings)e in this.strings&&"string"===typeof this.customStrings[e]&&(this.strings[e]=this.customStrings[e])},onClick:function(){this.imageSelected?(this.changeOnClick&&this.selectImage(),this.$emit("click")):this.selectImage()},onResize:function(){this.resizeCanvas(),this.imageObject&&this.drawImage(this.imageObject)},onDragEnter:function(){this.supportsDragAndDrop&&(this.draggingOver=!0)},onDragLeave:function(){this.supportsDragAndDrop&&(this.draggingOver=!1)},onFileDrop:function(e){this.onDragLeave(),this.onFileChange(e)},onFileChange:function(e,t){var i=e.target.files||e.dataTransfer.files;if(i.length)if(i[0].size<=0||i[0].size>1024*this.size*1024)this.$emit("error",{type:"fileSize",fileSize:i[0].size,fileType:i[0].type,fileName:i[0].name,message:this.strings.fileSize+" ("+this.size+"MB)"});else if(i[0].name!==this.fileName||i[0].size!==this.fileSize||this.fileModified!==i[0].lastModified){if(this.file=i[0],this.fileName=i[0].name,this.fileSize=i[0].size,this.fileModified=i[0].lastModified,this.fileType=i[0].type,"image/*"===this.accept){if("image/"!==i[0].type.substr(0,6))return}else if(-1===this.fileTypes.indexOf(i[0].type))return void this.$emit("error",{type:"fileType",fileSize:i[0].size,fileType:i[0].type,fileName:i[0].name,message:this.strings.fileType});this.imageSelected=!0,this.image="",this.supportsPreview?this.loadImage(i[0],t||!1):t?this.$emit("prefill"):this.$emit("change",this.image)}},onError:function(e){this.alertOnError&&alert(e.message)},loadImage:function(e,t){var i=this;this.getEXIFOrientation(e,(function(n){i.setOrientation(n);var r=new FileReader;r.onload=function(e){i.image=e.target.result,t?i.$emit("prefill"):i.$emit("change",i.image),i.imageObject=new Image,i.imageObject.onload=function(){i.autoToggleAspectRatio&&(i.getOrientation(i.canvasWidth,i.canvasHeight)!==i.getOrientation(i.imageObject.width,i.imageObject.height)&&i.rotateCanvas());i.drawImage(i.imageObject)},i.imageObject.src=i.image},r.readAsDataURL(e)}))},drawImage:function(e){this.imageWidth=e.width,this.imageHeight=e.height,this.imageRatio=e.width/e.height;var t=0,i=0,n=this.previewWidth,r=this.previewHeight,a=this.previewWidth/this.previewHeight;this.crop?this.imageRatio>=a?(n=r*this.imageRatio,t=(this.previewWidth-n)/2):(r=n/this.imageRatio,i=(this.previewHeight-r)/2):this.imageRatio>=a?(r=n/this.imageRatio,i=(this.previewHeight-r)/2):(n=r*this.imageRatio,t=(this.previewWidth-n)/2);var o=this.$refs.previewCanvas;o.style.background="none",o.width=this.previewWidth*this.pixelRatio,o.height=this.previewHeight*this.pixelRatio,this.context.setTransform(1,0,0,1,0,0),this.context.clearRect(0,0,o.width,o.height),this.rotate&&(this.context.translate(t*this.pixelRatio,i*this.pixelRatio),this.context.translate(n/2*this.pixelRatio,r/2*this.pixelRatio),this.context.rotate(this.rotate),t=-n/2,i=-r/2),this.context.drawImage(e,t*this.pixelRatio,i*this.pixelRatio,n*this.pixelRatio,r*this.pixelRatio)},selectImage:function(){this.$refs.fileInput.click()},removeImage:function(){this.$refs.fileInput.value="",this.$refs.fileInput.type="",this.$refs.fileInput.type="file",this.fileName="",this.fileType="",this.fileSize=0,this.fileModified=0,this.imageSelected=!1,this.image="",this.file=null,this.imageObject=null,this.$refs.previewCanvas.style.backgroundColor="rgba(200,200,200,.25)",this.$refs.previewCanvas.width=this.previewWidth*this.pixelRatio,this.$emit("remove")},rotateImage:function(){this.rotateCanvas(),this.imageObject&&this.drawImage(this.imageObject);var e=this.getOrientation(this.canvasWidth,this.canvasHeight);this.$emit("aspectratiochange",e)},resizeCanvas:function(){var e=this.canvasWidth/this.canvasHeight,t=this.$refs.container.clientWidth;(this.toggleAspectRatio||t!==this.containerWidth)&&(this.containerWidth=t,this.previewWidth=Math.min(this.containerWidth-2*this.margin,this.canvasWidth),this.previewHeight=this.previewWidth/e)},getOrientation:function(e,t){var i="square";return e>t?i="landscape":e<t&&(i="portrait"),i},switchCanvasOrientation:function(){var e=this.canvasWidth,t=this.canvasHeight;this.canvasWidth=t,this.canvasHeight=e},rotateCanvas:function(){this.switchCanvasOrientation(),this.resizeCanvas()},setOrientation:function(e){this.rotate=!1,8===e?this.rotate=-Math.PI/2:6===e?this.rotate=Math.PI/2:3===e&&(this.rotate=-Math.PI)},getEXIFOrientation:function(e,t){var i=new FileReader;i.onload=function(e){var i=new DataView(e.target.result);if(65496!==i.getUint16(0,!1))return t(-2);for(var n=i.byteLength,r=2;r<n;){var a=i.getUint16(r,!1);if(r+=2,65505===a){if(1165519206!==i.getUint32(r+=2,!1))return t(-1);var o=18761===i.getUint16(r+=6,!1);r+=i.getUint32(r+4,o);var s=i.getUint16(r,o);r+=2;for(var l=0;l<s;l++)if(274===i.getUint16(r+12*l,o))return t(i.getUint16(r+12*l+8,o))}else{if(65280!==(65280&a))break;r+=i.getUint16(r,!1)}}return t(-1)},i.readAsArrayBuffer(e.slice(0,65536))},preloadImage:function(e,t){var i=this,s=window.File;try{new s([],"")}catch(u){s=function(e){function t(e,i){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};r(this,t);var o=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return o.lastModifiedDate=new Date,o.lastModified=+o.lastModifiedDate,o.name=i,o}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)}(t,Blob),t}()}if(t=Object.assign({},t),"object"===("undefined"===typeof e?"undefined":n(e)))return this.imageSelected=!0,this.image="",void(this.supportsPreview?this.loadImage(e,!0):this.$emit("prefill"));var l=new Headers;l.append("Accept","image/*"),fetch(e,{method:"GET",mode:"cors",headers:l}).then((function(e){return{imageBlob:e.blob(),mimeType:e.headers.get("Content-Type")}})).then((function(n){var r=n.imageBlob,a=n.mimeType,o={target:{files:[]}},l=t.fileName||e.split("/").slice(-1)[0],u=a||t.mediaType||"image/"+t.fileType||l.split(".").slice(-1)[0].split("?")[0];"image/svg"===(u=u.replace("jpg","jpeg"))&&(u="image/svg+xml"),o.target.files[0]=new s([r],l,{type:u}),i.onFileChange(o,!0)})).catch((function(e){i.$emit("error",{type:"failedPrefill",message:"Failed loading prefill image: "+e})}))}},computed:{supportsUpload:function(){if(navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/))return!1;var e=document.createElement("input");return e.type="file",!e.disabled},supportsPreview:function(){return window.FileReader&&!!window.CanvasRenderingContext2D},supportsDragAndDrop:function(){var e=document.createElement("div");return("draggable"in e||"ondragstart"in e&&"ondrop"in e)&&!("ontouchstart"in window||navigator.msMaxTouchPoints)},computedClasses:function(){var e={};return e["dragging-over"]=this.draggingOver,e},fontSize:function(){return Math.min(.04*this.previewWidth,21)+"px"}}};i(2);var l=function(e,t,i,n,r,a,o,s){var l,u="function"===typeof e?e.options:e;if(t&&(u.render=t,u.staticRenderFns=i,u._compiled=!0),n&&(u.functional=!0),a&&(u._scopeId="data-v-"+a),o?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"===typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},u._ssrRegister=l):r&&(l=s?function(){r.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:r),l)if(u.functional){u._injectStyles=l;var c=u.render;u.render=function(e,t){return l.call(t),c(e,t)}}else{var p=u.beforeCreate;u.beforeCreate=p?[].concat(p,l):[l]}return{exports:e,options:u}}(s,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{ref:"container",staticClass:"picture-input",attrs:{id:"picture-input"}},[e.supportsUpload?e.supportsPreview?i("div",[i("div",{staticClass:"preview-container",style:{maxWidth:e.previewWidth+"px",height:e.previewHeight+"px",borderRadius:e.radius+"%"}},[i("canvas",{ref:"previewCanvas",staticClass:"picture-preview",class:e.computedClasses,style:{height:e.previewHeight+"px",zIndex:e.zIndex+1},attrs:{tabindex:"0"},on:{drag:function(e){e.stopPropagation(),e.preventDefault()},dragover:function(e){e.stopPropagation(),e.preventDefault()},dragstart:function(e){e.stopPropagation(),e.preventDefault()},dragend:function(e){e.stopPropagation(),e.preventDefault()},dragenter:function(t){return t.stopPropagation(),t.preventDefault(),e.onDragEnter(t)},dragleave:function(t){return t.stopPropagation(),t.preventDefault(),e.onDragLeave(t)},drop:function(t){return t.stopPropagation(),t.preventDefault(),e.onFileDrop(t)},click:function(t){return t.preventDefault(),e.onClick(t)},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onClick(t)}}}),e._v(" "),e.imageSelected||e.plain?e._e():i("div",{staticClass:"picture-inner",style:{top:-e.previewHeight+"px",marginBottom:-e.previewHeight+"px",fontSize:e.fontSize,borderRadius:e.radius+"%",zIndex:e.zIndex+2}},[e.supportsDragAndDrop?i("span",{staticClass:"picture-inner-text",domProps:{innerHTML:e._s(e.strings.drag)}}):i("span",{staticClass:"picture-inner-text",domProps:{innerHTML:e._s(e.strings.tap)}})])]),e._v(" "),e.imageSelected&&!e.hideChangeButton?i("button",{class:e.buttonClass,attrs:{type:"button"},domProps:{innerHTML:e._s(e.strings.change)},on:{click:function(t){return t.preventDefault(),e.selectImage(t)}}}):e._e(),e._v(" "),e.imageSelected&&e.removable?i("button",{class:e.removeButtonClass,attrs:{type:"button"},domProps:{innerHTML:e._s(e.strings.remove)},on:{click:function(t){return t.preventDefault(),e.removeImage(t)}}}):e._e(),e._v(" "),e.imageSelected&&e.toggleAspectRatio&&e.width!==e.height?i("button",{class:e.aspectButtonClass,attrs:{type:"button"},domProps:{innerHTML:e._s(e.strings.aspect)},on:{click:function(t){return t.preventDefault(),e.rotateImage(t)}}}):e._e()]):i("div",[e.imageSelected?i("div",[i("div",{domProps:{innerHTML:e._s(e.strings.selected)}}),e._v(" "),e.hideChangeButton?e._e():i("button",{class:e.buttonClass,attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.selectImage(t)}}},[e._v(e._s(e.strings.change))]),e._v(" "),e.removable?i("button",{class:e.removeButtonClass,attrs:{type:"button"},domProps:{innerHTML:e._s(e.strings.remove)},on:{click:function(t){return t.preventDefault(),e.removeImage(t)}}}):e._e()]):i("button",{class:e.buttonClass,attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.selectImage(t)}}},[e._v(e._s(e.strings.select))])]):i("div",{domProps:{innerHTML:e._s(e.strings.upload)}}),e._v(" "),i("input",{ref:"fileInput",attrs:{type:"file",name:e.name,id:e.id,accept:e.accept,capture:e.capture},on:{change:e.onFileChange}})])}),[],!1,null,"c7a44b66",null);t.default=l.exports}])}));