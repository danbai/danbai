(function(){
	function fnClass(sSel){
		if(sSel==document||sSel==window){
			this.elems=sSel;
		}
		else if(sSel=="body"){
			this.elems=document.body;
		}
		else{
			this.elems=document.querySelectorAll(sSel).length>1 ? document.querySelectorAll(sSel) : document.querySelector(sSel);
		}
	}
	fnClass.prototype={
		//1-10
		hasClass:function(sClassName){
			var sClassList=this.elems.className;
			if(!sClassList){
				return false;
			}
			var rHasClass=new RegExp('\\b'+sClassName+'\\b');
			if(rHasClass.test(sClassList)){
				return true;
			}
			return false;
		},
		addClass:function(sClassName){
			var sClassList=this.elems.className;
			if(this.hasClass(sClassName)){
				return;
			}
			sClassName=sClassList.length ? (" "+sClassName) : sClassName;
			this.elems.className+=sClassName;
			return this;
		},
		removeClass:function(sClassName){
			var sClassList=this.elems.className;
			if(!this.hasClass(className)){
				return;
			}
			var rRemoveClass=new RegExp('\\b\\s*'+sClassName+'\\b',"g");
			this.elems.className=sClassList.replace(rRemoveClass,"");
			return this;
		},
		toggleClass:function(sClassName){
			if(this.hasClass(sClassName)){
				this.removeClass(sClassName);
			}
			else{
				this.addClass(sClassName);
			}
			return this;
		},
		addEvent:function(target,type,handler){
			if(document.addEventListener){
				target.addEventListener(type,handler,false);
			}
			else{
				target.attachEvent('on'+type,function(event){
					return handler.call(target,event);
				});
			}
		},
		on:function(type,callback){
			this.addEvent(this.elems,type,callback);
		},













		ready:function(callback){
			this.elems.onload=callback;
		}
	}
	window.$=function(){
		return new fnClass(arguments[0]);
	}
}());