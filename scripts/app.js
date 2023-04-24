const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("*Кроссовки с дышащим верхом, чтобы сохранять прохладу и комфорт в жаркую погоду.\n *Кроссовки с ударопоглощающими вставками в подошве для амортизации при беге на асфальте.", 7),
	new Result("*Кроссовки с дышащим верхом, чтобы сохранять прохладу и комфорт в жаркую погоду.\n *Кроссовки с хорошей сцепляемостью для уверенного бега по тротуарной плитке.", 9),
	new Result("*Кроссовки с дышащим верхом, чтобы сохранять прохладу и комфорт в жаркую погоду.\n *Кроссовки с протектором для хорошей сцепляемости на разных поверхностях грунта и газона.", 13),
	new Result("*Кроссовки с теплым подкладом для сохранения тепла в прохладную погоду.\n *Кроссовки с ударопоглощающими вставками в подошве для амортизации при беге на асфальте.", 10),
	new Result("*Кроссовки с теплым подкладом для сохранения тепла в прохладную погоду.\n *Кроссовки с хорошей сцепляемостью для уверенного бега по тротуарной плитке.", 12),
	new Result("*Кроссовки с теплым подкладом для сохранения тепла в прохладную погоду.\n *Кроссовки с протектором для хорошей сцепляемости на разных поверхностях грунта и газона.", 16),
	new Result("*Кроссовки с кожаной и резиновой подкладкой для избежания попадания влаги в них.\n *Кроссовки с ударопоглощающими вставками в подошве для амортизации при беге на асфальте.", 15),
	new Result("*Кроссовки с кожаной и резиновой подкладкой для избежания попадания влаги в них.\n *Кроссовки с хорошей сцепляемостью для уверенного бега по тротуарной плитке.", 17),
	new Result("*Кроссовки с кожаной и резиновой подкладкой для избежания попадания влаги в них.\n *Кроссовки с протектором для хорошей сцепляемости на разных поверхностях грунта и газона.", 21)
];

//Массив с вопросами
const questions = 
[
	new Question("В какую погоду вы хотите надевать кроссовки?", 
	[
		new Answer("Солнечная", 0),
		new Answer("Прохладная", 3),
		new Answer("Дождливая", 8)

	]),

	new Question("По какой поверхности обычно бегаете/ходите?", 
	[
		new Answer("Асфальт", 7),
		new Answer("Тротуарная плитка", 9),
		new Answer("Грунт или газон", 13)

	]),

];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e){ Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

   	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_correct";
	}
	

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}