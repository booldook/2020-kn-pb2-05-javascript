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
