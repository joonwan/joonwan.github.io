
# 일반적인 컴퓨터 시스템 구조

![](/assets/images/computer_system_architecutre.png)

일반적인 컴퓨터 시스템 구조에 어떤 것들이 있으며 왜 존재하는지 알아보자.

## 구성요소

- `CPU` : 컴퓨터에서 두뇌와 같은 역할을 한다. 주된 업무는 프로그램 명령을 실행하는 것이다. program counter 에 저장된 명령의 주소를 확인한 뒤 이를 순차적으로 실행한다. 명령어 실행과 실행 사이 interrupt 라인에 interrup 가 발생했는지 확인하는 작업이 들어간다. 

- `Register` : CPU 내부에 존재하는 작은 저장공간이며 메모리 보다 빠른 것이 특징이다.

- `Mode Bit` : CPU 내부에서 실행되는 프로세스가 커널인지, 사용자 프로그램인지 구분하는 비트이다. 값에 따른 유형은 다음과 같다.
	- `0` : 커널. 메모리 접근 뿐만 아니라 IO 접근까지 가능하다.
	- `1` : 사용자 프로그램. 제한된 명령만 수행 가능하다.

- `Interrupt Line` : Interrupt Request Line 이라고도 하며 CPU 내부에 존재하는 선 이며 다른 Controller 들이 보낸 Interrupt 신호를 감지하기 위해 존재한다.

- `Timer` : 정해진 시간이 지난뒤 OS 즉 커널에게 CPU 제어권이 넘어가게 하기 위해 Interrupt 를 발생시킨다. CPU 를 특정 프로그램이 독점 하는 것을 보호하기 위해 사용한다.

- `Disk Controller` : 특정 IO 장치를 관리하는 일종의 작은 CPU 이다. 제어 정보를 위해 Control Register, Status Register 를 가진다. 또한 Local Buffer 를 가진다. 이는 일종의 Data Register 이다.

## Interrupt

먼저 Interrupt 의 정의에 대해 알아보자.


> Interrupt 란?
> 발생한 이벤트가 즉시 처리될 수 있도록 CPU 에게 현재 진행중인 코드를 중단하도록 요청하는 것을 의미한다.

위 그림의 구성요소인 IO Device 와 Timer 의 예시를 통해 Interrupt 발생과 처리 과정에 대해 이해해 보자.

### IO Interrupt

![](/assets/images/interrupt_1.png)

특정 사용자 프로그램이 디스크에 존재하는 파일을 읽는 코드를 수행한다고 가정해보자. 이때 사용자 프로그램의 코드에는 파일을 읽는 기능을 하는 System call 이 존재할 것이다.

> System call
> 운영체제 커널의 함수를 호출하는 것을 의미한다.

io 접근 은 mode bit 이 0 일때만 가능하다. 따라서 사용자 프로그램은 io 작업이 필요한 경우 io 요청을 하며 interrupt 를 발생시킨다. 즉 system call 이 실행되면서 interrupt 를 발생시킨다.

![](/assets/images/interrupt_2.png)
cpu 는 다음 명령을 수행하기전 interrupt line 을 통해 interrupt 발생 여부를 확인한다. 사용자 프로그램이 io 를 위해 interrupt 를 발생시켰기 때문에 cpu 의 제어권은 kernel 에게 넘어가며 mode bit 은 0 으로 바뀐다. 이후 kernel 은 device controller 에게 IO 작업 요청을 한다. 
그리고 기존 실행중이던 Process 는 Blocked 상태로 변한다.

![](/assets/images/interrupt_3.png)

kernel 은 IO 작업 요청을 한뒤 modebit 을 1로 바꾼 뒤 다른 process 에게 CPU 점유권을 넘긴다.

![](/assets/images/interrupt_4.png)
시간이 지나 io 작업이 완료된 경우 device controller 는 cpu 에게 interrupt 를 보낸다. 


다른 작업을 수행중이던 cpu 는 명령이 끝난 뒤 interrupt line 을 확인하여 device controller 가 보낸 interrupt 를 감지한 뒤 mode bit 을 0으로 바꾼뒤 kernel 에게 cpu 제어권을 넘긴다. 

kernel 은 interrupt 의 출처를 확인한 뒤 이전 io 를 요청했던 프로세스의 메모리 영역에 io 결과를 copy 해준다.

![](/assets/images/interrupt_5.png)

요청 프로세스의 메모리 영역에 IO 결과가 복사된 후 IO 를 요청했던 User Process 1 은 Ready 상태로 바뀌게 되며, 기존 실행하던 User Process 2 가 다시 실행된다.

### Timer Interrupt

사실 kernel 은 사용자 프로세스에게 CPU 제어권을 넘겨 주기 전에 Timer 를 통해 시간을 설정한다. 
![](/assets/images/timer1.png)

Timer 는 매 클럭 틱 마다 1씩 감소한다.
![](/assets/images/timer2.png)


이후 timer 의 값이 0이 되었을 때 interrupt 를 발생시킨다.

![](/assets/images/timer3.png)

cpu 는 interrupt line 의 interrupt 를 감지한 후 CPU 점유권을 kernel 에게 넘긴다.

![](/assets/images/timer4.png)

CPU 제어권을 잡은 kernel 은 다른 프로세스에게 cpu 점유 권을 넘기기 위해 다시 timer 에 값을 세팅한다.
![](/assets/images/timer5.png)

이후 다른 프로세스가 CPU 를 점유해 프로그램의 명령어가 수행된다.
![](/assets/images/timer6.png)

## Interrupt 종류


위 두 예제를 통해 발생하는 Interrupt 는 크게 다음 두가지로 구분할 수 있다.

- Hardware Interrupt (Interrupt)
- Software Interrupt (Trap)

### Hardware Interrupt

Interrupt 라고 부르며 Device Controller 또는 Timer 등 하드웨어가 발생시킨 Interrupt 이다. 

### Software Interrupt

Trap 이라고도 부르며 소프트웨어가 발생 시킨 Interrupt 이다. 이는 다음 경우에 발생한다.

- system call 
- exception

## Interrupt 핸들링

CPU 가 Interrupt line 을 통해 interrupt 를 감지할 경우 특정 interrupt 에 대해 어떤 행동을 할지 알아야 의도된 동작을 할 수 있다. 

![](/assets/images/interrupt_handling1.png)

interrupt 발생시 다음과 같이 동작한다.

1. interrupt line 에 있는 interrupt 의 번호 확인
2. 해당 번호를 interrupt vector 의 index 값으로 사용해 interrupt handler routine 의 주소 확인
3. 해당 주소로 이동 후 정의된 동작 수행


- interrupt vector : 해당 인터럽트를 처리하는 처리 루틴의 주소를 가지고 있는 자료 구조이다. 발생한 인터럽트마다 어떤 주소로 가야하는지 저장되어 있다.

- interrupt handler routine : 인터럽트 핸들러이며 해당 인터럽트를 처리하는 커널 함수이다.

# DMA Controller 와 Memory Controller

## DMA Controller 

Device Controller 는 io 작업이 완료될 경우 Interrupt 를 CPU 에게 보낸다. IO 작업 또는 장치가 많아질 수록 Interrupt 의 발생 빈도 또한 많아지게 된다.

Interrupt 가 많아질 수 록 CPU 는 하던 일을 멈추고 Interrupt 를 확인한 뒤 이에 해당하는 처리 루틴을 실행하는 빈도가 잦아지게 되기 때문에 사용자 프로세스는 굉장히 느린 속도로 진행되게 된다.

이러한 문제를 해결하기 위해 DMA Controller 가 사용된다. DMA Controller 는 Local Buffer 에 저장되어 있는 데이터를 직접 메모리에 저장할 수 있다. 

이렇게 할 경우 CPU 개입이 줄어들어 시스템 효율이 향상되고 데이터 전송 속도또한 빨라져 CPU 가 다른 작업에 집중할 수 있게 된다.

## Memory Controller

DMA 를 사용할 경우 Memory 에 접근할 수 있는 것은 CPU 와 DMA Controller 이다. 따라서 CPU 와 DMAC 가 동시에 메모리에 접근에 같은 데이터를 수정하려고 시도할 수 있다.

이럴 경우 데이터의 일관성이 사라질 수 있다. 메모리에 동시에 접근하는 것을 제어해 주는 것이 바로 Memory Controller 이다.
