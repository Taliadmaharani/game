//Mengatur Posisi Awal 
let screen = 0;
var hero, level, peta;
var kecepatan = 5;
var score = 0;
var posx = 10, posy = 200;

//Fungsi Setup
function setup() {
  hero = new Hero(10, 200, 20, 20);
  level = new Level(1, 1, 5);
  peta = new Map(600, 600);
  peta.init();
}

function draw() {
  if(screen === 0){
    background('#000000');
    fill('#FFFFFF')
    textSize(20)
    text('Click to Start the game!', (width/2) - 100, height/2 );
    text('Talia Desty Maharani - 2117051017', (width/2) - 150, height/2 + 20);
    text('Kristi Ayuni - 2117051097', (width/2) - 110, height/2 + 40);

  
  }else if(screen === 1){
    background('#000000');
    fill('#ffffff');
    text(`Score: ${score}`, 500, 20)
    text(`Level: ${level.getCurentLevel()}`, 500, 30)
    hero.display();

    for(var mon of peta.monster){
        mon.display();

        if(dist(mon.x, mon.y, hero.x, hero.y) < 20){
            peta.monster.splice(peta.monster.indexOf(mon), 1);
         
            if(mon.color === 1){
                hero.increaseScore();
                
                if(score % 10 == 0){
                    level.increaselevel(); 
                    kecepatan += 5;
                }
                level.checkLevel();
            }else{ 
                screen = 2;
                
            }
        }
    }

    for(var mon of peta.monster){ // Looping Monster
     
      if(mon.x < 0){ // Jika posisi X monster 0
        peta.monster.splice(peta.monster.indexOf(mon), 1); 
        var posY = random(0, 600); // Akan Merandom Monster Baru
        var posX = random(2000, 600);
        mon = new Monster(posX, posY, 10, 10);
        peta.monster.push(mon)
      }
    }

    // Fungsi Move 
    if (keyIsDown(87)) { // 87 == W
      hero.moveUp();
    
    }else if (keyIsDown(83)) { // 83 == s
      hero.moveDown();
    
    }else if (keyIsDown(65)) { // 65 == A
      hero.moveLeft();
    
    }else if (keyIsDown(68)) { // 68 == D
      hero.moveRight();
    }

  }else{
    background('#000000');
    fill('#ffffff');
    textSize(20);
    text('Game Over!', width/2 - 50, height/2);
    textSize(16);
    text(`Your Score: ${score}`, width/2 - 50, height/2 + 20);
    text(`Your Level: ${level.getCurentLevel()}`, width/2 - 50, height/2 + 40);
    text(`Click To Continue!`, width/2 - 50, height/2 + 60);
    // text(`Last Level: ${level.getlatesttLevel()}`, width/2 - 50, height/2 + 60)
  }
}



function mousePressed(){
	if(screen == 0){//screen awal > jika diklik akan berubah jadi 1
        screen = 1
        level.setLevel(1);
        peta.init();
    }else if(screen == 2){ // jika diklik akan berubah jadi screen 0
        screen = 0 // Mereset semua menjadi awal 0
        score = 0;
        kecepatan = 5;
        posx = 10;
        posy = 200;
        level.setLevel(1);
    }
}

class Entity { // Class Entity
  constructor(x, y, width, height) { // Constructor CLass Entity
    this.x = x;
    this.y = y;
    this.height = width;
    this.width = height;
  }
  
  moveRight(){ // Bergerak Kekanan. x ditambah
    if(this.x < 600){    
      this.x += 2;
    }
  }

  moveLeft(){ // Bergerak Kekanan. x dikurang
    if(this.x > 0){
      this.x -= 2;
    }
  }

  moveDown(){ // Bergerak Kekanan. y ditambah
    if(this.y < 600){
      this.y += 2;
    }
  }
  moveUp(){ // Bergerak Kekanan. xy dikurang
    if(this.y > 0){
      this.y -= 2;
    }
  }
}

class Hero extends Entity{ // Class Hero extend ke Entity -> Hero child Class, Entity Parent Class
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.life = 1;
  }
  
  display(){
    fill('#FFE500'); // Kode Warna Kuningwww
    rect(this.x, this.y, this.width, this.height); // Membuat bentuk Persegi
    noFill();
  }
  
  increaseScore(){ // Fungsi Menambah Score
    score ++;
  }
}

class Monster extends Entity { // class Monster extend Entity, Monster Child Class, Entity ParentClass
  constructor(x, y, height, width) {
    super(x, y, height, width);
    this.life = 1;
    this.color = 0;
    this.type = random(0, 2); // Merandom Tipe Monster
  }

  display(){ // Memunculkan Monster dengan bentuk lingkaran dan 2 tipe warna berbeda
    stroke(0);
    if(this.type > 1){
      this.color = 1;
      fill('#0000FF'); // Kode warna Biru
      ellipse(this.x, this.y, 10,10);
      noFill()

    }else{
      fill('#ff0000'); // Kode Warna Merah
      ellipse(this.x, this.y, 10,10);
      noFill()
    }
    this.x -= kecepatan; // Kecepatan Bergerak Monster
  }
}


class Map{ // Class Mop
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.monster = [];
  }

  init(){ // Menginisialisasi Canvas Awal dan merandom Monster
    createCanvas(this.width, this.height);
    for(var i = 0; i < 15; i++){
      var posY = random(0, this.width);
      var posX = random(2000, this.height);
      var mon = new Monster(posX, posY, 10, 10);
      this.monster.push(mon)
    }
  }
}

class Level{ // Class Level
  constructor(currentLevel, latestLevel, maxLevel) {
    this.currentLevel = currentLevel;
    this.latestLevel = latestLevel;
    this.maxLevel = maxLevel;
  }
  setLevel(level){
    this.currentLevel = level;
  }

  getCurentLevel(){
    return this.currentLevel;
  }

  setLatestLevel(level){
    this.latestLevel = level;
  }

  getlatesttLevel(){
    return this.latestLevel;
  }
  increaselevel(){
    this.currentLevel++;
  }

  checkLevel(){ // Jika level lebih dari 5, akan diubah menjadi tetap 5
    if(this.currentLevel > this.maxLevel){
        this.currentLevel = 5;
    }
  }
}
