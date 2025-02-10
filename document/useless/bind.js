Function.prototype.apply2 = function(that, args) {
    that.func = this
    if (Array.isArray(args)) {
        that.func(...args)
    } else {
        that.func()
    }
    delete that.func
}

Function.prototype.bind2 = function(that) {
    const func = this
    return function (...args) {
        return func.apply2(that, args)
    }
}

globalThis.name = 'global'
const obj = {
    name: 'obj',
    say1: () => {
        console.log('this.name:', this.name)
    },
    in: {
        name: 'in',
        say2: function () {
            console.log('this.name:', this.name)
        },
        say3: () => {
            console.log('this.name:', this.name)
        },
        say4: function() {
            const name = 'say4'
            let fn = () => { console.log('this.name:', this.name) }
            fn()
        }
    }
}
const otherObj = {
    name: 'other'
}
obj.say1() // tom
obj.in.say2()
obj.in.say3()
obj.in.say4()



class Hardman {
    constructor(name) {
      this.name = name;
      this.chain = Promise.resolve().then(() => {
        console.log(`i am ${this.name}`);
      });
    }
  
    rest(seconds) {
      this.chain = this.chain.then(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            console.log(`wait ${seconds}s`);
            resolve();
          }, seconds * 1000);
        });
      });
      return this;
    }
  
    restFirst(seconds) {
      this.chain = Promise.resolve().then(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            console.log(`i am ${this.name}`);
            console.log(`wait ${seconds}s`);
            resolve();
          }, seconds * 1000);
        });
      });
      return this;
    }
  
    learn(subject) {
      this.chain = this.chain.then(() => {
        console.log(`learn ${subject}`);
      });
      return this;
    }
  }
  
  function hardman(name) {
    return new Hardman(name);
  }
