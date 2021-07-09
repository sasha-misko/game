let player, currenQuestion, askedQuestions = [];
let summs = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
let playerPoints = document.getElementById("points");

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

function win() {
  alert("Вітаємо " + player.name + ". Ви виграли 1 000 000");
  if (confirm("Почати гру заново?")) {
    newGame();
  };
}

function gameOver() {
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

function takeMoney() {
  alert("Вітаємо. Ви виграли " + player.amount + " грн.");
  if (confirm("Почати гру заново?")) {
    newGame();
  };
}


function hideThis(hide){
  document.getElementById(hide).style.visibility = 'hidden';
}

function showThis(textToShow){
  document.getElementById("blockToShow").firstElementChild.innerText = textToShow;
  document.getElementById("blockToShow").style.visibility = "visible";
}

function hint(hintNumber) {
  let trueAnswer = currenQuestion.trueAnswer;
  let randAnswer = Math.floor(Math.random() * 4);
  while (randAnswer == trueAnswer) {
    randAnswer = Math.floor(Math.random() * 4);
  }
  document.getElementById("hint" + hintNumber).setAttribute('disabled', true);


  switch (hintNumber) {
    case 1:
      for (let i = 0; i < 4; i++) {
        if (i != randAnswer && i != trueAnswer) {
          document.getElementById("answer" + i).style = "visibility: hidden";
        }
      }
      break;

    case 2:
      //У 80% друг правий
      let friendAnswer = Math.floor(Math.random() * 11) < 9 ? trueAnswer : randAnswer;
      showThis("Друг думає що це № " + ++friendAnswer);
      break;

    case 3:
      // Правильна відповідь завжди в діапазоні 40-60%
      let answerTrue = Math.floor(Math.random() * (61 - 40) ) + 40;
      let remains = 100;
      remains -= answerTrue;
      let viewersHelp = "";

      for (let i = 0; i < 4; i++) {
        if(i == trueAnswer){
          viewersHelp += `${i+1}. - ${answerTrue}% \n`;
        }
        else{
          let answer = i != 3 ? Math.floor(Math.random() * remains): remains;
          remains -=answer;
          viewersHelp += `${i+1}. - ${answer}% \n`;
        }
      }
      showThis(viewersHelp);
      break;

    default:
      break;
  }

}

function answer(q) {
  if (q != currenQuestion.trueAnswer) {
    return gameOver();
  };

  player.amount = summs[player.answeredQuestions];
  if (player.amount == 1000 || player.amount == 32000) {
    player.nonAmount = player.amount;
  }
  player.answeredQuestions++;

  playerPoints.innerText = " У вас на рахунку " + player.amount + ". Неспалима сума " + player.nonAmount;

  if (player.answeredQuestions == summs.length) {
    win();
  }
  else {
    generateQuestion();
  }
}

function generateQuestion() {
  for (let i = 0; i < 4; i++) {
    document.getElementById("answer" + i).style = "visibility: visible";
  }

  num = Math.floor(Math.random() * questions.length);
  while (askedQuestions.includes(num)) {
    num = Math.floor(Math.random() * questions.length);
  }
  askedQuestions.push(num);

  currenQuestion = questions[num];
  document.getElementById("question").innerText = currenQuestion.question;

  for (i = 0; i < 4; i++) {
    let butt = "answer" + i;
    document.getElementById(butt).innerText = (i + 1) + ". " + currenQuestion.answers[i];
  }
}

function createPlayer() {
  let name = prompt("Введіть ваше ім'я");
  if(!name){name = "Player"};
  document.getElementById("name").innerText = "Ім'я гравця - " + name;
  return {
    name,
    amount: 0,
    nonAmount: 0,
    answeredQuestions: 0
  }
}

function newGame() {
  document.getElementById("hint1").removeAttribute('disabled');
  document.getElementById("hint2").removeAttribute('disabled');
  document.getElementById("hint3").removeAttribute('disabled');
  askedQuestions = [];
  player = createPlayer();
  playerPoints.innerText = " У вас на рахунку " + player.amount + ". Неспалима сума " + player.nonAmount;
  generateQuestion();
}

newGame();
