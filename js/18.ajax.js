function onAjax() {
	$.ajax({
		type: 'get',
		dataType: 'json',
		url: '../json/score.json',
		success: function(r){
			console.log(r);
		}
	});
}

function onAjaxTeacher() {
	// $.get(url, sendData, callBack);
	$.get('http://192.168.0.14:5500/json/score.json', function(r){
		console.log(r);
	});
}

function onWeather() {
	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var data = {
		appid: '02efdd64bdc14b279bc91d9247db4722',
		id: '1835848',
		units: 'metric'
	};
	var success = function(r) {
		console.log(r);
	}
	$.get(url, data, success);
}

$("#btnMy").click(onAjax);
$("#btnTeacher").click(onAjaxTeacher);
$("#btnWeather").click(onWeather);