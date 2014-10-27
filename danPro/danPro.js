(function() {
	/*
	构造函数:fnClass(sSel),传入选择器,return出this,this继承构造函数的prototype属性,this.elems即选中的元素
	调用时$("p")即调用了fnClass("p"),return的this具有各种方法,可以调用this.hasClass(),this即指代调用方法的this
	所以要用this.elems在方法中表示选中的元素
	*/
	function fnClass(sSel) {
		if (sSel == document || sSel == window) {
			this.elems = sSel;
		} else if (sSel == "body") {
			this.elems = document.body;
		} else if (sSel == this) {
			this.elems = this;
		} else {
			this.elems = document.querySelector(sSel);
		}
	}
	fnClass.prototype = {
		//1-10
		hasClass: function(sClassName) {
			var sClassList = this.elems.className;
			if (!sClassList) {
				return false;
			}
			var rHasClass = new RegExp('\\b' + sClassName + '\\b');
			if (rHasClass.test(sClassList)) {
				return true;
			}
			return false;
		},
		addClass: function(sClassName) {
			var sClassList = this.elems.className;
			if (this.hasClass(sClassName)) {
				return this;
			}
			sClassName = sClassList.length ? (" " + sClassName) : sClassName;
			this.elems.className += sClassName;
			return this;
		},
		removeClass: function(sClassName) {
			var sClassList = this.elems.className;
			if (!this.hasClass(className)) {
				return this;
			}
			var rRemoveClass = new RegExp('\\b\\s*' + sClassName + '\\b', "g");
			this.elems.className = sClassList.replace(rRemoveClass, "");
			return this;
		},
		toggleClass: function(sClassName) {
			if (this.hasClass(sClassName)) {
				this.removeClass(sClassName);
			} else {
				this.addClass(sClassName);
			}
			return this;
		},
		//jquery事件
		on: function(type, callback) {
			if (this.elems.addEventListener) {
				this.elems.addEventListener(type, callback, false);
			} else {
				this.elems.attachEvent('on' + type, function(event) {
					return callback.call(this.elems, event);
				});
			}
			return this;
		},
		ready: function(callback) {
			this.elems.onload = callback;
		},
		css: function(param) {
			if (typeof param === "object") {
				for (var i in param) {
					this.elems.style[i] = param[i];
				}
			} else {
				this.elems.style[arguments[0]] = arguments[1];
			}
			return this;
		},
		val: function(param) {
			if (param) {
				this.elems.value = param;
				return this;
			} else {
				return this.elems.value;
			}
		},
		//jquery效果
		animate: function(o, time, callback) {
			function getStyle(obj, sStyle) {
				if (obj.currentStyle) {
					return obj.currentStyle[sStyle];
				} else {
					return getComputedStyle(obj, false)[sStyle];
				}
			}
			var self = this;
			for (var i in o) {
				(function(i) {
					var nTarget = parseFloat(o[i]);
					var nStart = parseFloat(getStyle(self.elems, i));
					var timer = setInterval(function() {
						var nCurrent = parseFloat(getStyle(self.elems, i));
						if (nCurrent < nTarget) {
							if (i == "opacity") {
								self.elems.style.opacity = nCurrent + (time ? (nTarget - nStart) / (1000 / 30) : 10);
								self.elems.style.filter = 'alpha(opacity: ('+(nCurrent + (time ? (nTarget - nStart) / (1000 / 30) : 10))+')';
							} 
							else{
								self.elems.style[i] = nCurrent + (time ? (nTarget - nStart) / (1000 / 30) : 10) + "px";
							}
						} 
						else {
							self.elems.style[i] = o[i];
							clearInterval(timer);
							callback();
						}
					}, 30);
				}(i));
			}
			return this;
		},
		hide:function(){
			this.elems.style.display="none";
			return this;
		},
		show:function(){
			this.elems.style.display="block";
			return this;
		},
		toggle:function(){
			if(this.elems.style.display=="block"){
				this.elems.style.display="none";
			}
			else{
				this.elems.style.display="block";
			}
		}
	}
	window.$ = function() {
		return new fnClass(arguments[0]);
	}
}());