# day-04

> 《苍穹外卖》day-04：套餐管理

## 本日目录

- [分页查询套餐](#分页查询套餐)
- [新增套餐](#新增套餐)
- [批量删除套餐](#批量删除套餐)
- [根据id来查询套餐](#根据id来查询套餐)
- [修改套餐](#修改套餐)
- [设置菜品状态](#设置菜品状态)

## 分页查询套餐

## Controller

```java
@GetMapping("/page")
public Result<PageResult> page(SetmealPageQueryDTO setmealPageQueryDTO){
    log.info("分页查询参数:{}",setmealPageQueryDTO);
    PageResult pageResult = setMealService.page(setmealPageQueryDTO);
    return Result.success(pageResult);
}
```

这里需要注意一下分页查询的传入对象得是这个DTO类

然后就是返回的泛型,都是老朋友写法了

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

老样子PageHelper零帧起手

然后把DTO对象属性拷贝到实体类

然后使用Page类使用实体类泛型调用Mapper接口

## Mapper

也没什么特殊的地方

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

## 新增套餐

## Controller

使用@RequestBody来接受DTO也没啥好说的

```java
@PostMapping
public Result save(@RequestBody SetmealDTO setmealDTO){
    log.info("新增套餐:{}",setmealDTO);
    setMealService.save(setmealDTO);
    return Result.success();
}
```

## Service

@Transactional(rollbackFor = Exception.class) 进行事务管理避免新增到一半

属性拷贝之后先对setmeal基础表进行保存之后回显id

使用List单列集合接受DTO中的setmealDishes并对其中的id遍历赋值回显id

最后进行插入即可

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

单次插入回显id即可并且使用公共字段填充

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

这里就是一个批量插入使用foreach进行遍历插入,无他

## 批量删除套餐

## Controller

这里需要注意的是他传入的是@RequestParam查询参数来进行删除,只能说不同接口不一样写法,之前的删除有的也不是用这个写的

```java
@DeleteMapping
public Result delete(@RequestParam List<Long> ids){
    log.info("批量删除套餐:{}",ids);
    setMealService.delete(ids);
    return Result.success();
}
```

## Service

事务管理防止只删一半这里倒是没啥直接一键删除基础表的记录跟逻辑外键关联的表的记录即可

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

foreach遍历批量删除

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

也是foreach遍历批量删除

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

## 根据id来查询套餐

## Controller

要返回VO对象给前端去展示

```java
@GetMapping("/{id}")
public Result<SetmealVO> getById(@PathVariable Long id){
    log.info("根据id来查询:{}",id);
    SetmealVO setmealVO = setMealService.getById(id);
    return Result.success(setmealVO);
}
```

## Service

分别查询基础表的记录跟逻辑外键关联表的记录

然后封装到VO对象中穿给Controller在传给前端

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

平平无奇的查询语句

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

同上

```java
List<SetmealDish> getById(Long id);
```

```xml
<select id="getById" resultType="com.sky.entity.SetmealDish">
    select * from setmeal_dish where setmeal_id = #{id}
</select>
```

## 修改套餐

## Controller

依旧是使用@RequestBody接受DTO对象

```java
@PutMapping
public Result update(@RequestBody SetmealDTO setmealDTO){
    log.info("修改套餐:{}", setmealDTO);
    setMealService.update(setmealDTO);
    return Result.success();
}
```

## Service

设计多张表就使用事务管理防止更新一半

属性拷贝更新基础表的记录然后根据id去删除关联表的记录

之后再把DTO对象中的关联表属性记录解构出来之后进行foreach遍历赋值id

最后调用之前的接口进行批量保存

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

正常set操作

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

正常插入删除操作

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

## 设置菜品状态

## Controller

一个是传入的状态

一个是传入的查询参数

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

先调用接口查询出实体类然后在对实体类中的状态进行set

最后调用之前的update接口进行更新操作

## Mapper

old力量木龙追杀!

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
