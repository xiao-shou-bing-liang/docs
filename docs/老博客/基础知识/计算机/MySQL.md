## 基础篇

### MySQL概述

---

#### 1. 数据库相关概念

|      名称      |                             全称                             |                简称                |
| :------------: | :----------------------------------------------------------: | :--------------------------------: |
|     数据库     |            存储数据的仓库，数据是有组织的进行存储            |           Data Base (DB)           |
| 数据库管理系统 |                  操纵和管理数据库的大型软件                  | Data Base Management System (DBMS) |
|      SQL       | 操作关系型数据库的编程语言，定义了一套操作关系型数据库统一标准 |  Structured Query Language (SQL)   |

- 主流的关系型数据库管理系统
  - Oracle
  - MySQL
  - Microsoft SQL Server
  - PostgreSQL
  - IBM Db2
  - Microsoft Access
  - SQLite
  - MariaDB
  - Microsoft Azure SQL Database
  - Hive

---

#### 2. MySQL数据库准备

- 安装一路到底即可
- 启动与停止
  - `net start mysql80`
  - `net stop mysql80`

- 客户端连接
  - MySQL提供的客户端命令行工具
  - 系统自带的命令行工具执行指令 `mysql [-h 127.0.0.1] [-P 3306] -u root -p`

---

#### 3. 数据模型

- 关系型数据库(RDBMS)

  概念：建立在关系模型基础上，由多张相互连接的二维表组成的数据库

  |  id  |  name  |   job    | dept_id |
  | :--: | :----: | :------: | :-----: |
  |  1   |  金庸  |   总裁   |    2    |
  |  2   | 张无忌 | 项目经理 |    1    |
  |  3   |  杨逍  |   开发   |    3    |

---

### SQL

---

#### 1. SQL通用语法

- SQL语句可以单行或多行书写，以分号结尾
- SQL语句可以使用空格/缩进来增强语句的可读性
- MySQL数据库的SQL语句不区分大小写，关键字建议使用大写
- 注释
  - 单行注释：-- 注释内容 或 # 注释内容(MySQL独有)
  - 多行注释：/* 注释内容 */

---

#### 2. SQL分类

| 分类  |             全称             |              说明              |
| --- | :------------------------: | :--------------------------: |
| DDL |  Data Definition Language  |  数据定义语句，用来定义数据库对象(数据库，表，字段)  |
| DML | Data Manipulation Language |   数据操作语言，用来对数据库表中的数据进行增删改    |
| DQL |    Data Query Language     |     数据查询语句，用来查询数据库中表的记录      |
| DCL |   Data Control Language    | 数据控制语言，用来创建数据库用户以及控制数据库的访问权限 |

---

#### 3. DDL

- 查询

  - 查询所有数据库

    ```sql
    SHOW DATABASES;
    ```

  - 查询当前数据库

    ```sql
    SELECT DATABASE();
    ```

- 创建

  ```sql
  CREATE DATABASE [IF NOT EXIST] 数据库名 [DEFAUL CHARSET 字符集] [COLLATE 排序规则];
  ```

- 删除

  ```sql
  DROP DATABASE [IF EXISTS] 数据库名;
  ```

- 使用

  ```sql
  USE 数据库名;
  ```

---

#### 4. DDL-表操作-创建&查询

- 查询当前数据库所有表`show tables;`
- 查询表结构`desc 表名;`
- 查询指定表的建表语句`show create table 表名;`



- DDL-表操作-创建

  ```sql
  create table 表名(
  	字段1 字段1类型[comment 字段1注释],
  	字段2 字段2类型[comment 字段2注释],
  	字段3 字段3类型[comment 字段3注释],
  	...
  	字段n 字段n类型[comment 字段n注释],
  )[表注释];
  ```

---

#### 5. DDL-数据类型及案例

|   分类   |       类型       |  大小   |      有符号范围      | 无符号范围 |        描述        |
| :------: | :--------------: | :-----: | :------------------: | :--------: | :----------------: |
| 数值类型 |     tinyint      | 1 byte  |      (-128,127)      |    ...     |      小整数值      |
| 数值类型 |     smallint     | 2 bytes |    (-32768,32767)    |    ...     |      大整数值      |
| 数值类型 |    mediumint     | 3 bytes |  (-8388608,8388607)  |    ...     |      大整数值      |
| 数值类型 | int 或者 integer | 4 bytes |         ...          |    ...     |      大整数值      |
| 数值类型 |      bigint      | 8 bytes |    (-2^63,2^63-1)    |    ...     |     极大整数值     |
| 数值类型 |      float       | 4 bytes |         ...          |    ...     |   单精度浮点数值   |
| 数值类型 |      double      | 8 bytes |         ...          |    ...     |   双精度浮点数值   |
| 数值类型 |     decimal      |         | 依赖m(精度)和d(标度) |    同左    | 小数值(精确定点数) |

- `age tinyint unsigned`

- `score double(4,1)`

|    分类    |    类型    |         大小          |             描述             |
| :--------: | :--------: | :-------------------: | :--------------------------: |
| 字符串类型 |    char    |      0-255 bytes      |          定长字符串          |
| 字符串类型 |  varchar   |     0-65535 bytes     |          变长字符串          |
| 字符串类型 |  tinyblob  |      0-255 bytes      | 不超过255个字符的二进制数据  |
| 字符串类型 |  tinytext  |      0-255 bytes      |         短文本字符串         |
| 字符串类型 |    blob    |    0-65 535  bytes    |    二进制形式的长文本数据    |
| 字符串类型 |    text    |    0-65 535  bytes    |          长文本数据          |
| 字符串类型 | mediumblob |  0-16 777 215 bytes   | 二进制形式的中等长度文本数据 |
| 字符串类型 | mediumtext |  0-16 777 215 bytes   |       中等长度文本数据       |
| 字符串类型 |  longblob  | 0-4 294 967 295 bytes |   二进制形式的极大文本数据   |
| 字符串类型 |  longtext  | 0-4 294 967 295 bytes |         极大文本数据         |

- `char(10)`性能好
- `varchar(10)`性能差

|   分类   |   类型    | 大小 |                   范围                   |        格式         |           描述           |
| :------: | :-------: | :--: | :--------------------------------------: | :-----------------: | :----------------------: |
| 日期类型 |   date    |  3   |          1000-01-01, 9999-12-31          |     YYYY-MM-DD      |          日期值          |
| 日期类型 |   time    |  3   |          -838:59:59, 838:59:59           |      HH:MM:SS       |     时间值或持续时间     |
| 日期类型 |   year    |  1   |                1901, 2155                |        YYYY         |          年份值          |
| 日期类型 | datetime  |  8   |                   复合                   | YYYY-MM-DD HH:MM:SS |     混合日期和时间值     |
| 日期类型 | timestamp |  4   | 1970-01-01 00:00:01 ,2038-01-19 03:14:07 | YYYY-MM-DD HH:MM:SS | 混合日期和时间值，时间戳 |

---

#### 6. DDL-表操作-修改&删除

- DDL-表操作-修改

  - 添加字段

    ```sql
    alter table 表名 add 字段名 类型(长度) [comment 注释] [约束];
    ```

  ​       案例:

  ​       为emp表增加一个新的字段“昵称”为nickname

  - 修改数据类型

    ```sql
    alter table 表名 modify 字段名 新数据类型(长度);
    ```

  - 修改字段名和和字段类型

    ```sql
    alter table 表名 change 旧字段名 新字段名 类型(长度) [comment注释] [约束];
    ```

    案例:

    将emp表的nickname字段修改为username,类型为varchar(30)

  - 修改表名

    ```sql
    alter table 表名 rename to 新表名;
    ```

- DDL-表操作-删除

  - 删除字段

    ```sql
    alter table 表名 drop 字段名;
    ```

    案例:

    将emp表的字段username删除

  - 删除表

    ```sql
    drop table [if exist] 表名;
    ```

  - 删除指定表，并重新创建该表

    ```sql
    truncate table 表名;
    ```

---

#### 7. DDL小结

- 数据库操作

  ```sql
  show databases;
  create datebase 数据库名;
  use 数据库名;
  select database();#查看当前数据库
  drop database 数据库名;
  ```

- DDL-表操作

  ```sql
  show tables;
  create table 表名(字段 字段类型，字段 字段类型);
  desc 表名;#查看表的信息
  show create table 表名;#查看表的详细信息
  alter table 表名 add/modify/change/drop/rename to...;
  drop table 表名;
  ```

---

#### 8. 图形化界面工具DataGrip

- mysql图形化界面
  - sqlyog
  - Navicat
  - DataGrip

- 安装工具在黑马程序员的资料里面就有DataGrip

  操作也是简简单单学了一下下还是蛮好用的

---

#### 9. DML-插入

- DML介绍

  DML英文全称是Data Manipulation Language(数据操作语言),用来对数据库中表的数据记录进行增删改操作

  - 添加数据(insert)
  - 修改数据(update)
  - 删除数据(delete)

- DML-添加数据

  - 给指定字段添加数据

    ```sql
    insert into 表名(字段名1,字段名2,...) values(值1,值2,...);
    ```

  - 给全部字段添加数据

    ```sql
    insert into 表名 values(值1,值2,...);
    ```

  - 批量添加数据 

    ```sql
    insert into 表名(字段1名,字段2名,...) values(值1,值2,...),(值1,值2,...),(值1,值2,...);
    insert into 表名 values(值1,值2,...),(值1,值2,...),(值1,值2,...);
    ```

- 注意

  - 插入数据时，指定的字段顺序需要与值的顺序是一一对应的。
  - 字符串和日期型数据应该包含在引号中。
  - 插入的数据大小，应该在字段的规定范围内。

---

#### 10. DML-更新和删除

- DML-修改数据

  ```sql
  update 表名 set 字段1=值1,字段名2=值2,...[where 条件];
  ```

  - 注意
    - 修改语句的条件可以有，也可以没有，如果没有条件，则会修改整张表的所有数据

- DML-删除数据

  ```sql
  delete from 表名 [where 条件]
  ```

  - 注意
    - delete语句的条件可以有，也可以没有，如果没有条件，则会删除整张表的所有数据
    - delete语句不能删除某一个字段的值(可以使用update)

---

#### 11. DML小结

- 添加数据

  ```sql
  insert into 表名(字段1,字段2,...) values(值1,值2,...)[,(值1,值2,...)...];
  ```

- 修改数据

  ```sql
  update 表名 set 字段1=值1,字段2=值2 [where 条件];
  ```

- 删除数据

  ```sql
  delete from 表名[where 条件];
  ```

---

#### 12. DQL-基础查询

- DQL-介绍

  DQL英文全称Data Query Language(数据查询语言)，数据查询语言，用来查询数据库中的表记录

  查询关键字:select

- DQL-语法

  ```sql
  select
  	字段列表#基本查询
  from
  	表名列表#基本查询
  where
  	条件列表#条件查询
  group by
  	分组字段列表#分组查询
  having
  	分组后条件列表#分组查询
  order by
  	排序字段列表#排序查询
  limit
  	分页参数#分页查询
  ```

  - 基本查询
  - 条件查询(where)
  - 聚合函数(count,max,min,avg,sum)
  - 分组查询(group by)
  - 排序查询(order by)
  - 分页查询(limit)

- DQL-基本查询

  - 查询多个字段

    ```sql
    select 字段1,字段2,字段3,.. from 表名;
    select * from 表名;
    ```

  - 设置别名

    ```sql
    select 字段1 [as 别名1],字段2 [as 别名2] ... from 表名;
    ```

  - 去除重复记录

    ```sql
    select distinct 字段列表 from 表名;
    ```


---

#### 13. DQL-条件查询

- DQL-条件查询

  - 语法

    ```sql
    select 字段列表 from 表名 where 条件列表
    ```

  - 条件

    |    比较运算符    |                 功能                  |
    | :--------------: | :-----------------------------------: |
    |        >         |                 大于                  |
    |        >=        |               大于等于                |
    |        <         |                 小于                  |
    |        <=        |               小于等于                |
    |        =         |                 等于                  |
    |     <> 或 !=     |                不等于                 |
    | between...and... |     在某个范围之内(含最小,最大值)     |
    |     in(...)      |      在in之后的列表中的值,多选一      |
    |   like 占位符    | 模糊匹配(_匹配单个字符,%匹配任意字符) |
    |     is NULL      |                是NULL                 |

    | 逻辑运算符 |            功能            |
    | :--------: | :------------------------: |
    | and 或 &&  |   并且(多个条件同时成立)   |
    | or 或 \|\| | 或者(多个条件任意一个成立) |
    |  not 或 !  |          非,不是           |

---

#### 14. DQL-聚合函数

- DQL-聚合函数

  - 介绍

    将一列数据作为一个整体,进行纵向计算

  - 常见聚合函数

    | 函数  |           功能           |
    | :---: | :----------------------: |
    | count |      统计数量(行数)      |
    |  max  |          最大值          |
    |  min  |          最小值          |
    |  avg  |          平均值          |
    |  sum  | 求和(求每一行加起来的值) |

  - 语法

    ```sql
    select 聚合函数(字段列表) from 表名;#聚合函数不包含null值
    ```

---

#### 15. DQL-分组查询

- DQL-分组查询

  - 语法

    ```sql
    select 字段列表 from 表名 [where 条件] group by 分组字段名 [having 分组后过滤条件];
    ```

  - where 和 having 区别

    - 执行时机不同：where是分组之前进行过滤，不满足where条件，不参与分组；而having是分组之后对结果进行过滤。
    - 判断条件不同：where不能对聚合函数进行判断，而having可以。

  - 注意

    - 执行顺序：where > 聚合函数 > having
    - 分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义

---

#### 16. DQL-排序查询

- DQL-排序查询

  - 语法

    ```sql
    select 字段列表 from 表名 order by 字段1 排序方式1,字段2 排序方式2;
    ```

  - 排序方式
  
    - ASC：升序 (默认值)
    - DESC：降序
  
  - 注意
  
    如果是多字段排序，当地一个字段值相同时，才会根据第二个字段进行排序。

---

#### 17. DQL-分页查询

- DQL-分页查询

  - 语法

    ```sql
    select 字段列表 from 表名 limit 起始索引,查询记录数;
    ```

  - 注意

    - 起始索引从0开始，起始索引=(查询页码-1)*每页显示记录数。
    - 分页查询是数据库的方言，不同的数据库有不同的实现，MySQL中是limit。
    - 如果查询的是第一页数据，起始索引可以省略，直接简写为limit 10.

---

#### 18. DQL-执行顺序

- DQL-执行顺序

  - 编写顺序

    ```sql
    select
    	字段列表#基本查询
    from
    	表名列表#基本查询
    where
    	条件列表#条件查询
    group by
    	分组字段列表#分组查询
    having
    	分组后条件列表#分组查询
    order by
    	排序字段列表#排序查询
    limit
    	分页参数#分页查询
    ```

  - 执行顺序

    ```sql
    from
    	表名列表#基本查询
    where
    	条件列表#条件查询
    group by
    	分组字段列表#分组查询
    having
    	分组后条件列表#分组查询
    select
    	字段列表#基本查询
    having
    	分组后条件列表#分组查询
    order by
    	排序字段列表#排序查询
    limit
    	分页参数#分页查询
    ```


---

#### 19. DQL小结

- DQL语句

  ```sql
  select
  	字段列表#--------------->字段名[AS]别名
  from
  	表名
  where
  	条件列表#条件查询 分组之前过滤
  group by
  	分组字段列表#分组查询
  having
  	分组后条件列表#分组查询 分组之后过滤
  order by
  	排序字段列表#排序查询 升序ASC 降序DESC
  limit
  	分页参数#分页查询----->起始索引(从0开始)，每页展示记录数
  ```

---

#### 20. DCL-用户管理

- DCL-介绍

  DCL全程是Data Control Language(数据控制语言)，用来管理数据库用户，控制数据库的访问权限

- DCL-管理用户

  - 查询用户

    ```sql
    use mysql;
    select * from user;
    ```

  - 创建用户

    ```sql
    create user '用户名'@'主机名' identified by '密码';
    ```

  - 修改用户密码

    ```sql
    alter user '用户名'@'主机名' identified with musql_native_password by '新密码';
    ```

  - 删除用户

    ```sql
    drop user '用户名'@'主机名';
    ```

---

#### 21. DCL-权限控制

- DCL-权限控制

  MySQL中定义了很多种权限，但是常用的就以下几种：

  |        权限        |        说明        |
  | :----------------: | :----------------: |
  | all,all privileges |      所有权限      |
  |       select       |      查询权限      |
  |       insert       |      插入数据      |
  |       update       |      修改数据      |
  |       delete       |      删除数据      |
  |       alter        |       修改表       |
  |        drop        | 删除数据库/表/视图 |
  |       create       |   创建数据库/表    |

  - 查询权限

    ```sql
    show grants for '用户名'@'主机名';
    ```

  - 授予权限

    ```sql
    grant 权限列表 on 数据库名.表名 to '用户名'@'主机名';
    ```

  - 撤销权限

    ```sql
    revoke 权限列表 on 数据库名.表名 from '用户名'@'主机名';
    ```

  - 注意

    - 多个权限之间，使用,分隔
    - 授权时，数据库名和表名可以使用*进行通配，代表所有

---

#### 22. DCL-小结

- 用户管理

  ```sql
  create user '用户名'@'主机名' identified by '密码';
  alter user '用户名'@'主机名' identified with musql_native_password by '新密码';
  drop user '用户名'@'主机名';
  ```

- 权限控制

  ```sql
  grant 权限列表 on 数据库名.表名 to '用户名'@'主机名';
  revoke 权限列表 on 数据库名.表名 from '用户名'@'主机名';
  ```

---

### 函数

---

#### 1. 函数-字符串函数

- 函数是指可以直接被另一段程序调用的程序或代码

- 字符串函数

  MySQL中内置了很多字符串函数，常用的几个如下：

  |           函数           |                           功能                            |
  | :----------------------: | :-------------------------------------------------------: |
  |   concat(s1,s2,...,sn)   |        字符串拼接，将s1,s2,...,sn拼接成一个字符串         |
  |        lower(str)        |                  将字符串str全部转为小写                  |
  |        upper(str)        |                  将字符串str全部转为大写                  |
  |     lpad(str,n,pad)      | 左填充，用字符串pad对str的左边进行填充，达到n个字符串长度 |
  |     rpad(str,n,pad)      | 右填充，用字符串pad对str的右边进行填充，达到n个字符串长度 |
  |        trim(str)         |                去掉字符串头部和尾部的空格                 |
  | substring(str,start,len) |      返回从字符串str从start位置起的len个长度的字符串      |

  ```sql
  select 函数(参数)
  ```

---

#### 2. 函数-数值函数

- 数值函数

  常见的数值函数如下

  |    函数    |                功能                |
  | :--------: | :--------------------------------: |
  |  ceil(x)   |              向上取整              |
  |  floor(x)  |              向下取整              |
  |  mod(x,y)  |            返回x/y的模             |
  |   rand()   |         返回0~1内的随机数          |
  | round(x,y) | 求参数x的四舍五入的值，保留y位小数 |

---

#### 3. 函数-日期函数

- 日期函数

  常见的日期函数如下：

  |                函数                |                       功能                        |
  | :--------------------------------: | :-----------------------------------------------: |
  |             curdate()              |                   返回当前日期                    |
  |             curtime()              |                   返回当前时间                    |
  |               now()                |                返回当前日期和时间                 |
  |             year(date)             |               获取指定的date的年份                |
  |            month(date)             |               获取指定的date的月份                |
  |             day(date)              |               获取指定的date的日期                |
  | date_add(date, interval expr type) | 返回一个日期/时间值加上一个时间间隔expr后的时间值 |
  |       datediff(date1,date2)        |     返回起始时间date1和结束时date2之间的天数      |


---

#### 4. 函数-流程函数

- 流程函数也是很常用的一类函数，可以SQLl语句中实现条件筛选，从而提高语句效率

  |                            函数                            |                           功能                            |
  | :--------------------------------------------------------: | :-------------------------------------------------------: |
  |                       if(value,t,f)                        |            如果value为true，则返回t，否则返回f            |
  |                   ifnull(value1,value2)                    |         如value不为空，返回value1，否则返回value2         |
  |    case when [val1] then [res1] ... else [default] end     |    如果val1为true，返回res1， ...否则返回default默认值    |
  | case [expr] when [val1] then [res1] ... else [default] end | 如果expr的值等于val1，返回res1， ...否则返回default默认值 |

---

#### 5. 函数-小结

- 字符串函数

  ```sql
  concat,lower,upper,lpad,rpad,trim,substring
  ```

- 数值函数

  ```sql
  ceil,floor,mod,rand,round
  ```

- 日期函数

  ```sql
  curdate,curtime,now,year,month,day,date_add,datediff
  ```

- 流程函数

  ```sql
  if,finull,case when then end
  ```

---

### 约束

---

#### 1. 约束-概述

- 概念

  约束是作用于表中字段上的规则，用于限制存储在表中的数据。

- 目的

  保证数据库中的数据的正确、有效性和完整性。

- 分类

  |           约束           |                           描述                           |   关键字    |
  | :----------------------: | :------------------------------------------------------: | :---------: |
  |         非空约束         |                限制该字段的数据不能为null                |  not null   |
  |         唯一约束         |          保证该字段的所有数据都是唯一、不重复的          |   unique    |
  |         主键约束         |         主键是一行数据的唯一标识，要求非空且唯一         | primary key |
  |         默认约束         |      保存数据时，如果未指定该字段的值，则采用默认值      |   default   |
  | 检查约束(8.0.16版本之后) |                 保证字段值满足某一个条件                 |    check    |
  |         外键约束         | 用来让两张表的数据之间建立连接，保证数据的一致性和完整性 | foreign key |

---

#### 2. 约束-演示

- 根据需求，完成表结构的创建

  | 字段名 |  字段含义  |  字段类型   |         约束条件          |         约束关键字          |
  | :----: | :--------: | :---------: | :-----------------------: | :-------------------------: |
  |   id   | ID唯一标识 |     int     |    主键，并且自动增长     | primary key, auto_increment |
  |  name  |    姓名    | varchar(10) |     不为空，并且唯一      |      not null, unique       |
  |  age   |    年龄    |     int     |  大于0，并且小于等于120   |            check            |
  | status |    状态    |   char(1)   | 如果没有指定该值，默认为1 |           default           |
  | gender |    性别    |   char(1)   |            无             |                             |

---

#### 3. 约束-外键约束

- 概念

  外键用来让两张表的数据之间建立连接，从而保证数据的一致性和完整性。

  主-----------副  父------------子

- 语法

  - 添加外键

    ```sql
    create table 表名(
    	字段名 数据类型
        ...
        [constraint] [外键名称] foreign key(外键字段名) references 主表(主表列名)
    )：
    ```

    ```sql
    alter table 表名 add constraint 外键名称 foreign key(外键字段名) references 主表(主表列名);
    ```

  - 删除外键

    ```sql
    alter table 表名 drop foreign key 外键名称;
    ```

---

#### 4. 约束-外键删除更新行为

- 删除/更新行为

  |    行为     |                             说明                             |
  | :---------: | :----------------------------------------------------------: |
  |  no action  | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新。(与restrict一致) |
  |  restrict   | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新。(与no action一致) |
  |   cascade   | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有，则也删除/更新外键在子表中的记录。 |
  |  set null   | 当在父表中删除对应记录时，首先检查该记录是否有对应外键，如果有则设置子表中该外键值为null。(这就要求该外键允许取null) |
  | set default |  父表有变更时，子表将外键列设置成一个默认的值(lnnodb不支持)  |

  ```sql
  alter table 表名 add constraint 外键名称 foreign key(外键字段名) references 主表(主表列名) on update cascate on delete cascade;
  ```

---

#### 5. 约束-小结

- 约束种类
  - 非空约束：not null
  - 唯一约束：unique
  - 主键约束：primary key (自增：auto_increment)
  - 默认约束：default
  - 检查约束：check
  - 外键约束：foreign key

---

### 多表查询

---

#### 1. 多表查询-多表关系介绍

项目开发中，在进行数据库表结构设计时，会根据业务需求及业务模块之间的关系，分析并设计表结构，由于业务之间相互关联，所以各个表结构之间也存在着各种联系，基本上分为三种：

- 一对多(多对一)
  - 案例：部门与员工的关系
  - 关系：一个部门对应多个员工，一个员工对应一个部门
  - 实现：在多的一方建立外键，指向一的一方
- 多对多
  - 案例：学生与课程的关系
  - 关系：一个学生可以选修多门课程，一门课程也可以供多个学生选择
  - 实现：建立第三张中间表，中间表至少包含两个外键，分别关联两方主键
- 一对一
  - 案例：用户与用户详情的关系
  - 关系：一对一关系，多用于单表拆分，将一张表的基础字段放在一张表中，其他详情字段放在另一张表中，以提高操作效率
  - 实现：在任意一方加入外键，关联另外一方的主键，并且设置外键为唯一的(unique)

---

#### 2. 多表查询-多表查询概述

- 概述：指从多张表中查询数据

- 笛卡尔积：笛卡尔乘积是指在数学中，两个集合a集合和b集合的所有组合情况。（在多表查询时，需要消除无效的笛卡尔积）

- 多表查询分类

  - 连接查询

    - 内连接：相当于查询a、b交集部分数据

    - 外连接：

      左外连接：查询左表所有数据，以及两张表交集部分数据

      右外连接：查询右表所有数据，以及两张表交集部分数据

    - 自连接：当前表与自身的连接查询，自连接必须使用表别名

  - 子查询

---

#### 3. 多表查询-内连接

- 内连接查询语法：

  - 隐式内连接

    ```sql
    select 字段列表 from 表1,表2 where 条件...;
    ```

  - 显式内连接

    ```sql
    select 字段列表 from 表1 [inner] jion 表2 on 连接条件...;
    ```

  内连接查询的是两张表交集部分

---

#### 4. 多表查询-外连接

- 外连接查询语法

  - 左外连接

    ```sql
    select 字段列表 from 表1 left [outer] join 表2 on 条件...;
    ```

  - 右外连接

    ```sql
    select 字段列表 from 表1 right [outer] join 表2 on 条件...;
    ```

---

#### 5. 多表查询-自连接

- 自连接查询语法

  ```sql
  select 字段列表 from 表a 别名a join 表a 别名b on 条件 ...;
  ```

  自连接查询，可以是内连接查询，也可以是外连接查询。

---

#### 6. 多表查询-联合查询union，union all

- 对于union查询，就是把多次查询的结果合并起来，幸好曾一个新的查询结果集

  ```sql
  select 字段列表 from 表a ...
  union [all]
  select 字段列表 from 表b ...;
  ```

  对于联合查询的多张表的列数必须保持一致，字段类型也需要保持一致。

  union all 会将全部的数据直接合并在一起，union会对合并之后的数据去重

---

#### 7. 多表查询-子查询介绍

- 概念：SQL语句中嵌套select语句，称为嵌套查询，又称子查询.

  ```sql
  select * from t1 where column1 = (select column from t2);
  ```

  子查询外部的语句可以是insert/update/delete/select的任何一个

- 根据子查询结果不同，分为：

  - 标量子查询（子查询结果为单个值）
  - 列子查询（子查询结果为一列）
  - 行子查询（子查询结果为一行）
  - 表子查询（子查询结果为多行多列）

---

#### 8. 多表查询-标量子查询

- 标量子查询

  子查询返回的结果是个值（数字、字符串、日期等），最简单的形式，这种子查询称为标量子查询。

  常用的操作符：= <> > >= < >=

---

#### 9. 多表查询-列子查询

- 列子查询

  子查询返回的结果是一列（可以是多行），这种子查询称为列子查询。

  常用的操作符：in、not in、any、some、all

  | 操作符 |                  描述                  |
  | :----: | :------------------------------------: |
  |   in   |      在指定的集合范围之内，多选一      |
  | not in |         不在指定的集合范围之内         |
  |  any   |  子查询返回列表中，有任意一个满足即可  |
  |  some  | 与any等同，使用some的地方都可以使用any |
  |  all   |   子查询返回列表的所有条件都必须满足   |

---

#### 10. 多表查询-行子查询

- 行子查询

  子查询返回的结果是一行（可以是多列），这种子查询称为行子查询

  常用操作符：= <> in not all

- 示例

  ```sql
  select * from emp where (salary,managerid)=(select salary,managerid from emp where name = '张无忌');
  ```

---

#### 11. 多表查询-表子查询

- 表子查询

  子查询返回的结果是多行多列，这种子查询称为表表查询

  常用的操作符：in

- 示例

  ```sql
  select job,salary from emp where name = '鹿杖客' or name = '宋远桥';
  select * from emp where (job,salary) in ( select job,salary from emp where name = '鹿杖客' or name = '宋远桥' );
  ```

  ```sql
  select * from emp where entrydate > '2006-01-01';
  select e.*,d.* from (select * from emp where entrydate > '2006-01-01') e left join dept d on e.dept_id = d.id 
  ```

---

#### 12. 多表查询-多表查询案例

- 根据需求，完成SQL语句的编写
  - 查询员工的姓名、年龄、职位、部门信息
  
    ```sql
    select e.name, e.age, e.job, d.name
    from emp e,
         dept d
    where e.dept_id = d.id;
    #隐式内连接
    ```
  
  - 查询年龄小于30岁的员工姓名、年龄、职位、部门信息
  
    ```sql
    select e.name, e.age, e.job, d.name
    from emp e
             inner join dept d on e.dept_id = d.id
    where e.age < 30;
    #显示内连接
    ```
  
  - 查询拥有员工的部门id、部门名称
  
    ```sql
    select distinct d.id, d.name
    from emp e,
         dept d
    where e.dept_id = d.id;
    #隐式内连接去重
    ```
  
  - 查询所有年龄大于40岁的员工，及其归属的部门名称；如果员工没有分配部门，也需要展示出来
  
    ```sql
    where e.dept_id = d.id;
    select e.*, d.name
    from emp e
             left join dept d on e.dept_id = d.id
    where e.age > 40;
    #左外连接
    ```
  
  - 查询所有员工的工资等级
  
    ```sql
    select e.*, s.grade
    from emp e,
         salgrade s
    where e.salary >= s.losal
      and e.salary <= s.hisal;
    #隐式内连接
    ```
  
  - 查询“研发部”所有员工的信息及工资等级
  
    ```sql
    select e.*, s.grade
    from emp e,
         dept d,
         salgrade s
    where e.dept_id = d.id
      and (e.salary >= s.losal and e.salary <= s.hisal)
      and d.name = '研发部';
    #隐式内连接
    ```
  
  - 查询“研发部”员工的平均工资
  
    ```sql
    select avg(e.salary)
    from emp e,
         dept d
    where e.dept_id = d.id
      and d.name = '研发部';
    #隐式内连接
    ```
  
  - 查询工资比“灭绝”高的员工信息
  
    ```sql
    select *
    from emp
    where salary > (select salary from emp where name = '灭绝');
    #表子查询
    ```
  
  - 查询比平均薪资高的员工信息
  
    ```sql
    select *
    from emp e
    where salary > (select avg(salary) from emp);
    #表子查询
    ```
  
  - 查询低于本部门平均工资的员工信息
  
    ```sql
    select *
    from emp e2
    where e2.salary < (select avg(e1.salary) from emp e1 where e1.dept_id = e2.dept_id);
    #表子查询
    ```
  
  - 查询所有的部门信息，并统计部门的员工人数
  
    ```sql
    select d.id, d.name, (select count(*) from emp e where e.dept_id = d.id)
    from dept d;
    #表子查询
    ```
  
  - 查询所有学生的选课情况，展示出学生名称、学号、课程名称

---

#### 13. 多表查询-小结

- 多表关系
  - 一对多：在多的一方设置外键，关联一的一方的主键
  - 多对多：建立中间表，中间表包含两个外键，关联两张表的主键
  - 一对一：用于表结构拆分，在其中任何一方设置外键（unique），关联另一方的主键
- 多表查询
  - 内连接
    - 隐式
    - 显式 
  - 外连接
    - 左外
    - 右外
  - 自连接
  - 子查询

---

### 事务

---

#### 1. 事务-简介

- 事务：是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败

  默认MySQL的事务是自动提交的，也就是说，当执行一条DML语句，MySQL会立即隐式的提交事务

---

#### 2. 事务-操作演示

- 事务操作

  - 开启事务

    ```sql
    start transaction; #或者 begin;
    ```
  
    
  
  - 查看/设置事务提交方式
  
    ```sql
    select @@autocommit;
    set @@autocommit=0;
    ```

  - 提交事务
  
    ```sql
    commit;
    ```
  
  - 回滚事务
  
    ```sql
    rollback;
    ```
  

---

#### 3. 事务-事务的四大特性

- 事务四大特性（ACID）
  - 原子性（atomicity）：事务是不可分割的最小操作单元，要么全部成功，要么全部失败。
  - 一致性（consistency）：事务完成时，必须使所有的数据都保持一致状态。
  - 隔离性（lsolation）：数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行。
  - 持久性（durability）：事务一旦提交或回滚，他对数据库中的数据的改变就是永久的。

---

#### 4. 事务-并发事务问题

- 并发事务问题

  | 问题       | 描述                                                         |
  | ---------- | ------------------------------------------------------------ |
  | 脏读       | 一个事务读到另一个事务还没有提交的数据。                     |
  | 不可重复读 | 一个事务先后读取同一条记录，但两次读取的数据不同，称之为不可重复读。 |
  | 幻读       | 一个事务按照条件查询数据时，没有对应的数据行，但是在插入数据时，又发现这行数据已经存在，好像出现了”幻影“。 |

---

#### 5. 事务-事务隔离级别

- 事务隔离级别

  |     隔离级别     | 脏读 | 不可重复读 | 幻读 |
  | :--------------: | :--: | :--------: | :--: |
  | read uncommitted |  √   |     √      |  √   |
  |  read committed  |  ×   |     √      |  √   |
  | repeatable read  |  ×   |     ×      |  √   |
  |   serializable   |  ×   |     ×      |  ×   |

- 查看事务隔离级别

  ```sql
  select @@transaction_isolation;
  ```

- 设置事务隔离级别

  ```sql
  set [session | global] transaction isolation level {read uncommitted | read committed | repeatable read | serializable};
  ```

- 注意

  事务隔离级别越高，数据越安全，但是性能越低。

---

#### 6. 事务-小结

- 事务简介：事务时一组操作的集合，这组操作，要么全部执行成功，要么全部执行失败

- 事务操作

  ```sql
  start transaction;#开启事务
  commit / rollback;#提交/回滚事务
  ```

- 事务四大特性

  - 原子性
  - 一致性
  - 隔离性
  - 持久性
  
- 并发事务问题

  - 脏读
  - 不可重复读
  - 幻读

- 事务隔离级别
  - read uncommitted
  - read committed
  - repeatable read
  - serializable

---

### 基础篇总结

- MySQL概述
- SQL
- 函数
- 约束
- 多表查询
- 事务

## 进阶篇

### 存储引擎

---

#### 1. 存储引擎-MySQL体系结构

- 连接层
- 服务层
- 引擎层
- 存储层

---

#### 2. 存储引擎-存储引擎简介

- 存储引擎简介

  存储引擎就是存储数据、建立索引、更新/查询数据等技术的实现方式。存储引擎是基于表的，而不是基于库的，所以存储类型也可被称为表类型

- 查询建表语句(默认存储引擎innodb)

    ```sql
    show create table account;
    ```
    
- 在创建表时，指定存储引擎

    ```sql
    create table 表名(
    	字段1 字段1类型 [comment 字段1注释],
        ...
        字段n 字段n类型 [comment 字段n注释],
    )engine=innodb [表注释];
    ```

- 查询当前数据库支持的存储引擎

    ```sql
    show engines;
    ```

---

#### 3. 存储引擎-存储引擎特点

- InnoDB

  - 介绍

    InnoDB是一种兼顾高可靠性和高性能的通用存储引擎，在MySQL5.5之后，InnoDB是默认的MySQL存储引擎。

  - 特点

    DML操作遵循ACID模型，支持**事务**；

    **行级锁**，提高并发访问性能；

    支持**外键FOREIGN KEY**约束，保证数据的完整性和正确性；

  - 文件

    xxx.ibd: xxx代表的是表名，innodb引擎的每张表都会对应这样一个表空间文件，存储该表的表结构（frm、sdi）、数据和索引。

    参数：innodb_file_per_table

  - 逻辑存储结构

    - tablespace: 表空间
    - segment: 段
    - extent: 区 1m 64page
    - page: 页 16k
    - row: 行

---

#### 4. 存储引擎- MyISAM和Memory

- MyISAM

  - 介绍

    MyISAM是MySQL早期的默认存储引擎

  - 特点

    不支持事务，不支持外键

    支持表锁，不支持行锁

    访问速度快

  - 文件

    xxx.sdi: 存储表结构信息
    xxx.MYD: 存储数据

    xxx.MYI: 存储索引

- Memory

  - 介绍

    Memory引擎的表数据是存储在内存中的，由于受到硬件问题、或断电问题的影响，只能将这些表作为临时表或缓存使用。

  - 特点

    内存存放

    hash索引（默认）

  - 文件

    xxx.sdi: 存储表结构信息

- 存储引擎特点

  |     特点     |      InnoDB       | MyISAM | Memory |
  | :----------: | :---------------: | :----: | :----: |
  |   存储限制   |       64TB        |   有   |   有   |
  |   事务安全   |     **支持**      |   -    |   -    |
  |    锁机制    |     **行锁**      |  表锁  |  表锁  |
  |  B+tree索引  |       支持        |  支持  |  支持  |
  |   Hash索引   |         -         |   -    |  支持  |
  |   全文索引   | 支持(5.6版本之后) |  支持  |   -    |
  |   空间使用   |        高         |   低   |  N/A   |
  |   内存使用   |        高         |   低   |  中等  |
  | 批量插入速度 |        低         |   高   |   高   |
  |   支持外键   |     **支持**      |   -    |   -    |

---

#### 5. 存储引擎-选择

- 存储引擎选择

  在选择存储引擎时，应该根据应用系统的特点选择合适的存储引擎。对于复杂的应用系统，还可以根据实际情况选择多种存储引擎进行组合

  - InnoDB：

    是MySQL的默认存储引擎，支持事务、外键。如果应用对事物的完整性有比较高的要求，在并发条件下要求数据的一致性，数据操作除了插入和查询之外，还包含很多的更新、删除操作，那么InnoDB存储引擎是比较合适的选择。

  - MyISAM：

    如果应用是以读操作和插入操作为主，只有很少的更新和删除操作，并且对事务的完整性、并发性要求不是很高，那么选择这个存储引擎是非常合适。

  - Memory：

    将所有数据保存在内存中，访问速度快，通常用于临时表及缓存。Memory的缺陷就是对表的大小有限制，太大的表无法缓存在内存中，而且无法保障数据的安全性。

---

#### 6. 存储引擎-小结

- 体系结构

  - 连接层
  - 服务层
  - 引擎层
  - 存储层

- 存储引擎简介

  ```sql
  show engines;
  create table xxxx(....) engines=innodb;
  ```

- 存储引擎特点

  InnoDB与MyISAM：事务、外键、行级锁

- 存储引擎应用

  InnoDB：存储业务系统中对于事务、数据完整性要求较高的核心数据。

  MyISAM：存储业务系统的非核心事务。

---

### 索引

---

#### 1. 索引-索引概述

- 介绍

  索引（index）是帮助MySQL**高效获取数据**的**数据结构（有序）**。在数据之外，数据库系统还维护着满足特定查找算法的数据结构，这些数据结构以某种方式引用（指向）数据，这样就可以在这些数据结构上实现高级查找算法，这种数据结构就是索引。













































