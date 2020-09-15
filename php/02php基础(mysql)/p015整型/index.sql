
# tinyint 1个字节=8位 -128~127
# smallint 小整形 2字节 0-65535
# mediumint 中整形 3字节
# int 小整形 4字节
# bigint 小整形 8字节

# 一般使用tinyint和int

create table my_int(
    int_1 tinyint,
    int_2 smallint,
    int_3 mediumint,
    int_4 int,
    int_5 bigint
);

insert into my_int values(1,10000,1090000,1000000,100000000);
# 错误的，超过范围
# Out of range value for column 'int_1' at row 1
insert into my_int values(255,255,255,255,255);

# 无符号设置 unsigned
alter table my_int add int_6 tinyint unsigned first;
desc my_int;