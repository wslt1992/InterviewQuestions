/*
    查询数据
    select 字段列表/* from 表名 where 字段名 = 值;
*/

select * from my_teacher;
select name from my_teacher;
select * from my_teacher where age>31;

/*
    删除操作
    delete from 表名 [where 条件]
    如果没有where，数据将被清空
*/
delete from my_teacher where age>0;

/*
    修改操作
    update 表名 set 字段名 = 新值 [where 条件]
    如果没有where,数据都被修改
*/
update my_teacher set age=28 where name='jack';
update my_teacher set age=27;