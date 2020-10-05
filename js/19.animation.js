/* $(".box1").click(function(){
	if(	$(this).css("animation-name") == 'paused'	){
		$(this).css("animation-play-state", "running");
	}
	else {
		$(this).css("animation-play-state", "paused");
	}
}); */

$(".box1").click(function(){
	console.log($(this).css("animation-name"));
	if(	$(this).css("animation-name") == "none"	){
		$(this).css("animation-name", "box1");
	}
	else {
		$(this).css("animation-name", "none");
	}
});