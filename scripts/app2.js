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
	new Result("Если вы предпочитаете яркие и заметные цвета, то рекомендуется выбрать кроссовки с яркой расцветкой, такой как оранжевый, розовый или ярко-синий. Такие кроссовки помогут вам выделиться из толпы и добавят вашему образу яркие акценты.", 2),
	new Result("Если вы предполагаете постоянно выделятся на фоне серой массы, то рекомендуется для спорта выбрать такие нестандартные цвета, как зеленый, красный, фиолетовый и другие не менее яркие сочетания.", 4),
	new Result("Если вы хотите кроссовки, которые будут подходить к максимальному количеству вашей одежды, то лучше выбрать кроссовки с несколькими цветами в сочетании, такие как черно-белые, серо-голубые или серо-розовые. Такие цветовые сочетания универсальны и легко сочетаются с различными цветами одежды.", 5),
	new Result("Если вы склонны к более спокойным и классическим цветам, то лучше выбрать кроссовки белого, серого или черного цвета. Такие цвета подходят к любой одежде и подчеркивают ваш стиль без лишней экспрессивности.", 7),
	new Result("Если вы подбираете кроссовки для классических образов, то однозначно в них должны преобладать оттенки черного, белого, коричневого и при этом дожны быть как минимум небольшие кожаные вставки ( например, язычок).", 6),
	new Result("Если вы любите спортивный стиль, то можно выбрать кроссовки в традиционных спортивных цветах, таких как белый, черный, серый, синий или бордовый. Эти цвета традиционно используются в спортивной одежде и создают общую атмосферу динамизма и движения.", 8)
];

//Массив с вопросами
const questions = 
[
	new Question("Какой цвет одежды вы обычно предпочитаете?", 
	[
		new Answer("Яркий и насыщенный", 1),
		new Answer("Пастельный или нейтральный", 4),
		new Answer("Темный или глубокий", 5)

	]),

	new Question("Какого вида предпочитаете кроссовки?", 
	[
		new Answer("Универсальные (повседневные)", 1),
		new Answer("Спортивные (тренировочные)", 3),

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