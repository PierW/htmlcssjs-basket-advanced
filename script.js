$(document).ready(init);
// CREO GENERATORE DI NUMERI RANDOM
function getRandom(min, max){
  var diff = (max - min) +1;
  return Math.floor(Math.random() * diff ) + min;
}

// CREO GENERATORE DI ID
function getId() {
  var letters = "";
  var numbers = "";
  for (var i = 0; i < 3; i++) {
    var rnd = getRandom(1,9);
    var rndLetters = getRandom(65,90);
    rndLetters = String.fromCharCode(rndLetters);
    numbers += rnd;
    letters += rndLetters;
  }
  var idPlayer = letters + numbers;
  return idPlayer;
}

// CREO GENERATORE DI PLAYERS
function playersGenerator() {
  var twoPerc = getRandom(1,100);
  var threePerc = 100 - twoPerc;
  var player = {
    id : getId(),
    points : getRandom(1,100),
    bounce : getRandom(1,100),
    mistake : getRandom(1,100),
    twoPerc : twoPerc,
    threePerc : threePerc
  }
  return player;
}

// CREO CONTROLLO PER ID UNIVOCI
function isPresent(id, players) {
  var bool = true;
  for (var i = 0; i < players.length; i++) {
    if (id == players[i].id) {
      bool = false;
    }
  }
  return bool;
}

// CREO DATABASE DI GIOCATORI CON CONTROLLO ID
function databasePlayers() {
  var database = [];
  while (database.length < 10) {
    var player = playersGenerator();
    var bool = isPresent(player.id, database)
    if (bool) {
      database.push(player);
    }
  }
  return database;
}

// CARICO ID NEL div
function upgradeDOM(playerslist) {
  var datalist = $(".left");
  for (var i = 0; i < playerslist.length; i++) {
    var id = playerslist[i].id;
    var newElement = document.createElement("div");
    newElement.classList.add("mystyle");
    newElement.innerHTML = id;
    datalist.append(newElement);
  }
  return;
}

// TROVO IL PLAYER CORRISPONDENTE
function findSelected(id, players) {
  var player;
  for (var i = 0; i < players.length; i++) {
    if (id == players[i].id) {
      player = players[i];
    }
  }
  return player;
}

// MOSTRO NEL DOM I VALORI DEL PLAYER SELEZIONATO
function showSelected(player) {


  var idDOM = $("#id .content");
  var pointsDOM = $("#points .content");
  var bounceDOM = $("#bounce .content");
  var mistakeDOM = $("#mistake .content");
  var twoPercDOM = $("#twoPerc .content");
  var threePercDOM = $("#threePerc .content");

  idDOM.text(player.id);
  pointsDOM.text(player.points);
  bounceDOM.text(player.bounce);
  mistakeDOM.text(player.mistake);
  twoPercDOM.text(player.twoPerc + "%");
  threePercDOM.text(player.threePerc + "%");
}

function init() {
  var players = databasePlayers();
  upgradeDOM(players); //AGGIUNGO LA LISTA DEI PLAYERS NELL'INPUT

  var userInput = $(".left > div"); //AL CAMBIO DELL'INPUT RICHIAMO LA FUNZIONE showSelected
  userInput.click(function(){
    var me = $(this).text();
    console.log(me);
    var player = findSelected(me, players);
    showSelected(player);
});
}
