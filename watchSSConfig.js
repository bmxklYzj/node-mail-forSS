/**
 * @file 用node 监听文件改变
 * @author yangzongjun
 * @date 2017-11-21 14:57:20
 */

let fs = require('fs');

let sendMail = require('./mail');

let filePath = '/etc/shadowsocks.json';
fs.watchFile(filePath, (curr, prev) => {
    console.log(`the current mtime is: ${curr.mtime}`);
    console.log(`the previous mtime was: ${prev.mtime}`);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        console.log(data);
        sendMail({
            html: data + '<br> zongjun祝您生活愉快。'
        });
    });
});