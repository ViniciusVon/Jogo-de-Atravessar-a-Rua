//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//variaveis da velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete 
let xMinhaRaquete = 5;
let yMinhaRaquete = 150;
let RaqueteComprimento = 10;
let RaqueteAltura = 90;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

let colidiu = false;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  mostrarRaqueteOponente(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoBorda();
  mostrarMinhaRaquete(xMinhaRaquete,yMinhaRaquete);
  movimentoMinhaRaquete();
  verificaColisaoRaquete(xMinhaRaquete, yMinhaRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1
  }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1
  }
}

function mostrarMinhaRaquete(x,y){
    rect(x, y,RaqueteComprimento, RaqueteAltura);
}

function mostrarRaqueteOponente(x, y){
    rect(x, y, RaqueteComprimento, RaqueteAltura);
}

function movimentoMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yMinhaRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yMinhaRaquete += 10;
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = 
collideRectCircle(x, y, RaqueteComprimento, RaqueteAltura, xBolinha, yBolinha, raio);
    if(colidiu){
      velocidadeXBolinha *= -1;
      raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  yRaqueteOponente = yBolinha;
  velocidadeYOponente = yBolinha - yRaqueteOponente - RaqueteComprimento  / 2 -30;
  yRaqueteOponente += velocidadeYOponente;
  
  
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255,140,0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26)
}

function  marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
  
}

function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}