# 常用命令

`netstat -tunlp|grep 端口号` 查看端口是否占用

# nginx安装

* 首先更新apt源`sudo apt-get update` 

* 进行安装 `apt-get install nginx` 

* 启动nginx `nginx`

* 停止nginx `nginx -s stop`

* 查看nginx运行状态 `systemctl status nginx`

# 防火墙
[参考](https://www.cnblogs.com/yuxuan007/p/8043419.html)

`sudo ufw status` 检查防火墙状态