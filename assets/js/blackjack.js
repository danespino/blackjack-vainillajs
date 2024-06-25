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
        if(selectedCards.lastIndexOf(selectedCard)==-1){
            drawFlag = 0;
            selectedCards.push(selectedCard);   // We must add the drawn card to a discard array
            lastCard = cards[selectedCard];
            cardValue = getCardValue(lastCard);
            if(player=='player1'){
                
                
            } else {

            }
            let liElement = document.createElement('li');
            liElement.innerHTML=`<img src="assets/img/${lastCard}.png" alt="${lastCard}" />`;
            drawnCardsUI.appendChild(liElement);

            if(player=='player1'){
                
                isAce = (lastCard.includes('A')) ? true:false;
                playerCounter += cardValue;
                if(isAce && playerCounter >= 21) playerCounter=playerCounter-10;
            } else {
                pcCounter += getCardValue(lastCard);
            }
            
        }
    }
}

const evalAses = () =>{
    
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
    let message = "";
    const status = document.createElement('p');
    
    if(playerCounter > 21 && pcCounter <= 21){
        message = `${playerName} has perdido!`;
        status.classList.add('statusMsgLoses');
    } else if(playerCounter <= 21 && pcCounter > 21){
        message = `¡${playerName} has ganado!`;
        status.classList.add('statusMsgWin');
    } else if(playerCounter > 21 && pcCounter > 21){
        message = `¡No hay Ganador!`;
        status.classList.add('statusMsgNoWin');
    }

    status.appendChild(document.createTextNode(message));
    document.getElementById('tableScore').innerHTML = '';
    document.getElementById('tableScore').appendChild(status);
}