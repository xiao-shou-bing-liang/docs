---
date: 2025-10-11
---

# day-06


## Today's Agenda

- [01-HttpClient](#_01-httpclient)
- [02-WeChat Mini Program Development](#_02-wechat-mini-program-development)
- [03-WeChat Login](#_03-wechat-login)
- [Importing the Product Browsing Feature Code](#importing-the-product-browsing-feature-code)

## 01-HttpClient

## Introduction

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-27.webp)

### Core APIs

- HttpClient
- HttpClients
- CloseableHttpClient
- HttpGet
- HttpPost

### Steps to Send a Request

- Create an HttpClient object
- Create an Http request object
- Call the execute method of HttpClient to send the request

## Introductory Example

Nothing much here really, just a test class I ran to try it out.

```java
package com.sky.test;

import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class HttpClientTest {
    @Test
    public void testGet() throws Exception{
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet("http://localhost:8080/user/shop/status");
        CloseableHttpResponse response = httpClient.execute(httpGet);

        int statusCode = response.getStatusLine().getStatusCode();
        System.out.println("statusCode:" + statusCode);

        HttpEntity entity = response.getEntity();
        String body = EntityUtils.toString(entity);
        System.out.println("body:" + body);

        response.close();
        httpClient.close();
    }

    @Test
    public void testPost() throws Exception{
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost("http://localhost:8080/admin/employee/login");
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("username", "admin");
        jsonObject.put("password", "123456");
        StringEntity entity = new StringEntity(jsonObject.toString());

        entity.setContentEncoding("UTF-8");
        entity.setContentType("application/json");
        httpPost.setEntity(entity);

        CloseableHttpResponse response = httpClient.execute(httpPost);
        int statusCode = response.getStatusLine().getStatusCode();
        System.out.println("statusCode:" + statusCode);

        HttpEntity entity1 = response.getEntity();
        String body = EntityUtils.toString(entity1);
        System.out.println("body:" + body);

        response.close();
        httpClient.close();
    }
}
```

## 02-WeChat Mini Program Development

A mini program is a new open capability that lets developers quickly build a mini program.

Mini programs can be conveniently acquired and shared within WeChat, and they also provide an excellent user experience.

## Introduction

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-28.webp)

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-29.webp)

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-30.webp)

## Preparations

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-31.webp)

What a pile of annoying registration steps — I can't hold it together.

## Introductory Example

### Mini Program Directory Structure

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-32.webp)

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-33.webp)

Some of the frontend stuff feels much simpler than Vue 3.

## 03-WeChat Login

## Requirements Analysis and Design

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-34.webp)

## Code Implementation

### WechatProperties

@Component
@ConfigurationProperties(prefix = "sky.wechat")

Used together, these two let you configure this properties class in the configuration file.

@Component injects it into the IOC container, and then you can just pull it out of the yml file and use it.

```java
package com.sky.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "sky.wechat")
@Data
public class WeChatProperties {

    private String appid; //小程序的appid
    private String secret; //小程序的秘钥
    private String mchid; //商户号
    private String mchSerialNo; //商户API证书的证书序列号
    private String privateKeyFilePath; //商户私钥文件
    private String apiV3Key; //证书解密的密钥
    private String weChatPayCertFilePath; //平台证书
    private String notifyUrl; //支付成功的回调地址
    private String refundNotifyUrl; //退款成功的回调地址

}
```

### application.yml

```yaml
sky:
  wechat:
    appid: ${sky.wechat.appid}
    secret: ${sky.wechat.secret}
```

### application-dev.yml

```yaml
sky:
	wechat:
	  appid: 脱敏
	  secret: 脱敏
```

### UserService

Nothing much to say about this one; who knows whether I'll even use it in the future.

```java
package com.sky.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.sky.constant.MessageConstant;
import com.sky.dto.UserLoginDTO;
import com.sky.entity.User;
import com.sky.exception.LoginFailedException;
import com.sky.mapper.UserMapper;
import com.sky.properties.WeChatProperties;
import com.sky.service.UserService;
import com.sky.utils.HttpClientUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    //微信服务接口地址
    public static final String WX_LOGIN = "https://api.weixin.qq.com/sns/jscode2session";

    @Autowired
    private WeChatProperties weChatProperties;

    @Autowired
    private UserMapper userMapper;

    @Override
    public User wxLogin(UserLoginDTO userLoginDTO) {
        //调用微信接口服务获得微信用户的openid
        String openid = getOpenid(userLoginDTO.getCode());

        //判断openid是否为空,如果为空表示登录失败,抛出业务异常
        if (openid == null) {
            throw new LoginFailedException(MessageConstant.LOGIN_FAILED);
        }
        //判断当前用户是否为新用户
        User user = userMapper.getByOpenid(openid);
        //如果是新用户,自动完成注册
        if (user == null) {
            user = User.builder()
                    .openid(openid)
                    .createTime(LocalDateTime.now())
                    .build();
            userMapper.insert(user);
        }
        //返回这个用户对象
        return user;
    }

    private String getOpenid(String code) {
        Map<String, String> map = new HashMap<>();
        map.put("appid", weChatProperties.getAppid());
        map.put("secret", weChatProperties.getSecret());
        map.put("js_code", code);
        map.put("grant_type", "authorization_code");
        String json = HttpClientUtil.doGet(WX_LOGIN, map);

        JSONObject jsonObject = JSON.parseObject(json);
        String openid = jsonObject.getString("openid");
        return openid;
    }
}

```

## Importing the Product Browsing Feature Code

Nothing special, just pure importing — this section is pretty boring.
