//任务②
const fs=require("fs");
const path=require("path");
const http=require("http");
var fileName=process.argv[2];

http.createServer(function(req,res){
    if(fileName==undefined){
        fs.open(process.argv[1],"r+",function(err,fd){
            var statObj=fs.statSync(process.argv[1]);
            var buf=Buffer.alloc(statObj.size);
            fs.read(fd,buf,0,statObj.size,0,function(err,by,buff){
                if(err){
                    console.log(err);
                }
                else{
                    res.end(buf.toString());
                    fs.closeSync(fd);
                }
            })
        })
    }
    else{
        var pathName=path.join(__dirname,fileName);
        if(fs.existsSync(pathName)){
            fs.open(pathName,"r+",function(err,fd){
                var statObj=fs.statSync(pathName);
                var buf=Buffer.alloc(statObj.size);
                fs.read(fd,buf,0,statObj.size,0,function(err,by,buff){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.end(buf.toString());
                        fs.closeSync(fd);
                    }
                })
            })
        }
        else{
            res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            res.end("文件不存在");
        }
    }
}).listen(8081);
console.log("listening 8081");