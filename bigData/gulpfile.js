var gulp = require('gulp');
var browserSync = require("browser-sync").create();//设置代理
var proxyMiddleware = require('http-proxy-middleware');
var seq = require("gulp-sequence");
var del = require("del");//删除文件

var FOLDER='./';
var SERVER_PORT=9989;
var SERVER_PROXY = "http://192.168.1.43";
var SERVER_PROXY2 = "http://192.168.1.42:18080";
SERVER_PROXY2 = "http://web.ndtcd.cn";
//var goPath="../../ndt-backend/ndt-controller/src/main/webapp/bigData";
var goPath="../webapp/bigData";
var proxy = proxyMiddleware("/city", {
    target: SERVER_PROXY,
    changeOrigin: true
});
var proxy2 = proxyMiddleware("/v1", {
    target: SERVER_PROXY2,
    changeOrigin: true
});

gulp.task('default',function () {

    browserSync.init({
        port:SERVER_PORT,
        ghostMode:false,
        server:FOLDER,
        middleware: [proxy,proxy2]
    });
});

//删除tmp目录文件
gulp.task("clear", function (cb) {
    del([goPath], {force: true});
});
gulp.task('deploy', function () {
    return gulp.src(['./**/*','!./node_modules/**/*','!./.idea/**/*'])
        .pipe(gulp.dest(goPath));
});
