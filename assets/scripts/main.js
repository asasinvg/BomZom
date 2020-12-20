let resultCount = 0;
let currentQuestion = 0;

initTest();

function initTest() {
	document.getElementById('js-totalQuestionCount').innerText = questions.length; // кладем длину массива в свойстве иннер текст, который отображается на странице
	setQuestionData();
}

function setQuestionData() {
	document.getElementById('js-questionText').innerText = questions[currentQuestion].questionText; //текст, который отобразится на странице
	document.getElementById('js-questionNumber').innerText = currentQuestion + 1;
	document.getElementById('js-answers').innerHTML = getAnswersMarkDown(questions[currentQuestion].answers);
}

function getAnswersMarkDown(answers) {
	let result = '';

	answers.forEach(answer => { //создаем переменную answer и в нее попадает элемент массива с i
		 result += '<li><button class="button" onclick="onAnswerClick(' + answer.value + ')">' + answer.answerText +'</button></li>';
	})
	
	return result;
}

function onAnswerClick(answerValue) {
	resultCount += answerValue;
	currentQuestion++;

	if (currentQuestion < questions.length) {
		setQuestionData();
	} else {
		showResult();
	}
}

function showResult() {
	document.getElementById('js-question').classList.add('-hidden');
	document.getElementById('js-result').classList.remove('-hidden');

	let result;

	if (resultCount < 3) {
		result = resultData.zoomer;
	} else if (resultCount < 6) {
		result = resultData.millennial;
	} else if (resultCount < 9) {
		result = resultData.generationX;
	} else {
		result = resultData.boomer;
	}

	document.getElementById('js-resultTitle').innerText = result.title;
	document.getElementById('js-resultImage').src = result.image;
	document.getElementById('js-resultDescription').innerText = result.desc;

	document.getElementById('js-resultShare').innerHTML = VK.Share.button(
		{
			url: 'git.hub/pages',
			title: result.title,
			image: result.image,
			noparse: true
		},
		{
			type: 'round_nocount',
			text: 'расшарить'
		}
	);
}

function startTest() {
	document.getElementById('js-hello').classList.add('-hidden');
	initTest();
	document.getElementById('js-question').classList.remove('-hidden');
}

function restartTest() {
	document.getElementById('js-result').classList.add('-hidden');
	resultCount = 0;
	currentQuestion = 0;
	initTest();
	document.getElementById('js-question').classList.remove('-hidden');
}