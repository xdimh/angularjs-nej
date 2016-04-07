
var gulp = require('gulp');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var mcss = require('gulp-mcs');
var exec = require('child_process').exec;
var lr = require('tiny-lr')();
var path = require('path');

var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var express = require('express');
var app = express();

// 需要配置项
var PathConfig = {
    mcssSrc: ['./src/admin/mcss/**/*.mcss','!./src/admin/mcss/**/_*.mcss','!./src/admin/mcss/mass/**/*.mcss'],
    cssDist: './src/admin/css/',
    livereloadSrc: ['./src/admin/js/**/*.js', './src/admin/css/**/*.css', './statichtml/*.html','./src/admin/tpl/**/*.ftl'], // 自动刷新监听文件/目录
    fmppSrc: ['./src/admin/tpl/**/*.ftl','./mock/**/*.tdd'],                 // 自动执行fmpp监听文件/目录
    svgSrc: './svg/*.svg',
    fontDist: './src/admin/res/fonts/'
};

var EXPRESS_ROOT = __dirname;
var EXPRESS_PORT = 9000;
var APICONFIG = './async.api.js';
var LIVEPORT = 35729;


var runTimestamp = Math.round(Date.now()/1000);
// 静态服务器
// 并开启自动刷新

// iconfont setting
var fontName = 'myicon';
var fontClass = 'myiconfont';

gulp.task('server:connect', function() {
    connect.server({
        port: 9000,
        livereload: true,
        middleware: function(connect, opt) {
            var Proxy = require('gulp-connect-proxy');
            opt.route = '/rest'; // localhost:9000/rest/hostname.com/xxx will be proxied, no http(s) prefix..
            var proxy = new Proxy(opt);
            return [proxy];
        }
    })
});

// 通知服务器何时进行自动刷新
gulp.task('livereload:connect', function() {
    gulp.src(PathConfig.livereloadSrc)
        .pipe(watch(PathConfig.livereloadSrc))
        .pipe(connect.reload())
});

// express服务器
function startExpress() {
    var bodyParser = require('body-parser');
    app.use(require('connect-livereload')());
    app.use(express.static(EXPRESS_ROOT));
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

   var apis = require(APICONFIG);
   for(var key in apis) {
       var method = key.split(/\s+/)[0].toLowerCase(),
           url = key.split(/\s+/)[1];

       app[method](url, apis[key]);
   }

    var server = app.listen(EXPRESS_PORT, function() {
        var host = server.address().address;
        var port = server.address().port;
        console.log('async server listening at http://%s:%s', host, port)
    });
}
function startLivereload() {
    lr.listen(LIVEPORT, function() {
        console.log('livereload listen at port ' + LIVEPORT);
    });
}
function notifyLivereload(event) {
    var fileName = require('path').relative(EXPRESS_ROOT, event.path);
    lr.changed({
        body: {
            files: [fileName]
        }
    });   
}

gulp.task('server:express', function() {
    startExpress();
    startLivereload();
    gulp.watch(PathConfig.livereloadSrc, notifyLivereload);
});

// 自动进行fmpp
gulp.task('fmpp', function() {
    exec('fmpp', function(err, stdout, stderr) {
        if(stdout) console.log(stdout);
        if(stderr) console.log(stderr);
        if(err) console.log('exec error: ', err);
    })
});

gulp.task('watchFmpp', function() {
    gulp.watch(PathConfig.fmppSrc, ['fmpp']);
});

// mcss to css
gulp.task('mcss', function() {
    gulp.src(PathConfig.mcssSrc)
        .pipe(mcss())
        .pipe(gulp.dest(PathConfig.cssDist))
});

gulp.task('watchMcss', function() {
    gulp.watch(PathConfig.mcssSrc[0], ['mcss']);
});


gulp.task('iconfont', function() {
    return gulp.src(PathConfig.svgSrc)
        .pipe(iconfontCss({
            fontName: fontName,
            path: './src/fonts/_icontpl.mcss',
            targetPath: '../mcss/iconfont.mcss',
            fontPath: '../fonts/',
            cssClass: fontClass
        }))
        .pipe(iconfont({
            fontName: fontName,
            prependUnicode: true,
            normalize:true,
            fontHeight: 1001,
            formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
            timestamp: runTimestamp
        }))
        .pipe(gulp.dest(PathConfig.fontDist));
});


//默认启动
gulp.task('numen', ['mcss','fmpp','server:express','watchMcss']);
gulp.task('default', ['mcss', 'fmpp', 'server:express', 'watchFmpp', 'watchMcss']);