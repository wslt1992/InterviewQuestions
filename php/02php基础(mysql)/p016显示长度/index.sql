# tinyint(4) 4表示数据的显示长度

# zerofile 会在左侧填充0
alter table my_int add int_7 tinyint zerofill first;
desc my_int;
insert into my_int values(1,1,1,1,1,1,1);
select * from my_int;

# 指定显示长度
alter table my_int add int_8 tinyint(2) zerofill first;
insert into my_int values(100,1,1,1,1,1,1,1);
insert into my_int values(1,1,1,1,1,1,1,1);
select * from my_int;
