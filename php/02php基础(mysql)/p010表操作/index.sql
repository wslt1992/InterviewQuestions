/*1.修改表选项

  alter table 表名 表选项 [=] 值
*/
alter table class charset utf8;
alter table class charset GBK;
show create table class;

/*2.修改表名
  rename table 旧表名 to 新表名;
*/
rename table class to my_class;

/*3.新增字段
  alter table 表名 add [column] 新字段名 列类型 [列属性][位置first/after]
*/
desc my_class;
alter table my_class add column age int;
# 添加在表最前
alter table my_class add column age2 int first;
# 填加在name之后
alter table my_class add column age2 int after name;
desc my_class;
/*4.修改字段名
  alter table 表名 change 旧字段名 新字段名 字段类型 [列属性] [新位置]
*/
alter table my_class change age2 nianji int;
desc my_class;
/*5.修改字段类型（属性）
  alter table 表名 modify 字段名 新类型 [新属性][新位置]
*/
alter table my_class modify name varchar(20);
desc my_class;
/*6.删除字段
  alter table 表名 drop 字段名
*/
alter table my_class drop nianji;
describe my_class;
