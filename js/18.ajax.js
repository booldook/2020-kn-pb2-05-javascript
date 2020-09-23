var scores = {
	students: [
		{
			name: "홍 길동",
			kor: 95,
			eng: 80,
			math: 92
		},
		{
			name: "홍 길순",
			kor: 90,
			eng: 75,
			math: 90
		},
		{
			name: "홍 길만",
			kor: 65,
			eng: 85,
			math: 88
		},
	],
	total: 3
}

var scoresJSON = JSON.stringify(scores);

console.log(scores);
console.log(scoresJSON);