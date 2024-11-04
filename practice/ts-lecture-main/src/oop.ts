/**
 * oop: Object Oriented Programming
 * 객체지향프로그래밍 -> 자바
 * 자바가 oop를 나타낼 수 있는 가장 좋은 언어 - oop 강제한다.
 * javascript는 oop를 강제하지 않고, oop를 고려하고 개발된 언어도 아님. oop를 따라할 수는 있음
 *
 * typescript는 oop를 지원하고, 자바 하위호환 느낌
 *
 * oop의 4가지 특징
 * 추상화 캡슐화 다형성 상속
 *
 * 추상화: 복잡한 것을 단순하게 표현
 * 캡슐화: 외부에 노출할 데이터와 노출하지 않을 데이터를 구분해서 외부에 노출하지 않을 데이터를 보호, 데이터: 변수, 함수
 * 다형성: overriding(오버라이딩) - 메소드를 재정의, overloading(오버로딩) - 같은 메소드의 타입을 다양하게 정의
 * 상속: 상위클래스의 속성(변수)과 메소드를 자식클래스에서 사용
 */

/**
 * class: 틀
 * instance: 틀로 만든 무언가, 객체 (object)
 * instance, 객체가 가지고 있는 함수: 메소드
 */

/**
 * 속성(필드): 상태
 * 메소드: 행동
 * interface 역할 2개
 * 1. 추상화 (외부에 보여지는 부분만 정의, 단순화)
 * 2. class의 행동을 정의
 */
export interface IAnimal {
  리얼짖다(몇번: number): void;
}

export class Animal implements IAnimal {
  // 멤버변수
  /**
   * 아무것도 안쓰거나, pulbic을 쓰면 외부에서 접근 가능
   * private: 클래스 내부에서만 접근할 수 있음
   * protected: 원래 클래스와 상속받은 하위클래스에서 접근 가능
   */
  protected name: string;
  protected age: number;

  // 생성자
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  protected 짖다(몇번: number): void {
    console.log(`${this.name}가 ${몇번}번 짖습니다.`);
  }

  리얼짖다(몇번: number): void {
    this.짖다(몇번);
  }
}

const animal = new Animal("흰둥이", 3);
// animal.리얼짖다(3);

export interface IDog extends IAnimal {
  먹이주기(먹이: string): void;
  산책하기(몇번: number | string, 장소?: string): void;
}

// 중복 코드를 줄이고, 코드 관리를 용이하게 하기 위해서 상속
export class 개 extends Animal implements IDog {
  주인: string | undefined;
  constructor(name: string, age: number, 주인?: string) {
    // super: 상위클래스의 constructor에 인자를 넘김
    super(name, age);
    this.주인 = 주인;
  }

  먹이주기(먹이: string): void {
    console.log(
      `${this.name}가 ${먹이}를 먹으려고하는데, ${this.주인}이(가) 막았습니다.`
    );
  }

  // 오버라이딩
  리얼짖다(몇번: number): void {
    console.log("사실 100번 더짖음");
    this.짖다(몇번 + 100);
  }

  // 오버로딩 ||
  산책하기(몇번: number): void;
  산책하기(몇번: string, 장소: string): void;
  산책하기(몇번: number | string, 장소?: string): void {
    let count: number;
    if (typeof 몇번 === "string") count = Number(몇번);
    else count = 몇번;

    this.짖다(count);
  }
}

const dog = new 개("검둥이", 3, "신짱구");
dog.리얼짖다(3);
// dog.먹이주기("족발");
dog.산책하기("3", "공원");
