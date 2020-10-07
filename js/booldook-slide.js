var Slide = function(arg) {
	this.slides = arg.slide;
	this.container = arg.container;
	this.direction = arg.direction || 'hori';
	this.autoStart = arg.autoStart || false;
	this.gapSpeed = arg.gapSpeed || 3000;
	this.aniSpeed = arg.aniSpeed || 500;
	$(this.container).css({
		"position": "relative",
		// "overflow": "hidden"
	});
	this.wrapper = $('<div class="booldook-wrapper booldook-'+this.direction+'"></div>').appendTo($(this.container));
	this.init();
	return this;
}

Slide.prototype.init = function(){
	var html = '';
	for(var i=0; i<this.slides.length; i++) {
		html  = '<div class="booldook-slide">';
		html += '<img src="'+this.slides[i]+'" class="img">';
		html += '</div>';
		$(this.wrapper).append(html);
	}
}