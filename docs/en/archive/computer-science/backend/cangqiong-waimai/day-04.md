---
date: 2025-10-09
---

# day-04


## Today's Agenda

- [Paginated Query for Setmeals](#paginated-query-for-setmeals)
- [Adding a Setmeal](#adding-a-setmeal)
- [Batch Deleting Setmeals](#batch-deleting-setmeals)
- [Querying a Setmeal by id](#querying-a-setmeal-by-id)
- [Updating a Setmeal](#updating-a-setmeal)
- [Setting the Dish Status](#setting-the-dish-status)

## Paginated Query for Setmeals

## Controller

```java
@GetMapping("/page")
public Result<PageResult> page(SetmealPageQueryDTO setmealPageQueryDTO){
    log.info("分页查询参数:{}",setmealPageQueryDTO);
    PageResult pageResult = setMealService.page(setmealPageQueryDTO);
    return Result.success(pageResult);
}
```

Note here that the object passed in for the paginated query has to be this DTO class

Then there is the returned generic type; these are all familiar patterns by now

## Service

```java
PageResult page(SetmealPageQueryDTO setmealPageQueryDTO);
```

```java
@Override
public PageResult page(SetmealPageQueryDTO setmealPageQueryDTO) {
    PageHelper.startPage(setmealPageQueryDTO.getPage(),setmealPageQueryDTO.getPageSize());
    Setmeal setmeal = new Setmeal();
    BeanUtils.copyProperties(setmealPageQueryDTO,setmeal);
    Page<Setmeal> page = setmealMapper.page(setmeal);
    return new PageResult(page.getTotal(),page.getResult());
}
```

As always, PageHelper goes right from frame zero

Then copy the DTO object properties into the entity class

Then use the Page class with the entity class generic to call the Mapper interface

## Mapper

There is nothing particularly special here either

```java
Page<Setmeal> page(Setmeal setmeal);
```

```xml
<select id="page" resultType="com.sky.entity.Setmeal">
    select * from setmeal s
    <where>
        <if test="name != null">
            and s.name like concat('%',#{name},'%')
        </if>
        <if test="categoryId != null">
            and s.category_id like concat('%',#{categoryId},'%'
        </if>
        <if test="status != null">
            and s.status like concat('%',#{status},'%')
        </if>
    </where>
</select>
```

## Adding a Setmeal

## Controller

@RequestBody is used to accept the DTO, nothing much to say about that

```java
@PostMapping
public Result save(@RequestBody SetmealDTO setmealDTO){
    log.info("新增套餐:{}",setmealDTO);
    setMealService.save(setmealDTO);
    return Result.success();
}
```

## Service

@Transactional(rollbackFor = Exception.class) provides transaction management so that we do not end up saving only half of it

After copying the properties, first save the setmeal base table and then echo the id

Use a List single-column collection to receive the setmealDishes in the DTO and iterate over them, assigning the echoed id to each of them

Finally just insert

```java
@Override
@Transactional(rollbackFor = Exception.class)
public void save(SetmealDTO setmealDTO) {
    Setmeal setmeal = new Setmeal();
    BeanUtils.copyProperties(setmealDTO,setmeal);
    setmealMapper.save(setmeal);
    Long id = setmeal.getId();
    List<SetmealDish> setmealDishes = setmealDTO.getSetmealDishes();
    setmealDishes.forEach(setmealDish -> {
        setmealDish.setSetmealId(id);
    });
    setmealDishMapper.save(setmealDishes);
}
```

## Mapper

### SetMealMapper

A single insert with id echo is enough, and use common field filling

```java
@AutoFill(OperationType.INSERT)
void save(Setmeal setmeal);
```

```xml
<insert id="save" keyProperty="id" useGeneratedKeys="true">
    insert into setmeal (category_id, description, image, name, price, status)
    values (#{categoryId}, #{description}, #{image}, #{name}, #{price}, #{status})
</insert>
```

### SetMealDishMapper

```java
void save(List<SetmealDish> setmealDishes);
```

```xml
<insert id="save">
        insert into setmeal_dish (dish_id,copies,name,price,setmeal_id)
        values
        <foreach collection="setmealDishes" item="dish" separator=",">
            (
            #{dish.dishId},
            #{dish.copies},
            #{dish.name},
            #{dish.price},
            #{dish.setmealId}
            )
        </foreach>
    </insert>
```

Here it is just a batch insert looping with foreach, nothing more

## Batch Deleting Setmeals

## Controller

Note here that it passes @RequestParam query parameters for deletion. All I can say is that different interfaces are written differently; some of the earlier deletions were not written this way either

```java
@DeleteMapping
public Result delete(@RequestParam List<Long> ids){
    log.info("批量删除套餐:{}",ids);
    setMealService.delete(ids);
    return Result.success();
}
```

## Service

Transaction management keeps it from deleting only half. There is nothing much here either—just delete the records of the base table and the records of the table associated by the logical foreign key in one go

```java
void delete(List<Long> ids);
```

```java
@Override
@Transactional(rollbackFor = Exception.class)
public void delete(List<Long> ids) {
    setmealMapper.delete(ids);
    setmealDishMapper.delete(ids);
}
```

## Mapper

### SetMealMapper

foreach looping for batch deletion

```java
void delete(List<Long> ids);
```

```xml
<delete id="delete">
    delete from setmeal where id in
    <foreach collection="ids" open="(" close=")" separator="," item="id">
        #{id}
    </foreach>
</delete>
```

### SetMealDishMapper

Also foreach looping for batch deletion

```java
void delete(List<Long> ids);
```

```xml
<delete id="delete">
    delete from setmeal_dish where setmeal_id in
    <foreach collection="ids" open="(" close=")" separator="," item="id">
        #{id}
    </foreach>
</delete>
```

## Querying a Setmeal by id

## Controller

A VO object has to be returned for the frontend to display

```java
@GetMapping("/{id}")
public Result<SetmealVO> getById(@PathVariable Long id){
    log.info("根据id来查询:{}",id);
    SetmealVO setmealVO = setMealService.getById(id);
    return Result.success(setmealVO);
}
```

## Service

Query the records of the base table and the records of the table associated by the logical foreign key separately

Then encapsulate them into a VO object and pass it to the Controller, which passes it on to the frontend

```java
SetmealVO getById(Long id);
```

```java
@Override
public SetmealVO getById(Long id) {
    List<SetmealDish> setmealDishes = setmealDishMapper.getById(id);
    Setmeal setmeal = setmealMapper.getById(id);
    SetmealVO setmealVO = new SetmealVO();
    BeanUtils.copyProperties(setmeal,setmealVO);
    setmealVO.setSetmealDishes(setmealDishes);
    return setmealVO;
}
```

## Mapper

### SetMealMapper

A thoroughly unremarkable query statement

```java
Setmeal getById(Long id);
```

```xml
<select id="getById" resultType="com.sky.entity.Setmeal">
    select *
    from setmeal
    where id = #{id}
</select>
```

### SetMealDishMapper

Same as above

```java
List<SetmealDish> getById(Long id);
```

```xml
<select id="getById" resultType="com.sky.entity.SetmealDish">
    select * from setmeal_dish where setmeal_id = #{id}
</select>
```

## Updating a Setmeal

## Controller

Still using @RequestBody to accept the DTO object

```java
@PutMapping
public Result update(@RequestBody SetmealDTO setmealDTO){
    log.info("修改套餐:{}", setmealDTO);
    setMealService.update(setmealDTO);
    return Result.success();
}
```

## Service

Multiple tables are involved, so transaction management is used to prevent updating only half

Copy the properties to update the records of the base table, then delete the records of the associated table by id

After that, destructure the associated table property records out of the DTO object and loop over them with foreach to assign the id

Finally call the earlier interface to save them in batch

```java
void update(SetmealDTO setmealDTO);
```

```java
@Override
@Transactional(rollbackFor = Exception.class)
public void update(SetmealDTO setmealDTO) {
    Setmeal setmeal = new Setmeal();
    BeanUtils.copyProperties(setmealDTO,setmeal);
    setmealMapper.update(setmeal);
    setmealDishMapper.deleteById(setmeal.getId());
    List<SetmealDish> setmealDishes =  setmealDTO.getSetmealDishes();
    setmealDishes.forEach(setmealDish -> {
        setmealDish.setSetmealId(setmeal.getId());
    });
    setmealDishMapper.save(setmealDishes);
}
```

## Mapper

### SetMealMapper

A normal set operation

```java
@AutoFill(OperationType.UPDATE)
void update(Setmeal setmeal);
```

```java
<update id="update">
    update setmeal
    <set>
        <if test="categoryId != null">category_id = #{categoryId},</if>
        <if test="name != null and name != ''">name = #{name},</if>
        <if test="price != null">price = #{price},</if>
        <if test="status != null">status = #{status},</if>
        <if test="description != null and description != ''">description = #{description},</if>
        <if test="image != null and image != ''">image = #{image},</if>
        <if test="updateTime != null">update_time = #{updateTime},</if>
        <if test="updateUser != null">update_user = #{updateUser}</if>
    </set>
    where id = #{id}
</update>
```

### SetMealDishMapper

A normal insert and delete operation

```java
void deleteById(Long id);
void save(List<SetmealDish> setmealDishes);
```

```xml
<insert id="save">
    insert into setmeal_dish (dish_id,copies,name,price,setmeal_id)
    values
    <foreach collection="setmealDishes" item="dish" separator=",">
        (
        #{dish.dishId},
        #{dish.copies},
        #{dish.name},
        #{dish.price},
        #{dish.setmealId}
        )
    </foreach>
</insert>
<delete id="deleteById">
    delete from setmeal_dish where setmeal_id = #{id}
</delete>
```

## Setting the Dish Status

## Controller

One is the status that is passed in

The other is the query parameter that is passed in

```java
@PostMapping("/status/{status}")
public Result updateStatus(@PathVariable Integer status,@RequestParam Long id){
    log.info("设置状态:{}{}",status,id);
    setMealService.updateStatus(status,id);
    return Result.success();
}
```

## Service

```java
void updateStatus(Integer status, Long id);
```

```java
@Override
public void updateStatus(Integer status, Long id) {
    Setmeal setmeal = setmealMapper.getById(id);
    setmeal.setStatus(status);
    setmealMapper.update(setmeal);
}
```

First call the interface to query the entity object, then set the status on the entity object

Finally call the earlier update interface to perform the update

## Mapper

Old power, Wood Dragon pursuit!

```java
Setmeal getById(Long id);

@AutoFill(OperationType.UPDATE)
void update(Setmeal setmeal);
```

```xml
<select id="getById" resultType="com.sky.entity.Setmeal">
    select *
    from setmeal
    where id = #{id}
</select>

<update id="update">
    update setmeal
    <set>
        <if test="categoryId != null">category_id = #{categoryId},</if>
        <if test="name != null and name != ''">name = #{name},</if>
        <if test="price != null">price = #{price},</if>
        <if test="status != null">status = #{status},</if>
        <if test="description != null and description != ''">description = #{description},</if>
        <if test="image != null and image != ''">image = #{image},</if>
        <if test="updateTime != null">update_time = #{updateTime},</if>
        <if test="updateUser != null">update_user = #{updateUser}</if>
    </set>
    where id = #{id}
</update>
```
