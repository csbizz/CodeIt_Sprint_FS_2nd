import { IAnimal, IDog } from "./oop";

class 사람 {
  //   private name: string;
  //   private age: number;
  //   private 동네: string;
  //   private 애완견?: IAnimal;

  //   constructor(name: string, age: number, 동네: string, 애완견?: any) {
  //     this.name = name;
  //     this.age = age;
  //     this.동네 = 동네;
  //     this.애완견 = 애완견;
  //   }
  constructor(
    private readonly name: string,
    private readonly age: number,
    private readonly 동네: string,
    private readonly 애완견?: any
  ) {}
  //   자바스크립트는 불변 객체를 만들기가 귀찮음
  //   불변 필드

  애완동물한테밥주기() {
    if (!this.애완견) return console.log("애완견이 없습니다.");
    this.애완견?.리얼짖다(3);
  }

  private private함수() {
    console.log("private");
  }
}

const person = new 사람("짱구", 5, "홍대");
