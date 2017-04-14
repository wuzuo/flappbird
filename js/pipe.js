/**
 * Created by wuzuo on 2017/4/12/012.
 */
(function (Fly) {
    var Pipe=function (option) {
        this.ctx=option.ctx;
        this.imgPipeTop=option.imgPipeTop;
        this.imgPipeBot=option.imgPipeBot;
        this.imgW=this.imgPipeTop.width;
        this.imgH=this.imgPipeTop.height;
        this.x=option.x||0;
        this.topY=0;
        this.botY=0;
        this.speed=2;
        this.pipeSpace=150;

        this.initPipeHeight();

    };
    Pipe.prototype={
        initPipeHeight:function () {
            var pipeHeight=Math.random()*200+50;
            this.topY=pipeHeight-this.imgH;
            this.botY=pipeHeight+this.pipeSpace;
        },
        draw:function () {
            var ctx=this.ctx;
            this.x-=this.speed;
            ctx.drawImage(this.imgPipeTop,this.x,this.topY);
            ctx.drawImage(this.imgPipeBot,this.x,this.botY);
            //绘制管道所在的路径
            ctx.rect(this.x,this.topY,this.imgW,this.imgH);
            ctx.rect(this.x,this.botY,this.imgW,this.imgH);
            // ctx.fill();
            // ctx.beginPath();

            if(this.x<=-this.imgW){
                this.x+=this.imgW*3*6;
                this.initPipeHeight();
            }
        }
    };

    Fly.getPipe=function (option) {
        return new Pipe(option);
    }
})(Fly);