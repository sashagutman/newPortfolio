let errors = 0;
const footballClubList = [
    "Arsenal",
    "Blackburn",
    "Chelsea",
    "Everton",
    "Fulham",
    "Leister",
    "Liverpool",
    "Man.U",
    "Middlesbrough",
    "Newcastle",
    "Tottenham",
    "Wolverhampton"
]

var cardSet;
var rows = 4;
var column = 6;
const board = [];
var cardSelected_1 = null;
var cardSelected_2 = null;

window.onload = function () {
    shuffleCards();
    startGame();
}

const btnReset = document.querySelector('.btn-reset');
btnReset.addEventListener('click', () => {
    document.location.reload()
})

function shuffleCards() {
    cardSet = footballClubList.concat(footballClubList); // повторяем по два раза
    // console.log(cardSet);  

    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length) // случайное значение

        let temp = cardSet[i];
        cardSet[i] = cardSet[j]
        cardSet[j] = temp
    }
    console.log(cardSet);

}

function startGame() {
    //arange the board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < column; c++) {
            let cardImg = cardSet.pop()
            row.push(cardImg)

            // создаем <img src="./images"> 
            let card = document.createElement('img');
            card.id = r.toString() + '-' + c.toString();
            card.src = `images/${cardImg}.png`;
            card.classList.add("card");
            card.addEventListener('click', selectCard);
            document.querySelector('.board').append(card)
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hideCards, 2000)
}

function hideCards() {
    //переворачиваем карту
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < column; c++) {
            let card = document.getElementById(r.toString() + '-' + c.toString())
            card.src = './images/Field.png';
        }
    }
}

function selectCard() {
    if (this.src.includes('Field.png')) {
        if (!cardSelected_1) {
            cardSelected_1 = this;

            let coords = cardSelected_1.id.split('-'); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0])
            let c = parseInt(coords[1])

            cardSelected_1.src = `images/${board[r][c]}.png`;
        }
        else if (!cardSelected_2 && this !== cardSelected_1) {
            cardSelected_2 = this;

            let coords = cardSelected_2.id.split('-'); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0])
            let c = parseInt(coords[1])

            cardSelected_2.src = `images/${board[r][c]}.png`
            setTimeout(update, 2000)
        }
    }

}

function update() {
    if (cardSelected_1.src !== cardSelected_2.src) {
        cardSelected_1.src = './images/Field.png';
        cardSelected_2.src = './images/Field.png';
        errors += 1;
        document.getElementById('errors').innerText = errors;
    }

    cardSelected_1 = null;
    cardSelected_2 = null;
}




