/**
 * Created by wuzuo on 2017/4/9/009.
 */
(function (Fly) {
    var Bird=function (options) {
        this.ctx=options.ctx;
        this.img=options.img;
        this.imgW=this.img.width/3;
        this.imgH=this.img.height;
        this.frameIndex=0;
        this.curFrameTime=0;
        this.lastFrameTime=new Date();
        this.delta=0;
        this.speed=0;
        this.a=0.0005;
        this.x=100;
        this.y=100;
        this.listeners=[];
    };
    Bird.prototype={
        constructor:Bird,
        draw:function () {
            var ctx=this.ctx;
            this.curFrameTime=new Date();
            this.delta=this.curFrameTime-this.lastFrameTime;
            this.lastFrameTime=this.curFrameTime;
            // ctx.clearRect(0,0,cv.width,cv.height);
            //计算bird的角度
            var maxSpeed=0.5,
                maxAngle=45,
                curAngle=0;
            curAngle=this.speed/maxSpeed*maxAngle;
            if(curAngle>maxAngle){
                curAngle=45;
            }else if(curAngle<-maxAngle){
                curAngle=-45;
            }
            //绘制旋转的小鸟
            ctx.save();
            ctx.translate(this.x,this.y);
            ctx.rotate(Fly.toRadian(curAngle));
            ctx.drawImage(this.img,this.frameIndex++*this.imgW,0,this.imgW,this.imgH,-this.imgW/2,-this.imgH/2,this.imgW,this.imgH);
            ctx.restore();
            this.frameIndex %=3;
            //更新速度和位置
            this.speed=this.speed+this.a*this.delta;
            this.y=this.y+(this.speed*this.delta+1/2*this.a*Math.pow(this.delta,2));
            this.isDie();
        },
        //添加订阅方法
        addListener:function (fn) {
            this.listeners.push(fn);
        },
        //发布消息方法
        trigger:function () {
            this.listeners.forEach(function (fn) {
                fn();
            });
        },
        //小鸟碰撞
        isDie:function () {
            if(this.y-8<=0||(this.y>=this.ctx.canvas.height-112)||this.ctx.isPointInPath(this.x,this.y)){
                this.trigger();
            }

        },
        //小鸟改变速度的方法
        changeSpeed:function (speed) {
            this.speed=speed;
        }
    };
    Fly.getBird=function (options) {
        return new Bird(options);
    };
})(Fly);