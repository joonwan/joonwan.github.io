---
layout: post
author: joonwan
tags: [os]
title: Computer System Architecure & Interrupt
---

# Computer System Architecure

![computer system architecure](/assets/images/os/computer_system_architecture/computer_system_architecure.png)

컴퓨터는 위 그림과 같이 구성되어 있습니다. 각 구성요소가 어떤 역할을 하는지 하나씩 살펴 보도록 하겠습니다.

## CPU

CPU 는 Central Processing Unit 의 약자로, 컴퓨터 시스템을 통제하고 프로그램의 연산을 실행, 처리하는 가장 핵심적인 컴퓨터의 제어 장치 입니다. 

쉽게 말해 기계어를 실행하는 하드웨어 입니다.

## kernel

운영체제의 핵심 부분으로 메모리에 상주하는 부분을 의미합니다. 사용자 프로그램이 컴퓨터 시스템을 편리하게 사용할 수 있는 환경을 제공합니다.

## Mode Bit

## Mode Bit 이 필요한 이유

cpu 에서 실행되는 기계어는 크게 두가지로 구분할 수 있습니다.

- 사용자 프로세스의 기계어
- kernel 의 기계어

보통 kernel 의 기계어는 컴퓨터 시스템의 자원 다루는 기계어입니다.

그런데 사용자 프로그램이 악의 적인 목적으로 이러한 kernel 의 기계어를 실행한다면 다른 프로그램 및 운영체제에게 악영향을 끼칠 수 있습니다.

이렇게 컴퓨터 시스템의 보안을 해칠 수 있는 명령어를 바로 **특권 명령** 이라고 합니다. 

따라서 사용자 프로그램의 잘못된 수행으로 다른 프로그램 및 운영체제에게 피해가 가지 않도록 **보호장치**가 필요합니다.

이 보호 장치가 바로 **Mode bit** 입니다.

## Mode Bit 의 두가지 Mode

bit 에는 0 과 1을 저장할 수 있습니다. 따라서 Mode bit 또한 0 과 1 의 값을 가질 수 있으며 각각 의미하는 것은 다음과 같습니다.

- `0` : kernel mode (monitor mode, system mode) 

- `1` : user mode 

kernel 이 cpu 를 점유하여 명령어를 실행할 때 mode bit 이 0 입니다. 이후 kernel 이 사용자 process 에게 cpu 를 넘겨줄 때 mode bit 을 1로 바꾼 후 넘겨줍니다.

이러한 mode bit 덕분에 현재 CPU 를 사용자 프로세스가 점유하는지, kernel 이 점유하는지 구별이 가능하며, 특권 명령은 오직 mode bit 이 1일때만 수행할 수 있기때문에 System 의 보안성을 높일 수 있습니다.

## Program counter & Register

### Register

CPU 는 연산을 할때 다음과 같은 과정을 수행합니다.

**1. 값을 작은 저장소에 저장**

![add1](/assets/images/os/computer_system_architecture/add1.png)

**2. 값에 연산 수행**
![add2](/assets/images/os/computer_system_architecture/add2.png)

**3. 업데이트한 값을 메모리에 저장**
![add3](/assets/images/os/computer_system_architecture/add3.png)

즉 CPU 는 연산을 수행하기 위해서는 작은 저장소들이 필요합니다. 이 작은 저장소를 바로 **Register** 라고 부릅니다.

### Program counter

CPU 는 한 프로세스의 명령어를 실행하는 역할을 합니다. 명령어를 실행하기 위해서는 명령어의 주소가 있어야 하며 이 명령어가 어디에 있는지 알 수 있어야 합니다.

이러한 이유로 존재하는 것이 바로 **Program Counter** 라는 Register 이며, 명령어의 주소를 가지고 있습니다. 

따라서 CPU 는 Program Counter 가 가리키는 명령어를 실행하며 프로세스를 진행시킵니다.

## Timer

현대 컴퓨터는 여러 프로세스 를 수행할 때 컴퓨터 처리 능력을 일정한 시간단위로 분할하여 사용합니다. 

즉 하나의 프로세스를 실행하다 정해진 시간이 끝날 경우 해당 프로세스를 잠시 저장한 뒤 다른 프로세스를 실행시킵니다.

그런데 사용자 프로세스가 싫행중일때 kernel 이 직접 cpu 제어권을 사용자 프로세스로 부터 뺏어오지 못합니다. 즉 누군가의 도움이 필요합니다.

이때문에 존재하는 것이 바로 `Timer` 라는 하드웨어입니다. 

`Timer`는 할당된 시간이 끝날 경우 Interrupt 를 발생시키는 역할을 합니다. Interrupt 가 발생할 경우 cpu 제어권은 kernel 로 넘어가게 되어 현재 진행중인 사용자 프로세스의 진행을 멈출 수 있습니다.

자세한 예시는 Interrupt 에서 다루도록 하겠습니다.

## DeviceController & Local Buffer

키보드, 디스크 등 각각의 IO 장치들에는 이들을 각각 전담하는 작은 CPU 가 붙어있습니다. 이를 Device Controller 라고 합니다.

Device Controller 는 일종의 작은 CPU 이기 때문에 연산을 합니다. CPU 가 연산할때 Register 가 필요하듯, Device Controller 또한 Register 가 필요한데 이를 `Local Buffer` 라고 합니다.

운영 체제는 이러한 IO 작업을 직접 처리하지 못합니다. 따라서 IO 작업을 대신 해달라고 Device Controller 에게 요청하는 방식으로 동작합니다. 이때 이 요청하는 방법이 정의되어 있는 것이 바로 `Device Driver` 입니다.

운영체제가 device controller 에게 io 작업을 요청할 경우, device controller 는 직접 io 작업을 수행합니다. device controller 또한 cpu 이기 때문에 저장되어 있는 프로그램을 실행시켜 io 작업을 수행하게 됩니다. 이렇게 어떻게 io 작업을 수행할지 저장되어 있는 프로그램을 바로 `Firmware` 라고 합니다.

이후 IO 작업이 완료될 경우 Device Controller 는 Interrupt 를 발생시켜 cpu 에게 IO 작업이 완료되었다고 알려줍니다.

정리하자면 다음과 같습니다.

- kernel 은 device driver 에 정의된 대로 device controller 에게 io 작업 요청
- device controller 는 firmware 에 적힌 대로 요청에 맞는 io 작업 수행
- 즉 device driver 는 cpu 가 수행하는 코드
- firmware 는 device controller 가 수행하는 코드

# Interrupt

Interrupt 란 CPU 가 발생한 이벤트를 적시에 처리할 수 있게끔, 현재 실행중인 코드를 중단하도록 요청하는 것을 의미합니다.

일반적으로 cpu 명령어를 하나 수행하고난 뒤, Interrupt Line 에 interrupt 가 발생했는지 확인하는 작업을 합니다. 즉 명령어 한번 수행 그리고 interrupt line 확인, 이 두 과정을 반복하면서 연산을 수행합니다. 따라서 interrupt 가 발생할 경우 바로 발생한 인터럽트에 대한 정의된 행동을 수행할 수 있습니다.

## Interrupt 의 종류

Interrupt 는 크게 두가지유형으로 구분할 수 있습니다.

- Interrupt (Hardware Interrupt)
- Trap (Software Interrupt)


### HarwareInterrupt 

하드웨어가 발생시킨 Interrupt 를 의미합니다. 예를 들어 device controller 또는 timer 가 발생시킨 interrupt 를 의미합니다.

timer interrupt 를 예시로 interrupt 가 발생했을 경우 어떻게 computer 가 동작하는지 알아보겠습니다.

**1. kernel 이 timer setting 후 cpu 점유권을 사용자 Process 에게 주는 상황**

![setTimer](/assets/images/os/computer_system_architecture/setTimer.png)


현재 kernel 이 cpu 를 점유하고 있기 때문에 mode bit 의 값은 0 입니다. kernel 은 사용자 프로세스에게 cpu 점유권을 넘겨주기 전 timer 에 시간을 설정합니다. 


**2. mode bit 0 -> 1**

![setModeBit](/assets/images/os/computer_system_architecture/setModeBit.png)

이제 사용자의 프로세스가 cpu 를 점유해야하기 때문에 kernel 은 mode bit 을  0 을 1로 변경시킵니다.

**3. 사용자 프로세스가 cpu 점유**

![userProcessRun](/assets/images/os/computer_system_architecture/userProcessRun.png)

이제 사용자 프로세스가 cpu 를 점유하는 상홥니다. 사용자 프로세스가 cpu 를 점유하는 동안 Timer 의 시간은 감소하고 있습니다.

**4. 시간 만료**

![timerInterrupt](/assets/images/os/computer_system_architecture/timerInterrupt.png)

시간이 만료될 경우, Timer 는 Interrup를 발생시킵니다.

**5. kernel 복귀**

![changeKernel](/assets/images/os/computer_system_architecture/changeKernel.png)

interrupt 가 발생했기 때문에 cpu 는 수행하던 명령어를 멈추고 mode bit 을 0으로 바꾼 뒤 kernel 에게 cpu 점유권을 줍니다. 

이제 kernel 은 다른 proces 에게도 마찬가지로 timer 값을 세팅 후 Mode bit 을 1로 바꾼후 점유권을 넘깁니다.

## Trap

Trap 은 Software Interrupt 를 의미합니다. 다음 두가지 경우에 발생할 수 있습니다.

- system call
- exception


System call 이란 user mode 에서 실행하지 못하는 kernel 영역에 있는 코드를 호출하기 위해 kerenl 에게 요청하는 것을 의미합니다.

사용자 프로세스가 systrem call 을 호출할 경우 어떤식으로 동작하는지 동기식 입출력 예제를 통해 알아보겠습니다.

**1. 사용자 프로세스 실행**

![userprocess](/assets/images/os/computer_system_architecture/ioUserProcess.png)

사용자 프로세스가 cpu 를 점유하고 있기 때문에 mode bit 은 0 입니다.

**2. systemcall 호출**

![systemcall](/assets/images/os/computer_system_architecture/systemcall.png)

사용자 process A 는 IO 작업을 해야하는데 이는 user mode 일때는 수행이 불가능 합니다. 따라서 자체적으로 Interrupt 를 발생시켜 kernel 에게 io 작업을 요청합니다.

**3. device controller 에게 요청**

![request](/assets/images/os/computer_system_architecture/kernelRequestIO.png)

kernel 은 Deivce Driver 에 정의된 대로 Device Controller 에게 IO 작업을 요청합니다.

**4. 다른 프로세스에게 CPU 제어권 넘김**

![otherProcess](/assets/images/os/computer_system_architecture/setTimerForOtherProcess.png)

IO 작업은 매우 오래걸리는 작업입니다. 따라서 작업 완료까지 많은 시간이 소요됩니다. 따라서 Process - A 는 CPU 를 점유해도 아무것도 할 수 없는 상황입니다. 그대로 Process - A 가 CPU 를 점유하고 있다면 이는 매우 비효율적입니다.

운영체제는 효율적으로 computer 의 자원을 관리하기 위해 cpu 를 실행할 수 있는 상태의 Process 에게 cpu 점유권을 넘깁니다. 

**5. 다른 프로세스 실행**

![](/assets/images/os/computer_system_architecture/processBRun.png)


process B 가 실행중이지만 process A 가 요청한 작업은 Device Controller 에서 진행중입니다.

**6. IO 작업 완료**

![](/assets/images/os/computer_system_architecture/finishIO.png)

IO 작업이 완료될 경우 Device Controller 는 Interrupt 를 발생 시킵니다.  

**7. 결과 복사**

![](/assets/images/os/computer_system_architecture/copyIOResult.png)

kernel 은 local buffer 에 접근해 IO 결과를 process - A, 즉 IO 작업을 요청한 process 의 주소 공간에 copy 합니다.

**8. 사용자 Process 실행**

![](/assets/images/os/computer_system_architecture/processBRun.png)

이제 Process A 는 대기 상태에서 실행 가능 상태로 변경되며 다시 CPU 점유권은 Process B 로 넘어가게 되며 Process B 가 다시 수행됩니다.

## Interrupt Handling

앞서 여러 Interrupt 가 발생할 경우 computer system 에서 어떻게 동작하는지 확인해 보았습니다.

사실 위 의 경우 말고도 수많은 인터럽트들이 존재합니다. 결국 각 interrupt 마다 interrupt 발생시 어떨게 행동해야 하는지 kernel 이 알고있어야 시스템을 정상적으로 운영할 수 있습니다.

![](/assets/images/os/computer_system_architecture/interruptHandle.png)

kernel 은 interrupt 번호를 확인한 후 interrupt 번호에 대한 행동 즉 함수의 주소가 적힌 자료 구조를 확인합니다. 이것이 바로 `Interrupt Vector` 입니다.

이후 해당 주소를 가면 발생한 Interrupt 에 대해 어떤식으로 행동해야 하는지 기계어로 작성되어 있습니다. 이를 `Interrupt Service Routine` 이라고 합니다.

따라서 다양한 Interrupt 가 발생해도 kernel 내부의 interrupt vector 를 통해 어떤 행동을 해야할 지 구분할 수 있게 되며, 실제 kernel 내부의 해당 주소로 이동하여 interrupt service routine 을 실행하여 interrupt 를 handling 할 수 있게 됩니다.
