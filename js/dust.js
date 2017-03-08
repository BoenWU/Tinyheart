var dustObj = function() {
	this.x = [];
	this.y = [];
	this.amp = [];
	this.No = [];
	this.alpha;
	this.dustPic = [];
}
dustObj.prototype.num = 30;
dustObj.prototype.init = function() {
	for (var i = 0; i < this.num; i++) {
		this.x[i] = Math.random() * width;
		this.y[i] = Math.random() * height;
		this.amp[i] = Math.random() * 50 + 30;
		this.No[i] = Math.floor(Math.random() * 7);
	}
	for (var i = 0; i < 7; i++) {
		this.dustPic[i] = new Image();
		this.dustPic[i].src = "./images/dust" + i + ".png";
	}
	this.alpha = 0;
}
dustObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.0005;
	var l = Math.sin(this.alpha);
	for (var i = 0; i < this.num; i++) {
		ctx1.drawImage(this.dustPic[this.No[i]], this.x[i] + this.amp[i] * l, this.y[i]);
	}
}