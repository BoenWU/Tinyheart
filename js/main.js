var can1=document.getElementById('canvas1');
var can2=document.getElementById('canvas2');
var ctx1=can1.getContext('2d');
var ctx2=can2.getContext('2d'); 

var lastTime;
var deltaTime;
var bg=new Image();
var bgStart=new Image();
var width;
var height;
var ane;
var fruit;
var mom;
var baby;
var babyTail=[];

var mx;
var my;
var data;
var wave;
var halo;
var dust;
document.body.onload=game;
function game(){
	init();
	lastTime=Date.now();
	
	gameloop();
}

function init(){
    can1.addEventListener('mousemove',onMouseMove,false);
    bg.src="./images/background.jpg";
    width=can1.width;
    height=can1.height;
    ane=new aneObj;
    ane.init();

    fruit=new fruitObj;
    fruit.init();

    mom=new momObj;
    mom.init();

    baby=new babyObj;
    baby.init();

    mx=width*0.5;
    my=height*0.5;
    
    data=new dataObj();
    ctx1.font="30px Verdana";
	ctx1.textAlign="center";

	wave=new waveObj;
	wave.init();

	halo=new haloObj;
	halo.init();

	dust=new dustObj;
	dust.init();
}

function gameloop(){
	window.requestAnimFrame(gameloop);
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	if(deltaTime>40) deltaTime=40;
    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();
    
    ctx1.clearRect(0,0,width,height);
    mom.draw();
    baby.draw();
    collision();
    babyCollision();
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}

//background
function drawBackground(){
	ctx2.drawImage(bg,0,0,width,height);
}


function onMouseMove(e){
	if(!data.gameOver){
	   	if(e.offSetX||e.layerX){
	   		mx=e.offSetX==undefined?e.layerX:e.offSetX;
	   		my=e.offSetY==undefined?e.layerY:e.offSetY;
	   	}
	}
}