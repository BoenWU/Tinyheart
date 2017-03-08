var babyObj=function(){
	this.x;
	this.y;
	this.angle;
	this.babyBody=new Image();
	this.babyTailTimer;
	this.babyTailCount;
	this.babyTail=[];
	this.babyEye=[];
	this.babyEyeTimer;
	this.babyEyeCount;
	this.babyEyeInterval;
	this.babyBody=[];
	this.babyBodyCount;
	this.babyBodyTimer;
}
babyObj.prototype.init=function(){
	this.x=width*0.5-50;
	this.y=height*0.5+50;
	this.angle=0;
	this.babyTailTimer=0;
	this.babyTailCount=0;
	this.babyEyeTimer=0;
	this.babyEyeInterval=1000;
	this.babyEyeCount=0;
	this.babyBodyTimer=0;
	this.babyBodyCount=0;
	//babyTail Images
	for(var i=0;i<8;i++){
    	this.babyTail[i]=new Image();
    	this.babyTail[i].src="./images/babyTail"+i+".png";
    }
    //babyEye Images
    for(var i=0;i<2;i++){
    	this.babyEye[i]=new Image();
    	this.babyEye[i].src="./images/babyEye"+i+".png";
    }
    //babyBody Fade Images
    for(var i=0;i<20;i++){
    	this.babyBody[i]=new Image();
    	this.babyBody[i].src="./images/babyFade"+i+".png";
    }

}

babyObj.prototype.draw=function(){
	this.x=lerpDistance(mom.x,this.x,0.98);
	this.y=lerpDistance(mom.y,this.y,0.98);
	var deltaY=mom.y-this.y;
	var deltaX=mom.x-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;//-pi~pi

	this.angle=lerpAngle(beta,this.angle,0.6);
	//babyTail timer and count
	this.babyTailTimer+=deltaTime;
	if(this.babyTailTimer>50){
		this.babyTailCount=(this.babyTailCount+1)%8;
		this.babyTailTimer%=50;
	}
	//baby Eye timer and count
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval){
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer%=this.babyEyeInterval;

		if(this.babyEyeCount==0){
			this.babyEyeInterval=Math.random()*1500+2000;
		}else{
			this.babyEyeInterval=200;
		}
	}
	//babyBody timer and count
	this.babyBodyTimer+=deltaTime;
	if(this.babyBodyTimer>300){
		this.babyBodyCount=this.babyBodyCount+1;
		this.babyBodyTimer%=300;
		if(this.babyBodyCount>19){
			this.babyBodyCount=19;
			//game over
			data.gameOver=true;
		}
		
	}
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var babyTailCount=this.babyTailCount;
	var babyEyeCount=this.babyEyeCount;
	var babyBodyCount=this.babyBodyCount;
	ctx1.drawImage(this.babyTail[babyTailCount],-this.babyTail[babyTailCount].width*0.5+23,-this.babyTail[babyTailCount].height*0.5);
	ctx1.drawImage(this.babyBody[babyBodyCount],-this.babyBody[babyBodyCount].width*0.5,-this.babyBody[babyBodyCount].height*0.5);
	ctx1.drawImage(this.babyEye[babyEyeCount],-this.babyEye[babyEyeCount].width*0.5,-this.babyEye[babyEyeCount].height*0.5);
	ctx1.restore();
}