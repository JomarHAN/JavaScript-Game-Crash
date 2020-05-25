// Challenge 1: Your Age In Days
function clickMe(){
    var ask = prompt("What year were you born...buddy?");
    var days = (2020 - ask) * 365;
    var textContent = document.createTextNode("You are "+days+" days old")
    var h1 = document.createElement("h1");
    h1.appendChild(textContent);
    h1.setAttribute("id","AgeInDay");
    document.querySelector('.result').appendChild(h1);
}
function reset(){
    document.getElementById('AgeInDay').remove();
}

//Challenge 2: Cat Generator
function generate(){
    var img = document.createElement('img');
    img.setAttribute('src','http://thecatapi.com/api/images/get?format=src&type=gif&size=small');
    img.setAttribute('style','height:200px;width:250px;box-shadow: 0 0 15px 0px gray;')
    document.querySelector('.flex-box-cat').appendChild(img)
}

//Challenge 3: Rock, Paper and Scissors
function rpsGame(yourChoice){
    // console.log(yourChoice);
    var humanChoice , botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt())
    results = decideWinner(humanChoice, botChoice); //[0,1]|human lost| bot won
    message = finalMessage(results) //('message': 'You won', 'color': 'green')   
    rpsFrontEnd(humanChoice, botChoice, message)
}

function randToRpsInt(){
    return Math.floor(Math.random()*3)
}
function numberToChoice(number){   
    return array[number];
}

var array = ['rock','paper','scissors']

function decideWinner(humanChoice, botChoice){
    var dataBase = {
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0}
    }
    var yourScore = dataBase[humanChoice][botChoice];
    var botScore = dataBase[botChoice][humanChoice];
    return [yourScore,botScore]
}

function finalMessage([yourScore,botScore]){
    if (yourScore === 0.5) {
        return {'message': 'You Tied!', 'color': 'yellow'}
    } else if(yourScore === 1){
        return {'message': 'You Won!', 'color': 'green'}
    } else{
        return {'message': 'You Lost!', 'color': 'red'}
    }
}

function rpsFrontEnd(humanChoice, botChoice, messagePop){
    var imageChoice = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    var imgHumanChoice = imageChoice[humanChoice];
    var imgBotChoice = imageChoice[botChoice];

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    var botDiv = document.createElement('div');

    humanDiv.innerHTML = `<img src="${imgHumanChoice}" height=150 width=150 style="box-shadow: 0 0 15px 0px blue">`;
    messageDiv.innerHTML = `<h1 height=150 width=150 style="color:${messagePop['color']}">${messagePop['message']}</h1>`;
    botDiv.innerHTML = `<img src="${imgBotChoice}" height=150 width=150 style="box-shadow: 0 0 15px 0px red">`;
    document.getElementById('flex-box-rps-div').appendChild(humanDiv)
    document.getElementById('flex-box-rps-div').appendChild(messageDiv)
    document.getElementById('flex-box-rps-div').appendChild(botDiv)
}

//Challenge 4: Changing the Color All of Buttons

var allButtons = document.getElementsByTagName('button');

var arrayButton = []
for (let i = 0; i < allButtons.length; i++) {
    arrayButton.push(allButtons[i].classList[1])
}

function changeColor(opvalue){
    if (opvalue.value === 'red') {
        changeRed()
    } else if(opvalue.value === 'blue'){
        changeBlue()
    }else if(opvalue.value === 'random'){
        changeRandom()
    } else{
        changeReset()
    }
}

function changeRed(){
    for (let i = 0; i < allButtons.length; i++) {
       allButtons[i].classList.remove(allButtons[i].classList[1])
       allButtons[i].classList.add('btn-danger')  
    }
}

function changeBlue(){
    for (let i = 0; i < allButtons.length; i++) {
       allButtons[i].classList.remove(allButtons[i].classList[1])
       allButtons[i].classList.add('btn-primary')  
    }
}

function changeRandom(){
    for (let i = 0; i < allButtons.length; i++) {
        let colors = ['btn-success','btn-primary','btn-danger','btn-warning'];
        let numbRand = Math.floor(Math.random()*4)
       allButtons[i].classList.remove(allButtons[i].classList[1])
       allButtons[i].classList.add(colors[numbRand])  
    }
}

function changeReset(){
    for (let i = 0; i < allButtons.length; i++) {
       allButtons[i].classList.remove(allButtons[i].classList[1])
       allButtons[i].classList.add(arrayButton[i])  
    }
}

//Challenge 5: BlackJack

document.querySelector('#blackjack-hit-btn').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-btn').addEventListener('click',dealerLogic);

document.querySelector('#blackjack-deal-btn').addEventListener('click',blackjackDeal);

let blackJackGame = {
    'you': {'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer': {'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardsMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnOver':false
}

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3')

function blackjackHit(){
    if (blackJackGame['isStand']===false) {
        var cardChoice = randomCards();
        showCard(cardChoice,YOU);
        updateScore(cardChoice,YOU);
        showScore(YOU)
        blackJackGame['turnOver']=true;
    } 
}

function showCard(card, activePlayer){
    if (activePlayer['score']<=21) {
        var cardImage = document.createElement('img');
        cardImage.src = 'images/'+card+'.png';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    } else {
        showScore(YOU)
    }

}

function randomCards(){
    let randomIndex = Math.floor(Math.random()*13) ;
    return blackJackGame['cards'][randomIndex];
}

function blackjackDeal(){
    if (blackJackGame['turnOver']===false) {
        
        blackJackGame['isStand']=false
        let yourImage = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImage = document.querySelector('#dealer-box').querySelectorAll('img');

        for (let i = 0; i < yourImage.length; i++) {
            yourImage[i].remove();  
        };
        for (let i = 0; i < dealerImage.length; i++) {
            dealerImage[i].remove();  
        };

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector(YOU['scoreSpan']).textContent = 0;
        document.querySelector(YOU['scoreSpan']).style.color = 'white';
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';
        document.querySelector(DEALER['scoreSpan']).textContent = 0;

        document.getElementById('blackjack-result').textContent = "Let's play";
        document.getElementById('blackjack-result').style.color = 'black';

        blackJackGame['turnOver']=false;
    }
}

function updateScore(cards, activePlayer){
    // if adding 11 keeps me below 21, add 11 and otherwise add 1
    if (cards === 'A') {
        if (activePlayer['score']+blackJackGame['cardsMap'][cards][1] <= 21) {
            activePlayer['score'] += blackJackGame['cardsMap'][cards][1];
        } else {
            activePlayer['score'] += blackJackGame['cardsMap'][cards][0];
        }
    } else {
        activePlayer['score'] += blackJackGame['cardsMap'][cards];
    }
}

function showScore(activePlayer){
    if (activePlayer['score']>21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }
}

function asleep(ms){
    return new Promise(resolve =>{
        setTimeout(resolve,ms)
    })
}

async function dealerLogic(){
    if (blackJackGame['turnOver']===true) {
        blackJackGame['isStand']=true
        while (DEALER['score']<16 && blackJackGame['turnOver']===true) {
            
            var cardChoice = randomCards();
            showCard(cardChoice, DEALER);
            updateScore(cardChoice, DEALER);
            showScore(DEALER);

            await asleep(1000);
        }
        if(DEALER['score']>15){
            let winner = computeWinner();
            showResult(winner);
            blackJackGame['turnOver']=false;
        }
    }
}

function computeWinner(){
    let winner;
    if (YOU['score']<=21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackJackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']){
            blackJackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']){
            blackJackGame['draws']++
        }
    } else if (YOU['score'] > 21 && DEALER['score']<=21) {
        blackJackGame['losses']++;
        winner = DEALER;

        } else if (YOU['score'] > 21 && DEALER['score'] > 21){
            blackJackGame['draws']++
        }

    return winner;
    // showResult(winner);
    // console.log(winner)
}

function showResult(winner){
       
        let message , messageColor;
        if (winner===YOU) {
            document.getElementById('wins').textContent = blackJackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER){
            document.getElementById('losses').textContent = blackJackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
        } else {
            document.getElementById('draws').textContent = blackJackGame['draws'];
            message = 'You drew!';
            messageColor = 'yellow'
        }
        document.getElementById('blackjack-result').textContent = message;
        document.getElementById('blackjack-result').style.color = messageColor;
    
}
