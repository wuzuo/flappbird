/**
 * Created by wuzuo on 2017/4/10/010.
 */
(function (Fly) {
    var Sky=function (options) {
        this.img=options.img;
        this.ctx=options.ctx;
        this.imgW=this.img.width;
        this.x=options.x;
        this.speed=2;
    };
    Sky.prototype={
        constructor:Sky,
        draw:function () {
            var ctx=this.ctx;
            this.x-=this.speed;

            if(this.x<=-this.imgW){
                this.x+=this.imgW*2;
            }
            ctx.drawImage(this.img,this.x,0);

        }
    };
    Fly.getSky=function (options) {
        return new Sky(options);
    };
})(Fly);