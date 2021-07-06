let player;
let summs = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];

let questions = [
  {
    question: "Досліди якого вченого дали можливість утвердити ядерну модель атома?",
    answers: ["Нільс Бор", "Столєтов", "Правильно", "Макс Планк"],
    trueAnswer: 2
  },
  {
    question: "Яке явище наводить на думку про складну будову атома?",
    answers: ["Правильно", "Корозія металу", "Північне сяйво", "Білі ночі"],
    trueAnswer: 0
  },
  {
    question: "Протони і нейтрони в ядрі атому називають:",
    answers: ["Тестостерони", "кварки", "баріони", "Правильно"],
    trueAnswer: 3
  },
  {
    question: "Ядерні сили - це сили:",
    answers: ["електромагнітної природи", "далекодіючі", "Правильно", "електричної природи"],
    trueAnswer: 2
  },
  {
    question: "Якому принципу підкоряється заповнення ядерних оболонок?",
    answers: ["Принипу Френеля", "Принципу відповідності", "Правильно", "Принципу совісті"],
    trueAnswer: 2
  },
  {
    question: "Що називають квантами ядерного поля?",
    answers: ["Правильно", "Кварки", "Баріони", "Нейтрино"],
    trueAnswer: 0
  },
  {
    question: "Відношення енергії зв'язку до масового числа називають:",
    answers: ["Питома енергія", "Питома атомної маси", "Питома енергія виходу", "Правильно"],
    trueAnswer: 3
  },
  {
    question: "Під керівництвом якого вченого у 1942 році була здійснена перша керована ядерна реакція?",
    answers: ["Ернест Резерфорд", "Фредерік Кюрі", "Правильно", "Нікола Тесла"],
    trueAnswer: 2
  },
  {
    question: "Завдяки якому ізотопу визначають різну радіоактивність чоловіків і жінок?",
    answers: ["Правильно", "Калій-39", "Калій-41", "Уран-239"],
    trueAnswer: 0
  },
  {
    question: "Яка реакція відбувається в ядрі Сонця?",
    answers: ["протон-протонна ядерна", "Правильно", "нейтрон-протонна термоядерна", "нейтрон-нейтронна термоядерна"],
    trueAnswer: 1
  },
  {
    question: "В якій із 800 млн мумій, які знайдено до сьогодні в Єгипті, зареєстровано радіоактивне випромінювання?",
    answers: ["Хеопс (Хуфу)", "Рамсес ІІ Великий", "Правильно", "Рамсес І"],
    trueAnswer: 2
  },
  {
    question: "Коли було присуджено «Нобелівську премію» подружжю Кюрі?",
    answers: ["січень 1903", "Правильно", "лютий 1903", "грудень 1902"],
    trueAnswer: 1
  },
  {
    question: "Від якої хвороби померла Марія Кюрі?",
    answers: ["рак шлунку", "рак шкіри", "рак дихальних шляхів", "Правильно"],
    trueAnswer: 3
  },
  {
    question: "Скільки енергії виділяється в протон-протонній (синтез гелію) реакції?",
    answers: ["Правильно", "1.76 МеВ", "176 МеВ", "178 МеВ"],
    trueAnswer: 0
  },
  {
    question: "Яке з даних чисел не є 'магічним'",
    answers: ["2", "Правильно", "126", "8"],
    trueAnswer: 1
  }
]; //let questions



function generateQuestion(currenQuestion, hint) {

  let quest = player.name + " У вас на рахунку " + player.amount + ". Незгораєма сума " + player.nonAmount + "\n\n";
  quest += currenQuestion.question + "\n"; //Запитання
  let len = currenQuestion.answers.length;

  if (hint == undefined) {
    for (i = 0; i < len; i++) {
      quest += i + ". " + currenQuestion.answers[i] + "\n"; //Відповіді
    }

    if (player.hint == false) {
      quest += len + ". Підказка 50/50";
    }
  }

  else {
    let randAnswer = Math.floor(Math.random() * len);
    let trueAnswer = currenQuestion.trueAnswer;
    while (randAnswer == trueAnswer) {
      randAnswer = Math.floor(Math.random() * len);
    }

    if (trueAnswer < randAnswer) {
      quest += trueAnswer + "." + currenQuestion.answers[trueAnswer] + "\n";
      quest += randAnswer + "." + currenQuestion.answers[randAnswer] + "\n";
    }
    else{
      quest += randAnswer + "." + currenQuestion.answers[randAnswer] + "\n";
      quest += trueAnswer + "." + currenQuestion.answers[trueAnswer] + "\n";
    }
  }

  return quest;

}

function askQuestion() {
  num = Math.floor(Math.random() * questions.length);
  let currenQuestion = questions[num];
  let ans = +prompt(generateQuestion(currenQuestion));
  let len = currenQuestion.answers.length;


  if (ans == len && player.hint == false) {
    player.hint = true;
    ans = +prompt(generateQuestion(questions[num], "hint"));
  }

  return (ans == currenQuestion.trueAnswer);
}


function game() {

  while (askQuestion()) {
    player.amount = summs[player.answeredQuestions];
    player.answeredQuestions++;

    player.nonAmount = player.answeredQuestions >= 5 && player.answeredQuestions < 10 ? 1000 : player.nonAmount;
    player.nonAmount = player.answeredQuestions >= 10 && player.answeredQuestions < 15 ? 32000 : player.nonAmount;
    player.nonAmount = player.answeredQuestions == 15 ? 1000000 : player.nonAmount;

    if (player.answeredQuestions == summs.length) {
      break;
    }
  }

  if (player.nonAmount > 0) {
    alert("Вітаємо " + player.name + ". Ви виграли " + player.nonAmount + " грн.");
  }
  else {
    alert("Ви програли");
  }

  if (confirm("Почати гру заново?")) {
    newGame();
  };

}

function createPlayer() {
  let name = prompt("Введіть ваше ім'я");
  return {
    name,
    amount: 0,
    nonAmount: 0,
    answeredQuestions: 0,
    hint: false
  }
}

function newGame() {
  player = createPlayer();
  game();
}


newGame();
