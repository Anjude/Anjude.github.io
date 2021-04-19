# Mysql

## SQL

### 1.用户与登录

```shell
# 查找所有用户
SELECT User, Host, Password FROM mysql.user;
# 创建用户
CREATE USER 'username'@'host' IDENTIFIED BY 'password';
# 更改密码策略
ALTER user 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
# 授权
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
grant all privileges on *.* to '用户名'@'%' identified by '登录密码' with grant option；
GRANT privileges ON databasename.tablename TO 'username'@'host'
#设置密码
SET PASSWORD FOR 'username'@'host' = PASSWORD('newpassword');
# 修改root密码
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456'; 
# 修改当前用户密码
SET PASSWORD = PASSWORD("newpassword");
# 撤销用户权限
REVOKE privilege ON databasename.tablename FROM 'username'@'host';
# 删除用户
DROP USER 'username'@'host';
# 刷新设置
flush privileges;

# cmd连接远程mysql
mysql -uhello -pworld -h192.168.1.88 -P3306 -Dmysql_oa
mysql -u用户名 -p密码 -h远程数据库IP地址 -P端口 -D数据库名
```





## 优化

- explain + sql语句
- 垂直拆分、水平拆分
  - 垂直分表、垂直分库 -- 常用
  - 水平分表 -- 不常用
    - 分表标准
      - RANGE 0-10000 10001-20000等
      - HASH取模 同用户id可存在同一个数据库中
      - 地理区域
      - 时间
  - 造成问题
    - 事务支持，变成分布式事务
    - 多库结果集合并（group by, order by）
    - 跨库join

## 索引

### 索引分类

- 主键索引
- 唯一索引
- 普通索引（辅助索引/二级索引）
- 全文索引
- 组合索引

### InnoDB存储引擎

- 索引使用B+Tree结构
- InnoDB要求表必须有主键，如果没有显式指定，则MySQL系统会自动选择一个可以唯一标识数据记录的列作为主键，如果不存在这种列，则MySQL自动为InnoDB表生成一个隐含字段作为主键。
- 数据文件本身就是索引文件，叶节点data域保存了完整的数据结构
- 辅助索引：对于辅助索引的结构如下，与主键索引不同的是，叶节点的data存放存放主键索引的值，而不是地址，因此辅助索引进行检索时需要检索两遍索引,首先检索辅助索引获得主键，然后用主键到主索引中检索获得记录。
- 磁盘每页4KB（会预读周围几页），innodb每次读取16Kb
- 扰动函数，可以让hash算法算出来的值更均匀
- 前缀索引
- 回表，覆盖索引，组合索引，最左匹配
- 索引下推：减少IO,减少内存占用
- MRR、FIC

### **MyISAM存储引擎**

- 索引使用B+Tree结构
- 索引和数据分开存储，索引里只存指针

### Memory

- hash索引，适合内存型数据库，查找快

































