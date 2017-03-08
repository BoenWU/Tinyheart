var momObj=function(){
	this.x;
	this.y;
	this.angle;
	this.bigTailTimer;
	this.bigTailCount;
	this.bigTail=[];
	this.bigEye=[];
	this.bigEyeTimer;
	this.bigEyeCount;
	this.bigEyeInterval;
	this.bigBodyOrange=[];
	this.bigBodyBlue=[];
	this.bigBodyCount;
	this.bigBodyTimer;
}
momObj.prototype.init=function(){
    this.x=width*0.5;
    this.y=height*0.5;
    this.angle=0;
    this.bigTailTimer=0;
	this.bigTailCount=0;
    this.bigEyeTimer=0;
	this.bigEyeInterval=1000;
	this.bigEyeCount=0;
	this.bigBodyTimer=0;
	this.bigBodyCount=0;
    //bigTail Images
	for(var i=0;i<8;i++){
    	this.bigTail[i]=new Image();
    	this.bigTail[i].src="./images/bigTail"+i+".png";
    }
    //babyEye Images
    for(var i=0;i<2;i++){
    	this.bigEye[i]=new Image();
    	this.bigEye[i].src="./images/bigEye"+i+".png";
    }
    //babyBodyOrange Images
    for(var i=0;i<8;i++){
    	this.bigBodyOrange[i]=new Image();
    	this.bigBodyBlue[i]=new Image();
    	this.bigBodyOrange[i].src="./images/bigSwim"+i+".png";
    	this.bigBodyBlue[i].src="./images/bigSwimBlue"+i+".png";
    }
}
momObj.prototype.draw=function(){
	this.x=lerpDistance(mx,this.x,0.95);
	this.y=lerpDistance(my,this.y,0.95);

	var deltaY=my-this.y;
	var deltaX=mx-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;//-pi~pi

	this.angle=lerpAngle(beta,this.angle,0.9);
	//bigTail timer and count
	this.bigTailTimer+=deltaTime;
	if(this.bigTailTimer>50){
		this.bigTailCount=(this.bigTailCount+1)%8;
		this.bigTailTimer%=50;
	}
	this.bigEyeTimer+=deltaTime;
	if(this.bigEyeTimer>this.bigEyeInterval){
		this.bigEyeCount=(this.bigEyeCount+1)%2;
		this.bigEyeTimer%=this.bigEyeInterval;
		if(this.bigEyeCount==0){
			this.bigEyeInterval=Math.random()*1500+2000;
		}else{
			this.bigEyeInterval=200;
		}
	}
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var bigTailCount=this.bigTailCount;
	var bigEyeCount=this.bigEyeCount;
	var bigBodyCount=this.bigBodyCount;
    ctx1.drawImage(this.bigTail[bigTailCount],-this.bigTail[bigTailCount].width*0.5+30,-this.bigTail[bigTailCount].height*0.5);
	if(data.double==1){
    ctx1.drawImage(this.bigBodyOrange[bigBodyCount],-this.bigBodyOrange[bigBodyCount].width*0.5,-this.bigBodyOrange[bigBodyCount].height*0.5);
	}else{
    ctx1.drawImage(this.bigBodyBlue[bigBodyCount],-this.bigBodyBlue[bigBodyCount].width*0.5,-this.bigBodyBlue[bigBodyCount].height*0.5);
	}
    ctx1.drawImage(this.bigEye[bigEyeCount],-this.bigEye[bigEyeCount].width*0.5,-this.bigEye[bigEyeCount].height*0.5);
    ctx1.restore();
}