let playerCounter = 0, playerDrawCards = 0, pcCounter = 0, pcDrawCards = 0, lastCard = '';
let selectedCards = [], playerCardsHistory = [], pcCardsHistory = [];

const cards = [
    'AH','2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AD','2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD','AC','2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AS','2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS'
];

const cardsVals = [ 
                {"id":'AH',   "value":11},
                {"id":'2H',   "value": 2},
                {"id":'3H',   "value": 3},
                {"id":'4H',   "value": 4},
                {"id":'5H',   "value": 5},
                {"id":'6H',   "value": 6},
                {"id":'7H',   "value": 7},
                {"id":'8H',   "value": 8},
                {"id":'9H',   "value": 9},
                {"id":'10H',  "value":10},
                {"id":'JH',   "value":10},
                {"id":'QH',   "value":10},
                {"id":'KH',   "value":10},
                {"id":'AD',   "value":11},
                {"id":'2D',   "value": 2},
                {"id":'3D',   "value": 3},
                {"id":'4D',   "value": 4},
                {"id":'5D',   "value": 5},
                {"id":'6D',   "value": 6},
                {"id":'7D',   "value": 7},
                {"id":'8D',   "value": 8},
                {"id":'9D',   "value": 9},
                {"id":'10D',  "value":10},
                {"id":'JD',   "value":10},
                {"id":'QD',   "value":10},
                {"id":'KD',   "value":10},
                {"id":'AC',   "value":11},
                {"id":'2C',   "value": 2},
                {"id":'3C',   "value": 3},
                {"id":'4C',   "value": 4},
                {"id":'5C',   "value": 5},
                {"id":'6C',   "value": 6},
                {"id":'7C',   "value": 7},
                {"id":'8C',   "value": 8},
                {"id":'9C',   "value": 9},
                {"id":'10C',  "value":10},
                {"id":'JC',   "value":10},
                {"id":'QC',   "value":10},
                {"id":'KC',   "value":10}, 
                {"id":'AS',   "value":11},
                {"id":'2S',   "value": 2},
                {"id":'3S',   "value": 3},
                {"id":'4S',   "value": 4},
                {"id":'5S',   "value": 5},
                {"id":'6S',   "value": 6},
                {"id":'7S',   "value": 7},
                {"id":'8S',   "value": 8},
                {"id":'9S',   "value": 9},
                {"id":'10S',  "value":10},
                {"id":'JS',   "value":10},
                {"id":'QS',   "value":10},
                {"id":'KS',   "value":10}, 
];

Object.freeze(cards);

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
            liElement.innerHTML=`<img src="js/blackjack/assets/img/${lastCard}.png" alt="${lastCard}" />`;
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