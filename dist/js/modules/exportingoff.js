/*
 Highcharts JS v5.0.2 (2016-10-26)
 Exporting module

 (c) 2010-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(m){"object"===typeof module&&module.exports?module.exports=m:m(Highcharts)})(function(m){(function(f){var m=f.defaultOptions,n=f.doc,u=f.Chart,v=f.addEvent,D=f.removeEvent,E=f.fireEvent,r=f.createElement,B=f.discardElement,w=f.css,q=f.merge,C=f.pick,h=f.each,t=f.extend,G=f.splat,H=f.isTouchDevice,F=f.win,I=f.Renderer.prototype.symbols;t(m.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",
contextButtonTitle:"Chart context menu"});m.navigation={buttonOptions:{theme:{},symbolSize:14,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,verticalAlign:"top",width:24}};q(!0,m.navigation,{menuStyle:{border:"1px solid #999999",background:"#ffffff",padding:"5px 0"},menuItemStyle:{padding:"0.5em 1em",background:"none",color:"#333333",fontSize:H?"14px":"11px",transition:"background 250ms, color 250ms"},menuItemHoverStyle:{background:"#335cad",color:"#ffffff"},buttonOptions:{symbolFill:"#666666",
symbolStroke:"#666666",symbolStrokeWidth:3,theme:{fill:"#ffffff",stroke:"none",padding:5}}});m.exporting={type:"image/png",url:"https://export.highcharts.com/",printMaxWidth:780,scale:2,buttons:{contextButton:{className:"highcharts-contextbutton",menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},
{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}};f.post=function(a,b,e){var c;a=r("form",q({method:"post",action:a,enctype:"multipart/form-data"},e),{display:"none"},n.body);for(c in b)r("input",{type:"hidden",name:c,value:b[c]},null,a);a.submit();B(a)};t(u.prototype,{sanitizeSVG:function(a){a=a.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,
"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g,"url($2)").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'\x3csvg xmlns:xlink\x3d"http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g," xlink:href\x3d").replace(/\n/," ").replace(/<\/svg>.*?$/,"\x3c/svg\x3e").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1\x3d"rgb($2)" $1-opacity\x3d"$3"').replace(/&nbsp;/g,"\u00a0").replace(/&shy;/g,"\u00ad");return a=a.replace(/<IMG /g,
"\x3cimage ").replace(/<(\/?)TITLE>/g,"\x3c$1title\x3e").replace(/height=([^" ]+)/g,'height\x3d"$1"').replace(/width=([^" ]+)/g,'width\x3d"$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href\x3d"$1"/\x3e').replace(/ id=([^" >]+)/g,' id\x3d"$1"').replace(/class=([^" >]+)/g,'class\x3d"$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(a){return a.toLowerCase()})},getChartHTML:function(){return this.container.innerHTML},getSVG:function(a){var b=this,e,
c,g,x,k,d=q(b.options,a),p=d.exporting.allowHTML;n.createElementNS||(n.createElementNS=function(a,b){return n.createElement(b)});c=r("div",null,{position:"absolute",top:"-9999em",width:b.chartWidth+"px",height:b.chartHeight+"px"},n.body);g=b.renderTo.style.width;k=b.renderTo.style.height;g=d.exporting.sourceWidth||d.chart.width||/px$/.test(g)&&parseInt(g,10)||600;k=d.exporting.sourceHeight||d.chart.height||/px$/.test(k)&&parseInt(k,10)||400;t(d.chart,{animation:!1,renderTo:c,forExport:!0,renderer:"SVGRenderer",
width:g,height:k});d.exporting.enabled=!1;delete d.data;d.series=[];h(b.series,function(a){x=q(a.userOptions,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible});x.isInternal||d.series.push(x)});a&&h(["xAxis","yAxis"],function(b){h(G(a[b]),function(a,c){d[b][c]=q(d[b][c],a)})});e=new f.Chart(d,b.callback);h(["xAxis","yAxis"],function(a){h(b[a],function(b,c){c=e[a][c];var d=b.getExtremes();b=d.userMin;d=d.userMax;!c||void 0===b&&void 0===d||c.setExtremes(b,d,!0,!1)})});g=e.getChartHTML();
d=null;e.destroy();B(c);p&&(c=g.match(/<\/svg>(.*?$)/))&&(c='\x3cforeignObject x\x3d"0" y\x3d"0" width\x3d"200" height\x3d"200"\x3e\x3cbody xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+c[1]+"\x3c/body\x3e\x3c/foreignObject\x3e",g=g.replace("\x3c/svg\x3e",c+"\x3c/svg\x3e"));g=this.sanitizeSVG(g);return g=g.replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'")},getSVGForExport:function(a,b){var e=this.options.exporting;return this.getSVG(q({chart:{borderRadius:0}},e.chartOptions,b,
{exporting:{sourceWidth:a&&a.sourceWidth||e.sourceWidth,sourceHeight:a&&a.sourceHeight||e.sourceHeight}}))},exportChart:function(a,b){b=this.getSVGForExport(a,b);a=q(this.options.exporting,a);f.post(a.url,{filename:a.filename||"chart",type:a.type,width:a.width||0,scale:a.scale,svg:b},a.formAttributes)},print:function(){var a=this,b=a.container,e=[],c=b.parentNode,g=n.body,f=g.childNodes,k=a.options.exporting.printMaxWidth,d,p;if(!a.isPrinting){a.isPrinting=!0;a.pointer.reset(null,0);E(a,"beforePrint");
if(p=k&&a.chartWidth>k)d=[a.options.chart.width,void 0,!1],a.setSize(k,void 0,!1);h(f,function(a,b){1===a.nodeType&&(e[b]=a.style.display,a.style.display="none")});g.appendChild(b);F.focus();F.print();setTimeout(function(){c.appendChild(b);h(f,function(a,b){1===a.nodeType&&(a.style.display=e[b])});a.isPrinting=!1;p&&a.setSize.apply(a,d);E(a,"afterPrint")},1E3)}},contextMenu:function(a,b,e,c,g,f,k){var d=this,p=d.options.navigation,m=d.chartWidth,q=d.chartHeight,x="cache-"+a,l=d[x],y=Math.max(g,f),
z,A,u=function(b){d.pointer.inClass(b.target,a)||A()};l||(d[x]=l=r("div",{className:a},{position:"absolute",zIndex:1E3,padding:y+"px"},d.container),z=r("div",{className:"highcharts-menu"},null,l),w(z,t({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},p.menuStyle)),A=function(){w(l,{display:"none"});k&&k.setState(0);d.openMenu=!1},v(l,"mouseleave",function(){l.hideTimer=setTimeout(A,500)}),v(l,"mouseenter",function(){clearTimeout(l.hideTimer)}),v(n,
"mouseup",u),v(d,"destroy",function(){D(n,"mouseup",u)}),h(b,function(a){if(a){var b;a.separator?b=r("hr",null,null,z):(b=r("div",{className:"highcharts-menu-item",onclick:function(b){b&&b.stopPropagation();A();a.onclick&&a.onclick.apply(d,arguments)},innerHTML:a.text||d.options.lang[a.textKey]},null,z),b.onmouseover=function(){w(this,p.menuItemHoverStyle)},b.onmouseout=function(){w(this,p.menuItemStyle)},w(b,t({cursor:"pointer"},p.menuItemStyle)));d.exportDivElements.push(b)}}),d.exportDivElements.push(z,
l),d.exportMenuWidth=l.offsetWidth,d.exportMenuHeight=l.offsetHeight);b={display:"block"};e+d.exportMenuWidth>m?b.right=m-e-g-y+"px":b.left=e-y+"px";c+f+d.exportMenuHeight>q&&"top"!==k.alignOptions.verticalAlign?b.bottom=q-c-y+"px":b.top=c+f-y+"px";w(l,b);d.openMenu=!0},addButton:function(a){var b=this,e=b.renderer,c=q(b.options.navigation.buttonOptions,a),f=c.onclick,m=c.menuItems,k,d,p=c.symbolSize||12;b.btnCount||(b.btnCount=0);b.exportDivElements||(b.exportDivElements=[],b.exportSVGElements=[]);
if(!1!==c.enabled){var h=c.theme,n=h.states,r=n&&n.hover,n=n&&n.select,l;delete h.states;f?l=function(a){a.stopPropagation();f.call(b,a)}:m&&(l=function(){b.contextMenu(d.menuClassName,m,d.translateX,d.translateY,d.width,d.height,d);d.setState(2)});c.text&&c.symbol?h.paddingLeft=C(h.paddingLeft,25):c.text||t(h,{width:c.width,height:c.height,padding:0});d=e.button(c.text,0,0,l,h,r,n).addClass(a.className).attr({"stroke-linecap":"round",title:b.options.lang[c._titleKey],zIndex:3});d.menuClassName=a.menuClassName||
"highcharts-menu-"+b.btnCount++;c.symbol&&(k=e.symbol(c.symbol,c.symbolX-p/2,c.symbolY-p/2,p,p).addClass("highcharts-button-symbol").attr({zIndex:1}).add(d),k.attr({stroke:c.symbolStroke,fill:c.symbolFill,"stroke-width":c.symbolStrokeWidth||1}));d.add().align(t(c,{width:d.width,x:C(c.x,b.buttonOffset)}),!0,"spacingBox");b.buttonOffset+=(d.width+c.buttonSpacing)*("right"===c.align?-1:1);b.exportSVGElements.push(d,k)}},destroyExport:function(a){var b=a?a.target:this;a=b.exportSVGElements;var e=b.exportDivElements;
a&&(h(a,function(a,e){a&&(a.onclick=a.ontouchstart=null,b.exportSVGElements[e]=a.destroy())}),a.length=0);e&&(h(e,function(a,e){clearTimeout(a.hideTimer);D(a,"mouseleave");b.exportDivElements[e]=a.onmouseout=a.onmouseover=a.ontouchstart=a.onclick=null;B(a)}),e.length=0)}});I.menu=function(a,b,e,c){return["M",a,b+2.5,"L",a+e,b+2.5,"M",a,b+c/2+.5,"L",a+e,b+c/2+.5,"M",a,b+c-1.5,"L",a+e,b+c-1.5]};u.prototype.renderExporting=function(){var a,b=this.options.exporting,e=b.buttons,c=this.isDirtyExporting||
!this.exportSVGElements;this.buttonOffset=0;this.isDirtyExporting&&this.destroyExport();if(c&&!1!==b.enabled){for(a in e)this.addButton(e[a]);this.isDirtyExporting=!1}v(this,"destroy",this.destroyExport)};u.prototype.callbacks.push(function(a){a.renderExporting();v(a,"redraw",a.renderExporting);h(["exporting","navigation"],function(b){a[b]={update:function(e,c){a.isDirtyExporting=!0;q(!0,a.options[b],e);C(c,!0)&&a.redraw()}}})})})(m)});
/*
 Highcharts JS v5.0.2 (2016-10-26)
 Client side exporting module

 (c) 2015 Torstein Honsi / Oystein Moseng

 License: www.highcharts.com/license
*/
(function(g){"object"===typeof module&&module.exports?module.exports=g:g(Highcharts)})(function(g){(function(b){function v(d,b){var c=r.getElementsByTagName("head")[0],a=r.createElement("script");a.type="text/javascript";a.src=d;a.onload=b;a.onerror=function(){console.error("Error loading script",d)};c.appendChild(a)}var g=b.merge,e=b.win,t=e.navigator,r=e.document,z=b.each,A=e.URL||e.webkitURL||e,B=/Edge\/|Trident\/|MSIE /.test(t.userAgent),C=B?150:0;b.CanVGRenderer={};b.downloadURL=function(d,b){var c=
r.createElement("a"),a;if(t.msSaveOrOpenBlob)t.msSaveOrOpenBlob(d,b);else if(void 0!==c.download)c.href=d,c.download=b,c.target="_blank",r.body.appendChild(c),c.click(),r.body.removeChild(c);else try{if(a=e.open(d,"chart"),void 0===a||null===a)throw"Failed to open window";}catch(u){e.location.href=d}};b.svgToDataUrl=function(d){var b=-1<t.userAgent.indexOf("WebKit")&&0>t.userAgent.indexOf("Chrome");try{if(!b&&0>t.userAgent.toLowerCase().indexOf("firefox"))return A.createObjectURL(new e.Blob([d],{type:"image/svg+xml;charset-utf-16"}))}catch(c){}return"data:image/svg+xml;charset\x3dUTF-8,"+
encodeURIComponent(d)};b.imageToDataUrl=function(b,f,c,a,u,l,k,m,p){var d=new e.Image,h,q=function(){setTimeout(function(){var e=r.createElement("canvas"),n=e.getContext&&e.getContext("2d"),w;try{if(n){e.height=d.height*a;e.width=d.width*a;n.drawImage(d,0,0,e.width,e.height);try{w=e.toDataURL(f),u(w,f,c,a)}catch(D){h(b,f,c,a)}}else k(b,f,c,a)}finally{p&&p(b,f,c,a)}},C)},n=function(){m(b,f,c,a);p&&p(b,f,c,a)};h=function(){d=new e.Image;h=l;d.crossOrigin="Anonymous";d.onload=q;d.onerror=n;d.src=b};
d.onload=q;d.onerror=n;d.src=b};b.downloadSVGLocal=function(d,f,c,a){function u(b,a){a=new e.jsPDF("l","pt",[b.width.baseVal.value+2*a,b.height.baseVal.value+2*a]);e.svgElementToPdf(b,a,{removeInvalid:!0});return a.output("datauristring")}function l(){q.innerHTML=d;var c=q.getElementsByTagName("text"),e=q.getElementsByTagName("svg")[0].style;z(c,function(a){z(["font-family","font-size"],function(b){!a.style[b]&&e[b]&&(a.style[b]=e[b])});a.style["font-family"]=a.style["font-family"]&&a.style["font-family"].split(" ").splice(-1)});
c=u(q.firstChild,0);b.downloadURL(c,g);a&&a()}var k,m,p=!0,x,h=f.libURL||b.getOptions().exporting.libURL,q=r.createElement("div"),n=f.type||"image/png",g=(f.filename||"chart")+"."+("image/svg+xml"===n?"svg":n.split("/")[1]),y=f.scale||1,h="/"!==h.slice(-1)?h+"/":h;if("image/svg+xml"===n)try{t.msSaveOrOpenBlob?(m=new MSBlobBuilder,m.append(d),k=m.getBlob("image/svg+xml")):k=b.svgToDataUrl(d),b.downloadURL(k,g),a&&a()}catch(w){c()}else"application/pdf"===n?e.jsPDF&&e.svgElementToPdf?l():(p=!0,v(h+"jspdf.js",
function(){v(h+"rgbcolor.js",function(){v(h+"svg2pdf.js",function(){l()})})})):(k=b.svgToDataUrl(d),x=function(){try{A.revokeObjectURL(k)}catch(w){}},b.imageToDataUrl(k,n,{},y,function(d){try{b.downloadURL(d,g),a&&a()}catch(D){c()}},function(){var f=r.createElement("canvas"),u=f.getContext("2d"),l=d.match(/^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/)[1]*y,k=d.match(/^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/)[1]*y,m=function(){u.drawSvg(d,0,0,l,k);try{b.downloadURL(t.msSaveOrOpenBlob?f.msToBlob():f.toDataURL(n),
g),a&&a()}catch(E){c()}finally{x()}};f.width=l;f.height=k;e.canvg?m():(p=!0,v(h+"rgbcolor.js",function(){v(h+"canvg.js",function(){m()})}))},c,c,function(){p&&x()}))};b.Chart.prototype.getSVGForLocalExport=function(d,e,c,a){var f=this,l,k=0,m,p,g,h,q=function(b,d,c){++k;c.imageElement.setAttributeNS("http://www.w3.org/1999/xlink","href",b);k===l.length&&a(f.sanitizeSVG(m.innerHTML))};b.wrap(b.Chart.prototype,"getChartHTML",function(a){m=this.container.cloneNode(!0);return a.apply(this,Array.prototype.slice.call(arguments,
1))});f.getSVGForExport(d,e);l=m.getElementsByTagName("image");try{if(l.length)for(g=0,h=l.length;g<h;++g)p=l[g],b.imageToDataUrl(p.getAttributeNS("http://www.w3.org/1999/xlink","href"),"image/png",{imageElement:p},d.scale,q,c,c,c);else a(f.sanitizeSVG(m.innerHTML))}catch(n){c()}};b.Chart.prototype.exportChartLocal=function(d,e){var c=this,a=b.merge(c.options.exporting,d),f=function(){if(!1===a.fallbackToExportServer)if(a.error)a.error();else throw"Fallback to export server disabled";else c.exportChart(a)};
(B&&"image/svg+xml"!==a.imageType||"application/pdf"!==a.imageType)&&c.container.getElementsByTagName("image").length?f():c.getSVGForLocalExport(a,e,f,function(c){b.downloadSVGLocal(c,a,f)})};g(!0,b.getOptions().exporting,{libURL:"http://code.highcharts.com/5.0.2/lib/",buttons:{contextButton:{menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChartLocal()}},{textKey:"downloadJPEG",onclick:function(){this.exportChartLocal({type:"image/jpeg"})}},
{textKey:"downloadSVG",onclick:function(){this.exportChartLocal({type:"image/svg+xml"})}},{textKey:"downloadPDF",onclick:function(){this.exportChartLocal({type:"application/pdf"})}}]}}})})(g)});