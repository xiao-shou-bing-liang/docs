---
date: 2024-06-04
---



## 1. Operating System Concepts

### 1.1 General Concept of an Operating System

- An operating system (OS) controls and manages the hardware and software resources of the entire computer system, and reasonably organizes and schedules the computer's work and its resource allocation, so as to provide users and other software with a convenient interface and environment; it is the most basic system software in a computer system.

- As a manager of system resources

  - Functions provided

    - Processor management
    - Memory management
    - File management
    - Device management

  - Goals

    - Safety and efficiency

    ps: Before a program can be executed, it must be placed in memory so that the CPU can process it

- The functions and goals of an operating system — providing convenient and easy-to-use services to the upper layers

  |                    User                     |
  | :-----------------------------------------: |
  |                 Application                 |
  |              Operating System               |
  |         Bare metal (pure hardware)          |

  

- Providing convenient and easy-to-use services to the upper layers

  - Used directly by users
    - GUI (graphical user interface)
    - Command interface
      - Online command interface
      - Offline command interface
    - Used by software and by programmers
      - Program interface

### 1.2 The Four Characteristics of an Operating System

- Characteristics of an operating system

  - Concurrency

    Macroscopically they happen at the same time; microscopically they happen alternately

  - Sharing

    - Mutually exclusive sharing

      Only one process is allowed to access the resource within a given period

    - Simultaneous sharing

      Multiple processes are allowed to access it "simultaneously" within a given period

  - Virtualization

    This means turning one physical entity into several logical counterparts. The physical entity (the former) actually exists, while the logical counterparts (the latter) are what the user perceives.

    - Space-division multiplexing (e.g., virtual memory technology)
    - Time-division multiplexing (e.g., virtual processors)

  - Asynchrony

    This means that in a multiprogramming environment, multiple programs are allowed to execute concurrently, but because resources are limited, a process does not run to completion in one go; it starts and stops and advances at an unpredictable speed. This is the asynchrony of processes.

### 1.3 Development and Classification of Operating Systems

- Manual operation stage

  Main drawback: a single user monopolizes the whole machine, and the mismatch between human and machine speed results in extremely low resource utilization

- Batch processing stage

  - Single-program batch processing system

    Offline input/output technology was introduced (implemented with a peripheral machine plus magnetic tape), and a monitor program was responsible for job input and output

    Main advantage: the mismatch between human and machine speed was alleviated to some extent, and resource utilization improved.

    Main drawback: only one program can run in memory, and the next program can be loaded only after the current one finishes running. The CPU spends a large amount of time waiting for I/O to complete, so resource utilization remains very low.

  - Multiprogrammed batch processing system (operating systems began to appear)

    Main advantage: multiple programs execute concurrently and share computer resources. Resource utilization is greatly improved, the CPU and other resources stay "busy" more of the time, and system throughput increases.

    Main drawback: long user response time and no human-machine interaction (after submitting a job the user can only wait for the computer to finish processing it, and cannot control the job's execution in between, e.g., cannot debug a program or enter parameters while the program is running)

- Time-sharing operating system

  The computer serves each user/job in turn in units of time slices, and each user can interact with the computer through a terminal

  Main advantage: user requests can be responded to promptly, which solves the human-machine interaction problem. Multiple users can use one computer at the same time, and their operations on the computer are independent of one another, so no one notices the presence of the others.

  Main drawback: urgent tasks cannot be handled with priority. The operating system is completely fair to every user/job, serving each user/job one time slice in rotation without distinguishing task urgency.

- Real-time operating system

  Main advantage: urgent tasks can be responded to first, and some urgent tasks do not need to queue for a time slice

  Under the control of a real-time operating system, the computer system processes external signals promptly after receiving them and must finish handling an event within a strict time limit. The main characteristics of a real-time operating system are timeliness and reliability

  - Hard real-time system (e.g., missile control systems, autonomous driving systems)

    Processing must be completed within an absolutely strict, specified time

  - Soft real-time system (e.g., 12306)

    Occasional violations of the time requirement are acceptable

- Network operating system

  It came into being along with the development of computer networks and can organically combine the computers in a network, implementing functions such as data transfer, sharing of various network resources (e.g., file sharing), and communication between computers (e.g., Windows NT)

- Distributed operating system

  Its main characteristics are distribution and parallelism. All computers in the system have equal status, and any work can be distributed across these computers, which complete the task in parallel and cooperatively

- Personal computer operating system (Windows XP, macOS)

### 1.4 Operating Mechanism of an Operating System

- Prerequisite knowledge: how does a program run?

  - C language code -> machine instructions (the intermediate process involves compiling, assembling, linking, and loading)
  - A program's execution is in fact the process of the CPU executing machine instructions one after another
  - An "instruction" is the most basic command that a processor can recognize and execute
  - Note the difference between an interactive command interface and an instruction
  - Kernel programs vs. application programs

    - Programs written by ordinary programmers are "application programs"
    - Programs written by operating system developers are "kernel programs"

- Two kinds of instructions

  When the CPU was designed, privileged instructions and non-privileged instructions were distinguished, so the type of an instruction can be determined before it is executed

  - Privileged instructions
  - Non-privileged instructions

- Two processor states

  The CPU has a register called the program status word (PSW) register, which contains a binary bit: 1 means "kernel mode" and 0 means "user mode"

  Aliases: kernel mode = core mode = supervisor mode; user mode = objective mode

  - Core mode
  - User mode

- Two kinds of programs

  - Kernel programs
  - Application programs

- Kernel

  - The kernel is the most important and most central part of an operating system
  - Many kernel programs together make up the operating system kernel

- How is the mode switched?

  - Kernel mode -> user mode — a single privileged instruction that modifies the PSW
  - User mode -> kernel mode — caused by an interrupt and completed automatically by hardware

### 1.5 Interrupts and Exceptions

- Role of interrupts

  - Two kinds of programs run on the CPU: operating system kernel programs and application programs

  - Under suitable conditions, the operating system kernel voluntarily hands the right to use the CPU over to application programs

  - An "interrupt" is the only way for the operating system kernel to take back the right to use the CPU

  - Related to concurrency

- Types of interrupts

  In most textbooks, "interrupt" refers specifically to interrupts in the narrow sense, i.e., external interrupts, while internal interrupts are generally called "exceptions"

  - Internal interrupts (also called "exceptions" or "exceptional events")

    - Abort — attempting to execute a privileged instruction in user mode
    - Fault — discovering that the divisor is 0 when executing a division instruction
    - Trap — sometimes an application program wants to request a service from the operating system kernel and therefore executes a special instruction, the trap instruction, which raises an internal interrupt signal

    Related to the instruction currently being executed; the interrupt signal comes from inside the CPU

  - External interrupts (also called "interrupts")

    - Clock interrupt — an interrupt signal sent by the clock component
    - I/O interrupt request — an interrupt signal sent by an input/output device

    Unrelated to the instruction currently being executed; the interrupt signal comes from outside the CPU

- Basic principle of the interrupt mechanism

  Different interrupt signals need to be handled by different interrupt handlers. After the CPU detects an interrupt signal, it looks up the "interrupt vector table" according to the type of the interrupt signal, thereby finding the memory location where the corresponding interrupt handler is stored

### 1.6 System Calls

- What is a system call

  A "system call" is an interface provided by the operating system for application programs (programmers) to use. It can be understood as a special function that application programs can call, through which an application program can request services from the operating system kernel

- Differences between system calls and library functions

  | Ordinary application programs | Can make system calls directly or use library functions. Some library functions involve system calls, and some do not |
  | ------------ | ------------------------------------------------------------ |
  | Programming languages | Provide library functions to the upper layers. System calls are sometimes encapsulated as library functions so as to hide some details of the system calls and make programming more convenient for programmers |
  | Operating system | Provides system calls to the upper layers, enabling upper-layer programs to request kernel services |
  | Bare metal |                                                              |

  Library functions that do not involve system calls: e.g., a function that "takes the absolute value"

  Library functions that involve system calls: e.g., a function that "creates a new file"

- A small example: why are system calls necessary?

  If Word and WPS print documents concurrently, the output gets mixed up

  Solution: the operating system kernel manages shared resources uniformly and provides "system calls" to the upper layers. When a user process wants to use a shared resource such as a printer, it can only send a request to the operating system kernel through a system call. The kernel then coordinates and handles the various requests

- Which functions must be implemented with system calls?

  Application programs request operating system services through system calls. Since all kinds of shared resources in the system are under the unified control of the operating system kernel, any operation related to shared resources (such as storage allocation, I/O operations, file management, etc.) must be requested from the operating system kernel by means of a system call and is performed by the kernel on the program's behalf. This guarantees the stability and security of the system and prevents users from performing illegal operations

  - Classification by function
    - Device management — implements functions such as requesting/releasing/starting a device
    - File management — implements functions such as reading/writing/creating/deleting a file
    - Process control — implements functions such as creating/terminating/blocking/waking up a process
    - Process communication — implements functions such as message passing/signal passing between processes
    - Memory management — implements functions such as allocating/reclaiming memory

- The process of a system call

  - Pass parameters
  - Trap instruction / trap / supervisor call
  - An operating system kernel program handles the system call request
  - Return to the application program

  The trap instruction is executed in user mode, and executing it immediately raises an internal interrupt that puts the CPU into core mode

  The system call request is issued in user mode, while the corresponding handling of the system call is carried out in core mode

### 1.7 Architecture of an Operating System

|                                User                                 |
| :-----------------------------------------------------------------: |
|                             Application                             |
|                  Non-kernel functions (e.g., GUI)                   |
|      Process management, memory management, device management, etc.      |
| Clock management, interrupt handling, primitives (device drivers, CPU switching, etc.) |
|                             Bare metal                              |

- Using clock interrupts to implement the timing function

- A primitive is a special kind of program that has atomicity, that is, this piece of program must run to completion in one go and cannot be "interrupted"

- The development teams of Ubuntu and CentOS mainly work on implementing non-kernel functions, while their kernels all use the Linux kernel

- Typical kernel-based operating systems

  - Monolithic kernel: Linux, UNIX
  - Microkernel: Windows NT

- The mode-switching process has a cost, and frequent mode switching degrades system performance

- Monolithic kernel (a.k.a. macrokernel / single kernel) — two mode switches

  - Kernel mode
    - Process management
    - Storage management
    - Clock management, interrupt management, primitives
  - Advantages: high performance
  - Disadvantages: the kernel code is huge, the structure is chaotic, and it is hard to maintain

- Microkernel — six mode switches

  - User mode
    - Process management
    - Storage management
    - Device management

  - Kernel mode
    - Clock management, interrupt management, primitives
  - Advantages: few kernel functions, clear structure, easy maintenance
  - Disadvantages: it requires frequent switching between core mode and user mode, so performance is low

- Layered structure

  - The bottom layer is hardware and the top layer is the user interface; each layer can call the layer below it
  - Advantages
    - Easy to debug and verify, layer by layer from the bottom up
    - Easy to extend and maintain; the calling interfaces between layers are clear and fixed
  - Disadvantages
    - Only the adjacent lower layer can be called, and it is difficult to define the boundaries of each layer reasonably
    - Low efficiency: layers cannot be crossed, so system calls take a long time to execute

- Modularization

  - The kernel is divided into multiple modules, and the modules cooperate with one another

    Kernel = main module + loadable kernel modules

    The main module is responsible only for core functions, such as process scheduling and memory management

    Loadable kernel modules: new modules can be loaded into the kernel dynamically without recompiling the entire kernel

  - Advantages

    - The logic between modules is clear and easy to maintain; once the interfaces between modules are defined, multiple modules can be developed simultaneously
    - Supports dynamically loading new kernel modules (e.g., installing device drivers or new file system modules into the kernel), which enhances OS adaptability
    - Any module can directly call other modules without using message passing for communication, so efficiency is high

  - Disadvantages

    - The interface definitions between modules are not necessarily reasonable or practical
    - Modules depend on one another, making debugging and verification harder

- Exokernel

  - The kernel is responsible for functions such as process scheduling and process communication, while the exokernel is responsible for allocating unabstracted hardware resources to user processes, and the exokernel is also responsible for ensuring the safety of resource usage
  - Advantages
    - The exokernel can directly allocate "non-virtualized, non-abstracted" hardware resources to user processes, so that user processes can use hardware resources more flexibly
    - It reduces the "mapping layer" of virtual hardware resources and improves efficiency
  - Disadvantages
    - It reduces system consistency
    - It makes the system more complex

### 1.8 Operating System Boot

- The CPU starts from a specific main memory address, fetches instructions, and executes the boot program in ROM (it first performs a hardware self-test and then powers up)
- The first block of the disk — the master boot record — is read into memory, the disk boot program is executed, and the partition table is scanned
- The partition boot record is read from the active partition (also called the primary partition, i.e., the partition on which the operating system is installed), and the program in it is executed
- The complete operating system initialization program (i.e., the boot manager) is found in the root directory and executed, completing the series of actions involved in "booting"

### 1.9 Virtual Machines

- Using virtualization technology, one physical machine is virtualized into multiple virtual machines (VMs), and each virtual machine can run an operating system independently

- Virtual machine manager / virtual machine monitor / Virtual Machine Monitor / Hypervisor

  - Type 1: runs directly on the hardware
  - Type 2: runs on the host operating system (VMware)

- Comparison of the two types

  |                    | Type 1 VMM                                                   | Type 2 VMM                                                   |
  | ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | Control over physical resources | Runs directly on the hardware and can directly control and allocate physical resources | Runs on top of the host OS and relies on the host OS to allocate physical resources for it |
  | Resource allocation method | When installing a guest OS, the VMM must allocate storage space on the original hard disk by itself, similar to the "exokernel" allocation method, allocating unabstracted physical hardware | The guest OS has its own virtual disk, which is in fact a large file in the host OS file system. The memory allocated to the guest OS is virtual memory |
  | Performance | Better performance | Worse performance, because the host OS is needed as an "intermediary" |
  | Number of virtual machines supported | More; it does not need to compete with the host OS for resources, so the same hardware resources can support more virtual machines | Fewer; the host OS itself needs physical resources, and running other processes on the host OS also needs physical resources |
  | Migratability of virtual machines | Worse | Better; the virtual machine can be migrated to another host OS simply by exporting the virtual machine image file, so commercial applications are more widespread |
  | Operating mode | Type 1 VMMs run at the highest privilege level (Ring 0) and can execute the most privileged instructions | Type 2 VMMs run partly in user mode and partly in kernel mode. System calls issued by the guest OS are intercepted by the VMM and converted into the VMM's system calls to the host OS |

## 2. Process Management

### 2.1 Concept, Composition, and Characteristics of a Process

- Concept — understanding the difference between a "process" and a "program"

  - Program: static; it is just an executable file stored on disk, i.e., a series of instructions
  - Process: dynamic; it is one execution of a program

- Composition — what parts a process consists of

  - PCB

    The following information is all kept in a data structure called the PCB, i.e., the process control block

    The operating system records the PID and the ID of the user the process belongs to (UID)

    It also records which resources have been allocated to the process (e.g., how much memory has been allocated, which I/O devices are in use, which files are in use)

    It also records how the process is running (e.g., CPU time used, disk usage, network traffic usage, etc.)

    - Process description information
      - Process identifier PID
      - User identifier UID
    - Process control and management information
      - Statistics on CPU, disk, and network traffic usage...
      - Current state of the process: ready/blocked/running...
    - Resource allocation list
      - Which files are in use
      - Which memory regions are in use
      - Which I/O devices are in use
    - Processor-related information
      - Values of various registers such as the PSW and the PC (used to implement process switching)

  - Program segment — the program's code (instruction sequence)

  - Data segment — the various data produced during execution (e.g., variables defined in the program)

- Characteristics — what important characteristics a process has

### 2.2 Process States and Transitions

- States

  - Running state — holds the CPU and runs on it

    - When the CPU is idle, the operating system selects a ready process and lets it run on the processor

      If a process is running on the CPU at this moment, that process is in the "running state"

  - Ready state — already meets the conditions to run, but cannot run temporarily because no CPU is free

    - After a process has been created, it enters the "ready state". A process in the ready state already meets the conditions to run, but because no CPU is free it cannot run for the time being

  - Blocked state — cannot run temporarily because it is waiting for some event

    - While a process is running, it may request to wait for some event to occur (e.g., waiting for some system resource to be allocated, or waiting for a response from another process).

      Before this event occurs, the process cannot continue executing; the operating system then takes the process off the CPU and puts it into the "blocked state"

      When the CPU becomes idle, the operating system selects another process in the "ready state" to run on the CPU

  - Created state — the process is being created, and the operating system allocates resources for the process and initializes the PCB

    - While a process is being created, its state is the "created state". At this stage the operating system allocates resources for the process and initializes the PCB

  - Terminated state — the process is being removed from the system, and the operating system reclaims the resources the process owns and deletes its PCB

    - A process can execute the exit system call to request that the operating system terminate that process. The process then enters the "terminated state"; the operating system takes the process off the CPU, reclaims resources such as memory space, and finally reclaims the process's PCB

- Transitions between states

  - Created state -> ready state

    The system completes the series of operations that create the process

  - Ready state -> running state

    The process is scheduled

  - Running state -> ready state

    The time slice expires, or the processor is preempted

  - Running state -> blocked state

    The process requests some system resource by means of a "system call", or asks to wait for some event to occur

  - Blocked state -> ready state

    The requested resource is allocated, or the event being waited for occurs

  - Running state -> terminated state

    The process finishes running, or encounters an unrecoverable error during execution

- How processes are organized (how the PCBs of the various processes are organized)

  - Linking
    - Execution pointer
    - Ready queue pointer
    - Blocked queue pointer
  - Indexing
    - Execution pointer
    - Ready table pointer
    - Blocked table pointer

### 2.3 Process Control

- Basic concepts

  - What is process control:

    The main function of process control is to effectively manage all processes in the system; it has functions such as creating new processes, terminating existing processes, and implementing process state transitions.

    Simplified understanding: in short, process control is about implementing process state transitions

  - How process control is implemented: with "primitives"

    - A primitive is a special kind of program whose execution is atomic. That is, this piece of program must run to completion in one go and cannot be interrupted
    - Atomicity can be achieved with two privileged instructions, the "disable interrupts" instruction and the "enable interrupts" instruction
    - After the CPU executes the disable-interrupts instruction, it no longer checks interrupt signals until it executes the enable-interrupts instruction. In this way, the instruction sequence between disabling and enabling interrupts cannot be interrupted, which achieves "atomicity".

- Terminology related to process control

  - Process creation
    - Creation primitive
      - Request a blank PCB
      - Allocate the required resources for the new process
      - Initialize the PCB
      - Insert the PCB into the ready queue
    - Events that cause process creation
      - User login: in a time-sharing system, when a user logs in successfully, the system creates a new process for the user
      - Job scheduling: in a multiprogrammed batch system, when a new job is placed into memory, a new process is created for it
      - Providing a service: when a user makes some request to the operating system, a new process is created to handle that request
      - Application request: a user process actively requests the creation of a child process
  - Process termination
    - Termination primitive
      - Find the PCB of the terminating process in the PCB set
      - If the process is running, immediately take the CPU away and allocate it to another process
      - Terminate all of its child processes
      - Return all resources owned by the process to its parent process or to the operating system
      - Delete the PCB
    - Events that cause process termination
      - Normal completion
      - Abnormal completion
      - External intervention
  - Process blocking
    - Blocking primitive
      - Find the PCB corresponding to the process to be blocked
      - Save the process's running context, set the PCB state information to "blocked state", and temporarily stop the process
      - Insert the PCB into the wait queue of the corresponding event
    - Events that cause process blocking
      - The process needs to wait for the system to allocate some resource
      - The process needs to wait for other cooperating processes to finish their work
  - Process wakeup
    - Wakeup primitive
      - Find the PCB in the event wait queue
      - Remove the PCB from the wait queue and set the process to the ready state
      - Insert the PCB into the ready queue and wait to be scheduled
    - Event that causes process wakeup: the event being waited for occurs
  - Process switching
    - Switching primitive
      - Save the context into the PCB
      - Move the PCB into the corresponding queue
      - Select another process to execute and update its PCB
      - Restore the running environment required by the new process from the PCB
    - Events that cause process switching
      - The current process's time slice expires
      - A higher-priority process arrives
      - The current process blocks voluntarily
      - The current process terminates

### 2.4 Process Communication (IPC)

Interprocess communication refers to data interaction between two processes

- Shared storage

  The same shared memory region can be mapped into the address space of each process by "adding page table entries and segment table entries"

  To avoid errors, each process's access to the shared space should be mutually exclusive

  Each process can use the synchronization and mutual exclusion tools provided by the operating system kernel (such as P\V operations)

  - Data-structure-based sharing: for example, the shared space can hold only an array of length 10. This sharing method is slow and highly restricted, and it is a low-level communication method
  - Storage-region-based sharing: the operating system sets aside a shared storage region in memory, and the form of the data and its storage location are controlled by the communicating processes rather than by the operating system. This sharing method is very fast and is a high-level communication method

- Message passing

  Data exchange between processes takes **formatted messages** as the unit. Processes exchange data through the two primitives "send message" and "receive message" provided by the operating system

  | Message header | The message header includes formatted information such as the sending process ID, the receiving process ID, and the message length |
  | ------ | ---------------------------------------------------------- |
  | Message body | The specific data that the process wants to pass |

  

  - Direct communication: the message-sending process must specify the ID of the receiving process
  - Indirect communication: indirect communication through a "mailbox", hence it is also called "mailbox communication"

- Pipes

- Communication

  - A "pipe" is a special shared file, also called a pipe file. It is in fact a fixed-size memory buffer opened up in memory, a **circular queue**
  - A pipe can only use half-duplex communication, so only one-way transmission can be achieved within a given period. To achieve simultaneous two-way communication, two pipes must be set up
  - Processes must access the pipe mutually exclusively (implemented by the operating system)
  - When the pipe is full, the writing process blocks until the reading process takes the data out of the pipe, at which point the writing process is woken up
  - When the pipe is empty, the reading process blocks until the writing process writes data into the pipe, at which point the reading process is woken up
  - Once data in a pipe is read out, it disappears completely. Therefore, when multiple processes read the same pipe, confusion may occur. There are usually two solutions to this:
    - One pipe allows multiple writing processes and one reading process
    - Multiple writing processes and multiple reading processes are allowed, but the system lets the reading processes take turns reading data from the pipe

### 2.5 Thread Concepts and Multithreading Models

- What is a thread, and why introduce threads?

  Traditionally, the process is the smallest unit of a program's execution flow.

  Some processes may need to do many things "at the same time", whereas a traditional process can only execute a series of programs serially. For this reason, "threads" were introduced to increase the degree of concurrency.

- What changes after the thread mechanism is introduced?

  - Resource allocation and scheduling

    - In the traditional process mechanism, the process is the basic unit of resource allocation and scheduling

    - After threads are introduced, the process is the basic unit of resource allocation and the thread is the basic unit of scheduling.

  - Concurrency

    - In the traditional process mechanism, only concurrency between processes is possible
    - After threads are introduced, threads can also run concurrently, which increases the degree of concurrency

  - System overhead

    - Traditional inter-process concurrency requires switching the running environment of processes, which incurs large system overhead
    - With inter-thread concurrency, if the switch is between threads in the same process, the process environment does not need to be switched, so system overhead is small
    - After threads are introduced, the system overhead caused by concurrency is reduced

- What important attributes does a thread have

  - A thread is the unit of processor scheduling
  - On a multi-CPU computer, each thread can occupy a different CPU
  - Each thread has a thread ID and a thread control block
  - A thread also has three basic states: ready, blocked, and running
  - A thread owns almost no system resources
  - Different threads in the same process share the process's resources
  - Because they share the memory address space, communication between threads in the same process does not even need system intervention
  - Switching between threads in the same process does not cause a process switch
  - Switching between threads in different processes does cause a process switch
  - Switching threads within the same process incurs very little system overhead
  - Switching processes incurs relatively large system overhead

- Thread implementation approaches

  - User-level threads
  - Kernel-level threads

- Multithreading models

  - Many-to-one model
  - One-to-one model
  - Many-to-many model

### 2.6 Thread Implementation Approaches and Multithreading Models

- Thread implementation approaches
  - User-level threads: threads visible from the user's perspective, implemented by a thread library
  - Kernel-level threads: threads visible from the operating system's perspective, implemented by the operating system (only kernel-level threads are the unit of processor allocation)
  - Combined approach: a combination of the two approaches above
- Multithreading models
  - One-to-one model
    - One user-level thread maps to one kernel-level thread
    - Pros: each thread can be allocated to a multi-core processor and executed in parallel, giving a high degree of concurrency
    - Cons: thread management requires operating system support, so overhead is high
  - Many-to-one model
    - Multiple user-level threads map to one kernel-level thread
    - Pros: low thread management overhead and high efficiency
    - Cons: if one thread blocks, the whole process is blocked (low degree of concurrency)
  - Many-to-many model
    - n user-level threads map to m kernel-level threads
    - Combines the strengths of both
