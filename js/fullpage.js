var now = 0;
new Wheel(document, function(direction, e){
	e.preventDefault();
	var target = e.path.filter(function(v) {
		return $(v).hasClass('page');
	});
	now = $(target[0]).index();
	if(direction == 'up' && now > 0) now--;
	if(direction == 'down' && now < $(".page").length - 1) now++;
	pageAni();
});

function pageAni() {
	$("html, body").stop().animate({"scrollTop": $(".page").eq(now).offset().top+"px"}, 800);
}