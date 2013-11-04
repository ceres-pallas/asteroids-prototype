var Fighter = module.exports = function(options){
    this.maxx = 640;
    this.maxy = 480;
    this.x = 0;
    this.y = 0;
    this.vx = 1;
    this.vy = 1;
}
Fighter.prototype.left = function(){
    this.x -= this.vx;
    this.wrap();
}
Fighter.prototype.right = function(){
    this.x += this.vx;
    this.wrap();
}
Fighter.prototype.down = function(){
    this.y -= this.vy;
    this.wrap();
}
Fighter.prototype.up = function(){
    this.y -= this.vy;
    this.wrap();
}
Fighter.prototype.wrap = function(){
    this.wrapX();
    this.wrapY();
}
Fighter.prototype.wrapX = function(){
    if (this.x > this.maxx) {
	this.x -= this.maxx;
    }
    if (this.x < 0) {
	this.x += this.maxx;
    }
}
Fighter.prototype.wrapY = function(){
    if (this.y > this.maxy) {
	this.y -= this.maxy;
    }
    if (this.y < 0) {
	this.y += this.maxy;
    }
}
