var WheelFn = (function() {
	function WheelFn(el, cb) {
		var elem = el;
		var marker = true;
		var delta;
		var direction;
		var interval = 50;
		var counter1 = 0;
		var counter2;
		var now;

		elem.addEventListener('wheel', wheel);

		function wheel(e){
			counter1 += 1;
			delta = e.deltaY;
			if (delta > 0) {direction = 'up'} else {direction = 'down'}
			if (marker) {wheelStart()}
			return false;
		}
		function wheelStart(){
			marker = false;
			wheelAct();
		}
		function wheelAct(){
			counter2 = counter1;
			setTimeout(function(){
				if (counter2 == counter1) {
					wheelEnd();
				} else {
					wheelAct();
				}
			},interval);
		}
		function wheelEnd(){
			cb(direction);
			marker = true;
			counter1 = 0;
			counter2 = false;
		}
	}
	return WheelFn;
})();