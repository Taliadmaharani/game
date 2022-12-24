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
