/**
 * Created by wuzuo on 2017/4/10/010.
 */
(function (Fly) {
    var Land=function (options) {
        this.x=options.x;
        this.ctx=options.ctx;
        this.img=options.img;
        this.imgW=this.img.width;
        this.y=this.ctx.canvas.height-this.img.height;
        this.speed=2;
    };
    Land.prototype={
        constructor:Land,
        draw:function () {
            this.x-=this.speed;
            if(this.x<=-this.imgW){
                this.x+=this.imgW*4;
            }
            this.ctx.drawImage(this.img,this.x,this.y);
        }
    };
    Fly.getLand=function (options) {
        return new Land(options);
    };
})(Fly);