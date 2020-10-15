new Slide({
	slide: ['../img/slide-0.jpg', '../img/slide-1.jpg', '../img/slide-2.jpg', '../img/slide-3.jpg'],
	slideTitle: [
		'<div class="title">Hello Booldook1</div>',
		'<div class="title">Hello Booldook2</div>',
		'<div class="title">Hello Booldook3</div>',
		'<div class="title">Hello Booldook4</div>'
	],
	container: ".main-stage",
	direction: "hori",	// hori(default), vert, fade
	gapSpeed: 4000,			// 3000(default)
	aniSpeed: 500,			// 500(default)
	autoUse: true,			// false(default), true
	btnUse: true,				// true(default), false
	pagerUse: true			// false(default), true
});

var slide = new Slide({
	slide: ['../img/home-2.jpg', '../img/home-3.jpg', '../img/home-4.jpg'],
	container: ".prd-stage",
	direction: "vert",
	autoUse: false,
	btnUse: true,
	pagerUse: true
});

console.log(slide);

new Slide({
	slide: ['../img/home-2.jpg', '../img/home-3.jpg', '../img/home-4.jpg'],
	container: ".fade-stage",
	direction: "fade",
	autoUse: true,
	btnUse: true,
	pagerUse: true
});


new Slide({
	slide: ['../img/slide-0.jpg', '../img/slide-1.jpg', '../img/slide-2.jpg', '../img/slide-3.jpg', '../img/home-1a.jpg', '../img/home-2.jpg', '../img/home-3.jpg'],
	slideTitle: [
		'<div class="title">1</div>',
		'<div class="title">2</div>',
		'<div class="title">3</div>',
		'<div class="title">4</div>',
		'<div class="title">5</div>',
		'<div class="title">6</div>',
		'<div class="title">7</div>'
	],
	container: ".step-stage",
	direction: "step",	// hori(default), vert, fade
	gapSpeed: 4000,			// 3000(default)
	aniSpeed: 200,			// 500(default)
	autoUse: true,			// false(default), true
	btnUse: true,				// true(default), false
	pagerUse: true,			// false(default), true
	slideCnt: 5,				// 5(default)
	slideMargin: 16			// 0(default), px단위
});



