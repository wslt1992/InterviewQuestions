/*插入
  insert into 表名[字段列表] values(对应的字段列表)
  insert into 表名 values(对应表结果)
  */

create table my_teacher(
    name varchar(20),
    age int
);
insert into my_teacher(name,age) values ('jack',30);
insert into my_teacher values ('tom',32);

# [HY000][1366] Incorrect integer value: 'tom' for column 'age' at row 1
insert into my_teacher values (32,'tom');

