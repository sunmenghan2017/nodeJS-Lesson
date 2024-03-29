//1.引入http原生模块
const http = require("http");
const fs = require("fs");
const url =require("url");
const path=require("path");
//2.创建一个服务器
var server = http.createServer(function(req,res){
    //console.log(req.url);
    var urlObj = url.parse(req.url);
    console.log(urlObj);
    var urlPathName=urlObj.pathname;
    console.log(urlPathName);
    if(urlPathName=="/favicon.ico"){
        res.end();
    }
    else if(urlPathName == "/"){
        //4.当客户端的http请求发起的时候，才会执行回调函数里的内容
        var htmlPath = __dirname+"\\views\\view.html";//相对路径
        var htmlContent = fs.readFileSync(htmlPath);
        htmlContent = htmlContent.toString("utf8");
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(htmlContent);
        res.end();
    }
    else if(urlPathName=="/js/view.js"){
        var jsPath=path.join(__dirname,"/js/view.js");
        var jsContent = fs.readFileSync(jsPath);
        res.writeHead(200,{"Content-Type":"text/javascript"});
        res.write(jsContent);
        res.end();
    }
    
});
//3.服务监听一个端口
server.listen(8080);
console.log("server is listening 8080");







//以下为修正版
/**  2019-9-9//
 * const http = require("http");
 * const fs = require("fs");
    const path=require("path");
 * http.createServer(function(req,res){
     var filePath=path.join(__dirname,"/views/view.html");
     console.log(filePath);
     var fileContent = fs.readFileSync(filePath);
        fileContent = fileContent.toString("utf8");
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(fileContent);
        res.end();
 }).listen(8080);
 * console.log("server is listening 8080");
 */
