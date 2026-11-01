# ES6异步处理

# Promise

```
console.log("任务1:...同步");
console.log("任务2:...同步");
setTimeout(() => {
    console.log("任务3:...异步");
},0); //1000ms后执行
console.log("任务4:...同步");
//异步任务会在同步任务之后执行,异步任务的执行顺序是按照任务的添加顺序执行的
const p1 = new Promise((resolve, reject)=>{
    // resolve('任务1成功的得到的数据');
    reject('任务1失败信息');
})

p1.then(data=>{
    console.log(data);

    return new Promise((resolve, reject)=>{
        resolve('任务2成功的得到的数据'); //任务成功的得到的数据
    })
},err=>{
    console.log('任务1失败了'); //任务失败信息
    throw new Error("任务1失败")
})
.then(data=>{
    console.log(data); //任务2成功的得到的数据
},err=>{
    console.log("任务2失败了"); //任务2失败了
})
.catch(err=>{
    console.log(err); //任务失败信息
})
```

# Async

```jsx
//步骤1:准备一个返回promise对象的函数
function asyncTask(){
    return new Promise((resolve, reject)=>{
        const isSuccess = true;
        if(isSuccess){
            resolve('任务2成功处理结果');
        }else{
            reject('任务2失败处理结果');
        }
    })
}
//步骤2:使用await的函数添加async
async function main(){
    console.log("任务1...");
    const data = await asyncTask();
    console.log(data);
    console.log("任务3...");
}
main();
```