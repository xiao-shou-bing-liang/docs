---
date: 2025-10-05
---

# Summary of the JavaWeb + AI Heima Course

Last updated on 2025-10-05 22:07:23 

# Preface

Today I officially wrapped up this course. I skipped a few chapters along the way, but overall I still learned quite a lot from it — at the very least I picked up basic CRUD.

I still went through it in a hurry, mainly because time is tight right now: I'm already in the first semester of my junior year and my skills are still this weak. Over the winter break I was even thinking of applying for an internship. Also, before starting this course I was learning the React framework — knowing only Vue 3 beforehand was too limiting, and I felt I had to broaden my tech stack. I also ran into some questions about how to write API interfaces during the React course, so I decided to just come and study the backend directly and see what a Java backend actually looks like.

I'm not very good at writing the frontend API part, so I wanted to get familiar with basic network requests and the like, and that's how my JavaWeb journey began. My earlier Java SE study also used Heima Programmer's course on Bilibili — the one split into two halves — though I never finished watching it.

I started this course a long time ago. I watched a bit in my freshman year, picked it up again in March this year, and said in the first half of this month that I would continue, but I didn't watch much. The later topics — streams, IO streams and so on — I'd already come across some of them in JavaScript, and exceptions, threads and the rest aren't actually needed in practice for the time being, so I chose to go straight to this JavaWeb + AI course.

After finishing it I felt a bit hollow inside, and I thought writing a summary would make me feel more at ease. Then I agonized over whether to write it on paper or electronically — and since I recently bought a new keyboard, I'll write it electronically.

My fundamentals are still rather weak and my level is fairly average. My educational background is a double-non school (neither 985 nor 211) and a non-computer-science major, so there is a certain gap between me and those who came out of CS programs. Please go easy on me if my understanding falls short.

# Creating the Project Environment

## My Development Environment

Here I'm using IDEA version 25, and the JDK version is 17.

## Creating a New Project

This part is just creating a Spring Boot project directly through New Project in IDEA: choose Java as the language, Maven as the type, and remember to change the package name so that it matches the group name. Then, in the next step, remember to check:

- Lombok
- Spring Web
- Mybatis Framework
- MySQL Driver

After that, delete the redundant files and folders, leaving only src and pom.xml.

## pom.xml Dependencies

Besides the dependencies brought in by the steps above, others will be added one after another later on.

```xml
<!-- 分页查询要用的 -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>2.1.1</version>
</dependency>
<!-- 阿里云OSS存储依赖 -->
<dependency>
    <groupId>com.aliyun.oss</groupId>
    <artifactId>aliyun-sdk-oss</artifactId>
    <version>3.17.4</version>
</dependency>
<dependency>
    <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
    <version>2.3.1</version>
</dependency>
<dependency>
    <groupId>javax.activation</groupId>
    <artifactId>activation</artifactId>
    <version>1.1.1</version>
</dependency>
<dependency>
    <groupId>org.glassfish.jaxb</groupId>
    <artifactId>jaxb-runtime</artifactId>
    <version>2.3.3</version>
</dependency>
<!-- apo切片编程依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
<!-- jwt登录令牌认证依赖 -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
```

## application.yml Configuration

```yaml
# 项目核心配置文件（YAML格式）：包含应用标识、数据库连接、MyBatis框架、阿里云OSS存储配置
spring:
  application:
    # 配置Spring Boot应用名称：用于服务注册发现（如微服务场景）、日志/监控标识
    name: tlias-web-management
  datasource:
    # MySQL数据库连接地址：格式为jdbc:mysql://[IP]:[端口]/[数据库名]，此处IP、端口、数据库名已脱敏
    url: jdbc:mysql://xxx.xxx.xxx.xxx:xxxx/xxxx
    # MySQL驱动类：com.mysql.cj.jdbc.Driver适配MySQL 8.0+版本（5.x版本驱动为com.mysql.jdbc.Driver）
    driver-class-name: com.mysql.cj.jdbc.Driver
    # 数据库访问用户名：已脱敏
    username: xxx
    # 数据库访问密码：已脱敏，生产环境建议加密存储
    password: xxx
mybatis:
  configuration:
    # MyBatis日志输出配置：将SQL语句、参数、结果集打印到控制台，用于开发阶段调试SQL
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    # 开启下划线命名与驼峰命名自动映射：解决MySQL字段（如user_name）与Java实体属性（如userName）的映射问题，无需手动配置resultMap
    map-underscore-to-camel-case: true

# 阿里云OSS（对象存储服务）配置：用于项目中图片、文档等静态资源的上传/下载/存储，关键信息已脱敏
aliyun:
  oss:
    # OSS服务访问域名（Endpoint）：对应北京区域公网Endpoint格式，具体地址已脱敏
    endpoint: https://oss-cn-beijing.aliyuncs.com
    # OSS存储桶名称（Bucket）：已脱敏，需在阿里云OSS控制台提前创建
    bucketName: xxx
    # OSS存储桶所在区域：cn-beijing表示北京区域，需与Endpoint区域一致，避免跨区域访问异常
    region: cn-beijing
```

Compared with the original application.properties style, this is more concise and much clearer.

## logback.xml

The name of this configuration file must be exactly this, because that's the convention and it takes effect without any extra operations — you simply need to write this configuration file well.

The role of this configuration file is to control the console log output and also save that output to log files.

One more thing worth stressing: the @Slf4j annotation belongs to the Lombok library, not to Spring Boot.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- Logback日志框架配置文件：用于定义日志的输出方式、格式和存储策略 -->
<configuration>
    <!-- 1. 控制台日志输出器（命名为STDOUT） -->
    <!-- ConsoleAppender：Logback提供的控制台输出组件，负责将日志打印到控制台 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!-- 编码器：定义日志输出的格式 -->
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <!-- 日志格式说明：
                 %d{yyyy-MM-dd HH:mm:ss.SSS}：日志产生的时间（精确到毫秒）
                 [%thread]：当前线程名称
                 %-5level：日志级别（左对齐，占5个字符宽度，如INFO、ERROR）
                 %logger{50}：日志所属的类/日志器名称（最多显示50个字符，超出省略）
                 %msg%n：日志具体内容 + 换行符 -->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
    </appender>

    <!-- 2. 文件滚动日志输出器（命名为FILE） -->
    <!-- RollingFileAppender：Logback提供的文件输出组件，支持日志文件自动拆分（滚动） -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 滚动策略：定义日志文件何时/如何拆分 -->
        <!-- SizeAndTimeBasedRollingPolicy：按时间+文件大小双重条件拆分日志 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!-- 日志文件命名规则：
                 log/：日志文件存储的目录（项目根目录下的log文件夹）
                 %d{yyyy-MM-dd}：按日期分组（每天一个基础文件名）
                 %i：同一天内文件拆分的序号（从0开始，如log.2023-10-05.0.log、log.2023-10-05.1.log） -->
            <fileNamePattern>log/log.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <maxFileSize>10MB</maxFileSize> <!-- 单个日志文件的最大容量，超过则自动创建新文件 -->
            <maxHistory>30</maxHistory>      <!-- 日志文件保留天数，超过30天的旧日志会自动删除 -->
            <totalSizeCap>1GB</totalSizeCap> <!-- 所有日志文件的总容量限制，超过1GB会删除最旧的日志 -->
        </rollingPolicy>

        <!-- 文件日志编码器：格式与控制台保持一致，便于前后端日志对照排查问题 -->
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
    </appender>

    <!-- 3. 根日志器配置：控制整个项目的日志输出行为 -->
    <root level="INFO"> <!-- 全局日志级别：只输出INFO及以上级别日志（INFO/WARN/ERROR），忽略DEBUG/TRACE -->
        <appender-ref ref="STDOUT" /> <!-- 引用控制台输出器，日志同时输出到控制台 -->
        <appender-ref ref="FILE" />   <!-- 引用文件输出器，日志同时输出到文件 -->
    </root>
</configuration>
```

# Three-Layer Architecture Example (src)

First of all, I'm not sure whether it's rigorous to put it this way here, because my understanding of the Java backend is still shallow, so I'll just roughly describe the flow.

For the explanation here, let's refer to the student management part of the API documentation; I've pasted the link below.

[](https://heuqqdmbyk.feishu.cn/wiki/GyZVwpRf6ir89qkKtFqc0HlTnhg)

## pojo

This directory is where entity class files are kept.

### Result

This is used to wrap the result returned by the Controller layer.

```java
package xyz.cmcy.pojo;

import lombok.Data;

@Data
public class Result {
    private Integer code;
    private String msg;
    private Object data;

    public static Result success() {
        Result result = new Result();
        result.code = 1;
        result.msg = "success";
        return result;
    }

    public static Result success(Object object) {
        Result result = new Result();
        result.data = object;
        result.code = 1;
        result.msg = "success";
        return result;
    }

    public static Result error(String msg) {
        Result result = new Result();
        result.code = 0;
        result.msg = msg;
        return result;
    }
}
```

### PageResult

This class wraps the results returned by paginated queries.

```java
package xyz.cmcy.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResult<T> {
    private Long total;
    private List<T> rows;
}
```

### Student

This is the student class.

```java
package xyz.cmcy.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private Integer id; //ID
    private String name; //姓名
    private String no; //序号
    private Integer gender; //性别 , 1: 男 , 2 : 女
    private String phone; //手机号
    private String idCard; //身份证号
    private Integer isCollege; //是否来自于院校, 1: 是, 0: 否
    private String address; //联系地址
    private Integer degree; //最高学历, 1: 初中, 2: 高中 , 3: 大专 , 4: 本科 , 5: 硕士 , 6: 博士
    private LocalDate graduationDate; //毕业时间
    private Integer clazzId; //班级ID
    private Short violationCount; //违纪次数
    private Short violationScore; //违纪扣分
    private LocalDateTime createTime; //创建时间
    private LocalDateTime updateTime; //修改时间

    private String clazzName;//班级名称
}
```

### StudentQueryParam

This mainly wraps the parameters of the GET requests passed in from the frontend.

```java
package xyz.cmcy.pojo;

import lombok.Data;

@Data
public class StudentQueryParam {
    private String name;
    private Integer degree;
    private Integer clazzId;
    private Integer page = 1;
    private Integer pageSize = 10;
}
```

## Controller

The Controller layer is the first layer a request reaches when there are no filters or interceptors, and the last layer on the way back with the response. I'd like to think the code I wrote here is fairly tidy.

```java
package xyz.cmcy.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import xyz.cmcy.pojo.PageResult;
import xyz.cmcy.pojo.Result;
import xyz.cmcy.pojo.Student;
import xyz.cmcy.pojo.StudentQueryParam;
import xyz.cmcy.service.StudentService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping
    public Result page(StudentQueryParam studentQueryParam){
        log.info("分页查询学生，参数：{}", studentQueryParam);
        PageResult<Student> pageResult = studentService.page(studentQueryParam);
        return Result.success(pageResult);
    }
    @DeleteMapping("/{ids}")
    public Result delete(@PathVariable List<Integer> ids){
        log.info("删除学生:{}", ids);
        studentService.delete(ids);
        return Result.success();
    }
    @PostMapping
    public Result save(@RequestBody Student student){
        log.info("保存学生:{}", student);
        studentService.save(student);
        return Result.success();
    }
    @GetMapping("/{id}")
    public Result getInfo(@PathVariable Integer id){
        log.info("查询学生:{}", id);
        Student student = studentService.getInfo(id);
        return Result.success(student);
    }
    @PutMapping
    public Result update(@RequestBody Student student){
        log.info("更新学生:{}", student);
        studentService.update(student);
        return Result.success();
    }
    @PutMapping("/violation/{id}/{score}")
    public Result updateScore(@PathVariable Integer id, @PathVariable Short score){
        log.info("违纪处理:{},{}", id, score);
        studentService.updateScore(id, score);
        return Result.success();
    }

}
```

## Service

In Spring Boot, the Service layer adopts a structure of "interface (such as StudentService) + implementation class (such as StudentServiceImpl)" in order to follow the interface-oriented programming idea: the interface defines the functional specification and the implementation class handles the concrete logic, thereby reducing code coupling. This design makes later extension easy (you can add implementation classes without modifying the callers) and better supports Spring features such as AOP (dynamic proxies are generated based on interfaces). It also makes responsibilities clearer, which helps teamwork and unit testing — it is a best practice in enterprise development for improving code flexibility and maintainability.

### StudentService

The interface class

```java
package xyz.cmcy.service;

import xyz.cmcy.pojo.PageResult;
import xyz.cmcy.pojo.Student;
import xyz.cmcy.pojo.StudentQueryParam;

import java.util.List;

public interface StudentService {
    PageResult<Student> page(StudentQueryParam studentQueryParam);

    void delete(List<Integer> ids);

    void save(Student student);

    Student getInfo(Integer id);

    void update(Student student);

    void updateScore(Integer id, Short score);
}
```

### StudentServiceImpl

The implementation class

```java
package xyz.cmcy.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.cmcy.mapper.StudentMapper;
import xyz.cmcy.pojo.PageResult;
import xyz.cmcy.pojo.Student;
import xyz.cmcy.pojo.StudentQueryParam;
import xyz.cmcy.service.StudentService;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private StudentMapper studentMapper;

    @Override
    public PageResult<Student> page(StudentQueryParam studentQueryParam) {
        PageHelper.startPage(studentQueryParam.getPage(), studentQueryParam.getPageSize());
        List<Student> studentList = studentMapper.list(studentQueryParam);
        Page<Student> p = (Page<Student>) studentList;
        return new PageResult<Student>(p.getTotal(), p.getResult());
    }

    @Override
    public void delete(List<Integer> ids) {
        studentMapper.deleteByIds(ids);
    }

    @Override
    public void save(Student student) {
        student.setCreateTime(LocalDateTime.now());
        student.setUpdateTime(LocalDateTime.now());
        studentMapper.save(student);
    }

    @Override
    public Student getInfo(Integer id) {
        Student studentInfo = studentMapper.getInfo(id);
        return studentInfo;
    }

    @Override
    public void update(Student student) {
        student.setUpdateTime(LocalDateTime.now());
        studentMapper.updateById(student);
    }

    @Override
    public void updateScore(Integer id, Short score) {
        studentMapper.updateScore(id, score);
    }
}
```

## Mapper

### StudentMapper

```java
package xyz.cmcy.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import xyz.cmcy.pojo.Student;
import xyz.cmcy.pojo.StudentQueryParam;

import java.util.List;
import java.util.Map;

@Mapper
public interface StudentMapper {
    List<Student> list(StudentQueryParam studentQueryParam);

    void deleteByIds(List<Integer> ids);

    @Options(useGeneratedKeys = true, keyProperty = "id")
    @Insert("insert into student(name, no, gender, phone, id_card, is_college, address, degree, graduation_date, clazz_id, create_time, update_time)\n" +
            "values (#{name},#{no},#{gender},#{phone},#{idCard},#{isCollege},#{address},#{degree},#{graduationDate},#{clazzId},#{createTime},#{updateTime})")
    void save(Student student);

    Student getInfo(Integer id);

    void updateById(Student student);

    void updateScore(Integer id, Short score);

    @MapKey("name")
    List<Map<String, Object>> getStudentDegreeData();
}
```

In this `StudentMapper` interface, the methods annotated with `@Insert` and similar annotations (such as the `save` method) write the SQL logic directly through annotations; while the methods not decorated with any MyBatis annotation (such as `@Select`, `@Update`, `@Delete`) — namely `list`, `deleteByIds`, `getInfo`, `updateById`, `updateScore`, `getStudentDegreeData` — need their corresponding SQL statements configured and written in the accompanying MyBatis XML mapping file.

### xyz.cmcy.mapper

This package is under the resources folder.

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="xyz.cmcy.mapper.StudentMapper">
    <update id="updateById">
        update student set name = #{name},
        no = #{no},
        gender = #{gender},
        phone = #{phone},
        id_card = #{idCard},
        is_college = #{isCollege},
        address = #{address},
        degree = #{degree},
        graduation_date = #{graduationDate},
        clazz_id = #{clazzId},
        update_time = #{updateTime}
        where id = #{id}
    </update>
    <update id="updateScore">
        update student set violation_score = violation_score + #{score}
        where id = #{id}
    </update>
    <delete id="deleteByIds">
        delete from student where id in
        <foreach collection="ids" item="id" separator="," close=")" open="(">
            #{id}
        </foreach>
    </delete>
    <select id="list" resultType="xyz.cmcy.pojo.Student">
        select * from student s
        <where>
            <if test="name != null and name != ''">
                and s.name like concat('%',#{name},'%')
            </if>
            <if test="degree != null">
                and s.degree = #{degree}
            </if>
            <if test="clazzId != null">
                and s.clazz_id = #{clazzId}
            </if>
        </where>
        order by s.update_time desc
    </select>
    <select id="getInfo" resultType="xyz.cmcy.pojo.Student">
        select * from student where id = #{id}
    </select>
    <select id="getStudentDegreeData" resultType="java.util.Map">
        select (case
        when degree = 1 then '初中'
        when degree = 2 then '高中'
        when degree = 3 then '大专'
        when degree = 4 then '本科'
        when degree = 5 then '硕士'
        else '其他' end) name,
        count(*) value
        from student
        group by degree
        order by value
    </select>
</mapper>
```

# Alibaba Cloud OSS Object Storage

Since I've touched a little file upload, I'll give a rough explanation here.

First of all, this file upload code is placed under src/utils/.

### AliyunOSSProperties

This is a boomerang: the properties under aliyun.oss defined earlier in the application.yml file are used here, which helps improve the maintainability of the code.

```java
package xyz.cmcy.utils;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "aliyun.oss")
public class AliyunOSSProperties {
    private String endpoint;
    private String bucketName;
    private String region;
}
```

### AliyunOSSOpreator

```java
package xyz.cmcy.utils;

import com.aliyun.oss.ClientBuilderConfiguration;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.common.auth.CredentialsProviderFactory;
import com.aliyun.oss.common.auth.EnvironmentVariableCredentialsProvider;
import com.aliyun.oss.common.comm.SignVersion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Component
public class AliyunOSSOperator {
    @Autowired
    private AliyunOSSProperties aliyunOSSProperties;

    public String upload(byte[] content, String originalFilename) throws Exception {
        String endpoint = aliyunOSSProperties.getEndpoint();
        String bucketName = aliyunOSSProperties.getBucketName();
        String region = aliyunOSSProperties.getRegion();

        EnvironmentVariableCredentialsProvider credentialsProvider = CredentialsProviderFactory.newEnvironmentVariableCredentialsProvider();

        String dir = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM"));

        String newFilename = UUID.randomUUID() + originalFilename.substring(originalFilename.lastIndexOf("."));
        String objectName = dir + "/" + newFilename;

        ClientBuilderConfiguration clientBuilderConfiguration = new ClientBuilderConfiguration();
        clientBuilderConfiguration.setSignatureVersion(SignVersion.V4);
        OSS ossClient = OSSClientBuilder.create()
                .endpoint(endpoint)
                .credentialsProvider(credentialsProvider)
                .clientConfiguration(clientBuilderConfiguration)
                .region(region)
                .build();

        try {
            ossClient.putObject(bucketName, objectName, new ByteArrayInputStream(content));
        } finally {
            ossClient.shutdown();
        }

        return endpoint.split("//")[0] + "//" + bucketName + "." + endpoint.split("//")[1] + "/" + objectName;
    }
}
```

There isn't really much to say about this piece of code — mainly, when you need to use it, just look up the documentation on Alibaba Cloud OSS.

What needs attention is the handling of the file upload path, the handling of the filename, and the handling of the URL that is finally returned.

## UploadController

```java
package xyz.cmcy.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import xyz.cmcy.pojo.Result;
import xyz.cmcy.utils.AliyunOSSOperator;

import java.io.IOException;

@Slf4j
@RestController
public class UploadController {
    @Autowired
    private AliyunOSSOperator aliyunOSSOperator;

    @PostMapping("/upload")
    public Result upload(MultipartFile file) throws Exception {
        log.info("文件上传:{}", file.getOriginalFilename());
        String url = aliyunOSSOperator.upload(file.getBytes(), file.getOriginalFilename());
        log.info("文件上传OSS,URL:{}",url);
        return Result.success(url);
    }
}
```

No Service is needed — it just calls an Alibaba Cloud object storage utility class.

There are certain limitations here, though, because the course doesn't associate file upload with a user. My thinking is that this utility class should be called when a user updates their personal data, or when a user is newly created and uploads their own avatar, and finally the URL should be saved into the database, so the frontend can just call it whenever it wants to display it.

# Global Exception Handling

## GlobalExceptionHandler

This global exception handling class works thanks to the cooperation of the `@RestControllerAdvice` and `@ExceptionHandler` annotations: `@RestControllerAdvice` declares the class as a global controller enhancer and makes method return values automatically convert to JSON, while the methods marked with `@ExceptionHandler` are responsible for specific exceptions (such as `DuplicateKeyException`) and for all exceptions that have not been handled specifically (`Exception`) respectively; when a Controller throws an exception that is not caught locally, Spring automatically matches and executes the corresponding exception handling method, thereby achieving globally unified exception handling logic.

```java
package xyz.cmcy.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import xyz.cmcy.pojo.Result;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler
    public Result handleException(Exception e){
        log.error("服务器异常:{}",e.getMessage());
        return Result.error("服务器异常");
    }

    @ExceptionHandler
    public Result handleDuplicateKeyException(DuplicateKeyException e){
        log.error("数据库异常:{}",e.getMessage());
        return Result.error("数据库异常");
    }
}
```

# JWT Login Authentication + Request Interceptor

## JWT Login Authentication

A JWT token consists of three segments separated by periods (.): the Header, the Payload, and the Signature. The Header is a Base64Url-encoded JSON object that mainly states that the token type is JWT and which signing algorithm is used (for example HS256); the Payload is likewise a Base64Url-encoded JSON object, used to store claims that do not involve sensitive information, such as the user ID and the expiration time; the Signature is a signature generated by combining the encoded Header and Payload with a secret key (or key pair) and encrypting it according to the algorithm specified in the Header, with the purpose of verifying whether the token has been tampered with and whether it is genuinely valid. Together these three segments form the JWT string that can be used for data transmission.

### JwtUtils

```java
package xyz.cmcy.pojo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.Map;

/**
 * JWT令牌操作工具类
 */
public class JwtUtils {

    // 签名密钥，与测试类中保持一致
    private static final String SECRET_KEY = "Y2hpbWluZ2NoYW5neWlu";

    // 令牌过期时间：12小时（单位：毫秒）
    private static final long EXPIRATION_TIME = 12 * 3600 * 1000;

    /**
     * 生成JWT令牌
     * @param claims 要包含在令牌中的自定义数据
     * @return 生成的JWT令牌字符串
     */
    public static String generateToken(Map<String, Object> claims) {
        // 计算过期时间：当前时间 + 12小时
        Date expirationDate = new Date(System.currentTimeMillis() + EXPIRATION_TIME);

        // 构建并返回JWT令牌
        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)  // 使用HS256算法和指定密钥签名
                .addClaims(claims)  // 添加自定义数据
                .setExpiration(expirationDate)  // 设置过期时间
                .compact();  // 生成令牌字符串
    }

    /**
     * 解析JWT令牌
     * @param token 要解析的JWT令牌字符串
     * @return 令牌中包含的自定义数据（Claims对象）
     */
    public static Claims parseToken(String token) {
        // 解析令牌并返回其中的自定义数据
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)  // 指定签名密钥（必须与生成时使用的一致）
                .parseClaimsJws(token)  // 解析令牌
                .getBody();  // 获取包含自定义数据的Claims对象
    }
}
```

## Request Interceptor

A Filter is roughly equivalent to a global filter — any request will be intercepted, and it depends on the Servlet container.

Whereas the Interceptor described next only intercepts content inside the Spring container.

So for now it can be understood as: Filter encompasses Interceptor.

### TokenFilter

Just pay attention to the new annotation introduced here, @WebFilter — here it can match the paths to intercept. The configuration here is a global one, and the login or registration paths are excluded below.

Note that this takes effect through the mechanism of the Servlet specification, and has nothing to do with the IoC container in Spring.

The core is the role of the `@WebFilter(urlPatterns = "/*")` annotation: it declares the class as a filter and specifies that it intercepts all requests (`/*`)

```java
package xyz.cmcy.filter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import xyz.cmcy.pojo.JwtUtils;

import java.io.IOException;

@Slf4j
@WebFilter(urlPatterns = "/*")
public class TokenFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        //1.获取请求路径
        String requestURI = request.getRequestURI();
        //2.判断是否是登录请求,如果路径中包含 /login,说明是登录操作,放行
        if (requestURI.contains("/login")) {
            log.info("登录请求!放行!!!");
            filterChain.doFilter(request, response);
            return;
        }
        //3.获取请求头中的token
        String token = request.getHeader("token");
        //4.判断token是否存在,如果不存在,说明有就几乎没有登录,返回错误信息
        if (token == null || token.isEmpty()) {
            log.info("令牌为空响应,401");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        //5.如果token存在,校验令牌,如果校验失败,返回错误信息
        try {
            JwtUtils.parseToken(token);
        } catch (Exception e) {
            log.info("令牌非法,401");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        //6.校验通过放行
        log.info("令牌合法,放行!!!");
        filterChain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}

```

### TokenInterceptor

```java
package xyz.cmcy.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import xyz.cmcy.pojo.JwtUtils;

@Slf4j
@Component
public class TokenInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        String requestURI = request.getRequestURI();
//        //2.判断是否是登录请求,如果路径中包含 /login,说明是登录操作,放行
//        if (requestURI.contains("/login")) {
//            log.info("登录请求!放行!!!");
//            return true;
//        }
        //3.获取请求头中的token
        String token = request.getHeader("token");
        //4.判断token是否存在,如果不存在,说明有就几乎没有登录,返回错误信息
        if (token == null || token.isEmpty()) {
            log.info("令牌为空响应,401");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        //5.如果token存在,校验令牌,如果校验失败,返回错误信息
        try {
            JwtUtils.parseToken(token);
        } catch (Exception e) {
            log.info("令牌非法,401");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        //6.校验通过放行
        log.info("令牌合法,放行!!!");
        return true;
    }
}
```

### WebConfig

This is why the Interceptor above has the code for getting the URI and judging whether the URI contains the login or registration path commented out.

It's because of this place here.

This one is different from the above: this one is registered into Spring's IoC container.

The `WebConfig` class, marked with `@Configuration`, implements the `WebMvcConfigurer` interface; in the overridden `addInterceptors` method it registers `TokenInterceptor` through `InterceptorRegistry`, and configures it to intercept all requests (excluding the login endpoint); Spring loads this configuration class at startup, so that the interceptor takes effect globally according to the configured rules.

```java
package xyz.cmcy.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import xyz.cmcy.interceptor.TokenInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Autowired
    private TokenInterceptor tokenInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenInterceptor).addPathPatterns("/**").excludePathPatterns("/login");//拦截所有请求
    }
}
```

# AOP

I didn't look at this part carefully because it pulls in a whole bunch of new things here and I couldn't be bothered. For now I just want to have a concept so I can read the code, and I'll dig into it later in the Cangqiong Waimai course.

This AOP aspect can be used without manual injection because the `@Component` annotation has already registered `RecordTimeAspect` into the Spring IoC container, and `@Aspect` declares it as an aspect class and, in combination with `@Around`, defines the pointcut (intercepting all methods of `DeptServiceImpl`) and the enhancement logic; after Spring starts, it automatically recognizes this aspect in the container and parses the configuration, and when the target method executes, the aspect's enhancement logic is automatically triggered through a dynamic proxy, so it takes effect without explicitly injecting the aspect into other classes.

```java
@Component
@Aspect //当前类为切面类
@Slf4j
public class RecordTimeAspect {

    @Around("execution(* com.itheima.service.impl.DeptServiceImpl.*(..))")
    public Object recordTime(ProceedingJoinPoint pjp) throws Throwable {
        //记录方法执行开始时间
        long begin = System.currentTimeMillis();

        //执行原始方法
        Object result = pjp.proceed();

        //记录方法执行结束时间
        long end = System.currentTimeMillis();

        //计算方法执行耗时
        log.info("方法执行耗时: {}毫秒",end-begin);
        return result;
    }
}
```

# Final Words I Want to Say

I have to say, Spring Boot still provides a complete solution covering the entire project development lifecycle — much better than the patchwork of NestJS before. Backend really has to be Java after all.

As for why I could get through it in ten days, it's because the parts of this course:

- All the frontend parts
- MySQL
- Linux project deployment
- Docker deployment

I had all learned before.

So this course took me half the time it would take others.

And then I hope that in the coming month I can keep studying consistently and keep expanding my tech stack.
