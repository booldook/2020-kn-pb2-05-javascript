$(".top-lt").mouseenter(onEnter);
$(".top-lt").mouseleave(onLeave);
function onEnter() {
	$(this).find(".sub-wrap").stop().slideDown(500, function(){
		$(this).css("display", "flex");
	});
}
function onLeave() {
	$(this).find(".sub-wrap").stop().slideUp(500);
}