let playerCounter = 0, playerDrawCards = 0, pcCounter = 0, pcDrawCards = 0, lastCard = '', playerName = "Jugador 1";
let selectedCards = [], playerCardsHistory = [], pcCardsHistory = [];

let cards = [], cardsVals=[];
const types = ['C', 'H', 'S', 'D'];
const majors = ['J', 'Q', 'K', 'A'];

const createDeck = () =>{
    for(let i=2; i<=10; i++){
        for (const type of types) {
            cards.push(i+type);
            cardsVals.push({"id":i+type,  "value":i});
        }

        if(i==10){
            for(const major of majors){
                for(const type of types){
                    cards.push(major+type);
                    if(major!="A"){
                        cardsVals.push({"id":major+type, "value":i});
                    } else {
                        cardsVals.push({"id":major+type, "value":11});
                    }
                }
            }
        }
    }
}

createDeck();
Object.freeze(cards, cardsVals);

const initGame = () => {
    playerName = prompt("Introduce tu nombre de jugador", "Jugador 1");
    if(playerName==null || playerName=="") playerName = "Jugador 1";
    document.getElementById('playerName').innerHTML = playerName;
    clearHand();
    drawHand('player1');
    drawHand('computer');
    evalHands();
}

const randomCard = () => (Math.floor(Math.random() * cards.length));

const getCardValue = (searchedKey) => {
    let index = cardsVals.findIndex(item => item.id === searchedKey);
    return cardsVals[index].value;
}

const drawCard = (player) => {
    let locationDiv = (player=='player1') ? 'playerCards':'pcCards';
    let drawnCardsUI = document.getElementById(locationDiv);
    (player=='player1') ? ++playerDrawCards : ++pcDrawCards;
    cards = _.shuffle(cards);
    let drawFlag = 1;
    while(drawFlag == 1){
        let selectedCard = randomCard();      // We select a card
        // We check if we picked randomly a card that has not been picked before, otherwise it will select a new one in the next iteration
        if(selectedCards.lastIndexOf(selectedCard)==-1){
            drawFlag = 0;
            selectedCards.push(selectedCard);   // We must add the drawn card to a discard array
            lastCard = cards[selectedCard];
            cardValue = getCardValue(lastCard);
            evalIfAce(player, cardValue);   // Check if card selected is an Ace and adjust the counter accordingly
            // We add the card to the history array of the player
            if(player=='player1'){
                playerCardsHistory.push(lastCard);
            } else {
                pcCardsHistory.push(lastCard);
            }
            // We draw the card in the UI
            let liElement = document.createElement('li');
            liElement.innerHTML=`<img src="assets/img/${lastCard}.png" alt="${lastCard}" />`;
            drawnCardsUI.appendChild(liElement);
        }
    }
}

const evalIfAce = (player, cardValue) =>{
    let isAce = lastCard.includes('A') ? true : false;
    if(isAce){
        if(player=='player1'){
            playerCounter += cardValue;
            if(playerCounter > 21){
                playerCounter = playerCounter-10;
            }
        } else {
            pcCounter += cardValue;
            if(pcCounter > 21){
                pcCounter = pcCounter-10;
            }
        }
    } else {
        if(player=='player1'){
            playerCounter += cardValue;
        } else {
            pcCounter += cardValue;
        }
    }
}

const clearHand = () =>{
    playerCounter = 0;
    playerDrawCards = 0;
    pcCounter = 0;
    pcDrawCards = 0;
    lastCard = '';
    selectedCards = [];
    document.getElementById('playerCards').innerHTML = "";
    document.getElementById('pcCards').innerHTML = "";
}

const drawHand = (player) => {
    const cardsPerHand = 3;
    for (let index = 1; index <= cardsPerHand; index++) {
        drawCard(player);
    }
    if(player=='player1'){
        document.getElementById('playerCounter').innerHTML = playerCounter;
    } else{
        document.getElementById('pcCounter').innerHTML = pcCounter;
    }
}

const evalHands = (firstHand = true) => {
    if(playerCounter > 21 && pcCounter <= 21){
        drawResult('loss');
    } else if(playerCounter <= 21 && pcCounter > 21){
        drawResult('won');
    } else if(playerCounter > 21 && pcCounter > 21){
        drawResult('tie');
    }
}

const drawResult = (result) => {
    let message = "", imgSrcStat= "";
    const status = document.createElement('p');
    let img = document.createElement('img');
    img.width = 200;
    img.height = 300;

    switch (result) {
        case 'won':
                message = `¡${playerName} has ganado!`;
                status.classList.add('statusMsgWin');
                imgSrcStat = "assets/img/trophy.png";
            break;
        case 'loss':
                message = `${playerName} has perdido!`;
                status.classList.add('statusMsgLoses');
                imgSrcStat = "assets/img/lose.png";
            break;
        case 'tie':
        default:
                message = `¡No hay Ganador!`;
                status.classList.add('statusMsgNoWin');
                imgSrcStat = "assets/img/tie.png";
                img.width = 300;
                img.height = 300;
            break;
    }

    status.appendChild(document.createTextNode(message));
    document.getElementById('tableScore').innerHTML = '';
    if(imgSrcStat != "") {
        img.src = imgSrcStat;
        document.getElementById('tableScore').appendChild(img);
    }
    document.getElementById('tableScore').appendChild(status);
}