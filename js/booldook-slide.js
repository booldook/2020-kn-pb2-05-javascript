var Slide = function(arg) {
	this.slide = arg.slide;
	this.$slides = [];
	this.container = arg.container;
	this.$container = $(this.container);
	this.direction = arg.direction || 'hori';
	this.autoStart = arg.autoStart || false;
	this.gapSpeed = arg.gapSpeed || 3000;
	this.aniSpeed = arg.aniSpeed || 500;
	this.$container.css({
		"border": "1px solid red",
		"position": "relative",
		// "overflow": "hidden"
	});
	this.$wrapper = $('<div class="booldook-wrapper booldook-'+this.direction+'"></div>').appendTo(this.$container);
	this.now = 0;
	this.last = this.slide.length - 1;

	this.init();
	return this;
}

Slide.prototype.init = function(){
	var html = '';
	for(var i=0; i<this.slide.length; i++) {
		html  = '<div class="booldook-slide">';
		html += '<img src="'+this.slide[i]+'" class="img">';
		html += '</div>';
		this.$slides.push($(html).appendTo(this.$wrapper));
	}
	if(this.direction === 'hori' || this.direction === 'vert') {
		this.$slides.push($(this.$slides[0].clone()).appendTo(this.$wrapper));
		this.last = this.slide.length;
	}
	this.$btnPrev = $('<div class="booldook-btn booldook-prev">〈</div>').appendTo(this.$container);
	this.$btnNext = $('<div class="booldook-btn booldook-next">〉</div>').appendTo(this.$container);
	this.startInit();
}

Slide.prototype.startInit = function() {

}