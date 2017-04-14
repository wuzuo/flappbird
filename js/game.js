/**
 * Created by wuzuo on 2017/4/12/012.
 */
(function (Fly) {
    var Game=function (id) {
        this.imgsSrc = ["birds", "land", "pipe1", "pipe2", "sky"];
        this.isStart=false;
        this.roles=[];
        this.ctx=Fly.createCv(id);
        this.hero=null;
        this.loadGame();

    };
    Game.prototype={
        constructor:Game,
        loadGame:function () {
            var that=this;
            // this.isStart=true;
            Fly.loadImages(that.imgsSrc,function (imgList){


                that.initRoles(imgList);
                that.render(imgList);
                that.bindEvent();

            });

        },
        startGame:function () {
            this.isStart=true;
        },
        gameOver:function () {
            this.isStart=false;
            var ctx=this.ctx;
            ctx.font='50px 微软雅黑';
            ctx.fillStyle='red';
            ctx.textAlign = 'center';
            ctx.textBaseline='middle';

            ctx.fillText('GAME OVER',400,300);
        },
        initRoles:function (imgList) {
            var ctx=this.ctx;
            //创建小鸟对象
            this.hero=Fly.getBird({
                ctx:ctx,
                img:imgList['birds']
            });
            this.hero.addListener(this.gameOver.bind(this));
            //创建天空对象
            for(var i=0;i<2;i++){
                var sky=Fly.getSky({
                    ctx:ctx,
                    img:imgList['sky'],
                    x:imgList['sky'].width*i
                });
                this.roles.push(sky);
            }
            //创建管道对象
            for(var i=0;i<6;i++){
                var pipe=Fly.getPipe({
                    ctx:ctx,
                    imgPipeTop:imgList['pipe2'],
                    imgPipeBot:imgList['pipe1'],
                    x:i*imgList['pipe2'].width*3+300
                });
                this.roles.push(pipe);
            }
            //创建陆地对象
            for(var i=0;i<4;i++){
                var land=Fly.getLand({
                    ctx:ctx,
                    img:imgList['land'],
                    x:imgList['land'].width*i
                });
                this.roles.push(land);
            }
        },
        render:function (imgList) {
            var ctx=this.ctx;
            var that=this;
            var cv=this.ctx.canvas;
            (function render() {
                ctx.clearRect(0,0,cv.width,cv.height);
                ctx.beginPath();
                that.roles.forEach(function (role) {
                    role.draw();
                });
                that.hero.draw();
                // if(that.hero.y-8<=0||(that.hero.y>=cv.height-imgList['land'].height)||ctx.isPointInPath(that.hero.x,that.hero.y)){
                //     that.gameOver();
                // }
                if(that.isStart){
                    requestAnimationFrame(render);
                }
            })();

        },
        bindEvent:function () {
            var that=this;
            that.ctx.canvas.addEventListener('click',function () {
                that.hero.changeSpeed(-0.3);
            });

        }

    };
    var instance=null;
    Fly.getGame=function (id) {
        if(instance===null){
            instance=new Game(id);
        }
        return instance;
    }
})(Fly);