$(function() {
	var Page = {
		init: function() {
			this.fnNavSetting();
		},
		fnNavSetting: function() {
			var oMyPay = $("#my_pay");
			oMyPay.on('mouseenter', function() {
				$(this).addClass("li_mouseenter").find("ul").show();
				$(this).find("span").addClass("span_top");
			});
			oMyPay.on('mouseleave', function() {
				$(this).removeClass("li_mouseenter").find("ul").hide();
				$(this).find("span").removeClass("span_top");
			});
			$(".nav_wrap li").not(":first").on('mouseenter', function() {
				$(this).find(".nav_table_wrap").show();
			});
			$(".nav_wrap li").not(":first").on('mouseleave', function() {
				$(this).find(".nav_table_wrap").hide();
			});
		}
	}
	Page.init();
});