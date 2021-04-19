# Linux

## xshell设置主机名hostname并更改颜色

```shell
# 设置主机名hostname
hostnamectl set-hostname <the-new-hostname>

# xshell修改用户名颜色
vim ~/.bashrc

# 修改代码
if [ -f /etc/bashrc ]; then
        . /etc/bashrc
# fe
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt
# PS1='[${debian_chroot:+($debian_chroot)}\[\033[01;33;1m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$] '
# PS1='[\033[0;37;44m\u@\033[0;32;43m\h:\033[0;33;41m\w$\033[0m]'
# PS1='[${debian_chroot:+($debian_chroot)}\[\033[01;33;1m\]\u@\h:\w\$] '
PS1='[\e[1m\e[32m\u@\h\e[m \e[34m\W]\e[31m\e[1m\$\e[m '


# 生效更改
source  ~/.bashrc
```



## 基础命令

### vim搜索

1. 命令模式下，输入：**/字符串**

   比如搜索user, 输入/user

   按下回车之后，可以看到vim已经把光标移动到该字符处和高亮了匹配的字符串

2. 查看下一个匹配，按下n(小写n)

3. 跳转到上一个匹配，按下N（大写N）

4. 搜索后，我们打开别的文件，发现也被高亮了，怎么关闭高亮？

   命令模式下，输入:nohlsearch  也可以:set nohlsearch； 当然，可以简写，noh或者set noh。



### 开启root用户

1. 设置密码

   ```shell
   sudo passwd root
   ```

2. 修改sshd_config文件

   ```shell
   sudo vim /etc/ssh/sshd_config
   ```

3. 修改配置信息

   > 以前做法

   ```shell
   PermitRootLogin without-password  ->  PermitRootLogin yes
   # PasswordAuthentication yes  ->  PasswordAuthentication yes
   ```
   
   > 腾讯云实测
   >
   
   ```shell
   # 增加
   PermitRootLogin prohibit-password  ->  PermitRootLogin yes
   ```
   
   
   
4. 重启ssh服务

   ```shell
   sudo service ssh restart
   ```



### 查看环境变量

```shell
env
```



### 查看当前目录下文件大小

```shell
du -sh *
```

### 压缩

> 压缩

```shell
	tar zcvf filename.tar.gz dirname
```

> 解压
>

```shell
	tar -zxvf filename.tar.gz
```

### 删除文件

```shell
rm  -rf filename_or_dirname
```

### 创建软链接

```shell
ln -s 源文件 目标文件
```

### flask部署

#### 环境变量（已过时）

> 临时

export cur_server=true

> 永久

vim /etc/profile
结尾加上export cur_server=true

> 查看环境变量

```shell
env
```



#### uwsgi安装



```shell
sudo apt-get install libpcre3 libpcre3-dev ## 不安装会报错
pip install uwsgi ## 不要采用apt安装
```

#### 识图软件tesseract的安装

> 安装

```shell
sudo apt install tesseract-ocr
```

> 修改配置（只识别大小写英文字母和数字）

把/usr/share/tesseract-ocr/4.00/tessdata/configs/digits

修改为
tessedit_char_whitelist 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz

## 恢复定时器的运作

> 添加环境变量（已过时）

```shell
	SHELL=/bin/sh
	PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
	cur_server=true	## 运行定时器时候需要添加额外添加环境变量
	## m h dom mon dow user	command
```

## 其他备忘

- 修改云函数、后端、nginx域名
- 增加公众号永久素材白名单ip

## 定时器

#### 开启、查看日志

```shell
## 开启日志
vim /etc/rsyslog.d/50-default.conf
## 取消注释
cron.* /var/log/cron.log
service rsyslog restart

## 查看日志 
cat /var/log/cron.log
```

## 编辑定时器

```shell
vim /etc/crontab
service cron reload 
service cron restart
```

## 创建交换分区

参考自“网页存档”

```shell
## 创建交换分区文件
fallocate -l 1G /swapfile
## 启用交换文件
chmod 600 /swapfile
## 标记为交换空间
mkswap /swapfile
## 开始使用
swapon /swapfile
## 检查
free -h

## 永久保存，防止重启后丢失
cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab

```

# docker

## 安装

https://www.runoob.com/docker/centos-docker-install.html

## 参考资料

[公众号]: https://mp.weixin.qq.com/s/ske3PW2JTzdE5iiGvmurBw

## 启动

```
systemctl start docker
# 验证安装
docker run hello-world
# 查看容器使用内存情况
docker stats
```

## 容器操作

```shell
# 列出所有容器ID
docker ps -aq
# 查看所有镜像
docker images
# 停止所有的container（容器）
docker stop $(docker ps -a -q) 
docker stop $(docker ps -aq)
# 删除镜像
docker rmi <image id>
# 删除所有container（容器）
docker rm $(docker ps -a -q)
docker rm $(docker ps -aq)
```



### 创建容器

```
docker run [option] {REPOSITORY}:{TAG} [common]
```

> [option] 为选项，[common] 为要执行的命令。
>
> **常用 option：**
>
> -i		以交互模式进入
>
> -t		打开一个虚拟终端
>
> -d        容器在后台运行
>
> --name    容器自定义名称

	执行该命令时，Docker 首先会检查本地是否存在这样一个镜像，若本地存在这个镜像，则会从本地镜像中创建容器并运行它；若不存在，将会先从 Docker Hub 中搜索并下载这个镜像，然后再创建容器并运行它。

> **例：创建一个 ubuntu 容器**	
>
> ![img](https://mmbiz.qpic.cn/mmbiz_png/qV7dCko6yMiaHubK4zibWicena0u55zcFYdJHlWLoc13M0ia2yqiauKj1HAJMQOKc1KhHmVUNLWu2afz7hc2TL0qLUQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
>
> 可以看到，输入命令按下回车键后，直接进入了 ubuntu 的命令行，而上面的原本是 CentOS 主机的命令行，说明已经成功创建并运行容器了。



### 删除容器

```shell
docker rm [option] {CONTAINER_NAMES/CONTAINER_ID}

## 删除全部容器
docker rmi -f $(docker images -aq)
```

> **常用 option：**
>
> -f	若容器正在运行，需加此参数强制删除



### 删除镜像

```shell
docker rmi [option] {CONTAINER_NAMES/CONTAINER_ID}
```

> **常用 option：**
>
> -f	若容器正在运行，需加此参数强制删除

### 进入容器

```shell
docker exec -it 775c7c9ee1e1 /bin/bash  
# 如mysql
docker exec -it mysql /bin/bash
```

### 容器开机自启

参考https://blog.csdn.net/wxb880114/article/details/82904765

```shell
## 启动容器
docker restart <CONTAINER ID>
## 设置开机自启
docker update --restart=always <CONTAINER ID>
```

## 安装mysql

[参考博客](https://juejin.cn/post/6844903925296922631)



## 安装MongoDB

```shell
## 以--auth认证方式启动镜像
docker run -itd --name mongo -p 27017:27017 -v mongo-data:/data/db mongo --auth

## 进入镜像（mongo admin是进入MongoDB的指令）
## 方式一:
docker exec -it mongo mongo admin
## 或（我常用）
docker exec -it mongo mongo
## 方式二：
docker exec -it mongo bash
mongo	

## 创建一个名为 admin，密码为 123456 的用户。
>  use admin
>  db.createUser({ user: "test", pwd: "test123", roles: [{ role: "root", db: "admin" }] })

## 尝试使用上面创建的用户信息进行连接。
> db.auth('admin', '123456')
```



#### 修改npm源

```powershell
npm install --registry=https://registry.npm.taobao.org	## 修改
npm config get registry	## 查看结果
```





# MongoDB

#### 开放对外端口和认证

/etc/mongodb.conf修改网卡为0.0.0.0，和开启验证

```shell
bind_ip = 0.0.0.0
auth = true
```



## 认证登录

```shell
mongo -u 用户名 -p 密码 --authenticationDatabase admin
```



## 查看用户

```js
show users
```



## 添加用户

> 超级管理员

```js
use admin
db.createUser({ user: "test", pwd: "test123", roles: [{ role: "root", db: "admin" }] })
```



> 小管理员

```js
use studio
db.createUser({ user: "test", pwd: "test123", roles: [{ role: "readWrite", db: "studio" }] })
```

## 删除用户	

```js
db.dropUser("test")
```

## 备份与恢复

#### 备份

> 整个数据库：
>

```shell
mongodump -h 127.0.0.1 -u 用户名 -p 密码 --authenticationDatabase admin -d forum -o ~/
```

> 单个集合：
>

```shell
mongoexport -h 127.0.0.1 -u 用户名 -p 密码 --authenticationDatabase admin -d gdut -c accessColor -o ~/accessColor.json
```

#### 恢复

> 整个数据库：
>

```shell
mongorestore -h 127.0.0.1 -u 用户名 -p 密码 --authenticationDatabase admin -d test2 forum
```

> 单个集合：
>

```shell
mongoimport -h 127.0.0.1 -u 用户名 -p 密码 --authenticationDatabase admin -d gdut -c grade grade.json
```




