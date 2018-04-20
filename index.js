
let fs = require('fs');

let password = require('./config/password');
let sendMail = require('./mail');

// 设置port为 [10000, 30000) 的一个整数
const minNum = 10000;
const maxNum = 30000;
let port = ~~(Math.random() * (maxNum - minNum) + minNum);
let configString =
`{
    "server":"198.96.88.67",
    "port_password":{
        "${port}":"${password}",
        "${port + 1}":"${password}",
        "${port + 2}":"${password}"
    },
    "timeout":300,
    "method":"aes-256-cfb"
}`;

fs.writeFile('/etc/shadowsocks.json', configString, (err) => {
    if (err) {
        console.log(err);
    }

    let exec = require('child_process').exec;

    let child = exec('ssserver -c /etc/shadowsocks.json -d restart', (err, stdout, stderr) => {
      if (err) {
        throw err;
      }
      console.log(stdout);
    });
    sendMail({
        html: configString + '<br> zongjun祝您 fanqiang 愉快。<br>如果你觉得此项目还不错，可以给我点个star。链接： https://github.com/bmxklYzj/node-mail-forSS  =='
    });
});
console.log(configString);
