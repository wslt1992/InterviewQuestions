select * from my_teacher;
insert into my_teacher values ('张三',20);

# 在cmd中插入数据库，当cmd的字符集（默认GBK）与数据库字符集不同时（utf8），需要设置字符集。
set names gbk;
set names utf8;

# 查看系统 client server connection 之间的关系字符集
show variables like 'character_set%';
# 改变系统变量
set character_set_client = gbk;