export class Person{
  constructor() {
    console.log("类的构照函数，只在被实例时调用一次")
  }
  name;
  eat(){
    console.log("i am eat");
  }
}

class Employee extends Person{
  constructor() {
      super();
      console.log("子类构照函数必须调用父类的构照函数super")
  };
  code: string;
  work() {
      super.eat();
      this.dowork();
  };
  dowork() {
      console.log("do do")
  }
}

var e1 = new Employee();
e1.work();

var p1 = new Person();
p1.name = "张山";
p1.eat();

var p2 = new Person();
p1.name = "李四";
p1.eat();

// var array1 = [1, 2, 3, 4];
// var [number1, number2, ...others] = array1;
// console.log(number1);
// console.log(number2);
// console.log(others);

//接口的实现
// interface IPerson{
//   name: string;
//   age: number;
// }

// class Person{
//   constructor(public config: IPerson) {
      
//   }
// }

// var p1 = new Person({
//   name: "zhangshan",
//   age:12
// })

// class Employee implements IPerson{
//   name;
//   age;
//   eat() {
//       console.log(this.name);
//   }
// }