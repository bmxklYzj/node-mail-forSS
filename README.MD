# 使用 Node.js 监听文件改变并发送邮件

早就听说过node-mailer很好使，一直没有实验的场地。

这次有个需求，我在自己的vps上部署了ss，但是最近呢经常会把我的端口号给封掉，我只能不断地改端口，但是我又把账号共享给了其他的几个人，每次我改了ss配置文件都要手动告知他们端口。如果不告诉他们就用不了了。

发现Node.js中原生就有`fs.watch` 和 `fs.watchFile` 方法。`watch` 是可以监听文件夹的，但是经过我的实验发现他并不是很稳定。主要体现在两点：

1. 用vscode这类的编辑器每次改动会触发两次；
2. 用vim命令编辑只有第一次能够触发

watchFile 只能监听单个文件，试验了下，在vim下面每次都能够正确的触发。

查找资料发现 watch 是调动系统的通知不是轮询。而 watchFile 则是通过轮询来判断文件是否更改，真low！所以会有性能问题。

当然轮子也有：
1. [chokidar](https://github.com/paulmillr/chokidar/blob/master/README.md)
2. gaze
3. [node-watch](https://github.com/yuanchuan/node-watch)

reference：
1. [cnode](https://cnodejs.org/topic/51341be4df9e9fcc58efc3af)
2. [nodejs watchFile](https://nodejs.org/docs/latest/api/fs.html#fs_fs_watchfile_filename_options_listener)


## 2017-12-01 21:53:56 更新

真是搓啊，直接把配置文件用js写好，然后写入、重启ss、发送email。不是更合理吗？还用监听配置文件改变？。。。以后直接进入目录 执行 `node index.js` 就完成了 ss配置文件的写入、重启ss、发送email。真是方便！