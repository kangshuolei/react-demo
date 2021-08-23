import React from 'react'

export default function Demo15() {

    //构造函数继承
    // function Person(name,age) {
    //     this.name = name;
    //     this.age = age;
    // }
    // function Child(sex,name,age) {
    //     this.sex = sex;
    //     Person.call(this,name,age)
    // }
    // let child = new Child('男','k',18)

    //原型链继承
    // function person(name,age) {
    //     this.name = name;
    //     this.age = age;
    // }
    // person.prototype.sayHello = function () {
    //     console.log(this.name + 'hello' + this.age);
    // }

    // function child(sex) {
    //     this.sex = sex;
    // }

    // child.prototype = new person()
    // child.prototype.hh = 'ddd'
    // let p = new child('man')
    // console.log(new person());
    // let p2 = new child('man')
    // console.log(p);
    // console.log(p2);

    //组合继承
    function person(name,age) {
        this.name = name;
        this.age = age;
    }

    person.prototype.sayHello = function(){
        console.log(this.name + 'hello' +this.age);
    }

    function child(sex,name,age) {
        this.sex = sex;
        person.call(this,name,age)
    }

    child.prototype = new person();

    child.prototype.constructor = child;
    let p = new child('man','kkkk','13')
    let p2 = new child('man','llll','15')
    p.sayHello()
    console.log(p);
    console.log(p2);





    return (
        <></>
    )
}
