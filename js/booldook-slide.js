var Slide = function (arg) {
	this.slide = arg.slide; // 이미지 경로(배열)
	this.title = arg.slideTitle || null; // 타이틀 내용(배열)
	this.$slides = []; // 생성될 .booldook-slide(jQuery객체)를 저장할 배열
	this.container = arg.container; // 사용자가 만든 html(여기에 모든 내용이 담김)
	this.$container = $(this.container); // 사용자가 만든 html을 jQuery객체로 만듬
	this.direction = arg.direction || 'hori'; // 슬라이드 타입(hori|vert|fade|step)
	this.gapSpeed = arg.gapSpeed || 3000; // 자동실행(interval) 간격
	this.aniSpeed = arg.aniSpeed || 500; // 애니메이션 속도
	this.autoUse = arg.autoUse || false; // 자동실행 여부
	this.btnUse = arg.btnUse || true; // 좌, 우 버튼 사용 여부
	this.pagerUse = arg.pagerUse || false; // 페이저 사용 여부
	this.now = 0; // 선택된 슬라이드 index
	this.last = 0; // 슬라이드 중 마지막 index
	this.$btnNext = null; // Next 버튼
	this.$btnPrev = null; // Prev 버튼
	this.$pagers = null; // pager-wrapper
	this.interval = null; // interval이 담길 변수

	this.slideCnt = arg.slideCnt || 4; // step형에서 화면에 보여질 슬라이드 개수
	this.slideMargin = arg.slideMargin || 0 // step형에서 슬라이드의 가로마진(px)
	this.slideValue = {} // step형에서 슬라이드의 css값

	this.init();
	return this;
}

Slide.prototype.init = function () {

	// 사용자가 지정한 stage에 css 적용
	this.$container.css({ "position": "relative", "overflow": "hidden" });

	// stage에 슬라이드를 감싸는 booldook-wrapper를 생성
	this.$wrapper = $('<div class="booldook-wrapper booldook-' + this.direction + '"></div>').appendTo(this.$container);

	// booldook-wrapper에 booldook-slide들을 만드는 과정
	for (var i = 0, html = ''; i < this.slide.length; i++) {
		if(this.direction == 'step') 
			html = '<div class="booldook-slide" style="background-image: url(\'' + this.slide[i] + '\');">';
		else
			html = '<div class="booldook-slide">';
		html += '<img src="' + this.slide[i] + '" class="w100">';
		if (this.title && this.title[i]) html += this.title[i];
		html += '</div>';

		// hori, vert 형은 booldook-wrapper에 실제 태그를 넣어놔야 되므로... 
		// 1. 실제태그도 붙이고 
		// 2. this.$slides배열에도 추가한다.
		if (this.direction === 'hori' || this.direction === 'vert') {
			this.$slides.push($(html).appendTo(this.$wrapper));
		}

		// fade형, step형은 this.$slides에만 태그를 넣어놓는다.
		if (this.direction === 'fade' || this.direction == 'step') this.$slides.push($(html));
	}
	// for 끝

	// hori, vert type은 0번태그를 복제하여 마지막에 붙여 놓는다.
	if (this.direction === 'hori' || this.direction === 'vert') {
		this.$slides.push($(this.$slides[0].clone()).appendTo(this.$wrapper));
		if (this.title) this.title.push(this.title[0]); // 타이틀 0번을 마지막에 복제
	}
	// fade type은 0번 슬라드를 booldook-wrapper에 붙인다.
	if (this.direction === 'fade') $(this.$slides[0].clone()).appendTo(this.$wrapper);

	// slide의 마지막 index를 구한다.
	this.last = this.$slides.length - 1;

	// 좌,우 버튼을 생성하고 이벤트를 적용한다.
	if (this.btnUse) {
		this.$btnPrev = $('<div class="booldook-btn booldook-prev">〈</div>').appendTo(this.$container);
		this.$btnNext = $('<div class="booldook-btn booldook-next">〉</div>').appendTo(this.$container);
		// click(cb)안의 콜백함수(cb)는 this가 클릭메서드의 객체이므로 bind(this)를 통해서 Slide자신을 보낸다.
		this.$btnPrev.click(this.onPrevClick.bind(this));
		this.$btnNext.click(this.onNextClick.bind(this));
	}

	// pager 생성 및 이벤트 적용
	if (this.pagerUse) {

		// booldook-pagers를 this.$container에 생성한다.
		this.$pagers = $('<div class="booldook-pagers"></div>').appendTo(this.$container);

		// 각각의 pager를 생성하고 클릭 이벤트를 적용한다.
		for (var i in this.slide) {
			$('<div class="booldook-pager"></div>').appendTo(this.$pagers).click(this.onPagerClick.bind(this));
		}

		// 0번 idx에 .active 클래스를 적용한다.
		this.$pagers.find(".booldook-pager").eq(0).addClass("active");
	}

	// 자동실행 적용 및 이벤트 등록
	if (this.autoUse) {

		// clearInterval()
		this.$container.mouseover(this.onMouseOver.bind(this));

		// setInterval()
		this.$container.mouseleave(this.onMouseLeave.bind(this)).trigger("mouseleave");
	}

	if (this.direction !== 'step') {
		// 보이지 않으나 이미지 하나를 this.$container에 붙여서 높이를 생성한다.
		html = '<img src="' + this.slide[0] + '" style="width: 100%; opacity: 0;">';
		this.$container.append(html);
	}
	else {
		this.startInit();
		$(window).resize(function () {
			var w = $(window).innerWidth();
			var cnt = this.slideCnt;
			if (w > 1199) this.stepCalc(cnt);
			if (w <= 1199 && w > 991) this.stepCalc(cnt - 1 < 1 ? 1 : cnt - 1);
			if (w <= 991 && w > 767) this.stepCalc(cnt - 2 < 1 ? 1 : cnt - 2);
			if (w <= 767 && w > 575) this.stepCalc(cnt - 3 < 1 ? 1 : cnt - 3);
			if (w <= 575) this.stepCalc(cnt - 4 < 1 ? 1 : cnt - 4);
		
			this.$wrapper.css({
				"left": this.slideValue.leftValue + "%",
				"width": this.slideValue.parentWidth + "%",
			});
			this.$wrapper.find('.booldook-slide').css({
				"flex": "calc(" + this.slideValue.childWidth + "% - " + this.slideMargin + "px) 0 0",
				"margin": "0 " + this.slideMargin / 2 + "px"
			});
		}.bind(this)).trigger("resize");
	}
}

Slide.prototype.startInit = function () {
	$(this.$slides[this.now].clone()).appendTo(this.$wrapper.empty().attr("style", ""));
}

// prev버튼 클릭이벤트 콜백
Slide.prototype.onPrevClick = function (e) {
	if (this.now == 0) {
		if (this.direction === 'hori' || this.direction === 'vert') {
			this.now = this.last - 1;
			this.$wrapper.css(this.direction === 'hori' ? 'left' : 'top', -100 * this.last + "%");
		}
		if (this.direction === 'fade') this.now = this.last;
	} else this.now--;
	this.ani();
}

// next버튼 클릭이벤트 콜백
Slide.prototype.onNextClick = function () {
	if (this.now == this.last) {
		if (this.direction === 'hori' || this.direction === 'vert') {
			this.now = 1;
			this.$wrapper.css(this.direction === 'hori' ? 'left' : 'top', 0);
		}
		if (this.direction === 'fade') this.now = 0;
	} else this.now++;
	this.ani();
}

// pager버튼 클릭이벤트 콜백
Slide.prototype.onPagerClick = function (e) {
	this.now = $(e.currentTarget).index();
	this.ani();
}

// interval 이벤트 콜백
Slide.prototype.onInterval = function () {
	this.$btnNext.trigger("click");
}

// this.$container 의 mouseover이벤트 콜백
Slide.prototype.onMouseOver = function () {
	clearInterval(this.interval);
}

// this.$container 의 mouseleave이벤트 콜백
Slide.prototype.onMouseLeave = function () {
	this.interval = setInterval(this.onInterval.bind(this), this.gapSpeed);
}

// booldook-wrapper의 animation
Slide.prototype.ani = function () {
	if (this.pagerUse) {
		this.$pagers.find(".booldook-pager").eq(this.now).addClass("active").siblings().removeClass("active");
		if (this.direction === 'hori' || this.direction === 'vert') {
			if (this.now == this.last) this.$pagers.find(".booldook-pager").eq(0).addClass("active").siblings().removeClass("active");
		}
	}
	if (this.direction === 'hori') {
		this.$wrapper.stop().animate({
			"left": -100 * this.now + "%"
		}, this.aniSpeed);
	}
	if (this.direction === 'vert') {
		this.$wrapper.stop().animate({
			"top": -100 * this.now + "%"
		}, this.aniSpeed);
	}
	if (this.direction === 'fade') {
		$(this.$slides[this.now].clone())
			.appendTo(this.$wrapper)
			.css("opacity", 0)
			.stop()
			.animate({
				"opacity": 1
			}, this.aniSpeed, function () {
				$(this).prev().remove();
			});
	}
}


Slide.prototype.stepCalc = function(cnt) {
	this.slideValue.leftValue = (-100 / cnt).toFixed(4);
	this.slideValue.parentWidth = (Math.abs(this.slideValue.leftValue) * 2 + 100).toFixed(4);
	this.slideValue.childWidth = (100 / (cnt + 2)).toFixed(4);
}