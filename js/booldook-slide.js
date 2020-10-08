var Slide = function(arg) {
	this.slide = arg.slide;
	this.$slides = [];
	this.container = arg.container;
	this.$container = $(this.container);
	this.direction = arg.direction || 'hori';
	this.autoStart = arg.autoStart || false;
	this.gapSpeed = arg.gapSpeed || 3000;
	this.aniSpeed = arg.aniSpeed || 500;
	
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
	this.$btnPrev = $('<div class="booldook-btn booldook-prev">〈</div>').appendTo(this.$container);
	this.$btnNext = $('<div class="booldook-btn booldook-next">〉</div>').appendTo(this.$container);

	html = '<img src="'+this.slide[0]+'" style="width: 100%; opacity: 0;">';
	this.$container.append(html);
	
	this.$btnPrev.click(this.onPrevClick.bind(this));
	this.$btnNext.click(this.onNextClick.bind(this));
	this.$container.mouseover(this.onMouseOver.bind(this));
	this.$container.mouseleave(this.onMouseLeave.bind(this));
	if(this.autoStart) this.interval = setInterval(this.onInterval.bind(this), this.gapSpeed);


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

Slide.prototype.onInterval = function() {
	this.$btnNext.trigger("click");
}

Slide.prototype.onMouseOver = function() {
	if(this.autoStart) clearInterval(this.interval);	
}
Slide.prototype.onMouseLeave = function() {
	if(this.autoStart) this.interval = setInterval(this.onInterval.bind(this), this.gapSpeed);
}

Slide.prototype.ani = function() {
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
