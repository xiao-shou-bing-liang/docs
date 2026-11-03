---
date: 2024-09-09
---

What I wrote before wasn't very good — I should have added a weekly plan and then seen how much of it I could actually complete. Besides, it has already been 40 days since the second week; the reasons I'll leave unsaid for now.

Also, there actually was a third week before, and I did learn some useful things, but they were all related to development: I learned basic gcc, g++, gdb debugging, and writing CMakeLists.txt files (note that the capitalization is strict).

### Plan

I'm still learning in the reverse-engineering direction. I finished reading 16-bit x86 assembly before, but I still haven't really looked at ARM assembly. For ARM I've decided not to study it on purpose — I'll look things up on the spot when I hit something I don't know — so what's left is just the book *Reverse Engineering for Beginners*.

Then, because Brother Yang had us do firmware analysis before and I was too dumb back then to understand anything, but now I have a clue: first I looked at mainstream router boards, just getting to know the CPU, flash memory, RAM, power supply, and so on. Next is looking at some mainstream firmware systems. Then I read a post about using IDA to reverse engineer programs; after learning some of the usage, I started reading *The IDA Pro Book*. And also this *Reverse Engineering for Beginners*.

1. [ARM assembly basics](https://azeria-labs.com/writing-arm-assembly-part-1/) — finish it on Monday and Tuesday; once I do, I should be able to read *Reverse Engineering for Beginners* with basically no trouble
2. *The IDA Pro Book* — read three chapters of Part One on Wednesday and Thursday
3. *Reverse Engineering for Beginners* — read three chapters of Part One on Friday and Saturday
4. The rest of the time I'll fill in some operating systems knowledge, and write the weekly report along the way

Also, I think I should watch Xiaodi's course too — at my current level I can't do anything substantive in reverse engineering.

### ARM Assembly

> [!important]
>
> No introduction this time; ARM doesn't need an introduction

#### 2 ARM Data Types and Registers

1. Similar to high-level languages, ARM supports operations on different data types.

   ```shell
   ldr = 加载字
   ldr h = 加载无符号半字
   ldr sh = 加载有符号半字
   ldr b = 加载无符号字节
   ldr sb = 加载有符号字节
   字 32 位 半字 16 位 字节 8 位
   str = 存储字
   str h = 存储无符号半字
   str sh = 存储有符号半字
   str b = 存储无符号字节
   str sb = 存储有符号字节
   ```

2. Byte order differs: the x86 architecture distinguishes big-endian and little-endian, while the ARM architecture was little-endian before version 3 and bi-endian afterwards, which means it has a setting that allows the byte order to be switched. For example, on ARMv6 the instructions are fixed little-endian, while data accesses can be little-endian or big-endian, controlled by bit 9 (the E bit) of the Current Program Status Register (CPSR).

3. The number of registers depends on the ARM version. According to the ARM reference manual, there are 30 general-purpose 32-bit registers in total. The first 16 registers are accessible in user-level mode, while the rest can be used by privileged software execution.

   > [!warning]
   >
   > Everything described above excludes processors based on ARMv6-M and ARMv7-M.

4. A few of the 16 general-purpose registers differ from x86

   - **LR** (Link Register) holds the next memory address of a function call, which makes it convenient for a subroutine to return. x86 has no register dedicated to function calls; it only has the call-ret combination to achieve this, and on `call` the next address is pushed onto the stack.

   - **PC** (Program Counter): in ARM state its size is always 4 bytes, while in THUMB mode it is 2 bytes. When a branch instruction is executed, PC holds the target address. During execution, in ARM state PC stores the address of the current instruction plus 8 (two ARM instructions), and in Thumb(v1) state PC stores the address of the current instruction plus 4 (two Thumb instructions). This differs from x86, where PC always points to the next instruction to be executed.

   - **CPSR** (Current Program Status Register) is similar to the flags register in x86

     |     Flag      | Description                                                  |
     | :-----------: | ------------------------------------------------------------ |
     |  N(Negative)  | Set if the result of the instruction is negative.            |
     |    Z(Zero)    | Set if the result of the instruction is zero.                |
     |   C(Carry)    | Set if the result of the instruction produces a value that requires bit 33 to be fully represented. |
     |  V(Overflow)  | Set if the result of the instruction produces a value that cannot be represented in 32-bit two's complement. |
     | E(Endian-bit) | ARM can operate in little-endian mode or big-endian mode. This bit set to 0 means little-endian mode, and set to 1 means big-endian mode. |
     | T(Thumb-bit)  | This bit is set if the processor is in Thumb state, and cleared if it is in ARM state. |
     | M(Mode-bits)  | These bits specify the current privileged mode (user mode USR, supervisor mode SVC, etc.). |
     |  J(Jazelle)   | The third execution state, which allows some ARM processors to execute Java bytecode in hardware. |

#### 3 ARM Instruction Set

1. ARM processors have two main operating states, **ARM and THUMB**. These states are unrelated to privilege level. The main difference between the two states is the instruction set: instructions in ARM state are always 32 bits, while instructions in Thumb state are 16 bits (but can be 32 bits). You need to know where Thumb is used instead of ARM. After the enhanced Thumb instruction set was introduced, you also need to know which one your device supports and adjust accordingly.

2. Differences between ARM and Thumb:

   - Conditional execution: all instructions in ARM state support conditional execution. Some ARM processor versions allow conditional execution in Thumb using the IT instruction. Conditional execution improves code density because it reduces the number of instructions to be executed and reduces the number of expensive branch instructions.
   - 32-bit ARM and Thumb instructions: 32-bit Thumb instructions have a .w suffix.
   - The barrel shifter is another unique feature of ARM mode. It can be used to reduce several instructions to one. For example, instead of using two instructions to perform a multiplication (multiply a register by 2, then use MOV to store the result in another register), you can use a left shift: mov R1, R0, R0, LSL#1

3. The following two conditions must be met to switch the processor's execution state:

   - We can use the branch instruction BX (branch and exchange) or BLX (branch, link and exchange) and set the least significant bit of the target register to 1. This can be done by adding an offset of 1, such as 0x5530+1. This won't cause alignment problems because instructions are either 2-byte or 4-byte aligned: the processor ignores the least significant bit.

   - If the T bit in the Current Program Status Register is set to 1, the processor is in Thumb mode.

4. Instruction set

   | Instruction |  Description   | Instruction |      Description       |
   | :--: | :--------: | :-----: | :--------------: |
   | MOV  |  Move data  |   EOR   |     Bitwise XOR     |
   | MVN  | Move and invert |   LDR   |       Load       |
   | ADD  |  Addition  |   STR   |       Store       |
   | SUB  |  Subtraction  |   LDM   |     Load multiple     |
   | MUL  |  Multiplication  |   STM   |     Store multiple     |
   | LSL  |  Logical shift left  |  PUSH   |      Push onto stack      |
   | LSR  |  Logical shift right  |   POP   |    Pop from stack    |
   | ASR  |  Arithmetic shift right  |    B    |       Branch       |
   | ROR  |   Rotate right   |   BL    |    Branch with link    |
   | CMP  |    Compare    |   BX    |    Branch and exchange    |
   | AND  |  Bitwise AND  |   BLX   | Branch with link and exchange |
   | ORR  |  Bitwise OR  | SWI/SVC |     System call     |

#### 4 Memory Instructions: Load and Store

> [!tip]
>
> - ARM uses a load-store model for memory access, which means only load/store (LDR and STR) instructions can access memory. Although on x86 most instructions allow direct operations on data in memory, on ARM data must first be moved from memory into a register before it can be operated on. This means that incrementing a 32-bit value at a specific memory address on ARM requires three kinds of instructions (load, increment, and store): first load the value at the specific address into a register, increment it inside the register, and then store it from the register back to memory.
> 
> - Note that with ldr the right value is assigned to the left value, and with str the right value is assigned to the left value
>
> - Note the order of calculation for pre-indexing and post-indexing; the most important thing is to look at them a lot and get familiar with them

##### 4.1 Basic Example

```assembly
LDR R2, [R0]	@ [R0] - origin address is the value found in R0.
STR R2, [R1]    @ [R1] - destination address is the value found in R1.
#LDR 用于从内存加载数据到寄存器。
STR 用于将寄存器中的数据存储到内存中
```

👆 A very classic code block that makes the relationship between LDR and STR clear right away

Assume:

- The value in `R0` is `0x1000`, and the contents of memory address `0x1000` are `42`.
- The value in `R1` is `0x2000`.

After executing these two instructions:

- `LDR R2, [R0]` loads `42` into `R2`.
- `STR R2, [R1]` stores `42` into memory address `0x2000`.

###### 4.1.1 Immediate Values as Offset Addressing

```assembly
var1: .word 3  /* 在内存中定义变量1，值为3 */
var2: .word 4  /* 在内存中定义变量2，值为4 */

.text          /* 代码段开始 */
.global _start /* 声明全局入口点 */

_start:
    ldr r0, adr_var1  @ 加载 var1 的地址到 R0
    ldr r1, adr_var2  @ 加载 var2 的地址到 R1
    ldr r2, [r0]      @ 从 R0 指向的地址加载值 (0x03) 到 R2
    str r2, [r1, #2]  @ 使用偏移量，将 R2 中的值 (0x03) 存储到 R1 + 2 的地址
    str r2, [r1, #4]! @ 使用前索引模式，将 R2 中的值 (0x03) 存储到 R1 + 4 的地址，同时更新 R1
                   #👆感叹号是更新 r1 的意思
    ldr r3, [r1], #4  @ 使用后索引模式，从 R1 指向的地址加载值到 R3，同时更新 R1
    bkpt              @ 设置断点
```

👆 The difference between pre-indexed and post-indexed addressing

###### 4.1.2 Register Values as Offset Addressing

```assembly
var1: .word 3  /* 在内存中定义变量1，值为3 */
var2: .word 4  /* 在内存中定义变量2，值为4 */

.text          /* 代码段开始 */
.global _start /* 声明全局入口点 */

_start:
    ldr r0, adr_var1  @ 加载 var1 的地址到 R0
    ldr r1, adr_var2  @ 加载 var2 的地址到 R1
    ldr r2, [r0]      @ 从 R0 指向的地址加载值 (0x03) 到 R2
    str r2, [r1, r2]  @ 使用偏移量，将 R2 中的值 (0x03) 存储到 R1 + R2 的地址
    str r2, [r1, r2]! @ 使用前索引模式，将 R2 中的值 (0x03) 存储到 R1 + R2 的地址，同时更新 R1
    ldr r3, [r1], r2  @ 使用后索引模式，从 R1 指向的地址加载值到 R3，同时更新 R1
    bx lr              @ 返回
```

👆 The difference between pre-indexed and post-indexed addressing

###### 4.1.3 Shifted Registers as Offset

```assembly
var1: .word 3  /* 在内存中定义变量1，值为3 */
var2: .word 4  /* 在内存中定义变量2，值为4 */

.text          /* 代码段开始 */
.global _start /* 声明全局入口点 */

_start:
    ldr r0, adr_var1         @ 加载 var1 的地址到 R0
    ldr r1, adr_var2         @ 加载 var2 的地址到 R1
    ldr r2, [r0]             @ 从 R0 指向的地址加载值 (0x03) 到 R2
    str r2, [r1, r2, LSL#2]  @ 使用偏移量，将 R2 中的值 (0x03) 存储到 R1 + (R2 << 2) 的地址
    str r2, [r1, r2, LSL#2]! @ 使用前索引模式，将 R2 中的值 (0x03) 存储到 R1 + (R2 << 2) 的地址，同时更新 R1
    ldr r3, [r1], r2, LSL#2  @ 使用后索引模式，从 R1 指向的地址加载值到 R3，同时更新 R1
    bkpt                      @ 设置断点
```

##### 4.2 LDR for PC-Relative Addressing

```assembly
.section .text
.global _start

_start:
   ldr r0, =jump        /* load the address of the function label jump into R0 */
   ldr r1, =0x68DB00AD  /* load the value 0x68DB00AD into R1 */
jump:
   ldr r2, =511         /* load the value 511 into R2 */ 
   bkpt
```

Why do we sometimes need this syntax to move a 32-bit constant into a register with one instruction? This is because ARM can only load an 8-bit value at a time. What? To understand why, you need to know how immediate values are handled on ARM.

##### 4.3 Using Immediate Values in ARM

```assembly
.section .text
.global _start

_start:
	mov r0, #256
	add r0, #255
	ldr r1, =511    /* load 511 from the literal pool using LDR */
	bkpt
#最终 r0 结果是511，r1 结果也是511
```

#### 5 Loading/Storing Multiple Values

Sometimes it is more efficient to load or store several values at once. That is why we use the `LDM` (load multiple) instruction and the `STM` (store multiple) instruction; some of these instructions differ in the way they access the initial address.

```assembly
.data

array_buff:
 .word 0x00000000             /* array_buff[0] */
 .word 0x00000000             /* array_buff[1] */
 .word 0x00000000             /* array_buff[2]. This element has a relative address of array_buff+8 */
 .word 0x00000000             /* array_buff[3] */
 .word 0x00000000             /* array_buff[4] */

.text
.global _start

_start:
 adr r0, words+12             /* r0 = &words[3] (0x00000003) */
 ldr r1, array_buff_bridge    /* r1 = &array_buff[0] */
 ldr r2, array_buff_bridge+4  /* r2 = &array_buff[2] */
 ldm r0, {r4,r5}              /* 从 r0 加载 words[3] 和 words[4] 到 r4 和 r5 */
 stm r1, {r4,r5}              /* 将 r4 和 r5 的值存储到 array_buff[0] 和 array_buff[1] */
 ldmia r0, {r4-r6}            /* 从 r0 加载 words[3], words[4], words[5] 到 r4, r5, r6 */
 stmia r1, {r4-r6}            /* 将 r4, r5, r6 存储到 array_buff[0], array_buff[1], array_buff[2] */
 ldmib r0, {r4-r6}            /* 逐字节加载 words[4], words[5], words[6] 到 r4, r5, r6 */
 stmib r1, {r4-r6}            /* 逐字节存储 r4, r5, r6 到 array_buff[1], array_buff[2], array_buff[3] */
 ldmda r0, {r4-r6}            /* 从 r0 加载 words[3], words[2], words[1] 到 r6, r5, r4 */
 ldmdb r0, {r4-r6}            /* 从 r0 加载 words[2], words[1], words[0] 到 r6, r5, r4 */
 stmda r2, {r4-r6}            /* 存储 r6, r5, r4 到 array_buff[2], array_buff[1], array_buff[0] */
 stmdb r2, {r4-r5}            /* 存储 r5, r4 到 array_buff[1], array_buff[0] */
 bx lr
 
 words:
 .word 0x00000000             /* words[0] */
 .word 0x00000001             /* words[1] */
 .word 0x00000002             /* words[2] */
 .word 0x00000003             /* words[3] */
 .word 0x00000004             /* words[4] */
 .word 0x00000005             /* words[5] */
 .word 0x00000006             /* words[6] */

array_buff_bridge:
 .word array_buff             /* address of array_buff, or in other words - array_buff[0] */
 .word array_buff+8           /* address of array_buff[2] */
```

👆 The main point is to remember adr (load the address of a label into a register), ldr, ldm, stm, ldmia, stmib, ldmda, ldmdb, stmda, stmdb

But to be honest, trying to get through this quickly, there is no way I'll remember 100% of it for now — I just read through it once and understood it a bit, and I'll deal with the rest when I run into it later :joy:.

#### 6 Pushing and Popping

```assembly
.text
.globa _start

_start:
	mov r0, #3
	mov r1. #4
	push {r0, r1}
	pop {r2, r3}
	stmdb sp!, {r0, r1}
	ldmia sp!, {r4, r5}
```

👆 Pretty much like x86: you can push and pop several at once, and the order of push and pop is right first, then left

#### 7 ARM Conditional Execution Instructions && Conditional Execution in Thumb Mode && Branch Instructions

Below are the commonly used conditions and the condition bits of the CPSR register that they affect:

- **Z (Zero Flag)**: set when the result is zero.
- **N (Negative Flag)**: set when the result is negative.
- **C (Carry Flag)**: in unsigned operations, set when a carry occurs.
- **V (Overflow Flag)**: set when the result of a signed operation overflows.

| **Condition Code** |          **Meaning**          | **Status of Flags**  |
| :----------------: | :--------------------------: | :------------------: |
|       **EQ**       |             Equal             |        Z == 1        |
|       **NE**       |           Not equal           |        Z == 0        |
|       **GT**       |      Signed greater than      | (Z == 0) && (N == V) |
|       **LT**       |       Signed less than        |        N != V        |
|       **GE**       |  Signed greater than or equal  |        N == V        |
|       **LE**       |   Signed less than or equal    |       (Z == 1)       |
|    **CS or HS**    | Unsigned greater than or equal (carry set) |        C == 1        |
|    **CC or LO**    |    Unsigned less than (carry clear)    |        C == 0        |
|       **MI**       |        Negative (or negative value)        |        N == 1        |
|       **PL**       |        Positive (or positive value)        |        N == 0        |
|       **AL**       |          Always execute           |          –           |
|       **NV**       |           Never execute           |          –           |
|       **VS**       |          Signed overflow          |        V == 1        |
|       **VC**       |       No signed overflow        |        V == 0        |
|       **HI**       |          Unsigned greater than          | (C == 1) && (Z == 0) |
|       **LS**       |       Unsigned less than or equal       |       (C == 0)       |

Example

```assembly
.global main

main:
        mov     r0, #2          /* 设置初始变量 r0 为 2 */
        cmp     r0, #3          /* 将 r0 与数字 3 进行比较，负标志位被设置为 1 */
        addlt   r0, r0, #1      /* 如果 r0 小于 3，则将 r0 增加 1 */
        cmp     r0, #3          /* 再次将 r0 与数字 3 进行比较，零标志位被设置为 1 */
        addlt   r0, r0, #1      /* 如果 r0 小于 3，则将 r0 再次增加 1 */
        bx      lr              /* 返回到调用者 */
```

##### 7.1 Conditional Execution in Thumb

We said earlier that there are different versions of Thumb; specifically, there is a version of Thumb that allows conditional execution (Thumb-2). Some ARM processor versions support the IT instruction, which can conditionally execute up to 4 instructions in Thumb state.

Syntax:`IT {x {y {z}}} cond`

- `cond` specifies the condition that the first instruction in the IT statement block must satisfy in order to execute

- `x` specifies the condition that the second instruction in the IT block must satisfy in order to execute

- `y` specifies the condition that the third instruction in the IT block must satisfy in order to execute

- `z` specifies the condition that the fourth instruction in the IT block must satisfy in order to execute

  The structure of the IT instruction set is "IF-Then-(Else)", and its syntax is made up of two letters:

- IT stands for If-Then (the next instruction is conditional)

- TT stands for If-Then-Then (the next two instructions are conditional)

- ITE stands for If-Then-Else (the next two instructions are conditional)

- ITTE stands for If-Then-Then-Else (the next three instructions are conditional)

- ITTEE stands for If-Then-Then-Else-Else (the next four instructions are conditional)

  Each instruction in an IT block must specify a condition suffix, and that condition suffix can be the same or logically opposite. This means that if ITE is used, the first and second instructions (If-Then) must have the same condition suffix, while the third instruction (the else statement) must be logically opposite to the previous two statements.

  ```assembly
  ITTE   NE           ; 下三条指令是条件执行的  
  ANDNE  R0, R0, R1   ; 如果上一条指令的结果不为零（NE），则执行AND操作，但ANDNE不更新条件标志  
  ADDSNE R2, R2, #1   ; 如果上一条指令的结果不为零（NE），则执行ADDS（加且设置状态标志）操作  
  MOVEQ  R2, R3       ; 如果上一条指令的结果为零（EQ），则执行MOV操作  
    
  ITE    GT           ; 下两条指令是条件执行的  
  ADDGT  R1, R0, #55  ; 如果比较结果为大于（GT），则执行加法操作  
  ADDLE  R1, R0, #48  ; 如果比较结果不大于（LE，即不是GT），则执行另一个加法操作  
    
  ; 注意：这里我假设了ITTEE是类似于ITT的扩展，但实际上ARM中不存在ITTEE指令。  
  ; 以下是根据你的假设（如果ITTEE存在且意味着两个THEN和两个ELSE）翻译的，但请记住这是虚构的。  
  ITTEE  EQ           ; 假设存在，表示接下来的四条指令是条件执行的，基于上一个比较的结果是否等于（EQ）  
  MOVEQ  R0, R1       ; 如果等于（EQ），则执行MOV操作  
  ADDEQ  R2, R2, #10  ; 如果等于（EQ），则执行加法操作  
  ANDNE  R3, R3, #1   ; 如果不等于（NE），则执行AND操作（注意这里的逻辑与ITTEE的假设不完全一致，因为ITTEE应该还有两个ELSE分支）  
  ; 由于ITTEE不是真实存在的指令，我将不提供完整的ELSE分支，仅翻译前两个条件执行指令  
    
  ; 由于ARM指令集中IT块的最后一条指令只能是分支或中断指令，这里使用了一个分支指令作为示例  
  ; 注意：下面的BNE.W是假设它可以出现在IT块的最后，尽管在某些ARM架构中IT块的使用可能有更严格的限制  
  BNE.W  dloop        ; 如果上一条指令的结果不为零（NE），则跳转到dloop标签处
  ```
  
  Below is the opposite of the condition codes
  
  | **Condition Code**  |          **Meaning**          | **Opposite Code** |  **Opposite Meaning**  |
  | :-----------------: | :--------------------------: | :---------------: | :--------------------: |
  |       **EQ**        |             Equal             |      **NE**       |         Not equal         |
  |   **HS (or CS)**    | Unsigned greater than or equal (carry set) |  **LO (or CC)**   | Unsigned less than (carry clear) |
  |       **MI**        |             Negative             |      **PL**       |        Positive or zero        |
  |       **VS**        |          Signed overflow          |      **VC**       |     No signed overflow     |
  |       **HI**        |          Unsigned greater than          |      **LS**       |    Unsigned less than or equal    |
  |       **GE**        |       Signed greater than or equal       |      **LT**       |       Signed less than       |
  |       **GT**        |          Signed greater than          |      **LE**       |    Signed less than or equal    |
  | **AL (or omitted)** |           Always execute           |         —         |  There is no opposite condition for AL  |
  
  ```assembly
  .syntax unified    @ 这是重要的！指定汇编语法为统一语法，允许同时使用 ARM 和 Thumb 指令。
  .text
  .global _start
  
  _start:
      .code 32          @ 切换到 ARM 状态
      add r3, pc, #1   @ 将程序计数器（PC）加1的值加到 R3 中
      bx r3             @ 跳转并交换到 R3 中的地址 -> 切换到 Thumb 状态，因为 LSB = 1
  
      .code 16          @ 切换到 Thumb 状态
      cmp r0, #10      @ 比较 R0 和 10
      ite eq           @ 如果 R0 等于 10...
      addeq r1, #2     @ ... 则 R1 = R1 + 2
      addne r1, #3     @ ... 否则 R1 = R1 + 3
      bkpt              @ 触发断点
  ```
  
  **.code32**
  
  The example code starts in ARM state. The first instruction adds the address specified by PC plus 1 into R3, and then branches to the address in R3. This causes a switch to Thumb state, because the LSB (least significant bit) is 1, so there is no 4-byte alignment.
  
  **.code 16**
  
  In Thumb state, we first compare R0 with #10, and the result is N = 1. Then we use an if-Then-else block, which skips the `addeq` instruction because the Z bit has not been set, while `addne` will be executed because the result is not equal to 10

##### 7.2 Branch Execution

Branching, also called jumping, lets us jump to another section of code. This is very useful when we need to skip or repeat a block of code to get to a specific location. In this case, the best examples are an IF statement or a loop, so let's look at an IF statement first:

```assembly
.global main

main:
        mov     r1, #2     /* 设置初始变量 a */
        mov     r2, #3     /* 设置初始变量 b */
        cmp     r1, r2     /* 比较变量以确定哪个更大 */
        blt     r1_lower   /* 如果 r2 更大（N==1），跳转到 r1_lower */
        mov     r0, r1     /* 如果没有跳转，r1 更大（或相等），将 r1 存储到 r0 */
        b       end        /* 继续到结束 */
r1_lower:
        mov r0, r2         /* 到这里说明 r1 小于 r2，将 r2 存储到 r0 */
        b end              /* 继续到结束 */
end:
        bx lr              /* 结束 伪指令 b 用于无条件跳转（branch）到指定的标签*/
```

This code determines which number is larger and then returns it as the return value. The pseudo-C code is as follows:

``` c
int main() {
    int max = 0;
    int a = 2;
    int b = 3;
    if (a < b) {
        max = b;
    } else {
        max = a;
    }
    return max;
}
```

Now a loop with and without conditional instructions:

```assembly
.global main

main:
        mov     r0, #0     /* setting up initial variable a */
loop:
        cmp     r0, #4     /* checking if a==4 */
        beq     end        /* proceeding to the end if a==4 */
        add     r0, r0, #1 /* increasing a by 1 if the jump to the end did not occur */
        b loop             /* repeating the loop */
end:
        bx lr              /* THE END */
```

> [!warning]
>
> In ARM assembly language, `beq` (branch if equal) and `cmp` (compare) are usually used together. The `beq` instruction branches according to the state of the zero flag (Z). If the zero flag is set (that is, the two compared values are equal), execution jumps to the specified label.

Pseudo-C code:

```c
int main() {
    int a = 0;
    while(a < 4) {
        a += 1
    }
    return a;
}
--------------------
int main() {
    int i = 0;
    for(i = 0; i< 4;i++); 
    return i;
}
```

##### 7.3 B/BX/BLX

There are three types of branch instructions:

- Branch(**B**)

  - A simple jump into a function

- Branch link (**BL**)

  - Save the return address (PC+4) in LR, then jump into the function
    - TIPS: ARM executes an instruction in three steps — fetch, decode, execute — and as soon as the first instruction has been fetched, fetching of the second instruction begins immediately, so by the time the first instruction executes, PC already points to the third instruction
    - If a normal jump is performed with BL, the CPU will store the return address in LR, i.e. the current instruction address + 4
    - IRQ exception occurs: the exception occurs while an instruction is executing; at that point PC points to the currently executing instruction + 8, and that value is stored in LR, so when resuming you need to subtract 4 in order to execute the next instruction
    - Undefined instruction exception: occurs in the decode stage; at that point PC points to the currently executing instruction + 4, so no calculation is needed on return
    - Prefetch abort: the exception is entered in the execute stage, so PC points to the currently executing instruction address + 8, and you need to subtract 4 on return
    - Data abort: it occurs after the instruction has finished executing, PC points to the currently executing instruction address + 12, and you need to subtract 8 when resuming

- Branch exchange (**BX**) and Branch link exchange (**BLX**)

  - Same as B/BL plus the instruction set exchange ( ARM <-> Thumb )
  - Requires a register as the first operand: BX/BLX plus the specific register

  BX/BLX are used to switch from the ARM instruction set to the Thumb instruction set

```assembly
.text
.global _start

_start:
     .code 32         @ ARM mode
     add r2, pc, #1   @ put PC+1 into R2
     bx r2            @ branch + exchange to R2

    .code 16          @ Thumb mode
     mov r0, #1
```

The trick here is to get the current value of PC, add 1, store it in a register, and then branch (+exchange) to that register. As you can see, the addition instruction simply takes the effective PC address (PC+8) and adds 1. Next, if the least significant bit (LSB) of the address after the branch instruction is 1, which means the address is not 4-byte aligned, a state switch will occur.

#### 8 Stack and Functions

##### 8.1 Stack

| **Stack Type** | **Store**                     | **Load**                     |
| :--------- | :--------------------------- | :--------------------------- |
| **Full descending** | `STMFD` (STMDB, decrement before store) | `LDMFD` (LDM, increment after load)   |
| **Full ascending** | `STMFA` (STMIB, increment before store) | `LDMFA` (LDMDA, decrement after load) |
| **Empty descending** | `STMED` (STMDA, decrement after store) | `LDMED` (LDMIB, increment before load) |
| **Empty ascending** | `STMEA` (STM, increment after store)   | `LDMEA` (LDMDB, decrement before load) |

- **Full descending**: the stack grows from high addresses toward low addresses.
- **Full ascending**: the stack grows from low addresses toward high addresses.
- **Empty descending**: allows some space to be left unused; the stack grows from high addresses toward low addresses.
- **Empty ascending**: allows some space to be left unused; the stack grows from low addresses toward high addresses.

##### 8.2 Functions

> [!tip]
>
> A function can be divided into three parts:
>
> 1. Prologue
> 2. Body
> 3. Epilogue

I'll just summarize this part.

When a function executes it opens up stack space toward lower memory, and that's basically it. Let's end ARM here.

