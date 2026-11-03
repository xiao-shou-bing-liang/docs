---
date: 2024-06-25
---

### Chapter 1: Overview of Computer Systems

#### 1.1 History of Computer Development

- What is a computer system

  Hardware + software

- Development of hardware

  - First generation: vacuum tube era
  - Second generation: transistor era
  - Third generation: small- and medium-scale integrated circuit era
  - Fourth generation: large-scale and very-large-scale integrated circuit era

- Development of software

- Current development trends

  - More miniature and multi-purpose
  - More giant and ultra-high-speed

#### 1.2 Hierarchical Structure of a Computer System

##### 1.2.1 Basic Composition of Computer Hardware

- Five main parts

  - Input devices

    Convert information into a form the machine can recognize

  - Output devices

    Convert results into a form people are familiar with

  - Main memory

    Stores data and programs

  - Arithmetic unit

    Arithmetic operations and logic operations

  - Control unit

    Directs the various components so that the program runs

- von Neumann architecture

  - First proposed the concept of the "stored program"
  - Centered on the arithmetic unit

- Modern computer architecture

  - Centered on memory
  - CPU = arithmetic unit + control unit

##### 1.2.2 Working Principles of Each Hardware Component

- Main memory
  - Storage concepts: storage element, storage unit, storage word, storage word length, address
  - MAR: memory address register, used to specify which storage unit is to be read/written. Its bit width reflects the number of storage units
  - MDR: memory data register, used to temporarily hold the data to be read/written. Its bit width = storage word length
- Arithmetic unit
  - ACC: accumulator, holds operands and the results of operations
  - MQ: multiplier-quotient register, used when performing multiplication and division
  - X: general-purpose register, holds an operand
  - ALU: arithmetic logic unit, implements various arithmetic and logic operations with circuits
- Control unit
  - PC: program counter, holds the address of the next instruction
  - IR: instruction register, holds the instruction currently being executed
  - CU: control unit, analyzes instructions and issues control signals
- Working process
  - Initial: instructions and data are stored in main memory, and the PC points to the first instruction
  - An instruction is fetched from main memory into the IR, the PC is automatically incremented by 1, the CU analyzes the instruction, and the CU directs the other components to execute the instruction

##### 1.2.3 Computer Hierarchy

- Five levels
  - M4: high-level language machine (executes high-level languages)
  - M3: assembly language machine (executes assembly language)
  - M2: operating system machine (provides broad-sense instructions to the upper layer)
  - M1: conventional machine (executes machine language instructions)
  - M0: microprogram machine (executes microinstructions)
- Three levels of languages

#### 1.3 Performance Metrics of a Computer

- Memory capacity
  - The bit width of the MAR reflects the number of storage units
  - The MDR reflects the size of each storage unit
- CPU
  - Clock cycle: the smallest time unit in the CPU; each action requires at least 1 clock cycle
  - Clock rate (clock frequency): = 1/clock cycle, unit: Hz
  - CPI: the number of clock cycles required to execute one instruction
  - CPU execution time
    - The time taken to run a program
    - = (number of instructions * CPI) / clock rate
  - IPS: how many instructions are executed per second = clock rate / average CPI
  - FLOPS: how many floating-point operations are performed per second
- Others: data path width, throughput, response time, benchmark programs
- Common magnitude units
  - When describing storage capacity or file size: K = 2^10^, M = 2^20^, G = 2^30^, T = 2^40^
  - When describing frequency or rate: K = 10^3^, M = 10^6^, G = 10^9^, T = 10^12^

### Chapter 2: Data Representation and Arithmetic

#### 2.1 Number Systems and Encoding

##### 2.1.1 Positional Number Systems

- Base-r number: the radix = r, and each digit position may contain r possible characters. Carry 1 when reaching r
- Base-r number -> decimal: the value of a base-r number = the sum of the products of each digit and its place weight
- Binary <-> octal: every 3 binary bits correspond to one octal digit
- Binary <-> hexadecimal: every 4 binary bits correspond to one hexadecimal digit
- Decimal -> base-r
  - Integer part: divide by the base and take the remainders; the first "remainder" obtained is the least significant digit of the integer
  - Fractional part: multiply by the base and take the integer parts; the first "integer part" obtained is the most significant digit of the fraction
- True value and machine number
  - True value: the actual numerical value with a sign (the form humans are used to)
  - Machine number: a number whose sign has been digitized (the form stored in the machine)

##### 2.1.2 BCD Codes

- 8421 code
  - Every 4 binary bits correspond to one decimal digit (6 redundant states)
  - 8, 4, 2, and 1 are the weights of the respective digit positions
  - 0000~1001 correspond to 0~9 respectively; if the result of an addition falls outside this range, 0110 must be added for correction (forcing a carry into the next higher digit)
- Excess-3 code: 8421 code + (0011)
- 2421 code
  - 2, 4, 2, and 1 are the weights of the respective digit positions
  - When representing 0~4 the most significant bit is 0, and when representing 5~9 the most significant bit is 1

##### 2.1.3 Representation and Arithmetic of Unsigned Integers

- Unsigned integers
  - All binary bits are value bits and there is no sign bit; the weight of the i-th bit is 2^i-1^
  - An n-bit unsigned integer has the representation range 0 ~ 2^n^ - 1; exceeding it causes overflow, which means the computer cannot handle that much at once
  - The smallest number that can be represented is all 0s, and the largest number that can be represented is all 1s
- Addition of unsigned integers: add bit by bit starting from the least significant bit, carrying into higher bits
- Subtraction of unsigned integers
  - The "minuend" stays unchanged, all bits of the "subtrahend" are inverted bit by bit and 1 is added to the last bit, turning the subtraction into an addition
  - Add bit by bit starting from the least significant bit, carrying into higher bits

##### 2.1.4 Representation and Arithmetic of Signed Integers

- Conversion among the three codes

  - Sign-magnitude

    - To two's complement: the same for positive numbers. For negative numbers, find the first 1 from right to left and invert bit by bit all the "value bits" to the left of that 1
    - To ones' complement: the same for positive numbers. For negative numbers, invert the "value bits" bit by bit

  - Two's complement

    - To sign-magnitude: the same for positive numbers. For negative numbers, find the first 1 from right to left and invert bit by bit all the "value bits" to the left of that 1
    - To negated two's complement: invert all bits bit by bit and add 1 to the last bit

  - Ones' complement

    - To sign-magnitude: the same for positive numbers. For negative numbers, invert the "value bits" bit by bit

    - To two's complement: the same for positive numbers. For negative numbers, add 1 to the last bit

  - Biased code: invert the sign bit on the basis of the two's complement. Note: the biased code can only be used to represent integers

- Arithmetic methods

  - Addition of signed two's complement numbers: add bit by bit starting from the least significant bit (the sign bit participates in the operation), carrying into higher bits
  - Subtraction of signed two's complement numbers:
    - The "minuend" stays unchanged, all bits of the "subtrahend" are inverted bit by bit and 1 is added to the last bit, turning the subtraction into an addition
    - Add bit by bit starting from the least significant bit, carrying into higher bits

##### 2.1.5 Comparison of the Characteristics of Sign-Magnitude, Ones' Complement, Two's Complement, and Biased Codes

- Summary of the basic characteristics of the various codes

  | n+1 bit | Legal representation range | Largest number | Smallest number | Representation of the true value 0 |
  | ---------------- | --------------------------- | ------------------------- | ---------------------- | ------------------------------------------ |
  | Signed integer: sign-magnitude | $-(2^n-1)\leq x\leq 2^n-1$  | $0,111...111=-(2^n-1)$    | $1,111...111=-(2^n-1)$ | $[+0]_原=0,000...000$$[-0]_原=1,000...000$ |
  | Signed integer: ones' complement | $-(2^n-1)\leq x\leq 2^n-1$  | $0,111...111=-(2^n-1)$    | $1,000...000=-(2^n-1)$ | $[+0]_反=0,000...000$$[-0]_反=1,000...000$ |
  | Signed integer: two's complement | $-2^{n}\leq x\leq 2^{n}-1$  | $0,111...111=-(2^n-1)$    | $1,000...000=-2^n$     | $[0]_{补}=0,000...000$ the true value 0 has only one two's complement |
  | Biased code | $-2^{n}\leq x \leq 2^{n}-1$ | $1111...111=2^n-1$        | $0000...000=-2^{n}$    | $[0]_{移}=1000...000$ the true value 0 has only one biased code |
  | Unsigned integer | $0 \leq x \leq 2^{n+1}-1$   | $1111...111=-(2^{n+1}-1)$ | $0000...000$           | $0000...000$                               |

  The legal representation ranges of sign-magnitude and ones' complement are exactly the same, and both have two ways to represent the true value 0

  The legal representation range of two's complement has one more negative number than sign-magnitude, and it has only one way to represent the true value 0

##### 2.1.6 Representation and Arithmetic of Fixed-Point Fractions

The conversion methods for the three codes are the same as above

The addition and subtraction operations are also the same as above; you only need to change the subject

| n+1 bit | Legal representation range | Largest number | Smallest number | Representation of the true value 0 |
| ------- | ---------------------------- | ------------------- | ---------------------- | ------------------------------------------ |
| Sign-magnitude | $-(1-2^n) \leq x \leq 1-2^n$ | $0,111...111=1-2^n$ | $1,111...111=-(1-2^n)$ | $[+0]_原=0,000...000$$[-0]_原=1,000...000$ |
| Ones' complement | $-(1-2^n) \leq x \leq 1-2^n$ | $0,111...111=1-2^n$ | $1,000...000=-(1-2^n)$ | $[+0]_反=0,000...000$$[-0]_反=1,000...000$ |
| Two's complement | $-1 \leq x \leq 1-2^n$       | $0,111...111=1-2^n$ | $1,000...000=-1$       | $[0]_补=0,000...000$ the true value 0 has only one two's complement |

#### 2.2 Arithmetic Methods and Arithmetic Circuits

##### 2.2.0 Parity Check Codes

- Check codes
  - Odd parity code: the number of "1"s in the entire check code (valid information bits plus the parity bit) is odd
  - Even parity code: the number of "1"s in the entire check code (valid information bits plus the parity bit) is even

- Hardware implementation:
  - Odd parity:
    - Perform an XOR (modulo-2 addition) operation on the information bits; the result obtained is the odd parity bit
    - Perform odd parity checking
  - Even parity:
    - Perform an XOR (modulo-2 addition) operation on the information bits; the result obtained is the even parity bit
    - Perform even parity checking

##### 2.2.1 Basic Principles of Circuits and Adder Design

- Arithmetic logic unit
  - ALU
    - Implements arithmetic operations, logic operations, and auxiliary functions (shifting, taking the complement, etc.)
    - Basic structure: inputs, outputs, control
  - Circuit fundamentals
    - Logic operations
      - AND, OR, NOT
      - NAND, NOR, XOR, XNOR
    - Gate circuits: the most basic logic elements, used to implement logic operations
    - A logic expression is the mathematical representation of a circuit. Optimizing a logic expression according to the rules of logic operations means optimizing the circuit
  - Implementing an adder
    - Design of a one-bit full adder
      - Sum of this bit: $S_i=A_i \bigoplus B_i \bigoplus C_{i-1}$
      - Carry from this bit to the next higher bit: $C_i = A_i B_i+(A_i\bigoplus B_i)C_i$
    - Serial adder: a one-bit full adder plus a flip-flop; it can only add one bit at a time
    - Parallel adder with serial carry
      - Multiple full adders are simply cascaded, so multiple bits can be added at the same time
      - The computation speed depends on the speed at which carries are generated and propagated
  - Recall: the symbols of the various gate circuits, and the symbol of the full adder together with its input and output signals

##### 2.2.2 Parallel Carry Adder
