$(".navi").mouseenter(onEnter);
$(".navi").mouseleave(onLeave);

function onEnter() {
	//$(this).find(".sub-wrap").stop().show(500, function() {$(this).css("display", "flex");});
	$(this).find(".sub-wrap").stop().slideDown(500, function() {$(this).css("display", "flex");});
	//$(this).find(".sub-wrap").stop().fadeIn(500, function() {$(this).css("display", "flex");});
}

function onLeave() {
	//$(this).find(".sub-wrap").stop().hide(500);
	$(this).find(".sub-wrap").stop().slideUp(500);
	//$(this).find(".sub-wrap").stop().fadeOut(500);
}

