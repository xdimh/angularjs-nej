---
title: 前端代码规范
tags: angular 最佳实践,javascript 规范
grammar_cjkRuby: true
---

### Part1 javascript 
#### 1. 文件编码统一采用UTF-8
#### 2. 文件命名采用小驼峰的形式。
#### 2. 使用 4 个空格做为一个缩进层级，不允许使用 2 个空格 或 tab 字符。（大家对编辑器做下设置）
#### 3. switch 下的 case 和 default 必须增加一个缩进层级。
```javascript

// bad
switch (variable) {

case '1':
    // do...
    break;

case '2':
    // do...
    break;

default:
    // do...

}


// good
switch (variable) {

    case '1':
        // do...
        break;

    case '2':
        // do...
        break;

    default:
        // do...

}
```


#### 4. 声明变量必须加上 var 关键字。
```
//bad
v1,v2;

//good
var v1,v2;
```

#### 5. 变量 和 函数命名采用驼峰命名（函数名使用动宾短语），常量使用全部字母大写，单词间下划线分隔 的命名方式,且命名要有意义。
```javascript 
//bad 
var fdlist = [];
var getstring = function(){};
var htmlentity = {};
//good
var friendsList = [];
var getDateString = function() {};
var HTML_ENTITY = {};
```

#### 6. 函数的 参数 使用 Camel命名法.
```javascript
function hear(theBells) {

}
```

#### 7. 类命名采用大驼峰式命名法且类名类名使用名词。
```javascript
function TextNode(options) {

}
```

#### 8. boolean 类型的变量使用 is 或 has 开头。
```javascript
var isReady = false;
var hasMoreCommands = false;
```


#### 9.注释按照[JSDoc规范](http://www.cnblogs.com/jndream/archive/2012/03/10/2389081.html)

```javascript
/**
* @description 加法运算
* @param {Num} num1 加数
* @param {Num} num2 被加数
* @return {Num} result 结果
*/
function add(num1,num2){
    return num1 + num2;
}

```


#### 10. 在 Equality Expression 中使用类型严格的 ===。仅当判断 null 或 undefined 时，允许使用 == null。

```javascript
// good
if (age === 30) {
    // ......
}

// bad
if (age == 30) {
    // ......
}
```

#### 11. 字符串开头和结束使用单引号 '
```javascript
var str = '我是一个字符串';
var html = '<div class="cls">拼接HTML可以省去双引号转义</div>';
```

#### 12. 建议一个函数的长度控制在50行以内便于维护过长的函数可以进行提取封装。


[参考百度fex的代码规范](https://github.com/fex-team/styleguide/blob/master/javascript.md)


### Part2: angular 最佳实践
#### 1.指令，控制器，服务，过滤器代码进行分离，文件命名进行相应的区分。
```
类似
loginFilter.js
loginController.js
loginServices.js
loginDirectives.js
```

其他最佳实践[参考angularjs-style-guide](https://github.com/mgechev/angularjs-style-guide/blob/master/README-zh-cn.md)
