/**
 * 타입스크립트는 자바스크립트의 문법이 100% 호환된다.
 * 자바스크립트 상위 언어
 * boolean, number, string, array, tuple, enum, unkown, any, void, null, undefined, never, object, ...
 */

function add(a: number, b: number): number {
  return a + b;
}

const result = add(1, 100);
console.log(result);

// optional chaining
// const user = {
//   name: "짱구",
//   job: "developer",
// };

// if (user.company?.employees > 20) {
//   console.log("성인");
// }

function getFullName(firstName: string, lastName: string, option?: any) {
  return `full name: ${firstName} ${lastName}, option: ${option}`;
}

const fullName = getFullName("신", "짱구");
console.log(fullName);
