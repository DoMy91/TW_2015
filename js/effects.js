// textarea autosize v0.4.0
// Javier Julio: https://github.com/javierjulio/textarea-autosize
!function(t,e){function i(e){this.element=e,this.$element=t(e),this.init()}var n="textareaAutoSize",h="plugin_"+n,s=function(t){return t.replace(/\s/g,"").length>0};i.prototype={init:function(){var i=(this.$element.outerHeight(),parseInt(this.$element.css("paddingBottom"))+parseInt(this.$element.css("paddingTop")));s(this.element.value)&&this.$element.height(this.element.scrollHeight-i),this.$element.on("input keyup",function(){var n=t(e),h=n.scrollTop();t(this).height(0).height(this.scrollHeight-i),n.scrollTop(h)})}},t.fn[n]=function(e){return this.each(function(){t.data(this,h)||t.data(this,h,new i(this,e))}),this}}(jQuery,window,document);

// window smart resize
function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100)};return c};
// btn active
$('.btn').on('mousedown touchstart', function() {
    var $this = $(this);
    if (!$this.hasClass('btn-active')) {
        $this.addClass('btn-active');
        setTimeout(function() {
            $this.removeClass('btn-active');
        }, 450);
    }
})
// fixed left/right hand side column affix
var contentFixPush,
    contentFixPushIni;

if ($('.content').length) {
    contentFixPushIni = parseInt($('.content').css('padding-bottom').replace('px', ''));
};

$(window).on('scroll', function() {
    $('.content-fixable').each(function(index) {
        contentFix($(this));
    });
});

function contentFix(content) {
    if (window.pageYOffset >= (content.offset().top - headerHeight)) {
        if (!content.hasClass('fixed')) {
            if ((content.is('[class*="col-xx"]')) || (content.is('[class*="col-xs"]') && $(window).width() >= 480) || (content.is('[class*="col-sm"]') && $(window).width() >= 768) || (content.is('[class*="col-md"]') && $(window).width() >= 992) || (content.is('[class*="col-lg"]') && $(window).width() >= 1440)) {
                content.addClass('fixed');
                $('.content-fix-inner', content).css('padding-bottom', contentFixPush).scrollTop(0);
                $('.content-fix-wrap', content).scrollTop(0);
            };
        };
    } else {
        content.removeClass('fixed');
        $('.content-fix-inner', content).css('padding-bottom', '');
    }
}

// fixed left/right hand side column padding bottom and width
function contentFixPushCal() {
    $('.content-fix').each(function(index) {
        $(this).removeClass('content-fixable');
        if ($(this).outerHeight() < $(this).closest('.row-fix').outerHeight()) {
            $(this).addClass('content-fixable');
        }
    });

    $('.content-fix-scroll').each(function(index) {
        $(this).css('width', $(this).closest('.content-fix').outerWidth());
        $('.content-fix-inner', $(this)).css('width', $(this).closest('.content-fix').width());
    });

    if ($('.footer').length) {
        contentFixPush = contentFixPushIni + $('.footer').outerHeight();
    } else {
        contentFixPush = contentFixPushIni;
    }
}
// pickadate v3.5.5
// Amsul: http://amsul.ca
!function(a){"function"==typeof define&&define.amd?define("picker",["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):this.Picker=a(jQuery)}(function(a){function f(b,d,e,i){function r(){return f._.node("div",f._.node("div",f._.node("div",f._.node("div",q.component.nodes(l.open),n.box),n.wrap),n.frame),n.holder,'tabindex="-1"')}function s(){o.data(d,q).addClass(n.input).val(o.data("value")?q.get("select",m.format):b.value),m.editable||o.on("focus."+l.id+" click."+l.id,function(a){a.preventDefault(),q.open()}).on("keydown."+l.id,x),h(b,{haspopup:!0,expanded:!1,readonly:!1,owns:b.id+"_root"})}function t(){h(q.$root[0],"hidden",!0)}function u(){q.$holder.on({keydown:x,"focus.toOpen":w,blur:function(){o.removeClass(n.target)},focusin:function(a){q.$root.removeClass(n.focused),a.stopPropagation()},"mousedown click":function(b){var c=b.target;c!=q.$holder[0]&&(b.stopPropagation(),"mousedown"!=b.type||a(c).is("input, select, textarea, button, option")||(b.preventDefault(),q.$holder[0].focus()))}}).on("click","[data-pick], [data-nav], [data-clear], [data-close]",function(){var b=a(this),c=b.data(),d=b.hasClass(n.navDisabled)||b.hasClass(n.disabled),e=k();e=e&&(e.type||e.href),(d||e&&!a.contains(q.$root[0],e))&&q.$holder[0].focus(),!d&&c.nav?q.set("highlight",q.component.item.highlight,{nav:c.nav}):!d&&"pick"in c?(q.set("select",c.pick),m.closeOnSelect&&q.close(!0)):c.clear?(q.clear(),m.closeOnClear&&q.close(!0)):c.close&&q.close(!0)})}function v(){var c;m.hiddenName===!0?(c=b.name,b.name=""):(c=["string"==typeof m.hiddenPrefix?m.hiddenPrefix:"","string"==typeof m.hiddenSuffix?m.hiddenSuffix:"_submit"],c=c[0]+b.name+c[1]),q._hidden=a('<input type=hidden name="'+c+'"'+(o.data("value")||b.value?' value="'+q.get("select",m.formatSubmit)+'"':"")+">")[0],o.on("change."+l.id,function(){q._hidden.value=b.value?q.get("select",m.formatSubmit):""})}function w(a){a.stopPropagation(),o.addClass(n.target),q.$root.addClass(n.focused),q.open()}function x(a){var b=a.keyCode,c=/^(8|46)$/.test(b);return 27==b?(q.close(!0),!1):((32==b||c||!l.open&&q.component.key[b])&&(a.preventDefault(),a.stopPropagation(),c?q.clear().close():q.open()),void 0)}if(!b)return f;var j=!1,l={id:b.id||"P"+Math.abs(~~(Math.random()*new Date))},m=e?a.extend(!0,{},e.defaults,i):i||{},n=a.extend({},f.klasses(),m.klass),o=a(b),p=function(){return this.start()},q=p.prototype={constructor:p,$node:o,start:function(){return l&&l.start?q:(l.methods={},l.start=!0,l.open=!1,l.type=b.type,b.autofocus=b==k(),b.readOnly=!m.editable,b.id=b.id||l.id,"text"!=b.type&&(b.type="text"),q.component=new e(q,m),q.$root=a('<div class="'+n.picker+'" id="'+b.id+'_root" />'),t(),q.$holder=a(r()).appendTo(q.$root),u(),m.formatSubmit&&v(),s(),m.containerHidden?a(m.containerHidden).append(q._hidden):o.after(q._hidden),m.container?a(m.container).append(q.$root):o.after(q.$root),q.on({start:q.component.onStart,render:q.component.onRender,stop:q.component.onStop,open:q.component.onOpen,close:q.component.onClose,set:q.component.onSet}).on({start:m.onStart,render:m.onRender,stop:m.onStop,open:m.onOpen,close:m.onClose,set:m.onSet}),j=g(q.$holder[0]),b.autofocus&&q.open(),q.trigger("start").trigger("render"))},render:function(a){return a?(q.$holder=r(),q.$root.html(q.$holder)):q.$root.find("."+n.box).html(q.component.nodes(l.open)),q.trigger("render")},stop:function(){return l.start?(q.close(),q._hidden&&q._hidden.parentNode.removeChild(q._hidden),q.$root.remove(),o.removeClass(n.input).removeData(d),setTimeout(function(){o.off("."+l.id)},0),b.type=l.type,b.readOnly=!1,q.trigger("stop"),l.methods={},l.start=!1,q):q},open:function(d){return l.open?q:(o.addClass(n.active),h(b,"expanded",!0),setTimeout(function(){q.$root.addClass(n.opened),h(q.$root[0],"hidden",!1)},0),d!==!1&&(l.open=!0,q.$holder[0].focus(),c.on("click."+l.id+" focusin."+l.id,function(a){var c=a.target;c!=b&&c!=document&&3!=a.which&&q.close(c===q.$holder[0])}).on("keydown."+l.id,function(b){var c=b.keyCode,d=q.component.key[c],e=b.target;27==c?q.close(!0):e!=q.$holder[0]||!d&&13!=c?a.contains(q.$root[0],e)&&13==c&&(b.preventDefault(),e.click()):(b.preventDefault(),d?f._.trigger(q.component.key.go,q,[f._.trigger(d)]):q.$root.find("."+n.highlighted).hasClass(n.disabled)||(q.set("select",q.component.item.highlight),m.closeOnSelect&&q.close(!0)))})),q.trigger("open"))},close:function(a){return a&&(m.editable?b.focus():(q.$holder.off("focus.toOpen").focus(),setTimeout(function(){q.$holder.on("focus.toOpen",w)},0))),o.removeClass(n.active),h(b,"expanded",!1),setTimeout(function(){q.$root.removeClass(n.opened+" "+n.focused),h(q.$root[0],"hidden",!0)},0),l.open?(l.open=!1,c.off("."+l.id),q.trigger("close")):q},clear:function(a){return q.set("clear",null,a)},set:function(b,c,d){var e,f,g=a.isPlainObject(b),h=g?b:{};if(d=g&&a.isPlainObject(c)?c:d||{},b){g||(h[b]=c);for(e in h)f=h[e],e in q.component.item&&(void 0===f&&(f=null),q.component.set(e,f,d)),("select"==e||"clear"==e)&&o.val("clear"==e?"":q.get(e,m.format)).trigger("change");q.render()}return d.muted?q:q.trigger("set",h)},get:function(a,c){if(a=a||"value",null!=l[a])return l[a];if("valueSubmit"==a){if(q._hidden)return q._hidden.value;a="value"}if("value"==a)return b.value;if(a in q.component.item){if("string"==typeof c){var d=q.component.get(a);return d?f._.trigger(q.component.formats.toString,q.component,[c,d]):""}return q.component.get(a)}},on:function(b,c,d){var e,f,g=a.isPlainObject(b),h=g?b:{};if(b){g||(h[b]=c);for(e in h)f=h[e],d&&(e="_"+e),l.methods[e]=l.methods[e]||[],l.methods[e].push(f)}return q},off:function(){var a,b,c=arguments;for(a=0,namesCount=c.length;namesCount>a;a+=1)b=c[a],b in l.methods&&delete l.methods[b];return q},trigger:function(a,b){var c=function(a){var c=l.methods[a];c&&c.map(function(a){f._.trigger(a,q,[b])})};return c("_"+a),c(a),q}};return new p}function g(a){var b,c="position";return a.currentStyle?b=a.currentStyle[c]:window.getComputedStyle&&(b=getComputedStyle(a)[c]),"fixed"==b}function h(b,c,d){if(a.isPlainObject(c))for(var e in c)i(b,e,c[e]);else i(b,c,d)}function i(a,b,c){a.setAttribute(("role"==b?"":"aria-")+b,c)}function j(b,c){a.isPlainObject(b)||(b={attribute:c}),c="";for(var d in b){var e=("role"==d?"":"aria-")+d,f=b[d];c+=null==f?"":e+'="'+b[d]+'"'}return c}function k(){try{return document.activeElement}catch(a){}}a(window);var c=a(document);return a(document.documentElement),null!=document.body.style.transition,f.klasses=function(a){return a=a||"picker",{picker:a,opened:a+"--opened",focused:a+"--focused",input:a+"__input",active:a+"__input--active",target:a+"__input--target",holder:a+"__holder",frame:a+"__frame",wrap:a+"__wrap",box:a+"__box"}},f._={group:function(a){for(var b,c="",d=f._.trigger(a.min,a);d<=f._.trigger(a.max,a,[d]);d+=a.i)b=f._.trigger(a.item,a,[d]),c+=f._.node(a.node,b[0],b[1],b[2]);return c},node:function(b,c,d,e){return c?(c=a.isArray(c)?c.join(""):c,d=d?' class="'+d+'"':"",e=e?" "+e:"","<"+b+d+e+">"+c+"</"+b+">"):""},lead:function(a){return(10>a?"0":"")+a},trigger:function(a,b,c){return"function"==typeof a?a.apply(b,c||[]):a},digits:function(a){return/\d/.test(a[1])?2:1},isDate:function(a){return{}.toString.call(a).indexOf("Date")>-1&&this.isInteger(a.getDate())},isInteger:function(a){return{}.toString.call(a).indexOf("Number")>-1&&0===a%1},ariaAttr:j},f.extend=function(b,c){a.fn[b]=function(d,e){var g=this.data(b);return"picker"==d?g:g&&"string"==typeof d?f._.trigger(g[d],g,[e]):this.each(function(){var e=a(this);e.data(b)||new f(this,b,c,d)})},a.fn[b].defaults=c.defaults},f});

// date picker for pickadate.js v3.5.5
// Amsul: http://amsul.ca
!function(a){"function"==typeof define&&define.amd?define(["picker","jquery"],a):"object"==typeof exports?module.exports=a(require("./picker.js"),require("jquery")):a(Picker,jQuery)}(function(a,b){function f(a,b){var c=this,d=a.$node[0],e=d.value,f=a.$node.data("value"),g=f?b.formatSubmit:b.format,h=f||e,i=function(){return d.currentStyle?"rtl"==d.currentStyle.direction:"rtl"==getComputedStyle(a.$root[0]).direction};c.settings=b,c.$node=a.$node,c.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse navigate create validate",view:"parse create validate viewset",disable:"deactivate",enable:"activate"},c.item={},c.item.clear=null,c.item.disable=(b.disable||[]).slice(0),c.item.enable=-function(a){return a[0]===!0?a.shift():-1}(c.item.disable),c.set("min",b.min).set("max",b.max).set("now"),h?c.set("select",h,{format:g,defaultValue:!0}):c.set("select",null).set("highlight",c.item.now),c.key={40:7,38:-7,39:function(){return i()?-1:1},37:function(){return i()?1:-1},go:function(a){var b=c.item.highlight,d=new Date(b.year,b.month,b.date+a);c.set("highlight",d,{interval:a}),this.render()}},a.on("render",function(){a.$root.find("."+b.klass.selectMonth).on("change",function(){var c=this.value;c&&(a.set("highlight",[a.get("view").year,c,a.get("highlight").date]),a.$root.find("."+b.klass.selectMonth).trigger("focus"))}),a.$root.find("."+b.klass.selectYear).on("change",function(){var c=this.value;c&&(a.set("highlight",[c,a.get("view").month,a.get("highlight").date]),a.$root.find("."+b.klass.selectYear).trigger("focus"))})},1).on("open",function(){var d="";c.disabled(c.get("now"))&&(d=":not(."+b.klass.buttonToday+")"),a.$root.find("button"+d+", select").attr("disabled",!1)},1).on("close",function(){a.$root.find("button, select").attr("disabled",!0)},1)}var c=7,d=6,e=a._;f.prototype.set=function(a,b,c){var d=this,e=d.item;return null===b?("clear"==a&&(a="select"),e[a]=b,d):(e["enable"==a?"disable":"flip"==a?"enable":a]=d.queue[a].split(" ").map(function(e){return b=d[e](a,b,c)}).pop(),"select"==a?d.set("highlight",e.select,c):"highlight"==a?d.set("view",e.highlight,c):a.match(/^(flip|min|max|disable|enable)$/)&&(e.select&&d.disabled(e.select)&&d.set("select",e.select,c),e.highlight&&d.disabled(e.highlight)&&d.set("highlight",e.highlight,c)),d)},f.prototype.get=function(a){return this.item[a]},f.prototype.create=function(a,c,d){var f,g=this;return c=void 0===c?a:c,c==-1/0||1/0==c?f=c:b.isPlainObject(c)&&e.isInteger(c.pick)?c=c.obj:b.isArray(c)?(c=new Date(c[0],c[1],c[2]),c=e.isDate(c)?c:g.create().obj):c=e.isInteger(c)||e.isDate(c)?g.normalize(new Date(c),d):g.now(a,c,d),{year:f||c.getFullYear(),month:f||c.getMonth(),date:f||c.getDate(),day:f||c.getDay(),obj:f||c,pick:f||c.getTime()}},f.prototype.createRange=function(a,c){var d=this,f=function(a){return a===!0||b.isArray(a)||e.isDate(a)?d.create(a):a};return e.isInteger(a)||(a=f(a)),e.isInteger(c)||(c=f(c)),e.isInteger(a)&&b.isPlainObject(c)?a=[c.year,c.month,c.date+a]:e.isInteger(c)&&b.isPlainObject(a)&&(c=[a.year,a.month,a.date+c]),{from:f(a),to:f(c)}},f.prototype.withinRange=function(a,b){return a=this.createRange(a.from,a.to),b.pick>=a.from.pick&&b.pick<=a.to.pick},f.prototype.overlapRanges=function(a,b){var c=this;return a=c.createRange(a.from,a.to),b=c.createRange(b.from,b.to),c.withinRange(a,b.from)||c.withinRange(a,b.to)||c.withinRange(b,a.from)||c.withinRange(b,a.to)},f.prototype.now=function(a,b,c){return b=new Date,c&&c.rel&&b.setDate(b.getDate()+c.rel),this.normalize(b,c)},f.prototype.navigate=function(a,c,d){var e,f,g,h,i=b.isArray(c),j=b.isPlainObject(c),k=this.item.view;if(i||j){for(j?(f=c.year,g=c.month,h=c.date):(f=+c[0],g=+c[1],h=+c[2]),d&&d.nav&&k&&k.month!==g&&(f=k.year,g=k.month),e=new Date(f,g+(d&&d.nav?d.nav:0),1),f=e.getFullYear(),g=e.getMonth();new Date(f,g,h).getMonth()!==g;)h-=1;c=[f,g,h]}return c},f.prototype.normalize=function(a){return a.setHours(0,0,0,0),a},f.prototype.measure=function(a,b){var c=this;return b?"string"==typeof b?b=c.parse(a,b):e.isInteger(b)&&(b=c.now(a,b,{rel:b})):b="min"==a?-1/0:1/0,b},f.prototype.viewset=function(a,b){return this.create([b.year,b.month,1])},f.prototype.validate=function(a,c,d){var j,k,n,o,f=this,g=c,h=d&&d.interval?d.interval:1,i=-1===f.item.enable,l=f.item.min,m=f.item.max,p=i&&f.item.disable.filter(function(a){if(b.isArray(a)){var d=f.create(a).pick;d<c.pick?j=!0:d>c.pick&&(k=!0)}return e.isInteger(a)}).length;if((!d||!d.nav&&!d.defaultValue)&&(!i&&f.disabled(c)||i&&f.disabled(c)&&(p||j||k)||!i&&(c.pick<=l.pick||c.pick>=m.pick)))for(i&&!p&&(!k&&h>0||!j&&0>h)&&(h*=-1);f.disabled(c)&&(Math.abs(h)>1&&(c.month<g.month||c.month>g.month)&&(c=g,h=h>0?1:-1),c.pick<=l.pick?(n=!0,h=1,c=f.create([l.year,l.month,l.date+(c.pick===l.pick?0:-1)])):c.pick>=m.pick&&(o=!0,h=-1,c=f.create([m.year,m.month,m.date+(c.pick===m.pick?0:1)])),!n||!o);)c=f.create([c.year,c.month,c.date+h]);return c},f.prototype.disabled=function(a){var c=this,d=c.item.disable.filter(function(d){return e.isInteger(d)?a.day===(c.settings.firstDay?d:d-1)%7:b.isArray(d)||e.isDate(d)?a.pick===c.create(d).pick:b.isPlainObject(d)?c.withinRange(d,a):void 0});return d=d.length&&!d.filter(function(a){return b.isArray(a)&&"inverted"==a[3]||b.isPlainObject(a)&&a.inverted}).length,-1===c.item.enable?!d:d||a.pick<c.item.min.pick||a.pick>c.item.max.pick},f.prototype.parse=function(a,b,c){var d=this,f={};return b&&"string"==typeof b?(c&&c.format||(c=c||{},c.format=d.settings.format),d.formats.toArray(c.format).map(function(a){var c=d.formats[a],g=c?e.trigger(c,d,[b,f]):a.replace(/^!/,"").length;c&&(f[a]=b.substr(0,g)),b=b.substr(g)}),[f.yyyy||f.yy,+(f.mm||f.m)-1,f.dd||f.d]):b},f.prototype.formats=function(){function a(a,b,c){var d=a.match(/[^\x00-\x7F]+|\w+/)[0];return c.mm||c.m||(c.m=b.indexOf(d)+1),d.length}function b(a){return a.match(/\w+/)[0].length}return{d:function(a,b){return a?e.digits(a):b.date},dd:function(a,b){return a?2:e.lead(b.date)},ddd:function(a,c){return a?b(a):this.settings.weekdaysShort[c.day]},dddd:function(a,c){return a?b(a):this.settings.weekdaysFull[c.day]},m:function(a,b){return a?e.digits(a):b.month+1},mm:function(a,b){return a?2:e.lead(b.month+1)},mmm:function(b,c){var d=this.settings.monthsShort;return b?a(b,d,c):d[c.month]},mmmm:function(b,c){var d=this.settings.monthsFull;return b?a(b,d,c):d[c.month]},yy:function(a,b){return a?2:(""+b.year).slice(2)},yyyy:function(a,b){return a?4:b.year},toArray:function(a){return a.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(a,b){var c=this;return c.formats.toArray(a).map(function(a){return e.trigger(c.formats[a],c,[0,b])||a.replace(/^!/,"")}).join("")}}}(),f.prototype.isDateExact=function(a,c){var d=this;return e.isInteger(a)&&e.isInteger(c)||"boolean"==typeof a&&"boolean"==typeof c?a===c:(e.isDate(a)||b.isArray(a))&&(e.isDate(c)||b.isArray(c))?d.create(a).pick===d.create(c).pick:b.isPlainObject(a)&&b.isPlainObject(c)?d.isDateExact(a.from,c.from)&&d.isDateExact(a.to,c.to):!1},f.prototype.isDateOverlap=function(a,c){var d=this,f=d.settings.firstDay?1:0;return e.isInteger(a)&&(e.isDate(c)||b.isArray(c))?(a=a%7+f,a===d.create(c).day+1):e.isInteger(c)&&(e.isDate(a)||b.isArray(a))?(c=c%7+f,c===d.create(a).day+1):b.isPlainObject(a)&&b.isPlainObject(c)?d.overlapRanges(a,c):!1},f.prototype.flipEnable=function(a){var b=this.item;b.enable=a||(-1==b.enable?1:-1)},f.prototype.deactivate=function(a,c){var d=this,f=d.item.disable.slice(0);return"flip"==c?d.flipEnable():c===!1?(d.flipEnable(1),f=[]):c===!0?(d.flipEnable(-1),f=[]):c.map(function(a){for(var c,g=0;g<f.length;g+=1)if(d.isDateExact(a,f[g])){c=!0;break}c||(e.isInteger(a)||e.isDate(a)||b.isArray(a)||b.isPlainObject(a)&&a.from&&a.to)&&f.push(a)}),f},f.prototype.activate=function(a,c){var d=this,f=d.item.disable,g=f.length;return"flip"==c?d.flipEnable():c===!0?(d.flipEnable(1),f=[]):c===!1?(d.flipEnable(-1),f=[]):c.map(function(a){var c,h,i,j;for(i=0;g>i;i+=1){if(h=f[i],d.isDateExact(h,a)){c=f[i]=null,j=!0;break}if(d.isDateOverlap(h,a)){b.isPlainObject(a)?(a.inverted=!0,c=a):b.isArray(a)?(c=a,c[3]||c.push("inverted")):e.isDate(a)&&(c=[a.getFullYear(),a.getMonth(),a.getDate(),"inverted"]);break}}if(c)for(i=0;g>i;i+=1)if(d.isDateExact(f[i],a)){f[i]=null;break}if(j)for(i=0;g>i;i+=1)if(d.isDateOverlap(f[i],a)){f[i]=null;break}c&&f.push(c)}),f.filter(function(a){return null!=a})},f.prototype.nodes=function(a){var b=this,f=b.settings,g=b.item,h=g.now,i=g.select,j=g.highlight,k=g.view,l=g.disable,m=g.min,n=g.max,o=function(a,b){return f.firstDay&&(a.push(a.shift()),b.push(b.shift())),e.node("thead",e.node("tr",e.group({min:0,max:c-1,i:1,node:"th",item:function(c){return[a[c],f.klass.weekdays,'scope=col title="'+b[c]+'"']}})))}((f.showWeekdaysFull?f.weekdaysFull:f.weekdaysLetter).slice(0),f.weekdaysFull.slice(0)),p=function(a){return e.node("div"," ",f.klass["nav"+(a?"Next":"Prev")]+(a&&k.year>=n.year&&k.month>=n.month||!a&&k.year<=m.year&&k.month<=m.month?" "+f.klass.navDisabled:""),"data-nav="+(a||-1)+" "+e.ariaAttr({role:"button",controls:b.$node[0].id+"_table"})+" "+'title="'+(a?f.labelMonthNext:f.labelMonthPrev)+'"')},q=function(c){var d=f.showMonthsShort?f.monthsShort:f.monthsFull;return"short_months"==c&&(d=f.monthsShort),f.selectMonths&&void 0==c?e.node("select",e.group({min:0,max:11,i:1,node:"option",item:function(a){return[d[a],0,"value="+a+(k.month==a?" selected":"")+(k.year==m.year&&a<m.month||k.year==n.year&&a>n.month?" disabled":"")]}}),f.klass.selectMonth+" browser-default",(a?"":"disabled")+" "+e.ariaAttr({controls:b.$node[0].id+"_table"})+" "+'title="'+f.labelMonthSelect+'"'):"short_months"==c?null!=i?e.node("div",d[i.month]):e.node("div",d[k.month]):e.node("div",d[k.month],f.klass.month)},r=function(c){var d=k.year,g=f.selectYears===!0?5:~~(f.selectYears/2);if(g){var h=m.year,i=n.year,j=d-g,l=d+g;if(h>j&&(l+=h-j,j=h),l>i){var o=j-h,p=l-i;j-=o>p?p:o,l=i}if(f.selectYears&&void 0==c)return e.node("select",e.group({min:j,max:l,i:1,node:"option",item:function(a){return[a,0,"value="+a+(d==a?" selected":"")]}}),f.klass.selectYear+" browser-default",(a?"":"disabled")+" "+e.ariaAttr({controls:b.$node[0].id+"_table"})+" "+'title="'+f.labelYearSelect+'"')}return"raw"==c?e.node("div",d):e.node("div",d,f.klass.year)};return createDayLabel=function(){return null!=i?e.node("div",i.date):e.node("div",h.date)},createWeekdayLabel=function(){var a;a=null!=i?i.day:h.day;var b=f.weekdaysFull[a];return b},e.node("div",e.node("div",createWeekdayLabel(),"picker__weekday-display")+e.node("div",q("short_months"),f.klass.month_display)+e.node("div",createDayLabel(),f.klass.day_display)+e.node("div",r("raw"),f.klass.year_display),f.klass.date_display)+e.node("div",(f.selectYears?r()+q():q()+r())+p()+p(1),f.klass.header)+e.node("table",o+e.node("tbody",e.group({min:0,max:d-1,i:1,node:"tr",item:function(a){var d=f.firstDay&&0===b.create([k.year,k.month,1]).day?-7:0;return[e.group({min:c*a-k.day+d+1,max:function(){return this.min+c-1},i:1,node:"td",item:function(a){a=b.create([k.year,k.month,a+(f.firstDay?1:0)]);var c=i&&i.pick==a.pick,d=j&&j.pick==a.pick,g=l&&b.disabled(a)||a.pick<m.pick||a.pick>n.pick,o=e.trigger(b.formats.toString,b,[f.format,a]);return[e.node("div",a.date,function(b){return b.push(k.month==a.month?f.klass.infocus:f.klass.outfocus),h.pick==a.pick&&b.push(f.klass.now),c&&b.push(f.klass.selected),d&&b.push(f.klass.highlighted),g&&b.push(f.klass.disabled),b.join(" ")}([f.klass.day]),"data-pick="+a.pick+" "+e.ariaAttr({role:"gridcell",label:o,selected:c&&b.$node.val()===o?!0:null,activedescendant:d?!0:null,disabled:g?!0:null})),"",e.ariaAttr({role:"presentation"})]}})]}})),f.klass.table,'id="'+b.$node[0].id+"_table"+'" '+e.ariaAttr({role:"grid",controls:b.$node[0].id,readonly:!0}))+e.node("div",e.node("button",f.today,f.klass.buttonToday,"type=button data-pick="+h.pick+(a&&!b.disabled(h)?"":" disabled")+" "+e.ariaAttr({controls:b.$node[0].id}))+e.node("button",f.clear,f.klass.buttonClear,"type=button data-clear=1"+(a?"":" disabled")+" "+e.ariaAttr({controls:b.$node[0].id}))+e.node("button",f.close,f.klass.buttonClose,"type=button data-close=true "+(a?"":" disabled")+" "+e.ariaAttr({controls:b.$node[0].id})),f.klass.footer)},f.defaults=function(a){return{labelMonthNext:"Next month",labelMonthPrev:"Previous month",labelMonthSelect:"Select a month",labelYearSelect:"Select a year",monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysLetter:["S","M","T","W","T","F","S"],today:"Today",clear:"Cancel",close:"OK",closeOnClear:!0,format:"d/m/yyyy",klass:{table:a+"table",header:a+"header",date_display:a+"date-display",day_display:a+"day-display",month_display:a+"month-display",year_display:a+"year-display",calendar_container:a+"calendar-container",navPrev:a+"nav--prev icon icon-keyboard-arrow-left",navNext:a+"nav--next icon icon-keyboard-arrow-right",navDisabled:a+"nav--disabled",month:a+"month",year:a+"year",selectMonth:a+"select--month",selectYear:a+"select--year",weekdays:a+"weekday",day:a+"day",disabled:a+"day--disabled",selected:a+"day--selected",highlighted:a+"day--highlighted",now:a+"day--today",infocus:a+"day--infocus",outfocus:a+"day--outfocus",footer:a+"footer",buttonClear:a+"button--clear btn btn-flat btn-alt",buttonToday:a+"button--today btn btn-flat btn-alt",buttonClose:a+"button--close btn btn-flat btn-alt"}}}(a.klasses().picker+"__"),a.extend("pickadate",f)});

$('.datepicker-adv-default').each(function(index) {
    var datepickerAdv = $(this).pickadate(),
        datepickerApi = datepickerAdv.pickadate('picker');

    datepickerApi.on({
        close: function() {
            $(document.activeElement).blur();
        },
        open: function() {
            datepickerApi.set('select', datepickerApi.get(), {format: 'd/m/yyyy'});
        }
    });
});
// dropdown menu max-width
$('.dropdown').on('show.bs.dropdown', function () {
    var $dropdownMenu = $('.dropdown-menu', $(this)),
        $dropdownToggle = $('[class*="dropdown-toggle"]', $(this)),
        dropdownPadding = $('a', $dropdownMenu).css('padding-left').replace('px', ''),
        dropdownWidth;
    if ($dropdownMenu.hasClass('dropdown-menu-right') || $dropdownMenu.parents('.nav.pull-right').length) {
        dropdownWidth = $dropdownToggle.offset().left + $dropdownToggle.outerWidth() - dropdownPadding;
    } else {
        dropdownWidth = $(window).width() - $dropdownToggle.offset().left - dropdownPadding;
    }
    $dropdownMenu.css('max-width', dropdownWidth);
});
// close menu and/or tile if esc key is pressed
$(document).keyup(function(e) {
    if (e.which == '27') {
        if ($('body').hasClass('menu-open')) {
            mReset();
        } else {
            tReset();
        }
    };
});
// footer push
function footerPush() {
    $('body').css('margin-bottom', $('.footer').outerHeight());
}
// checkbox & radio
$('.checkbox-adv').each(function() {
    $('label', $(this)).append('<span class="circle"></span><span class="circle-check"></span><span class="circle-icon icon icon-done"></span>');
});
$('.radio-adv').each(function() {
    $('label', $(this)).append('<span class="circle"></span><span class="circle-check"></span>');
});

// floating label
if($('.form-group-label').length) {
    $('.form-group-label .form-control').each(function() {
        floatingLabel($(this));
    });
}
$('.form-group-label .form-control').on('change', function() {
    floatingLabel($(this));
});
$('.form-group-label .form-control').on('focusin', function() {
    $(this).closest('.form-group-label').addClass('control-focus');
});
$('.form-group-label .form-control').on('focusout', function() {
    $(this).closest('.form-group-label').removeClass('control-focus');
});

function floatingLabel(input) {
    var parent = input.closest('.form-group-label');
    if(input.val()) {
        parent.addClass('control-highlight');
    } else {
        parent.removeClass('control-highlight');
    }
}

// icon label
$('.form-group-icon .form-control').on('focusin', function() {
    $(this).closest('.form-group-icon').addClass('control-focus');
});
$('.form-group-icon .form-control').on('focusout', function() {
    $(this).closest('.form-group-icon').removeClass('control-focus');
});

// switch
$('.switch-toggle').on('click', function() {
    var $this = $(this);
    if (!$this.hasClass('switch-toggle-on')) {
        $this.addClass('switch-toggle-on');
        setTimeout(function() {
            $this.removeClass('switch-toggle-on');
        }, 300);
    };
});

// textarea autosize
$('.textarea-autosize').textareaAutoSize();
// header
var $header = $('.header'),
    headerHeight;

// header affix
$(window).on('scroll', function() {
    if (window.pageYOffset > headerHeight) {
        $header.addClass('fixed');
    } else {
        $header.removeClass('fixed');
    }
});

// header height
function headerHeightCal() {
    headerHeight = $header.height();
}
// $('html') on click
$('html').on('click', function(e) {
    var $target = $(e.target);

    if ($('body').hasClass('menu-open') && !$target.is('.fbtn-container *, .menu *')) {
        mReset();
    } else if ($target.attr('data-dismiss') === 'tile' || !$target.is('.tile-collapse *')) {
        tReset();
    };

    if ($target.is('.tile-toggle, .tile-toggle *') && !$target.is('.tile-toggle-false, .tile-toggle-false *')) {
        tileToggle($target.parents('.tile-collapse'));
    };
});

// menu close
function mReset() {
    $('body').removeClass('menu-open');
    $('.menu-toggle').closest('li.active').removeClass('active');
    $('.menu.open').removeClass('open');
}

// menu open
$('.menu-toggle').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var $this = $(this),
        $thisLi = $this.closest('li'),
        $thisMenu = $($this.attr('href'));
    if ($thisLi.hasClass('active')) {
        $('body').removeClass('menu-open');
        $thisLi.removeClass('active');
        $thisMenu.removeClass('open');
    } else {
        $('body').addClass('menu-open');
        $('.menu-toggle').closest('li.active').removeClass('active');
        $('.menu.open').removeClass('open');
        $thisLi.addClass('active');
        $thisMenu.addClass('open');
        if ($thisMenu.hasClass('menu-search')) {
            $('.menu-search-focus').focus();
        };
    }
});
// sortable v1.1.1
// git://github.com/rubaxa/Sortable.git
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a,b){this.el=a,this.options=b=b||{};var c={group:Math.random(),sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,draggable:/[uo]l/i.test(a.nodeName)?"li":">*",ghostClass:"sortable-ghost",ignore:"a, img",filter:null,animation:0,setData:function(a,b){a.setData("Text",b.textContent)},dropBubble:!1,dragoverBubble:!1};for(var e in c)!(e in b)&&(b[e]=c[e]);var f=b.group;f&&"object"==typeof f||(f=b.group={name:f}),["pull","put"].forEach(function(a){a in f||(f[a]=!0)}),N.forEach(function(c){b[c]=d(this,b[c]||O),g(a,c.substr(2).toLowerCase(),b[c])},this),b.groups=" "+f.name+(f.put.join?" "+f.put.join(" "):"")+" ",a[G]=b;for(var h in this)"_"===h.charAt(0)&&(this[h]=d(this,this[h]));g(a,"mousedown",this._onTapStart),g(a,"touchstart",this._onTapStart),g(a,"dragover",this),g(a,"dragenter",this),R.push(this._onDragOver),b.store&&this.sort(b.store.get(this))}function c(a){t&&t.state!==a&&(j(t,"display",a?"none":""),!a&&t.state&&u.insertBefore(t,r),t.state=a)}function d(a,b){var c=Q.call(arguments,2);return b.bind?b.bind.apply(b,[a].concat(c)):function(){return b.apply(a,c.concat(Q.call(arguments)))}}function e(a,b,c){if(a){c=c||I,b=b.split(".");var d=b.shift().toUpperCase(),e=new RegExp("\\s("+b.join("|")+")\\s","g");do if(">*"===d&&a.parentNode===c||(""===d||a.nodeName.toUpperCase()==d)&&(!b.length||((" "+a.className+" ").match(e)||[]).length==b.length))return a;while(a!==c&&(a=a.parentNode))}return null}function f(a){a.dataTransfer.dropEffect="move",a.preventDefault()}function g(a,b,c){a.addEventListener(b,c,!1)}function h(a,b,c){a.removeEventListener(b,c,!1)}function i(a,b,c){if(a)if(a.classList)a.classList[c?"add":"remove"](b);else{var d=(" "+a.className+" ").replace(/\s+/g," ").replace(" "+b+" ","");a.className=d+(c?" "+b:"")}}function j(a,b,c){var d=a&&a.style;if(d){if(void 0===c)return I.defaultView&&I.defaultView.getComputedStyle?c=I.defaultView.getComputedStyle(a,""):a.currentStyle&&(c=a.currentStyle),void 0===b?c:c[b];b in d||(b="-webkit-"+b),d[b]=c+("string"==typeof c?"":"px")}}function k(a,b,c){if(a){var d=a.getElementsByTagName(b),e=0,f=d.length;if(c)for(;f>e;e++)c(d[e],e);return d}return[]}function l(a){a.draggable=!1}function m(){L=!1}function n(a,b){var c=a.lastElementChild,d=c.getBoundingClientRect();return b.clientY-(d.top+d.height)>5&&c}function o(a){for(var b=a.tagName+a.className+a.src+a.href+a.textContent,c=b.length,d=0;c--;)d+=b.charCodeAt(c);return d.toString(36)}function p(a){for(var b=0;a&&(a=a.previousElementSibling);)"TEMPLATE"!==a.nodeName.toUpperCase()&&b++;return b}function q(a,b){var c,d;return function(){void 0===c&&(c=arguments,d=this,setTimeout(function(){1===c.length?a.call(d,c[0]):a.apply(d,c),c=void 0},b))}}var r,s,t,u,v,w,x,y,z,A,B,C,D,E,F={},G="Sortable"+(new Date).getTime(),H=window,I=H.document,J=H.parseInt,K=!!("draggable"in I.createElement("div")),L=!1,M=function(a,b,c,d,e,f){var g=I.createEvent("Event");g.initEvent(b,!0,!0),g.item=c||a,g.from=d||a,g.clone=t,g.oldIndex=e,g.newIndex=f,a.dispatchEvent(g)},N="onAdd onUpdate onRemove onStart onEnd onFilter onSort".split(" "),O=function(){},P=Math.abs,Q=[].slice,R=[],S=q(function(a,b,c){if(c&&b.scroll){var d,e,f,g,h=b.scrollSensitivity,i=b.scrollSpeed,j=a.clientX,k=a.clientY,l=window.innerWidth,m=window.innerHeight;if(x!==c&&(w=b.scroll,x=c,w===!0)){w=c;do if(w.offsetWidth<w.scrollWidth||w.offsetHeight<w.scrollHeight)break;while(w=w.parentNode)}w&&(d=w,e=w.getBoundingClientRect(),f=(P(e.right-j)<=h)-(P(e.left-j)<=h),g=(P(e.bottom-k)<=h)-(P(e.top-k)<=h)),f||g||(f=(h>=l-j)-(h>=j),g=(h>=m-k)-(h>=k),(f||g)&&(d=H)),(F.vx!==f||F.vy!==g||F.el!==d)&&(F.el=d,F.vx=f,F.vy=g,clearInterval(F.pid),d&&(F.pid=setInterval(function(){d===H?H.scrollTo(H.scrollX+f*i,H.scrollY+g*i):(g&&(d.scrollTop+=g*i),f&&(d.scrollLeft+=f*i))},24)))}},30);b.prototype={constructor:b,_dragStarted:function(){u&&r&&(i(r,this.options.ghostClass,!0),b.active=this,M(u,"start",r,u,A))},_onTapStart:function(a){var b=a.type,c=a.touches&&a.touches[0],d=(c||a).target,f=d,h=this.options,i=this.el,j=h.filter;if(!("mousedown"===b&&0!==a.button||h.disabled)&&(d=e(d,h.draggable,i))){if(A=p(d),"function"==typeof j){if(j.call(this,a,d,this))return M(f,"filter",d,i,A),void a.preventDefault()}else if(j&&(j=j.split(",").some(function(a){return a=e(f,a.trim(),i),a?(M(a,"filter",d,i,A),!0):void 0})))return void a.preventDefault();if((!h.handle||e(f,h.handle,i))&&d&&!r&&d.parentNode===i){D=a,u=this.el,r=d,v=r.nextSibling,C=this.options.group,r.draggable=!0,h.ignore.split(",").forEach(function(a){k(d,a.trim(),l)}),c&&(D={target:d,clientX:c.clientX,clientY:c.clientY},this._onDragStart(D,"touch"),a.preventDefault()),g(I,"mouseup",this._onDrop),g(I,"touchend",this._onDrop),g(I,"touchcancel",this._onDrop),g(r,"dragend",this),g(u,"dragstart",this._onDragStart),K||this._onDragStart(D,!0);try{I.selection?I.selection.empty():window.getSelection().removeAllRanges()}catch(m){}}}},_emulateDragOver:function(){if(E){j(s,"display","none");var a=I.elementFromPoint(E.clientX,E.clientY),b=a,c=" "+this.options.group.name,d=R.length;if(b)do{if(b[G]&&b[G].groups.indexOf(c)>-1){for(;d--;)R[d]({clientX:E.clientX,clientY:E.clientY,target:a,rootEl:b});break}a=b}while(b=b.parentNode);j(s,"display","")}},_onTouchMove:function(a){if(D){var b=a.touches?a.touches[0]:a,c=b.clientX-D.clientX,d=b.clientY-D.clientY,e=a.touches?"translate3d("+c+"px,"+d+"px,0)":"translate("+c+"px,"+d+"px)";E=b,j(s,"webkitTransform",e),j(s,"mozTransform",e),j(s,"msTransform",e),j(s,"transform",e),a.preventDefault()}},_onDragStart:function(a,b){var c=a.dataTransfer,d=this.options;if(this._offUpEvents(),"clone"==C.pull&&(t=r.cloneNode(!0),j(t,"display","none"),u.insertBefore(t,r)),b){var e,f=r.getBoundingClientRect(),h=j(r);s=r.cloneNode(!0),j(s,"top",f.top-J(h.marginTop,10)),j(s,"left",f.left-J(h.marginLeft,10)),j(s,"width",f.width),j(s,"height",f.height),j(s,"opacity","0.8"),j(s,"position","fixed"),j(s,"zIndex","100000"),u.appendChild(s),e=s.getBoundingClientRect(),j(s,"width",2*f.width-e.width),j(s,"height",2*f.height-e.height),"touch"===b?(g(I,"touchmove",this._onTouchMove),g(I,"touchend",this._onDrop),g(I,"touchcancel",this._onDrop)):(g(I,"mousemove",this._onTouchMove),g(I,"mouseup",this._onDrop)),this._loopId=setInterval(this._emulateDragOver,150)}else c&&(c.effectAllowed="move",d.setData&&d.setData.call(this,c,r)),g(I,"drop",this);setTimeout(this._dragStarted,0)},_onDragOver:function(a){var b,d,f,g=this.el,h=this.options,i=h.group,k=i.put,l=C===i,o=h.sort;if(r&&(void 0!==a.preventDefault&&(a.preventDefault(),!h.dragoverBubble&&a.stopPropagation()),C&&!h.disabled&&(l?o||(f=!u.contains(r)):C.pull&&k&&(C.name===i.name||k.indexOf&&~k.indexOf(C.name)))&&(void 0===a.rootEl||a.rootEl===this.el))){if(S(a,h,this.el),L)return;if(b=e(a.target,h.draggable,g),d=r.getBoundingClientRect(),f)return c(!0),void(t||v?u.insertBefore(r,t||v):o||u.appendChild(r));if(0===g.children.length||g.children[0]===s||g===a.target&&(b=n(g,a))){if(b){if(b.animated)return;q=b.getBoundingClientRect()}c(l),g.appendChild(r),this._animate(d,r),b&&this._animate(q,b)}else if(b&&!b.animated&&b!==r&&void 0!==b.parentNode[G]){y!==b&&(y=b,z=j(b));var p,q=b.getBoundingClientRect(),w=q.right-q.left,x=q.bottom-q.top,A=/left|right|inline/.test(z.cssFloat+z.display),B=b.offsetWidth>r.offsetWidth,D=b.offsetHeight>r.offsetHeight,E=(A?(a.clientX-q.left)/w:(a.clientY-q.top)/x)>.5,F=b.nextElementSibling;L=!0,setTimeout(m,30),c(l),p=A?b.previousElementSibling===r&&!B||E&&B:F!==r&&!D||E&&D,p&&!F?g.appendChild(r):b.parentNode.insertBefore(r,p?F:b),this._animate(d,r),this._animate(q,b)}}},_animate:function(a,b){var c=this.options.animation;if(c){var d=b.getBoundingClientRect();j(b,"transition","none"),j(b,"transform","translate3d("+(a.left-d.left)+"px,"+(a.top-d.top)+"px,0)"),b.offsetWidth,j(b,"transition","all "+c+"ms"),j(b,"transform","translate3d(0,0,0)"),clearTimeout(b.animated),b.animated=setTimeout(function(){j(b,"transition",""),j(b,"transform",""),b.animated=!1},c)}},_offUpEvents:function(){h(I,"mouseup",this._onDrop),h(I,"touchmove",this._onTouchMove),h(I,"touchend",this._onDrop),h(I,"touchcancel",this._onDrop)},_onDrop:function(a){var c=this.el,d=this.options;clearInterval(this._loopId),clearInterval(F.pid),h(I,"drop",this),h(I,"mousemove",this._onTouchMove),h(c,"dragstart",this._onDragStart),this._offUpEvents(),a&&(a.preventDefault(),!d.dropBubble&&a.stopPropagation(),s&&s.parentNode.removeChild(s),r&&(h(r,"dragend",this),l(r),i(r,this.options.ghostClass,!1),u!==r.parentNode?(B=p(r),M(r.parentNode,"sort",r,u,A,B),M(u,"sort",r,u,A,B),M(r,"add",r,u,A,B),M(u,"remove",r,u,A,B)):(t&&t.parentNode.removeChild(t),r.nextSibling!==v&&(B=p(r),M(u,"update",r,u,A,B),M(u,"sort",r,u,A,B))),b.active&&M(u,"end",r,u,A,B)),u=r=s=v=t=w=x=D=E=y=z=C=b.active=null,this.save())},handleEvent:function(a){var b=a.type;"dragover"===b||"dragenter"===b?(this._onDragOver(a),f(a)):("drop"===b||"dragend"===b)&&this._onDrop(a)},toArray:function(){for(var a,b=[],c=this.el.children,d=0,f=c.length;f>d;d++)a=c[d],e(a,this.options.draggable,this.el)&&b.push(a.getAttribute("data-id")||o(a));return b},sort:function(a){var b={},c=this.el;this.toArray().forEach(function(a,d){var f=c.children[d];e(f,this.options.draggable,c)&&(b[a]=f)},this),a.forEach(function(a){b[a]&&(c.removeChild(b[a]),c.appendChild(b[a]))})},save:function(){var a=this.options.store;a&&a.set(this)},closest:function(a,b){return e(a,b||this.options.draggable,this.el)},option:function(a,b){var c=this.options;return void 0===b?c[a]:void(c[a]=b)},destroy:function(){var a=this.el,b=this.options;N.forEach(function(c){h(a,c.substr(2).toLowerCase(),b[c])}),h(a,"mousedown",this._onTapStart),h(a,"touchstart",this._onTapStart),h(a,"dragover",this),h(a,"dragenter",this),Array.prototype.forEach.call(a.querySelectorAll("[draggable]"),function(a){a.removeAttribute("draggable")}),R.splice(R.indexOf(this._onDragOver),1),this._onDrop(),this.el=null}},b.utils={on:g,off:h,css:j,find:k,bind:d,is:function(a,b){return!!e(a,b,a)},throttle:q,closest:e,toggleClass:i,dispatchEvent:M,index:p},b.version="1.1.1",b.create=function(a,c){return new b(a,c)},a.fn.sortable=function(c){var d;return this.each(function(){var e=a(this),f=e.data("sortable");if(f||!(c instanceof Object)&&c||(f=new b(this,c),e.data("sortable",f)),f){if("widget"===c)return f;"destroy"===c?(f.destroy(),e.removeData("sortable")):c in f&&(d=f[f].apply(f,[].slice.call(arguments,1)))}}),void 0===d?this:d}});

// sortable
$('.sortable-list').sortable({
    draggable: '.sortable-item',
    ghostClass: 'sortable-ghost',
    handle: '.sortable-handle'
});
// tab index
$('.tab-nav').each(function() {
    $('a[data-toggle="tab"]', $(this)).each(function(index) {
        $(this).attr('data-tab-index', index);
    });
});

// tab switch
$('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
    var $newTab = $(e.target),
        $oldTab = $(e.relatedTarget);
    if ($newTab.attr('data-tab-index') < $oldTab.attr('data-tab-index')) {
        $newTab.addClass('from-right');
        $oldTab.addClass('to-left');
        setTimeout(function() {
            $newTab.removeClass('from-right');
            $oldTab.removeClass('to-left');
        }, 300);
    };
});
// tile close
function tReset() {
    $('.tile-collapse.active .tile-active-show').collapse('hide');
    $('.tile-collapse.active').removeClass('active');
}

// tile toggle
function tileToggle(thisTile) {
    if (thisTile.hasClass('active')) {
        tReset();
    } else {
        tReset();
        $('.tile-active-show', thisTile).collapse('show');
        thisTile.addClass('active');
    }
}
// toast
var toastTimeout,
    toastTimeoutInner;

// toast dismiss
$(document).on('click', '[data-dismiss="toast"]', function(e) {
    e.preventDefault();
    clearTimeout(toastTimeoutInner);
    clearTimeout(toastTimeout);
    $('.fbtn-container').css('margin-bottom', '0');
    $('.toast').removeClass('in');
    toastTimeoutInner = setTimeout(function() {
        $('.toast').find('.in').removeClass('in');
        clearTimeout(toastTimeoutInner);
    }, 300);
});

// toast hover
$('.toast-inner').on('mouseenter', function() {
    clearTimeout(toastTimeoutInner);
    clearTimeout(toastTimeout);
});

$('.toast-inner').on('mouseleave', function() {
    toastTimeout = setTimeout(function() {
        $('.fbtn-container').css('margin-bottom', '0');
        $('.toast').removeClass('in');
        clearTimeout(toastTimeout);
    }, 5000);
    toastTimeoutInner = setTimeout(function() {
        $('.toast').find('.in').removeClass('in');
        clearTimeout(toastTimeoutInner);
    }, 5300);
});

// toast open
$(document).on('click', '[data-toggle="toast"]', function(e) {
    e.preventDefault();
    var $thisToast = $($(this).attr('href'));
    clearTimeout(toastTimeoutInner);
    clearTimeout(toastTimeout);
    if ($(window).width() < 768) {
        $('.fbtn-container').css('margin-bottom', $thisToast.outerHeight());
    };
    $('.toast').addClass('in');
    $('.toast').find('.in').removeClass('in');
    $thisToast.addClass('in');
    toastTimeout = setTimeout(function() {
        $('.fbtn-container').css('margin-bottom', '0');
        $('.toast').removeClass('in');
        clearTimeout(toastTimeout);
    }, 5000);
    toastTimeoutInner = setTimeout(function() {
        $('.toast').find('.in').removeClass('in');
        clearTimeout(toastTimeoutInner);
    }, 5300);
});
// window resize
on_resize(function() {
    // fixed left/right hand side column padding bottom and width
    if ($('.content-fix').length) {
        contentFixPushCal();
    };
    // footer push
    footerPush();
    // header height
    headerHeightCal();
})();
