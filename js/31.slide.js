new Slide({
	slide: ['../img/slide-0.jpg', '../img/slide-1.jpg', '../img/slide-2.jpg', '../img/slide-3.jpg'],
	container: ".main-stage",
	direction: "hori",	// hori(default), vert, fade
	gapSpeed: 4000,			// 3000(default)
	aniSpeed: 400,			// 500(default)
	autoUse: true,			// false(default), true
	btnUse: true,				// true(default), false
	pagerUse: true			// false(default), true
});

new Slide({
	slide: ['../img/home-2.jpg', '../img/home-3.jpg', '../img/home-4.jpg'],
	container: ".prd-stage",
	direction: "vert",
	autoUse: false,
	btnUse: true,
	pagerUse: true
});

new Slide({
	slide: ['../img/home-2.jpg', '../img/home-3.jpg', '../img/home-4.jpg'],
	container: ".fade-stage",
	direction: "fade",
	autoUse: true,
	btnUse: true,
	pagerUse: true
});


