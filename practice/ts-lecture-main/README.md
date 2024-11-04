자바스크립트 vs 타입스크립트

타입스크립트: 컴파일타임에 타입이 결정됨 -> 개발하는 시점
자바스크립트: 런타임에 타입이 결정됨 -> 코드가 실행되는 시점

컴파일: 형태를 변환하는것
타입스크립트는 컴파일을 하면 자바스크립트가 된다.

타입스크립트로 작성된 코드를 실행할때는
일반적으로 컴파일해서 만들어진 자바스크립트 파일을 실행
-> 컴파일을 해주는 컴파일러가 필요함

typescript 공식문서에서는 tsc를 사용하라고 나와있음
tsc

deprecated: 더이상 사용되지 않음 = 더이상 업데이트 되지 않음 = 언제 사라질지 모름

swc: 한국인이 만든 타입스크립트 컴파일러

라이브코딩

---

1. npm init -y
2. 타입스크립트 개발 환경을 셋팅
   타입스크립트는 언어인데, npm 패키지로 존재한다.
   npm i typescript
   npm i -g typescript
   1. nodemon: 파일의 변경사항을 감지해서 재실행시켜주는 패키지 -> ts-node, tsx
      npm install -D tsx
      -d, -D
   2. 컴파일러: swc
      npm i -D @swc/cli @swc/core
3. 코드 실행 스크립트 셋팅
4. 컴파일
   npx swc src -d dist

---
swc는 type check 기능이 없어서 타입 에러가 있어도 정상적으로 컴파일됨<br>
따라서 typescript에 포함되어있는 공식 컴파일러인 tsc를 사용하는게 더 좋을수도 있음<br>

1. `npm i -D typescript` 명령어 실행
2. `tsc --init` 명령어 실행
3. tsconfig.json 설정을 원하는대로 설정
  - 참고: https://www.typescriptlang.org/ko/tsconfig/
4. `tsc` 명령어 실행
