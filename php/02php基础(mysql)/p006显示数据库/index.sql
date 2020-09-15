show databases;

/*

 mysql中包含的库
 information_schema 保存数据库的结构信息（表，库）
 mysql核心数据库，权限关系
 performance_schema效率库
 test 测试库：空
*/


# -----------------------------------
/*
 显示部分库
 like字段使用
 _:匹配单个字符
 %：匹配多个字符（相当于*）
 ‘my%’以my开头、‘%database’以database结尾
*/
# show databases like 'my%';

# -----------------------------------
/*
显示数据库创建语句
*/
# show create database mysqdatabase;