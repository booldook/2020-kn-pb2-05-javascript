var Slide = function(arg) {
	this.slide = arg.slide;
	this.title = arg.slideTitle || null;
	if(this.title) this.title.push(this.title[0]);
	this.$slides = [];
	this.container = arg.container;
	this.$container = $(this.container);
	this.direction = arg.direction || 'hori';
	this.gapSpeed = arg.gapSpeed || 3000;
	this.aniSpeed = arg.aniSpeed || 500;
	this.autoUse = arg.autoUse || false;
	this.btnUse = arg.btnUse || true;
	this.pagerUse = arg.pagerUse || false;
	
	this.init();
	return this;
}

Slide.prototype.init = function(){

	this.$container.css({"position": "relative", "overflow": "hidden"});
	this.$wrapper = $('<div class="booldook-wrapper booldook-'+this.direction+'"></div>').appendTo(this.$container);
	this.now = 0;
	for(var i=0, html=''; i<this.slide.length; i++) {
		html  = '<div class="booldook-slide">';
		html += '<img src="'+this.slide[i]+'" class="img">';
		if(this.title && this.title[i]) html += this.title[i];
		html += '</div>';
		
		if(this.direction === 'hori' || this.direction === 'vert') {
			this.$slides.push($(html).appendTo(this.$wrapper));
		}
		if(this.direction === 'fade') this.$slides.push($(html));
	}
	if(this.direction === 'hori' || this.direction === 'vert') {
		this.$slides.push($(this.$slides[0].clone()).appendTo(this.$wrapper));
	}
	if(this.direction === 'fade') $(this.$slides[0].clone()).appendTo(this.$wrapper);
	this.last = this.$slides.length - 1;

	if(this.btnUse) {
		this.$btnPrev = $('<div class="booldook-btn booldook-prev">〈</div>').appendTo(this.$container);
		this.$btnNext = $('<div class="booldook-btn booldook-next">〉</div>').appendTo(this.$container);
		this.$btnPrev.click(this.onPrevClick.bind(this));
		this.$btnNext.click(this.onNextClick.bind(this));
	}

	if(this.pagerUse) {
		this.$pagers = $('<div class="booldook-pagers"></div>').appendTo(this.$container);
		for(var i in this.slide) {
			$('<div class="booldook-pager"></div>').appendTo(this.$pagers).click(this.onPagerClick.bind(this));
		}
		this.$pagers.find(".booldook-pager").eq(0).addClass("active");
	}

	if(this.autoUse) {
		this.$container.mouseover(this.onMouseOver.bind(this));
		this.$container.mouseleave(this.onMouseLeave.bind(this));
		this.interval = setInterval(this.onInterval.bind(this), this.gapSpeed);
	}


	html = '<img src="'+this.slide[0]+'" style="width: 100%; opacity: 0;">';
	this.$container.append(html);

	this.startInit();
}

Slide.prototype.startInit = function() {

}

Slide.prototype.onPrevClick= function(e) {
	if(this.now == 0) {
		if(this.direction === 'hori' || this.direction === 'vert') {
			this.now = this.last - 1;
			this.$wrapper.css(this.direction === 'hori'?'left':'top', -100*this.last+"%");
		}
		if(this.direction === 'fade') this.now = this.last;
	}
	else this.now--;
	this.ani();
}

Slide.prototype.onNextClick = function() {
	if(this.now == this.last) {
		if(this.direction === 'hori' || this.direction === 'vert') {
			this.now = 1;
			this.$wrapper.css(this.direction === 'hori'?'left':'top', 0);
		}
		if(this.direction === 'fade') this.now = 0;
	}
	else this.now++;
	this.ani();
}

Slide.prototype.onPagerClick =  function(e) {
	this.now = $(e.currentTarget).index();
	this.ani();
}

Slide.prototype.onInterval = function() {
	this.$btnNext.trigger("click");
}

Slide.prototype.onMouseOver = function() {
	clearInterval(this.interval);	
}
Slide.prototype.onMouseLeave = function() {
	this.interval = setInterval(this.onInterval.bind(this), this.gapSpeed);
}

Slide.prototype.ani = function() {
	if(this.pagerUse) {
		this.$pagers.find(".booldook-pager").eq(this.now).addClass("active").siblings().removeClass("active");
		if(this.direction === 'hori' || this.direction === 'vert') {
			if(this.now == this.last) this.$pagers.find(".booldook-pager").eq(0).addClass("active").siblings().removeClass("active");
		}
	}
	if(this.direction === 'hori') {
		this.$wrapper.stop().animate({"left": -100*this.now+"%"}, this.aniSpeed);
	}
	if(this.direction === 'vert') {
		this.$wrapper.stop().animate({"top": -100*this.now+"%"}, this.aniSpeed);
	}
	if(this.direction === 'fade') {
		$(this.$slides[this.now].clone())
		.appendTo(this.$wrapper)
		.css("opacity", 0)
		.stop()
		.animate({"opacity": 1}, this.aniSpeed, function(){
			$(this).prev().remove();
		});
	}
}



(function(){
	/*********** 전역변수 선언 ***********/
	var datas = [
		{ id: 0, src: '../img/lx-1-0.jpg', title: '침대1' },
		{ id: 1, src: '../img/lx-1-1.jpg', title: '침대2' },
		{ id: 2, src: '../img/lx-1-2.jpg', title: '침대3' },
		{ id: 3, src: '../img/lx-2-0.jpg', title: '쇼파4' },
		{ id: 4, src: '../img/lx-2-1.jpg', title: '쇼파5' },
		{ id: 5, src: '../img/lx-2-2.jpg', title: '쇼파6' },
		{ id: 6, src: '../img/lx-3-0.jpg', title: '의자1' },
		{ id: 7, src: '../img/lx-3-1.jpg', title: '의자2' },
		{ id: 8, src: '../img/lx-3-2.jpg', title: '의자3' },
		{ id: 9, src: '../img/lx-6-0.jpg', title: '쇼파1' },
		{ id: 10, src: '../img/lx-6-1.jpg', title: '쇼파2' },
		{ id: 11, src: '../img/lx-6-2.jpg', title: '쇼파3' },
	];

	var $wrapper = $(".wrapper8");
	var $slideWrap = $(".slide-wrap", $wrapper); 
	var $btnPrev = $(".btn-prev", $wrapper); 
	var $btnNext = $(".btn-next", $wrapper);
	var $slides = [];		// 모든 .slide
	var idx = 0;
	var lastIdx = datas.length - 1;
	var winWid;					// 현재창의 크기
	var target;
	var interval;

	/*********** 사용자 함수 ***********/
	init();
	function init() {
		var i, html;
		for(i in datas) {
			html  = '<div class="slide">';
			html += '<img src="'+datas[i].src+'" class="w-100">';
			html += '<h1>'+i+'</h1>';
			html += '</div>';
			$slides.push($(html));
		}
		slideInit();
		interval = setInterval(onNext, 3000);
	}

	function slideInit() {
		// $btnPrev.show();
		// $btnNext.show();
		$btnPrev.off("click").click(onPrev);
		$btnNext.off("click").click(onNext);
		$($slides[idx].clone()).appendTo($slideWrap.empty().attr("style", ""));
		if(idx == 0) $($slides[lastIdx].clone()).prependTo($slideWrap);
		else $($slides[idx - 1].clone()).prependTo($slideWrap);
		for(var i=1; i<=4; i++) {
			if(idx + i > lastIdx) $($slides[idx + i - 1 - lastIdx].clone()).appendTo($slideWrap);
			else $($slides[idx + i].clone()).appendTo($slideWrap);
		}
	}

	function ani() {
		$slideWrap.stop().animate({"left": target+"%"}, 500, slideInit);
	}

	/*********** 이벤트 콜백 ***********/
	function onPrev() {
		// $(this).hide();
		$(this).off("click");
		idx = idx == 0 ? lastIdx : idx - 1;
		target = 0;
		ani();
	}
	
	function onNext() {
		// $(this).hide();
		$(this).off("click");
		idx = idx == lastIdx ? 0 : idx + 1;
		winWid = $(window).outerWidth();
		if(winWid < 576) target = -200;
		else if(winWid < 768) target = -100;
		else if(winWid < 992) target = -66.6666;
		else target = -50;
		ani();
	}

	/*********** 이벤트 등록 ***********/
	$wrapper.hover(function(){
		clearInterval(interval);
	}, function(){
		interval = setInterval(onNext, 3000);
	});

})();