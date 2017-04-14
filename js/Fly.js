/**
 * Created by wuzuo on 2017/4/10/010.
 */
(function (window) {
    var Fly={};
    var createCanvas=function (id) {
        if(!id)return;

        var container=document.getElementById(id+'');
        var cv=document.createElement('canvas');
        cv.width=800;
        cv.height=600;
        container.appendChild(cv);
        return cv;
    };
    Fly.createCanvas=createCanvas;
    //加载图片
    Fly.loadImages=function (imgsSrcArr,callback) {
        var imgList={};
        var imgsLen=imgsSrcArr.length;
        var loadedLength=0;

        imgsSrcArr.forEach(function (src) {
            var img=new Image();
            img.src='imgs/'+src+'.png';
            imgList[src]=img;

            img.addEventListener('load',function () {
                loadedLength++;

                if(loadedLength>=imgsLen){
                    callback(imgList);
                }
            });
        });
    };
    Fly.toRadian=function (angle) {
        return angle/180*Math.PI;
    };
    Fly.createCv=function (id) {
        var cv=document.createElement('canvas');
        cv.width=800;
        cv.height=600;
        var container=document.getElementById(id);
        container.appendChild(cv);
        return cv.getContext('2d');
    };
    window.Fly=Fly;
})(window);