# create table 表名(
#                   字段名 字段类型 [字段属性],
#                   字段名 字段类型 [字段属性]
#                   )
#                   [表选项]
use mydatabase2;
create table class(
#     10个字符
    name varchar(10)
);

/*
指定引擎
create table student(
    name varchar(10)
) engine [=] innodb/myisam charset utf8;
*/

# ------------------------
# 复制已有表结构
/*
create table 表名 like 表名;
create table 表名 like 数据库名.表名; 从其他数据库复制
*/
create table classcopy like class;