
document.getElementById('operation').addEventListener('change', generateQuestion);
document.getElementById('range').addEventListener('change', generateQuestion);

function getRandomNumber(range) {
    return Math.floor(Math.random() * range) + 1;
}

// генерируем новый вопрос
function generateQuestion() {
    const range = parseInt(document.getElementById('range').value); // диапазон
    const operation = document.getElementById('operation').value; 
    const num1 = getRandomNumber(range); 
    const num2 = getRandomNumber(range); 

    // обновляем елементы на странице
    document.getElementById('num1').innerText = num1;
    document.getElementById('num2').innerText = num2;
    document.getElementById('operationSymbol').innerText = operation;
    document.getElementById('answer').value = ''; // очистка инпута для ввода ответа
}

// проверяем ответ
function checkAnswer() {
    const num1 = parseInt(document.getElementById('num1').innerText); 
    const num2 = parseInt(document.getElementById('num2').innerText); 
    const operation = document.getElementById('operationSymbol').innerText; 
    const answerInput = document.getElementById('answer'); 
    const userAnswer = parseFloat(answerInput.value); // ответ юзера

    // Проверка пустой инпут
    if (answerInput.value.trim() === '') {
        alert('נא להזין תשובה'); // Сообщение, если поле пустое
        return;
    }

    let correctAnswer;

    // Расчет правильного ответа в зависимости от выбранного оператора
    switch (operation) {
        case '+': correctAnswer = num1 + num2; break;
        case '-': correctAnswer = num1 - num2; break;
        case '*': correctAnswer = num1 * num2; break;
        case '/': correctAnswer = (num2 !== 0) ? (num1 / num2).toFixed(2) : 'NaN'; break;
    }

    let result;
    // оцена правильного ответа
    if (userAnswer === parseFloat(correctAnswer)) {
        result = '10';
    } else {
        result = '0';
    }

    // добавляем результат 
    const row = document.createElement('tr');
    row.innerHTML = `<td>${num1} ${operation} ${num2}</td>
                     <td>${correctAnswer}</td>
                     <td>${userAnswer}</td>
                     <td>${result}</td>
                    `;
    document.querySelector('#resultsTable tbody').appendChild(row);

    // создаем новый вопрос
    generateQuestion();
}

// задаем уравнение сразу после загрузки 
generateQuestion();
