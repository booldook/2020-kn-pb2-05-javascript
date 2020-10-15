var Slide = function(arg) {
	this.slide = arg.slide;													// 이미지 경로(배열)
	this.title = arg.slideTitle || null;						// 타이틀 내용(배열)
	this.$slides = [];															// 생성될 .booldook-slide(jQuery객체)를 저장할 배열
	this.container = arg.container;									// 사용자가 만든 html(여기에 모든 내용이 담김)
	this.$container = $(this.container);						// 사용자가 만든 html을 jQuery객체로 만듬
	this.direction = arg.direction || 'hori';				// 슬라이드 타입(hori|vert|fade|step)
	this.gapSpeed = arg.gapSpeed || 3000;						// 자동실행(interval) 간격
	this.aniSpeed = arg.aniSpeed || 500;						// 애니메이션 속도
	this.autoUse = arg.autoUse || false;						// 자동실행 여부
	this.btnUse = arg.btnUse || true;								// 좌, 우 버튼 사용 여부
	this.pagerUse = arg.pagerUse || false;					// 페이저 사용 여부
	this.slideCnt = arg.slideCnt || 4;							// step형에서 화면에 보여질 슬라이드 개수
	this.now = 0;																		// 선택된 슬라이드 index
	this.last = 0;																	// 슬라이드 중 마지막 index
	this.$btnNext = null;														// Next 버튼
	this.$btnPrev = null;														// Prev 버튼
	this.$pagers = null;														// pager-wrapper
	this.interval = null;														// interval이 담길 변수
	
	this.init();
	return this;
}

Slide.prototype.init = function(){
	
	// 사용자가 지정한 stage에 css 적용
	this.$container.css({"position": "relative", "overflow": "hidden"});
	
	// stage에 슬라이드를 감싸는 booldook-wrapper를 생성
	this.$wrapper = $('<div class="booldook-wrapper booldook-'+this.direction+'"></div>').appendTo(this.$container);
	
	// booldook-wrapper에 booldook-slide들을 만드는 과정
	for(var i=0, html=''; i<this.slide.length; i++) {
		html  = '<div class="booldook-slide">';
		html += '<img src="'+this.slide[i]+'" class="img">';
		if(this.title && this.title[i]) html += this.title[i];
		html += '</div>';
		
		// hori, vert 형은 booldook-wrapper에 실제 태그를 넣어놔야 되므로... 
		// 1. 실제태그도 붙이고 
		// 2. this.$slides배열에도 추가한다.
		if(this.direction === 'hori' || this.direction === 'vert') {
			this.$slides.push($(html).appendTo(this.$wrapper));
		}

		// fade형은 this.$slides에만 태그를 넣어놓는다.
		if(this.direction === 'fade') this.$slides.push($(html));
	}	
	// for 끝
	
	// hori, vert type은 0번태그를 복제하여 마지막에 붙여 놓는다.
	if(this.direction === 'hori' || this.direction === 'vert') {
		this.$slides.push($(this.$slides[0].clone()).appendTo(this.$wrapper));
		if(this.title) this.title.push(this.title[0]);	// 타이틀 0번을 마지막에 복제
	}
	// fade type은 0번 슬라드를 booldook-wrapper에 붙인다.
	if(this.direction === 'fade') $(this.$slides[0].clone()).appendTo(this.$wrapper);

	// slide의 마지막 index를 구한다.
	this.last = this.$slides.length - 1;

	// 좌,우 버튼을 생성하고 이벤트를 적용한다.
	if(this.btnUse) {
		this.$btnPrev = $('<div class="booldook-btn booldook-prev">〈</div>').appendTo(this.$container);
		this.$btnNext = $('<div class="booldook-btn booldook-next">〉</div>').appendTo(this.$container);
		// click(cb)안의 콜백함수(cb)는 this가 클릭메서드의 객체이므로 bind(this)를 통해서 Slide자신을 보낸다.
		this.$btnPrev.click(this.onPrevClick.bind(this));	
		this.$btnNext.click(this.onNextClick.bind(this));
	}

	// pager 생성 및 이벤트 적용
	if(this.pagerUse) {
		
		// booldook-pagers를 this.$container에 생성한다.
		this.$pagers = $('<div class="booldook-pagers"></div>').appendTo(this.$container);
		
		// 각각의 pager를 생성하고 클릭 이벤트를 적용한다.
		for(var i in this.slide) {
			$('<div class="booldook-pager"></div>').appendTo(this.$pagers).click(this.onPagerClick.bind(this));
		}

		// 0번 idx에 .active 클래스를 적용한다.
		this.$pagers.find(".booldook-pager").eq(0).addClass("active");
	}

	// 자동실행 적용 및 이벤트 등록
	if(this.autoUse) {
		
		// clearInterval()
		this.$container.mouseover(this.onMouseOver.bind(this));
		
		// setInterval()
		this.$container.mouseleave(this.onMouseLeave.bind(this)).trigger("mouseleave");
	}

	// 보이지 않으나 이미지 하나를 this.$container에 붙여서 높이를 생성한다.
	html = '<img src="'+this.slide[0]+'" style="width: 100%; opacity: 0;">';
	this.$container.append(html);


	this.startInit();
}

Slide.prototype.startInit = function() {

}

// prev버튼 클릭이벤트 콜백
Slide.prototype.onPrevClick= function(e) {
	if(this.now == 0) {
		if(this.direction === 'hori' || this.direction === 'vert') {
			this.now = this.last - 1;
			this.$wrapper.css(this.direction === 'hori' ? 'left' : 'top', -100*this.last+"%");
		}
		if(this.direction === 'fade') this.now = this.last;
	}
	else this.now--;
	this.ani();
}

// next버튼 클릭이벤트 콜백
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

// pager버튼 클릭이벤트 콜백
Slide.prototype.onPagerClick =  function(e) {
	this.now = $(e.currentTarget).index();
	this.ani();
}

// interval 이벤트 콜백
Slide.prototype.onInterval = function() {
	this.$btnNext.trigger("click");
}

// this.$container 의 mouseover이벤트 콜백
Slide.prototype.onMouseOver = function() {
	clearInterval(this.interval);	
}

// this.$container 의 mouseleave이벤트 콜백
Slide.prototype.onMouseLeave = function() {
	this.interval = setInterval(this.onInterval.bind(this), this.gapSpeed);
}

// booldook-wrapper의 animation
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


/*
(function(){
	/*********** 전역변수 선언 ***********
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

	/*********** 사용자 함수 ***********
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

	/*********** 이벤트 콜백 ***********
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

	/*********** 이벤트 등록 ***********
	$wrapper.hover(function(){
		clearInterval(interval);
	}, function(){
		interval = setInterval(onNext, 3000);
	});

})();
*/