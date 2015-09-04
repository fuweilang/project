function mainContentTop() {
	this.mainContent = $("#mainContent");
	this.mainConHeight =  $("#mainContent").height();
	this.winHeight = $(window).height();
	this.navbarObj = $("#navbar-example");
	this.dropdownObj = $("#dropDown");
	this.dropDownli = $("#dropDown ul li");
	this.dropDownVal = $("#dropDownBtnVal");
	this.tableOne = $("#tableOne");
	this.tableTwo = $("#tableTwo");
}
/**
 * [点击第index或者第index以上按钮，mainObj容器的高度增加到自适应屏幕高度]
 * @param  {[数值型Number]} index [从第几个按钮开始改变高度]
 * @param  {[对象类型object]} selfObj [自身对象:$(this)]
 * @param  {[对象类型object]} mainObj [要改变高度的对象]
 * @return {[type]}         [description]
 */
mainContentTop.prototype.changeScrollTop = function(index, selfObj, mainObj) {
	if(selfObj.index() >= index) {
		mainObj.css({
			"height": this.mainConHeight  + this.winHeight
		})
	} else {
		mainObj.css({
			"height": this.mainConHeight 
		})
	}
}

/**
 * [自适应屏幕，当屏幕宽度小于等于700，objOne隐藏，objTwo显示；当屏幕宽度大于700，objTwo隐藏，objOne显示。]
 * @return {[type]} [description]
 */
mainContentTop.prototype.objOneOrobjTwo = function(objOne, objTwo) {
	this.htmlWidth = $("html").width();
	if(this.htmlWidth <= 700) {
		objOne.css({
			"display": "none"
		})
		objTwo.css({
			"display": "block"
		})
	} else {
		objTwo.css({
			"display": "none"
		})
		objOne.css({
			"display": "block"
		})
	}
}

/**
 * [点击时间轴小圆图标，让相应的内容div显示或隐藏的功能，带动画效果哦]
 * @param  {[对象类型Object]} obj [被点击的按钮，如：$(".tit")]
 * @return {[type]}     [description]
 */
mainContentTop.prototype.showOrHide = function(obj) {
	var _this = this;
	this.hideFlag = [];
	this.showHeight = [];
	this.titLen = obj.length;
	for (var i = 0; i < this.titLen; i++) {
		this.hideFlag.push(true);
	};
	for (var i = 0; i < this.titLen; i++) {
		obj.eq(i)[0].index = i;
		this.showHeight.push(obj.eq(i).siblings("div").css("height"));
		obj.eq(i).hammer({}).on("tap", function() {
			var index = $(this)[0].index;
			if(_this.hideFlag[index]) {
				$(this).siblings("div").stop(true, true).animate({
					"height": "0"
				}, 400)
				_this.hideFlag[index] = false;
			} else {
				$(this).siblings("div").stop(true, true).animate({
					"height":  _this.showHeight[index]
				}, 400)
				_this.hideFlag[index] = true;
			}
		})
	};	
}

$(document).ready(function() {
	var obj = new mainContentTop();
	
	obj.objOneOrobjTwo(obj.navbarObj, obj.dropdownObj);	
	obj.objOneOrobjTwo(obj.tableOne, obj.tableTwo);	
	$(window).on("resize", function() {
		obj.objOneOrobjTwo(obj.navbarObj, obj.dropdownObj);
		obj.objOneOrobjTwo(obj.tableOne, obj.tableTwo);	
	}) 

	$("#dropDownBtnVal").text("基本信息");

	$("#navBtn li").hammer({}).on("tap", function() {
		$(this).addClass("active").siblings().removeClass("active");
		obj.changeScrollTop(3, $(this), $("#mainContent"));
	})

	obj.dropDownli.hammer({}).on("tap", function() {
		obj.changeScrollTop(3, $(this), $("#mainContent"));
	})

	obj.dropDownli.hammer({}).on("tap", function() {
		obj.dropDownVal.text($(this).text());
	})

	obj.showOrHide($(".tit"));

})



