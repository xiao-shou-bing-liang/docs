---
date: 2024-05-30
---

## Basics

### MySQL Overview

---

#### 1. Database-Related Concepts

|            Name             |                                        Full Name                                         |             Abbreviation             |
| :-------------------------: | :---------------------------------------------------------------------------------------: | :----------------------------------: |
|          Database           |      A warehouse for storing data; the data is stored in an organized way      |           Data Base (DB)           |
| Database Management System | Large software for operating and managing databases | Data Base Management System (DBMS) |
|             SQL             | Programming language for operating relational databases; defines a unified standard for operating relational databases | Structured Query Language (SQL) |

- Mainstream relational database management systems
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

#### 2. MySQL Database Preparation

- Just follow the installation steps all the way through
- Start and stop
  - `net start mysql80`
  - `net stop mysql80`

- Client connection
  - The client command-line tool provided by MySQL
  - Execute the command with the system's built-in command-line tool `mysql [-h 127.0.0.1] [-P 3306] -u root -p`

---

#### 3. Data Model

- Relational database (RDBMS)

  Concept: a database built on the relational model and composed of multiple interconnected two-dimensional tables

  | id  |    name    |      job       | dept_id |
  | :-: | :--------: | :------------: | :-----: |
  |  1  |  Jin Yong  |   President    |    2    |
  |  2  | Zhang Wuji | Project Manager |    1    |
  |  3  | Yang Xiao  |   Developer    |    3    |

---

### SQL

---

#### 1. General SQL Syntax

- SQL statements can be written on a single line or on multiple lines, and end with a semicolon
- Spaces/indentation can be used in SQL statements to improve readability
- SQL statements in the MySQL database are not case-sensitive; keywords are recommended to be uppercase
- Comments
  - Single-line comment: -- comment content or # comment content (unique to MySQL)
  - Multi-line comment: /* comment content */

---

#### 2. SQL Classification

| Category |          Full Name          |                                        Description                                        |
| --- | :------------------------: | :--------------------------: |
| DDL |  Data Definition Language  |  Data definition statements, used to define database objects (databases, tables, fields)  |
| DML | Data Manipulation Language |   Data manipulation language, used to add, delete and modify data in database tables   |
| DQL |    Data Query Language     |     Data query statements, used to query records in tables in a database     |
| DCL |   Data Control Language    | Data control language, used to create database users and control database access permissions |

---

#### 3. DDL

- Query

  - Query all databases

    ```sql
    SHOW DATABASES;
    ```

  - Query the current database

    ```sql
    SELECT DATABASE();
    ```

- Create

  ```sql
  CREATE DATABASE [IF NOT EXIST] 数据库名 [DEFAUL CHARSET 字符集] [COLLATE 排序规则];
  ```

- Drop

  ```sql
  DROP DATABASE [IF EXISTS] 数据库名;
  ```

- Use

  ```sql
  USE 数据库名;
  ```

---

#### 4. DDL - Table Operations - Create & Query

- Query all tables in the current database`show tables;`
- Query the table structure`desc 表名;`
- Query the create statement of the specified table`show create table 表名;`



- DDL - Table Operations - Create

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

#### 5. DDL - Data Types and Examples

|  Category  |       Type       |  Size   |      Signed Range      | Unsigned Range |        Description        |
| :------: | :--------------: | :-----: | :------------------: | :--------: | :----------------: |
| Numeric type |     tinyint      | 1 byte  |      (-128,127)      |    ...     |      Small integer value      |
| Numeric type |     smallint     | 2 bytes |    (-32768,32767)    |    ...     |      Large integer value      |
| Numeric type |    mediumint     | 3 bytes |  (-8388608,8388607)  |    ...     |      Large integer value      |
| Numeric type | int or integer | 4 bytes |         ...          |    ...     |      Large integer value      |
| Numeric type |      bigint      | 8 bytes |    (-2^63,2^63-1)    |    ...     |     Extremely large integer value     |
| Numeric type |      float       | 4 bytes |         ...          |    ...     |   Single-precision floating-point value   |
| Numeric type |      double      | 8 bytes |         ...          |    ...     |   Double-precision floating-point value   |
| Numeric type |     decimal      |         | Depends on m (precision) and d (scale) |    Same as left    | Decimal value (exact fixed-point number) |

- `age tinyint unsigned`

- `score double(4,1)`

|    Category    |    Type    |          Size          |             Description             |
| :--------: | :--------: | :-------------------: | :--------------------------: |
| String type |    char    |      0-255 bytes      |          Fixed-length string          |
| String type |  varchar   |     0-65535 bytes     |          Variable-length string          |
| String type |  tinyblob  |      0-255 bytes      | Binary data of no more than 255 characters  |
| String type |  tinytext  |      0-255 bytes      |         Short text string         |
| String type |    blob    |    0-65 535  bytes    |    Long text data in binary form    |
| String type |    text    |    0-65 535  bytes    |          Long text data          |
| String type | mediumblob |  0-16 777 215 bytes   | Medium-length text data in binary form |
| String type | mediumtext |  0-16 777 215 bytes   |       Medium-length text data       |
| String type |  longblob  | 0-4 294 967 295 bytes |   Extremely large text data in binary form   |
| String type |  longtext  | 0-4 294 967 295 bytes |         Extremely large text data         |

- `char(10)` has good performance
- `varchar(10)` has poor performance

|  Category  |   Type    | Size |                   Range                   |        Format        |           Description           |
| :------: | :-------: | :--: | :--------------------------------------: | :-----------------: | :----------------------: |
| Date type |   date    |  3   |          1000-01-01, 9999-12-31          |     YYYY-MM-DD      |          Date value          |
| Date type |   time    |  3   |          -838:59:59, 838:59:59           |      HH:MM:SS       |     Time value or duration     |
| Date type |   year    |  1   |                1901, 2155                |        YYYY         |          Year value          |
| Date type | datetime  |  8   |                   Composite                   | YYYY-MM-DD HH:MM:SS |     Combined date and time value     |
| Date type | timestamp |  4   | 1970-01-01 00:00:01 ,2038-01-19 03:14:07 | YYYY-MM-DD HH:MM:SS | Combined date and time value, timestamp |

---

#### 6. DDL - Table Operations - Modify & Drop

- DDL - Table Operations - Modify

  - Add a field

    ```sql
    alter table 表名 add 字段名 类型(长度) [comment 注释] [约束];
    ```

    Case:

    Add a new field "nickname" to the emp table

  - Modify the data type

    ```sql
    alter table 表名 modify 字段名 新数据类型(长度);
    ```

  - Modify the field name and field type

    ```sql
    alter table 表名 change 旧字段名 新字段名 类型(长度) [comment注释] [约束];
    ```

    Case:

    Change the nickname field of the emp table to username with the type varchar(30)

  - Rename the table

    ```sql
    alter table 表名 rename to 新表名;
    ```

- DDL - Table Operations - Drop

  - Drop a field

    ```sql
    alter table 表名 drop 字段名;
    ```

    Case:

    Drop the username field of the emp table

  - Drop a table

    ```sql
    drop table [if exist] 表名;
    ```

  - Drop the specified table and then recreate it

    ```sql
    truncate table 表名;
    ```

---

#### 7. DDL Summary

- Database operations

  ```sql
  show databases;
  create datebase 数据库名;
  use 数据库名;
  select database();#查看当前数据库
  drop database 数据库名;
  ```

- DDL - Table operations

  ```sql
  show tables;
  create table 表名(字段 字段类型，字段 字段类型);
  desc 表名;#查看表的信息
  show create table 表名;#查看表的详细信息
  alter table 表名 add/modify/change/drop/rename to...;
  drop table 表名;
  ```

---

#### 8. GUI Tool DataGrip

- MySQL GUI
  - sqlyog
  - Navicat
  - DataGrip

- The installation package in the Heima programmer materials already includes DataGrip

  The operation was also easy to pick up in a short time, and it is quite handy

---

#### 9. DML - Insert

- DML introduction

  The full English name of DML is Data Manipulation Language, which is used to add, delete and modify data records in tables in a database

  - Add data (insert)
  - Modify data (update)
  - Delete data (delete)

- DML - Add data

  - Add data to the specified fields

    ```sql
    insert into 表名(字段名1,字段名2,...) values(值1,值2,...);
    ```

  - Add data to all fields

    ```sql
    insert into 表名 values(值1,值2,...);
    ```

  - Add data in batches 

    ```sql
    insert into 表名(字段1名,字段2名,...) values(值1,值2,...),(值1,值2,...),(值1,值2,...);
    insert into 表名 values(值1,值2,...),(值1,值2,...),(值1,值2,...);
    ```

- Note

  - When inserting data, the order of the specified fields must correspond one-to-one with the order of the values.
  - String and date data should be enclosed in quotes.
  - The size of the inserted data should be within the specified range of the field.

---

#### 10. DML - Update and Delete

- DML - Modify data

  ```sql
  update 表名 set 字段1=值1,字段名2=值2,...[where 条件];
  ```

  - Note
    - The condition of a modification statement is optional; if there is no condition, all data in the whole table will be modified

- DML - Delete data

  ```sql
  delete from 表名 [where 条件]
  ```

  - Note
    - The condition of the delete statement is optional; if there is no condition, all data in the whole table will be deleted
    - The delete statement cannot delete the value of a single field (update can be used instead)

---

#### 11. DML Summary

- Add data

  ```sql
  insert into 表名(字段1,字段2,...) values(值1,值2,...)[,(值1,值2,...)...];
  ```

- Modify data

  ```sql
  update 表名 set 字段1=值1,字段2=值2 [where 条件];
  ```

- Delete data

  ```sql
  delete from 表名[where 条件];
  ```

---

#### 12. DQL - Basic Query

- DQL - Introduction

  The full English name of DQL is Data Query Language, which is used to query table records in a database

  Query keyword: select

- DQL - Syntax

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

  - Basic query
  - Conditional query (where)
  - Aggregate functions (count,max,min,avg,sum)
  - Group query (group by)
  - Sort query (order by)
  - Pagination query (limit)

- DQL - Basic query

  - Query multiple fields

    ```sql
    select 字段1,字段2,字段3,.. from 表名;
    select * from 表名;
    ```

  - Set aliases

    ```sql
    select 字段1 [as 别名1],字段2 [as 别名2] ... from 表名;
    ```

  - Remove duplicate records

    ```sql
    select distinct 字段列表 from 表名;
    ```


---

#### 13. DQL - Conditional Query

- DQL - Conditional query

  - Syntax

    ```sql
    select 字段列表 from 表名 where 条件列表
    ```

  - Conditions

    | Comparison Operator |                 Function                  |
    | :--------------: | :-----------------------------------: |
    |        >         |                 Greater than                  |
    |        >=        |               Greater than or equal to                |
    |        <         |                 Less than                  |
    |        <=        |               Less than or equal to                |
    |        =         |                 Equal to                  |
    |     <> or !=     |                Not equal to                 |
    | between...and... |     Within a certain range (including the minimum and maximum values)     |
    |     in(...)      |      One of the values in the list after in, multiple choice      |
    |   like placeholder    | Fuzzy matching (_ matches a single character, % matches any characters) |
    |     is NULL      |                Is NULL                 |

    | Logical Operator |            Function            |
    | :--------: | :------------------------: |
    | and or &&  |   And (multiple conditions hold at the same time)   |
    | or or \|\| | Or (any one of multiple conditions holds) |
    |  not or !  |          Not, negation           |

---

#### 14. DQL - Aggregate Functions

- DQL - Aggregate functions

  - Introduction

    Treat a column of data as a whole and perform a vertical calculation

  - Common aggregate functions

    | Function  |           Description           |
    | :---: | :----------------------: |
    | count |      Count the quantity (number of rows)      |
    |  max  |          Maximum value          |
    |  min  |          Minimum value          |
    |  avg  |          Average value          |
    |  sum  | Sum (sum of the values of each row) |

  - Syntax

    ```sql
    select 聚合函数(字段列表) from 表名;#聚合函数不包含null值
    ```

---

#### 15. DQL - Group Query

- DQL - Group query

  - Syntax

    ```sql
    select 字段列表 from 表名 [where 条件] group by 分组字段名 [having 分组后过滤条件];
    ```

  - Difference between where and having

    - Different execution timing: where filters before grouping, and records that do not satisfy the where condition do not participate in grouping; while having filters the results after grouping.
    - Different judgment conditions: where cannot judge aggregate functions, while having can.

  - Note

    - Execution order: where > aggregate functions > having
    - After grouping, the queried fields are generally aggregate functions and grouping fields; querying other fields is meaningless

---

#### 16. DQL - Sort Query

- DQL - Sort query

  - Syntax

    ```sql
    select 字段列表 from 表名 order by 字段1 排序方式1,字段2 排序方式2;
    ```

  - Sort methods
  
    - ASC: ascending order (default value)
    - DESC: descending order
  
  - Note
  
    If multiple fields are sorted, the second field is used for sorting only when the value of the first field is the same.

---

#### 17. DQL - Pagination Query

- DQL - Pagination query

  - Syntax

    ```sql
    select 字段列表 from 表名 limit 起始索引,查询记录数;
    ```

  - Note

    - The starting index starts from 0; starting index = (query page number - 1) * number of records displayed per page.
    - Pagination query is a database dialect; different databases have different implementations, and in MySQL it is limit.
    - If the first page of data is queried, the starting index can be omitted and simply written as limit 10.

---

#### 18. DQL - Execution Order

- DQL - Execution order

  - Writing order

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

  - Execution order

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

#### 19. DQL Summary

- DQL statement

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

#### 20. DCL - User Management

- DCL - Introduction

  The full name of DCL is Data Control Language, which is used to manage database users and control database access permissions

- DCL - Manage users

  - Query users

    ```sql
    use mysql;
    select * from user;
    ```

  - Create a user

    ```sql
    create user '用户名'@'主机名' identified by '密码';
    ```

  - Modify the user password

    ```sql
    alter user '用户名'@'主机名' identified with musql_native_password by '新密码';
    ```

  - Drop a user

    ```sql
    drop user '用户名'@'主机名';
    ```

---

#### 21. DCL - Permission Control

- DCL - Permission control

  MySQL defines many kinds of permissions, but the commonly used ones are the following:

  |       Permission       |       Description       |
  | :----------------: | :----------------: |
  | all,all privileges |      All permissions      |
  |       select       |      Query permission      |
  |       insert       |      Insert data      |
  |       update       |      Modify data      |
  |       delete       |      Delete data      |
  |       alter        |       Modify tables       |
  |        drop        | Drop databases/tables/views |
  |       create       |   Create databases/tables   |

  - Query permissions

    ```sql
    show grants for '用户名'@'主机名';
    ```

  - Grant permissions

    ```sql
    grant 权限列表 on 数据库名.表名 to '用户名'@'主机名';
    ```

  - Revoke permissions

    ```sql
    revoke 权限列表 on 数据库名.表名 from '用户名'@'主机名';
    ```

  - Note

    - Separate multiple permissions with ,
    - When granting, the database name and table name can be wildcarded with *, representing all

---

#### 22. DCL - Summary

- User management

  ```sql
  create user '用户名'@'主机名' identified by '密码';
  alter user '用户名'@'主机名' identified with musql_native_password by '新密码';
  drop user '用户名'@'主机名';
  ```

- Permission control

  ```sql
  grant 权限列表 on 数据库名.表名 to '用户名'@'主机名';
  revoke 权限列表 on 数据库名.表名 from '用户名'@'主机名';
  ```

---

### Functions

---

#### 1. Functions - String Functions

- A function is a program or code that can be called directly by another program

- String functions

  MySQL has many built-in string functions; the commonly used ones are as follows:

  |           Function           |                           Description                           |
  | :----------------------: | :-------------------------------------------------------: |
  |   concat(s1,s2,...,sn)   |        String concatenation, concatenating s1,s2,...,sn into a single string         |
  |        lower(str)        |                  Convert the whole string str to lowercase                  |
  |        upper(str)        |                  Convert the whole string str to uppercase                  |
  |     lpad(str,n,pad)      | Left padding, padding the left side of str with the string pad to reach a string length of n |
  |     rpad(str,n,pad)      | Right padding, padding the right side of str with the string pad to reach a string length of n |
  |        trim(str)         |                Remove the spaces at the head and tail of the string                 |
  | substring(str,start,len) |      Return a string of length len from the string str starting at position start      |

  ```sql
  select 函数(参数)
  ```

---

#### 2. Functions - Numeric Functions

- Numeric functions

  The common numeric functions are as follows

  |    Function    |                Description                |
  | :--------: | :--------------------------------: |
  |  ceil(x)   |              Round up              |
  |  floor(x)  |              Round down              |
  |  mod(x,y)  |            Return the modulus of x/y             |
  |   rand()   |         Return a random number between 0 and 1          |
  | round(x,y) | Round the parameter x, keeping y decimal places |

---

#### 3. Functions - Date Functions

- Date functions

  The common date functions are as follows:

  |                Function                |                       Description                       |
  | :--------------------------------: | :-----------------------------------------------: |
  |             curdate()              |                   Return the current date                   |
  |             curtime()              |                   Return the current time                   |
  |               now()                |                Return the current date and time                 |
  |             year(date)             |               Get the year of the specified date               |
  |            month(date)             |               Get the month of the specified date               |
  |             day(date)              |               Get the day of the specified date               |
  | date_add(date, interval expr type) | Return the time value of a date/time value plus a time interval expr |
  |       datediff(date1,date2)        |     Return the number of days between the start date date1 and the end date date2     |


---

#### 4. Functions - Flow Functions

- Flow functions are also a very commonly used type of function; they can implement conditional filtering in SQL statements, thereby improving statement efficiency

  |                           Function                           |                           Description                           |
  | :--------------------------------------------------------: | :-------------------------------------------------------: |
  |                       if(value,t,f)                        |            If value is true, return t; otherwise return f            |
  |                   ifnull(value1,value2)                    |         If value is not null, return value1; otherwise return value2         |
  |    case when [val1] then [res1] ... else [default] end     |    If val1 is true, return res1, ... otherwise return the default value default    |
  | case [expr] when [val1] then [res1] ... else [default] end | If the value of expr equals val1, return res1, ... otherwise return the default value default |

---

#### 5. Functions - Summary

- String functions

  ```sql
  concat,lower,upper,lpad,rpad,trim,substring
  ```

- Numeric functions

  ```sql
  ceil,floor,mod,rand,round
  ```

- Date functions

  ```sql
  curdate,curtime,now,year,month,day,date_add,datediff
  ```

- Flow functions

  ```sql
  if,finull,case when then end
  ```

---

### Constraints

---

#### 1. Constraints - Overview

- Concept

  Constraints are rules acting on the fields in a table, used to restrict the data stored in the table.

- Purpose

  Ensure the correctness, validity and integrity of the data in the database.

- Classification

  |           Constraint           |                           Description                           |   Keyword    |
  | :----------------------: | :------------------------------------------------------: | :---------: |
  |         Not-null constraint         |                Restrict the data of this field from being null                |  not null   |
  |         Unique constraint         |          Ensure that all data in this field is unique and not duplicated          |   unique    |
  |         Primary key constraint         |         The primary key is the unique identifier of a row of data and is required to be non-null and unique         | primary key |
  |         Default constraint         |      When saving data, if no value is specified for this field, the default value is used      |   default   |
  | Check constraint (after version 8.0.16) |                 Ensure that the field value satisfies a certain condition                 |    check    |
  |         Foreign key constraint         | Used to establish a connection between the data of two tables and ensure the consistency and integrity of the data | foreign key |

---

#### 2. Constraints - Demonstration

- Complete the creation of the table structure according to the requirements

  | Field Name |  Field Meaning  |  Field Type   |         Constraint Condition          |         Constraint Keyword          |
  | :----: | :--------: | :---------: | :-----------------------: | :-------------------------: |
  |   id   | Unique ID |     int     |    Primary key, and auto-increment     | primary key, auto_increment |
  |  name  |    Name    | varchar(10) |     Not null, and unique      |      not null, unique       |
  |  age   |    Age    |     int     |  Greater than 0 and less than or equal to 120   |            check            |
  | status |    Status    |   char(1)   | If this value is not specified, the default is 1 |           default           |
  | gender |    Gender    |   char(1)   |            None             |                             |

---

#### 3. Constraints - Foreign Key Constraints

- Concept

  A foreign key is used to establish a connection between the data of two tables, thereby ensuring the consistency and integrity of the data.

  Primary-----------Secondary  Parent------------Child

- Syntax

  - Add a foreign key

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

  - Drop a foreign key

    ```sql
    alter table 表名 drop foreign key 外键名称;
    ```

---

#### 4. Constraints - Foreign Key Delete and Update Behavior

- Delete/update behavior

  |    Behavior     |                             Description                             |
  | :---------: | :----------------------------------------------------------: |
  |  no action  | When deleting/updating the corresponding record in the parent table, first check whether the record has a corresponding foreign key; if it does, deletion/update is not allowed. (Consistent with restrict) |
  |  restrict   | When deleting/updating the corresponding record in the parent table, first check whether the record has a corresponding foreign key; if it does, deletion/update is not allowed. (Consistent with no action) |
  |   cascade   | When deleting/updating the corresponding record in the parent table, first check whether the record has a corresponding foreign key; if it does, the record of the foreign key in the child table is also deleted/updated. |
  |  set null   | When deleting the corresponding record in the parent table, first check whether the record has a corresponding foreign key; if it does, set the foreign key value in the child table to null. (This requires the foreign key to allow null) |
  | set default |  When the parent table changes, the child table sets the foreign key column to a default value (not supported by InnoDB)  |

  ```sql
  alter table 表名 add constraint 外键名称 foreign key(外键字段名) references 主表(主表列名) on update cascate on delete cascade;
  ```

---

#### 5. Constraints - Summary

- Types of constraints
  - Not-null constraint: not null
  - Unique constraint: unique
  - Primary key constraint: primary key (auto-increment: auto_increment)
  - Default constraint: default
  - Check constraint: check
  - Foreign key constraint: foreign key

---

### Multi-Table Queries

---

#### 1. Multi-Table Queries - Introduction to Multi-Table Relationships

In project development, when designing the table structure of a database, the table structure is analyzed and designed according to the business requirements and the relationships between business modules. Because the businesses are interrelated, there are also various connections between the table structures, which are basically divided into three types:

- One-to-many (many-to-one)
  - Case: the relationship between departments and employees
  - Relationship: one department corresponds to multiple employees, and one employee corresponds to one department
  - Implementation: create a foreign key on the many side, pointing to the one side
- Many-to-many
  - Case: the relationship between students and courses
  - Relationship: a student can take multiple courses, and a course can also be selected by multiple students
  - Implementation: create a third intermediate table; the intermediate table contains at least two foreign keys, which respectively associate the primary keys of the two sides
- One-to-one
  - Case: the relationship between users and user details
  - Relationship: a one-to-one relationship, mostly used for splitting a single table, placing the basic fields of a table in one table and the other detail fields in another table, so as to improve operation efficiency
  - Implementation: add a foreign key to either side, associate it with the primary key of the other side, and set the foreign key to be unique (unique)

---

#### 2. Multi-Table Queries - Overview of Multi-Table Queries

- Overview: refers to querying data from multiple tables

- Cartesian product: In mathematics, the Cartesian product refers to all the combinations of two sets, set a and set b. (In multi-table queries, invalid Cartesian products need to be eliminated)

- Classification of multi-table queries

  - Join query

    - Inner join: equivalent to querying the intersection of a and b

    - Outer join:

      Left outer join: query all the data of the left table, as well as the intersection of the two tables

      Right outer join: query all the data of the right table, as well as the intersection of the two tables

    - Self join: a join query of the current table with itself; a self join must use a table alias

  - Subquery

---

#### 3. Multi-Table Queries - Inner Join

- Inner join query syntax:

  - Implicit inner join

    ```sql
    select 字段列表 from 表1,表2 where 条件...;
    ```

  - Explicit inner join

    ```sql
    select 字段列表 from 表1 [inner] jion 表2 on 连接条件...;
    ```

  An inner join queries the intersection of the two tables

---

#### 4. Multi-Table Queries - Outer Join

- Outer join query syntax

  - Left outer join

    ```sql
    select 字段列表 from 表1 left [outer] join 表2 on 条件...;
    ```

  - Right outer join

    ```sql
    select 字段列表 from 表1 right [outer] join 表2 on 条件...;
    ```

---

#### 5. Multi-Table Queries - Self Join

- Self join query syntax

  ```sql
  select 字段列表 from 表a 别名a join 表a 别名b on 条件 ...;
  ```

  A self join query can be an inner join query or an outer join query.

---

#### 6. Multi-Table Queries - Union Query union, union all

- A union query merges the results of multiple queries into a new query result set

  ```sql
  select 字段列表 from 表a ...
  union [all]
  select 字段列表 from 表b ...;
  ```

  For a union query, the columns of the multiple tables must be consistent in number, and the field types also need to be consistent.

  union all merges all the data directly, while union deduplicates the merged data

---

#### 7. Multi-Table Queries - Introduction to Subqueries

- Concept: A select statement nested inside a SQL statement is called a nested query, also known as a subquery.

  ```sql
  select * from t1 where column1 = (select column from t2);
  ```

  The statement outside the subquery can be any of insert/update/delete/select

- According to the different subquery results, they are divided into:

  - Scalar subquery (the subquery result is a single value)
  - Column subquery (the subquery result is one column)
  - Row subquery (the subquery result is one row)
  - Table subquery (the subquery result is multiple rows and multiple columns)

---

#### 8. Multi-Table Queries - Scalar Subquery

- Scalar subquery

  The result returned by the subquery is a single value (a number, string, date, etc.), the simplest form; this kind of subquery is called a scalar subquery.

  Commonly used operators: = <> > >= < >=

---

#### 9. Multi-Table Queries - Column Subquery

- Column subquery

  The result returned by the subquery is one column (which may be multiple rows); this kind of subquery is called a column subquery.

  Commonly used operators: in, not in, any, some, all

  | Operator |                  Description                  |
  | :----: | :------------------------------------: |
  |   in   |      Within the specified set range, choose one      |
  | not in |         Not within the specified set range         |
  |  any   |  Any one of the list returned by the subquery needs to be satisfied  |
  |  some  | Equivalent to any; any can be used wherever some is used |
  |  all   |   All the conditions of the list returned by the subquery must be satisfied   |

---

#### 10. Multi-Table Queries - Row Subquery

- Row subquery

  The result returned by the subquery is one row (which may be multiple columns); this kind of subquery is called a row subquery

  Common operators: = <> in not all

- Example

  ```sql
  select * from emp where (salary,managerid)=(select salary,managerid from emp where name = '张无忌');
  ```

---

#### 11. Multi-Table Queries - Table Subquery

- Table subquery

  The result returned by the subquery is multiple rows and multiple columns; this kind of subquery is called a table subquery

  Commonly used operators: in

- Example

  ```sql
  select job,salary from emp where name = '鹿杖客' or name = '宋远桥';
  select * from emp where (job,salary) in ( select job,salary from emp where name = '鹿杖客' or name = '宋远桥' );
  ```

  ```sql
  select * from emp where entrydate > '2006-01-01';
  select e.*,d.* from (select * from emp where entrydate > '2006-01-01') e left join dept d on e.dept_id = d.id 
  ```

---

#### 12. Multi-Table Queries - Multi-Table Query Examples

- Complete the writing of the SQL statements according to the requirements
  - Query the employee's name, age, job and department information
  
    ```sql
    select e.name, e.age, e.job, d.name
    from emp e,
         dept d
    where e.dept_id = d.id;
    #隐式内连接
    ```
  
  - Query the name, age, job and department information of employees younger than 30
  
    ```sql
    select e.name, e.age, e.job, d.name
    from emp e
             inner join dept d on e.dept_id = d.id
    where e.age < 30;
    #显示内连接
    ```
  
  - Query the department id and department name of departments that have employees
  
    ```sql
    select distinct d.id, d.name
    from emp e,
         dept d
    where e.dept_id = d.id;
    #隐式内连接去重
    ```
  
  - Query all employees older than 40 and the name of the department they belong to; if an employee is not assigned to a department, it also needs to be displayed
  
    ```sql
    where e.dept_id = d.id;
    select e.*, d.name
    from emp e
             left join dept d on e.dept_id = d.id
    where e.age > 40;
    #左外连接
    ```
  
  - Query the salary grade of all employees
  
    ```sql
    select e.*, s.grade
    from emp e,
         salgrade s
    where e.salary >= s.losal
      and e.salary <= s.hisal;
    #隐式内连接
    ```
  
  - Query the information and salary grade of all employees in the "R&D Department"
  
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
  
  - Query the average salary of employees in the "R&D Department"
  
    ```sql
    select avg(e.salary)
    from emp e,
         dept d
    where e.dept_id = d.id
      and d.name = '研发部';
    #隐式内连接
    ```
  
  - Query the information of employees whose salary is higher than that of "Miejue"
  
    ```sql
    select *
    from emp
    where salary > (select salary from emp where name = '灭绝');
    #表子查询
    ```
  
  - Query the information of employees whose salary is higher than the average salary
  
    ```sql
    select *
    from emp e
    where salary > (select avg(salary) from emp);
    #表子查询
    ```
  
  - Query the information of employees whose salary is lower than the average salary of their own department
  
    ```sql
    select *
    from emp e2
    where e2.salary < (select avg(e1.salary) from emp e1 where e1.dept_id = e2.dept_id);
    #表子查询
    ```
  
  - Query all department information and count the number of employees in each department
  
    ```sql
    select d.id, d.name, (select count(*) from emp e where e.dept_id = d.id)
    from dept d;
    #表子查询
    ```
  
  - Query the course selection of all students, showing the student name, student number and course name

---

#### 13. Multi-Table Queries - Summary

- Multi-table relationships
  - One-to-many: set a foreign key on the many side, associating the primary key of the one side
  - Many-to-many: create an intermediate table; the intermediate table contains two foreign keys, associating the primary keys of the two tables
  - One-to-one: used for splitting the table structure; set a foreign key (unique) on either side, associating the primary key of the other side
- Multi-table queries
  - Inner join
    - Implicit
    - Explicit 
  - Outer join
    - Left outer
    - Right outer
  - Self join
  - Subquery

---

### Transactions

---

#### 1. Transactions - Introduction

- Transaction: a transaction is a collection of operations and an indivisible unit of work. A transaction submits or rolls back all operations to the system as a whole, that is, these operations either all succeed or all fail

  By default, MySQL transactions are committed automatically, which means that when a DML statement is executed, MySQL immediately and implicitly commits the transaction

---

#### 2. Transactions - Operation Demonstration

- Transaction operations

  - Start a transaction

    ```sql
    start transaction; #或者 begin;
    ```
  
    
  
  - View/set the transaction commit mode
  
    ```sql
    select @@autocommit;
    set @@autocommit=0;
    ```

  - Commit a transaction
  
    ```sql
    commit;
    ```
  
  - Roll back a transaction
  
    ```sql
    rollback;
    ```
  

---

#### 3. Transactions - The Four Characteristics of Transactions

- The four characteristics of transactions (ACID)
  - Atomicity: a transaction is the smallest indivisible unit of operation; it either all succeeds or all fails.
  - Consistency: when a transaction is completed, all data must be in a consistent state.
  - Isolation: the isolation mechanism provided by the database system ensures that transactions run in an independent environment that is not affected by external concurrent operations.
  - Durability: once a transaction is committed or rolled back, its changes to the data in the database are permanent.

---

#### 4. Transactions - Concurrent Transaction Problems

- Concurrent transaction problems

  | Problem      | Description                                                         |
  | ---------- | ------------------------------------------------------------ |
  | Dirty read      | A transaction reads data that another transaction has not yet committed.                     |
  | Non-repeatable read | A transaction reads the same record successively, but the data read twice is different; this is called non-repeatable read. |
  | Phantom read      | When a transaction queries data by condition, there is no corresponding data row, but when inserting data, it finds that this row of data already exists, as if a "phantom" had appeared. |

---

#### 5. Transactions - Transaction Isolation Levels

- Transaction isolation levels

  |     Isolation Level     | Dirty read | Non-repeatable read | Phantom read |
  | :--------------: | :--: | :--------: | :--: |
  | read uncommitted |  √   |     √      |  √   |
  |  read committed  |  ×   |     √      |  √   |
  | repeatable read  |  ×   |     ×      |  √   |
  |   serializable   |  ×   |     ×      |  ×   |

- View the transaction isolation level

  ```sql
  select @@transaction_isolation;
  ```

- Set the transaction isolation level

  ```sql
  set [session | global] transaction isolation level {read uncommitted | read committed | repeatable read | serializable};
  ```

- Note

  The higher the transaction isolation level, the safer the data, but the lower the performance.

---

#### 6. Transactions - Summary

- Transaction introduction: a transaction is a collection of operations; this group of operations either all executes successfully or all fails to execute

- Transaction operations

  ```sql
  start transaction;#开启事务
  commit / rollback;#提交/回滚事务
  ```

- The four characteristics of transactions

  - Atomicity
  - Consistency
  - Isolation
  - Durability
  
- Concurrent transaction problems

  - Dirty read
  - Non-repeatable read
  - Phantom read

- Transaction isolation levels
  - read uncommitted
  - read committed
  - repeatable read
  - serializable

---

### Basics Summary

- MySQL Overview
- SQL
- Functions
- Constraints
- Multi-Table Queries
- Transactions

## Advanced

### Storage Engines

---

#### 1. Storage Engines - MySQL Architecture

- Connection layer
- Service layer
- Engine layer
- Storage layer

---

#### 2. Storage Engines - Introduction to Storage Engines

- Introduction to storage engines

  A storage engine is the implementation of technologies such as storing data, building indexes, and updating/querying data. The storage engine is based on tables rather than databases, so the storage type can also be called the table type

- Query the create statement of a table (the default storage engine is InnoDB)

    ```sql
    show create table account;
    ```
    
- Specify the storage engine when creating a table

    ```sql
    create table 表名(
    	字段1 字段1类型 [comment 字段1注释],
        ...
        字段n 字段n类型 [comment 字段n注释],
    )engine=innodb [表注释];
    ```

- Query the storage engines supported by the current database

    ```sql
    show engines;
    ```

---

#### 3. Storage Engines - Storage Engine Characteristics

- InnoDB

  - Introduction

    InnoDB is a general-purpose storage engine that balances high reliability and high performance. After MySQL 5.5, InnoDB is the default MySQL storage engine.

  - Characteristics

    DML operations follow the ACID model and support **transactions**;

    **Row-level locks**, which improve concurrent access performance;

    Support **foreign key (FOREIGN KEY)** constraints, ensuring the integrity and correctness of the data;

  - Files

    xxx.ibd: xxx represents the table name. Each table of the InnoDB engine corresponds to such a tablespace file, which stores the table structure (frm, sdi), data and indexes of the table.

    Parameter: innodb_file_per_table

  - Logical storage structure

    - tablespace
    - segment
    - extent: 1m, 64page
    - page: 16k
    - row

---

#### 4. Storage Engines - MyISAM and Memory

- MyISAM

  - Introduction

    MyISAM was the default storage engine of MySQL in its early days

  - Characteristics

    Does not support transactions and does not support foreign keys

    Supports table locks, does not support row locks

    Fast access speed

  - Files

    xxx.sdi: stores table structure information
    xxx.MYD: stores data

    xxx.MYI: stores indexes

- Memory

  - Introduction

    The table data of the Memory engine is stored in memory. Due to the influence of hardware problems or power failure problems, these tables can only be used as temporary tables or caches.

  - Characteristics

    Stored in memory

    hash index (default)

  - Files

    xxx.sdi: stores table structure information

- Storage engine characteristics

  |    Characteristic     |      InnoDB       | MyISAM | Memory |
  | :----------: | :---------------: | :----: | :----: |
  |   Storage limit   |       64TB        |   Yes   |   Yes   |
  |   Transaction safety   |     **Supported**      |   -    |   -    |
  |    Locking mechanism    |     **Row locks**      |  Table locks  |  Table locks  |
  |  B+tree index  |       Supported        |  Supported  |  Supported  |
  |   Hash index   |         -         |   -    |  Supported  |
  |   Full-text index   | Supported (after version 5.6) |  Supported  |   -    |
  |   Space usage   |        High         |   Low   |  N/A   |
  |   Memory usage   |        High         |   Low   |  Medium  |
  | Batch insert speed |        Low         |   High   |   High   |
  |   Foreign key support   |     **Supported**      |   -    |   -    |

---

#### 5. Storage Engines - Selection

- Storage engine selection

  When selecting a storage engine, you should choose an appropriate storage engine according to the characteristics of the application system. For complex application systems, you can also choose a combination of multiple storage engines according to the actual situation

  - InnoDB:

    It is the default storage engine of MySQL and supports transactions and foreign keys. If the application has relatively high requirements for transaction integrity and requires data consistency under concurrent conditions, and data operations include many update and delete operations in addition to insert and query operations, then the InnoDB storage engine is a relatively suitable choice.

  - MyISAM:

    If the application is mainly based on read operations and insert operations, with only very few update and delete operations, and its requirements for transaction integrity and concurrency are not very high, then choosing this storage engine is very appropriate.

  - Memory:

    Stores all data in memory with fast access speed, and is usually used for temporary tables and caches. The disadvantage of Memory is that it has a limit on the table size; tables that are too large cannot be cached in memory, and the security of the data cannot be guaranteed.

---

#### 6. Storage Engines - Summary

- Architecture

  - Connection layer
  - Service layer
  - Engine layer
  - Storage layer

- Introduction to storage engines

  ```sql
  show engines;
  create table xxxx(....) engines=innodb;
  ```

- Storage engine characteristics

  InnoDB and MyISAM: transactions, foreign keys, row-level locks

- Storage engine applications

  InnoDB: stores the core data of business systems that has relatively high requirements for transactions and data integrity.

  MyISAM: stores the non-core transactions of business systems.

---

### Indexes

---

#### 1. Indexes - Overview

- Introduction

  An index is a **data structure (ordered)** that helps MySQL **obtain data efficiently**. In addition to the data, the database system also maintains data structures that satisfy specific search algorithms; these data structures reference (point to) the data in some way, so that advanced search algorithms can be implemented on these data structures, and this kind of data structure is an index.
