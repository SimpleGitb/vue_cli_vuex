"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Person = /** @class */ (function () {
    function Person() {
        console.log("类的构照函数，只在被实例时调用一次");
    }
    Person.prototype.eat = function () {
        console.log("i am eat");
    };
    return Person;
}());
exports.Person = Person;
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee() {
        var _this = _super.call(this) || this;
        console.log("子类构照函数必须调用父类的构照函数super");
        return _this;
    }
    ;
    Employee.prototype.work = function () {
        _super.prototype.eat.call(this);
        this.dowork();
    };
    ;
    Employee.prototype.dowork = function () {
        console.log("do do");
    };
    return Employee;
}(Person));
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
