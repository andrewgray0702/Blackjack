
var suits = ["spades", "hearts", "diamonds", "clubs"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();
var playerHand = new Array();
var cpuHand = new Array();
var cpuPoints = 0;
var playerHandWeight = 0;
var points = 0;
var cpuHandWeight = 0;
var cpuTotal = 0;
document.querySelector('.btnStart').addEventListener('click', function () {
    startGame();
})

function createDeck() {
    for (var i = 0; i < values.length; i++) {
        for (var x = 0; x < suits.length; x++) {
            var weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                weight = 10;
            if (values[i] == "A")
                weight = 11;
            var card = { value: values[i], suit: suits[x], weight: weight };
            deck.push(card);
        }
    }
}

function shuffle() {
    for (var i = 0; i < 500; i++) {
        var card1 = Math.floor((Math.random() * deck.length));
        var card2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[card1];

        deck[card1] = deck[card2];
        deck[card2] = tmp;
    }
}

function dealPlayers() {
    for (i = 0; i < 2; i++) {
        var curCard = deck.pop();
        playerHand.push(curCard);
    }
    for (i = 0; i < 2; i++) {
        var curCard = deck.pop();
        cpuHand.push(curCard);
    }
}

function startGame() {
    createDeck();
    shuffle();
    dealPlayers();
    getCpuPoints();
    getPlayerPoints();
}

function getPlayerPoints() {
    for (var i = 0; i < 2; i++) {
        playerHandWeight = playerHandWeight + playerHand[i].weight;
    }
    document.querySelector('.playerPoints').innerHTML = playerHandWeight;
}
function getCpuPoints() {
    for (var i = 0; i < cpuHand.length; i++) {
        cpuHandWeight = cpuHand[i].weight + cpuHandWeight;
    }

    document.querySelector('.cpuPoints').innerHTML = cpuHandWeight;
}

document.querySelector('.btnHit').addEventListener('click', function () {
    hit();
})
document.querySelector('.btnStay').addEventListener('click', function () {
    stay();
})

function hit() {
    var curCard = deck.pop();
    playerHand.push(curCard);
    for (var i = playerHand.length - 1; i < playerHand.length; i++) {
        playerHandWeight = playerHandWeight + playerHand[i].weight;
    }
    document.querySelector('.playerPoints').innerHTML = playerHandWeight;
    if (playerHandWeight > 21) {
        console.log('busted');
    } else if (playerHand == 21) {
        console.log('blackjack!')
    }
}
function stay() {
    while (cpuHandWeight < 17) {
        var curCard = deck.pop();
        cpuHand.push(curCard);
        for (var i = cpuHand.length - 1; i < cpuHand.length; i++) {
            cpuHandWeight = cpuHandWeight + cpuHand[i].weight;
        }
    }
    document.querySelector('.cpuPoints').innerHTML = cpuHandWeight;
    whoWon();
}
function whoWon() {
    if (cpuHandWeight > 21) {
        console.log('you win')
    } else if(cpuHandWeight == 21){
        console.log('dealer blackjack');
        if(cpuHandWeight == playerHandWeight){
            console.log('push')
        }
    } else if (cpuHandWeight > playerHandWeight) {
        console.log('you lose');
    } else if (cpuHandWeight < playerHandWeight) {
        console.log('you win');
    } else if (cpuHandWeight == playerHandWeight) {
        console.log('push')
    }
}

