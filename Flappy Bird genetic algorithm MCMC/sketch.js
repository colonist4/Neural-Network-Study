// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&


var birds = [];
var birdsLive = [], deadCount = 0;
var pipes = [];
var genetic;
const speciesNum = 50;
var score = 0;
var maxScore = 0;
var mapInfo = [], mapIndex = 0;

function setup() {
    createCanvas(640, 480);
    frameRate(200);
    
    for(let i=0; i<speciesNum; i++){
        birds.push(new Bird());
        birdsLive.push(true);
    }
        
//    pipes.push(new Pipe());
    buildFromMap();
    
    genetic = new Genetic(speciesNum);
}



function nextGeneration(){
    addData(genetic.generation, score);
    
    if(maxScore < score) maxScore = score;
    score = 0;
    pipes = [];
    birds = [];
    birdsLive = [];
    deadCount = 0;
    mapIndex = 0;
    for(let i=0; i<speciesNum; i++){
        birds.push(new Bird());
        birdsLive.push(true);
    }
    
    genetic.nextGen();
    
    buildFromMap();
}

function makeDatas(){
    var datas = [];
    for(let bird of birds){
        
        let pipeX = pipes[0].x;// + pipes[0].w/2;
        let pipeY = pipes[0].top + pipes[0].spacing/2;
        
        let data = [
            [(bird.x - pipeX)],
            [(bird.y - pipeY)],
            [bird.velocity]
        ];
        
        datas.push(data);
    }
    return datas;
}

function draw() {
    
    if(deadCount == speciesNum){
        nextGeneration();
//        noLoop();
    }
    score += 1;
    
    background(0);
    
    var datas = makeDatas();
    for(let i=0; i<birds.length; i++){
        if(!birdsLive[i]) continue;
        let output = genetic.getOutput(i, datas[i]);
        // jump
        if(output[0][0] > 0.5){
            birds[i].up();
        }
    }
    

    for (var i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();
        
        for(let j=0; j<birds.length; j++){
            if(!birdsLive[j]) continue;
            if (pipes[i].hits(birds[j])) {
                deadCount++;
                birdsLive[j] = false;
                genetic.modelDead(j, score);
                console.log(j+"th birds is dead with score : "+score);
            }
        }

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
    }
    
    for(let j=0; j<birds.length; j++){
        if(!birdsLive[j]) continue;
        if(birds[j].y == 0 || birds[j].y == height){
            deadCount++;
            birdsLive[j] = false;
            genetic.modelDead(j, score);
            console.log(j+"th birds is dead with score : "+score);
            continue;
        }
        birds[j].update();
        birds[j].show();        
    }
    

    if (score % 75 == 0) {
        buildFromMap();
    }
    
    fill(255, 0, 0);
    textAlign(RIGHT, TOP);
    textSize(20);
    text("Generation : " + genetic.generation+"\n"+ 
         "Score : "+score+" MAX : "+maxScore+"\n"+ 
         "Remain Species : "+(speciesNum - deadCount), width-10, 0);
    
}

function buildFromMap(){
    if(mapInfo[mapIndex] == undefined){
        let p = new Pipe();
        pipes.push(p);
        
        mapInfo[mapIndex++] = p.top;
    } else{
        pipes.push(new Pipe(mapInfo[mapIndex++]));
    }
}