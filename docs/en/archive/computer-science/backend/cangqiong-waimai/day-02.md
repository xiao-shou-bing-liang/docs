---
date: 2025-10-06
---

# day-02


## Today's Table of Contents

- [01-Adding an Employee](#_01-adding-an-employee)
- [02-Employee Pagination Query](#_02-employee-pagination-query)
- [03-Enabling and Disabling Employee Accounts](#_03-enabling-and-disabling-employee-accounts)
- [04-Editing an Employee](#_04-editing-an-employee)
- [05-Importing the Category Module Code](#_05-importing-the-category-module-code)

## 01-Adding an Employee

## Requirements Analysis and Design

This project's conventions:

- Requests issued by the **admin side** uniformly use /admin as the prefix
- Requests issued by the **user side** uniformly use /user as the prefix

### Database Design

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-5.webp)

## Code Implementation

Compared with the earlier javaweb+ai course, a DTO — that is, a data transfer object — is used here to encapsulate the request

Actually there was a QueryParam type before as well, but it is different from this one: that one specifically encapsulated Get request parameters, while this one is for Post requests

So here @RequestBody is used to receive the JSON passed from the frontend, and then this DTO object is passed into the Service layer

After entering the Service layer, object property copying is used to assign the incoming DTO object to a newly created entity object, then the new object is assigned values below, and then the mapper is called with the object passed into it

### Controller

```java
@PostMapping
@ApiOperation("新增员工")
public Result save(@RequestBody EmployeeDTO employeeDTO) {
    log.info("新增员工:{}", employeeDTO);
    employeeService.save(employeeDTO);
    return Result.success();
}
```

### Service

```java
void save(EmployeeDTO employeeDTO);
```

```java
@Override
public void save(EmployeeDTO employeeDTO) {
    Employee employee = new Employee();
    //对象属性拷贝
    BeanUtils.copyProperties(employeeDTO, employee);
    //设置账号的状态
    employee.setStatus(StatusConstant.ENABLE);
    employee.setPassword(DigestUtils.md5DigestAsHex(PasswordConstant.DEFAULT_PASSWORD.getBytes()));
    employee.setCreateTime(LocalDateTime.now());
    employee.setUpdateTime(LocalDateTime.now());
    //TODO
    employee.setCreateUser(10L);
    employee.setUpdateUser(10L);
    employeeMapper.insert(employee);
}
```

### Mapper

```java
@Insert("insert into employee (name, username, password, phone, sex, id_number, create_time, update_time, create_user, update_user) " +
        "values" +
        "(#{name},#{username},#{password},#{phone},#{sex},#{idNumber},#{createTime},#{updateTime},#{createUser},#{updateUser})")
void insert(Employee employee);
```

## Setting Global Environment Variables in Apifox

Because every request must carry JWT token authentication, we configure the token in the header globally as the JWT token here

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-6.webp)

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-7.webp)

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-8.webp)

## Exception Handling

Adding a duplicate reports this type of error: SQLIntegrityConstraintViolationException

Then we get the error message, split that string, and finally return the error to the frontend

```java
@ExceptionHandler
public Result exceptionHandler(SQLIntegrityConstraintViolationException ex){
    String message = ex.getMessage();
    if(message.contains("Duplicate entry")){
        String[] split = message.split(" ");
        String username = split[2];
        String msg = username + "用户名已存在";
        return Result.error(msg);
    }else {
        return Result.error(MessageConstant.UNKNOWN_ERROR);
    }
```

## Operations When Adding an Employee

For this part, you need to call `BaseContext.*setCurrentId*(empId)**;`** at the point in the interceptor where the token is validated

Then modify it again in the Service implementation class

```java
employee.setCreateUser(BaseContext.getCurrentId());
employee.setUpdateUser(BaseContext.getCurrentId());
```

And here is BaseContext

```java
package com.sky.context;

public class BaseContext {

    public static ThreadLocal<Long> threadLocal = new ThreadLocal<>();

    public static void setCurrentId(Long id) {
        threadLocal.set(id);
    }

    public static Long getCurrentId() {
        return threadLocal.get();
    }

    public static void removeCurrentId() {
        threadLocal.remove();
    }

}
```

**ThreadLocal is used for thread-safe context passing**

This code uses `ThreadLocal` to safely store and pass context information such as the user ID in a multi-threaded web application. Each thread (usually corresponding to one HTTP request) has its own independent copy of the variable, which avoids data interference between threads and achieves thread safety without any synchronization mechanism. This way the current user ID can be conveniently obtained throughout the whole request handling process without passing parameters between every method, which is a common context management pattern in web development.

## 02-Employee Pagination Query

## Code Implementation

### Controller

What needs attention here is the generic type PageResult and that the type passed to the final return is also PageResult

```java
@GetMapping("/page")
@ApiOperation("员工分页查询")
public Result<PageResult> page(EmployeePageQueryDTO employeePageQueryDTO) {
    log.info("员工分页查询:{}", employeePageQueryDTO);
    PageResult pageResult = employeeService.pageQuery(employeePageQueryDTO);
    return Result.success(pageResult);
}
```

### Service

```java
PageResult pageQuery(EmployeePageQueryDTO employeePageQueryDTO);
```

Use PageHelper to implement pagination

First call the static method startPage in PageHelper, passing in the page parameter and the pageSize parameter from the DTO

Then call the Mapper method to save the result into the Page class provided by PageHelper

Then call the getTotal and getResult methods of the Page class, save them with variables, and finally return a newly created PageResult object

```java
@Override
public PageResult pageQuery(EmployeePageQueryDTO employeePageQueryDTO) {
    PageHelper.startPage(employeePageQueryDTO.getPage(),employeePageQueryDTO.getPageSize());
    Page<Employee> page = employeeMapper.pageQuery(employeePageQueryDTO);
    long total = page.getTotal();
    List<Employee> records = page.getResult();
    return new PageResult(total,records);
}
```

### Mapper

Fuzzy search on name

```java
Page<Employee> pageQuery(EmployeePageQueryDTO employeePageQueryDTO);
```

```xml
<select id="pageQuery" resultType="com.sky.entity.Employee">
    select * from employee
    <where>
        <if test="name != null and name != ''">
            and name like concat('%',#{name},'%')
        </if>
    </where>
    order by create_time desc
</select>
```

## Solving the JWT Token Expiration Problem

After using it for a while, I found that the global configuration I had just set in Apifox no longer worked, so I went straight to the utility class JwtUtil

```java
// 设置jwt的body
JwtBuilder builder = Jwts.builder()
        // 如果有私有声明，一定要先设置这个自己创建的私有的声明，这个是给builder的claim赋值，一旦写在标准的声明赋值之后，就是覆盖了那些标准的声明的
        .setClaims(claims)
        // 设置签名使用的签名算法和签名使用的秘钥
        .signWith(signatureAlgorithm, secretKey.getBytes(StandardCharsets.UTF_8));
        // 设置过期时间
        //.setExpiration(exp);
```

Just comment out setExpiration(exp) here, and the token becomes permanent; or leave it uncommented and go modify the configuration in application.yml

## Unifying the Date Format

The date format passed to the frontend here has not been formatted, which causes certain problems and makes the display look bad, so the format being passed needs to be changed

### Employee

```java
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
private LocalDateTime createTime;
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
private LocalDateTime updateTime;
```

Just add @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") to unify the format, but that still means configuring it one by one, hence the global configuration below

### WebMvcConfiguration

```java
@Override
protected void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
    log.info("扩展消息转换器");
    //创建一个消息转换器对象
    MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
    //需要为消息转换器设置一个对象转换器，对象转化器可以将java对象序列化为json数据
    converter.setObjectMapper(new JacksonObjectMapper());
    //将自己的消息转换器加入到容器中
    converters.add(0,converter);
}
```

The role of `converter.setObjectMapper(new JacksonObjectMapper());` here is to pass in the object mapper we defined ourselves

```java
package com.sky.json;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalTimeSerializer;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import static com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES;

/**
 * 对象映射器:基于jackson将Java对象转为json，或者将json转为Java对象
 * 将JSON解析为Java对象的过程称为 [从JSON反序列化Java对象]
 * 从Java对象生成JSON的过程称为 [序列化Java对象到JSON]
 */
public class JacksonObjectMapper extends ObjectMapper {

    public static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
    //public static final String DEFAULT_DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String DEFAULT_DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm";
    public static final String DEFAULT_TIME_FORMAT = "HH:mm:ss";

    public JacksonObjectMapper() {
        super();
        //收到未知属性时不报异常
        this.configure(FAIL_ON_UNKNOWN_PROPERTIES, false);

        //反序列化时，属性不存在的兼容处理
        this.getDeserializationConfig().withoutFeatures(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);

        SimpleModule simpleModule = new SimpleModule()
                .addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_TIME_FORMAT)))
                .addDeserializer(LocalDate.class, new LocalDateDeserializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_FORMAT)))
                .addDeserializer(LocalTime.class, new LocalTimeDeserializer(DateTimeFormatter.ofPattern(DEFAULT_TIME_FORMAT)))
                .addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_TIME_FORMAT)))
                .addSerializer(LocalDate.class, new LocalDateSerializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_FORMAT)))
                .addSerializer(LocalTime.class, new LocalTimeSerializer(DateTimeFormatter.ofPattern(DEFAULT_TIME_FORMAT)));

        //注册功能模块 例如，可以添加自定义序列化器和反序列化器
        this.registerModule(simpleModule);
    }
}
```

This way the format being passed is globally formatted

## 03-Enabling and Disabling Employee Accounts

## Requirements Analysis and Design

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-9.webp)

## Code Implementation

The idea for this part is to use a Mapper interface that updates employee information, then find the employee by the passed-in id and modify the employee's status

The update method in the Mapper interface here can modify any employee information, not limited to status

### Controller

```java
@PostMapping("/status/{status}")
@ApiOperation("启动禁用员工账号")
public Result startOrStop(@PathVariable Integer status,Long id) {
    log.info("启用禁用员工账号:{},{}",status,id);
    employeeService.startOrStop(status,id);
    return Result.success();
}
```

### Service

```java
void startOrStop(Integer status, Long id);
```

```java
@Override
public void startOrStop(Integer status, Long id) {
    //Employee employee = new Employee();
    //employee.setStatus(status);
    //employee.setId(id);
    Employee employee = Employee.builder().id(id).status(status).build();
    employeeMapper.update(employee);
}
```

There are two ways to pass parameters here: one is to assign values through setter methods, the other is to use the builder pattern for assignment

Using the builder for assignment requires the @Builder annotation in the Employee class; this annotation is **introduced by Lombok**

### Mapper

This part deepens the impression of update

update followed by the table name

Then below, dynamic SQL is used to determine which content to update

Finally where selects the object to update

```java
void update(Employee employee);
```

```xml
<update id="update">
        update employee
        <set>
            <if test="name != null">
                name = #{name},
            </if>
            <if test="username != null">
                username = #{username},
            </if>
            <if test="password != null">
                password = #{password},
            </if>
            <if test="phone != null">
                phone = #{phone},
            </if>
            <if test="sex != null">
                sex = #{sex},
            </if>
            <if test="idNumber != null">
                id_Number = #{idNumber},
            </if>
            <if test="updateTime != null">
                update_Time = #{updateTime},
            </if>
            <if test="updateUser != null">
                update_User = #{updateUser},
            </if>
            <if test="status != null">
                status = #{status},
            </if>
        </set>
        where id = #{id}
    </update>
```

## 04-Editing an Employee

## Requirements Analysis and Design

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-10.webp)

## Code Implementation

### Controller

Here I finally realized when to use the generic type of Result

Get requests generally need the generic type because they generally return JSON to the frontend

while other requests are for updating data and so on

```java
@GetMapping("/{id}")
@ApiOperation("根据id查询员工")
public Result<Employee> getById(@PathVariable Long id) {
    log.info("查询id为:{}的员工",id);
    Employee employee = employeeService.getById(id);
    return Result.success(employee);
}
@PutMapping
public Result update(@RequestBody EmployeeDTO employeeDTO) {
    log.info("更新员工:{}", employeeDTO);
    employeeService.update(employeeDTO);
    return Result.success();
```

### Service

```java
Employee getById(Long id);
void update(EmployeeDTO employeeDTO);
```

```java
@Override
public Employee getById(Long id) {
    Employee employee = employeeMapper.getById(id);
    employee.setPassword("****");
    return employee;
}
@Override
public void update(EmployeeDTO employeeDTO) {
    Employee employee = new Employee();
    BeanUtils.copyProperties(employeeDTO, employee);
    employee.setUpdateTime(LocalDateTime.now());
    employee.setUpdateUser(BaseContext.getCurrentId());
    employeeMapper.update(employee);
}
```

What still needs to be said is that property copying uses `BeanUtils.copyProperties`; this one has to be remembered well

### Mapper

```java
void update(Employee employee);
@Select("select * from employee where id = #{id}")
Employee getById(Long id);
```

```java
<select id="pageQuery" resultType="com.sky.entity.Employee">
    select * from employee
    <where>
        <if test="name != null and name != ''">
            and name like concat('%',#{name},'%')
        </if>
    </where>
    order by create_time desc
</select>
```

The update here has already been written above

## 05-Importing the Category Module Code

## Requirements Analysis and Design

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-11.webp)

## Implementation

what can I say

The environment disgusted me for half an hour, and I even had thoughts of giving up on Cangqiong Waimai

Maven threw an error the moment it built and was simply unusable

In the end, all it took was running clean in the lifecycle and then directly starting the Application launcher class; I really give up….

Another day of being disgusted by the environment
