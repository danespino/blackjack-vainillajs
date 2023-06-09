let playerCounter = 0, playerDrawCards = 0, pcCounter = 0, pcDrawCards = 0, lastCard = '';
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
    clearHand();
    drawHand('player1');
    drawHand('computer');
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
        document.getElementById('playerCounter'). innerHTML = playerCounter;
    } else{
        document.getElementById('pcCounter'). innerHTML = pcCounter;
    }
}