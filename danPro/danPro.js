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
	function getStyle(obj, sStyle) {
		if (obj.currentStyle) {
			return obj.currentStyle[sStyle];
		} 
		else {
			return getComputedStyle(obj, false)[sStyle];
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
			
			var self = this;
			for (var i in o) {
				(function(i) {
					var nTarget = parseFloat(o[i]);
					var nStart = parseFloat(getStyle(self.elems, i));
					var speed=time ? (nTarget - nStart) / (time / 30) : 10;
					if(speed>0){
						var timer = setInterval(function() {
							var nCurrent = parseFloat(getStyle(self.elems, i));
							if (nCurrent < nTarget) {
								if (i == "opacity") {
									self.elems.style.opacity = nCurrent + speed;
									self.elems.style.filter = 'alpha(opacity: ('+(nCurrent + speend)+')';
								} 
								else{
									self.elems.style[i] = nCurrent + speed + "px";
								}
							} 
							else {
								self.elems.style[i] = o[i];
								clearInterval(timer);
								if(callback){
									callback();
								}
							}
						}, 30);
					}
					else if(speed<0){
						var timer = setInterval(function() {
							var nCurrent = parseFloat(getStyle(self.elems, i));
							if (nCurrent > nTarget) {
								if (i == "opacity") {
									self.elems.style.opacity = nCurrent + speed;
									self.elems.style.filter = 'alpha(opacity: ('+(nCurrent + speend)+')';
								} 
								else{
									self.elems.style[i] = ((nCurrent + speed)>0? (nCurrent + speed):0) + "px";
								}
							} 
							else {
								self.elems.style[i] = o[i];
								clearInterval(timer);
								if(callback){
									callback();
								}
							}
						}, 30);
					}
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
			if(getStyle(this.elems,"display")=="block"){
				this.hide();
			}
			else{
				this.show();
			}
			return this;
		},
		delay:function(callback,time){
			setTimeout(callback,time);
			return this;
		},
		fadeIn:function(time){
			var self=this.elems;
			this.show();
			var nStart=getStyle(this.elems,"opacity")*100;
			var speed=time ? (100-nStart)/(time/30) : 10
			var timer=setInterval(function(){
				var nCurrent=getStyle(self,"opacity")*100;
				if(nCurrent<100){
					self.style.opacity=(nCurrent+speed)/100;
					self.style.filter='alpha(opacity:'+(nCurrent+speed)+')';
				}
				else{
					clearInterval(timer);
					self.style.opacity=1;
					self.style.filter='alpha(opacity:100)';
				}
			},30);
			return this;
		},
		fadeOut:function(time){
			var self=this.elems;
			var nStart=getStyle(this.elems,"opacity")*100;
			var speed=time ? (nStart-0)/(time/30) : 10;
			var timer=setInterval(function(){
				var nCurrent=getStyle(self,"opacity")*100;
				if(nCurrent>0){
					self.style.opacity=(nCurrent-speed)/100;
					self.style.filter='alpha(opacity:'+(nCurrent-speed)+')';
				}
				else{
					clearInterval(timer);
					self.style.opacity=0;
					self.style.filter='alpha(opacity:0)';
					self.style.display="none";
				}
			},30);
			return this;
		},
		fadeTo:function(time,nTarget){
			this.show();
			var self=this.elems;
			var nStart=getStyle(this.elems,"opacity")*100;
			nTarget=nTarget*100;
			var speed=(nTarget-nStart)/(time/30);
			if(speed>0){
				var timer=setInterval(function(){
					var nCurrent=getStyle(self,"opacity")*100;
					if(nCurrent<nTarget){
						self.style.opacity=(nCurrent+speed)/100;
						self.style.filter='alpha(opacity:'+(nCurrent+speed)+')';
					}
					else{
						clearInterval(timer);
						self.style.opacity=nTarget/100;
						self.style.filter='alpha(opacity:'+nTarget+')';
					}
				},30);
			}
			else if(speed<0){
				var timer=setInterval(function(){
					var nCurrent=getStyle(self,"opacity")*100;
					if(nCurrent>nTarget){
						self.style.opacity=(nCurrent+speed)/100;
						self.style.filter='alpha(opacity:'+(nCurrent+speed)+')';
					}
					else{
						clearInterval(timer);
						self.style.opacity=nTarget/100;
						self.style.filter='alpha(opacity:'+nTarget+')';
					}
				},30);
			}
			return this;
		},
		height:function(param){
			if(param||param==0){
				this.elems.style.height=param+"px";
				return this;
			}
			return this.elems.clientHeight;
		},
		width:function(param){
			if(param){
				this.elems.style.width=param+"px";
				return this;
			}
			return this.elems.clientWidth;
		},
		slideDown:function(time){
			this.show();
			var nOldHeight=this.height();
			this.height(0);
			this.animate({"height":nOldHeight+"px"},time);
			return this;
		},
		slideUp:function(time){
			var self=this;
			var nOldHeight=this.height();
			this.animate({"height":0+"px"},time,function(){
				self.hide().height(nOldHeight);
			});
			return this;
		},
		slideToggle:function(time){
			if(getStyle(this.elems,"display")=="none"){
				this.slideDown(time);
			}
			else{
				this.slideUp(time);
			}
			return this;
		}
		//jquery文档操作
	}
	window.$ = function() {
		return new fnClass(arguments[0]);
	}
}());