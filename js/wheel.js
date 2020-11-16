var Wheel = (function() {
	function Wheel(el, cb) {
		var elem = el;
		var marker = true;
		var delta;
		var direction;
		var interval = 20;
		var counter1 = 0;
		var counter2;

		elem.addEventListener('wheel', onWheel, {passive: true});

		function onWheel(e){
			counter1++;
			delta = e.deltaY;
			direction = delta > 0 ? 'down' : 'up';
			if(marker) wheelStart(e);
			return false;
		}
		function wheelStart(e){
			marker = false;
			wheelAct(e);
		}
		function wheelAct(e){
			counter2 = counter1;
			setTimeout(function(){
				if (counter2 == counter1) wheelEnd(e);
				else wheelAct(e);
			}, interval);
		}
		function wheelEnd(e){
			cb(direction, e);
			marker = true;
			counter1 = 0;
			counter2 = false;
		}
	}
	return Wheel;
})();