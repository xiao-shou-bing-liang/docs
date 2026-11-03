---
date: 2025-10-12
---

# day-07


## Today's Agenda

- [01-Caching Dishes](#_01-caching-dishes)
- [02-Caching Setmeals](#_02-caching-setmeals)
- [03-Adding to the Shopping Cart](#_03-adding-to-the-shopping-cart)

## 01-Caching Dishes

## Problem Statement

The dish data displayed in the user-side mini program is all obtained by querying the database. If user-side traffic is relatively high, the pressure on database access grows accordingly.

## Implementation Approach

Cache the dish data in Redis to reduce database queries.

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-35.webp)

Cache logic analysis:

- Keep one copy of cached data for the dishes under each category
- Clear the cached data whenever the dish data in the database changes

## Code Implementation

### Controller

```java
package com.sky.controller.admin;

import com.sky.dto.DishDTO;
import com.sky.dto.DishPageQueryDTO;
import com.sky.result.PageResult;
import com.sky.result.Result;
import com.sky.service.DishService;
import com.sky.vo.DishVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@Slf4j
@RestController
@RequestMapping("/admin/dish")
public class DishController {
    @Autowired
    private DishService dishService;
    @Autowired
    private RedisTemplate redisTemplate;

    @PostMapping
    public Result save(@RequestBody DishDTO dishDTO) {
        log.info("新增菜品:{}", dishDTO);
        dishService.saveWithFlavor(dishDTO);
        String key = "dish_" + dishDTO.getCategoryId();
        cleanCache(key);
        return Result.success();
    }

    @GetMapping("/page")
    public Result<PageResult> page(DishPageQueryDTO dishPageQueryDTO) {
        log.info("菜品分页查询:{}", dishPageQueryDTO);
        PageResult pageResult = dishService.page(dishPageQueryDTO);
        return Result.success(pageResult);
    }

    @DeleteMapping
    public Result delete(@RequestParam List<Long> ids) {
        log.info("菜品批量删除:{}", ids);
        dishService.delete(ids);

        //将所有的菜品缓存数据清理掉,所有以dish_开头有的key
        cleanCache("dish_*");
        return Result.success();
    }

    @GetMapping("/{id}")
    public Result<DishVO> getById(@PathVariable Long id) {
        log.info("根据id查询菜品:{}", id);
        DishVO dishVO = dishService.getByIdWithFlavor(id);
        return Result.success(dishVO);
    }

    @PutMapping
    public Result update(@RequestBody DishDTO dishDTO) {
        log.info("修改菜品:{}", dishDTO);
        dishService.updateWithFLavor(dishDTO);

        cleanCache("dish_*");
        return Result.success();
    }

    @GetMapping("/list")
    public Result<List<DishVO>> getByCategoryId(@RequestParam Long categoryId) {
        log.info("根据分类id查询菜品:{}", categoryId);
        List<DishVO> dishVOList = dishService.getByCategoryId(categoryId);
        return Result.success(dishVOList);
    }

    @PostMapping("/status/{status}")
    public Result updateStatus(@PathVariable Integer status, @RequestParam Long id) {
        log.info("更新菜品售卖状态:{},{}", status,id);
        dishService.updateStatus(status,id);
        cleanCache("dish_*");
        return Result.success();
    }

    private void cleanCache(String pattern) {
        Set keys = redisTemplate.keys(pattern);
        redisTemplate.delete(keys);
    }
}
```

Below it I added a reusable private method that takes the name of the Redis cache to clean and deletes it; it gets called on create, delete, and update.

While I was at it, I also wrote one for updating a dish's sale status.

### Service

```java
void updateStatus(Integer status, Long id);
```

```java
@Override
public void updateStatus(Integer status, Long id) {
    Dish dish = dishMapper.getById(id);
    dish.setStatus(status);
    dishMapper.update(dish);
}
```

No new Mapper interface is needed either: just query it out, setStatus, and then update the dish.

## 02-Caching Setmeals

## Spring Cache

Spring Cache is a framework that implements annotation-based caching. You only need to add a single annotation to get caching working.

Spring Cache provides a layer of abstraction, and the underlying cache implementation can be swapped out, for example:

- EHCache
- Caffeine
- Redis

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-36.webp)

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-37.webp)

## Implementation Approach

- Import the Maven coordinates related to Spring Cache and Redis
- Add the @EnableCaching annotation to the startup class to enable the cache annotation feature
- Add the @Cacheable annotation to the list method of SetmealController on the user side
- Add the CacheEvict annotation to the save, delete, update, startOrStop and other methods of SetmealController on the admin side

## Code Implementation

### Startup Class

Add the @EnableCaching annotation to enable the cache annotation feature.

```java
package com.sky;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement //开启注解方式的事务管理
@EnableCaching//开启缓存注解功能
@Slf4j
public class SkyApplication {
    public static void main(String[] args) {
        SpringApplication.run(SkyApplication.class, args);
        log.info("server started");
    }
}
```

### Controller

#### User-Side SetmealController

For queries, add the annotation @Cacheable(cacheNames = "setmealCache", key = "#categoryId")

Before the get, it queries Redis first, and if the data isn't there it adds the cache.

```java
@GetMapping("/list")
@ApiOperation("根据分类id查询套餐")
@Cacheable(cacheNames = "setmealCache", key = "#categoryId")
public Result<List<Setmeal>> list(Long categoryId) {
    Setmeal setmeal = new Setmeal();
    setmeal.setCategoryId(categoryId);
    setmeal.setStatus(StatusConstant.ENABLE);
    List<Setmeal> list = setmealService.list(setmeal);
    return Result.success(list);
}
```

#### Admin-Side SetmealController

Create, delete, and update work the same way: remove the multiple entries from Redis.

```java
@PostMapping("/status/{status}")
@CacheEvict(cacheNames = "setmealCache",allEntries = true)
public Result updateStatus(@PathVariable Integer status,@RequestParam Long id){
    log.info("设置状态:{}{}",status,id);
    setMealService.updateStatus(status,id);
    return Result.success();
}
@PutMapping
@CacheEvict(cacheNames = "setmealCache",allEntries = true)
public Result update(@RequestBody SetmealDTO setmealDTO){
    log.info("修改套餐:{}", setmealDTO);
    setMealService.update(setmealDTO);
    return Result.success();
}
@DeleteMapping
@CacheEvict(cacheNames = "setmealCache",allEntries = tru
public Result delete(@RequestParam List<Long> ids){
    log.info("批量删除套餐:{}",ids);
    setMealService.delete(ids);
    return Result.success();
}
@PostMapping
@CacheEvict(cacheNames = "setmealCache",key = "#setmealDTO.categoryId")
public Result save(@RequestBody SetmealDTO setmealDTO){
    log.info("新增套餐:{}",setmealDTO);
    setMealService.save(setmealDTO);
    return Result.success();
}
```

## 03-Adding to the Shopping Cart

## Requirements Analysis and Design

Here I mainly got to know the database design of the shopping cart.

1. To use the convenient builder-pattern syntax, you must put the @Builder annotation on the entity class
2. Implementing the Serializable interface is simply to mark objects for serialization and deserialization, because classes in Java are meant to be used for network transmission
3. `serialVersionUID` is like the class's "serialization ID card". Declaring it explicitly can **avoid serialization compatibility problems caused by changes to the class structure**, which is especially important in scenarios that require persistent storage or network transmission of objects (such as shopping carts, user sessions, etc.). Declaring serialVersionUID explicitly here also lets old cached objects stay compatible with new objects
4. Also, regarding the shopping cart design: one shopping cart record holds one dish or setmeal or the like, and finally when querying the shopping cart you can just query by userId

```java
package com.sky.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 购物车
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingCart implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    //名称
    private String name;

    //用户id
    private Long userId;

    //菜品id
    private Long dishId;

    //套餐id
    private Long setmealId;

    //口味
    private String dishFlavor;

    //数量
    private Integer number;

    //金额
    private BigDecimal amount;

    //图片
    private String image;

    private LocalDateTime createTime;
}
```

## Code Implementation

### Controller

Create, delete, and update are all fine, buddy — nothing special here either.

```java
package com.sky.controller.user;

import com.sky.dto.ShoppingCartDTO;
import com.sky.entity.ShoppingCart;
import com.sky.result.Result;
import com.sky.service.ShoppingCartService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/user/shoppingCart")
public class ShoppingCartController {
    @Autowired
    private ShoppingCartService shoppingCartService;

    @PostMapping("/add")
    public Result add(@RequestBody ShoppingCartDTO shoppingCartDTO){
        log.info("添加购物车,商品信息为:{}",shoppingCartDTO);
        shoppingCartService.add(shoppingCartDTO);
        return Result.success();
    }

    @GetMapping("/list")
    public Result<List<ShoppingCart>> list(){
        List<ShoppingCart> list = shoppingCartService.showShoppingCart();
        return Result.success(list);
    }

    @DeleteMapping("/clean")
    public Result delete(){
        shoppingCartService.delete();
        return Result.success();
    }
}
```

### Service

The only slightly complicated logic here is the add logic, but it isn't actually complicated — it's just a bit more code.

First you determine whether this dish already exists in the cart; if it does not, then you branch on whether it is a dish or a setmeal; if it does exist, just plus 1; finally insert.

```java
package com.sky.service;

import com.sky.dto.ShoppingCartDTO;
import com.sky.entity.ShoppingCart;

import java.util.List;

public interface ShoppingCartService {
    void add(ShoppingCartDTO shoppingCartDTO);

    List<ShoppingCart> showShoppingCart();

    void delete();
}

```

```java
package com.sky.service.impl;

import com.sky.context.BaseContext;
import com.sky.dto.ShoppingCartDTO;
import com.sky.entity.Dish;
import com.sky.entity.Setmeal;
import com.sky.entity.ShoppingCart;
import com.sky.mapper.DishMapper;
import com.sky.mapper.SetmealMapper;
import com.sky.mapper.ShoppingCartMapper;
import com.sky.service.ShoppingCartService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {
    @Autowired
    private ShoppingCartMapper shoppingCartMapper;
    @Autowired
    private DishMapper dishMapper;
    @Autowired
    private SetmealMapper setmealMapper;

    @Override
    public void add(ShoppingCartDTO shoppingCartDTO) {
        //判断当前加入到购物车当中的菜品是否存在
        ShoppingCart shoppingCart = new ShoppingCart();
        BeanUtils.copyProperties(shoppingCartDTO, shoppingCart);
        Long userId = BaseContext.getCurrentId();
        shoppingCart.setUserId(userId);
        List<ShoppingCart> list = shoppingCartMapper.list(shoppingCart);
        //如果已经存在了就+1
        if (list != null && list.size() > 0) {
            ShoppingCart cart = list.get(0);
            cart.setNumber(cart.getNumber() + 1);
            shoppingCartMapper.updateNumberById(cart);
        } else {
            //如果不存在,需要插入一条购物车数据
            Long dishId = shoppingCartDTO.getDishId();
            if (dishId != null) {
                //本次添加到购物车的是菜品
                Dish dish = dishMapper.getById(dishId);
                shoppingCart.setName(dish.getName());
                shoppingCart.setImage(dish.getImage());
                shoppingCart.setAmount(dish.getPrice());
            } else {
                Long setmealId = shoppingCartDTO.getSetmealId();
                Setmeal setmeal = setmealMapper.getById(setmealId);
                shoppingCart.setName(setmeal.getName());
                shoppingCart.setImage(setmeal.getImage());
                shoppingCart.setAmount(setmeal.getPrice());
            }
            shoppingCart.setNumber(1);
            shoppingCart.setCreateTime(LocalDateTime.now());
            shoppingCartMapper.insert(shoppingCart);
        }
    }

    @Override
    public List<ShoppingCart> showShoppingCart() {
        Long userId = BaseContext.getCurrentId();
        ShoppingCart shoppingCart = ShoppingCart.builder()
                .userId(userId)
                .build();
        List<ShoppingCart> list = shoppingCartMapper.list(shoppingCart);
        return list;
    }

    @Override
    public void delete() {
        Long userId = BaseContext.getCurrentId();
        shoppingCartMapper.delete(userId);
    }
}
```

### Mapper

```java
package com.sky.mapper;

import com.sky.entity.ShoppingCart;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface ShoppingCartMapper {
    List<ShoppingCart> list(ShoppingCart shoppingCart);

    @Update("update shopping_cart set number = #{number} where id = #{id}")
    void updateNumberById(ShoppingCart shoppingCart);

    @Insert("insert into shopping_cart(name, image, user_id, dish_id, setmeal_id, dish_flavor, number, amount, create_time) " +
            "VALUES (#{name}, #{image}, #{userId}, #{dishId}, #{setmealId}, #{dishFlavor}, #{number}, #{amount}, #{createTime})")
    void insert(ShoppingCart shoppingCart);

    @Delete("delete from shopping_cart where user_id = #{userId}")
    void delete(Long userId);
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.sky.mapper.ShoppingCartMapper">

    <select id="list" resultType="com.sky.entity.ShoppingCart">
        select * from shopping_cart
        <where>
            <if test="userId != null">
                and user_id = #{userId}
            </if>
            <if test="setmealId != null">
                and setmeal_id = #{setmealId}
            </if>
            <if test="dishId != null">
                and dish_id = #{dishId}
            </if>
            <if test="dishFlavor != null">
                and dish_flavor = #{dishFlavor}
            </if>
        </where>
    </select>
</mapper>

```
