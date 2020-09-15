# 显示有哪些表
# show tables like '匹配模式'
show tables like 'c%';

# 显示表结构（名字，类型，属性）
# 语法： Describe 表名 desc 表名
describe class;
desc class;
show columns from class;

# 查看表创建语句
show create table class;
/* 命令行中使用*/
/* 可以改变表显示时，排列方式
show create table class\g;
show create table class\G;
*/
