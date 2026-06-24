---
layout: post
author: joonwan jeon
tags: [os, system-structure]
category: concept
---

# Computer System Structure 

| computer system 에서 hardware 가 어떻게 동작하는지 알아보자.

![](/assets/images/os/system_structure.png)

## 1. Computer System 구조와 구성요소 

### CPU
작업을 수행하는 주체 입니다. program counter 라는 register에 저장되어있는 명령어의 주소에서 명령어를 가져와 해당 주소에 있는 명령어를 실행하는 역할을 합니다.

### Register
메모리보다 더 빠르고 용량이 적은 저장공간입니다.

### Mode bit
cpu 에서 실행되는 명령어가 kernel 에서 실행하는 명령인지, 사용자 프로그램의 명령인지 구분시켜주는 bit 입니다.
0 과 1의 값을 가질 수 있습니다.
  - 0 : kernel mode 또는 monitor mode 라고 불립니다.
  - 1 : user mode
interrupt 발생시 mode bit 이 1 에서 0으로 변경됩니다.

### Interrupt Line
cpu 와 다른 장치들을 연결하는 신호선 입니다. interrupt 가 발생되면 전기 신호가 interrupt line 에 도달하게 됩니다.

### Memory 
cpu 의 작업 공간입니다. cpu 는 매 순간 memory 에서 기계어를 읽어 작업을 수행합니다.

### Timer

#### Timer란?
설정된 시간이 경과하면 interrupt를 발생시키는 하드웨어입니다. 
특정 프로세스가 CPU를 독점하는 것을 방지하여 **시분할(Time Sharing)**을 구현하는 핵심 장치입니다.

#### Timer의 동작 원리
1. **타이머 설정**: Kernel이 프로세스에게 CPU를 할당하기 전, Timer에 시간을 설정합니다 (보통 10~100ms).
2. **시간 경과**: Timer는 매 클럭마다 카운트를 1씩 감소시킵니다.
3. **Interrupt 발생**: Timer 값이 0이 되면 interrupt를 발생시킵니다.
4. **제어권 반환**: CPU는 현재 명령어를 완료한 후 interrupt line을 확인하고, kernel에게 제어권을 넘깁니다.
5. **Context Switch**: Kernel은 다른 프로세스를 선택하고, Timer를 다시 설정한 후 CPU 제어권을 넘깁니다.

> 💡 **핵심**: Timer가 없다면 악의적인 프로그램이 무한루프로 CPU를 독점할 수 있습니다!

### Device Controller

I/O 장치를 전담하는 작은 CPU 입니다. 제어 정보를 위한 Register 들을 가집니다.
- controller register
- status register
> 💡 **제어정보를 위한 Register** : cpu 가 device controller 에게 일을 시킬 때 이 register 를 통해 어떤 일을 지시하기 위한 register 입니다.

### DMA Controller

#### DMA Controller란?

DMA(Direct Memory Access) Controller는 CPU와 함께 메모리에 직접 접근할 수 있는 하드웨어입니다.

**Memory Controller의 역할:**
- CPU와 DMA가 동시에 메모리에 접근하면 데이터 일관성이 깨질 수 있습니다.
- Memory Controller가 둘 중 누가 먼저 메모리에 접근할지 조율합니다.

#### DMA Controller의 역할

I/O Device의 Local Buffer에 쌓인 데이터를 **Block 단위**(보통 4KB)로 메모리에 복사하고, 
작업 완료 후 CPU에게 interrupt를 전송합니다.

#### 왜 필요한가?

**DMA 없이:**
- CPU가 직접 Local Buffer에서 데이터를 메모리로 복사해야 함
- CPU 가 이 interrupt 를 처리하는데 시간이 많이 소요됨 

**DMA 있으면:**
- DMA가 Block 단위로 자동 복사 → Interrupt 횟수 대폭 감소
- CPU는 본연의 작업에 집중 가능 → 시스템 효율성 향상

# Interrupt

## 의미

interrupt 는 크게 두가지 의미로 분리됩니다.

- interrupt : hardware interrupt
- trap : software interrupt
  - exception
  - system call

## IO Interrupt 수행 과정 - trap

1. system call 호출
2. cpu 제어권이 kernel 로 넘어옴
3. kernel 은 interrupt 를 확인 후 interrupt vector 가 가리키는 kernel 함수 이동
4. 해당 요청이 올바른 요청인지 확인 후 interrupt service routine 실행
5. Device controller가 IO 작업 수행
6. IO 작업 완료 후 device controller 가 interrupt 를 발생 시킴
7. DMA 가 local buffer 에 있는 data 를 메모리로 복사시킴
8. cpu가 interrupt 를 처리하고 해당 프로세스를 ready 상태로 변경
9. 나중에 scheduling 되어 system call 다음 명령을 실행 

## Interrupt 관련 용어

- Interrupt Service Routine
  interrupt 처리 루틴, interrupt 핸들러라고도 불립니다. interrupt 종류는 되게 많고 각 interrupt 마다 할일이 전부 다릅니다. 이 할 일이 kernel 에 code 로 작성되어 있으며 이 code 들을 interrupt service routine 이라고 부릅니다.

- Interrupt Vector
  각 interrupt 의 interrupt service routine 의 주소가 적힌 자료구조입니다.  
